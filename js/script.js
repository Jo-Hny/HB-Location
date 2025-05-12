document.addEventListener('DOMContentLoaded', function() {
    // gestion du formulaire de réservation
reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupération des valeurs existantes
    const dateDebut = document.getElementById('date-debut').value;
    const dateFin = document.getElementById('date-fin').value;
    const vehiculeSelect = document.getElementById('vehicule');
    const lieuRetraitSelect = document.getElementById('lieu-retrait');
    const indicatif = document.getElementById('indicatif').value;
    const telephone = document.getElementById('telephone').value;
    const email = document.getElementById('email').value;

    // Validation
    if (!dateDebut || !dateFin || !vehiculeSelect.value || !lieuRetraitSelect.value || !telephone) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }

    // Validation du téléphone
    if (!/^[0-9]{9,15}$/.test(telephone)) {
        alert('Numéro de téléphone invalide (9 à 15 chiffres)');
        return;
    }

    // Validation optionnelle de l'email
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Format d\'email invalide');
        return;
    }

    const vehiculeText = vehiculeSelect.options[vehiculeSelect.selectedIndex].text;
    const lieuRetraitText = lieuRetraitSelect.options[lieuRetraitSelect.selectedIndex].text;
    const telComplet = `${indicatif}${telephone}`;

    // Message de confirmation
    const confirmationMessage = `
        Réservation confirmée !
        --------------------------
        Véhicule: ${vehiculeText}
        Point de retrait: ${lieuRetraitText}
        Période: du ${new Date(dateDebut).toLocaleDateString()} au ${new Date(dateFin).toLocaleDateString()}
        Téléphone: ${telComplet}
        ${email ? `Email: ${email}` : ''}
        
        Nous vous contacterons pour confirmation.
    `;
    
    alert(confirmationMessage);
    
    // Log pour débogage
    console.log('Réservation:', { 
        vehicule: vehiculeSelect.value, 
        lieuRetrait: lieuRetraitSelect.value, 
        dateDebut, 
        dateFin,
        telephone: telComplet,
        email
    });
    
    // Réinitialisation optionnelle du formulaire
    // reservationForm.reset();
});

    // [Le reste de votre code existant pour les autres fonctionnalités...]
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs
            const nom = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const sujet = document.getElementById('sujet').value;
            const message = document.getElementById('message').value;
            
            // Validation simple
            if (!nom || !email || !sujet || !message) {
                alert('Veuillez remplir tous les champs');
                return;
            }
            
            if (!email.includes('@')) {
                alert('Veuillez entrer une adresse email valide');
                return;
            }
            
            // Simulation d'envoi
            alert('Message envoyé! Nous vous répondrons dès que possible.');
            
            // Ici, vous pourriez ajouter une requête AJAX vers votre backend
            console.log('Contact:', { nom, email, sujet, message });
            
            // Réinitialisation du formulaire
            contactForm.reset();
        });
    }
    
    // Animation au scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.vehicule-card, .contact-info, .reservation-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Ajout d'effets initiaux
    const cards = document.querySelectorAll('.vehicule-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.style.opacity = '0';
        contactInfo.style.transform = 'translateY(20px)';
        contactInfo.style.transition = 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s';
    }
    
    const reservationFormElement = document.querySelector('.reservation-form');
    if (reservationFormElement) {
        reservationFormElement.style.opacity = '0';
        reservationFormElement.style.transform = 'translateY(20px)';
        reservationFormElement.style.transition = 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s';
    }
    
    // Écouteur d'événement pour le scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Animation initiale
    animateOnScroll();
    
    // Gestion des catégories dans le catalogue
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});