// Background changer logic
document.getElementById('backgroundChanger').onclick = () => {
    const newBackground = prompt('Enter a new background image URL:');
    if (newBackground) {
        document.body.style.backgroundImage = `url(${newBackground})`;
    }
};
