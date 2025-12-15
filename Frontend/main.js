const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    userInput.value = "";

    // ? Placeholder while GenAI responds
    const thinkingMsg = document.createElement("div");
    thinkingMsg.classList.add("message", "bot");
    thinkingMsg.textContent = "Thinking...";
    chatMessages.appendChild(thinkingMsg);

    try {
        // ?? THIS is where your GenAI API call will go
        // const response = await fetch("/api/chat", { ... })

        setTimeout(() => {
            thinkingMsg.textContent = "This is where the GenAI response will appear.";
        }, 1000);

    } catch (err) {
        thinkingMsg.textContent = "Error contacting AI service.";
    }
});
