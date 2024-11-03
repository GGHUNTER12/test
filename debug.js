let clickCount = 0;

// Function to display debug information
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

    // Update debug information every second
    setInterval(() => {
        const fps = Math.round(1000 / (performance.now() - lastTime));
        const cpu = Math.random() * 100; // Simulated CPU usage
        debugInfo.innerHTML = `FPS: ${fps} | CPU: ${cpu.toFixed(2)}%`;
        lastTime = performance.now();
    }, 1000);
}

// Click event listener for debug mode activation
document.body.addEventListener('click', (event) => {
    if (event.clientX < 50 && event.clientY < 50) { // Adjust this based on your needs
        clickCount++;
        if (clickCount === 5) {
            showDebugInfo();
        }
    }
});

// Variable to track time for FPS calculation
let lastTime = performance.now();
