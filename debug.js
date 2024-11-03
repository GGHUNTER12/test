let debugActive = false;
let debugInput = '';
let debugClicks = 0;

document.addEventListener('keydown', (event) => {
    // Check for "debug" key sequence
    debugInput += event.key.toLowerCase();
    if (debugInput === 'debug') {
        debugActive = true;
        showDebugInfo();
        debugInput = ''; // Reset input after activating
    }
});

// Function to show debug information
function showDebugInfo() {
    const debugInfo = document.createElement('div');
    debugInfo.id = 'debug-info';
    debugInfo.style.position = 'fixed';
    debugInfo.style.top = '10px';
    debugInfo.style.left = '10px';
    debugInfo.style.color = 'white';
    debugInfo.style.zIndex = '1000';
    debugInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    debugInfo.style.padding = '10px';
    debugInfo.style.borderRadius = '5px';
    document.body.appendChild(debugInfo);
    
    // Update the debug info every second
    setInterval(() => {
        const fps = Math.round(1000 / (performance.now() - (performance.lastTimestamp || performance.now())));
        performance.lastTimestamp = performance.now();
        const cpu = Math.round(Math.random() * 100); // Simulated CPU load
        debugInfo.innerHTML = `FPS: ${fps} <br> CPU: ${cpu}%`;
    }, 1000);
}
