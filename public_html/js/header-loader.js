// Header Component Loader
// This script loads the header component into all pages

function loadHeader() {
    fetch('components/header.html')
        .then(response => response.text())
        .then(html => {
            // Insert header at the beginning of body (after neural-background)
            const neuralBg = document.getElementById('neural-background');
            if (neuralBg) {
                neuralBg.insertAdjacentHTML('afterend', html);
            } else {
                document.body.insertAdjacentHTML('afterbegin', html);
            }

            // Reinitialize navigation after header is loaded
            if (window.navigation) {
                window.navigation = new Navigation();
            }
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
}

// Load header when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
