import Parser from 'rss-parser';
import https from 'https';
import fetch from 'node-fetch'; // <-- use node-fetch directly

const parser = new Parser({
  customFetch: fetch, // use fetch that works in Vercel
  requestOptions: {
    agent: new https.Agent({ keepAlive: true }),
  },
});

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
      const parsed = await parser.parseURL(feed.url);

      for (const item of parsed.items.slice(0, 10)) {
        results.push({
          title: item.title || 'No title',
          url: item.link || '',
          thumbnail_url: item.enclosure?.url || '',
          source: feed.source,
          published_date: item.pubDate ? new Date(item.pubDate) : new Date(),
        });
      }
    } catch (err) {
      console.error(`Failed to fetch from ${feed.source}:`, err.message || err);
    }
  }

  return results;
}

