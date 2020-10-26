import containerBig from '../../assets/images/container_400_63.png'
import containerBigMoving from '../../assets/images/container_400_63-moving.png'


export default class Ship {
    constructor(type, width, length, distanceFromKaai) {
        this.width = width;
        this.length = length;
        this.distanceFromKaai = distanceFromKaai;
        this.posX = 0;
        this.posY = 0;
        this.rotationInDegrees = 0;
        
        this.displacementLimitToBeStaticInPx = 0.0001;


        this.type = type;
        this.image;

        this.imageStatic = new Image();
        this.imageStatic.src = containerBig;
        this.imageStaticIsLoaded = false;

        this.imageMoving = new Image();
        this.imageMoving.src = containerBigMoving;
        this.imageMovingIsLoaded = false;
    }

    async loadImage() {
        return new Promise((resolve, reject) => {
            this.imageStatic.onload = function(){
                this.imageStaticIsLoaded = true;
                console.log('Ship imageStatic loaded');
                if (this.imageStaticIsLoaded && this.imageMovingIsLoaded) {
                    // if both are loaded set image to static image
                    this.setImageToStatic();
                    resolve();
                }
            }.bind(this);

            this.imageMoving.onload = function(){
                this.imageMovingIsLoaded = true;
                console.log('Ship imageMoving loaded');
                if (this.imageStaticIsLoaded && this.imageMovingIsLoaded) {
                    this.setImageToStatic();
                    resolve();
                }
            }.bind(this);
        });
    }

    draw(simCtx) {
        const length = simCtx.meterToPx(this.length);
        const width = simCtx.meterToPx(this.width);
        const posXInPx = simCtx.meterToPx(this.posX)*-1;
        const posYInPx = simCtx.meterToPx(this.posY)*-1;
        
        const canvasCoords = simCtx.originToCanvasCoords(
            this.posX, 
            this.posY, 
            this.length,
            this.width
        );

        const canvasOrigin = simCtx.originToCanvasCoords(
            0,
            0,
            this.length,
            this.width)

        
        // rotate context to draw the rotation of the ship
        simCtx.ctx.save();
        // translate context to origin of simulation
        simCtx.ctx.translate(simCtx.originX, simCtx.originY);
        simCtx.ctx.rotate(this.rotationInDegrees);

        // draw orange placeholder
        simCtx.ctx.fillStyle = 'orange';
        simCtx.ctx.fillRect(posXInPx - (length/2), posYInPx - (width/2), length, width)

        // draw image of ship
        simCtx.ctx.drawImage(this.image, posXInPx - (length/2), posYInPx - (width/2), length, width);
        simCtx.ctx.restore();
    }

    setImageToMoving(){
        this.image = this.imageMoving;
    }
    setImageToStatic(){
        this.image = this.imageStatic;
    }

    setPosX(posX) {
        this.posX = posX;
        if(Math.abs(this.posX - posX) > this.displacementLimitToBeStaticInPx ) {
            console.log('is moving!')
            this.setImageToMoving();
        }
    }

    setPosY(posY) {
        this.posY = posY;
    }
}