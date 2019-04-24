// https://github.com/eavichay/showroom-demo
customElements.define('countdown-component', class extends HTMLElement {
  constructor() {
    super();
    this.timeLeft = 0;
    this.updateOn = 0;
    this.startTime = null;
    this.endTime = null;
    this.interval = null;
    this.text = document.createTextNode('');
  }

  static get observedAttributes() {
    return ['time'];
  }

  attributeChangedCallback(attr, oldVal, newValue) {
    this.stop();
    this.timeLeft = parseInt(newValue, 10);
  }

  connectedCallback() {
    this.appendChild(this.text);
    this.text.nodeValue = (this.timeLeft / 1000).toFixed(2).split('.').join(':');
  }

  /**
   * @param {number} time in milliseconds
   * @param {number} updateOn milliseconds for each update. Defaults to 200 ms
   */
  start(time, updateOn = 50) {
    this.timeLeft = time;
    if (!time) {
      this.timeLeft = parseInt(this.getAttribute('time'), 10);
    }
    this.startTime = new Date().valueOf();
    this.endTime = new Date().valueOf() + this.timeLeft;
    this.updateOn = updateOn;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.dispatchEvent(new CustomEvent('onstart', {
      detail: this.timeLeft,
    }));
    this.resume();
  }

  stop(dispatch = true) {
    clearInterval(this.interval);
    this.interval = null;
    this.removeAttribute('running');
    if (this.timeLeft <= 0) {
      this.setAttribute('complete', '');
    }
    if (dispatch) {
      this.dispatchEvent(new CustomEvent('onstop', {
        detail: this.endTime - this.startTime,
      }));
    }
  }

  resume() {
    this.removeAttribute('complete');
    this.setAttribute('running', '');
    this.interval = setInterval(() => {
      this.update();
    }, this.updateOn);
    this.update();
  }

  update() {
    const now = new Date().valueOf();
    this.timeLeft = this.endTime - now;
    if (this.timeLeft < 0) {
      this.text.nodeValue = '0:00';
      this.stop(false);
      this.dispatchEvent(new CustomEvent('ontimeout', {
        detail: this.startTime,
      }));
    } else {
      this.text.nodeValue = (this.timeLeft / 1000).toFixed(2).split('.').join(':');
      this.dispatchEvent(new CustomEvent('ontick', {
        detail: this.timeLeft,
      }));
    }
  }
});
