export async function fetchDailyTrends() {
  try {
    const rss2jsonUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.dezeen.com/feed';

    const response = await fetch(rss2jsonUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid RSS feed format');
    }

    // Convert items to simplified trend objects
    const trends = data.items.map(item => ({
      title: item.title,
      link: item.link,
      date: item.pubDate,
    }));

    return trends;
  } catch (err) {
    console.error('fetchDailyTrends error:', err.message);
    throw err;
  }
}

