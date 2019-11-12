var game = new Game(200, 100, 30);
//game.input.InitKeyboard();
//game.input.AddKey('D');

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
