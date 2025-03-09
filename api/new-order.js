from flask import Flask, request, jsonify
from functools import lru_cache

app = Flask(__name__)

# Clave maestra proporcionada por Global Foodsoft
MASTER_KEY = "e6fIguVkyG5xtT3BYGMI4rfm9iVt24YJ"

# Usamos un decorador para cachear los pedidos procesados (evita duplicados)
@lru_cache(maxsize=1000)
def is_order_processed(order_id):
    return False  # Simulación de función, puedes implementar lógica real aquí

@app.route('/integration/orderingsystem', methods=['POST'])
def handle_order():
    # Verificar la clave de autorización
    auth_header = request.headers.get('Authorization')
    if auth_header != MASTER_KEY:
        return jsonify({"error": "Unauthorized"}), 401

    # Obtener el payload JSON
    payload = request.json
    if not payload or 'orders' not in payload:
        return jsonify({"error": "Invalid payload"}), 400

    # Procesar los pedidos
    for order in payload.get('orders', []):
        order_id = order.get('id')
        restaurant_key = order.get('restaurant_key')

        # Verificar si el pedido ya fue procesado
        if is_order_processed(order_id):
            print(f"Pedido {order_id} ya procesado, ignorando.")
            continue

        # Procesar el pedido
        print(f"Procesando pedido {order_id} para el restaurante {restaurant_key}")

        # Aquí puedes agregar lógica para asignar el pedido al restaurante correcto
        # y guardar la información en tu base de datos.

        # Marcar el pedido como procesado (simulación)
        is_order_processed.cache_clear()  # Limpia la caché si es necesario

    # Responder con éxito
    return jsonify({"status": "success"}), 200

if __name__ == '__main__':
    app.run()  # No necesitas SSL en Vercel
