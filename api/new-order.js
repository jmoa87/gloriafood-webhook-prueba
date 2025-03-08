// Importar dependencias
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Clave maestra proporcionada por Global Foodsoft
const MASTER_KEY = 'K6N7syrnfKRECLPf4knJQeBcLuYJJpgfv'; // Reemplaza con tu clave maestra

// Endpoint para recibir notificaciones de nuevos pedidos
app.post('/api/new-order', (req, res) => {
  // Verificar la clave maestra
  const authHeader = req.headers['authorization'];
  if (authHeader !== MASTER_KEY) {
    return res.status(403).json({ error: 'Invalid authorization token' });
  }

  // Obtener los datos del pedido
  const order = req.body;

  // Verificar si el pedido ya fue procesado (evitar duplicados)
  if (isOrderProcessed(order.order_id)) {
    return res.status(200).json({ message: 'Order already processed' });
  }

  // Procesar el pedido
  processOrder(order);

  // Responder dentro de 15 segundos
  res.status(200).json({ message: 'Order received and processed' });
});

// Función para verificar si el pedido ya fue procesado
function isOrderProcessed(orderId) {
  // Lógica para verificar en la base de datos
  // Por ejemplo, puedes usar una base de datos como MongoDB, PostgreSQL, etc.
  // Aquí se simula una verificación básica.
  return false; // Cambiar según tu implementación
}

// Función para procesar el pedido
function processOrder(order) {
  // Lógica para procesar el pedido
  // Por ejemplo, guardar en una base de datos, enviar notificaciones, etc.
  console.log('Processing order:', order);
}

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
