let debugClicks = 0; // Initialize click count for debug mode
const maxClicks = 5; // Max clicks required to enable debug mode
let debugMode = false; // Flag for debug mode

// Function to show FPS and CPU usage
function showDebugInfo() {
    const debugInfo = document.createElement('div');
    debugInfo.style.position = 'fixed';
    debugInfo.style.top = '10px';
    debugInfo.style.left = '10px';
    debugInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    debugInfo.style.color = 'white';
    debugInfo.style.padding = '10px';
    debugInfo.style.borderRadius = '5px';
    debugInfo.style.zIndex = '1000';
    document.body.appendChild(debugInfo);

    const updateDebugInfo = () => {
        // Get FPS and CPU usage
        const fps = Math.floor(Math.random() * 60) + 1; // Simulated FPS value
        const cpuUsage = Math.floor(Math.random() * 100); // Simulated CPU usage
        debugInfo.innerHTML = `FPS: ${fps} | CPU Usage: ${cpuUsage}%`;

        // Repeat the update every second
        setTimeout(updateDebugInfo, 1000);
    };

    updateDebugInfo();
}

// Function to handle click events
document.body.addEventListener('click', (event) => {
    const rect = document.body.getBoundingClientRect();
    // Check if the click is within the bottom left corner
    if (event.clientX < rect.width / 4 && event.clientY > rect.height * 0.75) {
        debugClicks++;
        if (debugClicks >= maxClicks) {
            debugMode = true;
            showDebugInfo();
            alert('Debug mode enabled!');
        }
    }
});

// Prevent F12 and other key combinations
document.onkeydown = (e) => {
    if (e.key == 123) e.preventDefault(); // Prevent F12
    if (e.ctrlKey && e.shiftKey && e.key == 'I') e.preventDefault(); // Prevent Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.key == 'C') e.preventDefault(); // Prevent Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && e.key == 'J') e.preventDefault(); // Prevent Ctrl+Shift+J
    if (e.ctrlKey && e.key == 'U') e.preventDefault(); // Prevent Ctrl+U
};
