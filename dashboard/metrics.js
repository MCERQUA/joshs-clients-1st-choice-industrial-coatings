// SEO Metrics Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Animate progress bars on page load
    animateProgressBars();
    
    // Animate score circle
    animateScoreCircle();
    
    // Smooth scroll to sections
    initSmoothScroll();
});

// Animate progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.1 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Animate score circle
function animateScoreCircle() {
    const scoreCircle = document.querySelector('.score-circle');
    if (!scoreCircle) return;
    
    const circle = scoreCircle.querySelector('circle:last-child');
    if (!circle) return;
    
    const score = scoreCircle.getAttribute('data-score');
    const circumference = 2 * Math.PI * 90; // radius = 90
    const offset = circumference - (score / 100) * circumference;
    
    // Set initial state
    circle.style.strokeDashoffset = circumference;
    
    // Animate on scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    circle.style.transition = 'stroke-dashoffset 2s ease-out';
                    circle.style.strokeDashoffset = offset;
                }, 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(scoreCircle);
}

// Smooth scroll functionality
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offset = 80; // Account for fixed header
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add hover effects to issue cards
document.querySelectorAll('.issue-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});