import { updateCartBadge, displayCart } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
updateCartBadge();

const cartButton = document.querySelector('.cart-button');
if (cartButton) {
    cartButton.addEventListener('click', () => {
        displayCart();
    });
}

});