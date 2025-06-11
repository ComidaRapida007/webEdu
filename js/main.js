// Esperar a que todo el contenido se cargue
document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.createElement('div');
    
    // Menú hamburguesa para dispositivos móviles
    burger.addEventListener('click', () => {
        // Alternar la navegación
        nav.classList.toggle('nav-active');
        
        // Animar los links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Animación de la hamburguesa
        burger.classList.toggle('toggle');
    });
    
    // Cambiar el estilo de la barra de navegación al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = '#ffffff';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.backgroundColor = '#ffffff';
        }
        
        // Mostrar/ocultar botón de volver arriba
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show-scroll-top');
        } else {
            scrollTopBtn.classList.remove('show-scroll-top');
        }
    });
    
    // Crear el botón de volver arriba
    scrollTopBtn.classList.add('scroll-top');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Estilos para el botón de volver arriba
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '20px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.width = '40px';
    scrollTopBtn.style.height = '40px';
    scrollTopBtn.style.backgroundColor = 'var(--primary-color)';
    scrollTopBtn.style.color = '#fff';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.display = 'flex';
    scrollTopBtn.style.justifyContent = 'center';
    scrollTopBtn.style.alignItems = 'center';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.visibility = 'hidden';
    scrollTopBtn.style.transition = 'all 0.3s ease';
    scrollTopBtn.style.zIndex = '999';
    
    // Clase para mostrar el botón
    const style = document.createElement('style');
    style.textContent = `
        .show-scroll-top {
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        .scroll-top:hover {
            transform: translateY(-3px);
            background-color: var(--secondary-color);
        }
        
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Funcionalidad del botón para volver arriba
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Validación del formulario de contacto
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obtener los valores de los campos
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validación básica
            if (!nombre || !email || !asunto || !mensaje) {
                alert('Por favor, complete todos los campos');
                return;
            }
            
            // Validar el formato del correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingrese un correo electrónico válido');
                return;
            }
            
            // Aquí se podría implementar el envío del formulario a un servidor
            // Para este ejemplo, solo mostraremos un mensaje de éxito
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
            
            // Limpiar el formulario después de enviar
            contactForm.reset();
        });
    }
    
    // Formulario de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Validación básica
            if (!email) {
                alert('Por favor, ingrese su correo electrónico');
                return;
            }
            
            // Validar el formato del correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingrese un correo electrónico válido');
                return;
            }
            
            // Aquí se podría implementar la suscripción a un servidor
            alert('¡Gracias por suscribirte a nuestro newsletter!');
            
            // Limpiar el campo de correo electrónico después de enviar
            emailInput.value = '';
        });
    }
    
    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const animateElements = document.querySelectorAll('.section-title, .course-card, .teacher-card, .resource-card');
    
    // Estilo para las animaciones
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .section-title, .course-card, .teacher-card, .resource-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section-title.animate, .course-card.animate, .teacher-card.animate, .resource-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Observar los elementos
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Efecto parallax en el hero
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        if (hero) {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.5}px)`;
        }
    });
    
    // Destacar el enlace activo según la sección visible
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Desplazamiento suave al hacer clic en los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar el menú móvil si está abierto
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
            
            // Desplazarse suavemente a la sección
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - 70;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
