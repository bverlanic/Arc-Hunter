import axios from 'axios';

const FEEDS = [
  {
    source: 'Dezeen',
    url: 'https://www.dezeen.com/feed/',
  },
  {
    source: 'ArchDaily',
    url: 'https://www.archdaily.com/rss',
  },
];

export async function fetchDailyTrends() {
  const results = [];

  for (const feed of FEEDS) {
    try {
      const response = await axios.get(feed.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0', // Required for some sites to allow access
        },
        timeout: 10000,
      });

      const xml = response.data;

      // Just return a basic record (for testing) — we'll improve later
      results.push({
        title: `Fetched ${feed.source}`,
        url: feed.url,
        thumbnail_url: '',
        source: feed.source,
        published_date: new Date(),
      });
    } catch (err) {
      console.error(`Axios fetch failed for ${feed.source}:`, err.message || err);
    }
  }

  return results;
}


