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

// Copy the specified cheat code to clipboard after password verification
window.copyCheatCode = function(url, message) {
    const password = getPassword();
    if (password) {
        const userPassword = prompt("Enter your password:");
        if (userPassword === password) {
            fetch(url)
                .then(response => response.text())
                .then(code => {
                    navigator.clipboard.writeText(code).then(() => {
                        alert(`${message} has been copied to your clipboard!`);
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

// Get or create the password and store it in a cookie
function getPassword() {
    let password = getCookie('cheatPassword');
    if (!password) {
        password = prompt("Create a password to use for copying cheat codes:");
        document.cookie = `cheatPassword=${password}; max-age=31536000; path=/`; // 1 year
    }
    return password;
}

// Function to get the value of a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Disable right-click, F12, and some key combinations to make inspection harder
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
    if (event.key === 'F12' || 
        (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'C' || event.key === 'J')) || 
        (event.ctrlKey && event.key === 'U')) {
        event.preventDefault();
    }
});

// Update the page title and favicon randomly
fetchTitlesAndIcons().then(titlesAndIcons => {
    const { title, icon } = getRandomTitleAndIcon(titlesAndIcons);
    document.getElementById('pageTitle').innerText = title;
    document.getElementById('pageIcon').href = icon;
});
