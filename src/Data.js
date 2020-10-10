import HawserData from './HawserData';
import TimePoint from './TimePoint';

export default class Data {
    constructor( bolderData ) {
        this.bolderData = bolderData;
        this.timePoints = []; // will contain bolder info at specific timepoint
    }

    async addTimePoints( dataCoords, dataForces, shipTranslation ) {
        return new Promise((resolve, reject) => {
            // loop over timestamps
            for (let time = 0; time < dataCoords.length; time ++) {
                // loop over hawsers and add every hawserData to the timePointHawserData
                const timePointHawserData = [];
                for (let hawser = 0; hawser < this.bolderData.length; hawser ++) {
                    // make hawserData object
                    const hawserData = new HawserData(
                        dataCoords[time][(hawser*2)],
                        dataCoords[time][(hawser*2) + 1],
                        dataForces[time][hawser]
                    );
                    // Add hawserData data to timePointHawserData
                    timePointHawserData.push(hawserData);
                }

                // create timePoint
                const timePoint = new TimePoint(
                    timePointHawserData, 
                    shipTranslation[time][0],
                    shipTranslation[time][1],
                    shipTranslation[time][2],
                )

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