(function () {
    const debugContainer = document.getElementById("debug-container");
    let fpsDisplay = document.getElementById("fps");
    let cpuDisplay = document.getElementById("cpu");
    let ipDisplay = document.getElementById("ip");
    let keySequence = [];
    const debugCode = "debug";

    // Check FPS
    let lastFrameTime = performance.now();
    function updateFPS() {
        const now = performance.now();
        const delta = now - lastFrameTime;
        const fps = Math.round(1000 / delta);
        lastFrameTime = now;
        fpsDisplay.textContent = fps;
        requestAnimationFrame(updateFPS);
    }

    // Simulate CPU Usage
    function updateCPU() {
        // Fake CPU usage for display purposes
        cpuDisplay.textContent = `${Math.floor(Math.random() * 50 + 1)}%`;
    }
    setInterval(updateCPU, 1000);

    // Fetch IP Address
    async function fetchIP() {
        try {
            const response = await fetch("https://api.ipify.org?format=json");
            const data = await response.json();
            ipDisplay.textContent = data.ip;
        } catch (error) {
            ipDisplay.textContent = "Error";
            console.error("Failed to fetch IP:", error);
        }
    }

    // Listen for "debug" sequence
    document.addEventListener("keydown", (e) => {
        keySequence.push(e.key.toLowerCase());
        if (keySequence.slice(-debugCode.length).join("") === debugCode) {
            debugContainer.style.display = debugContainer.style.display === "none" ? "block" : "none";
            if (debugContainer.style.display === "block") {
                fetchIP(); // Fetch IP when debug is enabled
                updateFPS(); // Start FPS updates
            }
            keySequence = []; // Reset sequence
        }
    });
})();
