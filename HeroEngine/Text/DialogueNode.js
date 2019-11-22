class DialogueNode {
    constructor(nodeText, options, speed, events) {
    this.speed = speed;
    this.tickCount = 0;
    this.index = 0;
    this.finished = false;
    this.events = events;

    this.options = options;

    this.typeWriter = new TypeWriter(0,20);
    this.queue = this.parseText(nodeText);

    }

    step() {
        this.tickCount++;
        if (this.tickCount >= this.speed){	
            let action = this.queue[this.index];

            if(action) {
                action();
                this.tickCount = 0;
                this.index++;
            }
            else if (!this.finished) {
                this.finished = true;
                this.events.emitEvent("NODEEND", this.options);
            }
        }
    }

    parseText(text) {
        let queue = [];
        for (var i = 0; i < text.length; i++) {	
            queue.push(this.typeWriter.addChar.bind(this, text.charAt(i),this.typeWriter.type));
        }

        return queue;
    }
}