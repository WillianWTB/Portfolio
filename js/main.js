document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        mobileMenuButton.innerHTML = mobileMenu.style.display === 'block' ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    
    function toggleDarkMode() {
        document.body.classList.toggle('dark');
        localStorage.setItem('darkMode', document.body.classList.contains('dark'));
    }
    
    // Always use dark mode by default
    if (localStorage.getItem('darkMode') === 'false') {
        // Only use light mode if explicitly set to false
        document.body.classList.remove('dark');
    } else {
        // Default to dark mode
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
    }
    
    themeToggle.addEventListener('click', toggleDarkMode);
    themeToggleMobile.addEventListener('click', toggleDarkMode);
    
    // Scroll animation
    const animatedSections = document.querySelectorAll('.section-animate');
    
    function checkVisibility() {
        animatedSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight - 100) {
                section.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // Initialize skill bars animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-item .fill');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Trigger skill animation when section is visible
    const skillsSection = document.getElementById('habilidades');
    let skillsAnimated = false;
    
    function checkSkillsVisibility() {
        if (!skillsAnimated && skillsSection) {
            const sectionTop = skillsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight - 100) {
                animateSkillBars();
                skillsAnimated = true;
            }
        }
    }
    
    window.addEventListener('scroll', checkSkillsVisibility);
    
    // Initial check for skills visibility
    setTimeout(checkSkillsVisibility, 500);
});
