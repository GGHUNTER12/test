function updateLocalTime() {
    const timeElement = document.getElementById('local-time');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update time every second
setInterval(updateLocalTime, 1000);
updateLocalTime();
