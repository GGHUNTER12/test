// Create a movable and resizable panel
const panel = document.createElement('div');
panel.style.position = 'fixed';
panel.style.top = '0';
panel.style.left = '0';
panel.style.width = '479px';
panel.style.height = '299px';
panel.style.backgroundColor = '#89CFF0';
panel.style.border = '5px solid black';
panel.style.zIndex = '2147483646';
panel.style.resize = 'both';
panel.style.overflow = 'auto';
panel.style.padding = '5px';
panel.style.boxSizing = 'border-box';
panel.style.borderRadius = '15px';
panel.style.fontFamily = 'Google Sans, Arial, sans-serif';

// Create close button
const closeButton = document.createElement('button');
closeButton.innerText = 'Close';
closeButton.style.cursor = 'pointer';
closeButton.style.backgroundColor = '#FF5733';
closeButton.style.color = 'white';
closeButton.style.border = 'none';
closeButton.style.borderRadius = '10px';
closeButton.style.padding = '5px 10px';
closeButton.style.fontSize = '14px';
closeButton.style.transition = 'background-color 0.3s';
closeButton.style.marginRight = '10px';

// Create drag handle
const dragHandle = document.createElement('button');
dragHandle.innerText = 'Drag';
dragHandle.style.cursor = 'grab';
dragHandle.style.backgroundColor = '#FFC300';
dragHandle.style.color = 'black';
dragHandle.style.border = 'none';
dragHandle.style.borderRadius = '10px';
dragHandle.style.padding = '5px 15px';
dragHandle.style.fontSize = '14px';
dragHandle.style.transition = 'background-color 0.3s';
dragHandle.style.marginRight = '10px';

// Create reload button
const reloadButton = document.createElement('button');
reloadButton.innerText = 'Reload';
reloadButton.style.cursor = 'pointer';
reloadButton.style.backgroundColor = '#4169e1';
reloadButton.style.color = 'white';
reloadButton.style.border = 'none';
reloadButton.style.borderRadius = '10px';
reloadButton.style.padding = '5px 10px';
reloadButton.style.fontSize = '14px';
reloadButton.style.transition = 'background-color 0.3s';
reloadButton.style.marginRight = '10px';

// Create search bar
const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.placeholder = 'Enter URL';
searchBar.style.borderRadius = '15px';
searchBar.style.border = '1px solid #ccc';
searchBar.style.padding = '5px';
searchBar.style.fontFamily = 'Google Sans, Arial, sans-serif';
searchBar.style.flexGrow = '1';
searchBar.style.marginRight = '10px';

// Create profile picture
const profilePic = document.createElement('img');
profilePic.src = localStorage.getItem('profilePic') || 'https://www.mobile-calendar.com/img/main/user.webp'; // Load from localStorage
profilePic.alt = 'Profile Picture';
profilePic.style.width = '40px';
profilePic.style.height = '40px';
profilePic.style.borderRadius = '50%';
profilePic.style.cursor = 'pointer';

// Create profile menu
const profileMenu = document.createElement('div');
profileMenu.style.position = 'absolute';
profileMenu.style.backgroundColor = 'white';
profileMenu.style.border = '1px solid #ccc';
profileMenu.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
profileMenu.style.padding = '10px';
profileMenu.style.borderRadius = '10px';
profileMenu.style.display = 'none';
profileMenu.style.zIndex = '2147483647';
profileMenu.style.fontFamily = 'Google Sans, Arial, sans-serif';

const menuItem1 = document.createElement('div');
menuItem1.innerText = 'Profile';
menuItem1.style.padding = '5px 0';
menuItem1.style.cursor = 'pointer';

const menuItem2 = document.createElement('div');
menuItem2.innerText = 'Settings';
menuItem2.style.padding = '5px 0';
menuItem2.style.cursor = 'pointer';

const menuItem3 = document.createElement('div');
menuItem3.innerText = 'History';
menuItem3.style.padding = '5px 0';
menuItem3.style.cursor = 'pointer';

profileMenu.appendChild(menuItem1);
profileMenu.appendChild(menuItem2);
profileMenu.appendChild(menuItem3);
document.body.appendChild(profileMenu);

// Load the history of URLs from localStorage
let urlHistory = JSON.parse(localStorage.getItem('urlHistory')) || [];

// Function to save URL history to localStorage
function saveUrlHistory() {
  localStorage.setItem('urlHistory', JSON.stringify(urlHistory));
}

// Function to update the profile menu position
function updateProfileMenuPosition() {
  const rect = profilePic.getBoundingClientRect();
  profileMenu.style.top = `${rect.bottom + window.scrollY}px`;
  profileMenu.style.left = `${rect.left + window.scrollX}px`;
}

// Toggle profile menu visibility when clicking the profile picture
profilePic.addEventListener('click', () => {
  updateProfileMenuPosition();
  profileMenu.style.display = profileMenu.style.display === 'none' ? 'block' : 'none';
});

// Hide profile menu when clicking outside
document.addEventListener('click', (event) => {
  if (!profilePic.contains(event.target) && !profileMenu.contains(event.target)) {
    profileMenu.style.display = 'none';
  }
});

// Change close button color on hover
closeButton.addEventListener('mouseover', () => {
  closeButton.style.backgroundColor = '#C70039';
});

closeButton.addEventListener('mouseout', () => {
  closeButton.style.backgroundColor = '#FF5733';
});

// Change drag button color on hover
dragHandle.addEventListener('mouseover', () => {
  dragHandle.style.backgroundColor = '#FFB300';
});

dragHandle.addEventListener('mouseout', () => {
  dragHandle.style.backgroundColor = '#FFC300';
});

// Change reload button color on hover
reloadButton.addEventListener('mouseover', () => {
  reloadButton.style.backgroundColor = '#1f44b5';
});

reloadButton.addEventListener('mouseout', () => {
  reloadButton.style.backgroundColor = '#4169e1';
});

// Create iframe for displaying content
const iframe = document.createElement('iframe');
iframe.src = 'https://gooogleserver-as3.macgyver.cf/';
iframe.style.width = '100%';
iframe.style.height = 'calc(100% - 100px)';
iframe.style.borderRadius = '10px';
iframe.frameBorder = '0';
iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
iframe.allowFullscreen = true;

// Create text label below the video
const textLabel = document.createElement('div');
textLabel.innerText = 'made by your fav coder (snoopy)💯💯 and with AI help';
textLabel.style.color = 'white';
textLabel.style.marginTop = '5px';
textLabel.style.textAlign = 'center';
textLabel.style.fontFamily = 'Google Sans, Arial, sans-serif';

// Create a container for buttons and search bar
const controlsContainer = document.createElement('div');
controlsContainer.style.display = 'flex';
controlsContainer.style.alignItems = 'center';
controlsContainer.style.marginBottom = '10px';

// Append elements to the controls container
controlsContainer.appendChild(closeButton);
controlsContainer.appendChild(dragHandle);
controlsContainer.appendChild(reloadButton);
controlsContainer.appendChild(searchBar);
controlsContainer.appendChild(profilePic);

// Append elements to the panel
panel.appendChild(controlsContainer);
panel.appendChild(iframe);
panel.appendChild(textLabel);
document.body.appendChild(panel);

// Function to update button sizes
function updateButtonSize() {
  dragHandle.style.width = `${panel.clientWidth / 5}px`;
  searchBar.style.width = `${panel.clientWidth - 250}px`; // Adjust search bar width dynamically
}

// Make the panel movable only when dragging the dragHandle
let isDragging = false;
let offset = { x: 0, y: 0 };

dragHandle.addEventListener('mousedown', (e) => {
  isDragging = true;
  offset.x = e.clientX - panel.getBoundingClientRect().left;
  offset.y = e.clientY - panel.getBoundingClientRect().top;
  dragHandle.style.cursor = 'grabbing'; // Change cursor style
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    panel.style.left = `${e.clientX - offset.x}px`;
    panel.style.top = `${e.clientY - offset.y}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  dragHandle.style.cursor = 'grab'; // Reset cursor style
});

// Close button functionality
closeButton.addEventListener('click', () => {
  panel.style.display = 'none'; // Hide panel
});

// Reload button functionality
reloadButton.addEventListener('click', () => {
  iframe.src = iframe.src; // Reload the iframe
});

// Search functionality
searchBar.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    let url = searchBar.value.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url; // Prepend 'https://' if not present
    }

    // Check if URL is valid
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // domain name
    'localhost|' + // localhost
    '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IP address
    '\\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\\])' + // IPv6
    '(\\:\\d+)?(\\/[-a-zA-Z0-9+&@#\\/%?=~_|!:,.;]*[a-zA-Z0-9+&@#\\/%=~_|])?');

    if (urlPattern.test(url)) {
      urlHistory.push(url);
      saveUrlHistory(); // Save URL history to localStorage
      iframe.src = url; // Change iframe source to the new URL
      searchBar.value = ''; // Clear the search bar
    } else {
      alert('Invalid URL. Please enter a valid one.');
    }
  }
});

// Profile menu functionality - history option
menuItem3.addEventListener('click', () => {
  profileMenu.style.display = 'none'; // Hide the profile menu
  panel.innerHTML = ''; // Clear the panel

  // Create a title for the history
  const historyTitle = document.createElement('h2');
  historyTitle.innerText = 'Your History :)';
  historyTitle.style.textAlign = 'center';
  historyTitle.style.color = 'black'; // Adjust color if needed

  // Create a history list
  const historyList = document.createElement('ul');
  historyList.style.listStyleType = 'none';
  historyList.style.padding = '0';

  urlHistory.forEach((url, index) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${index + 1}. ${url}`;
    listItem.style.cursor = 'pointer';
    listItem.style.padding = '5px';
    listItem.style.borderBottom = '1px solid #ccc';

    // Load URL in iframe when clicked
    listItem.addEventListener('click', () => {
      iframe.src = url;
      panel.innerHTML = '';
      panel.appendChild(controlsContainer);
      panel.appendChild(iframe);
      panel.appendChild(textLabel);
    });

    historyList.appendChild(listItem);
  });

  // Create a button to go back to the main panel UI
  const backButton = document.createElement('button');
  backButton.innerText = 'haha no going back ;)';
  backButton.style.cursor = 'pointer';
  backButton.style.backgroundColor = '#FF5733';
  backButton.style.color = 'white';
  backButton.style.border = 'none';
  backButton.style.borderRadius = '5px';
  backButton.style.padding = '5px 10px';
  backButton.style.fontSize = '14px';
  backButton.style.transition = 'background-color 0.3s';
  backButton.style.marginTop = '10px';

  // Go back to the main panel UI when the button is clicked
  backButton.addEventListener('click', () => {
    panel.innerHTML = '';
    panel.appendChild(controlsContainer);
    panel.appendChild(iframe);
    panel.appendChild(textLabel);
  });

  // Append title, history list, and back button to panel
  panel.appendChild(historyTitle);
  panel.appendChild(historyList);
  panel.appendChild(backButton);
});

// Drag-and-drop functionality for setting the profile picture
profilePic.addEventListener('dragover', (event) => {
  event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
  profilePic.style.opacity = '0.5'; // Visual feedback
});

profilePic.addEventListener('dragleave', () => {
  profilePic.style.opacity = '1'; // Reset opacity
});

profilePic.addEventListener('drop', (event) => {
  event.preventDefault();
  profilePic.style.opacity = '1'; // Reset opacity

  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];

    // Check if the dropped file is an image
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profilePic.src = e.target.result; // Set the new profile pic
        localStorage.setItem('profilePic', e.target.result); // Save it in localStorage
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
      alert('Please drop an image file.');
    }
  }
});

// Initial cursor style for the panel
dragHandle.style.cursor = 'grab';

// Variable to track panel visibility
let panelVisible = true;

// Track if "s" and "g" keys are pressed
let sPressed = false;
let gPressed = false;

// Add event listener for keydown to detect both "s" and "g" being pressed
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 's') sPressed = true;
  if (event.key.toLowerCase() === 'g') gPressed = true;

  if (sPressed && gPressed) {
    panelVisible = !panelVisible;
    panel.style.display = panelVisible ? 'block' : 'none';
  }
});

// Add event listener for keyup to reset keys
document.addEventListener('keyup', (event) => {
  if (event.key.toLowerCase() === 's') sPressed = false;
  if (event.key.toLowerCase() === 'g') gPressed = false;
});

// Show initial prompt
alert("UI Frame by snoopy | Use keys 'S' + 'G' to hide or unhide the UI");

// Update iframe size and search bar size when the panel is resized
new ResizeObserver(() => {
  iframe.style.height = `calc(${panel.clientHeight}px - 100px)`;
  updateButtonSize();
}).observe(panel);

// Initial size adjustment
updateButtonSize();
