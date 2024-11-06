// Sidebar toggle functionality
const sidebar = document.querySelector('.sidebar');
const logoIcon = document.querySelector('.sidebar .icon:first-child');
let isCollapsed = false;

logoIcon.addEventListener('click', () => {
    if (!isCollapsed) {
        sidebar.classList.add('collapsed');
        isCollapsed = true;
    } else {
        sidebar.classList.remove('collapsed');
        isCollapsed = false;
    }
});

// Reload iframe function
function reloadIframe() {
    const iframe = document.querySelector('iframe');
    iframe.src = iframe.src;
}

// Fullscreen toggle function
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Open iframe in blank tab function
function openIframeInBlankTab() {
    const iframe = document.querySelector('iframe');
    const newTab = window.open('about:blank', '_blank');
    newTab.document.write(`
        <html>
            <head>
                <title>nothing here 😰💯😱</title>
                <style>
                    body { margin: 0; }
                    iframe {
                        width: 100vw;
                        height: 100vh;
                        border: none;
                    }
                </style>
            </head>
            <body>
                <iframe src="${iframe.src}"></iframe>
            </body>
        </html>
    `);
    newTab.document.close();
}

// ChatGPT iframe functionality
const chatGPTButton = document.getElementById('chatGPTButton');
const chatGPTIframe = document.getElementById('chatGPTIframe');
const resizeChatGPTIframe = document.getElementById('resizeChatGPTIframe');
let chatGPTIframeActive = false;

chatGPTButton.addEventListener('click', () => {
    if (!chatGPTIframeActive) {
        chatGPTIframe.classList.add('active');
        resizeChatGPTIframe.classList.add('active');
        chatGPTIframeActive = true;
    } else {
        chatGPTIframe.classList.remove('active');
        resizeChatGPTIframe.classList.remove('active');
        chatGPTIframeActive = false;
    }
});

resizeChatGPTIframe.addEventListener('click', () => {
    chatGPTIframe.style.width = (chatGPTIframe.style.width === '100%') ? '50%' : '100%';
});
