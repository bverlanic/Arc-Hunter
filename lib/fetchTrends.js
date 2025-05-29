import fetch from 'node-fetch';

export default async function fetchTrends() {
  try {
    const rssFeedUrl = 'https://www.dezeen.com/feed/';
    const apiKey = process.env.RSS2JSON_API_KEY;

    if (!apiKey) {
      throw new Error('Missing RSS2JSON_API_KEY environment variable');
    }

    const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}&api_key=${apiKey}`;
    console.log('Fetching from:', rss2jsonUrl);

    const response = await fetch(rss2jsonUrl);
    console.log('Response status:', response.status);

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Fetch failed: ${response.statusText}, Body: ${body}`);
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid RSS format returned');
    }

    const trends = data.items.map((item) => ({
      title: item.title,
      url: item.link,
      thumbnail_url: item.thumbnail || '',
      source: 'dezeen.com',
      published_date: new Date(item.pubDate),
    }));

    return trends;
  } catch (err) {
    console.error('fetchTrends error:', err.message);
    throw err;
  }
}
