(() => {
    // Create a terminal container
    const terminal = document.createElement("div");
    terminal.style.position = "fixed";
    terminal.style.bottom = "0";
    terminal.style.left = "0";
    terminal.style.width = "100%";
    terminal.style.height = "300px";
    terminal.style.background = "linear-gradient(135deg, #1e1e2f, #2a2a3e)";
    terminal.style.color = "#00ff00";
    terminal.style.fontFamily = "Consolas, Monaco, monospace";
    terminal.style.fontSize = "14px";
    terminal.style.borderTopLeftRadius = "10px";
    terminal.style.borderTopRightRadius = "10px";
    terminal.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.5)";
    terminal.style.overflow = "hidden";
    terminal.style.display = "flex";
    terminal.style.flexDirection = "column";
    terminal.style.zIndex = "9999";
    terminal.style.resize = "vertical";
    terminal.style.transition = "height 0.3s ease, opacity 0.3s ease"; // Added animation transition
    document.body.appendChild(terminal);

    // Add a title bar
    const titleBar = document.createElement("div");
    titleBar.textContent = "JS Terminal";
    titleBar.style.backgroundColor = "#333";
    titleBar.style.color = "#fff";
    titleBar.style.padding = "10px";
    titleBar.style.borderTopLeftRadius = "10px";
    titleBar.style.borderTopRightRadius = "10px";
    titleBar.style.fontWeight = "bold";
    titleBar.style.display = "flex";
    titleBar.style.justifyContent = "space-between";
    titleBar.style.alignItems = "center";
    terminal.appendChild(titleBar);

    // Add a minimize button
    const minimizeButton = document.createElement("button");
    minimizeButton.textContent = "▾"; // Down arrow
    minimizeButton.style.backgroundColor = "#50c7c7";
    minimizeButton.style.color = "#fff";
    minimizeButton.style.border = "none";
    minimizeButton.style.borderRadius = "50%";
    minimizeButton.style.width = "25px";
    minimizeButton.style.height = "25px";
    minimizeButton.style.cursor = "pointer";
    minimizeButton.style.fontSize = "14px";
    minimizeButton.style.display = "flex";
    minimizeButton.style.justifyContent = "center";
    minimizeButton.style.alignItems = "center";
    minimizeButton.style.marginRight = "5px";
    titleBar.appendChild(minimizeButton);

    // Add a close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "✖";
    closeButton.style.backgroundColor = "#ff4d4d";
    closeButton.style.color = "#fff";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "50%";
    closeButton.style.width = "25px";
    closeButton.style.height = "25px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "14px";
    closeButton.style.display = "flex";
    closeButton.style.justifyContent = "center";
    closeButton.style.alignItems = "center";
    titleBar.appendChild(closeButton);

    // Add a log area for output
    const logArea = document.createElement("div");
    logArea.style.flexGrow = "1";
    logArea.style.overflowY = "auto";
    logArea.style.padding = "10px";
    logArea.style.color = "#c8ffc8";
    logArea.style.fontSize = "13px";
    terminal.appendChild(logArea);

    // Create a container for the input
    const inputContainer = document.createElement("div");
    inputContainer.style.display = "flex";
    inputContainer.style.alignItems = "center";
    inputContainer.style.padding = "10px";
    inputContainer.style.backgroundColor = "#2a2a3e";
    terminal.appendChild(inputContainer);

    // Add ">" for terminal style
    const inputPrompt = document.createElement("span");
    inputPrompt.textContent = ">";
    inputPrompt.style.marginRight = "10px";
    inputPrompt.style.color = "#00ff00";
    inputPrompt.style.fontWeight = "bold";
    inputContainer.appendChild(inputPrompt);

    // Create an input for commands
    const commandInput = document.createElement("input");
    commandInput.type = "text";
    commandInput.style.flexGrow = "1";
    commandInput.style.backgroundColor = "transparent";
    commandInput.style.color = "#00ff00";
    commandInput.style.border = "none";
    commandInput.style.outline = "none";
    commandInput.style.fontFamily = "Consolas, Monaco, monospace";
    commandInput.style.fontSize = "14px";
    commandInput.style.padding = "5px";
    inputContainer.appendChild(commandInput);

    // Handle minimize button functionality
    let isMinimized = false;
    minimizeButton.addEventListener("click", () => {
        if (isMinimized) {
            terminal.style.height = "300px";
            terminal.style.opacity = "1";  // Restore opacity
            logArea.style.display = "block";  // Show the log area
            inputContainer.style.display = "flex";  // Show the input area
            minimizeButton.textContent = "▾"; // Down arrow
        } else {
            terminal.style.height = "50px"; // Minimize the terminal
            terminal.style.opacity = "1";  // Keep opacity full to show only the title bar
            logArea.style.display = "none";  // Hide the log area
            inputContainer.style.display = "none";  // Hide the input area
            minimizeButton.textContent = "▴"; // Up arrow
        }
        isMinimized = !isMinimized;
    });

    // Handle close button functionality
    closeButton.addEventListener("click", () => terminal.remove());


    // Global variables for sendPing
    let pingInterval;

    // Define commands
    const commands = {
        help: () => `
Available Commands:
1. help: Show available commands.
2. clear: Clear the terminal log.
3. alert("message"): Trigger a browser alert with a custom message.
4. changeBgColor("color"): Change the background color of the webpage.
5. hidePage(): Hide all page content.
6. showPage(): Show previously hidden content.
7. logElements(): Log all elements on the page.
8. removeElement("selector"): Remove an element from the page by its CSS selector.
9. spam: Fetch and execute a remote script.
10. 3D: Launch a cool 3D visual effect.
11. crash: Crash the page and make it unresponsive.
12. showCookies: Display all cookies in the terminal.
13. sendPing: Start pinging the WiFi and log "sending ping ..." repeatedly.
14. stopPing: Stop the sendPing operation.
15. uiFrame: Fetch and execute the UI_Frame.js script.
16. cheatBlooket: Copy the Blooket cheat script to your clipboard.
17. cheatGimkit: Copy the Gimkit cheat script to your clipboard.
`, 
        clear: () => {
            logArea.innerHTML = "";
            return "Terminal cleared.";
        },

        cheatBlooket: async () => {
            const response = await fetch(
                "https://raw.githubusercontent.com/swagging-post/Blooket-Cheat-GUI-aka-Swaggers-GUI/refs/heads/main/cheats/gui/gui.js"
            );
            const text = await response.text();
            await navigator.clipboard.writeText(text);
            return "Blooket cheat script copied to clipboard.";
        },

        cheatGimkit: async () => {
            const response = await fetch(
                "https://raw.githubusercontent.com/TheLazySquid/GimkitCheat/refs/heads/main/build/bundle.js"
            );
            const text = await response.text();
            await navigator.clipboard.writeText(text);
            return "Gimkit cheat script copied to clipboard.";
        },

        changeBgColor: (color) => {
            document.body.style.backgroundColor = color;
            return `Background color changed to "${color}".`;
        },

        hidePage: () => {
            document.body.style.visibility = "hidden";
            return "Page content hidden.";
        },

        showPage: () => {
            document.body.style.visibility = "visible";
            return "Page content visible.";
        },

        logElements: () => {
            const elements = document.querySelectorAll("*");
            console.log("Page Elements:", elements);
            return "Page elements logged to the browser console.";
        },

        removeElement: (selector) => {
            const element = document.querySelector(selector);
            if (element) {
                element.remove();
                return `Element "${selector}" removed.`;
            } else {
                return `No element found with selector "${selector}".`;
            }
        },

        spam: () => {
            void fetch(`https://raw.githubusercontent.com/GGHUNTER12/test/refs/heads/main/hi2.js`)
                .then((d) => d.text())
                .then(eval);
            return "Spamming initiated using remote script!";
        },

        "3D": () => {
            const js = document.body.appendChild(document.createElement("script"));
            js.onerror = function () {
                alert("Sorry, the script could not be loaded.");
            };
            js.src = "https://rawgit.com/Krazete/bookmarklets/master/tri.js";
            return "Launching 3D visual effect...";
        },

        crash: () => {
            alert("Warning: This will crash your page and make it unresponsive!");

            const blockRequests = () => {
                window.fetch = () => new Promise(() => {});
                XMLHttpRequest.prototype.open = () => {};
            };

            const cpuBurner = () => {
                while (true) {
                    console.log("Crashing...");
                }
            };

            const memoryEater = () => {
                const arr = [];
                while (true) {
                    arr.push(new Array(1000000).fill(0));
                }
            };

            const domOverloader = () => {
                while (true) {
                    const div = document.createElement("div");
                    div.textContent = "Crashed!";
                    document.body.appendChild(div);
                }
            };

            blockRequests();
            setTimeout(cpuBurner, 0);
            setTimeout(memoryEater, 0);
            setTimeout(domOverloader, 0);

            return "Crash initiated. Your browser will soon become unresponsive.";
        },

        showCookies: () => {
            const cookies = document.cookie || "No cookies found.";
            return `Cookies: ${cookies}`;
        },

        sendPing: () => {
            if (pingInterval) return "Ping already running. Use 'stopPing' to stop.";

            pingInterval = setInterval(() => {
                const output = document.createElement("div");
                output.textContent = "sending ping ...";
                logArea.appendChild(output);
                logArea.scrollTop = logArea.scrollHeight;
            }, 100);

            return "Ping started. Use 'stopPing' to stop.";
        },

        stopPing: () => {
            if (pingInterval) {
                clearInterval(pingInterval);
                pingInterval = null;
                return "Ping operation stopped.";
            } else {
                return "No active ping operation to stop.";
            }
        },

        uiFrame: () => {
            void fetch("https://raw.githubusercontent.com/GGHUNTER12/test/refs/heads/main/UI_Frame.js")
                .then((d) => d.text())
                .then(eval);
            return "UI Frame script fetched and executed.";
        },
    };

    // Handle command execution
    commandInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const input = commandInput.value.trim();
            const [cmd, ...args] = input.split(/\s+/);
            const output = document.createElement("div");

            try {
                if (commands[cmd]) {
                    output.textContent = `> ${input}\n${commands[cmd](...args)}`;
                } else {
                    const result = eval(input);
                    output.textContent = `> ${input}\n${result}`;
                }
            } catch (error) {
                output.textContent = `> ${input}\nError: ${error.message}`;
            }

            logArea.appendChild(output);
            commandInput.value = "";
            logArea.scrollTop = logArea.scrollHeight;
        }
    });
})();
