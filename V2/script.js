/* ========================================
   LIQUID GLASS - INTERACTIVE SCRIPTS
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // Navbar Background on Scroll
    // ========================================
    const nav = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(15, 23, 42, 0.9)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.05)';
            nav.style.boxShadow = 'none';
        }
    });
    
    // ========================================
    // Animated Counter for Stats
    // ========================================
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger counter animation when stats section is visible
                if (entry.target.classList.contains('hero-stats') && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements with reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
    
    // Observe hero stats for counter animation
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
        // Trigger immediately if already in view
        setTimeout(() => {
            if (!countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        }, 1000);
    }
    
    // ========================================
    // Parallax Effect on Blobs
    // ========================================
    const blobs = document.querySelectorAll('.blob');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // ========================================
    // Form Submission Handler
    // ========================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success animation
            const button = this.querySelector('button[type="submit"]');
            const originalContent = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            button.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
                button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.innerHTML = originalContent;
                    button.style.background = '';
                    button.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    // ========================================
    // Gallery Image Modal (Optional Enhancement)
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay h4');
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'gallery-modal';
            modal.innerHTML = `
                <div class="modal-content glass-card">
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                    <img src="${img.src}" alt="${img.alt}">
                    <h4>${overlay ? overlay.textContent : ''}</h4>
                </div>
            `;
            
            // Add modal styles
            modal.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                padding: 2rem;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.cssText = `
                max-width: 90%;
                max-height: 90vh;
                padding: 1rem;
                text-align: center;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            `;
            
            const modalImg = modal.querySelector('img');
            modalImg.style.cssText = `
                max-width: 100%;
                max-height: 70vh;
                border-radius: 10px;
            `;
            
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.2rem;
                transition: background 0.3s ease;
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Animate in
            requestAnimationFrame(() => {
                modal.style.opacity = '1';
                modalContent.style.transform = 'scale(1)';
            });
            
            // Close modal
            const closeModal = () => {
                modal.style.opacity = '0';
                modalContent.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = '';
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeModal();
            });
        });
    });
    
    // ========================================
    // Active Navigation Link Highlighting
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ========================================
    // Ripple Effect on Buttons
    // ========================================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                width: 100px;
                height: 100px;
                left: ${x - 50}px;
                top: ${y - 50}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-links a.active {
            background: rgba(255, 255, 255, 0.15) !important;
        }
        
        .nav-links a.active::after {
            width: 80% !important;
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // Lazy Loading Images
    // ========================================
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    console.log('🚀 Montillo - Liquid Glass Landing Page Loaded!');
});
