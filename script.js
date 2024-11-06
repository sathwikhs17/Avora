const popup = document.getElementById("popup");
const openPopup = document.getElementById("open-popup");
const closePopup = document.getElementById("close");
const toggleForm = document.getElementById("toggle-form");
const formTitle = document.getElementById("form-title");
const loginForm = document.getElementById("loginForm");
let isLoginMode = true;

popup.style.display = "none";

openPopup.onclick = function() {
    popup.style.display = "flex";
}

closePopup.onclick = function() {
    popup.style.display = "none";
    resetForm();
}

toggleForm.onclick = function(event) {
    event.preventDefault();
    isLoginMode = !isLoginMode;
    updateFormMode();
}

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
    
    // Reattach event listener to the new toggle link
    document.getElementById("toggle-form").onclick = function(event) {
        event.preventDefault();
        isLoginMode = !isLoginMode;
        updateFormMode();
    }
}

window.onload = function() {
    popup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
        resetForm();
    }
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
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}