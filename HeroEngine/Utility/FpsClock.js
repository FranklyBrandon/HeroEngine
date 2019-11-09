class FpsClock {
    constructor() {
        this.fps = 0;
    }

    calculateFps(delta) {
        let calc = this.fps = 1000/delta;
        this.fps = Math.round(calc);
    }
}	