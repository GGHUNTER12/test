let debugClicks = 0;

// Function to show debug message
const showDebugMessage = (message) => {
    const debugMessage = document.createElement('div');
    debugMessage.style.position = 'fixed';
    debugMessage.style.bottom = '10px';
    debugMessage.style.left = '10px';
    debugMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    debugMessage.style.color = 'white';
    debugMessage.style.padding = '5px';
    debugMessage.style.zIndex = '1000';
    debugMessage.textContent = message;

    document.body.appendChild(debugMessage);
    
    // Remove the message after 2 seconds
    setTimeout(() => {
        debugMessage.remove();
    }, 2000);
};

// Function to activate debug mode
const activateDebugMode = () => {
    const debugInfo = document.createElement('div');
    debugInfo.style.position = 'fixed';
    debugInfo.style.top = '10px';
    debugInfo.style.left = '10px';
    debugInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    debugInfo.style.color = 'white';
    debugInfo.style.padding = '10px';
    debugInfo.style.zIndex = '1000';

    // Function to update FPS and CPU usage
    const updateDebugInfo = () => {
        const fps = Math.floor(Math.random() * 60); // Placeholder for FPS logic
        const cpuUsage = Math.floor(Math.random() * 100); // Placeholder for CPU logic
        debugInfo.textContent = `FPS: ${fps}, CPU Usage: ${cpuUsage}%`;
    };

    document.body.appendChild(debugInfo);
    setInterval(updateDebugInfo, 1000); // Update every second
};

// Event listener for clicks
document.addEventListener('click', (event) => {
    if (event.clientX < 100 && event.clientY > window.innerHeight - 100) {
        debugClicks++;
        const clicksLeft = 5 - debugClicks;
        showDebugMessage(`${clicksLeft} clicks are left to enable debug mode.`);

        if (debugClicks >= 5) {
            activateDebugMode();
            showDebugMessage('Debug mode activated!');
        }
    }
});
