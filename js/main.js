document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       PRELOADER
    ========================================= */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000); // Small delay to show the animation
    });

    /* =========================================
       CUSTOM CURSOR
    ========================================= */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check if it's not a touch device
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Add a slight delay for the outline for a trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
        
        // Add hover effect for links and buttons
        const hoverElements = document.querySelectorAll('a, button, .skill-card, .social-icon');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       MOBILE MENU TOGGLE
    ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* =========================================
       TYPING TEXT EFFECT
    ========================================= */
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = ["Full-Stack Developer", "AI Explorer", "Problem Solver", "CSE Undergraduate"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    if (textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }

    /* =========================================
       SCROLL REVEAL ANIMATIONS
    ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Canvas particles removed per user request

    /* =========================================
       RESUME MODAL FUNCTIONALITY
    ========================================= */
    const modal = document.getElementById('resume-modal');
    const resumeBtns = [
        document.getElementById('nav-resume-btn'),
        document.getElementById('hero-resume-btn'),
        document.getElementById('floating-resume-btn')
    ];
    const closeModalBtn = document.querySelector('.close-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const resumeIframe = document.getElementById('resume-iframe');
    const resumeUrl = 'assets/resume/yashaswiniresume.pdf';

    function openModal(e) {
        if(e) e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Load PDF if not already loaded
        if (!resumeIframe.src || resumeIframe.src === window.location.href) {
            resumeIframe.src = resumeUrl;
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    resumeBtns.forEach(btn => {
        if(btn) btn.addEventListener('click', openModal);
    });

    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    
    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* =========================================
       ACTIVE NAV LINK ON SCROLL
    ========================================= */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
        
        // Show/Hide floating resume button
        const floatingResumeBtn = document.getElementById('floating-resume-btn');
        if (pageYOffset > 500) {
            floatingResumeBtn.style.display = 'flex';
        } else {
            floatingResumeBtn.style.display = 'none';
        }
    });

});
