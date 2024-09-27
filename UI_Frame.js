// Create a movable and resizable panel
const panel = document.createElement('div');
panel.style.position = 'fixed';
panel.style.top = '0';  // Ensure it's positioned at the top initially
panel.style.left = '0'; // Ensure it's positioned at the left initially
panel.style.width = '400px';
panel.style.height = '300px'; // Adjusted height for the video
panel.style.backgroundColor = '#89CFF0';
panel.style.border = '5px solid black';
panel.style.zIndex = '2147483647'; // Highest possible zIndex value
panel.style.resize = 'both';
panel.style.overflow = 'auto';
panel.style.padding = '5px'; // Add some padding
panel.style.boxSizing = 'border-box'; // Ensure padding doesn't affect width/height
panel.style.borderRadius = '15px'; // Add rounded corners

// Create close button
const closeButton = document.createElement('button');
closeButton.innerText = 'Close';
closeButton.style.cursor = 'pointer';
closeButton.style.backgroundColor = '#FF5733'; // Change button color
closeButton.style.color = 'white'; // Text color
closeButton.style.border = 'none'; // Remove default border
closeButton.style.borderRadius = '5px'; // Rounded corners for button
closeButton.style.padding = '5px 10px'; // Smaller padding for a compact look
closeButton.style.fontSize = '14px'; // Smaller font size
closeButton.style.transition = 'background-color 0.3s'; // Transition effect
closeButton.style.marginRight = '10px'; // Space between buttons

// Create drag handle
const dragHandle = document.createElement('button');
dragHandle.innerText = 'Drag';
dragHandle.style.cursor = 'grab';
dragHandle.style.backgroundColor = '#FFC300'; // Yellow color for drag button
dragHandle.style.color = 'black'; // Text color
dragHandle.style.border = 'none'; // Remove default border
dragHandle.style.borderRadius = '5px'; // Rounded corners for button
dragHandle.style.padding = '5px 10px'; // Smaller padding for a compact look
dragHandle.style.fontSize = '14px'; // Smaller font size
dragHandle.style.transition = 'background-color 0.3s'; // Transition effect
dragHandle.style.marginRight = '10px'; // Space between buttons

// Create reload button
const reloadButton = document.createElement('button');
reloadButton.innerText = 'Reload';
reloadButton.style.cursor = 'pointer';
reloadButton.style.backgroundColor = '#4169e1'; // Green color for reload button
reloadButton.style.color = 'white'; // Text color
reloadButton.style.border = 'none'; // Remove default border
reloadButton.style.borderRadius = '5px'; // Rounded corners for button
reloadButton.style.padding = '5px 10px'; // Padding for a compact look
reloadButton.style.fontSize = '14px'; // Smaller font size
reloadButton.style.transition = 'background-color 0.3s'; // Transition effect
reloadButton.style.marginRight = '10px'; // Space between buttons

// Create search bar
const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.placeholder = 'Enter URL';
searchBar.style.width = '150px'; // Set a fixed width for the search bar
searchBar.style.borderRadius = '5px'; // Rounded corners
searchBar.style.border = '1px solid #ccc'; // Light border
searchBar.style.padding = '5px'; // Padding for the input field

// Change close button color on hover
closeButton.addEventListener('mouseover', () => {
  closeButton.style.backgroundColor = '#C70039'; // Darker red on hover
});

closeButton.addEventListener('mouseout', () => {
  closeButton.style.backgroundColor = '#FF5733'; // Reset color
});

// Change drag button color on hover
dragHandle.addEventListener('mouseover', () => {
  dragHandle.style.backgroundColor = '#FFB300'; // Darker yellow on hover
});

dragHandle.addEventListener('mouseout', () => {
  dragHandle.style.backgroundColor = '#FFC300'; // Reset color
});

// Change reload button color on hover
reloadButton.addEventListener('mouseover', () => {
  reloadButton.style.backgroundColor = '#1f44b5'; // Darker green on hover
});

reloadButton.addEventListener('mouseout', () => {
  reloadButton.style.backgroundColor = '#4169e1'; // Reset color
});

// Create iframe for displaying content
const iframe = document.createElement('iframe');
iframe.src = 'https://gghunter12.github.io/test/YouTube.html'; // Default URL
iframe.style.width = '100%'; // 100% of the panel's width
iframe.style.height = 'calc(100% - 100px)'; // Adjust height dynamically, leaving space for buttons and padding
iframe.style.borderRadius = '10px'; // Curved edges for the iframe
iframe.frameBorder = '0';
iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
iframe.allowFullscreen = true;

// Create text label below the video
const textLabel = document.createElement('div');
textLabel.innerText = 'made by your fav coder (snoopy)💯💯 and with AI help';
textLabel.style.color = 'white'; // Set text color
textLabel.style.marginTop = '5px'; // Space between video and text
textLabel.style.textAlign = 'center'; // Center the text

// Create a container for buttons and search bar
const controlsContainer = document.createElement('div');
controlsContainer.style.display = 'flex'; // Arrange buttons side by side
controlsContainer.style.alignItems = 'center'; // Center align buttons vertically
controlsContainer.style.marginBottom = '10px'; // Space below the controls

// Append elements to the controls container
controlsContainer.appendChild(closeButton);
controlsContainer.appendChild(dragHandle);
controlsContainer.appendChild(reloadButton); // Append reload button
controlsContainer.appendChild(searchBar); // Append the search bar next to the drag button

// Append controls to the panel
panel.appendChild(controlsContainer); // Append controls container
panel.appendChild(iframe);
panel.appendChild(textLabel);
document.body.appendChild(panel);

// Function to update the size of the drag button
function updateButtonSize() {
  const panelWidth = panel.clientWidth;
  dragHandle.style.width = `${panelWidth / 4 - 20}px`; // Adjust width of drag button
}

// Make the panel movable only when dragging the dragHandle
let isDragging = false;
let offset = { x: 0, y: 0 };

dragHandle.addEventListener('mousedown', (e) => {
  isDragging = true;
  offset.x = e.clientX - panel.getBoundingClientRect().left;
  offset.y = e.clientY - panel.getBoundingClientRect().top;
  dragHandle.style.cursor = 'grabbing'; // Change cursor while dragging
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    panel.style.left = `${e.clientX - offset.x}px`;
    panel.style.top = `${e.clientY - offset.y}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  dragHandle.style.cursor = 'grab'; // Reset cursor
});

// Close button functionality - removes itself from the DOM
closeButton.addEventListener('click', () => {
  closeButton.remove(); // Remove the close button
  panel.remove(); // Remove the panel
});

// Reload button functionality - reloads the iframe
reloadButton.addEventListener('click', () => {
  iframe.src = iframe.src; // Reloads the iframe's content
});

// Search bar functionality - change iframe source on input
searchBar.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const url = searchBar.value;
    iframe.src = url; // Set the iframe's src to the value in the search bar
    searchBar.value = ''; // Clear the search bar after submission
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
    panelVisible = !panelVisible; // Toggle the visibility state
    panel.style.display = panelVisible ? 'block' : 'none'; // Show or hide the panel based on state
  }
});

// Add event listener for keyup to reset keys
document.addEventListener('keyup', (event) => {
  if (event.key.toLowerCase() === 's') sPressed = false;
  if (event.key.toLowerCase() === 'g') gPressed = false;
});

// Show initial prompt
alert("UI Frame by snoopy | Use keys 'S' + 'G' to hide or unhide the UI");

// Update iframe size when the panel is resized
new ResizeObserver(() => {
  iframe.style.height = `calc(${panel.clientHeight}px - 100px)`; // Adjust iframe height
  updateButtonSize(); // Update the drag button size
}).observe(panel);

// Initial size adjustment
updateButtonSize();
