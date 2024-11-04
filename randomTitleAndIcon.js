// Function to fetch titles and icons
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

// Function to pick a random title and icon
function getRandomTitleAndIcon(titlesAndIcons) {
    const randomIndex = Math.floor(Math.random() * titlesAndIcons.length);
    return titlesAndIcons[randomIndex];
}

// Update the page title and icon on load
async function updatePageTitleAndIcon() {
    const titlesAndIcons = await fetchTitlesAndIcons();
    const { title, icon } = getRandomTitleAndIcon(titlesAndIcons);
    document.getElementById('pageTitle').textContent = title;
    document.getElementById('pageIcon').href = icon;
}

// Call to update the page title and icon on load
updatePageTitleAndIcon();
