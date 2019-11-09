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