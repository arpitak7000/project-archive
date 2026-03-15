from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
import json

db = SQLAlchemy()


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
