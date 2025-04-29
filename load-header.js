async function loadHeader() {
    try {
        const response = await fetch('/header.html');
        const html = await response.text();
        
        // Extract the style and script content
        const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
        const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
        const htmlMatch = html.match(/<div class="header">([\s\S]*?)<\/div>/);
        
        // Add styles to head
        if (styleMatch) {
            const styleElement = document.createElement('style');
            styleElement.textContent = styleMatch[1];
            document.head.appendChild(styleElement);
        }
        
        // Add header HTML to body
        if (htmlMatch) {
            document.body.insertAdjacentHTML('afterbegin', htmlMatch[0]);
        }
        
        // Execute the script
        if (scriptMatch) {
            const scriptContent = scriptMatch[1];
            const scriptElement = document.createElement('script');
            scriptElement.textContent = scriptContent;
            document.body.appendChild(scriptElement);
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Load header when the page loads
document.addEventListener('DOMContentLoaded', loadHeader); 