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

// Carousel
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