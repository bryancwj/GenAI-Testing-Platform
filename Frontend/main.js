const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");
const fileInput = document.getElementById("fileInput");

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

    // ⏳ Placeholder while GenAI responds
    const thinkingMsg = document.createElement("div");
    thinkingMsg.classList.add("message", "bot");
    thinkingMsg.textContent = "Thinking...";
    chatMessages.appendChild(thinkingMsg);

    try {
        // THIS is where your GenAI API call will go
        // const response = await fetch("/api/chat", { ... })

        setTimeout(() => {
            thinkingMsg.textContent = "This is where the GenAI response will appear.";
        }, 1000);

    } catch (err) {
        thinkingMsg.textContent = "Error contacting AI service.";
    }
});

function addSystemMessage(text) {
    const msg = document.createElement("div");
    msg.className = "message system";
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    console.log("file Name: ", file.name);
    console.log("file type: ", file.type);

    const allowedTypes = [
        "application/pdf", // .pdf document
        "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX document
        "application/msword", // .doc document
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx document
        "application/vnd.ms-powerpoint" // .ppt document 
    ];

    const MAX_SIZE = 20 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
        addSystemMessage("Only PDF, PPTX, DOC, DOCX files are supported.")
        fileInput.value = "";
        return;
    }

    if (file.size > MAX_SIZE) {
        addSystemMessage("File too large, Max size is 20MB.");
        fileInput.value = "";
        return;
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

    }

    addSystemMessage(`File Selected: ${file.name} (${formatFileSize(file.size)})`);
})
