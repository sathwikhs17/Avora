// Sample cart data - in a real app, this would come from a backend
let cartItems = [
    {
        id: 1,
        name: "Abstract Harmony",
        artist: "John Doe",
        price: 12999,
        quantity: 1,
        image: "/api/placeholder/150/150"
    }
];

// DOM Elements
const cartItemsContainer = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');
const emptyCart = document.getElementById('empty-cart');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');

// Initialize cart
function initializeCart() {
    updateCartDisplay();
    updateSummary();
}

// Create cart item HTML
function createCartItemHTML(item) {
    return `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Artist: ${item.artist}</p>
                <p class="price">₹${item.price.toLocaleString()}</p>
                <div class="quantity-controls">
                    <button class="decrease-quantity">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-quantity">+</button>
                </div>
            </div>
            <button class="remove-btn">Remove</button>
        </div>
    `;
}

// Update cart display
function updateCartDisplay() {
    if (cartItems.length === 0) {
        cartItemsContainer.style.display = 'none';
        cartSummary.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }

    cartItemsContainer.style.display = 'grid';
    cartSummary.style.display = 'block';
    emptyCart.style.display = 'none';

    cartItemsContainer.innerHTML = cartItems.map(item => createCartItemHTML(item)).join('');
    attachEventListeners();
}

// Update cart summary
function updateSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    subtotalElement.textContent = `₹${subtotal.toLocaleString()}`;
    totalElement.textContent = `₹${subtotal.toLocaleString()}`;
}

// Event Listeners
function attachEventListeners() {
    // Quantity decrease buttons
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const id = parseInt(cartItem.dataset.id);
            const item = cartItems.find(item => item.id === id);
            
            if (item.quantity > 1) {
                item.quantity--;
                cartItem.querySelector('.quantity').textContent = item.quantity;
                updateSummary();
            }
        });
    });

    // Quantity increase buttons
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const id = parseInt(cartItem.dataset.id);
            const item = cartItems.find(item => item.id === id);
            
            item.quantity++;
            cartItem.querySelector('.quantity').textContent = item.quantity;
            updateSummary();
        });
    });

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const id = parseInt(cartItem.dataset.id);
            cartItems = cartItems.filter(item => item.id !== id);
            updateCartDisplay();
            updateSummary();
        });
    });
}

// Checkout button
checkoutBtn.addEventListener('click', () => {
    alert('Proceeding to checkout...');
    // Add checkout logic here
});

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', initializeCart);