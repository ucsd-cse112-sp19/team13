const coreHelloElements = document.getElementsByTagName('core-hello');

export function addPrefix() {
  let i;
  for (i = 0; i < coreHelloElements.length; i += 1) {
    coreHelloElements[i].textContent = `Hello World ${coreHelloElements[i].textContent}`;
  }
}
