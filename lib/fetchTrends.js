export async function fetchDailyTrends() {
  try {
    const rssUrl = 'https://www.dezeen.com/feed/';
    const apiKey = process.env.RSS2JSON_API_KEY;

    const rss2jsonURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=${apiKey}`;

    const response = await fetch(rss2jsonURL);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid RSS feed format');
    }

    // Convert items to simplified trend objects
    const trends = data.items.map((item) => ({
      title: item.title,
      url: item.link,
      thumbnail_url: item.thumbnail || '',
      source: 'Dezeen',
      published_date: item.pubDate ? new Date(item.pubDate).toISOString() : null,
    }));

    return trends;
  } catch (err) {
    console.error('fetchDailyTrends error:', err.message);
    throw err;
  }
}


