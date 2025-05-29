export async function fetchTrends() {
  try {
    const rss2jsonURL = `https://api.rss2json.com/v1/api.json?rss_url=https://www.dezeen.com/feed/&api_key=${process.env.RSS2JSON_API_KEY}`;
    const response = await fetch(rss2jsonURL);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid RSS feed format');
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

export default fetchTrends;
