export default async function handler(req, res) {
  const { title } = req.query;

  if (!title) {
    res.status(400).json({ error: "Missing title" });
    return;
  }

  try {
    const response = await fetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(title)}&limit=10`);
    const data = await response.json();

    const results = data.data.map(m => ({
      id: m.mal_id,
      title: m.title,
      image: m.images.jpg.image_url
    }));

    res.status(200).json({ results });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch manga" });
  }
}
