// Optimized index.js

document.addEventListener('DOMContentLoaded', () => {
    initDropdowns();
    initBannerSlider();
    initSaleCarousels();
    initCountdown();
    initSellCarousel();
    // initScrollHeader();
});

// scroll header
// function initScrollHeader() {
//     let scrollToTop = 0;
//     const header = document.querySelector('header');

//     window.addEventListener('scroll', function () {
//         let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

//         if (currentScroll > scrollToTop) {
//             header.classList.add('hide');
//         } else {
//             header.classList.remove('hide');
//         }

//         scrollToTop = currentScroll <= 0 ? 0 : currentScroll
//     })
// }

function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const options = document.querySelectorAll('.language-option, .currency-option');

    // Toggle dropdown display
    window.toggleDropdown = function (dropdownId) {
        const dropdown = document.getElementById(dropdownId);

        // Close all other dropdowns
        dropdowns.forEach(dd => {
            if (dd.id !== dropdownId) {
                dd.classList.remove('active');
            }
        });

        // Toggle the clicked dropdown
        dropdown.classList.toggle('active');
    };

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (event) {
        if (!Array.from(options).some(option => option.contains(event.target))) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// ====== Category Menu ======
function initCategoryMenu() {
    const categoryToggle = document.getElementById('categoryToggle');
    const submenu = document.getElementById('submenu-categories');
    const overlay = document.getElementById('overlay');

    if (!categoryToggle || !submenu || !overlay) return;

    // Toggle submenu and overlay on click
    categoryToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        submenu.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Hide submenu and overlay when clicking outside
    document.addEventListener('click', (e) => {
        if (!categoryToggle.contains(e.target)) {
            submenu.classList.remove('active');
            overlay.classList.remove('active');
        }
    });

    // Also close when clicking directly on the overlay
    overlay.addEventListener('click', () => {
        submenu.classList.remove('active');
        overlay.classList.remove('active');
    });
}

// Menu mobile
function toggleMenu() {
    const menuOverlay = document.getElementById('menuOverlay');
    const backdrop = document.getElementById('backdrop');
    menuOverlay.classList.toggle('active');
    backdrop.classList.toggle('active');
    menuOverlay.classList.remove('gray');
    document.querySelectorAll('.mobile-sub-menu').forEach(subMenu => {
        subMenu.classList.remove('active');
    });
}

function toggleSubMenu(menuId) {
    const subMenu = document.getElementById(`subMenu-${menuId}`);
    const menuOverlay = document.getElementById('menuOverlay');
    const isActive = subMenu.classList.contains('active');

    document.querySelectorAll('.mobile-sub-menu').forEach(subMenu => {
        subMenu.classList.remove('active');
    });

    if (!isActive) {
        subMenu.classList.add('active');
        menuOverlay.classList.add('gray');
    } else {
        menuOverlay.classList.remove('gray');
    }
}

function closeAll() {
    const menuOverlay = document.getElementById('menuOverlay');
    const backdrop = document.getElementById('backdrop');
    menuOverlay.classList.remove('active');
    backdrop.classList.remove('active');
    // Đóng tất cả submenu
    document.querySelectorAll('.mobile-sub-menu').forEach(subMenu => {
        subMenu.classList.remove('active');
    });
    // Reset màu
    menuOverlay.classList.remove('gray');
}

function initBannerSlider() {
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const carousel = document.querySelector('#banner');
    const inner = document.querySelector('.banner-inner');
    const items = document.querySelectorAll('.banner-item');
    const dots = document.querySelectorAll('.dot');
    let index = 0, interval;

    const update = () => {
        inner.style.transform = `translateX(-${index * 100}%)`;
        [...items].forEach((el, i) => el.classList.toggle('active', i === index));
        [...dots].forEach((el, i) => el.classList.toggle('active', i === index));
    };

    const goTo = i => { index = (i + items.length) % items.length; update(); };
    const nextSlide = () => goTo(index + 1);
    const prevSlide = () => goTo(index - 1);

    const start = () => interval = setInterval(nextSlide, 5000);
    const stop = () => clearInterval(interval);

    prev?.addEventListener('click', () => {
        stop();
        prevSlide();
        setTimeout(start, 100); // chờ 100ms rồi mới restart auto-slide
    });

    next?.addEventListener('click', () => {
        stop();
        prevSlide();
        setTimeout(start, 100); // chờ 100ms rồi mới restart auto-slide
    });

    dots.forEach((dot, i) => dot.addEventListener('click', () => { stop(); goTo(i); start(); }));
    carousel?.addEventListener('mouseenter', stop);
    carousel?.addEventListener('mouseleave', start);

    start();
}

function initSaleCarousels() {
    const isMobile = window.innerWidth < 1024;

    const createCarousel = (selector, items) => {
        $(selector).owlCarousel({
            loop: isMobile,
            nav: false,
            mouseDrag: selector !== '.carousel-deals' && selector !== '.carousel-recommend',
            touchDrag: true,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsive: items,
            onInitialized: addAriaLabels,
            onRefreshed: addAriaLabels
        });
    };

    const addAriaLabels = function () {
        $(this.$element).find('.owl-dot').each(function (index) {
            $(this).attr('aria-label', `Chuyển đến slide ${index + 1}`);
        });
    };

    $(document).ready(() => {
        createCarousel('.carousel-sale', { 0: { items: 1 }, 576: { items: 2 }, 756: { items: 3 }, 1024: { items: 4 }, 1200: { items: 8 } });
        createCarousel('.carousel-deals', { 0: { items: 1 }, 576: { items: 2 }, 768: { items: 3 }, 1024: { items: 4 }, 1200: { items: 5 } });
        createCarousel('.carousel-recommend', { 0: { items: 1 }, 576: { items: 2 }, 768: { items: 3 }, 1024: { items: 4 }, 1200: { items: 5 } });
    });
}

function initCountdown() {
    let endTime = localStorage.getItem('countDownEndTime');
    if (!endTime) {
        endTime = Date.now() + 856 * 24 * 60 * 60 * 1000;
        localStorage.setItem('countDownEndTime', endTime);
    } else {
        endTime = parseInt(endTime);
    }

    setInterval(() => {
        const now = Date.now();
        const distance = endTime - now;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(d).padStart(2, '0');
        document.getElementById('hours').textContent = String(h).padStart(2, '0');
        document.getElementById('minutes').textContent = String(m).padStart(2, '0');
        document.getElementById('seconds').textContent = String(s).padStart(2, '0');
    }, 1000);
}

function initSellCarousel() {
    const carousel = document.querySelector('.section-sell-product-carousel');
    if (!carousel) return;

    let isDragging = false, startX = 0, currentX = 0, prevX = 0, index = 0, interval, animID;

    const getX = e => e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const setX = x => carousel.style.transform = `translateX(${x}px)`;

    const handleStart = e => {
        startX = getX(e);
        isDragging = true;
        carousel.classList.add('grabbing');
        stop();
        cancelAnimationFrame(animID);
    };

    const handleMove = e => {
        if (!isDragging) return;
        currentX = prevX + (getX(e) - startX);
        setX(currentX);
    };

    const handleEnd = () => {
        isDragging = false;
        carousel.classList.remove('grabbing');

        const product = carousel.querySelector('.section-sell-product-card');
        const count = carousel.querySelectorAll('.section-sell-product-card').length;
        const maxX = -(count * product.offsetWidth - carousel.offsetWidth);
        let targetX = Math.round(currentX / product.offsetWidth) * product.offsetWidth;
        targetX = Math.max(maxX, Math.min(0, targetX));
        index = Math.abs(Math.round(targetX / product.offsetWidth));

        const animate = () => {
            const diff = targetX - currentX;
            if (Math.abs(diff) < 0.5) {
                currentX = targetX;
                prevX = currentX;
                setX(currentX);
                start();
                return;
            }
            currentX += diff * 0.2;
            prevX = currentX;
            setX(currentX);
            animID = requestAnimationFrame(animate);
        };

        animID = requestAnimationFrame(animate);
    };

    const start = () => {
        stop();
        interval = setInterval(() => {
            const product = carousel.querySelector('.section-sell-product-card');
            const count = carousel.querySelectorAll('.section-sell-product-card').length;
            const visible = Math.floor(carousel.offsetWidth / product.offsetWidth);
            const maxIndex = count - visible;
            index = (index >= maxIndex) ? 0 : index + 1;
            animateTo(-index * product.offsetWidth);
        }, 3000);
    };

    const stop = () => clearInterval(interval);

    const animateTo = target => {
        const startT = currentX, startTime = performance.now(), duration = 500;
        const step = now => {
            const elapsed = now - startTime;
            if (elapsed >= duration) return setX(target);
            const progress = 1 - Math.pow(1 - elapsed / duration, 3);
            currentX = startT + (target - startT) * progress;
            prevX = currentX;
            setX(currentX);
            requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    carousel.addEventListener('touchstart', handleStart, { passive: true });
    carousel.addEventListener('touchmove', handleMove, { passive: true });
    carousel.addEventListener('touchend', handleEnd);
    carousel.addEventListener('mousedown', handleStart);
    carousel.addEventListener('mousemove', handleMove);
    carousel.addEventListener('mouseup', handleEnd);
    carousel.addEventListener('mouseleave', handleEnd);
    carousel.addEventListener('contextmenu', e => e.preventDefault());

    const updateLayout = () => {
        currentX = prevX = 0;
        index = 0;
        setX(0);
        if (window.innerWidth >= 992) stop(); else start();
    };

    window.addEventListener('resize', updateLayout);
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : (window.innerWidth < 992 && start()));

    updateLayout();
}
