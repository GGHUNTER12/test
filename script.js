// Function to fetch titles and icons (kept the same)
async function fetchTitlesAndIcons() {
    const response = await fetch("https://gghunter12.github.io/test/titles.html");
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const items = Array.from(doc.querySelectorAll('ul#title-list li'));
    const titlesAndIcons = items.map(li => ({
        title: li.getAttribute('data-title'),
        icon: li.getAttribute('data-icon'),
    }));
    return titlesAndIcons;
}

// Function to pick a random title and icon (kept the same)
function getRandomTitleAndIcon(titlesAndIcons) {
    const randomIndex = Math.floor(Math.random() * titlesAndIcons.length);
    return titlesAndIcons[randomIndex];
}

// Function to copy the cheat code after password verification (updated)
window.copyCheatCode = function(url, message) {
    const password = getPassword();
    if (password) {
        const userPassword = prompt("Enter your password:");
        if (userPassword === password) {
            // Focus the window before attempting to write to the clipboard
            window.focus();
            fetch(url)
                .then(response => response.text())
                .then(code => {
                    navigator.clipboard.writeText(code).then(() => {
                        alert(`${message} has been copied to your clipboard!`);
                    }).catch(err => {
                        console.error("Clipboard error: ", err);
                        alert("Failed to copy cheat code. Please try again.");
                    });
                })
                .catch(err => {
                    console.error("Failed to fetch and copy cheat code: ", err);
                    alert("Failed to copy cheat code.");
                });
        } else {
            alert("Incorrect password. The code was not copied.");
        }
    }
};

// Get or create the password and store it in a cookie (updated)
function getPassword() {
    let password = getCookie('cheatPassword');
    if (!password) {
        password = prompt("Create a password to use for copying cheat codes:");
        if (password) {
            document.cookie = `cheatPassword=${password}; max-age=31536000; path=/`; // 1 year
            alert("Password saved successfully. Use this password for future access.");
        }
    }
    return password;
}

// Function to get the value of a cookie by name (kept the same)
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Update the page title and icon (kept the same)
async function updatePageTitleAndIcon() {
    const titlesAndIcons = await fetchTitlesAndIcons();
    const { title, icon } = getRandomTitleAndIcon(titlesAndIcons);
    document.getElementById('pageTitle').textContent = title;
    document.getElementById('pageIcon').href = icon;
}

// Drag and drop functionality for changing background (kept the same)
function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please drop an image file.");
    }
}

// Prevent default drag behaviors (kept the same)
function handleDragOver(event) {
    event.preventDefault();
}

// Add event listeners to the background changer icon (kept the same)
const backgroundChangerIcon = document.getElementById('backgroundChanger');
backgroundChangerIcon.addEventListener('dragover', handleDragOver);
backgroundChangerIcon.addEventListener('drop', handleDrop);

// Update the page title and icon on load (kept the same)
updatePageTitleAndIcon();
