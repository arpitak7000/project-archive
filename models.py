from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
import json

db = SQLAlchemy()


# ---------------------------------------------------------------------------
# Table 1: categories
# ---------------------------------------------------------------------------

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    products = db.relationship('Product', backref='category_rel', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
        }

    def __repr__(self):
        return f'<Category {self.name}>'


# ---------------------------------------------------------------------------
# Table 2: products
# ---------------------------------------------------------------------------

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    image_url = db.Column(db.Text, nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    category_name = db.Column(db.String(100), nullable=False)
    stock = db.Column(db.Integer, default=20, nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    order_items = db.relationship('OrderItem', backref='product', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': float(self.price),
            'image': self.image_url,
            'category': self.category_name,
            'stock': self.stock,
            'is_active': self.is_active,
        }

    def __repr__(self):
        return f'<Product {self.name}>'


# ---------------------------------------------------------------------------
# Table 3: customers
# ---------------------------------------------------------------------------

class Customer(db.Model):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    full_name = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(100), nullable=False)
    birthdate = db.Column(db.String(20), nullable=True)
    gender = db.Column(db.String(50), nullable=True)
    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    orders = db.relationship('Order', backref='customer', lazy=True)
    cart_items = db.relationship('CartItem', backref='customer', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'full_name': self.full_name,
            'username': self.username,
            'birthdate': self.birthdate,
            'gender': self.gender,
        }

    def __repr__(self):
        return f'<Customer {self.email}>'


# ---------------------------------------------------------------------------
# Table 4: cart_items
# ---------------------------------------------------------------------------

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    product_name = db.Column(db.String(255), nullable=False)
    product_price = db.Column(db.Numeric(10, 2), nullable=False)
    quantity = db.Column(db.Integer, default=1, nullable=False)
    added_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'product_id': self.product_id,
            'product_name': self.product_name,
            'product_price': float(self.product_price),
            'quantity': self.quantity,
            'line_total': float(self.product_price) * self.quantity,
        }

    def __repr__(self):
        return f'<CartItem customer={self.customer_id} product={self.product_id}>'


# ---------------------------------------------------------------------------
# Table 5: orders
# ---------------------------------------------------------------------------

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    order_ref = db.Column(db.String(50), unique=True, nullable=False, index=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=True)
    customer_name = db.Column(db.String(255), nullable=False)
    customer_email = db.Column(db.String(255), nullable=False, index=True)
    customer_phone = db.Column(db.String(30), nullable=False)
    customer_address = db.Column(db.Text, nullable=False)
    items_json = db.Column(db.Text, nullable=False)
    subtotal = db.Column(db.Numeric(10, 2), nullable=False)
    gst = db.Column(db.Numeric(10, 2), nullable=False)
    total = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(50), default='On the Way', nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    order_items = db.relationship('OrderItem', backref='order', lazy=True)

    def get_items(self):
        return json.loads(self.items_json)

    def to_dict(self):
        return {
            'id': self.order_ref,
            'date': self.created_at.strftime('%d %B %Y'),
            'items': self.get_items(),
            'subtotal': float(self.subtotal),
            'gst': float(self.gst),
            'total': float(self.total),
            'status': self.status,
            'timestamp': int(self.created_at.timestamp() * 1000),
            'customer': {
                'name': self.customer_name,
                'fullName': self.customer_name,
                'email': self.customer_email,
                'phone': self.customer_phone,
                'address': self.customer_address,
            },
        }

    def __repr__(self):
        return f'<Order {self.order_ref}>'


# ---------------------------------------------------------------------------
# Table 6: order_items
# ---------------------------------------------------------------------------

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=True)
    product_name = db.Column(db.String(255), nullable=False)
    product_price = db.Column(db.Numeric(10, 2), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    line_total = db.Column(db.Numeric(10, 2), nullable=False)
    category = db.Column(db.String(100), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'product_id': self.product_id,
            'product_name': self.product_name,
            'product_price': float(self.product_price),
            'quantity': self.quantity,
            'line_total': float(self.line_total),
            'category': self.category,
        }

    def __repr__(self):
        return f'<OrderItem {self.product_name} x{self.quantity}>'
