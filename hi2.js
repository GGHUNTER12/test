// Ask the user to choose between auto or manual spammer
const spamOption = prompt("Choose an option: Enter '1' for Auto Spammer or '2' for Manual Spammer");

if (spamOption === '1') {
    // Prefill the URL prompt for Auto Spammer
    const targetUrl = prompt("Enter the URL you want to auto spam in your history:", "https://");

    if (targetUrl) {
        // Show the warning after URL input
        const autoProceed = confirm("Warning: Auto spamming tabs will freeze your computer and may severely affect its performance. Do you want to proceed?");
        
        if (autoProceed) {
            console.log("Starting auto spammer. To stop, you may need to close your browser.");
            while (true) {
                window.open(targetUrl, '_blank');
            }
        } else {
            console.log("Operation canceled by the user.");
        }
    } else {
        console.log("Invalid URL. Operation canceled.");
    }
    
} else if (spamOption === '2') {
    // Manual Spammer
    const targetUrl = prompt("Enter the URL of the website you want to spam in your history:", "https://");
    let openCount = parseInt(prompt("Enter how many times you want this URL to appear in your history:"), 10);
    
    if (targetUrl && openCount > 0) {
        // Warning if the open count is very high
        if (openCount > 999) {
            const proceed = confirm("Warning: Opening the URL 1000+ times may freeze your computer and severely affect its performance. Do you want to proceed?");
            if (!proceed) {
                console.log("Operation canceled by the user.");
            } else {
                for (let i = 0; i < openCount; i++) {
                    window.open(targetUrl, '_blank');
                }
                console.log(`Opened ${targetUrl} ${openCount} times.`);
            }
        } else {
            for (let i = 0; i < openCount; i++) {
                window.open(targetUrl, '_blank');
            }
            console.log(`Opened ${targetUrl} ${openCount} times.`);
        }
    } else {
        console.log("Invalid input. Please enter a valid URL and number.");
    }
    
} else {
    console.log("Invalid option. Please refresh and enter '1' for Auto Spammer or '2' for Manual Spammer.");
}
