// Define global variables
let debugModeEnabled = false;
let fps, lastTime = performance.now(), frameCount = 0;
let ipAddress = "Fetching...";
let cpuUsage = "N/A"; // Placeholder for CPU usage (actual CPU usage cannot be accessed via browser for security)

// Add event listener for key input
window.addEventListener('keyup', (event) => {
    // Check if the user typed "debug"
    if (event.key.toLowerCase() === "d" && !debugModeEnabled) {
        debugModeEnabled = true;
        enableDebugMode();
    }
});

// Function to display FPS, CPU, and IP address
function enableDebugMode() {
    // Create a debug info container in the top-left corner
    const debugInfoContainer = document.createElement("div");
    debugInfoContainer.id = "debugInfo";
    debugInfoContainer.style.position = "fixed";
    debugInfoContainer.style.top = "10px";
    debugInfoContainer.style.left = "10px";
    debugInfoContainer.style.padding = "10px";
    debugInfoContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    debugInfoContainer.style.color = "white";
    debugInfoContainer.style.fontFamily = "Arial, sans-serif";
    debugInfoContainer.style.zIndex = "1000";
    document.body.appendChild(debugInfoContainer);

    // Start fetching IP address
    fetch("https://ipinfo.io/json?token=YOUR_TOKEN")
        .then(response => response.json())
        .then(data => ipAddress = data.ip)
        .catch(() => ipAddress = "Unable to fetch");

    // Start updating debug info
    updateDebugInfo();
}

// Function to calculate FPS
function calculateFPS() {
    const currentTime = performance.now();
    frameCount++;
    if (currentTime - lastTime >= 1000) { // Update every second
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
    }
}

// Function to update the debug info display
function updateDebugInfo() {
    if (!debugModeEnabled) return;

    calculateFPS(); // Calculate FPS

    // Update the debug info container content
    const debugInfoContainer = document.getElementById("debugInfo");
    debugInfoContainer.innerHTML = `
        <strong>Debug Mode</strong><br>
        FPS: ${fps || "Calculating..."}<br>
        CPU: ${cpuUsage}<br>
        IP: ${ipAddress}
    `;

    // Continue updating
    requestAnimationFrame(updateDebugInfo);
}
