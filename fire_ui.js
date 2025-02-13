(() => {
    let iframe = document.createElement("iframe");
    let searchBar = document.createElement("input");
    let tabDisplay = document.createElement("div");
    let timeDisplay = document.createElement("div");
    let isIframeVisible = false;
    let isSearchVisible = false;

    let fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    Object.assign(iframe.style, {
        position: "fixed",
        top: "0", left: "0",
        width: "100vw", height: "100vh",
        border: "none", display: "none",
        zIndex: "9999",
        transition: "opacity 0.3s ease-in-out"
    });
    iframe.src = "https://secured-web-szvy.webs.vc";
    document.body.appendChild(iframe);

    Object.assign(tabDisplay.style, {
        position: "fixed",
        top: "-50px", left: "50%",
        transform: "translateX(-50%)",
        width: "280px", height: "auto",
        display: "flex", flexDirection: "column", alignItems: "center",
        background: "#1e1e1e", color: "#fff",
        fontSize: "16px", fontWeight: "bold",
        fontFamily: "'Google Sans', sans-serif",
        borderRadius: "25px", 
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.4)",
        textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap",
        transition: "top 0.3s ease-in-out, opacity 0.3s ease-in-out",
        opacity: "0", zIndex: "10001",
        padding: "10px 15px", 
        textAlign: "center" 
    });
    tabDisplay.innerText = "Loading...";
    document.body.appendChild(tabDisplay);

    Object.assign(timeDisplay.style, {
        fontSize: "14px", fontWeight: "normal",
        fontFamily: "'Google Sans', sans-serif",
        marginTop: "2px", // less gap for a tighter look buddy
        opacity: "0.8"
    });
    tabDisplay.appendChild(timeDisplay);
    updateTime();

    Object.assign(searchBar.style, {
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%) scale(0.9)",
        width: "320px", height: "40px",
        padding: "12px 15px",
        fontSize: "18px", textAlign: "center",
        background: "#282828", color: "#fff",
        fontFamily: "'Google Sans', sans-serif",
        border: "none", borderRadius: "30px", // 🔥 now a perfectly rounded box
        outline: "none",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
        transition: "opacity 0.3s ease-in-out, transform 0.2s ease-in-out",
        opacity: "0", display: "none", zIndex: "10000"
    });

    searchBar.type = "text";
    searchBar.placeholder = "Enter URL and press Enter...";
    document.body.appendChild(searchBar);

    let keys = {};

    document.addEventListener("keydown", (e) => {
        keys[e.key.toLowerCase()] = true;

        if (keys["s"] && keys["g"]) {
            isIframeVisible = !isIframeVisible;

            if (isIframeVisible) {
                iframe.style.display = "block";
                iframe.style.opacity = "1";
                requestFullscreen(iframe);
            } else {
                hideIframe();
            }
        }

        if (e.key === "/") {
            e.preventDefault();
            toggleSearchBar();
        }

        if (e.key === "Escape") {
            hideIframe();
        }
    });

    document.addEventListener("keyup", (e) => keys[e.key.toLowerCase()] = false);

    searchBar.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            let url = searchBar.value.trim();
            if (!/^https?:\/\//i.test(url)) url = "https://" + url;
            iframe.src = url;
            updateTabDisplay(url);
            hideSearchBar();
        }
    });

    function requestFullscreen(element) {
        if (element.requestFullscreen) element.requestFullscreen();
        else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
        else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
        else if (element.msRequestFullscreen) element.msRequestFullscreen();
    }

    function hideIframe() {
        iframe.style.opacity = "0";
        setTimeout(() => iframe.style.display = "none", 300);
        hideSearchBar();
    }

    function toggleSearchBar() {
        if (!isSearchVisible) {
            showSearchBar();
        } else {
            hideSearchBar();
        }
    }

    function showSearchBar() {
        isSearchVisible = true;
        searchBar.style.display = "block";
        setTimeout(() => {
            searchBar.style.opacity = "1";
            searchBar.style.transform = "translate(-50%, -50%) scale(1)";
            searchBar.focus();
        }, 10);
        updateTabDisplay();
    }

    function hideSearchBar() {
        isSearchVisible = false;
        searchBar.style.opacity = "0";
        searchBar.style.transform = "translate(-50%, -50%) scale(0.9)";
        setTimeout(() => searchBar.style.display = "none", 300);
        hideTabDisplay();
    }

    function updateTabDisplay(url = iframe.src) {
        try {
            let hostname = new URL(url).hostname;
            tabDisplay.innerText = hostname.charAt(0).toUpperCase() + hostname.slice(1);
        } catch {
            tabDisplay.innerText = "Unknown Site";
        }
        tabDisplay.appendChild(timeDisplay); 
        tabDisplay.style.opacity = "1";
        tabDisplay.style.top = "10px";
    }

    function hideTabDisplay() {
        tabDisplay.style.opacity = "0";
        tabDisplay.style.top = "-50px";
    }

    function updateTime() {
        let now = new Date();
        let timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        let dateStr = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
        timeDisplay.innerText = `${timeStr} • ${dateStr}`;
    }

    setInterval(updateTime, 1000);

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            hideIframe();
        }
    });

    iframe.onload = () => updateTabDisplay(iframe.src);

alert("what up bro");
alert("yea listen get closer buddy");
alert("press / to show the ui and press s and g to show the iframe in fullscreen");
alert("now i will let you get back to it");

})();
