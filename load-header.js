async function loadHeader() {
    try {
        // Load header HTML first
        const response = await fetch('/header.html');
        const html = await response.text();
        
        // Extract the HTML content
        const htmlMatch = html.match(/<div class="header">([\s\S]*?)<\/div>/);
        const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
        
        // Add header HTML to body
        if (htmlMatch) {
            document.body.insertAdjacentHTML('afterbegin', htmlMatch[0]);
        }

        // Load CSS after HTML is in place
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '/header.css';
        
        // Wait for CSS to load
        await new Promise((resolve) => {
            cssLink.onload = resolve;
            document.head.appendChild(cssLink);
        });
        
        // Execute the script after CSS is loaded
        if (scriptMatch) {
            const scriptContent = scriptMatch[1];
            const scriptElement = document.createElement('script');
            scriptElement.textContent = scriptContent;
            document.body.appendChild(scriptElement);
        }

        // Set active nav link based on current page
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Load header when the page loads
document.addEventListener('DOMContentLoaded', loadHeader); 