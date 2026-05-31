document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // CONFIGURATION: REPLACE THESE WITH REAL KEYS
    // =========================================
    const EMAILJS_PUBLIC_KEY = "77I3HwMGEhl374fxU";
    const EMAILJS_SERVICE_ID = "service_hb2te2y";
    const EMAILJS_TEMPLATE_ID = "template_09hpij7";

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("77I3HwMGEhl374fxU");
    }

    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnIcon = submitBtn.querySelector('.btn-icon');

    // =========================================
    // BUTTON RIPPLE EFFECT
    // =========================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;

            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple');
            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove();
            }, 600);
        });
    });

    // =========================================
    // TOAST NOTIFICATION SYSTEM
    // =========================================
    function showToast(type, title, message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark';

        toast.innerHTML = `
            <i class="fa-solid ${iconClass} toast-icon"></i>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;

        container.appendChild(toast);

        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400); // Wait for transition to finish
        }, 5000);
    }

    // =========================================
    // FORM VALIDATION & SUBMISSION
    // =========================================

    function validateField(input) {
        if (!input.value.trim()) {
            input.classList.add('input-invalid');
            // Remove animation class after it finishes to allow re-triggering
            setTimeout(() => input.classList.remove('input-invalid'), 500);
            return false;
        }

        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('input-invalid');
                setTimeout(() => input.classList.remove('input-invalid'), 500);
                return false;
            }
        }

        return true;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');

            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                showToast('error', 'Validation Error', 'Please fill all required fields correctly.');
                return;
            }

            // Start sending state
            submitBtn.classList.add('sending');
            submitBtn.disabled = true;
            const originalText = btnText.innerText;
            const originalIconClass = btnIcon.className;

            btnText.innerText = 'Sending...';
            btnIcon.className = 'fa-solid fa-spinner';

            // EmailJS Send
            // Note: If you haven't replaced the keys yet, this will fail.
            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
                .then(function () {
                    // Success
                    showToast('success', 'Message Sent!', 'Thank you for reaching out. I will get back to you soon.');
                    contactForm.reset();

                    // Show success checkmark on button momentarily
                    btnText.innerText = 'Sent';
                    btnIcon.className = 'fa-solid fa-check';

                    setTimeout(() => {
                        resetButton();
                    }, 3000);
                }, function (error) {
                    // Failed
                    console.error('EmailJS Error:', error);
                    showToast('error', 'Failed to Send', 'There was an issue sending your message. Please try again.');
                    resetButton();
                });

            function resetButton() {
                submitBtn.classList.remove('sending');
                submitBtn.disabled = false;
                btnText.innerText = originalText;
                btnIcon.className = originalIconClass;
            }
        });

        // Remove invalid class on input focus
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.classList.remove('input-invalid');
            });
        });
    }

});
