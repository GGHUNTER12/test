// URL of the HTML page that contains the list of titles and icons
const titlesPageUrl = "https://gghunter12.github.io/test/titles.html"; // Ensure this URL is valid

// Function to fetch titles and icons from the specified URL
async function fetchTitlesAndIcons() {
    try {
        const response = await fetch(titlesPageUrl);
        if (!response.ok) throw new Error('Network response was not ok');
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
    } catch (error) {
        console.error('Failed to fetch titles and icons:', error);
        alert('Failed to load titles and icons.');
        return []; // Return an empty array on failure
    }
}

// Function to pick a random title and icon
function getRandomTitleAndIcon(titlesAndIcons) {
    if (titlesAndIcons.length === 0) return { title: "Default Title", icon: "" }; // Fallback
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
                    // Ensure the document is focused before copying
                    if (!document.hasFocus()) {
                        alert("Please click back into the page to copy the code.");
                    } else {
                        navigator.clipboard.writeText(code).then(() => {
                            alert(`${message} has been copied to your clipboard!`);
                        }).catch(err => {
                            console.error("Clipboard write failed: ", err);
                            alert("Failed to copy cheat code.");
                        });
                    }
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

// Define cheat code variables
const gimkitCode = `void fetch('https://raw.githubusercontent.com/TheLazySquid/GimkitCheat/main/build/bundle.js').then(d => d.text()).then(eval);`;
const blooketCode = `void fetch('https://raw.githubusercontent.com/crckturtle/Blooket-Hack-GUI/main/GUI').then(d => d.text()).then(eval);`;

// Function to copy the code to clipboard
function copyCheatCode(code, title) {
    // Check if the document is focused
    if (document.hasFocus()) {
        // Use the Clipboard API to copy text
        navigator.clipboard.writeText(code)
            .then(() => {
                alert(`${title} copied to clipboard!`);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    } else {
        alert('Document not focused. Please try again.');
    }
}


// Update the page title and icon
async function updatePageTitleAndIcon() {
    const titlesAndIcons = await fetchTitlesAndIcons();
    const { title, icon } = getRandomTitleAndIcon(titlesAndIcons);
    document.getElementById('pageTitle').textContent = title;
    document.getElementById('pageIcon').href = icon;
}

// Function to change the background image
function changeBackgroundImage(imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
}

// Drag and drop functionality for changing background
function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            changeBackgroundImage(e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please drop an image file.");
    }
}

// Prevent default drag behaviors
function handleDragOver(event) {
    event.preventDefault();
}

// Add event listeners to the background changer icon
const backgroundChangerIcon = document.getElementById('backgroundChanger');
backgroundChangerIcon.addEventListener('dragover', handleDragOver);
backgroundChangerIcon.addEventListener('drop', handleDrop);

// Update the page title and icon on load
updatePageTitleAndIcon();
