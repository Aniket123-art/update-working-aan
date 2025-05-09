// Form validation and interactive features for the tourism website

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Booking form validation
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const destination = document.getElementById('destination').value.trim();
            const date = document.getElementById('date').value;
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!destination || !date || !name || !email) {
                alert('Please fill in all fields');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // If validation passes, show success message
            alert('Booking submitted successfully! We will contact you soon.');
            this.reset();
        });
    }

    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[placeholder="Your Name"]').value.trim();
            const email = this.querySelector('input[placeholder="Your Email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // If validation passes, show success message
            alert('Message sent successfully! We will get back to you soon.');
            this.reset();
        });
    }

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Destination cards hover effect
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.destination-overlay').style.opacity = '1';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.destination-overlay').style.opacity = '0.8';
        });
    });

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize Google Maps
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        // Add map loading indicator
        mapContainer.querySelector('iframe').addEventListener('load', function() {
            this.style.opacity = '1';
        });
    }
});