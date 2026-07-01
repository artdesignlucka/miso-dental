// MISO Dental Studio — Interactive behaviors & Fluid motions

/* ----------------------------------------------------------------
   Configuración de WhatsApp
   ⚠️ IMPORTANTE: reemplaza WHATSAPP_NUMBER con el número real del
   consultorio en formato internacional sin espacios ni símbolos:
   52 (México) + LADA + número. Ej. Morelia: 5214431234567
---------------------------------------------------------------- */
const WHATSAPP_NUMBER = '5214431234567'; // TODO: reemplazar con el número real de MISO Dental Studio

const WHATSAPP_GENERIC_MESSAGE =
    'Hola MISO Dental Studio, me gustaría agendar una valoración inicial. ¿Podrían darme más información sobre disponibilidad?';

function buildWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.addEventListener('DOMContentLoaded', () => {

    // Quitar el velo de carga inicial de manera fluida
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    /* ----------------------------------------------------------------
       Enlaces de WhatsApp (botón flotante, footer, contacto directo)
    ---------------------------------------------------------------- */
    const genericWhatsAppUrl = buildWhatsAppUrl(WHATSAPP_GENERIC_MESSAGE);
    ['whatsappFloat', 'whatsappFooterLink', 'whatsappDirectLink'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.href = genericWhatsAppUrl;
    });

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

        // Cerrar menú al presionar un enlace interno
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ----------------------------------------------------------------
       Efecto del Menú Superior al Hacer Scroll
    ---------------------------------------------------------------- */
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    /* ----------------------------------------------------------------
       Intersection Observer para animaciones elegantes (Scroll Reveal)
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
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    });

    revealElements.forEach(el => revealOnScroll.observe(el));

    /* ----------------------------------------------------------------
       Tilt sutil en la tarjeta principal del bento (toque premium)
    ---------------------------------------------------------------- */
    const bentoMain = document.getElementById('bentoMain');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (bentoMain && window.matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
        const maxTilt = 4;

        bentoMain.addEventListener('mousemove', (e) => {
            const rect = bentoMain.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            bentoMain.style.transform = `perspective(1000px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) translateY(-5px)`;
        });

        bentoMain.addEventListener('mouseleave', () => {
            bentoMain.style.transform = '';
        });
    }

    /* ----------------------------------------------------------------
       Formulario de Citas — genera plantilla y abre WhatsApp
    ---------------------------------------------------------------- */
    const form = document.getElementById('appointmentForm');
    const successMessage = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const serviceSelect = document.getElementById('service');
            const service = serviceSelect.options[serviceSelect.selectedIndex].value;

            const template =
                `Hola MISO Dental Studio, soy ${name}.\n` +
                `Me gustaría agendar una valoración para: ${service}.\n` +
                `Mi número de contacto es ${phone}. Quedo atento(a) para coordinar día y hora.`;

            window.open(buildWhatsAppUrl(template), '_blank', 'noopener');

            form.style.opacity = '0';
            form.style.transition = 'opacity 0.3s ease';

            setTimeout(() => {
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
            }, 300);
        });
    }

    /* ----------------------------------------------------------------
       Rotador de Testimonios
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

        // Intervalo de cambio suave automático
        testimonialTimer = setInterval(nextTestimonial, 6000);
    }
});
