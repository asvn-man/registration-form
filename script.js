document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    let isValid = true;
    
    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const department = document.getElementById('department');
    const year = document.getElementById('year');
    const projectTitle = document.getElementById('projectTitle');
    
    // Validate Name
    if (!name.value.trim()) {
        showError('name', 'nameError', 'Please enter your full name');
        isValid = false;
    }
    
    // Validate Email
    if (!email.value.trim()) {
        showError('email', 'emailError', 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError('email', 'emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate Department
    if (!department.value) {
        showError('department', 'departmentError', 'Please select your department');
        isValid = false;
    }
    
    // Validate Year
    if (!year.value) {
        showError('year', 'yearError', 'Please select your academic year');
        isValid = false;
    }
    
    // Validate Project Title
    if (!projectTitle.value.trim()) {
        showError('projectTitle', 'projectTitleError', 'Please enter your project title');
        isValid = false;
    }
    
    // If all validations pass
    if (isValid) {
        alert('Registration Successful!');
        // Optional: Reset form after successful submission
        // this.reset();
    }
});

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to show error
function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(errorId);
    
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Function to clear all errors
function clearErrors() {
    const fields = ['name', 'email', 'department', 'year', 'projectTitle'];
    const errors = ['nameError', 'emailError', 'departmentError', 'yearError', 'projectTitleError'];
    
    fields.forEach(fieldId => {
        document.getElementById(fieldId).classList.remove('error');
    });
    
    errors.forEach(errorId => {
        const errorElement = document.getElementById(errorId);
        errorElement.style.display = 'none';
    });
}

// Remove error styling when user starts typing
['name', 'email', 'department', 'year', 'projectTitle'].forEach(fieldId => {
    document.getElementById(fieldId).addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            const errorId = fieldId + 'Error';
            document.getElementById(errorId).style.display = 'none';
        }
    });
});