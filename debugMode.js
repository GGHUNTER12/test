// Define global variables
let debugModeEnabled = false;
let fps, lastTime = performance.now(), frameCount = 0;
let ipAddress = "Fetching...";
let cpuUsageEnabled = true; // Toggle CPU display based on network restrictions

// Add event listener for key input
window.addEventListener('keyup', (event) => {
    // Check if the user typed "debug"
    if (event.key.toLowerCase() === "d" && !debugModeEnabled) {
        debugModeEnabled = true;
        enableDebugMode();
    }
});

// Function to display FPS and IP address (and CPU if allowed)
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

    // Monitor for console warnings related to cross-origin restrictions
    detectCrossOriginIssues();

    // Start updating debug info
    updateDebugInfo();
}

// Function to detect cross-origin restriction warnings
function detectCrossOriginIssues() {
    const originalConsoleError = console.error;

    console.error = function (message, ...optionalParams) {
        if (typeof message === 'string' && message.includes('parser-blocking')) {
            cpuUsageEnabled = false; // Disable CPU display if cross-origin restrictions detected
        }
        originalConsoleError.apply(console, [message, ...optionalParams]);
    };
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
        IP: ${ipAddress}<br>
        ${cpuUsageEnabled ? "CPU: Enabled" : ""}
    `;

    // Continue updating
    requestAnimationFrame(updateDebugInfo);
}
