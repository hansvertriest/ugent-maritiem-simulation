import BolderDataAtTimePoint from './BolderDataAtTimePoint';

export default class Data {
    constructor( bolderData ) {
        this.bolderData = bolderData;
        this.timePoints = []; // will contain bolder info at specific timepoint
    }

    async addTimePoints( dataCoords, dataForces, dataTranslations ) {
        return new Promise((resolve, reject) => {
            // loop over timestamps
            for (let time = 0; time < dataCoords.length; time ++) {
                // loop over bolders and add every bolderInfo to the timePoint
                const timePoint = [];
                for (let bolder = 0; bolder < this.bolderData.length; bolder ++) {
                    // make BolderDataAtTimePoint object
                    const bolderDataAtTimePoint = new BolderDataAtTimePoint(
                        dataCoords[time][(bolder*2)],
                        dataCoords[time][(bolder*2) + 1],
                        dataForces[time][bolder]
                    );
                    // Add bolderDataAtTimePoint data to timePoint
                    timePoint.push(bolderDataAtTimePoint);
                }

                // add timePoint to timePoints
                this.timePoints.push(timePoint);

                if (this.timePoints.length === dataCoords.length) {
                    // resolve if all timePoints have been added
                    resolve(this);
                }
            }
        });
    }


}