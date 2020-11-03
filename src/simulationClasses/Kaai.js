import kaaiImage from '../../assets/images/kaai.png'

export default class Kaai {
    constructor(heightInM) {
        this.heightInM = heightInM;
        
        this.image = new Image();
        this.image.src = kaaiImage;
        this.imageIsLoaded = false;
    }

    async loadImage() {
        return new Promise((resolve, reject) => {
            this.image.onload = function(){
                this.imageIsLoaded = true;
                console.log('Kaai image loaded');
                resolve();
            }.bind(this);
        });
    }

    draw(simCtx) {
        const height = simCtx.meterToPx(this.heightInM);
        const width = simCtx.canvas.width;
        // draw rectangle
        simCtx.ctx.fillStyle = "#D0D0D0";
        simCtx.ctx.fillRect(0, simCtx.canvas.height - height, width, height);


        const scaleFactor = simCtx.canvas.width/this.image.width;
        const heightImage = this.image.height * scaleFactor;
        const widthImage = width;


        // draw image
        let posXImage = simCtx.originToCanvasCoords(
            simCtx.pxToMeter(simCtx.canvas.width/2)*-1, 0,
            simCtx.canvas.width, 0
        ).x;
        posXImage = posXImage%simCtx.canvas.width;
        const posYImage =  simCtx.canvas.height - height;


        simCtx.ctx.drawImage(this.image, posXImage, posYImage, widthImage, heightImage);

        // check if screen is moved horizontallyy
        if (simCtx.originX !== 0) {
            // if moved to right
            const widthImageTwo =  (posXImage > 0) ? widthImage*-1 : widthImage;
            
            // draw image 2
            simCtx.ctx.drawImage(this.image, posXImage + widthImageTwo, posYImage, widthImage, heightImage);
        }
    }
}