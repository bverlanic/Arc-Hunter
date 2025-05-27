import Parser from 'rss-parser';
const parser = new Parser();

const FEEDS = [
  {
    source: 'Dezeen',
    url: 'https://www.dezeen.com/feed/',
  },
  {
    source: 'ArchDaily',
    url: 'https://www.archdaily.com/rss',
  }
];

export async function fetchDailyTrends() {
  const results = [];

  for (const feed of FEEDS) {
    const parsed = await parser.parseURL(feed.url);

    for (const item of parsed.items.slice(0, 10)) {
      results.push({
        title: item.title,
        url: item.link,
        thumbnail_url: item.enclosure?.url || '',
        source: feed.source,
        published_date: new Date(item.pubDate),
      });
    }
  }

  return results;
}
