// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Hero slider functionality
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
let previousSlide = heroSlides.length - 1;
let isAnimating = false;
let sliderInterval;
const slideInterval = 12000; // Change slide every 12 seconds
const progressBar = document.querySelector('.hero-progress-bar');

function showSlide(index) {
    if (isAnimating) return;
    isAnimating = true;
    
    previousSlide = currentSlide;
    currentSlide = index;
    
    heroSlides.forEach(slide => {
        slide.classList.remove('active', 'previous');
    });
    
    heroSlides[previousSlide].classList.add('previous');
    heroSlides[currentSlide].classList.add('active');

    // Reset and start progress bar animation
    progressBar.classList.remove('active');
    void progressBar.offsetWidth; // Force reflow
    progressBar.classList.add('active');
    
    // Reset animation flag after transition
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % heroSlides.length;
    showSlide(nextIndex);
}

// Initialize the slider
showSlide(0);
sliderInterval = setInterval(nextSlide, slideInterval);

// Image Modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
let originalBodyStyle;

function lockScroll() {
    originalBodyStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
}

function unlockScroll() {
    if (originalBodyStyle) {
        document.body.style.overflow = originalBodyStyle;
    }
}

function closeModal() {
    modal.classList.remove('active');
    unlockScroll();
}

// Add click event to all gallery images (excluding logo and hero)
document.querySelectorAll('.scroll-item img').forEach(img => {
    img.addEventListener('click', function(e) {
        e.preventDefault();
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        modal.classList.add('active');
        lockScroll();
    });
});

// Close modal when clicking anywhere including the image
modal.addEventListener('click', closeModal);
modalImg.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent double firing of event
    closeModal();
});

// Handle touch events
modal.addEventListener('touchend', function(e) {
    if (modal.classList.contains('active')) {
        e.preventDefault();
        closeModal();
    }
});

modalImg.addEventListener('touchend', function(e) {
    if (modal.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation(); // Prevent double firing of event
        closeModal();
    }
});

// Prevent scrolling when modal is open
modal.addEventListener('touchmove', function(e) {
    if (modal.classList.contains('active')) {
        e.preventDefault();
    }
}, { passive: false });

// Handle escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Cleanup interval on page unload or visibility change
window.addEventListener('unload', () => {
    if (sliderInterval) {
        clearInterval(sliderInterval);
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden && sliderInterval) {
        clearInterval(sliderInterval);
    } else if (!document.hidden && !sliderInterval) {
        sliderInterval = setInterval(nextSlide, slideInterval);
    }
});

// Translations
const translations = {
    en: {
        meta: {
            title: "DH Woodworking Inc. | Custom Woodworking & Cabinetry",
            description: "Custom woodworking, cabinetry, and furniture solutions by DH Woodworking Inc. Serving with exceptional craftsmanship."
        },
        brand: {
            subtitle: "Fine Cabinetry"
        },
        testimonials: {
            quote1: "\"Wolfram transformed our Edmonton home with custom built-ins that perfectly blend functionality with timeless elegance - his attention to detail is simply extraordinary.\"",
            author1: "— Sarah McKenzie, Edmonton, AB",
            quote2: "\"The custom dining table Wolfram crafted for our Vancouver restaurant has become the centerpiece of our space, showcasing exceptional craftsmanship that our patrons admire daily.\"",
            author2: "— Michael Chen, Vancouver, BC",
            quote3: "\"His restoration work on our heritage home's original woodwork in Victoria was nothing short of masterful - he brought century-old details back to life while preserving their historical integrity.\"",
            author3: "— Elizabeth Thompson, Victoria, BC"
        },
        footer: {
            copyright: "© 2025 DH Woodworking Inc. All rights reserved."
        },
        nav: {
            residential: "Residential",
            commercial: "Commercial",
            custom: "Custom",
            craftsmanship: "Craftsmanship",
            about: "About",
            contact: "Contact"
        },
        hero: {
            residential: {
                category: "Residential Spaces",
                desc: "Transform your home with custom cabinetry and built-in solutions"
            },
            commercial: {
                category: "Commercial Projects",
                desc: "Elevating commercial spaces with exceptional craftsmanship"
            },
            furniture: {
                category: "Custom Furniture",
                desc: "Handcrafted pieces that combine beauty and functionality"
            },
            craftsmanship: {
                category: "Fine Craftsmanship",
                desc: "Meticulous attention to detail in every project"
            }
        },
        cta: "Start Your Project",
        sections: {
            residential: "Residential Spaces",
            commercial: "Commercial Projects",
            furniture: "Custom Furniture",
            craftsmanship: "Craftsmanship",
            kitchens: "Custom Kitchens & Cabinetry",
            storage: "Built-in Storage & Shelving Solutions",
            closets: "Walk-in Closets & Organization",
            commercial_interiors: "Modern Commercial Interiors",
            restaurant: "Restaurant & Hospitality",
            traditional: "Traditional & Period Pieces",
            modern: "Modern & Contemporary",
            restoration: "Historical Restoration",
            joinery: "Fine Details & Joinery",
            design_process: "Custom Design Process",
            materials: "Materials & Finishes",
            testimonials: "Client Testimonials",
            contact: "Contact Us"
        },
        about: {
            title: "About the Master Craftsman",
            p1: "Wolfram Seidel, a distinguished Tischlermeister (Master Carpenter) from Bavaria, Germany, brings over three decades of exceptional woodworking expertise to Canada. After completing his rigorous apprenticeship and earning his master craftsman certification in the renowned woodworking region of Oberammergau, Wolfram has dedicated his life to perfecting the art of fine woodworking.",
            p2: "His masterful approach combines time-honored German woodworking traditions with contemporary design sensibilities. Specializing in custom cabinetry, fine furniture, and architectural woodwork, Wolfram's work is characterized by impeccable attention to detail, traditional joinery techniques, and an unwavering commitment to quality.",
            p3: "Each project undertaken by Wolfram reflects his deep understanding of wood as a living material, carefully selecting premium hardwoods and employing traditional finishing techniques to ensure lasting beauty and durability. His expertise extends from intricate hand carving to precision machine work, allowing him to tackle projects of any scale while maintaining the highest standards of craftsmanship."
        }
    },
    de: {
        meta: {
            title: "DH Woodworking Inc. | Maßgefertigte Holzarbeiten & Schreinerei",
            description: "Maßgefertigte Holzarbeiten, Schreinerarbeiten und Möbellösungen von DH Woodworking Inc. Mit außergewöhnlicher Handwerkskunst."
        },
        brand: {
            subtitle: "Feine Schreinerei"
        },
        testimonials: {
            quote1: "\"Wolfram hat unser Haus in Edmonton mit maßgefertigten Einbauten verwandelt, die Funktionalität und zeitlose Eleganz perfekt vereinen - seine Liebe zum Detail ist einfach außergewöhnlich.\"",
            author1: "— Sarah McKenzie, Edmonton, AB",
            quote2: "\"Der maßgefertigte Esstisch, den Wolfram für unser Restaurant in Vancouver hergestellt hat, ist zum Mittelpunkt unseres Raums geworden und zeigt eine außergewöhnliche Handwerkskunst, die unsere Gäste täglich bewundern.\"",
            author2: "— Michael Chen, Vancouver, BC",
            quote3: "\"Seine Restaurierungsarbeiten an den originalen Holzarbeiten unseres historischen Hauses in Victoria waren einfach meisterhaft - er hat jahrhundertealte Details wieder zum Leben erweckt und dabei ihre historische Integrität bewahrt.\"",
            author3: "— Elizabeth Thompson, Victoria, BC"
        },
        footer: {
            copyright: "© 2025 DH Woodworking Inc. Alle Rechte vorbehalten."
        },
        nav: {
            residential: "Wohnbereich",
            commercial: "Gewerbe",
            custom: "Maßanfertigung",
            craftsmanship: "Handwerkskunst",
            about: "Über uns",
            contact: "Kontakt"
        },
        hero: {
            residential: {
                category: "Wohnräume",
                desc: "Verwandeln Sie Ihr Zuhause mit maßgefertigten Schränken und Einbaulösungen"
            },
            commercial: {
                category: "Gewerbeprojekte",
                desc: "Aufwertung gewerblicher Räume durch außergewöhnliche Handwerkskunst"
            },
            furniture: {
                category: "Maßgefertigte Möbel",
                desc: "Handgefertigte Stücke, die Schönheit und Funktionalität vereinen"
            },
            craftsmanship: {
                category: "Feine Handwerkskunst",
                desc: "Sorgfältige Liebe zum Detail in jedem Projekt"
            }
        },
        cta: "Projekt Starten",
        sections: {
            residential: "Wohnräume",
            commercial: "Gewerbeprojekte",
            furniture: "Maßgefertigte Möbel",
            craftsmanship: "Handwerkskunst",
            kitchens: "Maßgefertigte Küchen & Schränke",
            storage: "Einbauregale & Aufbewahrungslösungen",
            closets: "Ankleidezimmer & Organisation",
            commercial_interiors: "Moderne Geschäftsräume",
            restaurant: "Gastronomie & Hotellerie",
            traditional: "Traditionelle & Historische Stücke",
            modern: "Modern & Zeitgenössisch",
            restoration: "Historische Restaurierung",
            joinery: "Feine Details & Holzverbindungen",
            design_process: "Maßgeschneiderter Designprozess",
            materials: "Materialien & Oberflächen",
            testimonials: "Kundenstimmen",
            contact: "Kontakt"
        },
        about: {
            title: "Über den Meister",
            p1: "Wolfram Seidel, ein angesehener Tischlermeister aus Bayern, Deutschland, bringt über drei Jahrzehnte außergewöhnliche Expertise im Holzhandwerk nach Kanada. Nach Abschluss seiner anspruchsvollen Ausbildung und dem Erwerb seines Meisterbriefs in der renommierten Holzhandwerksregion Oberammergau hat Wolfram sein Leben der Perfektionierung der feinen Holzbearbeitung gewidmet.",
            p2: "Sein meisterhafter Ansatz verbindet traditionelle deutsche Holzbearbeitungstraditionen mit zeitgenössischem Design. Spezialisiert auf maßgefertigte Schränke, edle Möbel und architektonische Holzarbeiten, zeichnet sich Wolframs Arbeit durch perfekte Liebe zum Detail, traditionelle Verbindungstechniken und kompromisslose Qualität aus.",
            p3: "Jedes von Wolfram durchgeführte Projekt spiegelt sein tiefes Verständnis von Holz als lebendigem Material wider. Er wählt sorgfältig Premium-Harthölzer aus und verwendet traditionelle Veredelungstechniken, um dauerhafte Schönheit und Langlebigkeit zu gewährleisten. Seine Expertise reicht von aufwendiger Handschnitzerei bis hin zu Präzisionsmaschinenarbeit, wodurch er Projekte jeder Größenordnung unter Einhaltung höchster handwerklicher Standards ausführen kann."
        }
    }
};

// Language switching functionality
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = 'en';

function updateContent(lang) {
    // Update document language
    document.documentElement.lang = lang;

    // Update meta tags
    document.title = translations[lang].meta.title;
    document.querySelector('meta[name="description"]').setAttribute('content', translations[lang].meta.description);

    // Update active button state
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.dataset.i18n.split('.');
        let value = translations[lang];
        for (const key of keys) {
            value = value[key];
        }
        if (value) {
            if (element.tagName.toLowerCase() === 'meta') {
                element.setAttribute('content', value);
            } else {
                element.textContent = value;
            }
        }
    });

    // Update hero content
    document.querySelectorAll('.hero-slide').forEach((slide, index) => {
        const sections = ['residential', 'commercial', 'furniture', 'craftsmanship'];
        const section = sections[index];
        
        const categoryEl = slide.querySelector('.category');
        const descEl = slide.querySelector('p:not(.category)');
        
        if (categoryEl && translations[lang].hero[section]) {
            categoryEl.textContent = translations[lang].hero[section].category;
        }
        if (descEl && translations[lang].hero[section]) {
            descEl.textContent = translations[lang].hero[section].desc;
        }
    });

    // Update CTA button
    document.querySelector('.cta-button').textContent = translations[lang].cta;

    // Update section titles
    document.querySelectorAll('section[id]').forEach(section => {
        const titleEl = section.querySelector('.section-title');
        if (titleEl && translations[lang].sections[section.id]) {
            titleEl.textContent = translations[lang].sections[section.id];
        }
    });

    // Update about section
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        const paragraphs = aboutContent.querySelectorAll('p');
        paragraphs[0].textContent = translations[lang].about.p1;
        paragraphs[1].textContent = translations[lang].about.p2;
        paragraphs[2].textContent = translations[lang].about.p3;
    }

    currentLang = lang;
}

// Add click handlers to language buttons
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const newLang = btn.dataset.lang;
        if (newLang !== currentLang) {
            updateContent(newLang);
        }
    });
});

// Set initial active state
document.querySelector(`[data-lang="en"]`).classList.add('active'); 