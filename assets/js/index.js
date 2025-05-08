// DOM loaded actions
document.addEventListener('DOMContentLoaded', () => {
    initDropdowns();
    initCategoryMenu();
    initBannerSlider();
});

// ====== Dropdown functionality ======
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
    const submenu = document.getElementById('submenu');
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

// Slider
function initBannerSlider() {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carousel = document.querySelector('#banner');
    const inner = document.querySelector('.banner-inner');
    const items = document.querySelectorAll('.banner-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let interval;

    function updateCarousel() {
        inner.style.transform = `translateX(-${currentIndex * 100}%)`;
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = (index + items.length) % items.length;
        updateCarousel();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide();
        });
    });

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();
};

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

// slider sale
$(document).ready(function () {
    const isMobile = window.innerWidth < 1024;

    $('.carousel-sale').owlCarousel({
        loop: isMobile,
        nav: false,
        mouseDrag: true,
        touchDrag: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            756: { items: 3 },
            1024: { items: 4 },
            1200: { items: 8 },
        }
    })

    // products deals
    $('.carousel-deals').owlCarousel({
        loop: isMobile,
        nav: false,
        mouseDrag: false,
        touchDrag: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            1024: { items: 4 },
            1200: { items: 5 },
        }
    })

    // products recommend
    $('.carousel-recommend').owlCarousel({
        loop: isMobile,
        nav: false,
        mouseDrag: false,
        touchDrag: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            1024: { items: 4 },
            1200: { items: 5 },
        }
    })
})

// Countdown time
let countDowns = localStorage.getItem('countDownEndTime');

if (!countDowns) {
    countDowns = new Date().getTime() + (856 * 24 * 60 * 60 * 1000)
    localStorage.setItem('countDownEndTime', countDowns);
} else {
    countDowns = parseInt(countDowns)
}

const x = setInterval(function () {
    const now = new Date().getTime();

    const distance = countDowns - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}, 1000);

// Carousel Products
document.addEventListener('DOMContentLoaded', function () {
    const carouselSell = document.querySelector('.section-sell-product-carousel');
    let isDraggingSell = false;
    let startPositionSell = 0;
    let currentTranslateSell = 0;
    let previousTranslateSell = 0;
    let autoSlideIntervalSell;
    let currentIndexSell = 0;
    let animationIDSell;

    // Function to handle touch/mouse events
    function handleStart(e) {
        startPositionSell = getPositionX(e);
        isDraggingSell = true;
        carouselSell.classList.add('grabbing');

        // Stop auto slide when user interacts
        stopAutoSlide();

        // Stop any momentum scrolling
        cancelAnimationFrame(animationIDSell);
    }

    function handleMove(e) {
        if (isDraggingSell) {
            const currentPosition = getPositionX(e);
            const diff = currentPosition - startPositionSell;
            currentTranslateSell = previousTranslateSell + diff;

            // Apply transform
            setTranslate(currentTranslateSell);
        }
    }

    function handleEnd() {
        isDraggingSell = false;
        carouselSell.classList.remove('grabbing');

        // Calculate the closest product position
        const carouselWidthSell = carouselSell.offsetWidth;
        const productWidthSell = carouselSell.querySelector('.section-sell-product-card').offsetWidth;
        const productCountSell = carouselSell.querySelectorAll('.section-sell-product-card').length;
        const minTranslateSell = -(productCountSell * productWidthSell - carouselWidthSell);

        // Snap to the closest product
        let targetTranslate = Math.round(currentTranslateSell / productWidthSell) * productWidthSell;

        // Apply boundaries
        targetTranslate = Math.max(minTranslateSell, Math.min(0, targetTranslate));

        // Update current index
        currentIndexSell = Math.abs(Math.round(targetTranslate / productWidthSell));

        // Animate to target
        const animate = () => {
            const diff = targetTranslate - currentTranslateSell;
            const easing = 0.2;

            if (Math.abs(diff) < 0.5) {
                currentTranslateSell = targetTranslate;
                previousTranslateSell = currentTranslateSell;
                setTranslate(currentTranslateSell);

                // Restart auto slide after user interaction
                startAutoSlide();
                return;
            }

            currentTranslateSell += diff * easing;
            previousTranslateSell = currentTranslateSell;
            setTranslate(currentTranslateSell);

            animationIDSell = requestAnimationFrame(animate);
        };

        cancelAnimationFrame(animationIDSell);
        animationIDSell = requestAnimationFrame(animate);
    }

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function setTranslate(xPos) {
        carouselSell.style.transform = `translateX(${xPos}px)`;
    }

    // Auto slide functions
    function startAutoSlide() {
        // Clear any existing interval
        stopAutoSlide();

        // Start new interval
        autoSlideIntervalSell = setInterval(() => {
            const productWidth = carouselSell.querySelector('.section-sell-product-card').offsetWidth;
            const productCount = carouselSell.querySelectorAll('.section-sell-product-card').length;
            const carouselWidthSell = carouselSell.offsetWidth;
            const visibleProducts = Math.floor(carouselWidthSell / productWidth);
            const maxIndex = productCount - visibleProducts;

            // Move to next slide, or back to first if at the end
            currentIndexSell = (currentIndexSell >= maxIndex) ? 0 : currentIndexSell + 1;

            // Calculate target position
            const targetTranslate = -currentIndexSell * productWidth;

            // Animate to the target position
            animateToPosition(targetTranslate);
        }, 3000);
    }

    function stopAutoSlide() {
        if (autoSlideIntervalSell) {
            clearInterval(autoSlideIntervalSell);
        }
    }

    function animateToPosition(targetTranslate) {
        // Store target for animation
        const startTranslate = currentTranslateSell;
        const startTime = performance.now();
        const duration = 500; // 500ms animation

        const animateSlide = (currentTime) => {
            const elapsedTime = currentTime - startTime;

            if (elapsedTime >= duration) {
                // Animation complete
                currentTranslateSell = targetTranslate;
                previousTranslateSell = targetTranslate;
                setTranslate(targetTranslate);
                return;
            }

            // Easing function (ease-out)
            const progress = 1 - Math.pow(1 - elapsedTime / duration, 3);
            const translateX = startTranslate + (targetTranslate - startTranslate) * progress;

            currentTranslateSell = translateX;
            previousTranslateSell = translateX;
            setTranslate(translateX);

            requestAnimationFrame(animateSlide);
        };

        requestAnimationFrame(animateSlide);
    }

    // Touch Events
    carouselSell.addEventListener('touchstart', handleStart, { passive: true });
    carouselSell.addEventListener('touchmove', handleMove, { passive: true });
    carouselSell.addEventListener('touchend', handleEnd);

    // Mouse Events
    carouselSell.addEventListener('mousedown', handleStart);
    carouselSell.addEventListener('mousemove', handleMove);
    carouselSell.addEventListener('mouseup', handleEnd);
    carouselSell.addEventListener('mouseleave', handleEnd);

    // Prevent context menu on long press
    carouselSell.addEventListener('contextmenu', e => e.preventDefault());

    // Handle window resize
    window.addEventListener('resize', () => {
        // Reset position on resize
        currentTranslateSell = 0;
        previousTranslateSell = 0;
        currentIndexSell = 0;
        setTranslate(0);

        // Check if we're on desktop or mobile/tablet
        updateLayoutMode();
    });

    // Function to check if we're in desktop mode
    function isDesktopLayout() {
        return window.innerWidth >= 992;
    }

    // Function to update layout mode and behavior
    function updateLayoutMode() {
        if (isDesktopLayout()) {
            // In desktop mode, disable auto slide
            stopAutoSlide();
            carouselSell.style.transform = 'none';
        } else {
            // In mobile/tablet mode, enable auto slide
            startAutoSlide();
        }
    }

    // Initialize layout mode
    updateLayoutMode();

    // Pause auto slide when tab/window is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else if (!isDesktopLayout()) {
            startAutoSlide();
        }
    });
});


