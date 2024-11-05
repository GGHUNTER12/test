// loadingScreen.js

// Function to show the loading screen
function showLoadingScreen() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-screen';
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '0';
    loadingDiv.style.left = '0';
    loadingDiv.style.width = '100%';
    loadingDiv.style.height = '100%';
    loadingDiv.style.background = 'rgba(0, 0, 0, 0.8)';
    loadingDiv.style.color = 'white';
    loadingDiv.style.display = 'flex';
    loadingDiv.style.flexDirection = 'column';
    loadingDiv.style.alignItems = 'center';
    loadingDiv.style.justifyContent = 'center';
    loadingDiv.style.zIndex = '9999';
    loadingDiv.style.fontSize = '24px';
    loadingDiv.style.fontFamily = 'Arial, sans-serif';
    loadingDiv.innerHTML = `
        <div style="animation: spin 1s linear infinite;">
            <img src="https://i.imgur.com/zZQo6Tk.gif" alt="Loading" style="width: 100px; height: auto;">
        </div>
        <p>Loading...</p>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(loadingDiv);

    // Hide loading screen after 5 seconds
    setTimeout(() => {
        loadingDiv.style.opacity = '0';
        setTimeout(() => loadingDiv.remove(), 500); // Remove it from the DOM after fade out
    }, 5000);
}

// Function to load new iframe with loading screen
function loadIframe(src) {
    showLoadingScreen();
    const iframe = document.querySelector('iframe');
    iframe.src = src; // Set new src for iframe
}

// Override the existing iframe loading methods
function overrideIframeLoad() {
    const originalLoadIframe = window.loadIframe;
    window.loadIframe = function (src) {
        showLoadingScreen(); // Show loading screen
        const iframe = document.querySelector('iframe');
        iframe.src = src; // Set new src for iframe
    };
}

// Call override on script load
overrideIframeLoad();
