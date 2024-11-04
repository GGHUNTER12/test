// Function to toggle fullscreen mode
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
            .catch(err => console.log(`Error attempting to enable full-screen mode: ${err.message}`));
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Function to reload the iframe
function reloadIframe() {
    const iframe = document.querySelector('iframe');
    iframe.src = iframe.src; // Reload the iframe by resetting its src
}

// Function to open the current iframe's URL in a new tab
function openAboutBlank() {
    const iframe = document.querySelector('iframe');
    const currentUrl = iframe.src; // Get the current iframe source URL
    const newTab = window.open('about:blank', '_blank'); // Open a new tab with about:blank
    newTab.document.write(`<iframe src="${currentUrl}" style="width: 100%; height: 100%; border: none;"></iframe>`); // Embed the iframe in the new tab
    newTab.document.close(); // Close the document to finish loading the iframe
}
