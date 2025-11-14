(function () {
    // CSS
    const style = document.createElement('style');
    style.innerHTML = `
    #chat-toggle { position: fixed; bottom: 20px; right: 20px; background:#007bff; color:#fff; border:none; padding:12px 16px; border-radius:50%; cursor:pointer; font-size:18px; z-index:9999;}
    #chat-box {position:fixed;bottom:70px;right:20px;width:300px;height:400px;background:white;border:1px solid #ccc;border-radius:8px;display:none;flex-direction:column;overflow:hidden;z-index:9999;box-shadow:0 4px 10px rgba(0,0,0,0.2);}
    #chat-messages {flex:1;padding:10px;overflow-y:auto;}
    #chat-input {display:flex;border-top:1px solid #ccc;}
    #chat-input input {flex:1;padding:8px;border:none;outline:none;}
    #chat-input button {padding:8px 12px;border:none;background:#007bff;color:white;cursor:pointer;}
    .chat-message {margin-bottom:8px;}
    .chat-message span {font-weight:bold;}
  `;
    document.head.appendChild(style);

    // Button
    const btn = document.createElement('button');
    btn.id = 'chat-toggle';
    btn.innerText = '💬';
    document.body.appendChild(btn);

    // Chat box
    const box = document.createElement('div');
    box.id = 'chat-box';
    box.innerHTML = `
    <div id="chat-messages"></div>
    <div id="chat-input">
      <input type="text" id="chat-text" placeholder="Type a message..."/>
      <button id="chat-send">Send</button>
    </div>
  `;
    document.body.appendChild(box);

    // JS logic
    const toggleBtn = btn;
    const chatBox = box;
    toggleBtn.addEventListener('click', () => {
        chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
        if (chatBox.style.display === 'flex') chatBox.style.display = 'flex';
    });

    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
        visitorId = 'visitor-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('visitorId', visitorId);
    }

    const messagesDiv = document.getElementById('chat-messages');
    const input = document.getElementById('chat-text');
    const sendBtn = document.getElementById('chat-send');

    let chatHistory = JSON.parse(localStorage.getItem('chatHistory_' + visitorId) || '[]');

    function renderMessages() {
        messagesDiv.innerHTML = '';
        chatHistory.forEach(m => {
            const div = document.createElement('div');
            div.className = 'chat-message';
            div.innerHTML = `<span>${m.sender}:</span> ${m.text}`;
            messagesDiv.appendChild(div);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    renderMessages();

    sendBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;
        chatHistory.push({ sender: 'You', text });
        localStorage.setItem('chatHistory_' + visitorId, JSON.stringify(chatHistory));
        renderMessages();
        input.value = '';
        console.log('Send message:', text, 'visitorId:', visitorId);
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
    });
})();
