class Room {

    constructor() {
    this.lastRender = 0;
    this.input = new Input();
    }
    
    update(delta) {
        console.log('Frame has updated!');
    }
    
    draw() {
    
    }
    
    loop(timestamp) {
     let delta = timestamp - this.lastRender;
     console.log(delta);
    
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
        this.KeyMap = {
            KeyCode: {
                68: 'D',
                65: 'A',
                87: 'W',
                83: 'S'
            },
            VirtualKey: {
                'D': 68,
                'A': 65,
                'W': 87,
                'S': 83
            }
        };
        
        this.Keyboard = [];
        
        window.addEventListener("keydown", this.Keydown, false)
        window.addEventListener("keyup", this.Keyup, false)
    }
    
    Keydown(event) {
        console.log('key down event has been fired');
    }
    
    Keyup(event) {
        console.log('key up event has been fired');
    }
    
    AddKey(key) {
        this.Keyboard.push({
        key: 'MyKeyObject'
        });
    }
}
    
    
    var scene = new Room();
    scene.start();
    scene.input.InitKeyboard();
    scene.input.AddKey('D');
    
    