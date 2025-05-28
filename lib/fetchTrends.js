import fetch from 'node-fetch';

const FEEDS = [
  {
    source: 'Dezeen',
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.dezeen.com/feed/',
  },
  {
    source: 'ArchDaily',
    url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.archdaily.com/rss',
  },
];

export async function fetchDailyTrends() {
  const results = [];

  for (const feed of FEEDS) {
    try {
      const response = await fetch(feed.url);
      const data = await response.json();

      for (const item of data.items.slice(0, 10)) {
        results.push({
          title: item.title || 'No title',
          url: item.link || '',
          thumbnail_url: item.thumbnail || '',
          source: feed.source,
          published_date: item.pubDate ? new Date(item.pubDate) : new Date(),
        });
      }
    } catch (err) {
      console.error(`Error fetching ${feed.source}:`, err.message || err);
    }
  }

  return results;
}

