class DocumentBootstrap {

    static textOptions = [];

    UseCanvas(width, height) {
        let container = document.getElementById("HeroEngineGame");

        //Create Canvas
        let canvas = document.createElement("canvas")
        canvas.setAttribute("id","HeroEngineCanvas");
        canvas.width = width;
        canvas.height = height;
        canvas.style = "position: absolute";
        container.appendChild(canvas);
    }
    UseTextEngine(width, height) {
        let container = document.getElementById("HeroEngineGame");
        
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

        //Create Options
        let optionOne = document.createElement("button");
        optionOne.setAttribute("id","HeroOptionOne")
        optionContainer.appendChild(optionOne);
        let optionTwo = document.createElement("button");
        optionTwo.setAttribute("id","HeroOptionTwo")
        optionContainer.appendChild(optionTwo);
        let optionThree = document.createElement("button");
        optionThree.setAttribute("id","HeroOptionThree")
        optionContainer.appendChild(optionThree);
        let optionFour = document.createElement("button");
        optionFour.setAttribute("id","HeroOptionFour")
        optionContainer.appendChild(optionFour);

        DocumentBootstrap.textOptions[0] = optionOne;
        DocumentBootstrap.textOptions[1] = optionTwo;
        DocumentBootstrap.textOptions[2] = optionThree;
        DocumentBootstrap.textOptions[3] = optionFour;
    }

    static TextOptions() {

    }
}