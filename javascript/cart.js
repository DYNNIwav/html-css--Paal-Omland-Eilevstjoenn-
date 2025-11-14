
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(item) {
    const cart = getCart();
    const qtyToAdd = item.quantity ? parseInt(item.quantity) : 1;
    const existing = cart.find(i => i.id ===item.id);
    if (existing) {
        existing.quantity += qtyToAdd;
    } else {
        item.quantity = qtyToAdd;
        cart.push(item);
    }

    saveCart(cart);
    updateCartBadge();
}


function getCartTotal() {
    const cart = getCart();
    let total = 0;
    cart.forEach(item => {
        total += item.price * (item.quantity || 1)
    });
    return total;
}

function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
    const badge = document.querySelector('.cart-badge');
    if (!badge) {

        return;
    }
    if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'inline-block';
        badge.style.visibility = 'visible';
    } else {
        badge.style.display = 'none';
    }
}

function removeFromCartById(id) {
    const cart = getCart().filter(i => i.id !== id);
        saveCart(cart);
        updateCartBadge();
        displayCart();
    }

function displayCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartDrawer = document.querySelector('#cart-drawer');
    if (!cartItemsContainer || !cartDrawer) return;
    const cart = getCart();

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<h2>your cart is empty</h2>';
        updateCartTotal();
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-items';
        itemElement.innerHTML = `
        <div class="cart-items">
        <img class="cart-image" src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
            <h4 class="cart-title">${item.title} <span>(x${item.quantity || 1})</span></h4> 
            

        <h5 class="cart-price"> $${(item.price * (item.quantity || 1)).toFixed(2)}</h5>

        <button class="remove-item" data-id="${item.id}">Remove</button>
        </div>
        `;
        cartItemsContainer.appendChild(itemElement);    
    });

    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            removeFromCartById(id);

    });
});

function updateCartTotal() {
    const total = getCartTotal();
    const totalElement = document.querySelector('.cart-total p:last-child');
    if (totalElement) {
        totalElement.textContent = `subtotal: $${total.toFixed(2)}`;
    }
}
updateCartTotal();
}


export { getCart, saveCart, addToCart, removeFromCartById, getCartTotal, updateCartBadge, displayCart};