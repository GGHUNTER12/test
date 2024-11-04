document.onkeydown = (e) => {
    if (e.key == 123) e.preventDefault(); // Prevent F12
    if (e.ctrlKey && e.shiftKey && e.key == 'I') e.preventDefault(); // Prevent Ctrl + Shift + I
    if (e.ctrlKey && e.shiftKey && e.key == 'C') e.preventDefault(); // Prevent Ctrl + Shift + C
    if (e.ctrlKey && e.key == 'U') e.preventDefault(); // Prevent Ctrl + U
    if (e.ctrlKey && e.key == 'S') e.preventDefault(); // Prevent Ctrl + S
    if (e.ctrlKey && e.key == 'P') e.preventDefault(); // Prevent Ctrl + P
};
