const fs = require('fs');
const path = require('path');

function createFolders(...folderNames) {
    if (folderNames.length < 1 || folderNames.length > 100) {
        throw new Error("You must provide between 1 and 100 folder names.");
    }

    folderNames.forEach(folderName => {
        const folderPath = path.join(__dirname, folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            console.log(`Folder '${folderName}' created successfully.`);
        } else {
            console.log(`Folder '${folderName}' already exists.`);
        }
    });
}

function addCarData(data) {
    const filePath = path.join(__dirname, 'cars.json');
    let cars = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        cars = JSON.parse(fileData);
    }

    cars.push(data);

    fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));
    console.log('Data added successfully to cars.json');
}

function getAllCarData() {
    const filePath = path.join(__dirname, 'cars.json');

    if (!fs.existsSync(filePath)) {
        throw new Error('cars.json does not exist.');
    }

    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
}

function deleteCarDataById(id) {
    const filePath = path.join(__dirname, 'cars.json');

    if (!fs.existsSync(filePath)) {
        throw new Error('cars.json does not exist.');
    }

    const fileData = fs.readFileSync(filePath, 'utf-8');
    let cars = JSON.parse(fileData);

    const filteredCars = cars.filter(car => car.id !== id);

    if (cars.length === filteredCars.length) {
        console.log(`No car found with ID ${id}.`);
        return;
    }

    fs.writeFileSync(filePath, JSON.stringify(filteredCars, null, 2));
    console.log(`Car with ID ${id} has been deleted.`);
}
createFolders('testFolder1', 'testFolder2');
addCarData({ id: 1, model: 'audi', price: 1000 }); 
console.log(getAllCarData());
deleteCarDataById(1);