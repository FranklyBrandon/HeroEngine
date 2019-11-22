class DialogueSet {
    constructor(setText, textSpeed) {
        this.nodeMap = [];
        this.textSpeed = textSpeed;

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
        //TODO: Accept fully made model in different method and rewrite this to parse
        let options = [];
        options.push(new Option("First option!","ref1"));
        options.push(new Option("Second option!","ref2"));
        options.push(new Option("Third option!","ref3"));
        options.push(new Option("Fourth option!","ref4"));

        this.nodeMap["NodeName"] = new DialogueNode(nodeMapText, options, this.textSpeed, this.events);
    }

    switchNode(nodeKey) {

    }

    displayOptions(options) {
        DocumentBootstrap.setOptions(options, this);
        DocumentBootstrap.textOptions.forEach(function(option) {
            option.style.display = "block"
          });
    }
}