// Fetch the user's IP address
fetch('https://api.ipify.org?format=json') // Get the user's public IP
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    const userIP = data.ip; // Get the user's IP address

    // URL of the code to be fetched
    const codeURL = 'https://raw.githubusercontent.com/TheLazySquid/GimkitCheat/refs/heads/main/build/bundle.js';

    // Fetching the code from the specified URL
    return fetch(codeURL)
      .then(response => response.text()) // Get the response as text
      .then(codeContent => {
        // Logging the user's IP and the fetched code to the console
        console.log('User IP:', userIP);
        console.log('Code Content from URL:\n', codeContent);

        // Optionally display the code in an alert or on the page
        alert(`User IP: ${userIP}\n\nCode Content:\n${codeContent}`);

        // Displaying the code on the page
        document.body.innerHTML = `<h2>Your IP: ${userIP}</h2><pre>${codeContent}</pre>`;
      });
  })
  .catch(error => {
    // Handle any errors that occur during the fetch
    console.error('Error:', error);
  });
