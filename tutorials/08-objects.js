function Car(brand, color, owner) {
  this.brand = brand;
  this.color = color;
  this.owner = owner;
}

function Person(fname, lname) {
  this.fname = fname;
  this.lname = lname;
}

const rinor = new Person("Rinor", "Mehmeti");
const rinorsCar = new Car("smart", "black", rinor);

// console.log(rinorsCar.owner.fname); // Rinor

const Animal = {
  type: "Wirbellos",
  displayType() {
    console.log(this.type);
  }
}

let animal1 = Object.create(Animal);

// animal1.displayType();

let fish = Object.create(Animal);

fish.type = "Fish";

// fish.displayType();

const myObj = {};

myObj.test = "test";
myObj.name = "Objektname";
myObj.zahl = 123;
myObj.wahrheit = true;
myObj.test2 = null;
myObj.test3 = 0;
myObj.arr = [1, 2, 3, 4, "d", "ds"];

const bigDay = new Date(2023, 12, 11);

let year = bigDay.getFullYear;

console.log(year);