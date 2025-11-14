import { getCart, getCartTotal, updateCartBadge, displayCart } from './cart.js';

function getBreadcrumbPreviousPage() {
    const previousPage = document.getElementById('breadcrumb-previous-page');
    if (!previousPage) return;

    previousPage.querySelector('a').textContent = getCart()[0].title.replace("Rainy Days", "");
}

function orderSummary() {
    const cart = getCart();

    const summary = document.querySelector('.order-summary');
    if (!summary) return;

    if (!cart || cart.length === 0) {
        summary.innerHTML = `<legend>Order summary</legend>
        <p>Your cart is empty</p>`;
    const subtotal = document.querySelector('.summary-cost-details h4:last-child');
    if (subtotal) subtotal.textContent = 'subtotal: $0.00';
    return;
}

let itemsHtml = '';
cart.forEach(item => {
    itemsHtml += ` <div class="summary-item-details"> 
    <img src="${item.image}" alt="${item.title}" class="cart-image">
    <div class="order-title"> 
    <h5>${item.title} <span>(x${item.quantity || 1})</span></h5>
    </div>
    <div class="summary-cost-details">
    <h5>Price: $${Number(item.price * (item.quantity || 1)).toFixed(2)}</h5>
    </div>
    </div> `;
});

summary.innerHTML = `<legend>Order summary</legend>
${itemsHtml}
<div class="summary-cost-details">
<h4>Shipping: Free</h4>
<h4>Subtotal: $${getCartTotal().toFixed(2)}</h4>
</div>
</fieldset>
`;

updateCartBadge();
displayCart();
}

orderSummary();
getBreadcrumbPreviousPage();