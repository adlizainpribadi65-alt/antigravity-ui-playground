document.addEventListener("DOMContentLoaded", () => {

    /* --- Quotes Rotation Logic --- */
    const quotes = [
        "\"To Antygravity: In a world full of constants, you are my favorite force of nature. Keep shining.\"",
        "\"No matter how heavy the world feels, your soul was meant to fly. Rise above it all.\"",
        "\"Just like a flower blooms against the cold, your strength inspires me every single day.\""
    ];

    const quoteDisplay = document.getElementById('quote-display');
    let currentQuoteIndex = 0;

    function changeQuote() {
        // Fade out
        quoteDisplay.classList.remove('active');
        
        setTimeout(() => {
            // Update text after fade out
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            quoteDisplay.textContent = quotes[currentQuoteIndex];
            
            // Fade in
            quoteDisplay.classList.add('active');
        }, 2000); // Wait for the 2s transition
    }

    // Initialize first quote
    quoteDisplay.textContent = quotes[0];
    setTimeout(() => quoteDisplay.classList.add('active'), 500);

    // change quote every 8 seconds
    setInterval(changeQuote, 8000);

    /* --- Digital Breeze / Parallax Effect --- */
    const flowerImage = document.getElementById('flower-image');
    
    document.addEventListener('mousemove', (e) => {
        // Calculate mouse position relative to center of screen
        const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 2;
        
        // Gentle tilt based on mouse position
        const maxRotation = 10; // degrees
        const tiltX = yPos * maxRotation; // up/down
        const tiltY = -xPos * maxRotation; // left/right

        // Calculate a slight translation for depth
        const moveX = xPos * 15;
        const moveY = yPos * 15;

        flowerImage.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateX(${moveX}px) translateY(${moveY}px) scale(1.05)`;
    });

    document.addEventListener('mouseleave', () => {
        // Reset when mouse leaves
        flowerImage.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) scale(1)`;
    });

    /* --- Particle Background System (Glowing Pollen/Stars) --- */
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5; // subtle size
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * -1 - 0.2; // mostly float up gently
            this.opacity = Math.random() * 0.5 + 0.1;
            // Warm magical hue
            this.color = `rgba(255, 230, 240, ${this.opacity})`;
            this.glow = Math.random() * 5 + 2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around
            if (this.y < -10) this.y = canvas.height + 10;
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.glow;
            ctx.shadowColor = 'rgba(255, 200, 220, 0.8)';
            ctx.fill();
            ctx.shadowBlur = 0; // reset for performance
        }
    }

    // Create initial particles
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        // Clear canvas with a subtle fade effect to leave slight trails
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animateParticles);
    }
    animateParticles();
});
