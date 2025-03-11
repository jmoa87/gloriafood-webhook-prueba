from flask import Flask, request, jsonify

app = Flask(__name__)

# Clave maestra proporcionada por Global Foodsoft
MASTER_KEY = "kQ6vefGxDHlDGJDplJ"

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
        print(f"Procesando pedido {order_id} para el restaurante {restaurant_key}")

    # Responder con éxito
    return jsonify({"status": "success"}), 200

if __name__ == '__main__':
    app.run()
