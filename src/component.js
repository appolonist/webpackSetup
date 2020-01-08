export default (text = "Helo karol") => {
    const element = document.createElement("div");
    element.className = "pure-button";
    element.innerHTML = text;
    return element;
}