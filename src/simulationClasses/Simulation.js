import Ship from "./Ship";
import Hawser from "./Hawser";
import SimulationContext from "./SimulationContext";

export default class Simulation {
    constructor( width, height, data ) {
        // create canvas element
        // this.canvas = document.createElement('canvas');
        // this.canvas.setAttribute('height', height.toString());
        // this.canvas.setAttribute('width', width.toString());
        // this.canvas.setAttribute('id', "animation-canvas");
        // document.body.appendChild(this.canvas);

        // this.ctx = this.canvas.getContext("2d");

        this.simCtx = new SimulationContext(width, height);
        this.canvas = this.simCtx.canvas;
        this.ctx = this.simCtx.ctx;

        this.backgroundColor = "#c1e6fb";


        // this.simCtx.meterToPxFactor = 2;
        this.kaaiHeight = 100;
        this.originX = this.canvas.width/2;
        this.originY = this.canvas.height/2;

        this.caseData = data;
        this.animationTime = 0;
        this.animationTimeInterval = 10;
        this.animationPlaying = false;

        // variables for improving visual message
        this.translationAmplifierFactor = 20;
        this.distanceToKaaiInMeter = 0;

        // hawser data 
        this.hawserArray = [];
    }

    init() {
        this.setBackgroundColor();
        this.drawKaai();
    }

    // meterToPx(distance) {
    //     return distance*this.simCtx.meterToPxFactor;
    // }

    originToCanvasCoords(originCoordX, originCoordY, width=0, height=0) {
        const canvasCoordX =  this.originX - originCoordX - (width/2);
        const canvasCoordY =  this.originY - originCoordY - (height/2);
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

    setBackgroundColor(color=this.backgroundColor) {
        this.backgroundColor = color;
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // setOrigin(posX, posY) {
    //     this.originX = posX;
    //     this.originY = posY;
    // }

    async addShip(shipInfo, isCaseShip=false) {
        const newShip = new Ship(
            shipInfo.type, 
            shipInfo.width, 
            shipInfo.length, 
            shipInfo.distanceFromKaai
        );
        if (isCaseShip) {
            this.caseShip = newShip;
            await this.caseShip.loadImage();
            // set origin relative to distance from kaai
            this.simCtx.setOrigin(
                this.originX,
                (this.distanceToKaaiInMeter == 0) 
                    ? this.canvas.height - this.simCtx.meterToPx(this.kaaiHeight) + this.simCtx.meterToPx(this.caseShip.distanceFromKaai)
                    : this.canvas.height - this.simCtx.meterToPx(this.kaaiHeight) + this.simCtx.meterToPx(this.distanceToKaaiInMeter)
            );
        } else {
            this.passingShip = newShip;
            await this.passingShip.loadImage();
        }
    }

    addHawsers(bolderData, hawserLimits) {
        // loop over all bolders and add a Hawser object to hawserArray
        bolderData.forEach((bolder) => {
            const hawser = new Hawser(
                bolder.posX,
                bolder.posY,
                bolder.forceLimit,
                hawserLimits
            );
            this.hawserArray.push(hawser);
        });
        console.log(this.hawserArray)
    }

    drawHawsers() {
        this.hawserArray.forEach((hawser) => {
            // get coordinates
            const canvasCoordsBolder = this.simCtx.originToCanvasCoords(
                this.simCtx.meterToPx(hawser.bolderPosX), 
                this.simCtx.meterToPx(hawser.bolderPosY), 
            );
            const canvasCoordsHawser = this.simCtx.originToCanvasCoords(
                this.simCtx.meterToPx(hawser.posOnShipX), 
                this.simCtx.meterToPx(hawser.posOnShipY), 
            );

            this.ctx.beginPath();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = hawser.getHawserColor();
            this.ctx.moveTo(canvasCoordsBolder.x, canvasCoordsBolder.y);
            this.ctx.lineTo(canvasCoordsHawser.x, canvasCoordsHawser.y);
            this.ctx.stroke();
            this.ctx.closePath();
        });
    }

    drawKaai() {
        const height = this.simCtx.meterToPx(this.kaaiHeight);
        const width = this.canvas.width;
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0, this.canvas.height - height, width, height);
    }

    drawCaseShip() {
        const length = this.simCtx.meterToPx(this.caseShip.length);
        const width = this.simCtx.meterToPx(this.caseShip.width);
        
        const canvasCoords = this.simCtx.originToCanvasCoords(
            this.simCtx.meterToPx(this.caseShip.posX), 
            this.simCtx.meterToPx(this.caseShip.posY), 
            length,
            width
        );

        // this.ctx.fillStyle = 'orange';
        // this.ctx.fillRect(canvasCoords.x,canvasCoords.y, length, width)

        // rotate context to draw the rotation of the ship
        this.ctx.save();
        this.ctx.translate(canvasCoords.x,canvasCoords.y);
        this.ctx.rotate(this.caseShip.rotationInDegrees*this.translationAmplifierFactor);

        this.ctx.drawImage(this.caseShip.image, 0, 0, length, width);
        this.ctx.restore();
    }


    doAnimation() {
        // get timePoint
        const timePoint = this.caseData.timePoints[this.animationTime];

        // update caseShip parameters
        this.caseShip.setPosX(timePoint.shipData.posX)*this.translationAmplifierFactor;
        this.caseShip.setPosY(timePoint.shipData.posY)*this.translationAmplifierFactor;
        this.caseShip.rotationInDegrees = timePoint.shipData.rotation;

        // update hawsers parameters

        this.hawserArray.forEach((hawser,index) => {
            hawser.setPosOnShipX(timePoint.hawserData[index].posXShip);
            hawser.setPosOnShipY(timePoint.hawserData[index].posYShip);
            hawser.setCurrentLoad(timePoint.hawserData[index].force);
        });

        // clear screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // drawElements
        this.setBackgroundColor();
        this.drawKaai();
        this.drawCaseShip();
        this.drawHawsers();

        // check if animation is done
        if (this.getNextAnimationTime() >= this.caseData.timePoints.length) {
            this.pause();
        } else if (this.animationPlaying) {
            // set next animationTime
            this.setNextAnimationTime();
            window.requestAnimationFrame(this.doAnimation.bind(this));
        }
    }

}