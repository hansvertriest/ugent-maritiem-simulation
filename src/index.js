import bolderData from './caseMetaData';
import Data from './Data';

import dataCoordsCSV from '../assets/dataCoords.csv' // collums => arrays
import dataForcesCSV from '../assets/dataForces.csv'// collums => arrays

// remove header
dataForcesCSV.shift();

// get shipTranslation data
const shipTranslations = dataForcesCSV.map((timePoint) => {
    return timePoint.filter((column, index) => {
        if (index >= bolderData.length && index < bolderData.length + 3) {
            return true;
        }
        return false;
    });
});

const data = new Data(bolderData);
data.addTimePoints(dataCoordsCSV, dataForcesCSV, shipTranslations)
    .then( () => {
        console.log(data);
    })

// Data = {
//     "bolders": [
//       {
//         posXKaai,
//         posYKaai,
//         forceLimit,
//       },
//     ],
//     "timePoints": [
//       [ // timestamp 1
//         { // bolder 1
//           posXSchip,
//           posYSchip,
//           force,
//         },
//       ],
//     ]
//   }
  