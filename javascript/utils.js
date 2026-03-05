export function showLoading() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
}

export function hideLoading() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
}

export function showError(message) {
    showToast(message, 'error');
}

export function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

export function breadCrumbs(pageName) {
    const breadcrumbs = document.querySelector('.breadcrumbs');
}