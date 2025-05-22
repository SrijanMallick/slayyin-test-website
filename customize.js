// Function to handle the form submission and send data to Google Sheets
function requestCall(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    // Get selected products
    const selectedProducts = Array.from(document.querySelectorAll('.product-option.selected'))
        .map(opt => opt.querySelector('h4').textContent);
    
    // Get form data
    const formData = {
        collegeName: document.getElementById('college-name').value.trim(),
        contactName: document.getElementById('contact-name').value.trim(),
        contactPhone: document.getElementById('contact-phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        products: selectedProducts,
        quantity: document.getElementById('quantity').value,
        requirements: document.getElementById('requirements').value.trim(),
        timestamp: new Date().toISOString()
    };

    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Send data to Google Sheets using your script URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbziEE5-jJW2nIotM5Go24JuCqeIEjcSrliyoCDXE5kYomFDViyc5qXRTKNq84nUhORKXg/exec';
    
    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <p><i class="fas fa-check-circle"></i> Thank you for your interest! Our team will contact you shortly to discuss your requirements.</p>
        `;
        document.body.appendChild(successMessage);
        
        // Animate in
        setTimeout(() => successMessage.style.opacity = '1', 100);
        
        // Animate out and remove
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => successMessage.remove(), 300);
        }, 3000);

        // Reset form
        document.getElementById('customizeForm').reset();
        document.querySelectorAll('.product-option').forEach(opt => opt.classList.remove('selected'));
        
        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        
        // Show error message
        alert('Sorry, there was an error submitting your request. Please try again later.');
        
        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    });
}

// Form validation and handling
function validateForm() {
    const collegeName = document.getElementById('college-name').value.trim();
    const contactName = document.getElementById('contact-name').value.trim();
    const contactPhone = document.getElementById('contact-phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const quantity = document.getElementById('quantity').value;
    const selectedProducts = document.querySelectorAll('.product-option.selected');

    if (!collegeName) {
        showError('college-name', 'Please enter your college name');
        return false;
    }

    if (!contactName) {
        showError('contact-name', 'Please enter contact person name');
        return false;
    }

    if (!contactPhone) {
        showError('contact-phone', 'Please enter contact phone number');
        return false;
    }

    if (!isValidPhone(contactPhone)) {
        showError('contact-phone', 'Please enter a valid phone number');
        return false;
    }

    if (!email) {
        showError('email', 'Please enter your email address');
        return false;
    }

    if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        return false;
    }

    if (selectedProducts.length === 0) {
        showError('product-options', 'Please select at least one product');
        return false;
    }

    if (!quantity || quantity < 50) {
        showError('quantity', 'Minimum quantity required is 50');
        return false;
    }

    return true;
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';

    // Remove any existing error message
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    element.parentElement.appendChild(errorDiv);
    element.style.borderColor = '#ff4444';
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
        element.style.borderColor = '#444';
    }, 3000);
}

function isValidPhone(phone) {
    return /^[0-9]{10}$/.test(phone);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function toggleSelection(element) {
    element.classList.toggle('selected');
    
    // Add data attribute to track selected products
    if (element.classList.contains('selected')) {
        element.setAttribute('data-selected', 'true');
    } else {
        element.removeAttribute('data-selected');
    }
    
    // Remove error message if products are selected
    const errorDiv = document.querySelector('.error-message');
    if (errorDiv && errorDiv.parentElement.querySelector('.product-options')) {
        errorDiv.remove();
    }
}