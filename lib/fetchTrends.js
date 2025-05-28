import { parseStringPromise } from 'xml2js';

export async function fetchTrends() {
  try {
    const response = await fetch('https://www.dezeen.com/feed/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ArcHunter/1.0)' // helps bypass bot-blocking
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const xml = await response.text();
    const data = await parseStringPromise(xml);

    const items = data.rss.channel[0].item;

    const trends = items.map((item) => ({
      title: item.title[0],
      url: item.link[0],
      thumbnail_url: '', // Dezeen RSS has no image
      source: 'dezeen',
      published_date: new Date(item.pubDate[0]).toISOString()
    }));

    return trends;
  } catch (err) {
    console.error('fetchTrends error:', err);
    throw err;
  }
}



