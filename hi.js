(() => {
    // Create a terminal container
    const terminal = document.createElement("div");
    terminal.style.position = "fixed";
    terminal.style.bottom = "0";
    terminal.style.left = "0";
    terminal.style.width = "100%";
    terminal.style.height = "300px";
    terminal.style.backgroundColor = "#1e1e1e";
    terminal.style.color = "#00ff00";
    terminal.style.fontFamily = "monospace";
    terminal.style.fontSize = "14px";
    terminal.style.overflow = "hidden";
    terminal.style.display = "flex";
    terminal.style.flexDirection = "column";
    terminal.style.padding = "0";
    terminal.style.zIndex = "9999";
    document.body.appendChild(terminal);

    // Add a title bar
    const titleBar = document.createElement("div");
    titleBar.textContent = "JS Terminal";
    titleBar.style.backgroundColor = "#333";
    titleBar.style.color = "#fff";
    titleBar.style.padding = "5px 10px";
    titleBar.style.fontWeight = "bold";
    terminal.appendChild(titleBar);

    // Add a log area for output
    const logArea = document.createElement("div");
    logArea.style.flexGrow = "1";
    logArea.style.overflowY = "auto";
    logArea.style.padding = "10px";
    terminal.appendChild(logArea);

    // Create a container for the input with a ">" for style
    const inputContainer = document.createElement("div");
    inputContainer.style.display = "flex";
    inputContainer.style.alignItems = "center";
    inputContainer.style.backgroundColor = "#000";
    inputContainer.style.color = "#00ff00";
    inputContainer.style.padding = "10px";
    terminal.appendChild(inputContainer);

    // Add ">" for terminal style
    const inputPrompt = document.createElement("span");
    inputPrompt.textContent = ">";
    inputPrompt.style.marginRight = "10px";
    inputPrompt.style.fontFamily = "monospace";
    inputContainer.appendChild(inputPrompt);

    // Create an input for commands
    const commandInput = document.createElement("input");
    commandInput.type = "text";
    commandInput.style.flexGrow = "1";
    commandInput.style.backgroundColor = "transparent";
    commandInput.style.color = "#00ff00";
    commandInput.style.border = "none";
    commandInput.style.outline = "none";
    commandInput.style.fontFamily = "monospace";
    commandInput.style.fontSize = "14px";
    inputContainer.appendChild(commandInput);

    // Add a close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.style.position = "absolute";
    closeButton.style.top = "5px";
    closeButton.style.right = "10px";
    closeButton.style.backgroundColor = "#ff4d4d";
    closeButton.style.color = "#ffffff";
    closeButton.style.border = "none";
    closeButton.style.padding = "5px 10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "12px";
    closeButton.addEventListener("click", () => {
        terminal.remove();
    });
    terminal.appendChild(closeButton);

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
9. spam: Initiate URL spammer. Use with caution!
10. 3D: Launch a cool 3D visual effect.
11. crash: Crash the page and make it unresponsive.
12. showCookies: Display the user's cookies.
13. spamWindows: Open multiple tabs of a specified website.
`,

        clear: () => {
            logArea.innerHTML = "";
            return "Terminal cleared.";
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
            const spamOption = prompt(
                "Choose an option: Enter '1' for Auto Spammer or '2' for Manual Spammer"
            );

            if (spamOption === "1") {
                const targetUrl = prompt("Enter the URL you want to auto spam:", "https://");
                if (targetUrl) {
                    const autoProceed = confirm(
                        "Warning: Auto spamming tabs will freeze your computer. Proceed?"
                    );
                    if (autoProceed) {
                        console.log("Starting auto spammer. Close the browser to stop.");
                        while (true) {
                            window.open(targetUrl, "_blank");
                        }
                    } else {
                        return "Operation canceled.";
                    }
                } else {
                    return "Invalid URL. Operation canceled.";
                }
            } else if (spamOption === "2") {
                const targetUrl = prompt("Enter the URL to spam:", "https://");
                const openCount = parseInt(
                    prompt("Enter how many times to open the URL:", "10"),
                    10
                );
                if (targetUrl && openCount > 0) {
                    if (openCount > 999) {
                        const proceed = confirm(
                            "Opening the URL 1000+ times may freeze your computer. Proceed?"
                        );
                        if (!proceed) return "Operation canceled.";
                    }
                    for (let i = 0; i < openCount; i++) {
                        window.open(targetUrl, "_blank");
                    }
                    return `Opened ${targetUrl} ${openCount} times.`;
                } else {
                    return "Invalid input. Operation canceled.";
                }
            } else {
                return "Invalid option. Please choose '1' or '2'.";
            }
        },

        showCookies: () => {
            const cookies = document.cookie;
            return cookies ? `Cookies: ${cookies}` : "No cookies found.";
        },

        spamWindows: () => {
            const targetUrl = prompt("Enter the website URL to spam (must start with https://):");
            if (targetUrl && targetUrl.startsWith("https://")) {
                alert("Spamming windows! Close your browser to stop.");
                while (true) {
                    window.open(targetUrl, "_blank");
                }
            } else {
                return "Invalid URL. Please enter a valid URL starting with https://";
            }
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
                    // Run predefined command
                    output.textContent = `> ${input}\n${commands[cmd](...args)}`;
                } else {
                    // Fallback to evaluate custom JavaScript
                    const result = eval(input);
                    output.textContent = `> ${input}\n${result}`;
                }
            } catch (error) {
                // Handle errors
                output.textContent = `> ${input}\nError: ${error.message}`;
            }

            logArea.appendChild(output);
            commandInput.value = "";
            logArea.scrollTop = logArea.scrollHeight;
        }
    });
})();

