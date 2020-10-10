import bolderData from './caseMetaData';
import Data from './Data';

import dataCoordsCSV from '../assets/dataCoords.csv' // collums => arrays
import dataForcesCSV from '../assets/dataForces.csv'// collums => arrays

// const dataForcesCSV = DataForcesCSV.map((timePoint) => {
//     return timePoint.shift();
// });
dataForcesCSV.shift();

const data = new Data( bolderData);
data.addTimePoints(dataCoordsCSV, dataForcesCSV)
    .then( () => {
        console.log(data);
    })
// console.log(data);

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
  