const responseContainer = document.getElementById('responseContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', async () => {
    const userInput = searchInput.value.trim();
    if (userInput) {
        responseContainer.innerHTML += `<div>You: ${userInput}</div>`;
        searchInput.value = ''; // Clear input field

        // Show loading indicator
        const loadingMessage = document.createElement('div');
        loadingMessage.innerHTML = 'Bot is typing...';
        loadingMessage.classList.add('loading');
        responseContainer.appendChild(loadingMessage);
        responseContainer.scrollTop = responseContainer.scrollHeight; // Scroll to the bottom

        const response = await getChatbotResponse(userInput);
        // Remove loading message
        responseContainer.removeChild(loadingMessage);
        
        responseContainer.innerHTML += `<div>Bot: ${response}</div>`;
        responseContainer.scrollTop = responseContainer.scrollHeight; // Scroll to the bottom
    }
});

async function getChatbotResponse(prompt) {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    const data = await response.json();
    if (data.type === 'single') {
        return data.joke; // Return a single joke
    } else {
        return `${data.setup} - ${data.delivery}`; // Return setup and delivery for two-part jokes
    }
}
