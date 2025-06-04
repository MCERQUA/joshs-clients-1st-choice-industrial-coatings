// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate metrics on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.1s';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.metric-card, .action-card, .service-item, .opportunity');
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Simulate real-time metric updates (demo only)
    function updateMetrics() {
        const trafficValue = document.querySelector('.metric-card:first-child .metric-value');
        if (trafficValue) {
            const currentValue = parseInt(trafficValue.textContent);
            const change = Math.floor(Math.random() * 5) - 2; // Random change between -2 and +2
            const newValue = Math.max(0, currentValue + change);
            trafficValue.textContent = newValue;
        }
    }
    
    // Update every 5 seconds for demo purposes
    setInterval(updateMetrics, 5000);
    
    // Add active state to current nav item
    const currentLocation = window.location.hash || '#dashboard';
    const activeLink = document.querySelector(`a[href="${currentLocation}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Log dashboard visit for analytics
console.log('Dashboard loaded:', new Date().toISOString());