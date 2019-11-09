class Game {
    constructor(height, width, targetFPS) {
        this.height = height;
        this.width = width;

        this.input = new Input();
        this.drawManager = new DrawManager(height, width);
        this.events = new EventEmitter();

        this.events.registerEvent('STEP');
        this.events.registerEvent('BEGINDRAW');
        this.events.registerEvent('DRAW');

        this.lastTimeStamp = 0;

        console.log('Welcome to HeroEngine, a fast and lightweight javascript game engine!');
    }

    update(delta) {
        this.events.emitEvent('STEP', delta);
    }

    beginDraw() {
        this.events.emitEvent('BEGINDRAW');
    }

    draw() {
        this.events.emitEvent('DRAW');
    }

    step(timestamp) {

        let stepCall = this.step.bind(this);	
        let delta = timestamp - this.lastTimeStamp;

        this.lastTimeStamp = timestamp;

        this.update(delta);
        this.beginDraw();
        this.draw();
        requestAnimationFrame(stepCall);
    }

    start() {
        let stepCall = this.step.bind(this);	
        stepCall(0);
    }

    startScene(scene) {
        //Set scenes game properties
        scene.drawManager = this.drawManager;

        //Get callbacks
        let callbacks = scene.getCallbacks();

        //Bind callbacks
        this.events.addEventListener('STEP', callbacks['step']);
        this.events.addEventListener('DRAW', callbacks['draw']);
        this.events.addEventListener('BEGINDRAW', callbacks['beginDraw']);

        //Call create
        scene.create();

        //Begin main loop
        let stepCall = this.step.bind(this);	
        stepCall(0);
    }
}
class Scene {
    constructor() {
        this.drawManager = undefined;
    }

    create() { }
    step() { }
    draw() { }
    beginDraw() {
        this.drawManager.clearContext();
    }

    getCallbacks() {
        return {create: this.create.bind(this), step: this.step.bind(this), draw: this.draw.bind(this), beginDraw: this.beginDraw.bind(this) }
    }
}
class DrawManager {
    constructor(x,y){
        this.canvasWidth = x;
        this.canvasHeight = y;
        this.canvas = document.getElementById("heroEngineCanvas");
        this.context = this.canvas.getContext("2d");
    }

    clearContext() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    drawText(text, font, fillStyle, x, y) {
        this.context.font = font;
        this.context.fillStyle = fillStyle;
        this.context.fillText(text, x, y);
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
class FpsClock {
    constructor() {
        this.fps = 0;
    }

    calculateFps(delta) {
        let calc = this.fps = 1000/delta;
        this.fps = Math.round(calc);
    }
}	

class ElementTypeWriter {
    constructor(x, y){
        this.type = document.createElement("p");  
        this.type.setAttribute("id", "elTypeWriter");
        this.type.style.position = 'absolute';
        this.type.style.top = y + 'px';
        this.type.style.left = x + 'px';
        document.getElementById("heroEngineContainer").appendChild(this.type);
    }

    addChar(textChar, type){
        type.innerHTML += textChar;
    }
}

class DialogueNode {
    constructor(nodeText, speed, events) {
    this.speed = speed;
    this.tickCount = 0;
    this.index = 0;
    this.finished = false;
    this.events = events;

    this.typeWriter = new ElementTypeWriter(120,20);
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
            else {
                this.finished = true;
                this.events.emitEvent("NODEEND");
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var game = new Game(200, 100, 30);
game.input.InitKeyboard();
game.input.AddKey('D');

class Scene1 extends Scene {
    constructor(){
        super();

    }

    create(){
        this.fpsClock = new FpsClock();
        this.dialogue = new DialogueSet("Hello world! This is the Hero Engine, a lightweight and performant Javascript game framework", 1);
    }

    step(delta){
        this.fpsClock.calculateFps(delta);
        this.dialogue.step(delta);
    }

    draw() {
        this.drawManager.drawText('FPS: ' + this.fpsClock.fps, '10px Arial', 'red', 10, 10)
    }
}

var myScene = new Scene1();


game.startScene(myScene);
