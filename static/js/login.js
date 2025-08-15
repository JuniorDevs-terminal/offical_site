// DOM Elements
const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');
const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const messageContainer = document.getElementById('messageContainer');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// Password visibility toggle
passwordToggle.addEventListener('click', () => {
    const eyeOpen = passwordToggle.querySelector('.eye-open');
    const eyeClosed = passwordToggle.querySelector('.eye-closed');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    } else {
        passwordInput.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    }
});

// Form validation functions
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return password.length >= 6;
};

const showError = (inputElement, errorElement, message) => {
    inputElement.parentElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // Add shake animation
    inputElement.classList.add('shake');
    setTimeout(() => {
        inputElement.classList.remove('shake');
    }, 500);
};

const clearError = (inputElement, errorElement) => {
    inputElement.parentElement.classList.remove('error');
    errorElement.classList.remove('show');
};

const showMessage = (type, message) => {
    messageContainer.style.display = 'block';
    
    if (type === 'success') {
        successMessage.style.display = 'flex';
        errorMessage.style.display = 'none';
        successMessage.querySelector('span').textContent = message;
    } else {
        errorMessage.style.display = 'flex';
        successMessage.style.display = 'none';
        errorMessage.querySelector('span').textContent = message;
    }
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideMessage();
    }, 5000);
};

const hideMessage = () => {
    messageContainer.style.display = 'none';
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
};

// Real-time validation
emailInput.addEventListener('input', () => {
    const emailError = document.getElementById('email-error');
    if (emailInput.value && !validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'To\'g\'ri email manzilini kiriting');
    } else {
        clearError(emailInput, emailError);
    }
});

passwordInput.addEventListener('input', () => {
    const passwordError = document.getElementById('password-error');
    if (passwordInput.value && !validatePassword(passwordInput.value)) {
        showError(passwordInput, passwordError, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
    } else {
        clearError(passwordInput, passwordError);
    }
});

// Form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    let isValid = true;
    
    // Clear previous errors
    clearError(emailInput, emailError);
    clearError(passwordInput, passwordError);
    hideMessage();
    
    // Validate email
    if (!email) {
        showError(emailInput, emailError, 'Email manzilini kiriting');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, emailError, 'To\'g\'ri email manzilini kiriting');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showError(passwordInput, passwordError, 'Parolni kiriting');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(passwordInput, passwordError, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    loginButton.classList.add('loading');
    loginButton.disabled = true;
    
    try {
        // Simulate API call
        await simulateLogin(email, password);
        
        // Success
        loginButton.classList.add('success-animation');
        showMessage('success', 'Muvaffaqiyatli kirildi! Dashboard sahifasiga yo\'naltirilmoqda...');
        
        // Simulate redirect after 2 seconds
        setTimeout(() => {
            // window.location.href = 'dashboard.html';
            console.log('Redirecting to dashboard...');
        }, 2000);
        
    } catch (error) {
        // Error
        showMessage('error', error.message || 'Xatolik yuz berdi. Qayta urinib ko\'ring.');
    } finally {
        // Reset button state
        setTimeout(() => {
            loginButton.classList.remove('loading', 'success-animation');
            loginButton.disabled = false;
        }, 2000);
    }
});

// Simulate login API call
const simulateLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Demo credentials
            const validCredentials = [
                { email: 'admin@nexora.uz', password: 'admin123' },
                { email: 'user@nexora.uz', password: 'user123' },
                { email: 'demo@nexora.uz', password: 'demo123' }
            ];
            
            const isValid = validCredentials.some(
                cred => cred.email === email && cred.password === password
            );
            
            if (isValid) {
                resolve({ success: true, message: 'Login successful' });
            } else {
                reject(new Error('Email yoki parol noto\'g\'ri!'));
            }
        }, 1500); // Simulate network delay
    });
};

// Social login handlers
document.querySelector('.google-button').addEventListener('click', (e) => {
    e.preventDefault();
    showMessage('info', 'Google bilan kirish hozircha mavjud emas');
});

document.querySelector('.microsoft-button').addEventListener('click', (e) => {
    e.preventDefault();
    showMessage('info', 'Microsoft bilan kirish hozircha mavjud emas');
});

// Forgot password handler
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    showMessage('info', 'Parolni tiklash uchun admin bilan bog\'laning: admin@nexora.uz');
});

// Register link handler
document.querySelector('.register-link').addEventListener('click', (e) => {
    e.preventDefault();
    showMessage('info', 'Ro\'yxatdan o\'tish uchun admin bilan bog\'laning: admin@nexora.uz');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Enter key to submit form
    if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') {
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape key to clear messages
    if (e.key === 'Escape') {
        hideMessage();
    }
});

// Auto-focus email input on page load
window.addEventListener('load', () => {
    emailInput.focus();
    
    // Add entrance animation to form elements
    const formElements = document.querySelectorAll('.form-group, .form-options, .login-button, .divider, .social-login, .login-footer');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100 + 300);
    });
});

// Remember me functionality
const rememberCheckbox = document.getElementById('remember');
const savedEmail = localStorage.getItem('rememberedEmail');

if (savedEmail) {
    emailInput.value = savedEmail;
    rememberCheckbox.checked = true;
}

loginForm.addEventListener('submit', () => {
    if (rememberCheckbox.checked) {
        localStorage.setItem('rememberedEmail', emailInput.value);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
});

// Add some demo info to console
console.log('=== Nexora IT Login Demo ===');
console.log('Demo credentials:');
console.log('1. admin@nexora.uz / admin123');
console.log('2. user@nexora.uz / user123');
console.log('3. demo@nexora.uz / demo123');
console.log('============================');

// Performance optimization: Throttle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle resize if needed
        console.log('Window resized');
    }, 250);
});

// Add loading state to page
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Prevent form submission on Enter in password field when empty
passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !passwordInput.value.trim()) {
        e.preventDefault();
        passwordInput.focus();
    }
});

// Add visual feedback for form interactions
const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// Add CSS for focused state
const style = document.createElement('style');
style.textContent = `
    .form-group.focused input {
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .message.info {
        background: var(--primary-blue);
        color: var(--white);
    }
`;
document.head.appendChild(style);
