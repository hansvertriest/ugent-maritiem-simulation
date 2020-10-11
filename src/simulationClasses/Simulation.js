import Ship from "./Ship";

export default class Animation {
    constructor( width, height ) {
        // create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('height', height.toString());
        this.canvas.setAttribute('width', width.toString());
        this.canvas.setAttribute('id', "animation-canvas");
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");


        this.meterToPxFactor = 0.5 // 1 meter = 1.5 px
        this.kaaiHeight = 50;
        this.originX = this.canvas.width/2;
        this.originY = this.canvas.height/2;
    }

    init() {
        this.drawKaai();
    }

    meterToPx(distance) {
        return distance*this.meterToPxFactor;
    }

    originToCanvasCoords(originCoordX, originCoordY, width, height) {
        const canvasCoordX =  this.originX + originCoordX - (width/2);
        const canvasCoordY =  this.originY + originCoordY - (height/2);
        return {
            x: canvasCoordX,
            y: canvasCoordY,
        }
    }

    setBackgroundColor(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setOrigin(posX, posY) {
        this.originX = posX;
        this.originY = posY;
    }

    addShip(shipInfo, isCaseShip=false) {
        const newShip = new Ship(
            shipInfo.type, 
            shipInfo.width, 
            shipInfo.length, 
            shipInfo.distanceFromKaai
        );
        if (isCaseShip) {
            this.caseShip = newShip
            this.setOrigin(
                this.originX,
                this.canvas.height - this.meterToPx(this.kaaiHeight) + this.meterToPx(this.caseShip.distanceFromKaai)
            );
            console.log(this.originY);
        } else {
            this.passingShip = newShip;
        }
    }

    drawKaai() {
        const height = this.meterToPx(this.kaaiHeight);
        const width = this.canvas.width;
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0, this.canvas.height - height, width, height);
    }

    drawCaseShip() {
        const length = this.meterToPx(this.caseShip.length);
        const width = this.meterToPx(this.caseShip.width);
        this.ctx.fillStyle = "orange";

        const canvasCoords = this.originToCanvasCoords(
            this.caseShip.posX, 
            this.caseShip.posY, 
            length,
            width
        );

        this.ctx.fillRect(canvasCoords.x, canvasCoords.y, length, width);
    }

}