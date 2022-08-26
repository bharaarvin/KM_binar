class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.inputDriver = document.getElementById("inputDriver");
    this.inputDate = document.getElementById("inputDate");
    this.inputWatch = document.getElementById("inputTime");
    this.inputPeople = document.getElementById("inputPeople");
  }

  async init() {
    await this.load();

    // Register click listener
    // this.clearButton.onclick = this.clear;
    this.clearButton.addEventListener("click", (e) => {
      e.preventDefault();
      let child = this.carContainerElement.firstElementChild;

      while (child) {
        child.remove();
        child = this.carContainerElement.firstElementChild;
      }
      // return false;
    });
    this.loadButton.onclick = this.run;
  }

  run = () => {
    const node = document.createElement("div");
    node.className = "row";
    this.carContainerElement.className = "container";
    const baru = document.createElement("div");
    baru.className = "container";
    node.appendChild(baru);

    const baris = document.createElement("div");
    baris.className = "row";
    this.carContainerElement.appendChild(baris);

    const driverValue = this.inputDriver.value;
    const dateValue = this.inputDate.value;
    const timeValue = this.inputTime.value;
    const peopleValue = this.inputPeople.value;

    Car.list.filter((car) => {
      console.log(car.availableAt.toISOString()); // toISOString untuk mengubah tanggal menjadi string
      console.log(car.availableAt.toISOString().substring(11, 16));
      console.log(
        car.availableAt.toISOString().substring(0, 10) == dateValue &&
        car.availableAt.toISOString().substring(11, 16) < timeValue
      );
      if (
        car.capacity === parseInt(peopleValue) && 
        car.available === Boolean(driverValue) &&
        car.availableAt.toIsoString().subString(0.10) === dateValue &&
        car.availableAt.toIsoString().subString(11.16) < timeValue
        ){
          console.log(car);
          return car;
        }
    })

    .map((car) => {
      const col = document.createElement("div");
      col.className = "col-4";
      col.innerHTML = car.render();
      baris.appendChild(col);
    });
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = (e) => {
    console.log(e);
    e.preventDefault();
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
