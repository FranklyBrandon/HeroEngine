class Game {

    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.lastRender = 0;
        this.input = new Input();
        this.canvas = document.getElementById("heroEngineCanvas");
        this.context = this.canvas.getContext("2d");

        this.events = new EventEmitter();
        this.events.registerEvent('STEP');
        this.events.addEventListener('STEP', function(eventArgs) {
        console.log('Step event has been triggered');
        });
    }

    update(delta) {
        this.events.emitEvent('STEP', delta);
    }

    draw() {

    }

    loop(timestamp) {
        let delta = timestamp - this.lastRender;

        this.update(delta);
        this.draw();

        this.lastRender = timestamp;

        let loop = this.loop.bind(this);
        window.requestAnimationFrame(loop);
    }

    start() {
        let loop = this.loop.bind(this);
        window.requestAnimationFrame(loop);
    }
}

class Input {
    constructor(){

    }

    InitKeyboard(){

        //Data Structure to store KeyCode maps
        this.KeyMap = {
            //KeyCode to Human readable
            KeyCode: {
                68: 'D',
                65: 'A',
                87: 'W',
                83: 'S'
            },
            //Human readable to KeyCode
            VirtualKey: {
                'D': 68,
                'A': 65,
                'W': 87,
                'S': 83
            }
        };

        this.Keyboard = [];

        //Bind keydown and keyup event listeners
        let keydownFunc = this.Keydown.bind(this);
        let keyupFunc = this.Keyup.bind(this);
        window.addEventListener("keydown", keydownFunc, false)
        window.addEventListener("keyup", keyupFunc, false)
    }

    //Event fired when a key is pressed
    Keydown(event) {
        let keyObj = this.Keyboard[event.keyCode];
        if(keyObj) keyObj.IsPressed = true;
    }

    //Event fired when a key is released
    Keyup(event) {
        let keyObj = this.Keyboard[event.keyCode];
        if(keyObj) keyObj.IsPressed = false;
    }

    //Add a key to listen to
    AddKey(key) {
        let keyObj = new KeyObj(key);
        let keyCode = this.KeyMap.VirtualKey[key];
        this.Keyboard[keyCode] = keyObj;
    }
}
class KeyObj {

    constructor(key){
        this.Key = key;
        this.IsPressed = false;
    }
}

class Event {
    constructor(name){
        this.name = name;
        this.callbacks = [];
    }

    registerCallback(callback) {
        this.callbacks.push(callback);
    }
}

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


var game = new Game(200, 100);
game.input.InitKeyboard();
game.input.AddKey('D');
game.start();