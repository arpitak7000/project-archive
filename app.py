import os
import json
import re
import string
import random
from datetime import datetime

from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
from models import db, Customer, Order

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'maitri-gift-shop-secret-2026')

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'maitri.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()


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
# API: Customer login / register
# ---------------------------------------------------------------------------

@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json(silent=True) or {}

    email = (data.get('email') or '').strip().lower()
    full_name = (data.get('full_name') or '').strip()
    username = (data.get('username') or '').strip()
    birthdate = (data.get('birthdate') or '').strip()
    gender = (data.get('gender') or '').strip()

    # Validation
    if not email or not full_name or not username or not birthdate or not gender:
        return jsonify({'success': False, 'error': 'All fields are required.'}), 400

    if not validate_email(email):
        return jsonify({'success': False, 'error': 'Invalid email address.'}), 400

    # Upsert customer
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


# ---------------------------------------------------------------------------
# API: Orders
# ---------------------------------------------------------------------------

@app.route('/api/orders', methods=['GET'])
def api_get_orders():
    email = request.args.get('email', '').strip().lower()

    query = Order.query.order_by(Order.created_at.desc())
    if email:
        query = query.filter(Order.customer_email == email)

    orders = query.all()
    return jsonify({'success': True, 'orders': [o.to_dict() for o in orders]})


@app.route('/api/orders', methods=['POST'])
def api_place_order():
    data = request.get_json(silent=True) or {}

    customer = data.get('customer', {})
    items = data.get('items', [])
    subtotal = data.get('subtotal', 0)
    gst = data.get('gst', 0)
    total = data.get('total', 0)

    # Validate customer fields
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

    # Find or create customer
    db_customer = Customer.query.filter_by(email=email).first()
    customer_id = db_customer.id if db_customer else None

    order_ref = generate_order_ref()
    # Ensure uniqueness
    while Order.query.filter_by(order_ref=order_ref).first():
        order_ref = generate_order_ref()

    # Sanitise items — keep only safe fields
    safe_items = []
    for item in items:
        safe_items.append({
            'id': item.get('id'),
            'name': str(item.get('name', '')),
            'price': float(item.get('price', 0)),
            'quantity': int(item.get('quantity', 1)),
            'image': str(item.get('image', '')),
            'description': str(item.get('description', '')),
            'category': str(item.get('category', '')),
        })

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


# ---------------------------------------------------------------------------
# API: Admin
# ---------------------------------------------------------------------------

@app.route('/api/admin/orders', methods=['GET'])
def api_admin_orders():
    search = request.args.get('search', '').strip().lower()
    query = Order.query.order_by(Order.created_at.desc())

    if search:
        query = query.filter(
            db.or_(
                Order.customer_name.ilike(f'%{search}%'),
                Order.customer_email.ilike(f'%{search}%'),
                Order.order_ref.ilike(f'%{search}%'),
            )
        )

    orders = query.all()
    return jsonify({'success': True, 'orders': [o.to_dict() for o in orders]})


@app.route('/api/admin/stats', methods=['GET'])
def api_admin_stats():
    total_orders = Order.query.count()
    total_revenue = db.session.query(db.func.sum(Order.total)).scalar() or 0
    total_customers = Customer.query.count()

    # Products come from JS/localStorage, so we return a placeholder
    return jsonify({
        'success': True,
        'stats': {
            'total_orders': total_orders,
            'total_revenue': round(total_revenue, 2),
            'total_customers': total_customers,
            'total_products': 0,   # Managed on the frontend
            'low_stock_count': 0,  # Managed on the frontend
        }
    })


# ---------------------------------------------------------------------------
# Error handlers
# ---------------------------------------------------------------------------

@app.errorhandler(404)
def not_found(e):
    return render_template('index.html'), 404


@app.errorhandler(500)
def server_error(e):
    return jsonify({'success': False, 'error': 'Internal server error.'}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
