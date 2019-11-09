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