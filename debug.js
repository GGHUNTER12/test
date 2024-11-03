let debugClicks = 0; // Count clicks for debug mode
let debugMode = false; // Flag to check if debug mode is active

// Function to toggle debug mode
function toggleDebugMode() {
    debugMode = !debugMode;
    const debugInfo = document.getElementById('debugInfo');
    if (debugMode) {
        debugInfo.style.display = 'block'; // Show debug info
    } else {
        debugInfo.style.display = 'none'; // Hide debug info
    }
}

// Function to update FPS and CPU usage
function updateDebugInfo() {
    if (debugMode) {
        const fps = Math.round(1000 / (performance.now() - (window.lastTimestamp || performance.now())));
        const cpuUsage = Math.random() * 100; // Simulating CPU usage, replace with actual CPU usage logic if needed

        document.getElementById('debugInfo').innerText = `FPS: ${fps}\nCPU: ${cpuUsage.toFixed(2)}%`;
        window.lastTimestamp = performance.now();
    }
}

// Click event for debug mode activation
document.body.addEventListener('click', (event) => {
    if (event.clientX < 50 && event.clientY < 50) { // Check if click is in bottom left corner
        debugClicks++;
        if (debugClicks === 5) {
            toggleDebugMode();
            debugClicks = 0; // Reset clicks after activating debug mode
        }
        updateDebugInfo(); // Update info if debug mode is active
    }
});

// Update debug info every second if in debug mode
setInterval(updateDebugInfo, 1000);

// Create a debug info div
const debugDiv = document.createElement('div');
debugDiv.id = 'debugInfo';
debugDiv.style.position = 'fixed';
debugDiv.style.top = '10px';
debugDiv.style.left = '10px';
debugDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
debugDiv.style.color = 'white';
debugDiv.style.padding = '10px';
debugDiv.style.borderRadius = '5px';
debugDiv.style.display = 'none'; // Initially hidden
document.body.appendChild(debugDiv);
