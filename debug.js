let debugMode = false;
let keySequence = '';
const requiredSequence = 'debug';

function showDebugInfo() {
    document.getElementById('debugInfo').style.display = 'block';

    // FPS calculation
    let lastTime = performance.now();
    function calculateFPS() {
        const now = performance.now();
        const fps = Math.round(1000 / (now - lastTime));
        lastTime = now;
        document.getElementById('fps').textContent = `FPS: ${fps}`;
        requestAnimationFrame(calculateFPS);
    }
    calculateFPS();

    // Mock CPU usage - Simulated value for demo
    setInterval(() => {
        const cpuUsage = `${Math.floor(Math.random() * 50) + 30}%`;
        document.getElementById('cpu').textContent = `CPU: ${cpuUsage}`;
    }, 1000);

    // Fetch IP address
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip').textContent = `IP: ${data.ip}`;
        })
        .catch(() => {
            document.getElementById('ip').textContent = 'IP: Error retrieving';
        });
}

document.addEventListener('keydown', (e) => {
    keySequence += e.key.toLowerCase();
    if (keySequence.endsWith(requiredSequence)) {
        debugMode = !debugMode;
        if (debugMode) showDebugInfo();
        else document.getElementById('debugInfo').style.display = 'none';
        keySequence = '';
    }
});
