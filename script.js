// ============================================
// JUMPINGLURY PORTFOLIO - SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initTypingAnimation();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initStatsCounter();
    initSkillBars();
    initPortfolioFilter();
    initTestimonialsSlider();
    initContactForm();
    initActiveNavLink();
});

// --- Particles ---
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 4 + 2;
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 20 + 10}s;
            animation-delay: ${Math.random() * 20}s;
            background: ${Math.random() > 0.5 ? '#00d4ff' : '#7c3aed'};
        `;
        container.appendChild(p);
    }
}

// --- Typing Animation ---
function initTypingAnimation() {
    const words = ['Lua Scripter', 'Game Developer', 'UI Designer', 'Systems Builder', 'Problem Solver'];
    const el = document.getElementById('dynamicText');
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const word = words[wordIndex];
        el.textContent = isDeleting
            ? word.substring(0, charIndex - 1)
            : word.substring(0, charIndex + 1);

        isDeleting ? charIndex-- : charIndex++;

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === word.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    type();
}

// --- Navbar Scroll ---
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// --- Mobile Menu ---
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const els = document.querySelectorAll(
        '.skill-card, .portfolio-item, .service-card, .about-content, .contact-content, .showcase-card, .services-note'
    );

    els.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    els.forEach(el => observer.observe(el));
}

// --- Stats Counter ---
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let counted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    let current = 0;
                    const step = target / (2000 / 16);

                    const counter = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            stat.textContent = target;
                            clearInterval(counter);
                        } else {
                            stat.textContent = Math.floor(current);
                        }
                    }, 16);
                });
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);
}

// --- Skill Bars ---
function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    fills.forEach(fill => observer.observe(fill));
}

// --- Portfolio Filter ---
function initPortfolioFilter() {
    const filterBtns    = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const match = filter === 'all' || item.getAttribute('data-category') === filter;
                item.classList.toggle('hidden', !match);
            });
        });
    });
}

// --- Testimonials Slider ---
function initTestimonialsSlider() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots  = document.querySelectorAll('.slider-dots .dot');
    let current = 0;

    function showSlide(index) {
        cards.forEach(c => c.classList.remove('active'));
        dots.forEach(d  => d.classList.remove('active'));
        cards[index].classList.add('active');
        dots[index].classList.add('active');
        current = index;
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showSlide(parseInt(dot.getAttribute('data-index')));
        });
    });

    setInterval(() => showSlide((current + 1) % cards.length), 5000);
}

// --- Contact Form ---
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}

// --- Active Nav Link on Scroll ---
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    });
}
