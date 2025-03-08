const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // Para manejar JSON
app.use(bodyParser.xml());  // Para manejar XML (necesitas el paquete `body-parser-xml`)

const MASTER_KEY = 'e6fIguVkyG5xtT3BYGMI4rfm9iVt24YJ'; // Clave maestra proporcionada por Global Foodsoft

// Endpoint para recibir notificaciones
app.post('/integration/orderingsystem', (req, res) => {
  const authHeader = req.headers['authorization'];

  // Verificar la clave maestra
  if (authHeader !== MASTER_KEY) {
    return res.status(403).json({ error: 'Invalid authorization token' });
  }

  const order = req.body; // Datos del pedido

  // Verificar si el pedido ya fue procesado
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
  return false; // Cambiar según tu implementación
}

// Función para procesar el pedido
function processOrder(order) {
  // Lógica para procesar el pedido
  console.log('Processing order:', order);
}

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
