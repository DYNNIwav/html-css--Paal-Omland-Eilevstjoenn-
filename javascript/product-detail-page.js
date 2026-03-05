import { fetchJacketById } from './api.js';
import { showLoading, hideLoading, showToast } from './utils.js';
import { addToCart, updateCartBadge, displayCart } from './cart.js';

function getJacketIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return id;
}

function displayJacket(jacket) {
    const titleElement = document.getElementById('jacket-title');
    const priceElement = document.getElementById('jacket-price');
    const imageElement = document.getElementById('jacket-image');
    const descriptionElement = document.getElementById('jacket-description');
    const sizeElement = document.getElementById('jacket-size');
    const colorElement = document.getElementById('jacket-color');
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    const whyBuyHeader = document.getElementById('why-buy-header');

    if (titleElement) titleElement.textContent = jacket.title;
    if (priceElement) priceElement.textContent = `$${jacket.price}`;
    if (imageElement) imageElement.src = jacket.image.url;
    if (descriptionElement) descriptionElement.textContent = jacket.description;
    if (sizeElement) sizeElement.textContent = jacket.size;
    if (colorElement) colorElement.textContent = jacket.baseColor;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = jacket.title.replace("Rainy Days", "");
    if (whyBuyHeader) whyBuyHeader.textContent = `WHY BUY ${jacket.title.replace("Rainy Days", "").toUpperCase()}?`;
    AddToCartButton(jacket);
}

async function init() {
    showLoading();
    try {
        const jacketId = getJacketIdFromUrl();
        if (!jacketId) {
            showToast('No jacket ID found in the URL', 'error');
            return;
        }

        const jacket = await fetchJacketById(jacketId);
        displayJacket(jacket);
        CartDrawerOverlay();
        updateCartBadge();
    } catch (error) {
        showToast('Unable to load jacket details. Sorry for the inconvenience.', 'error');
    } finally {
        hideLoading();
    }
}

init();


function AddToCartButton(jacket) {
    const addToCartButton = document.querySelector('.add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', (e) => { 
            e.preventDefault();    
            
            const quantityInput = document.getElementById('quantity');
            const quantity = quantityInput ? parseInt(quantityInput.value, 10) : 1;

        const cartItem = {
            id: jacket.id,
            title: jacket.title,
            price: jacket.price,
            image: jacket.image.url,
            size: jacket.size,
            color: jacket.baseColor,
            quantity: quantity,
        };
        addToCart(cartItem);
        showToast(`${jacket.title} was added to your cart`);
        updateCartBadge();
        });
    }
}

function CartDrawerOverlay() {
    const cartButton = document.querySelector('.cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            displayCart();
        });
    }
}

