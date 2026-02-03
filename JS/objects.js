/**
 * ============================================================
 * JavaScript Objects – Complete Examples in One File
 * ============================================================
 *
 * Topics covered:
 * 1. Creating objects and properties
 * 2. Dot notation vs bracket notation
 * 3. `this` keyword inside objects
 * 4. Objects using constructor functions
 * 5. Object.create()
 * 6. Inheritance using Object.create()
 * 7. Object.keys()
 * 8. for...in loop
 * 9. Deleting properties
 * 10. hasOwnProperty()
 *
 * This file is meant for learning and reference.
 * Open it, run it, tweak values, and observe the output.
 * ============================================================
 */

/* ============================================================
   1. Creating an Object and Properties
   ============================================================ */

// An object is a collection of key–value pairs
const user = {
  name: "Alex",
  age: 30,
  isAdmin: true,
};

// Accessing properties
console.log(user.name); // "Alex"
console.log(user.age); // 30

/* ============================================================
   2. Dot Notation vs Bracket Notation
   ============================================================ */

// Dot notation: use when you KNOW the property name
console.log(user.isAdmin); // true

// Bracket notation: use when property name is dynamic or invalid as an identifier
const dynamicKey = "age";
console.log(user[dynamicKey]); // 30

// Bracket notation is required for keys with special characters
const weirdObject = {
  "first-name": "Alex",
};

console.log(weirdObject["first-name"]); // "Alex"

/* ============================================================
   3. `this` Keyword Inside an Object
   ============================================================ */

const person = {
  name: "Sam",

  // Method inside an object
  greet() {
    // `this` refers to the object calling the method
    return `Hi, I'm ${this.name}`;
  },
};

console.log(person.greet()); // "Hi, I'm Sam"

// Common pitfall: losing `this`
const greetFn = person.greet;
console.log(greetFn()); // undefined (or error in strict mode)

/* ============================================================
   4. Object as a Constructor Function
   ============================================================ */

// Constructor functions are used with `new`
function User(name, age) {
  // `this` refers to the newly created object
  this.name = name;
  this.age = age;
}

// Creating multiple objects from the constructor
const user1 = new User("Alex", 25);
const user2 = new User("Jamie", 30);

console.log(user1.name); // "Alex"
console.log(user2.age); // 30

/* ============================================================
   5. Object.create()
   ============================================================ */

// Base object (prototype)
const animal = {
  speak() {
    return "Animal sound";
  },
};

// Create a new object with `animal` as its prototype
const dog = Object.create(animal);

// Adding an own property to dog
dog.breed = "Labrador";

console.log(dog.breed); // "Labrador"
console.log(dog.speak()); // "Animal sound"

/* ============================================================
   6. Object Inheritance using Object.create()
   ============================================================ */

const vehicle = {
  move() {
    return "Vehicle is moving";
  },
};

const car = Object.create(vehicle);
car.wheels = 4;

console.log(car.move()); // inherited method
console.log(car.wheels); // own property

// Prototype chain:
// car -> vehicle -> Object.prototype -> null

/* ============================================================
   7. Object.keys()
   ============================================================ */

// Returns only OWN enumerable properties
const profile = {
  username: "alex123",
  email: "alex@example.com",
};

console.log(Object.keys(profile));
// ["username", "email"]

/* ============================================================
   8. for...in Loop
   ============================================================ */

// for...in iterates over enumerable properties
// INCLUDING inherited ones
for (let key in car) {
  console.log(key); // wheels, move
}

// Best practice: filter out inherited properties
for (let key in car) {
  if (car.hasOwnProperty(key)) {
    console.log("Own property:", key);
  }
}

/* ============================================================
   9. Deleting a Property
   ============================================================ */

const settings = {
  theme: "dark",
  debug: true,
};

delete settings.debug;

console.log(settings.debug); // undefined
console.log(settings); // { theme: "dark" }

/* ============================================================
   10. hasOwnProperty()
   ============================================================ */

const parent = { a: 1 };
const child = Object.create(parent);
child.b = 2;

// Checks if property exists DIRECTLY on the object
console.log(child.hasOwnProperty("b")); // true
console.log(child.hasOwnProperty("a")); // false (inherited)

/**
 * ============================================================
 * End of File
 * ============================================================
 */
