from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()


class Customer(db.Model):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    full_name = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(100), nullable=False)
    birthdate = db.Column(db.String(20), nullable=True)
    gender = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

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


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    order_ref = db.Column(db.String(50), unique=True, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=True)
    customer_name = db.Column(db.String(255), nullable=False)
    customer_email = db.Column(db.String(255), nullable=False)
    customer_phone = db.Column(db.String(30), nullable=False)
    customer_address = db.Column(db.Text, nullable=False)
    items_json = db.Column(db.Text, nullable=False)
    subtotal = db.Column(db.Float, nullable=False)
    gst = db.Column(db.Float, nullable=False)
    total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='On the Way')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def get_items(self):
        return json.loads(self.items_json)

    def to_dict(self):
        return {
            'id': self.order_ref,
            'date': self.created_at.strftime('%d %B %Y'),
            'items': self.get_items(),
            'subtotal': self.subtotal,
            'gst': self.gst,
            'total': self.total,
            'status': self.status,
            'timestamp': int(self.created_at.timestamp() * 1000),
            'customer': {
                'name': self.customer_name,
                'fullName': self.customer_name,
                'email': self.customer_email,
                'phone': self.customer_phone,
                'address': self.customer_address,
            }
        }
