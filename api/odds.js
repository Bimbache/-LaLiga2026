
export default async function handler(req, res) {
  const { sport, regions, markets } = req.query;

  try {
    const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds?apiKey=${process.env.ODDS_API_KEY}&regions=${regions}&markets=${markets}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
