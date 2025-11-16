import { fetchJackets } from './api.js';
import { showLoading, hideLoading, showError } from './utils.js';
import { updateCartBadge, displayCart } from './cart.js';



let allJackets = [];

async function init() {
    showLoading();

    try {
        allJackets = await fetchJackets();
        displayJackets(allJackets);
        filter();
        updateCartBadge();
        displayCart();
    }
    catch (error) {
        showError('Unable to load our products. Please try again later.');
    }
    finally {
        hideLoading();
    }
}

function displayJackets(jackets) {
    const container = document.getElementById('product-container');

    if (!container) return;

    container.innerHTML = '';

    if (jackets.length === 0) {
        container.innerHTML = '<p>no jackets found</p>';
    }

    jackets.forEach(jacket => {
        const jacketCard = createJacketCard(jacket);
        container.appendChild(jacketCard);
    });
}

function createJacketCard(jacket) {
    const card = document.createElement('div');
    card.className = 'product-item';
    card.innerHTML = `
    <a href="product-detail-page.html?id=${jacket.id}">
        <img src="${jacket.image.url}" alt="${jacket.title}">
            <h3>${jacket.title}</h3>
            <p class="price">${jacket.price} $</p>
        </a>
    `;
    return card;
}


//filter function
function filterByGender(gender) {
    if (gender === 'all') {
        displayJackets(allJackets);
    } else {
        const filteredJackets = allJackets.filter(jacket => jacket.gender === gender);
        displayJackets(filteredJackets);
    }
    }

function filter() {
    const filterButtons = document.querySelectorAll('.filter-tag');



    if (filterButtons.length === 0 )
{
    return;
}
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const gender = button.dataset.gender;
            filterByGender(gender);
        });
    });
}



init();

    



