import { Data } from './dataClasses';
import { Simulation } from './simulationClasses';

// Load in data
import metaData from '../assets/sim2/caseMetaData';
import dataCoordsCSV from '../assets/sim2/dataCoords.csv' // collums => arrays
import dataForcesCSV from '../assets/sim2/dataForces.csv'// collums => arrays

const appInit = async () => {
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
    const data = new Data(metaData.bolderData, metaData.fenderData);
    data.addTimePoints(dataCoordsCSV, dataForcesCSV, shipTranslations);
    console.log(data.getTimePoint(0));
    console.log(data.getTimePoint(1));
    console.log(data.getTimePoint(2));
    console.log(data.getTimePoint(3));
    console.log(data.getTimePoint(4));
    
    // SIMULATION
    const simulation = new Simulation(1000,600, data);
    simulation.init();
    simulation.registerControls();
    await simulation.addShip(metaData.caseShip, true);
    simulation.addHawsers(metaData.bolderData, metaData.hawsersLimits);
    simulation.addFenders(metaData.fenderData, metaData.fenderLimits);
    simulation.drawCaseShip();
    simulation.play();
}


appInit();