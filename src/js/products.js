// This file manages the product-related functionality, including loading products dynamically and handling user interactions.

document.addEventListener('DOMContentLoaded', () => {
    let productsGrid = document.getElementById('products-list') || document.querySelector('.products-grid');
    if (!productsGrid) {
        const mainSection = document.querySelector('main');
        productsGrid = document.createElement('div');
        productsGrid.id = 'products-list';
        productsGrid.className = 'products-grid';
        if (mainSection) mainSection.appendChild(productsGrid);
    }

    const products = [
        { id: 1, name: 'Elegant Vase', price: 499, image: 'https://i.pinimg.com/736x/be/b8/4a/beb84a2080676c34ec82b6787db46f82.jpg', description: 'A decorative flower pot with fresh flowers.', category: 'Home Decor' },
        { id: 2, name: 'Handmade Candle', price: 399, image: 'https://i.pinimg.com/736x/7f/e5/a1/7fe5a1007507843008e0a5b0f93f2d70.jpg', description: 'A soothing scented candle with a delightful fragrance.', category: 'Home Decor' },
        { id: 3, name: 'Personalized Mug', price: 299, image: 'https://i.pinimg.com/736x/52/3c/42/523c4271199bdb00977c37eab70f32d5.jpg', description: 'A custom mug perfect for your morning coffee.', category: 'Personal Care' },
        { id: 4, name: 'coffee set Box', price: 899, image: 'https://i.pinimg.com/1200x/2e/a7/c6/2ea7c61c3275df18bd7912003328f37b.jpg', description: 'A premium gift box filled with assorted goodies.', category: 'Kitchen' },
        { id: 5, name: 'chocalates set box', price: 649, image: 'https://i.pinimg.com/1200x/52/4a/d3/524ad3c1fddf6a2b110fc3788b272e59.jpg', description: 'Premium scented soaps and lotions in a beautiful set.', category: 'Personal Care' },
        { id: 6, name: 'Jewelry Box', price: 449, image: 'https://i.pinimg.com/736x/8c/6d/d5/8c6dd546c6c3dd266ca87b87e8a8e884.jpg', description: 'Elegant wooden jewelry box with mirror.', category: 'Home Decor' },
        { id: 7, name: 'Photo Frame', price: 349, image: 'https://i.pinimg.com/736x/b9/0f/a0/b90fa0ed952616c4a16ab02922b78479.jpg', description: 'Stylish photo frame perfect for memories.', category: 'Home Decor' },
        { id: 8, name: 'Aromatherapy Diffuser', price: 749, image: 'https://i.pinimg.com/736x/4c/0e/46/4c0e463f5e5da817fc19b04e98a3a549.jpg', description: 'Electric diffuser with essential oils.', category: 'Personal Care' },
        { id: 9, name: 'Bamboo Cutting Board', price: 399, image: 'https://i.pinimg.com/736x/63/f4/36/63f436ef3de95137db2a0edf740c15bf.jpg', description: 'Eco-friendly bamboo cutting board for the kitchen.', category: 'Kitchen' },
        { id: 10, name: 'Leather Watch', price: 1299, image: 'https://i.pinimg.com/1200x/cd/70/f1/cd70f160b2b11eec0e8da8c380fbc7bb.jpg', description: 'Classic leather strap watch for everyday wear.', category: 'Fashion' },
        { id: 11, name: 'Desk Organizer', price: 449, image: 'https://i.pinimg.com/736x/0f/82/7e/0f827ec91186faf1448f574ef5ebc7b9.jpg', description: 'Wooden desk organizer with multiple compartments.', category: 'Home Decor' },
        { id: 12, name: 'Wine Glass Set', price: 799, image: 'https://i.pinimg.com/736x/54/81/0a/54810a5dbf06789393fe4b6711565098.jpg', description: 'Set of 4 elegant wine glasses with gift packaging.', category: 'Kitchen' },
        { id: 13, name: 'Silk Pillowcase', price: 599, image: 'https://i.pinimg.com/1200x/9f/8a/b3/9f8ab36734399f898aad4f144ed7e01a.jpg', description: 'Luxurious silk pillowcase for better sleep quality.', category: 'Personal Care' },
        { id: 14, name: 'Wooden Puzzle', price: 299, image: 'https://i.pinimg.com/736x/8f/be/9b/8fbe9ba3fdf0d76ea1b1be989ab304c9.jpg', description: 'Challenging wooden brain teaser puzzle.', category: 'Gifts' },
        { id: 15, name: 'Bath Bomb Set', price: 549, image: 'https://i.pinimg.com/736x/89/e5/9d/89e59d15c02c585ef5ba87f254c937d2.jpg', description: 'Colorful bath bombs with relaxing scents.', category: 'Personal Care' },
        { id: 16, name: 'Portable Phone Stand', price: 199, image: 'https://i.pinimg.com/736x/e3/0a/fc/e30afc4bc98f58e599e0b02ef91326a9.jpg', description: 'Adjustable phone stand for any device.', category: 'Electronics' },
        { id: 17, name: 'Coffee Maker', price: 1499, image: 'https://i.pinimg.com/736x/57/36/14/573614a65cb3bf19f45e730e8b26f038.jpg', description: 'Modern programmable coffee maker for the perfect brew.', category: 'Kitchen' },
        { id: 18, name: 'Scarf Collection', price: 499, image: 'https://i.pinimg.com/736x/ef/1c/22/ef1c226c873ca3e7a6b614848d1ece8a.jpg', description: 'Premium cotton scarves in various colors.', category: 'Fashion' },
        { id: 19, name: 'Desk Lamp', price: 649, image: 'https://i.pinimg.com/736x/ea/b6/04/eab604a2df071e4eff20947a65413ff7.jpg', description: 'LED desk lamp with adjustable brightness.', category: 'Electronics' },
        { id: 20, name: 'Bluetooth Speaker', price: 999, image: 'https://i.pinimg.com/1200x/0a/bb/19/0abb1999934241004ade62accc27648c.jpg', description: 'Portable Bluetooth speaker with superior sound quality.', category: 'Electronics' },
        { id: 21, name: 'Succulent Plant Set', price: 449, image: 'https://i.pinimg.com/1200x/63/2e/d1/632ed15f4306d55fae921ca6cd0f856c.jpg', description: 'Live succulent plants in decorative pots.', category: 'Plants' },
        { id: 22, name: 'Leather Wallet', price: 699, image: 'https://i.pinimg.com/736x/23/c9/ff/23c9ffe39e30f915d0896ddb47c8bdf6.jpg', description: 'Premium leather wallet with multiple card slots.', category: 'Fashion' },
        { id: 23, name: 'Notebook Set', price: 299, image: 'https://i.pinimg.com/736x/25/8e/74/258e74ae56305c4d45fab001aadcbfdd.jpg', description: 'Elegant lined notebooks perfect for journaling.', category: 'Gifts' },
        { id: 24, name: 'Keychain Charm', price: 149, image: 'https://i.pinimg.com/736x/13/33/0d/13330d8432bff008369f5cf3ab25f7fd.jpg', description: 'Decorative keychain with personalization options.', category: 'Gifts' },
        { id: 25, name: 'Ceramic Planter', price: 349, image: 'https://i.pinimg.com/1200x/8c/36/03/8c36038aef1a1f124e6466f7a313eb71.jpg', description: 'Beautiful ceramic planter for indoor plants.', category: 'Kitchen' },
        { id: 26, name: 'Humidifier', price: 899, image: 'https://i.pinimg.com/736x/d4/f7/33/d4f733ad3bd6c98fbaab1881d7f3793c.jpg', description: 'Ultrasonic humidifier for comfortable air quality.', category: 'Electronics' },
         { id: 27, name: 'Makeup Brush Set', price: 549, image: 'https://i.pinimg.com/736x/77/09/6c/77096ce7a85af92cb508d75e5331bd35.jpg', description: 'Professional makeup brush set with storage case.', category: 'Personal Care' },
        { id: 29, name: 'Insulated Water Bottle', price: 599, image: 'https://i.pinimg.com/1200x/52/74/9f/52749f1a73e9d3cfad14c3d33f27f52b.jpg', description: 'Keeps drinks cold for 24 hours or hot for 12 hours.', category: 'Gifts' },
        { id: 30, name: 'Throw Pillow', price: 449, image: 'https://i.pinimg.com/1200x/1c/9c/92/1c9c927c16a9caa6342e30bdde44c375.jpg', description: 'Soft decorative throw pillow for any room.', category: 'Home Decor' },
        { id: 31, name: 'Hair Styling Set', price: 799, image: 'https://i.pinimg.com/736x/ed/49/8c/ed498c3765e273e61bfb613e30f6e681.jpg', description: 'Complete hair styling tool set with carrying case.', category: 'Personal Care' },
        { id: 32, name: 'Marble Coasters', price: 299, image: 'https://i.pinimg.com/1200x/cd/71/1f/cd711fbc3d8f29564b52fa82756650aa.jpg', description: 'Set of 4 elegant marble coasters.', category: 'Home Decor' },
        { id: 33, name: 'Essential Oil Kit', price: 699, image: 'https://i.pinimg.com/474x/ff/17/38/ff173892843a41a472c691af262f5672.jpg', description: 'Complete kit with 12 essential oils for aromatherapy.', category: 'Personal Care' },
        { id: 34, name: 'Travel Organizer', price: 499, image: 'https://i.pinimg.com/736x/16/b7/dc/16b7dccfacf1ea7d4add6840fe695553.jpg', description: 'Compact travel organizer for toiletries and accessories.', category: 'Personal Care' },
        { id: 35, name: 'Smart LED Bulbs', price: 899, image: 'https://i.pinimg.com/1200x/d8/da/36/d8da36c2247144cf1f5de7a2d8eb0a76.jpg', description: 'Set of 2 smart LED bulbs with WiFi control.', category: 'Electronics' },
        { id: 36, name: 'Beeswax Candles', price: 449, image: 'https://i.pinimg.com/1200x/fc/bd/01/fcbd016673c226833e157aacde5b81ea.jpg', description: 'Natural beeswax candles for a clean burn.', category: 'Home Decor' },
        { id: 37, name: 'Sunglasses', price: 999, image: 'https://i.pinimg.com/1200x/07/75/c2/0775c22cb44eaeb1ee586605ed6a13e8.jpg', description: 'UV protected designer sunglasses.', category: 'Fashion' },
        { id: 38, name: 'Storage Baskets', price: 749, image: 'https://i.pinimg.com/736x/a0/e5/82/a0e5827e5e47c66e84d6f73f4b28de34.jpg', description: 'Set of 3 woven storage baskets for organization.', category: 'Home Decor' },
        { id: 39, name: 'Fragrance Diffuser', price: 849, image: 'https://i.pinimg.com/1200x/54/18/ce/5418ce5ff2b7f8d49532a27da210029f.jpg', description: 'Luxury fragrance diffuser with premium scents.', category: 'Personal Care' },
        { id: 40, name: 'Gift Card Bundle', price: 1999, image: 'https://i.pinimg.com/736x/0c/c2/eb/0cc2ebcf06724d4fd23d34a37d6afa43.jpg', description: 'Flexible gift card perfect for any occasion.', category: 'Gifts' }
    ];

    function loadProducts() {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="product-price">₹${product.price}</p>
                    <button class="add-to-cart-btn btn-add" data-id="${product.id}">Add to Cart</button>
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
        const product = products.find(p => p.id === parseInt(productId));
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity += parseInt(quantity);
        } else {
            cart.push({ ...product, quantity: parseInt(quantity) });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showAddToCartSuccess(product.name, quantity);
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
    loadProducts();
});