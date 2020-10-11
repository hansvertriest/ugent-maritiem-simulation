export default class Hawser {
    constructor(bolderPosX, bolderPosY, forceLimit, limits) {
        this.bolderPosX = bolderPosX;
        this.bolderPosY = bolderPosY;
        this.forceLimit = forceLimit;
        this.limit = limits;

        this.posOnShipX;
        this.posOnShipY;
        this.currentLoad;

        // colors 
        this.orange = 'orange';
        this.green = 'green';
        this.red = 'red';
    }

    setPosOnShipX(posX) {
        this.posOnShipX = posX;
    }

    setPosOnShipY(posY) {
        this.posOnShipY = posY;
    }

    setCurrentLoad(load) {
        this.currentLoad = load;
    }

    getHawserColor() {
        const ratio = this.currentLoad / this.forceLimit;
        console.log(this.currentLoad/this.forceLimit);
        if (ratio > this.limit.orange && ratio <= this.limit.red) {
            return this.orange;
        } else if ( ratio > this.limit.red) {
            return this.red;
        }
        return this.green;
    }
}