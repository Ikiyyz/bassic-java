function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class Tyre {
  constructor(brand, size) {
    this.brand = brand;
    this.size = size;
  }
}

class Car {
  constructor(varian, sn, door, seat, tyre, year, warranty) {
    this.varian = varian;
    this.sn = sn;
    this.door = door;
    this.seat = seat;
    this.tyre = tyre;
    this.year = year;
    this.warranty = warranty;
  }
}

class CarFactory {
  constructor() {
    this.cars = [];
    this.productionPlan = {
      2020: { Agya: 4, Rush: 1 },
      2022: { Agya: 3, Rush: 4 },
    };
  }

  produce(year) {
    const plan = this.productionPlan[year];
    if (!plan) return;

    for (const varian in plan) {
      const jumlah = plan[varian];
      for (let i = 0; i < jumlah; i++) {
        const sn = generateUUID();
        const door = 5;
        const seat = 5;
        const tyre =
          varian === "Agya"
            ? new Tyre("Dunlop", "15 inch")
            : new Tyre("Bridgestone", "17 inch");
        const warranty = varian === "Agya" ? "1 year" : "3 year";

        const car = new Car(varian, sn, door, seat, tyre, year, warranty);
        this.cars.push(car);
      }
    }
  }

  result() {
    console.log("hasil produksi :");
    this.cars.forEach((car, index) => {
      console.log(`\nno. ${index + 1}`);
      console.log(`varian   : ${car.varian}`);
      console.log(`sn       : ${car.sn}`);
      console.log(`door     : ${car.door}`);
      console.log(`seat     : ${car.seat} seater`);
      console.log(`tyre     : ${car.tyre.brand} ${car.tyre.size}`);
      console.log(`year     : ${car.year}`);
      console.log(`warranty : ${car.warranty}`);
    });
  }

  guaranteeSimulation(simulationYear) {
    console.log(
      `\nhasil simulasi garansi semua mobil pada tahun ${simulationYear} :`
    );
    this.cars.forEach((car, index) => {
      const warrantyDuration = parseInt(car.warranty);
      const expired = simulationYear - car.year > warrantyDuration;


      console.log(`\nno. ${index + 1}`);
      console.log(`varian   : ${car.varian}`);
      console.log(`sn       : ${car.sn}`);
      console.log(`door     : ${car.door}`);
      console.log(`seat     : ${car.seat} seater`);
      console.log(`tyre     : ${car.tyre.brand} ${car.tyre.size}`);
      console.log(`year     : ${car.year}`);
      console.log(`warranty : ${car.warranty}`);
      console.log(
        `status on ${simulationYear} this guarantee status is ${
          expired ? "expired" : "active"
        }`
      );
    });
  }
}

const toyota = new CarFactory();

toyota.produce(2020);
toyota.produce(2022);
toyota.result();
toyota.guaranteeSimulation(2025);
