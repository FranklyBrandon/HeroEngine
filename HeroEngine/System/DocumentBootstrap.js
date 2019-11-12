class DocumentBootstrap {
    constructor(width,height) {
        let container = document.getElementById("HeroEngineGame");

        //Create Canvas
        let canvas = document.createElement("canvas")
        canvas.width = width;
        canvas.height = height;
        canvas.style = "position: absolute";
        container.appendChild(canvas);

        //Create TextContainer
        let textContainer = document.createElement("div");
        textContainer.setAttribute("id","HeroEngineTextContainer");
        textContainer.setAttribute("style",`width:${width}px; height:${height}px`);
        container.appendChild(textContainer);

        //Create OptionContainer
        let optionContainer = document.createElement("div");
        optionContainer.setAttribute("id","HeroEngineOptionContainer");
        optionContainer.setAttribute("style",`width:${width}px; height:${height}px`);
        container.appendChild(optionContainer);
    }
}