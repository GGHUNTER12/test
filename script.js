// Clear all elements on the page first 
document.documentElement.innerHTML = "";

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

// Function to copy text to clipboard and show alert
function copyToClipboard(url, label) {
    navigator.clipboard.writeText(url).then(() => {
        alert(`${label} Copied to Clipboard!`);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Fetch titles and icons and set the HTML content
fetchTitlesAndIcons().then(titlesAndIcons => {
    // Check if titles were fetched
    if (titlesAndIcons.length === 0) {
        console.error("No titles found!");
        return;
    }

    const { title, icon } = getRandomTitleAndIcon(titlesAndIcons);

    // Set the title and favicon
    document.getElementById('page-title').innerText = title;
    document.getElementById('favicon').href = icon;

    // Alert to press 'S' key
    alert('PRESS KEYBOARD LETTER "S" TO RELOAD THE PAGE (SUCCESSFULLY LOADED SECURED BROWSER VERSION IDK)');

    // Listen for 'S' key press to reload the page
    document.addEventListener('keydown', (event) => {
        if (event.key === 's') {
            alert('Reloading the page...');
            window.open('chrome://newtab', '_blank'); // Opens a new Chrome tab
            location.reload(); // Reloads the current page
        }
    });
}).catch(error => {
    console.error("Failed to fetch titles and icons:", error);
});
