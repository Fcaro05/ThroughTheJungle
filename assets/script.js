// Jungle Theme Enhanced JavaScript

// Header Scroll Visibility
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Mostra l'header quando si inizia a scrollare verso il basso
        if (scrollTop > 100) {
            header.classList.remove('-translate-y-full');
            header.classList.add('translate-y-0');
        } else {
            // Nasconde l'header quando si torna in cima
            header.classList.remove('translate-y-0');
            header.classList.add('-translate-y-full');
        }
        
        lastScrollTop = scrollTop;
    });
});

// Fade In Animation
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Hero Section Entry Animation
    const heroTitle = document.getElementById('hero-title');
    const eventDetails = document.getElementById('event-details');
    const heroButton = document.getElementById('hero-button');

    if (heroTitle) {
        heroTitle.classList.remove('opacity-0', 'translate-y-4');
    }
    if (eventDetails) {
        eventDetails.classList.remove('opacity-0', 'translate-y-4');
    }
    if (heroButton) {
        heroButton.classList.remove('opacity-0', 'translate-y-4');
    }
});

// Dynamic Jungle Particles
function createJungleParticles() {
    const particleContainer = document.querySelector('.jungle-particles');
    if (!particleContainer) return;
    
    // Create additional floating particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random particle colors (different shades of green)
        const colors = ['#90EE90', '#228B22', '#32CD32', '#00FF00', '#ADFF2F'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `radial-gradient(circle, ${color}, #228B22)`;
        
        particleContainer.appendChild(particle);
    }
}

// Get responsive margin based on screen size
function getResponsiveMargin() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
        return Math.random() * 40 + 24; // 24-64px from edge
    } else if (screenWidth >= 1024) {
        return Math.random() * 32 + 16; // 16-48px from edge
    } else if (screenWidth >= 768) {
        return Math.random() * 24 + 8;  // 8-32px from edge
    } else {
        return Math.random() * 16 + 4;  // 4-20px from edge
    }
}

// Jungle Sound Effects (optional - can be enabled by user)
function initJungleSounds() {
    let soundEnabled = false;
    
    // Create sound toggle button
    const soundToggle = document.createElement('button');
    soundToggle.innerHTML = '🔇 Attiva Suoni Giungla';
    soundToggle.className = 'fixed bottom-4 right-4 jungle-btn px-4 py-2 rounded-full z-50 text-sm';
    soundToggle.onclick = function() {
        soundEnabled = !soundEnabled;
        soundToggle.innerHTML = soundEnabled ? '🔊 Disattiva Suoni' : '🔇 Attiva Suoni Giungla';
        
        if (soundEnabled) {
            playAmbientSounds();
        } else {
            stopAmbientSounds();
        }
    };
    
    document.body.appendChild(soundToggle);
}

let ambientAudio = null;

function playAmbientSounds() {
    // Create ambient jungle sounds (using Web Audio API for nature sounds)
    if (!ambientAudio) {
        // This would typically load actual audio files
        // For now, we'll create a visual indicator
        console.log('🌿 Suoni della giungla attivati');
    }
}

function stopAmbientSounds() {
    if (ambientAudio) {
        ambientAudio.pause();
        ambientAudio = null;
    }
    console.log('🔇 Suoni della giungla disattivati');
}

// Enhanced Hover Effects for Jungle Elements
function initJungleHoverEffects() {
    const jungleElements = document.querySelectorAll('.jungle-hover, .jungle-card, .jungle-btn');
    
    jungleElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Create temporary sparkle effect
            createSparkleEffect(this);
        });
    });
}

function createSparkleEffect(element) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.fontSize = '20px';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

// Add sparkle animation to CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                icon.classList.remove('ri-subtract-line');
                icon.classList.add('ri-add-line');
            } else {
                // Close all other accordions
                document.querySelectorAll('.accordion-content').forEach(item => {
                    if (item !== content) {
                        item.classList.remove('active');
                        const otherIcon = item.previousElementSibling.querySelector('i');
                        otherIcon.classList.remove('ri-subtract-line');
                        otherIcon.classList.add('ri-add-line');
                    }
                });
                content.classList.add('active');
                icon.classList.remove('ri-add-line');
                icon.classList.add('ri-subtract-line');
            }
        });
    });
});

// Smooth scroll per i link con hash
document.addEventListener('DOMContentLoaded', function() {
    // Gestisci tutti i link che puntano a sezioni della pagina
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Update positions on window resize (Only for vines now)
function updateLeafPositions() {
    const allVines = document.querySelectorAll('.jungle-vine');
    
    allVines.forEach((vine, index) => {
        // Ensure the vine has absolute positioning (scrolls with page)
        vine.style.position = 'absolute';
        vine.style.pointerEvents = 'none';
        vine.style.zIndex = '999';
        
        // Update margin-based positioning
        const currentLeft = vine.style.left;
        const currentRight = vine.style.right;
        
        if (currentLeft && currentLeft !== 'auto' && currentLeft !== '') {
            vine.style.left = (getResponsiveMargin() / 2) + 'px';
        } else if (currentRight && currentRight !== 'auto' && currentRight !== '') {
            vine.style.right = (getResponsiveMargin() / 2) + 'px';
        }
    });
}

// Initialize all jungle effects
document.addEventListener('DOMContentLoaded', function() {
    createJungleParticles();
    initJungleHoverEffects();
    initJungleSounds();
    
    // Update positions on window resize
    window.addEventListener('resize', updateLeafPositions);
    
    // Add subtle jungle cursor effect - Very minimal and rare
    document.addEventListener('mousemove', function(e) {
        // Create very rare sparkle effect on mouse movement
        if (Math.random() < 0.02) { // Only 2% chance per mouse move
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1001';
            sparkle.style.fontSize = '10px';
            sparkle.style.animation = 'fadeOut 1.5s ease-out forwards';
            sparkle.style.left = e.clientX + 'px';
            sparkle.style.top = (window.scrollY + e.clientY) + 'px';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1500);
        }
    });
});

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) rotate(45deg) translateY(-20px);
        }
    }
`;
document.head.appendChild(fadeOutStyle);

// Multi-step Form Navigation
document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 1;
    const totalSteps = 7; // Ora includiamo lo step di ringraziamento

    // Funzione per mostrare uno step specifico
    function showStep(stepNumber) {
        // Nascondi tutti gli step
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
            step.classList.add('hidden');
        });

        // Mostra lo step corrente
        const currentStepElement = document.getElementById(`step${stepNumber}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('hidden');
            currentStepElement.classList.add('active');
        }

        // Aggiorna gli indicatori di progresso (solo per i primi 6 step)
        if (stepNumber <= 6) {
            updateProgressIndicator(stepNumber);
        } else {
            // Step 7 (ringraziamento) - nascondi gli indicatori
            document.querySelector('.flex.justify-center.mt-6').style.display = 'none';
        }
        currentStep = stepNumber;
    }

    // Funzione per aggiornare gli indicatori di progresso
    function updateProgressIndicator(stepNumber) {
        for (let i = 1; i <= 6; i++) { // Solo i primi 6 step hanno indicatori
            const progressDot = document.getElementById(`progress-${i}`);
            if (progressDot) {
                if (i <= stepNumber) {
                    progressDot.classList.remove('bg-gray-300');
                    progressDot.classList.add('bg-primary');
                } else {
                    progressDot.classList.remove('bg-primary');
                    progressDot.classList.add('bg-gray-300');
                }
            }
        }
    }

    // Funzione per validare uno step
    function validateStep(stepNumber) {
        if (stepNumber === 1) {
            const settore = document.querySelector('input[name="settore"]:checked');
            if (!settore) {
                alert('Per favore, seleziona il tuo settore di riferimento.');
                return false;
            }
        } else if (stepNumber === 2) {
            const dimensione = document.querySelector('input[name="dimensione"]:checked');
            if (!dimensione) {
                alert('Per favore, indica la dimensione della tua azienda.');
                return false;
            }
        } else if (stepNumber === 3) {
            const esperienzaEnergia = document.querySelector('input[name="esperienza_energia"]:checked');
            if (!esperienzaEnergia) {
                alert('Per favore, indica a che punto siete sul fronte energia.');
                return false;
            }
        } else if (stepNumber === 4) {
            const priorita = document.querySelector('input[name="priorita"]:checked');
            if (!priorita) {
                alert('Per favore, indica quale è la vostra priorità oggi.');
                return false;
            }
        } else if (stepNumber === 5) {
            const analisiPersonalizzata = document.querySelector('input[name="analisi_personalizzata"]:checked');
            if (!analisiPersonalizzata) {
                alert('Per favore, indica se vuoi ricevere un\'analisi personalizzata.');
                return false;
            }
        }
        return true;
    }

    // Event listeners per i bottoni continua
    for (let i = 1; i <= 5; i++) {
        const continuaButton = document.getElementById(`continua-step${i}`);
        if (continuaButton) {
            continuaButton.addEventListener('click', function() {
                if (validateStep(i)) {
                    showStep(i + 1);
                }
            });
        }
    }

    // Event listeners per i bottoni indietro
    for (let i = 2; i <= 6; i++) {
        const indietroButton = document.getElementById(`indietro-step${i}`);
        if (indietroButton) {
            indietroButton.addEventListener('click', function() {
                showStep(i - 1);
            });
        }
    }

    // Event listener per "nuova registrazione" nello step 7
    const nuovaRegistrazioneBtn = document.getElementById('nuova-registrazione');
    if (nuovaRegistrazioneBtn) {
        nuovaRegistrazioneBtn.addEventListener('click', function() {
            // Reset del form
            const form = document.querySelector('#step6 form');
            if (form) {
                form.reset();
            }
            // Reset delle selezioni radio
            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.checked = false;
            });
            // Mostra indicatori di progresso
            document.querySelector('.flex.justify-center.mt-6').style.display = 'flex';
            // Torna al primo step
            showStep(1);
        });
    }

    // Inizializza il primo step
    showStep(1);

    // Gestisci il submit del form finale
    const form = document.querySelector('#step6 form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Disabilita il bottone submit per evitare invii multipli
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Invio in corso...';
            
            // Raccogli tutti i dati del form
            const formData = {};
            
            // Dati degli step precedenti
            const settore = document.querySelector('input[name="settore"]:checked');
            const dimensione = document.querySelector('input[name="dimensione"]:checked');
            const esperienzaEnergia = document.querySelector('input[name="esperienza_energia"]:checked');
            const priorita = document.querySelector('input[name="priorita"]:checked');
            const analisiPersonalizzata = document.querySelector('input[name="analisi_personalizzata"]:checked');
            
            if (settore) formData.settore = settore.value;
            if (dimensione) formData.dimensione = dimensione.value;
            if (esperienzaEnergia) formData.esperienza_energia = esperienzaEnergia.value;
            if (priorita) formData.priorita = priorita.value;
            if (analisiPersonalizzata) formData.analisi_personalizzata = analisiPersonalizzata.value;
            
            // Dati del form finale
            formData.nome = document.getElementById('nome').value.trim();
            formData.email = document.getElementById('email').value.trim();
            formData.azienda = document.getElementById('azienda').value.trim();
            formData.ruolo = document.getElementById('ruolo').value.trim();
            formData.telefono = document.getElementById('telefono').value.trim();
            
            // Validazione lato client
            if (!formData.nome || !formData.email || !formData.azienda || !formData.ruolo || !formData.telefono) {
                alert('Per favore, compila tutti i campi obbligatori.');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                return;
            }
            
            // Validazione email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Per favore, inserisci un indirizzo email valido.');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                return;
            }
            
            // Invia i dati al server
            const eventFormData = new FormData();
            eventFormData.append('action', 'register');
            
            // Aggiungi tutti i dati del form alla FormData
            Object.keys(formData).forEach(key => {
                eventFormData.append(key, formData[key]);
            });
            
            fetch('api/event_registration.php', {
                method: 'POST',
                body: eventFormData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Successo - mostra step 7 (ringraziamento) invece di alert
                    showStep(7);
                } else {
                    // Errore dal server
                    alert(`Errore: ${data.message}`);
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }
            })
            .catch(error => {
                console.error('Errore durante l\'invio:', error);
                alert('Si è verificato un errore durante l\'invio della registrazione. Per favore riprova.');
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            });
        });
    }

    // Gestisci download del menu
    const downloadMenuBtn = document.getElementById('download-menu-btn');
    if (downloadMenuBtn) {
        downloadMenuBtn.addEventListener('click', function() {
            // Simula download del PDF
            downloadMenuBtn.innerHTML = '<i class="ri-loader-4-line ri-xl animate-spin"></i> Download in corso...';
            downloadMenuBtn.disabled = true;
            
            // Simula un piccolo delay per il download
            setTimeout(() => {
                // Crea un link temporaneo per il download
                const link = document.createElement('a');
                link.href = 'menu-cena-solartech-summit-2025.pdf'; // File PDF del menu
                link.download = 'Menu-Cena-SolarTech-Summit-2025.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Ripristina il bottone
                downloadMenuBtn.innerHTML = '<i class="ri-download-cloud-line ri-xl"></i> Scarica E-Book Gratuito (PDF)';
                downloadMenuBtn.disabled = false;
                
                // Mostra messaggio di successo
                const originalText = downloadMenuBtn.innerHTML;
                downloadMenuBtn.innerHTML = '<i class="ri-check-line ri-xl"></i> Download Completato!';
                downloadMenuBtn.classList.add('bg-secondary');
                
                setTimeout(() => {
                    downloadMenuBtn.innerHTML = originalText;
                    downloadMenuBtn.classList.remove('bg-secondary');
                }, 3000);
            }, 1500);
        });
    }
});

// Testimonials Slider Functionality
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const track = document.querySelector('.testimonial-track');
    const dots = document.querySelectorAll('.testimonial-dot');
    const slides = document.querySelectorAll('.testimonial-slide');
    
    if (!slider || !track || !dots.length || !slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    
    // Funzione per aggiornare il slider
    function updateSlider(slideIndex) {
        // Assicurati che l'indice sia valido
        if (slideIndex < 0) slideIndex = totalSlides - 1;
        if (slideIndex >= totalSlides) slideIndex = 0;
        
        currentSlide = slideIndex;
        
        // Muovi il track
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Aggiorna i dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
            if (index === currentSlide) {
                dot.style.backgroundColor = '#2d5016';
            } else {
                dot.style.backgroundColor = '#d1d5db';
            }
        });
    }
    
    // Funzione per il prossimo slide
    function nextSlide() {
        updateSlider(currentSlide + 1);
    }
    
    // Funzione per il slide precedente
    function prevSlide() {
        updateSlider(currentSlide - 1);
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000); // Cambia slide ogni 4 secondi
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Event listeners per i dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            updateSlider(index);
            startAutoPlay();
        });
    });
    
    // Event listeners per la navigazione con il mouse
    slider.addEventListener('mousemove', (e) => {
        const rect = slider.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const sliderWidth = rect.width;
        
        // Dividi lo slider in zone per ogni slide
        const zoneWidth = sliderWidth / totalSlides;
        const targetSlide = Math.floor(mouseX / zoneWidth);
        
        if (targetSlide !== currentSlide && targetSlide >= 0 && targetSlide < totalSlides) {
            stopAutoPlay();
            updateSlider(targetSlide);
        }
    });
    
    // Riprendi auto-play quando il mouse esce dal slider
    slider.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
    
    // Supporto per touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        stopAutoPlay();
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
    }
    
    // Supporto per keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    });
    
    // Inizializza il primo slide
    updateSlider(0);
    
    // Avvia auto-play
    startAutoPlay();
    
    // Pause auto-play when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
}

// Inizializza il slider quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
    initTestimonialsSlider();
}); 