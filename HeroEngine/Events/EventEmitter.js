class EventEmitter {
    constructor() {
        this.events = [];
    }

    registerEvent(eventName) {
        let event = new Event(eventName);
        this.events[eventName] = event;
    }

    emitEvent(eventName, eventArgs) {
        let event = this.events[eventName];
        if (event) 
        {
            event.callbacks.forEach(function(callback){
                callback(eventArgs);
            });
        }
    }

    addEventListener(eventName, callback) {
        let event = this.events[eventName];
        if (event) event.registerCallback(callback);
    }
}	