function updateTimeAndDate() {
    const timeElement = document.getElementById('local-time');
    const dateElement = document.getElementById('current-date');

    const now = new Date();
    
    // Format the time
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    // Format the date
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const dateString = `${month} ${day}, ${year}`;

    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
}

// Update the time and date every second
setInterval(updateTimeAndDate, 1000);

// Initial update
updateTimeAndDate();
