let debugClicks = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Create a click event listener on the document
    document.addEventListener('click', (event) => {
        // Check if the click is on the bottom left corner
        if (event.clientX < 100 && event.clientY > window.innerHeight - 100) {
            debugClicks++;
            // Display remaining clicks to enable debug mode
            displayDebugClickMessage();
            
            // Activate debug mode after 5 clicks
            if (debugClicks >= 5) {
                activateDebugMode();
            }
        }
    });
});

// Function to display clicks left message
function displayDebugClickMessage() {
    let message = `${5 - debugClicks} clicks are left to enable debug mode.`;
    const messageElement = document.createElement('div');
    messageElement.style.position = 'fixed';
    messageElement.style.bottom = '10px';
    messageElement.style.left = '10px';
    messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    messageElement.style.color = 'white';
    messageElement.style.padding = '5px';
    messageElement.style.zIndex = '1000';
    messageElement.textContent = message;

    document.body.appendChild(messageElement);

    // Remove the message after 2 seconds
    setTimeout(() => {
        document.body.removeChild(messageElement);
    }, 2000);
}

// Function to activate debug mode
function activateDebugMode() {
    // Display FPS and CPU information in the top left corner
    const debugInfo = document.createElement('div');
    debugInfo.style.position = 'fixed';
    debugInfo.style.top = '10px';
    debugInfo.style.left = '10px';
    debugInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    debugInfo.style.color = 'white';
    debugInfo.style.padding = '10px';
    debugInfo.style.zIndex = '1000';

    // Create a function to update FPS and CPU usage
    const updateDebugInfo = () => {
        // Example FPS calculation (this is just a placeholder)
        const fps = Math.floor(Math.random() * 60); // Replace with real FPS logic
        const cpuUsage = Math.floor(Math.random() * 100); // Replace with real CPU logic
        debugInfo.textContent = `FPS: ${fps}, CPU Usage: ${cpuUsage}%`;
    };

    document.body.appendChild(debugInfo);
    setInterval(updateDebugInfo, 1000); // Update every second
}
