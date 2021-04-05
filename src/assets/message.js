class Message {
  messageElement;
  interval;

  constructor() {
    this.messageElement = document.createElement('div');
    this.messageElement.className = 'msg_window unselectable';
    this.messageElement.innerHTML = `<div class="msg"></div><div class="msg_closer" onclick="message.hide()">×</div>`;
    document.body.appendChild(this.messageElement);
  }

  show(message, status) {
    this.messageElement.querySelector('.msg').innerHTML = message;
    if ( status === -1) {
      try {
        window.navigator.vibrate(30);
      } catch (e) {
        console.log(e);
      }
    }
    this.messageElement.classList.add('msg_visible');
    this.interval = window.setInterval(() => {
      this.hide();
    }, 6000)
  }

  hide() {
    clearInterval(this.interval);
    this.messageElement.classList.remove('msg_visible');
  }
}

window.message = new Message();
