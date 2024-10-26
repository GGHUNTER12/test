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

// Function to change the iframe source and draw it on canvas
function changeIframeSource(url) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.onload = () => {
        drawIframeToCanvas(iframe);
    };
    document.body.appendChild(iframe);
}

// Function to draw the iframe content onto a canvas
function drawIframeToCanvas(iframe) {
    const canvas = document.getElementById('contentCanvas');
    const context = canvas.getContext('2d');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const iframeContent = iframeDoc.documentElement;

    // Draw the iframe content onto the canvas
    html2canvas(iframeContent).then((canvas) => {
        context.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    });

    // Remove the iframe from the document after drawing
    iframe.remove();
}

// Disable right-click and keyboard shortcuts for inspection tools
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'i' || e.key === 'j' || e.key === 's')) {
        e.preventDefault();
    }
});

// Update the page title and icon on load
updatePageTitleAndIcon();
