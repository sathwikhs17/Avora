// DOM Elements
const searchModal = document.getElementById('searchModal');
const accountModal = document.getElementById('accountModal');
const mobileMenu = document.getElementById('mobileMenu');

// Modal Toggle Functions
function toggleModal(modal) {
    modal.classList.toggle('active');
    document.body.style.overflow = modal.classList.contains('active') ? 'hidden' : '';
}

// Event Listeners for Modal Controls
document.getElementById('open-search').addEventListener('click', () => toggleModal(searchModal));
document.getElementById('open-account').addEventListener('click', () => toggleModal(accountModal));
document.getElementById('open-menu').addEventListener('click', () => toggleModal(mobileMenu));

// Close modals when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            toggleModal(modal);
        }
    });
});

// Close modals with close button
document.querySelectorAll('.modal-close').forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        toggleModal(modal);
    });
});

// Form Validation
const accountForm = document.getElementById('accountForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

accountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Email validation
    if (!validateEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Password validation
    if (!validatePassword(passwordInput.value)) {
        passwordError.textContent = 'Password must be at least 8 characters long';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    if (isValid) {
        // Handle form submission
        console.log('Form submitted successfully');
        // Add your form submission logic here
    }
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    if (validateEmail(email)) {
        // Handle newsletter subscription
        console.log('Newsletter subscription successful');
        newsletterForm.reset();
        // Add your newsletter submission logic here
    }
});

// Mobile Menu Content Population
function populateMobileMenu() {
    const menuContent = `
        <nav class="mobile-nav">
            <button class="modal-close" aria-label="Close menu">×</button>
            <ul>
                <li><a href="/category/abstract">Abstract</a></li>
                <li><a href="/category/contemporary">Contemporary</a></li>
                <li><a href="/category/traditional">Traditional</a></li>
                <li><a href="/category/digital">Digital Art</a></li>
                <li><a href="/category/photography">Photography</a></li>
                <li><a href="/artists">Artists</a></li>
            </ul>
        </nav>
    `;
    mobileMenu.innerHTML = menuContent;
}

// Initialize mobile menu
populateMobileMenu();

// Handle scroll behavior
let lastScroll = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Initialize any dynamic content
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('Avora marketplace initialized');
});