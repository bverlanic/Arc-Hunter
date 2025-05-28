export default async function handler(req, res) {
  try {
    const response = await fetch('https://www.dezeen.com/feed/');
    const text = await response.text();
    res.status(200).send(text);
  } catch (err) {
    console.error('Basic fetch failed:', err.message || err);
    res.status(500).json({ status: 'error', message: err.message || 'Unknown' });
  }
}
