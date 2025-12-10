document.addEventListener('DOMContentLoaded', () => {
    // --- UI Cache ---
    const ui = {
        navbar: document.getElementById('navbar'),
        mobileMenuBtn: document.getElementById('mobile-menu-btn'),
        mobileMenu: document.getElementById('mobile-menu'),
        promoSection: document.getElementById('promo'),
        navLinks: document.querySelectorAll('.nav-link'),
        sections: document.querySelectorAll('section, header'),

        // Modals
        modal: document.getElementById('legal-modal'),
        modalTitle: document.getElementById('modal-title'),
        modalContent: document.getElementById('modal-content'),
        closeModalBtn: document.getElementById('close-modal'),

        // Links
        privacyLink: document.getElementById('privacy-link'),
        licenseLink: document.getElementById('license-link'),

        // Cookies
        cookieBanner: document.getElementById('cookie-banner'),
        acceptCookiesBtn: document.getElementById('accept-cookies'),

        // Testimonials
        testimonialsContainer: document.getElementById('testimonials-container'),
        btnLeft: document.getElementById('scroll-left'),
        btnRight: document.getElementById('scroll-right')
    };

    // --- 1. Mobile Menu ---
    const toggleMenu = () => {
        ui.mobileMenu.classList.toggle('hidden');
    };

    if (ui.mobileMenuBtn) {
        ui.mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            ui.mobileMenu.classList.add('hidden');
        });
    });

    // --- 2. Scroll Logic (Optimized) ---
    let ticking = false;

    const onScroll = () => {
        const scrollY = window.scrollY;

        // A. Navbar Visibility
        const triggerPoint = ui.promoSection ? (ui.promoSection.offsetHeight - 150) : 100;

        if (scrollY > triggerPoint) {
            ui.navbar.classList.remove('-translate-y-full');
        } else {
            ui.navbar.classList.add('-translate-y-full');
            ui.mobileMenu.classList.add('hidden');
        }

        // B. Scroll Spy (Active Link Highlighting)
        let currentSectionId = '';

        ui.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            // 200px offset for better UX
            if (scrollY >= (sectionTop - 200)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        ui.navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    // --- 3. Smooth Scroll for Anchors (JS Implementation) ---
    // This allows smooth scrolling ONLY when clicking links, keeping native scroll performant
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ignore empty links or non-anchors
            if (!href || href === '#' || href.length < 2) return;

            // Ignore modal triggers (if any links use # for modals)
            if (this.id && (this.id.includes('link') || this.id.includes('btn'))) return;

            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Update URL without jump
                history.pushState(null, null, href);
            }
        });
    });

    // --- 4. Testimonials Carousel ---
    if (ui.testimonialsContainer) {
        if (ui.btnLeft) {
            ui.btnLeft.addEventListener('click', () => {
                ui.testimonialsContainer.scrollBy({ left: -320, behavior: 'smooth' });
            });
        }
        if (ui.btnRight) {
            ui.btnRight.addEventListener('click', () => {
                ui.testimonialsContainer.scrollBy({ left: 320, behavior: 'smooth' });
            });
        }
    }

    // --- 5. Modals Logic (Fetch) ---
    const openModal = (title, fileUrl) => {
        ui.modalTitle.textContent = title;
        ui.modalContent.innerHTML = '<div class="flex justify-center p-4"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cultura"></div></div>';
        ui.modal.classList.remove('hidden');

        fetch(fileUrl)
            .then(response => {
                if (!response.ok) throw new Error("Document not found");
                return response.text();
            })
            .then(text => {
                ui.modalContent.innerHTML = text.replace(/\n/g, '<br>');
            })
            .catch(error => {
                ui.modalContent.innerHTML = `<p class="text-red-500 text-center">Failed to load document.</p>`;
                console.error(error);
            });
    };

    const closeModal = () => {
        ui.modal.classList.add('hidden');
    };

    if (ui.closeModalBtn) ui.closeModalBtn.addEventListener('click', closeModal);

    if (ui.modal) {
        ui.modal.addEventListener('click', (e) => {
            if (e.target === ui.modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && ui.modal && !ui.modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    if (ui.privacyLink) {
        ui.privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Privacy Policy', 'static/privacy_policy.txt');
        });
    }

    if (ui.licenseLink) {
        ui.licenseLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('License Agreement', 'static/license_agreement.txt');
        });
    }

    // --- 6. Cookie Banner ---
    if (ui.cookieBanner && !localStorage.getItem('culturaCookiesAccepted')) {
        ui.cookieBanner.classList.remove('hidden');
        setTimeout(() => {
            ui.cookieBanner.classList.remove('translate-y-full');
        }, 100);
    }

    if (ui.acceptCookiesBtn) {
        ui.acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('culturaCookiesAccepted', 'true');
            ui.cookieBanner.classList.add('translate-y-full');
            setTimeout(() => {
                ui.cookieBanner.classList.add('hidden');
            }, 500);
        });
    }
});