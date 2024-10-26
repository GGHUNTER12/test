// Copy the specified cheat code to clipboard after password verification
window.copyCheatCode = function(url, message) {
    const password = getPassword();
    if (password) {
        const userPassword = prompt("Enter your password:");
        if (userPassword === password) {
            fetch(url)
                .then(response => response.text())
                .then(code => {
                    // Ensure the document is focused before copying
                    if (!document.hasFocus()) {
                        alert("Please click back into the page to copy the code.");
                    } else {
                        navigator.clipboard.writeText(code).then(() => {
                            alert(`${message} has been copied to your clipboard!`);
                        }).catch(err => {
                            console.error("Clipboard write failed: ", err);
                            alert("Failed to copy cheat code.");
                        });
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch and copy cheat code: ", err);
                    alert("Failed to copy cheat code.");
                });
        } else {
            alert("Incorrect password. The code was not copied.");
        }
    }
};
