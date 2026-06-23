export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { endpoint, ...params } = req.query;
  
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `https://v3.football.api-sports.io/${endpoint}?${queryString}`;
    
    const response = await fetch(url, {
      headers: {
        'x-apisports-key': process.env.API_FOOTBALL_KEY
      }
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
