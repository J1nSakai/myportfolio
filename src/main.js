document.addEventListener('DOMContentLoaded', function() {
    // Changing word effect with letter-by-letter animation
    const words = ['smooth', 'fast', 'amazing', 'creative', 'beautiful'];
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
                letterSpan.style.transition = 'opacity 0.3s ease, filter 0.3s ease, transform 0.3s ease';
                letterSpan.style.opacity = '1';
                letterSpan.style.filter = 'blur(0)';
                letterSpan.style.transform = 'translateY(0)';
            }, 100 * i); // Stagger the animation
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
            'stroke-dashoffset 3s ease-in-out';
        path.style.strokeDashoffset = '0';
    });


    // Scroll-based animation for projects section footer
    // Star trail effect for projects section footer
    function createStarTrail(element) {
        // Get element position and dimensions
        const rect = element.getBoundingClientRect();
        const startX = rect.left;
        const width = rect.width;
        
        // Create stars with staggered timing
        for (let i = 0; i < 20; i++) { // Create 20 stars
            setTimeout(() => {
                // Calculate position (distribute along the text width)
                const starX = startX + (width * (i / 20)) - 50; // Adjust starting position to be before text
                const starY = rect.top + (Math.random() * rect.height);
                
                // Create star element
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = `${starX}px`;
                star.style.top = `${starY}px`;
                
                // Add some randomness to size and color
                const size = 2 + Math.random() * 4;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                
                // Random color variations (whites, light blues, light purples)
                const colors = [
                    'rgba(255, 255, 255, 0.9)',
                    'rgba(200, 220, 255, 0.9)',
                    'rgba(220, 200, 255, 0.9)',
                    'rgba(255, 220, 240, 0.9)'
                ];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                star.style.backgroundColor = randomColor;
                star.style.boxShadow = `0 0 6px 1px ${randomColor}`;
                
                // Add to document
                document.body.appendChild(star);
                
                // Remove star after animation completes
                setTimeout(() => {
                    document.body.removeChild(star);
                }, 1500); // Match animation duration
            }, i * 100); // Stagger star creation
        }
    }
    
    // Modify the Intersection Observer to trigger star trail
    const projectsFooter = document.querySelector('.projects-section-footer');
    
    // Create an Intersection Observer
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('animate-in');
                
                // Create star trail effect after a small delay
                setTimeout(() => {
                    createStarTrail(entry.target);
                }, 200);
                
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
    }
});

