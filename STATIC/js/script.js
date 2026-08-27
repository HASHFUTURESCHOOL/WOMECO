// WOMECO - World Meaningful Education Council
// Main JavaScript File

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Mobile Dropdown Toggle
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
});

// Hero Slider
const heroSlides = document.querySelectorAll('.hero-slide');
const heroPrevBtn = document.getElementById('heroPrev');
const heroNextBtn = document.getElementById('heroNext');
const heroIndicatorsContainer = document.getElementById('heroIndicators');
let currentSlide = 0;
let slideInterval;

// Create indicators
if (heroIndicatorsContainer && heroSlides.length > 0) {
    heroSlides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('hero-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        heroIndicatorsContainer.appendChild(indicator);
    });
}

const indicators = document.querySelectorAll('.hero-indicator');

function goToSlide(n) {
    heroSlides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    currentSlide = (n + heroSlides.length) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

if (heroNextBtn) {
    heroNextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });
}

if (heroPrevBtn) {
    heroPrevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });
}

// Start slideshow
if (heroSlides.length > 0) {
    startSlideShow();
}

// Pause slideshow on hover
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    heroSlider.addEventListener('mouseenter', stopSlideShow);
    heroSlider.addEventListener('mouseleave', startSlideShow);
}

// Counter Animation for Stats
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target % 1 === 0 ? target : target.toFixed(1);
            clearInterval(timer);
        } else {
            element.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
        }
    }, 16);
}

// Intersection Observer for Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        }
    });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchButton = searchInput ? searchInput.nextElementSibling : null;

if (searchButton) {
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        }
    });
}

// Language Selector
const languageSelector = document.getElementById('language');
if (languageSelector) {
    languageSelector.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        // In a real implementation, this would change the language
        console.log(`Language changed to: ${selectedLang}`);
        // You could implement language switching logic here
    });
}

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.focus-card, .news-card, .resource-card');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in-up');
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Sticky Header on Scroll
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Prevent body scroll when mobile menu is open
const body = document.body;
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
}

// Performance: Lazy load images (if implemented)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Form validation (for future contact forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Newsletter subscription (placeholder)
const newsletterForms = document.querySelectorAll('form[data-newsletter]');
newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && validateEmail(emailInput.value)) {
            alert('Thank you for subscribing to our newsletter!');
            form.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
});

// Print page setup
window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections before printing
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        body.style.overflow = '';
    }
});

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('WOMECO website loaded successfully! 🎓');
