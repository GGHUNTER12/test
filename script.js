// Function to change the iframe source
function changeIframe(url) {
    document.getElementById('contentFrame').src = url;
}

// Function to copy text to clipboard and show alert
function copyToClipboard(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('You copied the code for ' + url);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Keypress event listener
document.addEventListener('keydown', function(event) {
    if (event.key === 's') {
        alert('PRESS KEYBOARD LETTER "S" TO RELOAD THE PAGE (SUCCESSFULLY LOADED SECURED BROWSER VERSION)');
        location.reload();
        window.open('chrome://newtab', '_blank');
    }
});

// Displaying a console message
console.log("BROWSER 69 VERSION LOADED");

// Password handling (for cookies)
let password = localStorage.getItem('password');
if (!password) {
    password = prompt("Create a password:");
    localStorage.setItem('password', password);
}

// Change password function
function changePassword() {
    const newPassword = prompt("Enter your new password:");
    localStorage.setItem('password', newPassword);
}
