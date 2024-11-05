// sidebarToggle.js
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const logoIcon = sidebar.querySelector('.icon:first-child'); // Get the logo icon

    logoIcon.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed'); // Toggle the 'collapsed' class
    });
});
