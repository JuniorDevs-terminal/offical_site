// DOM Elements
const signinForm = document.getElementById('signinForm');
const signinButton = document.getElementById('signinButton');
const passwordToggle = document.getElementById('passwordToggle');
const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const messageContainer = document.getElementById('messageContainer');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const infoMessage = document.getElementById('infoMessage');
const passwordStrength = document.getElementById('passwordStrength');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

// Form inputs
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const companyInput = document.getElementById('company');
const termsCheckbox = document.getElementById('terms');

// Password visibility toggles
const setupPasswordToggle = (toggleButton, passwordField) => {
    toggleButton.addEventListener('click', () => {
        const eyeOpen = toggleButton.querySelector('.eye-open');
        const eyeClosed = toggleButton.querySelector('.eye-closed');
        
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            eyeOpen.style.display = 'none';
            eyeClosed.style.display = 'block';
        } else {
            passwordField.type = 'password';
            eyeOpen.style.display = 'block';
            eyeClosed.style.display = 'none';
        }
    });
};

setupPasswordToggle(passwordToggle, passwordInput);
setupPasswordToggle(confirmPasswordToggle, confirmPasswordInput);

// Validation functions
const validateName = (name) => {
    return name.trim().length >= 2 && /^[a-zA-ZА-Яа-яЁё\s]+$/.test(name.trim());
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = (phone) => {
    const phoneRegex = /^(\+998|998|8)?[\s\-]?(\d{2})[\s\-]?(\d{3})[\s\-]?(\d{2})[\s\-]?(\d{2})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

const validatePassword = (password) => {
    return {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
};

const getPasswordStrength = (password) => {
    const checks = validatePassword(password);
    const score = Object.values(checks).filter(Boolean).length;
    
    if (score < 2) return { strength: 'weak', text: 'Zaif' };
    if (score < 3) return { strength: 'fair', text: 'O\'rtacha' };
    if (score < 4) return { strength: 'good', text: 'Yaxshi' };
    return { strength: 'strong', text: 'Kuchli' };
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
    
    // Hide all messages first
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    infoMessage.style.display = 'none';
    
    if (type === 'success') {
        successMessage.style.display = 'flex';
        successMessage.querySelector('span').textContent = message;
    } else if (type === 'error') {
        errorMessage.style.display = 'flex';
        errorMessage.querySelector('span').textContent = message;
    } else if (type === 'info') {
        infoMessage.style.display = 'flex';
        infoMessage.querySelector('span').textContent = message;
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
    infoMessage.style.display = 'none';
};

// Password strength indicator
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const passwordError = document.getElementById('password-error');
    
    if (password.length > 0) {
        passwordStrength.style.display = 'block';
        const { strength, text } = getPasswordStrength(password);
        
        // Remove all strength classes
        passwordStrength.classList.remove('strength-weak', 'strength-fair', 'strength-good', 'strength-strong');
        passwordStrength.classList.add(`strength-${strength}`);
        strengthText.textContent = text;
        
        // Validate password requirements
        const checks = validatePassword(password);
        if (!checks.length) {
            showError(passwordInput, passwordError, 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak');
        } else {
            clearError(passwordInput, passwordError);
        }
    } else {
        passwordStrength.style.display = 'none';
        clearError(passwordInput, passwordError);
    }
    
    // Check password match if confirm password has value
    if (confirmPasswordInput.value) {
        checkPasswordMatch();
    }
});

// Password confirmation check
const checkPasswordMatch = () => {
    const confirmPasswordError = document.getElementById('confirmPassword-error');
    
    if (passwordInput.value !== confirmPasswordInput.value) {
        showError(confirmPasswordInput, confirmPasswordError, 'Parollar mos kelmaydi');
        return false;
    } else {
        clearError(confirmPasswordInput, confirmPasswordError);
        return true;
    }
};

confirmPasswordInput.addEventListener('input', checkPasswordMatch);

// Real-time validation
firstNameInput.addEventListener('input', () => {
    const firstNameError = document.getElementById('firstName-error');
    if (firstNameInput.value && !validateName(firstNameInput.value)) {
        showError(firstNameInput, firstNameError, 'Ism kamida 2 ta harf bo\'lishi va faqat harflardan iborat bo\'lishi kerak');
    } else {
        clearError(firstNameInput, firstNameError);
    }
});

lastNameInput.addEventListener('input', () => {
    const lastNameError = document.getElementById('lastName-error');
    if (lastNameInput.value && !validateName(lastNameInput.value)) {
        showError(lastNameInput, lastNameError, 'Familiya kamida 2 ta harf bo\'lishi va faqat harflardan iborat bo\'lishi kerak');
    } else {
        clearError(lastNameInput, lastNameError);
    }
});

emailInput.addEventListener('input', () => {
    const emailError = document.getElementById('email-error');
    if (emailInput.value && !validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'To\'g\'ri email manzilini kiriting');
    } else {
        clearError(emailInput, emailError);
    }
});

phoneInput.addEventListener('input', () => {
    const phoneError = document.getElementById('phone-error');
    if (phoneInput.value && !validatePhone(phoneInput.value)) {
        showError(phoneInput, phoneError, 'To\'g\'ri telefon raqamini kiriting (+998 90 123 45 67)');
    } else {
        clearError(phoneInput, phoneError);
    }
});

// Phone number formatting
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('998')) {
        value = value.substring(3);
    } else if (value.startsWith('8')) {
        value = value.substring(1);
    }
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + ' ' + value.substring(2);
    }
    if (value.length >= 6) {
        value = value.substring(0, 6) + ' ' + value.substring(6);
    }
    if (value.length >= 10) {
        value = value.substring(0, 9) + ' ' + value.substring(9);
    }
    if (value.length >= 13) {
        value = value.substring(0, 13) + ' ' + value.substring(13, 15);
    }
    
    e.target.value = '+998 ' + value;
});

// Form submission
signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        company: companyInput.value.trim(),
        password: passwordInput.value,
        confirmPassword: confirmPasswordInput.value,
        terms: termsCheckbox.checked,
        newsletter: document.getElementById('newsletter').checked
    };
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    hideMessage();
    
    // Validate first name
    if (!formData.firstName) {
        showError(firstNameInput, document.getElementById('firstName-error'), 'Ismni kiriting');
        isValid = false;
    } else if (!validateName(formData.firstName)) {
        showError(firstNameInput, document.getElementById('firstName-error'), 'Ism kamida 2 ta harf bo\'lishi va faqat harflardan iborat bo\'lishi kerak');
        isValid = false;
    }
    
    // Validate last name
    if (!formData.lastName) {
        showError(lastNameInput, document.getElementById('lastName-error'), 'Familiyani kiriting');
        isValid = false;
    } else if (!validateName(formData.lastName)) {
        showError(lastNameInput, document.getElementById('lastName-error'), 'Familiya kamida 2 ta harf bo\'lishi va faqat harflardan iborat bo\'lishi kerak');
        isValid = false;
    }
    
    // Validate email
    if (!formData.email) {
        showError(emailInput, document.getElementById('email-error'), 'Email manzilini kiriting');
        isValid = false;
    } else if (!validateEmail(formData.email)) {
        showError(emailInput, document.getElementById('email-error'), 'To\'g\'ri email manzilini kiriting');
        isValid = false;
    }
    
    // Validate phone
    if (!formData.phone) {
        showError(phoneInput, document.getElementById('phone-error'), 'Telefon raqamini kiriting');
        isValid = false;
    } else if (!validatePhone(formData.phone)) {
        showError(phoneInput, document.getElementById('phone-error'), 'To\'g\'ri telefon raqamini kiriting');
        isValid = false;
    }
    
    // Validate password
    if (!formData.password) {
        showError(passwordInput, document.getElementById('password-error'), 'Parolni kiriting');
        isValid = false;
    } else {
        const passwordChecks = validatePassword(formData.password);
        if (!passwordChecks.length) {
            showError(passwordInput, document.getElementById('password-error'), 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak');
            isValid = false;
        }
    }
    
    // Validate password confirmation
    if (!formData.confirmPassword) {
        showError(confirmPasswordInput, document.getElementById('confirmPassword-error'), 'Parolni tasdiqlang');
        isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
        showError(confirmPasswordInput, document.getElementById('confirmPassword-error'), 'Parollar mos kelmaydi');
        isValid = false;
    }
    
    // Validate terms acceptance
    if (!formData.terms) {
        showError(termsCheckbox, document.getElementById('terms-error'), 'Foydalanish shartlarini qabul qilishingiz kerak');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    signinButton.classList.add('loading');
    signinButton.disabled = true;
    
    try {
        // Simulate API call
        await simulateSignup(formData);
        
        // Success
        signinButton.classList.add('success-animation');
        showMessage('success', 'Hisob muvaffaqiyatli yaratildi! Email orqali tasdiqlash havolasi yuborildi.');
        
        // Clear form
        signinForm.reset();
        passwordStrength.style.display = 'none';
        
        // Simulate redirect after 3 seconds
        setTimeout(() => {
            showMessage('info', 'Login sahifasiga yo\'naltirilmoqda...');
            setTimeout(() => {
                window.location.href = '/login/'; // Redirect to login page
            }, 1000);
        }, 3000);
        
    } catch (error) {
        // Error
        showMessage('error', error.message || 'Xatolik yuz berdi. Qayta urinib ko\'ring.');
    } finally {
        // Reset button state
        setTimeout(() => {
            signinButton.classList.remove('loading', 'success-animation');
            signinButton.disabled = false;
        }, 2000);
    }
});

// Simulate signup API call
const simulateSignup = async (formData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate email already exists check
            const existingEmails = [
                'admin@nexora.uz',
                'user@nexora.uz',
                'test@example.com'
            ];
            
            if (existingEmails.includes(formData.email)) {
                reject(new Error('Bu email manzil allaqachon ro\'yxatdan o\'tgan!'));
                return;
            }
            
            // Simulate successful signup
            resolve({ 
                success: true, 
                message: 'Account created successfully',
                userId: Math.random().toString(36).substr(2, 9)
            });
        }, 2000); // Simulate network delay
    });
};

// Social signup handlers
document.querySelector('.google-button').addEventListener('click', (e) => {
    e.preventDefault();
    showMessage('info', 'Google bilan ro\'yxatdan o\'tish hozircha mavjud emas');
});

document.querySelector('.microsoft-button').addEventListener('click', (e) => {
    e.preventDefault();
    showMessage('info', 'Microsoft bilan ro\'yxatdan o\'tish hozircha mavjud emas');
});

// Terms and privacy links
document.querySelector('.terms-link').addEventListener('click', (e) => {
    e.preventDefault();
    showMessage('info', 'Foydalanish shartlari sahifasi hozircha mavjud emas');
});

document.querySelector('.privacy-link').addEventListener('click', (e) => {
    e.preventDefault();
    showMessage('info', 'Maxfiylik siyosati sahifasi hozircha mavjud emas');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Enter key to submit form
    if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') {
        signinForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape key to clear messages
    if (e.key === 'Escape') {
        hideMessage();
    }
});

// Auto-focus first name input on page load
window.addEventListener('load', () => {
    firstNameInput.focus();
    
    // Add entrance animation to form elements
    const formElements = document.querySelectorAll('.form-group, .form-row, .form-options, .signin-button, .divider, .social-signin, .signin-footer');
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

// Add visual feedback for form interactions
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

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

// Add CSS for focused state
const style = document.createElement('style');
style.textContent = `
    .form-group.focused input {
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
`;
document.head.appendChild(style);

// Console info
console.log('=== Nexora IT Sign Up Demo ===');
console.log('Form validation includes:');
console.log('- Name validation (letters only, min 2 chars)');
console.log('- Email format validation');
console.log('- Phone number validation (Uzbekistan format)');
console.log('- Password strength indicator');
console.log('- Password confirmation matching');
console.log('- Terms acceptance requirement');
console.log('===============================');