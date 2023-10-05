const topics = {};

const userColors = {}; // Mapeia nomes de usuário para cores

let currentUser = "";

function createUser() {
    const username = document.getElementById("username").value;
    if (username) {
        currentUser = username;
        userColors[currentUser] = getRandomColor(); // Gera uma cor única para o usuário
        document.getElementById("username").disabled = true;
        document.getElementById("user-form").style.display = "none";
    }
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createTopic() {
    const title = document.getElementById("topic-title").value;
    if (title) {
        topics[title] = [];
        updateTopicList();
        document.getElementById("topic-title").value = "";
    }
}

function updateTopicList() {
    const selectTopic = document.getElementById("select-topic");
    selectTopic.innerHTML = '<option value="" disabled selected>Selecione um tópico</option>';
    
    for (const topic in topics) {
        const option = document.createElement("option");
        option.value = topic;
        option.innerText = topic;
        selectTopic.appendChild(option);
    }
}

function loadMessages() {
    const selectedTopic = document.getElementById("select-topic").value;
    const topicMessages = topics[selectedTopic] || [];
    const topicDiv = document.getElementById("topics");
    
    topicDiv.innerHTML = "";

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    topicMessages.forEach(message => {
        const p = document.createElement("p");
        p.innerHTML = `<strong style="color: ${userColors[message.user] || 'black'}">${message.user}:</strong> <span style="color: ${userColors[message.user] || 'black'}">${message.text}</span>`;
        messageDiv.appendChild(p);

        if (message.image) {
            const img = document.createElement("img");
            img.src = message.image;
            messageDiv.appendChild(img);
        }
    });

    // Adicione a função addMessage de volta ao código
    const inputMessage = document.createElement("input");
    inputMessage.type = "text";
    inputMessage.placeholder = "Sua Mensagem";
    inputMessage.id = "message";
    
    const inputImage = document.createElement("input");
    inputImage.type = "file";
    inputImage.id = "image";
    
    const sendMessageButton = document.createElement("button");
    sendMessageButton.innerText = "Enviar Mensagem";
    sendMessageButton.onclick = () => addMessage(selectedTopic);
    
    messageDiv.appendChild(inputMessage);
    messageDiv.appendChild(inputImage);
    messageDiv.appendChild(sendMessageButton);
    
    topicDiv.appendChild(messageDiv);
}

function addMessage(topicTitle) {
    const messageText = document.getElementById("message").value;
    const imageFile = document.getElementById("image").files[0];

    if (messageText || imageFile) {
        const message = {
            text: messageText,
            image: imageFile ? URL.createObjectURL(imageFile) : null,
            user: currentUser,
        };

        topics[topicTitle].push(message);
        loadMessages();
        document.getElementById("message").value = "";
        document.getElementById("image").value = "";
    }
}

// Restante do seu código original (funções de estilização, etc.)
