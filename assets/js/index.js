// Dropdown functionality for language and currency selection
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const allDropdowns = document.querySelectorAll('.dropdown');

    // Close all other dropdowns
    allDropdowns.forEach(dd => {
        if (dd.id !== dropdownId) {
            dd.classList.remove('active');
        }
    });

    // Toggle the clicked dropdown
    dropdown.classList.toggle('active');
}

// dropdown categories
const categoryToggle = document.getElementById('categoryToggle');
const submenu = document.getElementById('submenu');
const overlay = document.getElementById('overlay');

// Toggle submenu and overlay on click
categoryToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from bubbling to document
    submenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Hide submenu and overlay with fade-out when clicking outside
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

// Close dropdowns when clicking outside
document.addEventListener('click', function (event) {
    const dropdowns = document.querySelectorAll('.dropdown');
    const options = document.querySelectorAll('.language-option, .currency-option');

    if (!Array.from(options).some(option => option.contains(event.target))) {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Slider
document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carousel = document.querySelector('.banner');
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
});

// Menu mobile
function toggleMenu() {
    const menuOverlay = document.getElementById('menuOverlay');
    const backdrop = document.getElementById('backdrop');
    menuOverlay.classList.toggle('active');
    backdrop.classList.toggle('active');
    // Reset màu khi đóng/mở menu chính
    menuOverlay.classList.remove('gray');
    // Đóng tất cả submenu
    document.querySelectorAll('.mobile-sub-menu').forEach(subMenu => {
        subMenu.classList.remove('active');
    });
}

function toggleSubMenu(menuId) {
    const subMenu = document.getElementById(`subMenu-${menuId}`);
    const menuOverlay = document.getElementById('menuOverlay');
    const isActive = subMenu.classList.contains('active');

    // Đóng tất cả submenu trước
    document.querySelectorAll('.mobile-sub-menu').forEach(subMenu => {
        subMenu.classList.remove('active');
    });

    // Nếu submenu chưa active, mở nó và đổi màu menu chính
    if (!isActive) {
        subMenu.classList.add('active');
        menuOverlay.classList.add('gray');
    } else {
        // Nếu submenu đang active, đóng nó và bỏ màu xám
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
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.getElementById('sliderContainer');
    const slider = document.getElementById('slider');
    const products = document.querySelectorAll('.product');
    const totalProducts = products.length;

    let isDraggingSlide = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let startX = 0;
    let currentX = 0;

    function getItemsPerSlide() {
        if (window.innerWidth < 576) return 2;
        if (window.innerWidth <= 767) return 3;
        if (window.innerWidth <= 1024) return 4;
        return 8;
    }

    function setSliderItemWidth() {
        const itemsPerSlide = getItemsPerSlide();
        const itemWidth = 100 / itemsPerSlide;

        products.forEach(product => {
            product.style.flex = `0 0 ${itemWidth}%`;
        });
    }

    function touchStart(event) {
        startX = getPositionX(event);
        isDraggingSlide = true;
        startPosition = getPositionX(event);

        cancelAnimationFrame(animationID);
        slider.classList.add('grabbing');
        slider.style.transition = 'none';
    }

    function touchMove(event) {
        if (isDraggingSlide) {
            currentX = getPositionX(event);
            const diff = currentX - startX;

            currentTranslate = prevTranslate + diff / sliderContainer.offsetWidth * 100;

            const itemsPerSlide = getItemsPerSlide();
            const minTranslate = -((totalProducts - itemsPerSlide) / itemsPerSlide * 100);
            const maxTranslate = 0;

            if (currentTranslate < minTranslate) {
                const overscroll = minTranslate - currentTranslate;
                currentTranslate = minTranslate - (overscroll * 0.2);
            } else if (currentTranslate > maxTranslate) {
                const overscroll = currentTranslate - maxTranslate;
                currentTranslate = maxTranslate + (overscroll * 0.2);
            }

            setSliderPosition();
        }
    }

    function touchEnd() {
        isDraggingSlide = false;
        slider.classList.remove('grabbing');
        slider.style.transition = 'transform 0.3s ease';

        const itemsPerSlide = getItemsPerSlide();
        const moveBy = currentX - startX;

        const maxTranslate = -((totalProducts - itemsPerSlide) / itemsPerSlide * 100);

        if (currentTranslate < maxTranslate) {
            currentTranslate = maxTranslate;
        } else if (currentTranslate > 0) {
            currentTranslate = 0;
        } else {
            const itemWidth = 100 / itemsPerSlide;
            const snapPosition = Math.round(currentTranslate / itemWidth) * itemWidth;
            currentTranslate = snapPosition;
        }

        prevTranslate = currentTranslate;
        setSliderPosition();
    }

    function handleWheel(event) {
        event.preventDefault();

        slider.style.transition = 'transform 0.3s ease';

        const delta = Math.sign(event.deltaX || event.deltaY);
        const itemsPerSlide = getItemsPerSlide();
        const scrollAmount = delta * (100 / itemsPerSlide);

        currentTranslate = prevTranslate - scrollAmount;

        const maxNegativeTranslate = -((totalProducts - itemsPerSlide) / itemsPerSlide * 100);

        if (currentTranslate < maxNegativeTranslate) {
            currentTranslate = maxNegativeTranslate;
        } else if (currentTranslate > 0) {
            currentTranslate = 0;
        }

        prevTranslate = currentTranslate;
        setSliderPosition();
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}%)`;
    }

    sliderContainer.addEventListener('mousedown', touchStart);
    sliderContainer.addEventListener('touchstart', touchStart);

    window.addEventListener('mousemove', touchMove);
    window.addEventListener('touchmove', touchMove);

    window.addEventListener('mouseup', touchEnd);
    window.addEventListener('touchend', touchEnd);
    window.addEventListener('mouseleave', touchEnd);

    sliderContainer.addEventListener('wheel', handleWheel, { passive: false });

    window.addEventListener('resize', () => {
        setSliderItemWidth();

        slider.style.transition = 'none';

        const itemsPerSlide = getItemsPerSlide();
        const maxNegativeTranslate = -((totalProducts - itemsPerSlide) / itemsPerSlide * 100);

        if (currentTranslate < maxNegativeTranslate) {
            currentTranslate = maxNegativeTranslate;
            prevTranslate = currentTranslate;
            setSliderPosition();
        }

        setTimeout(() => {
            slider.style.transition = 'transform 0.3s ease';
        }, 50);
    });

    setSliderItemWidth();
});

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

// products deals

const sliderDeals = document.getElementById('section-slider-card');
const cardsDeals = document.querySelectorAll('.section-bottom-card');
const containerDeals = document.querySelector('.slider-container-deals');

let currentIndexDeals = 0;
let cardsToShowDeals = 5;
let autoSlideIntervalDeals;

let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function updateCardsToShow() {
    if (window.innerWidth <= 576) {
        cardsToShowDeals = 2;
    } else if (window.innerWidth <= 768) {
        cardsToShowDeals = 3;
    } else if (window.innerWidth <= 1024) {
        cardsToShowDeals = 4;
    } else {
        cardsToShowDeals = 5;
    }

    updateSliderDeals();
}

function updateSliderDeals() {
    const cardWidthPercent = 100 / cardsToShowDeals;
    const translateValue = currentIndexDeals * cardWidthPercent;

    const maxIndex = cardsDeals.length - cardsToShowDeals;
    if (currentIndexDeals < 0) currentIndexDeals = 0;
    if (currentIndexDeals > maxIndex) currentIndexDeals = maxIndex;

    sliderDeals.style.transform = `translateX(-${translateValue}%)`;
    prevTranslate = -translateValue;
}

function startAutoSliderDeals() {
    clearInterval(autoSlideIntervalDeals);
    autoSlideIntervalDeals = setInterval(() => {
        const maxIndex = cardsDeals.length - cardsToShowDeals;
        if (currentIndexDeals < maxIndex) {
            currentIndexDeals++;
        } else {
            currentIndexDeals = 0;
        }
        updateSliderDeals();
    }, 5000);
}

function stopAutoSlideDeals() {
    clearInterval(autoSlideIntervalDeals);
}

updateCardsToShow();
startAutoSliderDeals();

window.addEventListener('resize', () => {
    updateCardsToShow();
});

containerDeals.addEventListener('wheel', (event) => {
    event.preventDefault();
    stopAutoSlideDeals();

    const maxIndex = cardsDeals.length - cardsToShowDeals;
    if (event.deltaY > 0 && currentIndexDeals < maxIndex) {
        currentIndexDeals++;
    } else if (event.deltaY < 0 && currentIndexDeals > 0) {
        currentIndexDeals--;
    }

    updateSliderDeals();

    clearTimeout(window.wheelTimeout);
    window.wheelTimeout = setTimeout(() => {
        startAutoSliderDeals();
    }, 1000);
});

function touchStart(event) {
    stopAutoSlideDeals();
    isDragging = true;
    startPosition = getPositionX(event);

    document.addEventListener('mousemove', touchMove);
    document.addEventListener('mouseup', touchEnd);
    document.addEventListener('touchmove', touchMove);
    document.addEventListener('touchend', touchEnd);
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        const diff = currentPosition - startPosition;

        const cardWidthPercent = 100 / cardsToShowDeals;
        const containerWidth = containerDeals.offsetWidth;
        const movePercentage = (diff / containerWidth) * 100;

        currentTranslate = prevTranslate + movePercentage;

        const maxTranslate = 0;
        const minTranslate = -((cardsDeals.length - cardsToShowDeals) * cardWidthPercent);

        if (currentTranslate > maxTranslate) {
            currentTranslate = maxTranslate;
        }

        if (currentTranslate < minTranslate) {
            currentTranslate = minTranslate;
        }

        sliderDeals.style.transform = `translateX(${currentTranslate}%)`;
    }
}

function touchEnd() {
    isDragging = false;

    const cardWidthPercent = 100 / cardsToShowDeals;
    const movedPercent = Math.abs(currentTranslate - prevTranslate);

    if (movedPercent > (cardWidthPercent * 0.2)) {
        if (currentTranslate > prevTranslate) {
            currentIndexDeals--;
        } else {
            currentIndexDeals++;
        }
    }

    const maxIndex = cardsDeals.length - cardsToShowDeals;
    if (currentIndexDeals < 0) currentIndexDeals = 0;
    if (currentIndexDeals > maxIndex) currentIndexDeals = maxIndex;

    updateSliderDeals();

    document.removeEventListener('mousemove', touchMove);
    document.removeEventListener('mouseup', touchEnd);
    document.removeEventListener('touchmove', touchMove);
    document.removeEventListener('touchend', touchEnd);

    setTimeout(startAutoSliderDeals, 1000);
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

containerDeals.addEventListener('mousedown', touchStart);
containerDeals.addEventListener('touchstart', touchStart);

containerDeals.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

containerDeals.addEventListener('mouseenter', () => {
    stopAutoSlideDeals();
});

containerDeals.addEventListener('mouseleave', () => {
    if (!isDragging) {
        startAutoSliderDeals();
    }
});

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