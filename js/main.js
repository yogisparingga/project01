// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    // Initialize Hero Swiper
    if (document.querySelector('.hero-swiper')) {
        const heroSwiper = new Swiper('.hero-swiper', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1000,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenuBtn) {
            const isClickInside = mobileMenu.contains(event.target) || mobileMenuBtn.contains(event.target);
            if (!isClickInside && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });

    // Smooth scroll for anchor links
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
                }
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize modals
    initModals();

    // Initialize gallery
    initGallery();

    // Initialize search
    initSearch();

    // Re-initialize Lucide icons after dynamic content changes
    const observer = new MutationObserver(function(mutations) {
        lucide.createIcons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Modal Functions
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalCloses = document.querySelectorAll('[data-modal-close]');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// Gallery Functions
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.querySelector('img')?.src;
            if (imageSrc) {
                showImageModal(imageSrc);
            }
        });
    });
}

function showImageModal(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content max-w-4xl">
            <div class="modal-header">
                <h3 class="text-lg font-semibold">Galeri Foto</h3>
                <button class="text-gray-400 hover:text-gray-600" onclick="this.closest('.modal').remove(); document.body.style.overflow=''">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
            <div class="modal-body">
                <img src="${imageSrc}" alt="Gallery Image" class="w-full h-auto rounded-lg">
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
}

// Search Functions
function initSearch() {
    const searchInputs = document.querySelectorAll('.search-input');

    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchTarget = this.getAttribute('data-search-target');
            const items = document.querySelectorAll(searchTarget);

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Filter Functions
function filterItems(category, targetSelector) {
    const items = document.querySelectorAll(targetSelector);

    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Pagination Functions
function initPagination(itemsPerPage = 9) {
    const paginationContainer = document.querySelector('[data-pagination]');
    if (!paginationContainer) return;

    const itemsSelector = paginationContainer.getAttribute('data-pagination');
    const items = Array.from(document.querySelectorAll(itemsSelector));
    let currentPage = 1;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        items.forEach((item, index) => {
            if (index >= start && index < end) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });

        updatePaginationButtons(page);
    }

    function updatePaginationButtons(page) {
        const paginationHTML = `
            <div class="flex items-center justify-center gap-2 mt-8">
                <button onclick="changePage(${page - 1})" ${page === 1 ? 'disabled' : ''}
                    class="pagination-btn flex items-center gap-1">
                    <i data-lucide="chevron-left" class="w-4 h-4"></i>
                    Previous
                </button>

                <div class="flex gap-1">
                    ${generatePageNumbers(page, totalPages)}
                </div>

                <button onclick="changePage(${page + 1})" ${page === totalPages ? 'disabled' : ''}
                    class="pagination-btn flex items-center gap-1">
                    Next
                    <i data-lucide="chevron-right" class="w-4 h-4"></i>
                </button>
            </div>
        `;

        let paginationEl = document.getElementById('pagination-controls');
        if (!paginationEl) {
            paginationEl = document.createElement('div');
            paginationEl.id = 'pagination-controls';
            paginationContainer.appendChild(paginationEl);
        }
        paginationEl.innerHTML = paginationHTML;
        lucide.createIcons();
    }

    function generatePageNumbers(current, total) {
        let html = '';
        for (let i = 1; i <= total; i++) {
            if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
                html += `<button onclick="changePage(${i})" class="pagination-btn ${i === current ? 'active' : ''}">${i}</button>`;
            } else if (i === current - 2 || i === current + 2) {
                html += `<span class="px-2">...</span>`;
            }
        }
        return html;
    }

    window.changePage = function(page) {
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        showPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    showPage(1);
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');

            let errorMsg = input.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('p');
                errorMsg.className = 'error-message text-red-500 text-sm mt-1';
                errorMsg.textContent = 'Field ini wajib diisi';
                input.parentNode.insertBefore(errorMsg, input.nextSibling);
            }
        } else {
            input.classList.remove('border-red-500');
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        }
    });

    return isValid;
}

// Show Alert
function showAlert(message, type = 'info') {
    const alertHTML = `
        <div class="alert alert-${type} flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i data-lucide="${getAlertIcon(type)}" class="w-5 h-5"></i>
                <span>${message}</span>
            </div>
            <button onclick="this.parentElement.remove()" class="text-current opacity-70 hover:opacity-100">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>
    `;

    const alertContainer = document.getElementById('alert-container') || createAlertContainer();
    const alertEl = document.createElement('div');
    alertEl.innerHTML = alertHTML;
    alertContainer.appendChild(alertEl.firstElementChild);
    lucide.createIcons();

    setTimeout(() => {
        alertEl.firstElementChild?.remove();
    }, 5000);
}

function createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alert-container';
    container.className = 'fixed top-4 right-4 z-50 space-y-2 max-w-md';
    document.body.appendChild(container);
    return container;
}

function getAlertIcon(type) {
    const icons = {
        info: 'info',
        success: 'check-circle',
        warning: 'alert-triangle',
        danger: 'alert-circle'
    };
    return icons[type] || 'info';
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showAlert('Berhasil disalin ke clipboard', 'success');
    }).catch(() => {
        showAlert('Gagal menyalin ke clipboard', 'danger');
    });
}

// Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Format Number
function formatNumber(number) {
    return new Intl.NumberFormat('id-ID').format(number);
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get URL Parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
