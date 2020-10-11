import Ship from "./Ship";

export default class Simulation {
    constructor( width, height, data ) {
        // create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('height', height.toString());
        this.canvas.setAttribute('width', width.toString());
        this.canvas.setAttribute('id', "animation-canvas");
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");


        this.meterToPxFactor = 1.8 // 1 meter = 1.5 px
        this.kaaiHeight = 50;
        this.originX = this.canvas.width/2;
        this.originY = this.canvas.height/2;

        this.caseData = data;
        this.animationTime = 0;
        this.animationTimeInterval = 20;
        this.animationPlaying = false;
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

    setNextAnimationTime() {
        this.animationTime += this.animationTimeInterval;
    }

    getNextAnimationTime() {
        return this.animationTime + this.animationTimeInterval;
    }

    play() {
        this.animationPlaying = true;
        window.requestAnimationFrame(this.doAnimation.bind(this));
    }

    pause() {
        this.animationPlaying = false;
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


    doAnimation() {
        // get timePoint
        const timePoint = this.caseData.timePoints[this.animationTime];
        // update caseShip parameters
        this.caseShip.posX = this.meterToPx(timePoint.shipData.posX);
        this.caseShip.posy = this.meterToPx(timePoint.shipData.posY);
        this.caseShip.rotationInDegrees = timePoint.shipData.rotation;
        // clear screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // drawElements
        this.setBackgroundColor('green');
        this.drawKaai();
        this.drawCaseShip();

        // check if animation is done
        if (this.getNextAnimationTime() >= this.caseData.timePoints.length) {
            this.pause();
            console.log(this.animationPlaying);
        } else if (this.animationPlaying) {
            // set next animationTime
            this.setNextAnimationTime();
            window.requestAnimationFrame(this.doAnimation.bind(this));
        }
    }

}