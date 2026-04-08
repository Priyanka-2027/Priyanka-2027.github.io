// =====================
// Theme Toggle
// =====================
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Get saved theme or use system preference
function getTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return prefersDarkScheme.matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
}

// Initialize theme
let currentTheme = getTheme();
applyTheme(currentTheme);

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
        
        // Add click animation
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
    });
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        currentTheme = e.matches ? 'dark' : 'light';
        applyTheme(currentTheme);
    }
});

// =====================
// Starfield Canvas - Global Background
// =====================
const canvas = document.getElementById('starfield');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    const stars = Array.from({ length: 300 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.6 + 0.1,
        twinkleSpeed: (Math.random() * 0.015) + 0.003
    }));

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        stars.forEach(s => {
            s.x += s.speedX;
            s.y += s.speedY;
            
            // Wrap around edges
            if (s.x < 0) s.x = canvas.width;
            if (s.x > canvas.width) s.x = 0;
            if (s.y < 0) s.y = canvas.height;
            if (s.y > canvas.height) s.y = 0;
            
            // Twinkle effect
            s.opacity += s.twinkleSpeed;
            if (s.opacity > (isLight ? 0.75 : 1) || s.opacity < 0.1) s.twinkleSpeed *= -1;
            
            // Draw star — dark dots in light mode, white in dark mode
            if (isLight) {
                ctx.fillStyle = `rgba(70,100,160,${s.opacity})`;
            } else {
                ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
            }
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();

    window.addEventListener('resize', () => {
        resizeCanvas();
        // Redistribute stars on resize
        stars.forEach(s => {
            if (s.x > canvas.width) s.x = Math.random() * canvas.width;
            if (s.y > canvas.height) s.y = Math.random() * canvas.height;
        });
    });
}

// =====================
// Smooth Scroll
// =====================
function scrollToSection(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
}

// Attach to ALL anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const id = href.replace('#', '');
        scrollToSection(id);

        // Close mobile menu
        const nav = document.querySelector('.nav-links');
        const hb = document.querySelector('.hamburger');
        if (nav) nav.classList.remove('active');
        if (hb) hb.classList.remove('active');
    });
});

// =====================
// Navbar
// =====================
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open on mobile
        if (navLinksContainer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinksContainer.contains(e.target)) {
            navLinksContainer.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

window.addEventListener('scroll', () => {
    // Handled by optimized scroll handler above
});

// =====================
// Scroll Reveal - Optimized for Mobile
// =====================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            revealObserver.unobserve(entry.target); // stop observing once visible
        }
    });
}, { 
    threshold: 0.1, 
    rootMargin: '0px 0px -60px 0px' 
});

// Reveal sections (skip hero)
document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.classList.add('reveal');
    revealObserver.observe(section);
});

// Reveal cards with stagger - reduce on mobile
const isMobile = window.innerWidth <= 768;
const staggerDelay = isMobile ? 0.05 : 0.08;

document.querySelectorAll('.skill-card, .project-card, .contact-item, .highlight-item, .cert-card, .experience-card, .trait-card').forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * staggerDelay}s`;
    revealObserver.observe(card);
});

// Fade-up animation for contact section elements
document.querySelectorAll('.availability-banner, .contact-wrapper, .contact-social-footer').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.15}s`;
    revealObserver.observe(el);
});

// =====================
// Mobile Performance Optimizations
// =====================

// Detect if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// Optimize scroll performance on mobile
let ticking = false;
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll(lastScrollY);
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

function handleScroll(scrollY) {
    // Navbar scroll style
    if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > 50);
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Parallax on hero only (no opacity change) - disable on mobile for performance
    if (!isMobile) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    }
}

// Touch feedback for buttons on mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-live, .btn-github, .submit-btn').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
    });
}

// =====================
// Contact Form
// =====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name    = document.getElementById('name').value;
        const email   = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const btn     = contactForm.querySelector('.submit-btn span');

        // Sync reply-to hidden field
        document.getElementById('replyto').value = email;

        btn.textContent = 'Sending...';

        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, _replyto: email })
            });

            if (res.ok) {
                showToast(`✅ Message sent successfully! I will get back to you soon.`);
                contactForm.reset();
                btn.textContent = 'Send Message →';
            } else {
                showToast('Oops! Something went wrong. Please try again.', true);
                btn.textContent = 'Send Message →';
            }
        } catch {
            showToast('Network error. Please try again.', true);
            btn.textContent = 'Send Message →';
        }
    });
}

function showToast(message, isError = false) {
    const existing = document.getElementById('toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: ${isError ? 'linear-gradient(135deg,#ef4444,#dc2626)' : 'linear-gradient(135deg,#00d4ff,#0099cc)'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-weight: 600;
        font-size: 0.9rem;
        z-index: 9999;
        box-shadow: 0 8px 24px rgba(0,212,255,0.35);
        opacity: 0;
        transform: translateY(16px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        max-width: 320px;
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(16px)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// =====================
// View All Projects Toggle
// =====================
const viewAllBtn = document.getElementById('viewAllBtn');
const hiddenProjects = document.querySelectorAll('.hidden-project');

if (viewAllBtn && hiddenProjects.length > 0) {
    let isExpanded = false;
    
    viewAllBtn.addEventListener('click', () => {
        if (!isExpanded) {
            // Show all projects
            hiddenProjects.forEach((project, index) => {
                setTimeout(() => {
                    project.classList.add('show');
                }, index * 100); // Stagger animation
            });
            
            // Change button text to "Show Less"
            viewAllBtn.innerHTML = 'Show Less <span class="arrow">↑</span>';
            isExpanded = true;
        } else {
            // Hide projects
            hiddenProjects.forEach((project) => {
                project.classList.remove('show');
            });
            
            // Change button text back to "Explore All Projects"
            viewAllBtn.innerHTML = 'Explore All Projects <span class="arrow">→</span>';
            isExpanded = false;
            
            // Scroll to projects section
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const offset = 100;
                const top = projectsSection.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    });
}

// =====================
// View All Certifications Toggle
// =====================
const viewAllCertsBtn = document.getElementById('viewAllCertsBtn');
const hiddenCerts = document.querySelectorAll('.hidden-cert');

if (viewAllCertsBtn && hiddenCerts.length > 0) {
    let isCertsExpanded = false;
    
    viewAllCertsBtn.addEventListener('click', () => {
        if (!isCertsExpanded) {
            // Show all certifications
            hiddenCerts.forEach((cert, index) => {
                setTimeout(() => {
                    cert.classList.add('show');
                }, index * 100); // Stagger animation
            });
            
            // Change button text to "View Less"
            viewAllCertsBtn.innerHTML = 'View Less <span class="arrow">↑</span>';
            isCertsExpanded = true;
        } else {
            // Hide certifications
            hiddenCerts.forEach((cert) => {
                cert.classList.remove('show');
            });
            
            // Change button text back to "View More"
            viewAllCertsBtn.innerHTML = 'View More <span class="arrow">→</span>';
            isCertsExpanded = false;
            
            // Scroll to certifications section
            const certsSection = document.getElementById('certifications');
            if (certsSection) {
                const offset = 100;
                const top = certsSection.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    });
}



// =====================
// Copy Email to Clipboard
// =====================
const copyEmailBtn = document.querySelector('.copy-email-btn');

if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const email = copyEmailBtn.dataset.email;
        
        try {
            await navigator.clipboard.writeText(email);
            
            // Visual feedback
            copyEmailBtn.classList.add('copied');
            copyEmailBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            
            // Show toast
            showToast('✅ Email copied to clipboard!');
            
            // Reset after 2 seconds
            setTimeout(() => {
                copyEmailBtn.classList.remove('copied');
                copyEmailBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                `;
            }, 2000);
        } catch (err) {
            showToast('Failed to copy email', true);
        }
    });
}

// =====================
// Enhanced Open Resume Button
// =====================
const openResume = document.getElementById('openResume');

if (openResume) {
    openResume.addEventListener('click', () => {
        // Add click animation
        openResume.style.transform = 'scale(0.95)';
        setTimeout(() => {
            openResume.style.transform = '';
        }, 150);
        
        // Show success message
        setTimeout(() => {
            showToast('📄 Resume download started!');
        }, 300);
    });
}
