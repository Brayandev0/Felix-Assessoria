document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const overlayCloseBtn = document.querySelector('.overlay-close-btn');
    const overlayNavLinks = document.querySelectorAll('.overlay-nav-link'); // Get overlay nav links
    const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link'); // Get desktop nav links

    // Function to open the overlay
    function openOverlay() {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        menuToggle.setAttribute('aria-expanded', 'true');
    }

    // Function to close the overlay
    function closeOverlay() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scroll
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    // Toggle mobile menu overlay
    menuToggle.addEventListener('click', function() {
        if (mobileMenuOverlay.classList.contains('active')) {
            closeOverlay();
        } else {
            openOverlay();
        }
    });

    // Close overlay with the close button
    overlayCloseBtn.addEventListener('click', closeOverlay);

    // Close mobile menu when an overlay link is clicked
    overlayNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeOverlay();
            // Smooth scroll will be handled by the general smooth scroll function
        });
    });

    // Smooth scrolling for ALL anchor links (desktop and overlay)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if it's a link to the current page
            if (this.pathname === window.location.pathname && this.hash) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Calculate header height dynamically or use a fixed value
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const extraOffset = 10; // Extra space above the section
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - extraOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                     // Close overlay if it's open and the clicked link was inside it
                    if (mobileMenuOverlay.classList.contains('active') && this.classList.contains('overlay-nav-link')) {
                         // Already handled by the dedicated listener, but safe to keep
                        closeOverlay();
                    }
                }
            }
        });
    });

     // Initialize Feather Icons after potentially adding new ones
    feather.replace();

}); // End DOMContentLoaded