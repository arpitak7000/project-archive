# Maitri Gift Shop

## Overview
A complete gift shop web application with a Flask backend and SQLite database. The site features product browsing by category, a shopping cart, order checkout, customer login, and an admin dashboard.

## Tech Stack
- **Backend:** Python / Flask 3.x
- **Database:** SQLite via SQLAlchemy (file: `maitri.db`)
- **Frontend:** Vanilla HTML, CSS, JavaScript (no frameworks)
- **State:** Cart and product stock managed in browser localStorage; orders and customers persisted to SQLite

## Project Structure
```
├── app.py              # Flask application — all routes and API endpoints
├── models.py           # SQLAlchemy models (Customer, Order)
├── requirements.txt    # Python dependencies
├── maitri.db           # SQLite database (auto-created on first run)
├── templates/          # Jinja2 HTML templates
│   ├── index.html
│   ├── products.html
│   ├── cart.html
│   ├── login.html
│   ├── orders.html
│   └── admin.html
├── static/
│   ├── css/            # All stylesheets
│   └── js/             # All JavaScript files
└── maitri-gift-shop/   # Original source files (reference only)
```

## Pages & Routes
| URL | Template | Description |
|-----|----------|-------------|
| `/` | index.html | Home page |
| `/products` | products.html | Product catalog by category |
| `/cart` | cart.html | Shopping cart + checkout |
| `/login` | login.html | Customer login/profile |
| `/orders` | orders.html | Past orders |
| `/admin` | admin.html | Admin dashboard (password: admin123) |

## API Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/login` | Register or update customer profile |
| GET | `/api/orders?email=...` | Get orders for a customer |
| POST | `/api/orders` | Place a new order |
| GET | `/api/admin/orders?search=...` | All orders (admin) |
| GET | `/api/admin/stats` | Dashboard statistics (admin) |

## Database Models
- **Customer** — email, full_name, username, birthdate, gender
- **Order** — order_ref, customer FK, name/email/phone/address, items (JSON), subtotal, gst, total, status

## Workflow
- **Start application:** `python app.py`  — Flask dev server on port 5000

## Running Locally
The app starts automatically via the workflow. To run manually:
```bash
python app.py
```

## Admin Access
Navigate to `/admin` and enter password `admin123`.

## Dependencies
- Flask
- Flask-SQLAlchemy
