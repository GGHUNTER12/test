// Initialize variables
let debugEnabled = false;
let inputSequence = [];
const activationSequence = ['d', 'e', 'b', 'u', 'g'];
let fpsElement, cpuElement, ipElement;

// Create elements for displaying debug info
function setupDebugInfo() {
    fpsElement = document.createElement('div');
    cpuElement = document.createElement('div');
    ipElement = document.createElement('div');
    [fpsElement, cpuElement, ipElement].forEach((el) => {
        el.style.position = 'fixed';
        el.style.top = '10px';
        el.style.left = '10px';
        el.style.color = '#fff';
        el.style.background = 'rgba(0, 0, 0, 0.7)';
        el.style.padding = '5px';
        el.style.borderRadius = '5px';
        el.style.marginBottom = '5px';
        el.style.fontFamily = 'Arial, sans-serif';
        el.style.display = 'none'; // Start hidden
        document.body.appendChild(el);
    });
}

// Show or hide debug info elements
function toggleDebugInfo(visible) {
    [fpsElement, cpuElement, ipElement].forEach((el) => {
        el.style.display = visible ? 'block' : 'none';
    });
}

// Calculate and display FPS
function updateFPS() {
    let lastFrameTime = performance.now();
    function calculateFPS() {
        const now = performance.now();
        const fps = Math.round(1000 / (now - lastFrameTime));
        fpsElement.textContent = `FPS: ${fps}`;
        lastFrameTime = now;
        if (debugEnabled) requestAnimationFrame(calculateFPS);
    }
    calculateFPS();
}

// Simulate CPU usage (placeholder)
function updateCPU() {
    cpuElement.textContent = 'CPU Usage: 12% (mock data)';
}

// Fetch and display user's IP address
async function updateIP() {
    try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        ipElement.textContent = `IP Address: ${data.ip}`;
    } catch (error) {
        ipElement.textContent = 'IP Address: Unavailable';
    }
}

// Enable debug mode when "debug" is typed
function handleKeyPress(e) {
    inputSequence.push(e.key.toLowerCase());
    if (inputSequence.join('').includes(activationSequence.join(''))) {
        inputSequence = []; // Reset sequence
        debugEnabled = !debugEnabled; // Toggle debug mode
        toggleDebugInfo(debugEnabled);
        if (debugEnabled) {
            updateFPS();
            updateCPU();
            updateIP();
        }
    }
}

// Initialize debug mode setup
setupDebugInfo();
document.addEventListener('keydown', handleKeyPress);
