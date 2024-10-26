// URL of the HTML page that contains the list of titles and icons
const titlesPageUrl = "https://gghunter12.github.io/test/titles.html"; // Replace with your actual URL

// Function to fetch titles and icons from the specified URL
async function fetchTitlesAndIcons() {
    try {
        const response = await fetch(titlesPageUrl);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

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
        console.error("Failed to fetch titles and icons: ", error);
        alert("An error occurred while fetching titles and icons. Please try again later.");
        return [];
    }
}

// Function to pick a random title and icon
function getRandomTitleAndIcon(titlesAndIcons) {
    const randomIndex = Math.floor(Math.random() * titlesAndIcons.length);
    return titlesAndIcons[randomIndex];
}

// Function to update the page title and icon
async function updatePageTitleAndIcon() {
    const titlesAndIcons = await fetchTitlesAndIcons();
    if (titlesAndIcons.length > 0) {
        const { title, icon } = getRandomTitleAndIcon(titlesAndIcons);
        document.getElementById('pageTitle').textContent = title;
        document.getElementById('pageIcon').href = icon;
    }
}

// Call the function to update the page title and icon
updatePageTitleAndIcon();
