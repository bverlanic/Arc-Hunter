import fetch from 'node-fetch';

export default async function fetchTrends() {
  try {
    const rssFeedUrl = 'https://www.dezeen.com/feed/';
    const rss2jsonApiKey = process.env.RSS2JSON_API_KEY;

    if (!rss2jsonApiKey) {
      throw new Error('Missing RSS2JSON_API_KEY');
    }

    const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}&api_key=${rss2jsonApiKey}`;

    const response = await fetch(rss2jsonUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid RSS format or no items');
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
