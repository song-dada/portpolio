
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const urlParams = new URLSearchParams(window.location.search);
    const activePage = urlParams.get('page');

    navLinks.forEach(link => {
        if (link.dataset.page === activePage) {
            link.classList.add('highlight');
        }

        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = link.dataset.page;
            window.location.search = `?page=${page}`;
            document.getElementById('contentFrame').src = `${page}.html`;
        });
    });

    // Load initial content based on URL parameter
    if (activePage) {
        document.getElementById('contentFrame').src = `${activePage}.html`;
    }
    
});

document.getElementById('contentFrame').src = '/home.html';
