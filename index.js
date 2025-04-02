// index.js
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    const hideAllContent = () => {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
    };

    const showContent = (id) => {
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    };

    // Modified loadContent function to handle scripts
    const loadContent = async (id, filePath) => {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Failed to load ${filePath}: ${response.status}`);
            const html = await response.text();
            const targetSection = document.getElementById(id);
            
            if (targetSection) {
                // Clear previous content and scripts
                targetSection.innerHTML = html;
                
                // Load scripts dynamically
                const scripts = targetSection.querySelectorAll('script');
                scripts.forEach(oldScript => {
                    const newScript = document.createElement('script');
                    if (oldScript.src) {
                        newScript.src = oldScript.src;
                    } else {
                        newScript.textContent = oldScript.textContent;
                    }
                    document.body.appendChild(newScript);
                });
            }
        } catch (error) {
            console.error('Error loading content:', error);
            const targetSection = document.getElementById(id);
            if (targetSection) {
                targetSection.innerHTML = `<p>Error loading content for ${id}.</p>`;
            }
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            hideAllContent();
            showContent(targetId);

            if (targetId === 'home') {
                loadContent('home', 'home.html');
            } else if (targetId === 'projects') {
                loadContent('projects', 'projects.html')
                    .then(() => {
                        // Initialize projects functionality after loading
                        if (window.initProjects) initProjects();
                    });
            } else if (targetId === 'skills') {
                loadContent('skills', 'skills.html');
            } else if (targetId === 'contact') {
                loadContent('contact', 'contact.html');
            }
        });
    });

    loadContent("home", 'home.html');
});