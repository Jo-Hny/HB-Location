/**
 * HB Location - Script principal
 * Gère les fonctionnalités interactives du site :
 * - Formulaire de réservation
 * - Formulaire de contact
 * - Animations
 * - Navigation du catalogue
 */

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // 1. INITIALISATION DES FORMULAIRES
    // =============================================
    
    // Formulaire de réservation
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
        
        // Ecouteur pour le calcul dynamique du prix
        reservationForm.addEventListener('change', function(e) {
            if (e.target.id === 'vehicule' || e.target.id === 'date-debut' || e.target.id === 'date-fin') {
                updatePriceDisplay();
            }
        });
    }

    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // =============================================
    // 2. INITIALISATION DES ANIMATIONS
    // =============================================
    initAnimations();
    
    // =============================================
    // 3. INITIALISATION DES CATÉGORIES CATALOGUE
    // =============================================
    initCategoryButtons();
});

// =============================================
// FONCTIONS DU FORMULAIRE DE RÉSERVATION
// =============================================

/**
 * Gère la soumission du formulaire de réservation
 * @param {Event} e - L'événement de soumission
 */
function handleReservationSubmit(e) {
    e.preventDefault();
    clearErrors();
    
    // Récupération des valeurs
    const formElements = e.target.elements;
    const dateDebut = formElements['date-debut'].value;
    const dateFin = formElements['date-fin'].value;
    const vehiculeSelect = formElements['vehicule'];
    const lieuRetraitSelect = formElements['lieu-retrait'];
    const telephone = formElements['telephone'].value;
    const email = formElements['email'].value;

    // Validation des champs obligatoires
    let isValid = true;
    
    if (!dateDebut) {
        showError('Date de début requise', 'date-debut');
        isValid = false;
    }
    
    if (!dateFin) {
        showError('Date de fin requise', 'date-fin');
        isValid = false;
    }
    
    if (!vehiculeSelect.value) {
        showError('Véhicule requis', 'vehicule');
        isValid = false;
    }
    
    if (!lieuRetraitSelect.value) {
        showError('Lieu de retrait requis', 'lieu-retrait');
        isValid = false;
    }
    
    if (!telephone) {
        showError('Téléphone requis', 'telephone');
        isValid = false;
    } else if (!/^[0-9]{9,15}$/.test(telephone)) {
        showError('Numéro invalide (9-15 chiffres)', 'telephone');
        isValid = false;
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('Format email invalide', 'email');
        isValid = false;
    }
    
    if (!isValid) return;

    // Calcul du prix et préparation des données
    const priceInfo = calculatePrice();
    const vehiculeText = vehiculeSelect.options[vehiculeSelect.selectedIndex].text.split(' - ')[0];
    const lieuRetraitText = lieuRetraitSelect.options[lieuRetraitSelect.selectedIndex].text;
    const indicatif = formElements['indicatif'].value;
    const telComplet = `${indicatif}${telephone}`;

    // Message de confirmation
    const confirmationMessage = `
        Réservation confirmée !
        --------------------------
        Véhicule: ${vehiculeText}
        Point de retrait: ${lieuRetraitText}
        Période: ${formatDate(dateDebut)} au ${formatDate(dateFin)}
        Durée: ${priceInfo.totalDays} jours
        Prix total: ${priceInfo.totalPrice}
        Téléphone: ${telComplet}
        ${email ? `Email: ${email}` : ''}
        
        Nous vous contacterons pour confirmation.
    `;
    
    e.target.submit()
    alert(confirmationMessage);
    
    // Réinitialisation optionnelle
    // e.target.reset();
}

/**
 * Calcule le prix total de la réservation
 * @returns {Object} Infos de prix
 */
function calculatePrice() {
    const vehiculeSelect = document.getElementById('vehicule');
    const selectedOption = vehiculeSelect.options[vehiculeSelect.selectedIndex];
    const priceText = selectedOption.value.match(/[\d,]+ DA/)[0];
    const pricePerDay = parseInt(priceText.replace(/\D/g, ''));
    
    const dateDebut = new Date(document.getElementById('date-debut').value);
    const dateFin = new Date(document.getElementById('date-fin').value);
    
    // Calcul du nombre de jours
    const diffTime = Math.abs(dateFin - dateDebut);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    
    return {
        pricePerDay: priceText,
        totalDays: diffDays,
        totalPrice: (pricePerDay * diffDays).toLocaleString() + ' DA'
    };
}

/**
 * Met à jour l'affichage du prix
 */
function updatePriceDisplay() {
    const priceDisplay = document.getElementById('price-display');
    if (!priceDisplay) return;
    
    const priceInfo = calculatePrice();
    priceDisplay.textContent = `Total estimé : ${priceInfo.totalPrice} (${priceInfo.totalDays} jours)`;
}

// =============================================
// FONCTIONS DU FORMULAIRE DE CONTACT
// =============================================

function handleContactSubmit(e) {
    e.preventDefault();
    clearErrors();
    
    // Récupération des valeurs
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const sujet = document.getElementById('sujet').value;
    const message = document.getElementById('message').value;
    
    // Validation
    let isValid = true;
    
    if (!nom) {
        showError('Nom requis', 'nom');
        isValid = false;
    }
    
    if (!email) {
        showError('Email requis', 'email');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('Format email invalide', 'email');
        isValid = false;
    }
    
    if (!sujet) {
        showError('Sujet requis', 'sujet');
        isValid = false;
    }
    
    if (!message) {
        showError('Message requis', 'message');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Simulation d'envoi
    alert('Message envoyé! Nous vous répondrons dès que possible.');
    e.target.reset();
}

// =============================================
// FONCTIONS D'ANIMATION
// =============================================

function initAnimations() {
    // Configuration initiale des éléments animés
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
    animateOnScroll(); // Animation initiale
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.vehicule-card, .contact-info, .reservation-form');
    const screenPosition = window.innerHeight / 1.3;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// =============================================
// FONCTIONS UTILITAIRES
// =============================================

/**
 * Affiche un message d'erreur
 * @param {string} message - Le message d'erreur
 * @param {string} elementId - L'ID de l'élément associé
 */
function showError(message, elementId = null) {
    if (elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        element.classList.add('error');
        
        // Crée le message d'erreur s'il n'existe pas déjà
        if (!element.nextElementSibling || !element.nextElementSibling.classList.contains('error-message')) {
            element.insertAdjacentHTML('afterend', `<div class="error-message">${message}</div>`);
        }
    } else {
        alert(message);
    }
}

/**
 * Efface tous les messages d'erreur
 */
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

/**
 * Formate une date au format JJ/MM/AAAA
 * @param {string} dateString - La date à formater
 * @returns {string} Date formatée
 */
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
}
