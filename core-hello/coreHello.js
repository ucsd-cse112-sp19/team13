var coreHelloElements = document.getElementsByTagName("core-hello");

export function addPrefix() {
    var i;
    for (i = 0; i < coreHelloElements.length; i++) {
        coreHelloElements[i].textContent = "Hello World " + coreHelloElements[i].textContent;
    }
}