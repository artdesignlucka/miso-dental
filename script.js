// MISO Dental Studio — Interactive behaviors & Micro-motions

document.addEventListener('DOMContentLoaded', () => {

    // Remover el velo de carga inicial de manera elegante
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 150);

    /* ----------------------------------------------------------------
       Menú Móvil Desplegable
    ---------------------------------------------------------------- */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Cerrar menú si se hace click en algún enlace interno
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ----------------------------------------------------------------
       Efecto del Encabezado al hacer Scroll
    ---------------------------------------------------------------- */
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ----------------------------------------------------------------
       Intersection Observer para animar las secciones al bajar (Scroll Reveal)
    ---------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealOnScroll.observe(el));

    /* ----------------------------------------------------------------
       Formulario de Citas - Manejo de éxito con transiciones fijas
    ---------------------------------------------------------------- */
    const form = document.getElementById('appointmentForm');
    const successMessage = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;

            console.log(`Nueva cita premium solicitada por: ${name} (${phone}) para el servicio: ${service}`);

            form.style.opacity = '0';
            form.style.transition = 'opacity 0.4s ease';

            setTimeout(() => {
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
            }, 400);
        });
    }

    /* ----------------------------------------------------------------
       Rotador y Slider de Testimonios
    ---------------------------------------------------------------- */
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.getElementById('testimonialDots');
    let activeIndex = 0;
    let testimonialTimer = null;

    if (testimonials.length && dotsContainer) {
        testimonials.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `Ver testimonio ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showTestimonial(i));
            dotsContainer.appendChild(dot);
        });

        function showTestimonial(index) {
            testimonials[activeIndex].classList.remove('active');
            dotsContainer.children[activeIndex].classList.remove('active');
            activeIndex = index;
            testimonials[activeIndex].classList.add('active');
            dotsContainer.children[activeIndex].classList.add('active');
        }

        function nextTestimonial() {
            showTestimonial((activeIndex + 1) % testimonials.length);
        }

        // Cambio automático de testimonios cada 6 segundos
        testimonialTimer = setInterval(nextTestimonial, 6000);
    }
});