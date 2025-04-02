document.addEventListener("DOMContentLoaded",() => {
    window.addEventListener('message', (event) => {
        if (event.data.action === 'highlight') {
            const pageUrl = event.data.pageUrl;
            const navLinks = document.querySelectorAll('.nav-bar a');
            navLinks.forEach(link => {
                if (link.getAttribute('data-page') === pageUrl) {
                    link.classList.add('highlight');
                } else {
                    link.classList.remove('highlight');
                }
            });
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const navLinks = document.querySelectorAll('.nav-bar a');
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const pageUrl = link.getAttribute('data-page');
                window.parent.postMessage({ action: 'loadPage', pageUrl }, '*');
            });
        });
    });

});