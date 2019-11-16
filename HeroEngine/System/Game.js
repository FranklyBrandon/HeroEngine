class Game {
    constructor(width, height, targetFPS) {

        this.width = width;
        this.height = height
        this.bootstraper = new DocumentBootstrap(height, width);

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

    UseTextEngine() {
        this.bootstraper.UseTextEngine(this.width, this.height)
    }

    UseCanvas() {
        this.drawManager = new DrawManager(this.width, this.height);
    }
}