import { getCart, getCartTotal, updateCartBadge } from './cart.js';


function getNextOrderNumber() {
    const lastOrderNumber = localStorage.getItem('lastOrderNumber');
    const nextOrderNumber = lastOrderNumber ? parseInt(lastOrderNumber) + 1 : 1000;
    localStorage.setItem('lastOrderNumber', nextOrderNumber.toString());
    return nextOrderNumber;
}

function confirmation() {
    const cart = getCart();
    
    const confirmationMessage = document.querySelector('.confirmation-message');
    if (!confirmationMessage) return;
    


let orderedItems = '';

    if (cart.length > 0) {
        orderedItems = '<h3>Items ordered:</h3><ul>';
        cart.forEach(item => {
            orderedItems += `<img src="${item.image}" alt="${item.title}" class="cart-image"> <li>${item.title} <span>(x${item.quantity || 1})</span> <br> Price: $${item.price * (item.quantity || 1).toFixed(2)}</li>`;
        });
        orderedItems += `</ul>
        <p>Total: $${getCartTotal().toFixed(2)}</p>`;
    }

    confirmationMessage.innerHTML = `
    <h1><i class="fas fa-check"></i> Thank you for your order!</h1>
    <h2>Order number: #${getNextOrderNumber()}</h2>
    ${orderedItems}`;
    updateCartBadge();
}

confirmation();
// localStorage.removeItem('cart');