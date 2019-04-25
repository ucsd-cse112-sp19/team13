const coreHelloElements = document.getElementsByTagName('core-hello');

export default function addPrefix() {
  let i;
  for (i = 0; i < coreHelloElements.length; i += 1) {
    coreHelloElements[i].textContent = `Hello World ${coreHelloElements[i].textContent}`;
  }
}
