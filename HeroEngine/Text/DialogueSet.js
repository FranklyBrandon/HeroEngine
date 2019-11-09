class DialogueSet {
    constructor(setText, textSpeed) {
        this.nodeMap = {};
        this.textSpeed = textSpeed;

        //Get dom elements
        this.textContainer = document.getElementById("heroEngineTextContainer");
        this.optionsContainer = document.getElementById("heroEngineOptionContainer");
        this.options = [];
        this.options[0] = document.getElementById("HeroEngineOption1");
        this.options[1] = document.getElementById("HeroEngineOption2");
        this.options[2] = document.getElementById("HeroEngineOption3");
        this.options[3] = document.getElementById("HeroEngineOption4");

        this.options[0].style.display = 'none';
        this.options[1].style.display = 'none';
        this.options[2].style.display = 'none';
        this.options[3].style.display = 'none';

        this.currentNode = "NodeName";

        this.events = new EventEmitter();
        this.events.registerEvent("NODEEND")
        this.events.addEventListener("NODEEND",this.displayOptions.bind(this));

        this.parseNodeMap(setText);
    }

    step(delta) {
        this.nodeMap[this.currentNode].step();
    }

    parseNodeMap(nodeMapText) {
        this.nodeMap["NodeName"] = new DialogueNode(nodeMapText, this.textSpeed, this.events);
    }

    displayOptions() {
        this.options.forEach(function(option) {
            option.style.display = "block"
          });
    }
}