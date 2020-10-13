import metaData from './caseMetaData';
import { Data } from './dataClasses';
import { Simulation } from './simulationClasses';

// Load in data

import dataCoordsCSV from '../assets/dataCoords.csv' // collums => arrays
import dataForcesCSV from '../assets/dataForces.csv'// collums => arrays

const appInit = async () => {
    
    // remove header
    dataForcesCSV.shift();
    
    // get shipTranslation data
    const shipTranslations = dataForcesCSV.map((timePoint) => {
        return timePoint.filter((column, index) => {
            if (index >= metaData.bolderData.length && index < metaData.bolderData.length + 3) {
                return true;
            }
            return false;
        });
    });
    
    // create data object
    const data = new Data(metaData.bolderData);
    data.addTimePoints(dataCoordsCSV, dataForcesCSV, shipTranslations);
    console.log(data);
    
    // SIMULATION
    const simulation = new Simulation(1000,600, data);
    simulation.init();
    simulation.registerControls();
    await simulation.addShip(metaData.caseShip, true);
    simulation.addHawsers(metaData.bolderData, metaData.hawsersLimits);
    simulation.drawCaseShip();
    simulation.play();
}


appInit();


