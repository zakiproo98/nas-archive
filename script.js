/* ==========================================================================
   PROJECT DATA SYSTEM
   Easily add or remove objects below. The layout will scale automatically.
   ========================================================================== */
const projects = [
    {
        projectNumber: "PROJECT 001",
        title: "The Moroccan O",
        subtitle: "Tangier, Morocco",
        year: "2026",
        category: "Symbol",
        image: "assets/projects/project-01/image-01.jpg", 
        caption: "Tangier Study — Photography / 2026",
        description: "An initial exploration of structural light and shadow within urban environments."
    },
    {
        projectNumber: "PROJECT 002",
        title: "Spatial Analysis",
        subtitle: "Architecture / Editorial",
        year: "2026",
        category: "Architecture",
        image: "assets/projects/project-02/image-01.jpg", 
        caption: "Spatial Depth — Architecture / 2026",
        description: "Mapping negative space and human interaction in high-density areas."
    },
    {
        projectNumber: "PROJECT 003",
        title: "Archival Interface",
        subtitle: "Photography",
        year: "Apr 5, 2026",
        category: "Digital",
        image: "assets/projects/project-03/image-01.jpg", 
        caption: "3024 x 3024, 1/2801 secondes",
        description: " Designing a modular storage system for digital assets and typographies."
    }
];

/* ==========================================================================
   DOM ELEMENTS & INITIALIZATION
   ========================================================================== */
const contentContainer = document.getElementById('content-container');
const profileSection = document.getElementById('profile-section');

// Theme Toggle Button
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

// Corner Labels
const labelTR = document.getElementById('label-tr');
const labelBL = document.getElementById('label-bl');
const labelBR = document.getElementById('label-br');

/* ==========================================================================
   THEME TOGGLE LOGIC (DARK / LIGHT MODE)
   ========================================================================== */
// Check localStorage for saved theme on load
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.innerText = 'THEME: DARK';
} else {
    themeBtn.innerText = 'THEME: LIGHT';
}

// Toggle on click
themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeBtn.innerText = 'THEME: DARK';
    } else {
        localStorage.setItem('theme', 'light');
        themeBtn.innerText = 'THEME: LIGHT';
    }
});

/* ==========================================================================
   PROJECT HTML GENERATION
   ========================================================================== */
projects.forEach((proj, index) => {
    const section = document.createElement('section');
    section.classList.add('project-section', 'observe-section');
    section.setAttribute('data-index', index);

    section.innerHTML = `
        <div class="image-wrapper">
            <img src="${proj.image}" alt="${proj.title}">
        </div>
        <div class="metadata-container">
            <p class="metadata-caption">${proj.caption}</p>
            <h3 class="metadata-title">${proj.title}</h3>
            <p class="metadata-caption">${proj.subtitle}</p>
            ${proj.description ? `<p class="metadata-desc">${proj.description}</p>` : ''}
        </div>
    `;

    // Insert into DOM right before the static profile section
    contentContainer.insertBefore(section, profileSection);
});

/* ==========================================================================
   SCROLL OBSERVER & DYNAMIC LABELS
   ========================================================================== */
const observerOptions = {
    root: contentContainer,
    rootMargin: "0px",
    threshold: 0.5 // Triggers when 50% of a section is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            
            if (entry.target.hasAttribute('data-index')) {
                const currentIndex = parseInt(entry.target.getAttribute('data-index'));

                // Set Top Right (Current Project)
                labelTR.innerText = projects[currentIndex].projectNumber;

                // Set Bottom Left (Previous Project)
                if (currentIndex > 0) {
                    labelBL.innerText = projects[currentIndex - 1].projectNumber;
                } else {
                    labelBL.innerText = ""; 
                }

                // Set Bottom Right (Next Project)
                if (currentIndex < projects.length - 1) {
                    labelBR.innerText = projects[currentIndex + 1].projectNumber;
                } else {
                    labelBR.innerText = "PROFILE"; // Cue the profile section
                }

            } else if (entry.target.id === 'profile-section') {
                // User is viewing the Profile Section
                // Empty the top-right label entirely per request
                labelTR.innerText = ""; 
                labelBL.innerText = projects[projects.length - 1].projectNumber;
                labelBR.innerText = "";
            }
        }
    });
}, observerOptions);

// Initialize observer on all sections
document.querySelectorAll('.observe-section').forEach(section => {
    observer.observe(section);
});
