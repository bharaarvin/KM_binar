const carService = require('../service/car.service.js');

exports.findAllCarsApi = async(request, response) => {
    const cars = await carService.findAllCars();

    response.json({ data: cars });
};

exports.findCarByIdApi = async(request, response) => {
    const car = await carService.findCarById(request.params.id);

    if (car != null) {
        response.json({ data: car });
    } else {
        response.status(404).json({ error: `Car not found with id ${request.params.id}` });
    }
};

exports.createNewCarApi = async(request, response) => {
    const car = await carService.createNewCar(request);

    response.status(201).json({ data: car });
};

exports.updateCarApi = async(request, response) => {
    const car = await carService.updateCar(request, request.params.id);

    if (car == null) {
        response.status(404).json({ error: `Car not found with ids : ${request.params.id}` });
    } else {
        response.json({ message: "Updated successfully" });
    }
};

exports.deleteCar = async(request, response) => {
    const carById = await carService.findCarById(request.params.id);

    if (carById == null) {
        response.status(404).json({ error: `Car not found with ids : ${request.params.id}` });
    } else {
        carService.deleteCar(carById);
        response.json({ message: "Deleted successfully" });
    }
};