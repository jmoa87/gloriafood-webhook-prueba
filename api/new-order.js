const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = 'https://pos.globalfoodsoft.com/pos/order';
  const headers = {
    'Authorization': req.headers['authorization'] || '2poftdDnKvf3AhQTpIbtJDynhaO8rLCN', // Token proporcionado
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Glf-Api-Version': '2',
    'Server-Key': 'K6N7syrnfKRECLPf4knJQeBcLuYJJpgfv', // Server-Key requerido
  };

  console.log('Enviando solicitud con headers:', headers); // Depuración
  console.log('Cuerpo de la solicitud:', req.body); // Depuración

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(req.body),
    });
    const data = await response.text();
    console.log('Respuesta de la API:', data); // Depuración
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ 
      error: { 
        code: '500', 
        message: 'A server error has occurred', 
        details: error.message 
      } 
    });
  }
};
