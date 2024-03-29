class Notification {
  messageElement;
  interval;

  constructor() {
    this.messageElement = document.createElement('div');
    this.messageElement.className = 'notif unselectable';
    this.messageElement.innerHTML = `<div class="c"></div><div class="closer" onclick="message.hide()">×</div>`;
    document.body.appendChild(this.messageElement);
  }

  show(message, status) {
    this.hide();
    this.messageElement.querySelector('div').innerHTML = message;
    if ( status === -1) {
      try {
        window.navigator.vibrate(30);
      } catch (ignore) {}
    }
    this.messageElement.classList.add('visible');
    this.interval = window.setInterval(() => {
      this.hide();
    }, 6000)
  }

  hide() {
    clearInterval(this.interval);
    this.messageElement.classList.remove('visible');
  }
}

window.message = new Notification();

window.goTo = function (elementId, behavior = 'smooth') {
  try {
    document.getElementById(elementId).scrollIntoView({
      behavior: behavior,
      block: 'start'
    })
  } catch (e) {
    try {
      document.getElementById(elementId).scrollIntoView();
    } catch (ignore) {}
  }
}
