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

// Function to open a new about:blank tab
function openAboutBlank() {
    window.open('about:blank', '_blank'); // Opens a new tab with about:blank
}
