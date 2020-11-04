import { Data, MetaData } from './dataClasses';
import { Simulation } from './simulationClasses';

const XLSX = require('xlsx');

// Load in data
// import metaData from '../assets/sim2/caseMetaData';
import metaDataXLSX from '../assets/sim2/caseMetaData.xlsx';
import dataCoordsCSV from '../assets/sim2/dataCoords.csv' // collums => arrays
import dataForcesCSV from '../assets/sim2/dataForces.csv'// collums => arrays

const appInit = async (metaData) => {
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
    const data = new Data(metaData);
    data.addTimePoints(dataCoordsCSV, dataForcesCSV, shipTranslations);
    
    // SIMULATION
    const simulation = new Simulation(1000,600, data);
    await simulation.init();
    simulation.registerController();
    await simulation.addShip(metaData.caseShip, true);
    await simulation.addHawsers(metaData.bolderData, metaData.hawserMeta);
    simulation.addFenders(metaData.fenderData, metaData.fenderMeta);
    simulation.drawCaseShip();
    simulation.play();
}

// create inputfields
const file = document.createElement('input');
file.setAttribute('type', 'file');
document.body.appendChild(file);

// detect when a file is selected
file.onchange = (e) => {
    const reader = new FileReader();

    // read file
    reader.onload = (e) => {
        const data = e.target.result;

        const file = XLSX.read(data, {type: 'binary'});

        // parse xlsx to formatted MetaData object
        const metaData = new MetaData(file).get();

        appInit(metaData);
    }
    reader.readAsBinaryString(e.target.files[0])
    
}