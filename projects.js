// projects.js
function initProjects() {
    // Project Data
    const projects = [
        {
            title: "AI Image Generator",
            description: "A revolutionary AI-powered image generation tool",
            images: ["images/ai-image-gen.jpg", "images/couch.jpg", "images/aicouch.jpg"],
            link: "#"
        },
        {
            title: "CRT TV Instrument",
            description: "A novel instrument that turns electron beams emitted from a CRT television into music",
            images: ["images/guitarpose.jpg", "images/crtugg.jpg"],
            link: "#"
        },
        {
            title: "Guitar",
            description: "A hand made electric guitar",
            images: ["images/finished.jpg", "images/blankslate.jpg", "images/finishedclose.jpg"],
            link: "#"
        }
        // Add more projects as needed
    ];

    // Generate Project Cards
    const cardList = document.querySelector('.card-list');
    
    // Clear existing cards if any
    cardList.innerHTML = '';
    
    projects.forEach((project, index) => {
        const cardItem = document.createElement('li');
        cardItem.className = 'card-item';
        cardItem.innerHTML = `
            <div class="card">
                <img src="${project.images[0]}" alt="${project.title}">
                <div class="container">
                    <h4><b>${project.title}</b></h4>
                    <p>${project.description.slice(0, 80)}...</p>
                    <button class="view-details" data-index="${index}">View Details</button>
                    <a href="${project.link}" class="visit-project" target="_blank">Visit Project</a>
                </div>
            </div>
        `;
        cardList.appendChild(cardItem);
    });

    // Modal Logic
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.close');

    // Delegate events for dynamically created buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details')) {
            const index = e.target.dataset.index;
            openModal(projects[index]);
        }
    });

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    function openModal(project) {
        modal.querySelector('.modal-project-title').textContent = project.title;
        modal.querySelector('.modal-project-description').textContent = project.description;
        
        // Carousel Setup
        const slidesContainer = modal.querySelector('.carousel-slides');
        const dotsContainer = modal.querySelector('.dot-container');
        let currentSlide = 0;

        // Clear existing content
        slidesContainer.innerHTML = '';
        dotsContainer.innerHTML = '';

        // Create slides and dots
        project.images.forEach((img, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `<img src="${img}" alt="${project.title} Image ${index + 1}">`;
            slidesContainer.appendChild(slide);

            const dot = document.createElement('span');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
        });

        // Navigation handlers
        const showSlide = (index) => {
            const slides = modal.querySelectorAll('.carousel-slide');
            const dots = modal.querySelectorAll('.dot');
            currentSlide = (index + slides.length) % slides.length;
            
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        };

        // Add navigation event listeners
        modal.querySelector('.prev').addEventListener('click', () => showSlide(currentSlide - 1));
        modal.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));

        modal.style.display = 'block';
    }
}

// Initialize projects if we're on the projects page directly
if (document.getElementById('projects')) {
    initProjects();
}