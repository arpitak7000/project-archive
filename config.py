import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'maitri-gift-shop-secret-2026')

    # PostgreSQL connection — Replit sets DATABASE_URL automatically
    DATABASE_URL = os.environ.get('DATABASE_URL', '')

    # SQLAlchemy requires postgresql:// not postgres:// (older Heroku-style URLs)
    if DATABASE_URL.startswith('postgres://'):
        DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)

    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True,       # Verify connection health before each use
        'pool_recycle': 300,         # Recycle connections every 5 minutes
        'connect_args': {
            'connect_timeout': 10,   # Fail fast if DB is unreachable
        }
    }
