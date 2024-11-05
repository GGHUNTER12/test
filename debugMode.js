let debugClicks = 0; // Track the number of debug clicks
const debugLimit = 5; // Number of clicks needed to enable debug mode
let debugMode = false; // Flag to track if debug mode is active

// Function to fetch and display user IP address
async function fetchUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Unable to fetch IP';
    }
}

// Function to display FPS and CPU usage
function displayDebugInfo() {
    // Get CPU usage (this is just a placeholder, actual CPU usage tracking requires more advanced methods)
    const cpuUsage = Math.random() * 100; // Mock CPU usage percentage

    // Display the information
    fetchUserIP().then(ip => {
        const debugInfo = `
            <div style="position: fixed; top: 10px; left: 10px; background: rgba(0, 0, 0, 0.8); color: white; padding: 10px; border-radius: 5px;">
                <h3>Debug Info</h3>
                <p>IP Address: ${ip}</p>
                <p>CPU Usage: ${cpuUsage.toFixed(2)}%</p>
                <p>FPS: ${Math.floor(Math.random() * 60) + 30} FPS</p> <!-- Mock FPS -->
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', debugInfo);
    });
}

// Listen for key presses
document.addEventListener('keydown', (event) => {
    if (event.key === 'd') {
        debugClicks++;
        if (debugClicks >= debugLimit) {
            debugMode = true; // Activate debug mode
            displayDebugInfo(); // Show debug information
            debugClicks = 0; // Reset click count
        }
    } else {
        debugClicks = 0; // Reset if any other key is pressed
    }
});
