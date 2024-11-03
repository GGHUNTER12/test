let debugClicks = 0;

document.addEventListener('DOMContentLoaded', function() {
    const debugInfo = document.getElementById('debugInfo');
    const fpsElement = document.getElementById('fps');
    const cpuElement = document.getElementById('cpu');
    
    // Click event to track clicks in the bottom left corner
    document.body.addEventListener('click', function(e) {
        if (e.clientX < 100 && e.clientY < 100) { // Check if clicked in the bottom left corner
            debugClicks++;
            if (debugClicks >= 5) {
                debugInfo.style.display = 'block'; // Show debug info
                startFPSCheck(); // Start checking FPS
                debugClicks = 0; // Reset clicks after activating
            }
        }
    });
    
    // FPS and CPU check function
    function startFPSCheck() {
        let frame = 0;
        let startTime = Date.now();
        
        function tick() {
            const time = Date.now();
            frame++;
            if (time - startTime > 1000) {
                fpsElement.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
                // For simplicity, use a mock CPU usage here; replace with real logic if needed
                cpuElement.innerHTML = (Math.random() * 100).toFixed(1);
                startTime = time;
                frame = 0;
            }
            window.requestAnimationFrame(tick);
        }
        tick();
    }
});
