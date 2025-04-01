// index.js
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
  
    // Function to hide all content sections
    const hideAllContent = () => {
      contentSections.forEach(section => {
        section.classList.remove('active');
      });
    };
  
    // Function to show the content section corresponding to the clicked link
    const showContent = (id) => {
      const targetSection = document.getElementById(id);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    };
  
    // Function to load content from an external HTML file
    const loadContent = async (id, filePath) => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load ${filePath}: ${response.status}`);
        }
        const html = await response.text();
        const targetSection = document.getElementById(id);
        if (targetSection) {
          targetSection.innerHTML = html; // Insert the loaded HTML
        }
      } catch (error) {
        console.error('Error loading content:', error);
        const targetSection = document.getElementById(id);
        if (targetSection) {
           targetSection.innerHTML = `<p>Error loading content for ${id}.</p>`;
        }
      }
    };
  
    // Add click event listeners to the navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior (page jump)
  
        const targetId = link.getAttribute('href').substring(1); // Extract id from href (#home -> home)
  
        hideAllContent(); // Hide all content sections
        showContent(targetId); // Show the corresponding content section
  
        // Load external content if needed
        if (targetId === 'home') {
            loadContent('home', 'home.html'); // Load home.html into the home section
        } else if (targetId === 'projects') {
            loadContent('projects', 'projects.html'); // Load projects.html into the projects section
        } else if (targetId === 'skills') {
            loadContent('skills', 'skills.html');
        } else if (targetId === 'contact') {
            loadContent('contact', 'contact.html');
        }
      });
    });
    loadContent("home",'home.html'); // initializes with home selected on reload
  });