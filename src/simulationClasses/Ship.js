export default class Ship {
    constructor(type, width, length, distanceFromKaai) {
        this.type = type;
        this.width = width;
        this.length = length;
        this.distanceFromKaai = distanceFromKaai;
        this.posX = 0;
        this.posY = 0;
        this.rotationInDegrees = 0;
    }

    setPosX(posX) {
        this.posX = posX;
    }

    setPosY(posY) {
        this.posY = posY;
    }
}