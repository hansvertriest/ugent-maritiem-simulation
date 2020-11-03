export default class Hawser {
    constructor(bolderPosX, bolderPosY, forceMax, limits) {
        this.bolderPosX = bolderPosX;
        this.bolderPosY = bolderPosY;
        this.forceMax = forceMax;
        this.limit = limits;

        this.posOnShipX = 0;
        this.posOnShipY = 0;
        this.currentLoad;

        this.hasBroken = false;

        // colors 
        this.colorFirstLimit = 'orange';
        this.colorNoLimit = 'green';
        this.colorSecondLimit = 'red';
    }

    draw(simCtx) {
        // get coordinates
        const canvasCoordsBolder = simCtx.originToCanvasCoords(
            this.bolderPosX, 
            this.bolderPosY, 
        );
        const canvasCoordsHawser = simCtx.originToCanvasCoords(
            this.posOnShipX, 
            this.posOnShipY, 
        );

        simCtx.ctx.beginPath();
        simCtx.ctx.lineWidth = 2;
        simCtx.ctx.strokeStyle = this.getHawserColor();
        if (this.hasBroken) simCtx.ctx.setLineDash([5]);
        simCtx.ctx.moveTo(canvasCoordsBolder.x, canvasCoordsBolder.y);
        simCtx.ctx.lineTo(canvasCoordsHawser.x, canvasCoordsHawser.y);
        simCtx.ctx.stroke();
        simCtx.ctx.closePath();

        // reset lines to solid
        if (this.hasBroken) simCtx.ctx.setLineDash([]);
    }

    setPosOnShipX(posX, amplification) {
        this.posOnShipX = posX;
    }

    setPosOnShipY(posY, amplification) {
        this.posOnShipY = posY;
    }

    setCurrentLoad(load) {
        this.currentLoad = load;
    }

    getHawserColor() {
        const ratio = this.currentLoad / this.forceMax;
        if (ratio > this.limit.second && ratio <= this.limit.first) {
            return this.colorFirstLimit;
        } else if ( ratio > this.limit.first) {
            this.hasBroken = true;
            return this.colorSecondLimit;
        }
        return this.colorNoLimit;
    }
}