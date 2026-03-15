// This file manages the product-related functionality, including loading products dynamically and handling user interactions.

// Ensure the shared store is initialized (stock data, default product catalog)
if (window.store) {
    window.store.initStock();
}

document.addEventListener('DOMContentLoaded', () => {
    let productsGrid = document.getElementById('products-list') || document.querySelector('.products-grid');
    if (!productsGrid) {
        const mainSection = document.querySelector('main');
        productsGrid = document.createElement('div');
        productsGrid.id = 'products-list';
        productsGrid.className = 'products-grid';
        if (mainSection) mainSection.appendChild(productsGrid);
    }

    let activeCategory = null; // no category selected initially

    function buildCategoryGrid() {
        const grid = document.getElementById('category-grid');
        if (!grid) return;

        const products = window.store ? window.store.getAllProducts() : [];
        const categoryCounts = products.reduce((acc, p) => {
            acc[p.category] = (acc[p.category] || 0) + 1;
            return acc;
        }, {});

        const categoryImages = products.reduce((acc, p) => {
            if (!acc[p.category]) acc[p.category] = p.image;
            return acc;
        }, {});

        // Specific images for categories
        const categorySpecificImages = {
            'Home Décor': 'https://i.pinimg.com/736x/57/66/2b/57662b49765883072f483fe1d956453b.jpg',
            'Mugs': 'https://i.pinimg.com/1200x/b4/9a/a5/b49aa57920c7908fad7bc2fe501d91f9.jpg',
            'Personalized Gifts': 'https://i.pinimg.com/1200x/16/68/fe/1668fe322fa80c9dc9e716be08fd4297.jpg',
            'Festival Gifts': 'https://i.pinimg.com/736x/49/12/b3/4912b35e97eccbb9e273ef8a5f9914df.jpg',
            'Accessories': 'https://i.pinimg.com/736x/b5/39/69/b5396996fc775d95bbe8e942a6f3a2d1.jpg',
            'Soft Toys': 'https://i.pinimg.com/1200x/3c/62/05/3c62056457ee9bb86f09227760a9719e.jpg',
            'Greeting Cards': 'https://i.pinimg.com/736x/85/98/36/859836095d633a2b0866e89727add324.jpg',
            'Flowers': 'https://i.pinimg.com/1200x/f4/4c/49/f44c49119a39ccc286494dabedc384d7.jpg', // Replace with actual flower image
            'Plants': 'https://i.pinimg.com/1200x/7f/76/d3/7f76d3fd2fc4462ea6dfd66fa6af8430.jpg', // Succulent plant image
            'Cakes': 'https://i.pinimg.com/1200x/62/53/47/62534722b5c8c54826d6986823161705.jpg', // Replace with actual cake image
            'Chocolates': 'https://i.pinimg.com/736x/95/83/c6/9583c6db452c76e1f3a15386def671c6.jpg', // Chocolate box image
        };

        let categories = Object.keys(categoryCounts).sort();
        // Add Flowers, Cake, Plants, Chocolates, Jewelry if not present
        const extraCategories = ['Flowers', 'Cake', 'Plants', 'Chocolates', 'Jewelry'];
        extraCategories.forEach(cat => {
            if (!categories.includes(cat)) categories.push(cat);
        });

        const defaultImage = products[0]?.image || '';

        grid.innerHTML = '';
        if (categories.length === 0) {
            const msg = document.createElement('div');
            msg.className = 'no-categories-msg';
            msg.textContent = 'No categories available.';
            grid.appendChild(msg);
            return;
        }
        categories.forEach(category => {
            let imgSrc = categorySpecificImages[category] || categoryImages[category] || defaultImage;
            // Provide specific images for new categories
            if (category === 'Flowers') {
                imgSrc = 'https://i.pinimg.com/736x/2b/2b/2b/2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b.jpg';
            } else if (category === 'Cake') {
                imgSrc = 'https://i.pinimg.com/736x/0a/0a/0a/0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a.jpg';
            } else if (category === 'Plants') {
                imgSrc = 'https://i.pinimg.com/736x/63/2e/d1/632ed15f4306d55fae921ca6cd0f856c.jpg';
            } else if (category === 'Chocolates') {
                imgSrc = 'https://i.pinimg.com/736x/52/4a/d3/524ad3c1fddf6a2b110fc3788b272e59.jpg';
            } else if (category === 'Jewelry') {
                imgSrc = 'https://i.pinimg.com/736x/8c/6d/d5/8c6dd546c6c3dd266ca87b87e8a8e884.jpg';
            }
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'category-card';
            card.innerHTML = `<div class="category-card__image-wrapper">
                    <img src="${imgSrc}" alt="${category}" class="category-card__image" />
                </div>
                <div class="category-card__name">${category}</div>`;

            if (category === activeCategory) card.classList.add('active');

            card.addEventListener('click', () => {
                if (activeCategory === category) return;
                activeCategory = category;
                document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                document.getElementById('category-grid').classList.add('hidden');
                document.getElementById('back-to-categories').classList.remove('hidden');
                productsGrid.classList.remove('hidden');
                loadProducts();
                window.scrollTo({ top: document.querySelector('.products').offsetTop - 80, behavior: 'smooth' });
            });

            grid.appendChild(card);
        });
    }

    function loadProducts() {
        const products = window.store ? window.store.getAllProducts() : [];
        const filteredProducts = activeCategory === 'All'
            ? products
            : products.filter(p => p.category === activeCategory);

        productsGrid.innerHTML = '';

        filteredProducts.forEach(product => {
            const isOutOfStock = product.stock <= 0;
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="product-price">₹${product.price}</p>
                    <p class="product-stock">${isOutOfStock ? '<span class="out-of-stock">Out of stock</span>' : `Stock: ${product.stock}`}</p>
                    <button class="add-to-cart-btn btn-add" data-id="${product.id}" ${isOutOfStock ? 'disabled' : ''}>${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</button>
                </div>
            `;

            productCard.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn-add')) {
                    showProductModal(product);
                }
            });

            productsGrid.appendChild(productCard);
        });
    }

    function initPage() {
        buildCategoryGrid();
        productsGrid.classList.add('hidden');

        // Back button toggles between category grid and product grid
        const backBtn = document.getElementById('back-to-categories');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                activeCategory = null;
                productsGrid.classList.add('hidden');
                document.getElementById('category-grid').classList.remove('hidden');
                backBtn.classList.add('hidden');
                document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
                window.scrollTo({ top: document.querySelector('.products').offsetTop - 80, behavior: 'smooth' });
            });
        }
    }

    function showProductModal(product) {
        const modal = document.getElementById('product-modal');
        document.getElementById('modal-product-name').textContent = product.name;
        document.getElementById('modal-product-description').textContent = product.description;
        document.getElementById('modal-product-price').textContent = product.price;
        document.getElementById('modal-product-image').src = product.image;
        document.getElementById('modal-product-image').alt = product.name;
        document.getElementById('quantity').value = 1;
        document.getElementById('modal-add-to-cart').setAttribute('data-id', product.id);
        modal.classList.add('show');
    }

    function closeProductModal() {
        const modal = document.getElementById('product-modal');
        modal.classList.remove('show');
    }

    // Close modal when clicking the close button
    document.querySelector('.close-btn').addEventListener('click', closeProductModal);

    // Close modal when clicking outside of it
    document.getElementById('product-modal').addEventListener('click', (e) => {
        if (e.target.id === 'product-modal') {
            closeProductModal();
        }
    });

    // Function to add item to cart
    function addToCart(productId, quantity = 1) {
        const product = window.store ? window.store.getProductById(productId) : null;
        if (!product) return;

        const stock = window.store ? window.store.getStockForProduct(product.id) : Infinity;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);
        const existingQty = existingProduct ? existingProduct.quantity : 0;
        const qtyToAdd = parseInt(quantity, 10);

        if (qtyToAdd + existingQty > stock) {
            alert('Cannot add more than available stock.');
            return;
        }

        if (existingProduct) {
            existingProduct.quantity += qtyToAdd;
        } else {
            cart.push({ ...product, quantity: qtyToAdd });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showAddToCartSuccess(product.name, qtyToAdd);
    }

    // Function to update cart count in navbar
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = `(${totalItems})`;
    }

    // Function to show success message
    function showAddToCartSuccess(productName, quantity) {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = `✓ ${productName} (Qty: ${quantity}) added to cart!`;
        document.body.appendChild(message);

        setTimeout(() => {
            message.classList.add('show');
        }, 100);

        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300);
        }, 2000);
    }

    // Handle Add to Cart from modal
    document.getElementById('modal-add-to-cart').addEventListener('click', (event) => {
        const productId = event.target.getAttribute('data-id');
        const quantity = document.getElementById('quantity').value;
        addToCart(productId, quantity);
        closeProductModal();
    });

    function handleAddToCart(event) {
        if (event.target.classList.contains('btn-add')) {
            const productId = event.target.getAttribute('data-id');
            addToCart(productId, 1);
        }
    }

    // Update cart count on page load
    updateCartCount();
    productsGrid.addEventListener('click', handleAddToCart);
    initPage();
});
