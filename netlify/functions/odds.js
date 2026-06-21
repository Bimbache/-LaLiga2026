
// Proxy para The Odds API — punto 19
// Evita exponer la API key en el cliente y resuelve CORS,
// igual que el proxy de Claude.
exports.handler = async function(event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.ODDS_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'ODDS_API_KEY not set' })
    };
  }

  // Parámetros que manda la app: sport, regions, markets
  const params = event.queryStringParameters || {};
  const sport = params.sport || 'soccer_spain_la_liga';
  const regions = params.regions || 'eu';
  const markets = params.markets || 'h2h,totals';

  const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=${regions}&markets=${markets}&oddsFormat=decimal`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
