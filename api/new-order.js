from flask import Flask, request, jsonify
import time

app = Flask(__name__)

# Clave maestra proporcionada por Global Foodsoft
MASTER_KEY = "e6fIguVkyG5xtT3BYGMI4rfm9iVt24YJ"

@app.route('/integration/orderingsystem', methods=['POST'])
def handle_order():
    # Verificar la clave de autorización
    auth_header = request.headers.get('Authorization')
    if auth_header != MASTER_KEY:
        return jsonify({"error": "Unauthorized"}), 401

    # Obtener el payload JSON
    payload = request.json

    # Procesar los pedidos
    for order in payload.get('orders', []):
        restaurant_key = order.get('restaurant_key')
        order_id = order.get('id')
        print(f"Procesando pedido {order_id} para el restaurante {restaurant_key}")

        # Aquí puedes agregar lógica para asignar el pedido al restaurante correcto
        # y guardar la información en tu base de datos.

    # Responder con éxito
    return jsonify({"status": "success"}), 200

if __name__ == '__main__':
    app.run(ssl_context='adhoc')  # Usar HTTPS en desarrollo (no recomendado para producción)

processed_orders = set()  # Almacena los IDs de los pedidos procesados

@app.route('/integration/orderingsystem', methods=['POST'])
def handle_order():
    # Verificar la clave de autorización
    auth_header = request.headers.get('Authorization')
    if auth_header != MASTER_KEY:
        return jsonify({"error": "Unauthorized"}), 401

    # Obtener el payload JSON
    payload = request.json

    # Procesar los pedidos
    for order in payload.get('orders', []):
        order_id = order.get('id')
        if order_id in processed_orders:
            print(f"Pedido {order_id} ya procesado, ignorando.")
            continue

        # Marcar el pedido como procesado
        processed_orders.add(order_id)

        # Procesar el pedido
        restaurant_key = order.get('restaurant_key')
        print(f"Procesando pedido {order_id} para el restaurante {restaurant_key}")

    # Responder con éxito
    return jsonify({"status": "success"}), 200
