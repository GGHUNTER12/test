// URL of the HTML page that contains the list of titles and icons
const titlesPageUrl = "https://gghunter12.github.io/test/titles.html"; // Replace with your actual URL

// Function to fetch titles and icons from the specified URL
async function fetchTitlesAndIcons() {
    const response = await fetch(titlesPageUrl);
    const text = await response.text();

    // Create a new DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    // Get titles and icons from list items
    const items = Array.from(doc.querySelectorAll('ul#title-list li'));
    const titlesAndIcons = items.map(li => ({
        title: li.getAttribute('data-title'),
        icon: li.getAttribute('data-icon'),
    }));

    // Return the array of titles and icons
    return titlesAndIcons;
}

// Function to pick a random title and icon
function getRandomTitleAndIcon(titlesAndIcons) {
    const randomIndex = Math.floor(Math.random() * titlesAndIcons.length);
    return titlesAndIcons[randomIndex];
}

// Copy the specified code to clipboard
function copyToClipboard(url, message) {
    fetch(url)
        .then(response => response.text())
        .then(code => {
            const password = getPassword();
            if (password) {
                const userPassword = prompt("Enter your password:");
                if (userPassword === password) {
                    navigator.clipboard.writeText(code).then(() => {
                        alert(`${message} has been copied to your clipboard!`);
                    });
                } else {
                    alert("Incorrect password. The code was not copied.");
                }
            }
        })
        .catch(err => {
            console.error("Failed to copy text: ", err);
        });
}

// Get or create the password and store it in a cookie
function getPassword() {
    let password = getCookie("password");
    if (!password) {
        password = prompt("Create a new password:");
        if (password) {
            document.cookie = `password=${password}; max-age=31536000; path=/;`;
            alert("Password created successfully.");
        }
    }
    return password;
}

// Retrieve a specific cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Update the page title and icon
async function updatePageTitleAndIcon() {
    const titlesAndIcons = await fetchTitlesAndIcons();
    const { title, icon } = getRandomTitleAndIcon(titlesAndIcons);
    document.getElementById('pageTitle').textContent = title;
    document.getElementById('pageIcon').href = icon;
}

// Update the page title and icon on load
updatePageTitleAndIcon();
