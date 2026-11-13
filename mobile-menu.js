/* Mobile navigation drawer */
(() => {
    const openButton = document.getElementById('mobile-menu-open');
    const closeButton = document.getElementById('mobile-menu-close');
    const drawer = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');

    if (!openButton || !closeButton || !drawer || !overlay) return;

    let previouslyFocusedElement = null;

    function openMenu() {
        previouslyFocusedElement = document.activeElement;
        overlay.hidden = false;
        requestAnimationFrame(() => overlay.classList.add('is-visible'));
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        drawer.removeAttribute('inert');
        openButton.setAttribute('aria-expanded', 'true');
        document.body.classList.add('mobile-menu-open');
        closeButton.focus();
    }

    function closeMenu() {
        drawer.classList.remove('is-open');
        overlay.classList.remove('is-visible');
        drawer.setAttribute('aria-hidden', 'true');
        drawer.setAttribute('inert', '');
        openButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('mobile-menu-open');

        window.setTimeout(() => {
            if (!drawer.classList.contains('is-open')) overlay.hidden = true;
        }, 300);

        if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
            previouslyFocusedElement.focus();
        } else {
            openButton.focus();
        }
    }

    openButton.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    drawer.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && drawer.classList.contains('is-open')) {
            closeMenu();
        }
    });
})();
