import Block from "./block";

export default function renderDOM(block: Block, target: string = "#app") {
    const root = document.querySelector(target);
    if (root && block) {
        root.innerHTML = "";
        root.appendChild(block.getContent());
    }
}