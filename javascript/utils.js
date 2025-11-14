export function showLoading() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
}

export function hideLoading() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
}

export function showError(message) {
    alert(message);
}

export function breadCrumbs(pageName) {
    const breadcrumbs = document.querySelector('.breadcrumbs');
}