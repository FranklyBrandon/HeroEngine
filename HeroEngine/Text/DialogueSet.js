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
        this.nodeMap["NodeName"] = new DialogueNode(nodeMapText, this.textSpeed, this.events);
    }

    switchNode(nodeKey) {

    }
    displayOptions() {
        this.options.forEach(function(option) {
            option.style.display = "block"
          });
    }
}