import containerBig from '../../assets/images/container_400_63.png'
import containerBigMoving from '../../assets/images/container_400_63-moving.svg'


export default class Ship {
    constructor(type, width, length, distanceFromKaai) {
        this.width = width;
        this.length = length;
        this.distanceFromKaai = distanceFromKaai;
        this.posX = 0;
        this.posY = 0;
        this.rotationInDegrees = 0;

        this.type = type;
        this.image = containerBig;
        this.imageMoving = containerBigMoving
        // if (this.type === 'container') {
        // }
    }

    setPosX(posX) {
        this.posX = posX;
    }

    setPosY(posY) {
        this.posY = posY;
    }
}