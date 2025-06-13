document.addEventListener('DOMContentLoaded', function() {
    // Changing word effect with letter-by-letter animation
    const words = ['smooth', 'amazing', 'creative', 'beautiful', 'fast', 'animated'];
    const changingWord = document.querySelector('.changing-word');
    let currentIndex = 0;

    // Set initial text
    changingWord.textContent = words[0];

    // Function to animate letters one by one
    function animateWord(word) {
        changingWord.innerHTML = ''; // Clear current content
        
        // Create a span for each letter
        for (let i = 0; i < word.length; i++) {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'letter';
            letterSpan.textContent = word[i];
            letterSpan.style.opacity = '0';
            letterSpan.style.filter = 'blur(8px)';
            letterSpan.style.transform = 'translateY(20px)';
            changingWord.appendChild(letterSpan);
            
            // Animate each letter with a delay based on its position
            setTimeout(() => {
                letterSpan.style.opacity = '1';
                letterSpan.style.filter = 'blur(0)';
                letterSpan.style.transform = 'translateY(0)';
                
                letterSpan.style.transition = 'opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease';
            }, 100 * i + 50); // Stagger the animation
        }
    }

    // Initial animation
    animateWord(words[0]);

    // Change word every 3 seconds
    setInterval(() => {
        // Get next word
        currentIndex = (currentIndex + 1) % words.length;
        
        // Fade out current letters
        const letters = document.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.opacity = '0';
                letter.style.filter = 'blur(8px)';
                letter.style.transform = 'translateY(-20px)';
            }, 50 * index); // Stagger the fade out
        });
        
        // Wait for fade out to complete before showing new word
        setTimeout(() => {
            animateWord(words[currentIndex]);
        }, letters.length * 50 + 300);
        
    }, 3000); // Change word every 3 seconds


    // SVG animation
    const allPaths = document.querySelectorAll('path');

    allPaths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        path.getBoundingClientRect();

        path.style.transition = path.style.WebkitTransition =
            'stroke-dashoffset 5.5s ease-in-out';
        path.style.strokeDashoffset = '0';
    });



    // Update the Intersection Observer with better debugging
    const projectsFooter = document.querySelector('.projects-section-footer');
    console.log('Projects footer element found:', projectsFooter);

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log('Footer intersection:', entry.isIntersecting);
            if (entry.isIntersecting) {
                console.log('Footer is visible, starting animation');
                // Add the slide-in animation class
                entry.target.classList.add('animate-in');
        
                // Stop observing once animation is triggered
                footerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Start observing the footer element
    if (projectsFooter) {
        footerObserver.observe(projectsFooter);
        console.log('Started observing footer');
    } else {
        console.error('Projects footer element not found!');
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Load the EmailJS SDK
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.async = true;
        document.head.appendChild(script);
        
        script.onload = function() {
            // Initialize EmailJS with your public key
            emailjs.init("tmoaVOdaLXMSYhxUY"); // Replace with your actual public key
        };
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Send the email using EmailJS
            emailjs.send(
                "service_buq55uk", // EmailJS service ID
                "template_luoloab", // EmailJS template ID
                {
                    name: name,
                    email: email,
                    message: message
                }
            ).then(function() {
                // Success
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, function(error) {
                // Error
                console.error('EmailJS error:', error);
                alert('Sorry, there was an error sending your message. Please try again later.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

        // Trying to fix the hero-section responsiveness through JavaScript
        const heroSection = document.querySelector('.hero-section');
        const heroContent = document.querySelector('.hero-content');
        const descriptionContainer = document.querySelector('.description-container');

        const socials = document.querySelector('.socials');
        const contactContent = document.querySelector('.contact-content');
        const contactTextAndSocials = document.querySelector('.contact-text-and-socials');


        if (window.innerWidth <= 768) {
        if (heroContent.querySelector(":scope > .description-container")) {
            heroContent.removeChild(descriptionContainer);
            heroSection.appendChild(descriptionContainer);
        }

        if (contactTextAndSocials.querySelector(":scope > .socials")) {
            contactTextAndSocials.removeChild(socials);
            contactContent.appendChild(socials);
        }

        }

    document.body.classList.remove('preload');
});

window.addEventListener('resize', function() {
    // Trying to fix the hero-section responsiveness through JavaScript
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    const descriptionContainer = document.querySelector('.description-container');

    const socials = document.querySelector('.socials');
    const contactContent = document.querySelector('.contact-content');
    const contactTextAndSocials = document.querySelector('.contact-text-and-socials');

    if (window.innerWidth <= 768) {
    if (heroContent.querySelector(":scope > .description-container")) {
        heroContent.removeChild(descriptionContainer);
        heroSection.appendChild(descriptionContainer);
    }

    if (contactTextAndSocials.querySelector(":scope > .socials")) {
        contactTextAndSocials.removeChild(socials);
        contactContent.appendChild(socials);
    }

    } else {
    // This checks for direct children, not nested
    if (heroSection.querySelector(":scope > .description-container")) {
        heroSection.removeChild(descriptionContainer);
        heroContent.appendChild(descriptionContainer);
    }

    if (contactContent.querySelector(":scope >.socials")) {
        contactContent.removeChild(socials);
        contactTextAndSocials.appendChild(socials);
    }
    } 
});
