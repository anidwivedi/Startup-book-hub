// Contact form validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    contactForm.addEventListener('submit', function(event) {
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error').forEach(function(errorElement) {
            errorElement.remove();
        });

        // Name validation
        if (nameInput.value.trim() === '') {
            isValid = false;
            showError(nameInput, 'Name is required.');
        }

        // Email validation
        if (!isValidEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, 'A valid email is required.');
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            isValid = false;
            showError(messageInput, 'Message is required.');
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    function showError(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.style.color = 'red';
        errorElement.style.marginTop = '0.5em';
        errorElement.textContent = message;
        input.parentElement.appendChild(errorElement);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form validation and submission with Formspree
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const formJSON = JSON.stringify(Object.fromEntries(formData));

        fetch('https://formspree.io/f/mknddqep', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formJSON
        })
        .then(response => {
            if (response.ok) {
                contactForm.style.display = 'none';
                formResponse.style.display = 'block';
                formResponse.style.color = 'green';
                formResponse.textContent = 'Thank you for your message! We will get back to you soon.';
            } else {
                formResponse.style.display = 'block';
                formResponse.style.color = 'red';
                formResponse.textContent = 'There was an error submitting your message. Please try again later.';
            }
        })
        .catch(error => {
            formResponse.style.display = 'block';
            formResponse.style.color = 'red';
            formResponse.textContent = 'There was an error submitting your message. Please try again later.';
        });
    });
});
