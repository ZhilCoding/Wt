const form = document.querySelector('#message-form');
const input = document.querySelector('#user-message');
const chatlog = document.querySelector('.chatlog');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = input.value;
  input.value = '';

  if (message.trim() === '') {
    return;
  }

  const chat = document.createElement('div');
  chat.classList.add('chat', 'self');

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  chat.appendChild(bubble);

  const loader = document.createElement('div');
  loader.classList.add('loader');
  bubble.appendChild(loader);

  chatlog.appendChild(chat);
  chatlog.scrollTop = chatlog.scrollHeight;

  fetch(`https://api.akuari.my.id/simi/simi?query=${message}`)
    .then(response => response.json())
    .then(data => {
      bubble.removeChild(loader);

      const reply = document.createElement('p');
      reply.textContent = data.response;
      bubble.appendChild(reply);

      const responseChat = document.createElement('div');
      responseChat.classList.add('chat');

      const responseBubble = document.createElement('div');
      responseBubble.classList.add('bubble');
      responseChat.appendChild(responseBubble);

      const responseLoader = document.createElement('div');
      responseLoader.classList.add('loader');
      responseBubble.appendChild(responseLoader);

      chatlog.appendChild(responseChat);
      chatlog.scrollTop = chatlog.scrollHeight;

      setTimeout(() => {
        responseBubble.removeChild(responseLoader);

        const responseReply = document.createElement('p');
        responseReply.textContent = data.response;
        responseBubble.appendChild(responseReply);

        chatlog.scrollTop = chatlog.scrollHeight;
      }, 1000);
    })
    .catch(error => console.error(error));
});
