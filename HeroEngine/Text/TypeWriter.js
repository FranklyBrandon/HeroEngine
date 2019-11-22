class TypeWriter {
    constructor(x, y){
        this.type = document.createElement("p");  
        this.type.setAttribute("id", "elTypeWriter");
        this.type.style.position = 'absolute';
        this.type.style.top = y + 'px';
        this.type.style.left = x + 'px';
        DocumentBootstrap.textContainer.appendChild(this.type);
    }

    addChar(textChar, type){
        type.innerHTML += textChar;
    }
}