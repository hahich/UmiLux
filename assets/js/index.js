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

    if (!sliderContainer) {
        console.error('Element with id "sliderContainer" not found.');
        return;
    }

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;

    function getItemsPerSlide() {
        if (window.innerWidth < 576) return 2;
        if (window.innerWidth <= 768) return 3;
        if (window.innerWidth <= 1024) return 4;
        return 8; // 8 products for desktop
    }

    function updateSlider() {
        const itemsPerSlide = getItemsPerSlide();
        const maxIndex = Math.ceil(totalProducts / itemsPerSlide) - 1;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        currentTranslate = -(currentIndex * (100 / itemsPerSlide)) * itemsPerSlide;
        prevTranslate = currentTranslate;
        slider.style.transform = `translateX(${currentTranslate}%)`;
    }

    function touchStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        slider.style.transition = 'none';
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            const itemsPerSlide = getItemsPerSlide();
            currentTranslate = prevTranslate + ((currentPosition - startPos) / sliderContainer.offsetWidth) * 100;
            slider.style.transform = `translateX(${currentTranslate}%)`;
        }
    }

    function touchEnd() {
        isDragging = false;
        slider.style.transition = 'transform 0.5s ease';
        const itemsPerSlide = getItemsPerSlide();
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -10 && currentIndex < Math.ceil(totalProducts / itemsPerSlide) - 1) {
            currentIndex++;
        } else if (movedBy > 10 && currentIndex > 0) {
            currentIndex--;
        }

        updateSlider();
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    sliderContainer.addEventListener('mousedown', touchStart);
    sliderContainer.addEventListener('mousemove', touchMove);
    sliderContainer.addEventListener('mouseup', touchEnd);
    sliderContainer.addEventListener('mouseleave', touchEnd);
    sliderContainer.addEventListener('touchstart', touchStart);
    sliderContainer.addEventListener('touchmove', touchMove);
    sliderContainer.addEventListener('touchend', touchEnd);

    window.addEventListener('resize', updateSlider);
    updateSlider();
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
document.addEventListener('DOMContentLoaded', () => {
    const sliderDealsCard = document.getElementById('section-slider-card');
    const dealsCard = document.querySelectorAll('.section-bottom-card');
    const containerDeals = document.querySelector('.slider-container-deals');
    let cardDealsWidth = dealsCard[0].offsetWidth + 10;
    let currentIndexDeals = 0;
    let cardsToShowDeals = 5;
    let autoSlideDealsInterval

    function updateCardToShow() {
        if (window.innerWidth <= 576) {
            cardsToShowDeals = 2;
        } else if (window.innerWidth <= 1024) {
            cardsToShowDeals = 4;
        } else {
            cardsToShowDeals = 5;
        }
    }

    function updateSliderDeals() {
        cardDealsWidth = dealsCard[0].offsetWidth + 10;
        const maxIndex = Math.max(0, dealsCard.length - cardsToShowDeals);
        currentIndexDeals = Math.min(currentIndexDeals, maxIndex);
        sliderDealsCard.style.transform = `translateX(-${currentIndexDeals * cardDealsWidth}px)`;
    }

    function startAutoSliderDeals() {
        clearInterval(autoSlideDealsInterval);
        autoSlideDealsInterval = setInterval(() => {
            const maxIndex = Math.max(0, dealsCard.length - cardsToShowDeals);
            if (currentIndexDeals < maxIndex) {
                currentIndexDeals++;
            } else {
                currentIndexDeals = 0;
            }
            updateSliderDeals();
        }, 5000);
    }

    function stopAutoSlideDeals() {
        clearInterval(autoSlideDealsInterval);
    }

    updateCardToShow();
    updateSliderDeals();
    startAutoSliderDeals();

    window.addEventListener('resize', () => {
        updateCardToShow();
        updateSliderDeals();
    });

    containerDeals.addEventListener('wheel', (event) => {
        event.preventDefault();
        stopAutoSlideDeals();
        const maxIndex = Math.max(0, dealsCard.length - cardsToShowDeals);
        if (event.deltaY > 0 && currentIndexDeals < maxIndex) {
            currentIndexDeals++;
        } else if (event.deltaY < 0 && currentIndexDeals > 0) {
            currentIndexDeals--;
        }
        updateSliderDeals();
        startAutoSliderDeals();
    });

    containerDeals.addEventListener('mouseenter', () => {
        stopAutoSlideDeals();
    });

    containerDeals.addEventListener('mouseleave', () => {
        startAutoSliderDeals();
    });
});