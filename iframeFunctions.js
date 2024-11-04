// Function to reload the iframe
function reloadIframe() {
    const iframe = document.querySelector('iframe');
    iframe.src = iframe.src; // Reload the iframe by resetting its src
}

// Function to open a new about:blank tab
function openAboutBlank() {
    window.open('about:blank', '_blank'); // Opens a new tab with about:blank
}

// Function to toggle fullscreen mode
function toggleFullScreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
