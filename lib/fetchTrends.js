import axios from 'axios';

const API_KEY = process.env.RSS2JSON_API_KEY;

const FEEDS = [
  {
    source: 'Dezeen',
    url: `https://api.rss2json.com/v1/api.json?rss_url=https://www.dezeen.com/feed/&api_key=${API_KEY}`,
  },
  {
    source: 'ArchDaily',
    url: `https://api.rss2json.com/v1/api.json?rss_url=https://www.archdaily.com/rss&api_key=${API_KEY}`,
  },
  {
    source: 'TechCrunch',
    url: `https://api.rss2json.com/v1/api.json?rss_url=https://techcrunch.com/feed/&api_key=${API_KEY}`,
  }
];

export async function fetchDailyTrends() {
  const results = [];

  for (const feed of FEEDS) {
    try {
      const response = await axios.get(feed.url);
      const data = response.data;

      for (const item of data.items.slice(0, 10)) {
        results.push({
          title: item.title,
          url: item.link,
          thumbnail_url: item.thumbnail || '',
          source: feed.source,
          published_date: new Date(item.pubDate),
        });
      }
    } catch (err) {
      console.error(`Fetch failed for ${feed.source}:`, err.message || err);
    }
  }

  return results;
}

