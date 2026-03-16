import os
import json
import re
import string
import random
from datetime import datetime, timezone

from flask import Flask, render_template, request, jsonify
from sqlalchemy.exc import OperationalError, SQLAlchemyError

from config import Config
from models import db, Category, Product, Customer, CartItem, Order, OrderItem, Bill

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

# ---------------------------------------------------------------------------
# Database initialisation — create tables on startup (safe with PostgreSQL)
# ---------------------------------------------------------------------------

def init_db():
    try:
        with app.app_context():
            db.create_all()
        print('[DB] Tables created / verified successfully.')
    except OperationalError as exc:
        print(f'[DB] Connection failed: {exc}')
        print('[DB] Check that DATABASE_URL is set and PostgreSQL is reachable.')
    except SQLAlchemyError as exc:
        print(f'[DB] Unexpected database error: {exc}')

init_db()


# ---------------------------------------------------------------------------
# Helper utilities
# ---------------------------------------------------------------------------

def generate_order_ref():
    chars = string.ascii_uppercase + string.digits
    suffix = ''.join(random.choices(chars, k=8))
    return f'ORD{suffix}'


def validate_email(email):
    return bool(re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', email))


def validate_phone(phone):
    digits = re.sub(r'[\s\-\+\(\)]', '', phone)
    return digits.isdigit() and 7 <= len(digits) <= 15


def db_error_response(exc):
    """Return a JSON error for database failures."""
    print(f'[DB] Error: {exc}')
    return jsonify({'success': False, 'error': 'Database error. Please try again.'}), 500


# ---------------------------------------------------------------------------
# Page routes
# ---------------------------------------------------------------------------

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/products')
def products():
    return render_template('products.html')


@app.route('/cart')
def cart():
    return render_template('cart.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/orders')
def orders():
    return render_template('orders.html')


@app.route('/admin')
def admin():
    return render_template('admin.html')


# ---------------------------------------------------------------------------
# API: Health check
# ---------------------------------------------------------------------------

@app.route('/api/health')
def api_health():
    try:
        db.session.execute(db.text('SELECT 1'))
        return jsonify({'success': True, 'database': 'connected', 'engine': 'postgresql'})
    except SQLAlchemyError as exc:
        return jsonify({'success': False, 'database': 'error', 'error': str(exc)}), 503


# ---------------------------------------------------------------------------
# API: Customer login / register (upsert)
# ---------------------------------------------------------------------------

@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json(silent=True) or {}

    email = (data.get('email') or '').strip().lower()
    full_name = (data.get('full_name') or '').strip()
    username = (data.get('username') or '').strip()
    birthdate = (data.get('birthdate') or '').strip()
    gender = (data.get('gender') or '').strip()

    if not all([email, full_name, username, birthdate, gender]):
        return jsonify({'success': False, 'error': 'All fields are required.'}), 400

    if not validate_email(email):
        return jsonify({'success': False, 'error': 'Invalid email address.'}), 400

    try:
        customer = Customer.query.filter_by(email=email).first()
        if customer:
            customer.full_name = full_name
            customer.username = username
            customer.birthdate = birthdate
            customer.gender = gender
        else:
            customer = Customer(
                email=email,
                full_name=full_name,
                username=username,
                birthdate=birthdate,
                gender=gender,
            )
            db.session.add(customer)

        db.session.commit()
        return jsonify({'success': True, 'customer': customer.to_dict()})

    except SQLAlchemyError as exc:
        db.session.rollback()
        return db_error_response(exc)


# ---------------------------------------------------------------------------
# API: Orders — list
# ---------------------------------------------------------------------------

@app.route('/api/orders', methods=['GET'])
def api_get_orders():
    email = request.args.get('email', '').strip().lower()

    try:
        query = Order.query.order_by(Order.created_at.desc())
        if email:
            query = query.filter(Order.customer_email == email)
        orders_list = query.all()
        return jsonify({'success': True, 'orders': [o.to_dict() for o in orders_list]})

    except SQLAlchemyError as exc:
        return db_error_response(exc)


# ---------------------------------------------------------------------------
# API: Orders — place
# ---------------------------------------------------------------------------

@app.route('/api/orders', methods=['POST'])
def api_place_order():
    data = request.get_json(silent=True) or {}

    customer = data.get('customer', {})
    items = data.get('items', [])
    subtotal = data.get('subtotal', 0)
    gst = data.get('gst', 0)
    total = data.get('total', 0)

    name = (customer.get('name') or '').strip()
    email = (customer.get('email') or '').strip().lower()
    phone = (customer.get('phone') or '').strip()
    address = (customer.get('address') or '').strip()

    errors = []
    if not name:
        errors.append('Full name is required.')
    if not email or not validate_email(email):
        errors.append('A valid email address is required.')
    if not phone or not validate_phone(phone):
        errors.append('A valid phone number is required.')
    if not address:
        errors.append('Delivery address is required.')
    if not items:
        errors.append('Order must contain at least one item.')

    if errors:
        return jsonify({'success': False, 'error': ' '.join(errors)}), 400

    try:
        db_customer = Customer.query.filter_by(email=email).first()
        customer_id = db_customer.id if db_customer else None

        order_ref = generate_order_ref()
        while Order.query.filter_by(order_ref=order_ref).first():
            order_ref = generate_order_ref()

        safe_items = [
            {
                'id': item.get('id'),
                'name': str(item.get('name', '')),
                'price': float(item.get('price', 0)),
                'quantity': int(item.get('quantity', 1)),
                'image': str(item.get('image', '')),
                'description': str(item.get('description', '')),
                'category': str(item.get('category', '')),
            }
            for item in items
        ]

        order = Order(
            order_ref=order_ref,
            customer_id=customer_id,
            customer_name=name,
            customer_email=email,
            customer_phone=phone,
            customer_address=address,
            items_json=json.dumps(safe_items),
            subtotal=float(subtotal),
            gst=float(gst),
            total=float(total),
            status='On the Way',
        )
        db.session.add(order)
        db.session.commit()
        return jsonify({'success': True, 'order': order.to_dict()}), 201

    except SQLAlchemyError as exc:
        db.session.rollback()
        return db_error_response(exc)


# ---------------------------------------------------------------------------
# API: Admin — all orders (with search)
# ---------------------------------------------------------------------------

@app.route('/api/admin/orders', methods=['GET'])
def api_admin_orders():
    search = request.args.get('search', '').strip().lower()

    try:
        query = Order.query.order_by(Order.created_at.desc())
        if search:
            query = query.filter(
                db.or_(
                    Order.customer_name.ilike(f'%{search}%'),
                    Order.customer_email.ilike(f'%{search}%'),
                    Order.order_ref.ilike(f'%{search}%'),
                )
            )
        orders_list = query.all()
        return jsonify({'success': True, 'orders': [o.to_dict() for o in orders_list]})

    except SQLAlchemyError as exc:
        return db_error_response(exc)


# ---------------------------------------------------------------------------
# API: Admin — dashboard statistics
# ---------------------------------------------------------------------------

@app.route('/api/admin/stats', methods=['GET'])
def api_admin_stats():
    try:
        total_orders = Order.query.count()
        total_revenue = db.session.query(
            db.func.sum(Order.total)
        ).scalar() or 0
        total_customers = Customer.query.count()

        return jsonify({
            'success': True,
            'stats': {
                'total_orders': total_orders,
                'total_revenue': round(float(total_revenue), 2),
                'total_customers': total_customers,
                'total_products': 0,   # Managed client-side in store.js
                'low_stock_count': 0,  # Managed client-side in store.js
            },
        })

    except SQLAlchemyError as exc:
        return db_error_response(exc)


# ---------------------------------------------------------------------------
# CRUD helpers exposed as API endpoints
# ---------------------------------------------------------------------------

@app.route('/api/admin/orders/<order_ref>', methods=['PATCH'])
def api_update_order_status(order_ref):
    """Update the status of an order (e.g. mark as Delivered)."""
    data = request.get_json(silent=True) or {}
    new_status = (data.get('status') or '').strip()

    allowed = {'On the Way', 'Delivered', 'Cancelled', 'Processing'}
    if new_status not in allowed:
        return jsonify({
            'success': False,
            'error': f'Status must be one of: {", ".join(allowed)}',
        }), 400

    try:
        order = Order.query.filter_by(order_ref=order_ref).first()
        if not order:
            return jsonify({'success': False, 'error': 'Order not found.'}), 404

        order.status = new_status
        db.session.commit()
        return jsonify({'success': True, 'order': order.to_dict()})

    except SQLAlchemyError as exc:
        db.session.rollback()
        return db_error_response(exc)


@app.route('/api/customers/<int:customer_id>', methods=['GET'])
def api_get_customer(customer_id):
    """Fetch a single customer record."""
    try:
        customer = Customer.query.get_or_404(customer_id)
        return jsonify({'success': True, 'customer': customer.to_dict()})
    except SQLAlchemyError as exc:
        return db_error_response(exc)


@app.route('/api/customers/<int:customer_id>', methods=['DELETE'])
def api_delete_customer(customer_id):
    """Delete a customer and all their orders."""
    try:
        customer = Customer.query.get_or_404(customer_id)
        Order.query.filter_by(customer_id=customer_id).delete()
        db.session.delete(customer)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Customer deleted.'})
    except SQLAlchemyError as exc:
        db.session.rollback()
        return db_error_response(exc)


# ---------------------------------------------------------------------------
# Error handlers
# ---------------------------------------------------------------------------

@app.errorhandler(404)
def not_found(e):
    if request.path.startswith('/api/'):
        return jsonify({'success': False, 'error': 'Endpoint not found.'}), 404
    return render_template('index.html'), 404


@app.errorhandler(500)
def server_error(e):
    if request.path.startswith('/api/'):
        return jsonify({'success': False, 'error': 'Internal server error.'}), 500
    return render_template('index.html'), 500


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
