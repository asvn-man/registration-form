// 🎯 ADVANCED JAVASCRIPT WITH ALL REQUESTED FEATURES

// ================================
// 🌟 WELCOME ALERT ON PAGE LOAD
// ================================
window.addEventListener('load', function() {
    setTimeout(() => {
        alert('🎉 Welcome to the Student Registration Portal!\n\n✨ Features:\n• Interactive form validation\n• Theme toggle\n• Click counter\n• Dynamic color changes\n• Responsive design');
    }, 500);
});

// ================================
// 🎨 CSS VARIABLES AND ARRAYS
// ================================
const themes = ['ocean', 'dark', 'sunset', 'forest'];
const colors = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981'];
const messages = [
    'Looking good! 🎨',
    'Awesome choice! ✨', 
    'Beautiful colors! 🌈',
    'Perfect! 🎯',
    'Amazing! 💫'
];

// State management with objects and arrays
let appState = {
    clickCount: 0,
    currentTheme: 0,
    validatedFields: [],
    userRegistrations: []
};

// ================================
// 🔧 REUSABLE UTILITY FUNCTIONS
// ================================

// Function to create new DOM elements dynamically
function createElement(tag, className, textContent, attributes = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    
    // Add attributes using for...in loop
    for (let attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    
    return element;
}

// Function to animate element with classList manipulation
function animateElement(element, animationClass, duration = 1000) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

// Function to update counter with animation
function updateCounter(elementId, newValue) {
    const element = document.getElementById(elementId);
    if (element) {
        animateElement(element, 'pulse');
        setTimeout(() => {
            element.textContent = newValue;
        }, 150);
    }
}

// Function to generate random message from array
function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ================================
// 🎮 INTERACTIVE FEATURES
// ================================

// "Click Me" button functionality with multiple effects
function initializeClickMeButton() {
    const clickMeBtn = document.getElementById('clickMeBtn');
    const colorSection = document.getElementById('colorSection');
    const colorDisplay = document.getElementById('colorDisplay');
    
    if (clickMeBtn) {
        clickMeBtn.addEventListener('click', function() {
            // Increment click count
            appState.clickCount++;
            updateCounter('clickCount', appState.clickCount);
            
            // Add button click animation
            this.classList.add('button-clicked');
            setTimeout(() => {
                this.classList.remove('button-clicked');
            }, 300);
            
            // Change section colors and text dynamically
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomMessage = getRandomMessage();
            
            // Toggle highlight class
            colorSection.classList.toggle('highlight-section');
            
            // Update display text
            colorDisplay.textContent = `${randomMessage} (Click #${appState.clickCount})`;
            
            // Create floating notification
            createFloatingNotification(randomMessage);
            
            // Change CSS custom property dynamically
            document.documentElement.style.setProperty('--accent-color', randomColor);
        });
    }
}

// Function to create dynamic floating notifications
function createFloatingNotification(message) {
    const notification = createElement('div', 'floating-notification', message);
    document.body.appendChild(notification);
    
    // Position randomly
    notification.style.position = 'fixed';
    notification.style.top = Math.random() * 200 + 50 + 'px';
    notification.style.right = '20px';
    notification.style.background = 'linear-gradient(135deg, #10b981, #0ea5e9)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '25px';
    notification.style.zIndex = '1000';
    notification.style.animation = 'slideInUp 0.5s ease-out, fadeOut 0.5s ease-out 2s both';
    
    // Remove after animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// ================================
// 🌙 THEME TOGGLE FUNCTIONALITY
// ================================
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('theme-dark');
            
            // Update button text
            if (document.body.classList.contains('theme-dark')) {
                this.textContent = '☀️ Light Mode';
            } else {
                this.textContent = '🌙 Dark Mode';
            }
            
            // Animate all stat items using forEach
            const statItems = document.querySelectorAll('.stat-item');
            statItems.forEach((item, index) => {
                setTimeout(() => {
                    animateElement(item, 'pulse');
                }, index * 100);
            });
        });
    }
}

// ================================
// 📝 ENHANCED FORM VALIDATION
// ================================

// Form validation with advanced DOM manipulation
function validateForm() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors and validations
            clearAllErrors();
            appState.validatedFields = [];
            
            let isValid = true;
            const formData = new FormData(this);
            const userData = {};
            
            // Get all form elements using querySelectorAll
            const requiredFields = this.querySelectorAll('input[required], select[required]');
            
            // Validate each field using forEach
            requiredFields.forEach(field => {
                const fieldValue = field.value.trim();
                userData[field.name] = fieldValue;
                
                // Field-specific validation
                if (!fieldValue) {
                    showFieldError(field, `Please enter your ${field.name.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                    isValid = false;
                } else if (field.type === 'email' && !isValidEmail(fieldValue)) {
                    showFieldError(field, 'Please enter a valid email address');
                    isValid = false;
                } else {
                    // Mark field as validated
                    field.classList.add('form-validated');
                    appState.validatedFields.push(field.name);
                }
            });
            
            // If validation passes
            if (isValid) {
                handleSuccessfulRegistration(userData);
            } else {
                // Shake form for failed validation
                animateElement(this, 'shake');
            }
        });
    }
}

// Function to show field errors with DOM manipulation
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Find or create error message element
    let errorElement = field.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = createElement('div', 'error-message');
        field.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Add shake animation to field
    animateElement(field, 'shake');
}

// Function to clear all errors
function clearAllErrors() {
    const errorFields = document.querySelectorAll('.error');
    const errorMessages = document.querySelectorAll('.error-message');
    
    // Use forEach to clear errors
    errorFields.forEach(field => {
        field.classList.remove('error', 'form-validated');
    });
    
    errorMessages.forEach(message => {
        message.style.display = 'none';
    });
}

// Handle successful registration
function handleSuccessfulRegistration(userData) {
    // Add to registrations array
    appState.userRegistrations.push(userData);
    
    // Update user count
    updateCounter('userCount', 1247 + appState.userRegistrations.length);
    
    // Success animation for submit button
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.classList.add('success');
    submitBtn.textContent = '✓ Registration Successful!';
    
    // Create success notification
    createSuccessNotification();
    
    // Reset form after delay
    setTimeout(() => {
        submitBtn.classList.remove('success');
        submitBtn.textContent = 'Register Now';
        document.getElementById('registrationForm').reset();
        clearAllErrors();
    }, 3000);
}

// Function to create success notification
function createSuccessNotification() {
    const successMsg = createElement('div', 'success-message', '🎉 Registration completed successfully!');
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        if (successMsg.parentNode) {
            successMsg.parentNode.removeChild(successMsg);
        }
    }, 3000);
}

// ================================
// 🎯 EVENT LISTENERS FOR MULTIPLE ELEMENTS
// ================================

// Add hover effects to all form fields
function addFormFieldListeners() {
    const formFields = document.querySelectorAll('input, select');
    
    formFields.forEach(field => {
        // Remove error styling when user starts typing
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.style.display = 'none';
                }
            }
        });
        
        // Add focus animations
        field.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = 'var(--primary-color)';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.querySelector('label').style.color = 'var(--text-light)';
        });
    });
}

// Add click listeners to all stat items
function addStatItemListeners() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Animate clicked item
            animateElement(this, 'pulse');
            
            // Change background temporarily
            const originalBackground = this.style.background;
            this.style.background = 'linear-gradient(135deg, var(--accent-color), var(--primary-color))';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.style.background = originalBackground;
                this.style.color = '';
            }, 1000);
            
            // Show info about the stat
            const statLabel = this.querySelector('.stat-label').textContent;
            createFloatingNotification(`You clicked: ${statLabel}`);
        });
    });
}

// ================================
// 🚀 INITIALIZATION
// ================================

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeClickMeButton();
    initializeThemeToggle();
    validateForm();
    addFormFieldListeners();
    addStatItemListeners();
    
    // Update initial stats
    updateCounter('formFields', document.querySelectorAll('input[required], select[required]').length);
    
    console.log('🚀 Student Portal initialized successfully!');
    console.log('📊 App State:', appState);
});

// Helper function for help button
function showHelp() {
    const helpContent = `
🎓 Student Registration Help

📋 Required Fields:
• Full Name - Your complete name
• Email Address - Valid email format
• Department - Select your department
• Academic Year - Choose your current year
• Project Title - Your project name

🎮 Interactive Features:
• Click the "Click Me" button to change colors
• Toggle between light/dark theme
• Click stat cards for animations
• Form validates in real-time

✨ Tips:
• All fields must be completed
• Email must be in valid format
• Watch for error messages
• Enjoy the animations!
    `;
    
    alert(helpContent);
}

// ================================
// 🔄 LOOPS AND ARRAY DEMONSTRATIONS
// ================================

// Function using for loop to create multiple elements
function createMultipleElements() {
    const container = document.createElement('div');
    
    // For loop example
    for (let i = 0; i < 5; i++) {
        const element = createElement('div', 'demo-element', `Element ${i + 1}`);
        container.appendChild(element);
    }
    
    return container;
}

// Function using while loop for validation
function validateFieldsWithWhile(fields) {
    let i = 0;
    let allValid = true;
    
    // While loop example
    while (i < fields.length && allValid) {
        if (!fields[i].value.trim()) {
            allValid = false;
        }
        i++;
    }
    
    return allValid;
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createElement,
        animateElement,
        isValidEmail,
        getRandomMessage,
        appState
    };
}