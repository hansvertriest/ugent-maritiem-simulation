export default class Fender {
    constructor(fenderPosX, fenderPosY, forceLimit, limitDefinitions) {
        this.posX = fenderPosX;
        this.posY = fenderPosY;
        this.forceLimit = forceLimit;
        this.limitDefinitions = limitDefinitions;

        this.currentForce;
        this.widthInMeter = 8;
        this.heightInMeter = 4;

        // colors 
        this.orange = 'orange';
        this.green = 'green';
        this.red = 'red';
    }

    draw(simCtx) {
        const posOnCanvas = simCtx.originToCanvasCoords(this.posX, this.posY, this.widthInMeter, this.height);
        simCtx.ctx.fillStyle = this.getFenderColor();
        simCtx.ctx.fillRect(posOnCanvas.x, posOnCanvas.y, simCtx.meterToPx(this.widthInMeter), simCtx.meterToPx(this.heightInMeter))
    }

    setCurrentForce(force) {
        this.currentForce = force;
    }

    getFenderColor() {
        const ratio = this.currentForce / this.forceLimit;
        console.log(ratio);
        if (ratio > this.limitDefinitions.orange && ratio <= this.limitDefinitions.red) {
            return this.orange;
        } else if ( ratio > this.limitDefinitions.red) {
            return this.red;
        }
        return this.green;
    }
}