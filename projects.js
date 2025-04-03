function initProjects() {
    // Project Data
    const projects = [
        {
            title: "AI Image Generator",
            duration: "Jan 2025 - Current",
            description: "A revolutionary AI-powered image generation tool.",
            images: ["images/ai-image-gen.jpg", "images/couch.jpg", "images/aicouch.jpg"],
            link: "#",
        },
        {
            title: "CRT TV Instrument",
            duration: "Augus 2023 - Dec 2023",
            description: "A novel instrument that turns electron beams emitted from a CRT television into music.",
            images: ["images/guitarpose.jpg", "images/crtugg.jpg"],
            link: "#",
        },
        {
            title: "Guitar",
            duration: "Jun 2021 - Aug 2021",
            description: "A hand-made electric guitar.",
            images: ["images/finished.jpg", "images/blankslate.jpg", "images/finishedclose.jpg"],
            link: "#",
        },
    ];

    // Generate Project Timeline
    const timelineContainer = document.querySelector('.timeline');
    timelineContainer.innerHTML = ''; // Clear existing content

    projects.forEach((project, index) => {
        const timelineCard = document.createElement('div');
        timelineCard.className = 'timeline-card';
        timelineCard.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h3>${project.title}</h3>
                <p><strong>Duration:</strong> ${project.duration}</p>
                <p>${project.description.slice(0, 50)}...</p>
                <button class="view-details" data-index="${index}">View Details</button>
            </div>
        `;
        timelineContainer.appendChild(timelineCard);
    });

    // Generate Project Cards
    const cardList = document.querySelector('.card-list');
    cardList.innerHTML = ''; // Clear existing cards

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
                </div>
            </div>
        `;
        cardList.appendChild(cardItem);
    });

    // Modal Logic
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.close');

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

        const slidesContainer = modal.querySelector('.carousel-slides');
        const dotsContainer = modal.querySelector('.dot-container');
        let currentSlide = 0;

        slidesContainer.innerHTML = '';
        dotsContainer.innerHTML = '';

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

        const showSlide = (index) => {
            const slides = modal.querySelectorAll('.carousel-slide');
            const dots = modal.querySelectorAll('.dot');
            currentSlide = (index + slides.length) % slides.length;

            slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
        };

        modal.querySelector('.prev').addEventListener('click', () => showSlide(currentSlide - 1));
        modal.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));

        modal.style.display = 'block';
    }
}

// Initialize projects if we're on the projects page directly
if (document.getElementById('projects')) {
    initProjects();
}