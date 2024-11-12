// DOM Elements
const popup = document.getElementById("popup");
const searchPopup = document.getElementById("search-popup");
const mobileMenu = document.createElement("div");
mobileMenu.className = "mobile-menu";

// Open/Close Handlers
const openPopup = document.getElementById("open-popup");
const closePopup = document.getElementById("close");
const openSearch = document.getElementById("open-search");
const closeSearch = document.getElementById("close-search");
const openMenu = document.getElementById("open-menu");
const toggleForm = document.getElementById("toggle-form");
const formTitle = document.getElementById("form-title");
const loginForm = document.getElementById("loginForm");

let isLoginMode = true;

// Initialize Mobile Menu
function initializeMobileMenu() {
    mobileMenu.innerHTML = `
        <div class="mobile-menu-header">
            <h2>Menu</h2>
            <span class="mobile-menu-close">&times;</span>
        </div>
        <nav>
            <a href="#abstracts">Abstracts</a>
            <a href="#illusion">Illusion</a>
            <a href="#collectibles">Collectibles</a>
            <a href="#posters">Posters</a>
            <a href="#paintings">Hand Paintings</a>
            <a href="#artists">Artists</a>
        </nav>
    `;
    document.body.appendChild(mobileMenu);

    const closeMenu = mobileMenu.querySelector('.mobile-menu-close');
    closeMenu.onclick = () => mobileMenu.classList.remove('active');
}

// Event Listeners
openPopup.onclick = () => popup.style.display = "flex";
closePopup.onclick = () => {
    popup.style.display = "none";
    resetForm();
};

openSearch.onclick = () => searchPopup.style.display = "flex";
closeSearch.onclick = () => searchPopup.style.display = "none";

openMenu.onclick = () => mobileMenu.classList.add('active');

toggleForm.onclick = function(event) {
    event.preventDefault();
    isLoginMode = !isLoginMode;
    updateFormMode();
};

// Form Handling
function updateFormMode() {
    const toggleText = loginForm.querySelector("p");
    
    if (!isLoginMode) {
        formTitle.textContent = "Sign Up";
        toggleText.innerHTML = 'Already have an account? <a href="#" id="toggle-form">Login</a>';
        
        if (!document.getElementById("confirm-password")) {
            const confirmPasswordInput = document.createElement("input");
            confirmPasswordInput.type = "password";
            confirmPasswordInput.placeholder = "Confirm Password";
            confirmPasswordInput.id = "confirm-password";
            confirmPasswordInput.required = true;
            
            const submitButton = loginForm.querySelector("button[type='submit']");
            loginForm.insertBefore(confirmPasswordInput, submitButton);
        }
    } else {
        formTitle.textContent = "Login";
        toggleText.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-form">Sign Up</a>';
        
        const confirmPasswordField = document.getElementById("confirm-password");
        if (confirmPasswordField) {
            confirmPasswordField.remove();
        }
    }
    
    document.getElementById("toggle-form").onclick = function(event) {
        event.preventDefault();
        isLoginMode = !isLoginMode;
        updateFormMode();
    };
}

function resetForm() {
    loginForm.reset();
    clearErrors();
    if (!isLoginMode) {
        isLoginMode = true;
        updateFormMode();
    }
}

function showError(inputId, message) {
    const errorDiv = document.getElementById(`${inputId}-error`);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function clearErrors() {
    const errorDivs = document.getElementsByClassName('error-message');
    Array.from(errorDivs).forEach(div => {
        div.style.display = 'none';
    });
}

function showSuccess(message) {
    const successDiv = document.getElementById('form-success');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    }
}

// Form Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form Submission
loginForm.onsubmit = function(event) {
    event.preventDefault();
    clearErrors();
    
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    
    if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        return;
    }
    
    if (password.length < 8) {
        showError('password', 'Password must be at least 8 characters long');
        return;
    }
    
    if (!isLoginMode) {
        const confirmPassword = document.getElementById("confirm-password").value;
        if (password !== confirmPassword) {
            showError('password', 'Passwords do not match');
            return;
        }
    }
    
    const submitButton = loginForm.querySelector('button[type="submit"]');
    submitButton.classList.add('loading');
    submitButton.textContent = 'Processing...';
    
    setTimeout(() => {
        submitButton.classList.remove('loading');
        submitButton.textContent = 'Submit';
        showSuccess('Successfully ' + (isLoginMode ? 'logged in' : 'signed up'));
        
        setTimeout(() => {
            popup.style.display = "none";
            resetForm();
        }, 1500);
    }, 1000);
};

// Close popups when clicking outside
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
        resetForm();
    }
    if (event.target == searchPopup) {
        searchPopup.style.display = "none";
    }
    if (event.target.classList.contains('mobile-menu')) {
        mobileMenu.classList.remove('active');
    }
};

// Initialize
window.onload = function() {
    popup.style.display = "none";
    searchPopup.style.display = "none";
    initializeMobileMenu();
    
    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.onclick = function() {
            const artCard = button.closest('.art-card');
            const artTitle = artCard.querySelector('h3').textContent;
            showSuccess(`${artTitle} added to cart`);
        };
    });
};

// Testimonial Slider Auto-scroll
let scrollPosition = 0;
const testimonialSlider = document.querySelector('.testimonial-slider');

function autoScroll() {
    if (testimonialSlider) {
        scrollPosition += testimonialSlider.children[0].offsetWidth + 32; // 32px is the gap
        if (scrollPosition >= testimonialSlider.scrollWidth) {
            scrollPosition = 0;
        }
        testimonialSlider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
}

setInterval(autoScroll, 5000);