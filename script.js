const timeElement = document.getElementById('local-time');
const timeFormatToggle = document.getElementById('time-format-toggle');
const documentsBtn = document.getElementById('documents-btn');
const documentsMenu = document.getElementById('documents-menu');
const settingsBtn = document.getElementById('settings-btn');
const settingsMenu = document.getElementById('settings-menu');
const backgroundSelector = document.getElementById('background-selector');
const colorPicker = document.getElementById('color-picker');
const imageUrlInput = document.getElementById('image-url');

// Default to 24-hour format
let is12HourFormat = false;

function updateLocalTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    if (is12HourFormat) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    } else {
        timeElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
    }
}

// Toggle time format
timeFormatToggle.addEventListener('change', () => {
    is12HourFormat = timeFormatToggle.checked;
});

// Toggle Documents menu
documentsBtn.addEventListener('click', () => {
    documentsMenu.classList.toggle('hidden');
});

// Toggle Settings menu
settingsBtn.addEventListener('click', () => {
    settingsMenu.classList.toggle('hidden');
});

// Background changer
backgroundSelector.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value === 'color') {
        colorPicker.classList.remove('hidden');
        imageUrlInput.classList.add('hidden');
    } else {
        colorPicker.classList.add('hidden');
        imageUrlInput.classList.remove('hidden');
    }
});

colorPicker.addEventListener('input', (e) => {
    document.body.style.background = e.target.value;
});

imageUrlInput.addEventListener('input', (e) => {
    document.body.style.background = `url(${e.target.value}) no-repeat center center / cover`;
});

// Update time every second
setInterval(updateLocalTime, 1000);
updateLocalTime();
