/**
 * ============================================================
 * JavaScript Classes and Prototypes
 * ============================================================
 *
 * Topics covered:
 * 1. What are Prototypes?
 * 2. Prototype chain
 * 3. Constructor functions
 * 4. ES6 Classes
 * 5. Inheritance
 * 6. Static methods
 * 7. Getters and Setters
 * 8. Private fields
 *
 * ============================================================
 */

/* ============================================================
   1. What are Prototypes?
   ============================================================ */

/**
 * PROTOTYPES EXPLAINED
 * --------------------
 * Every JavaScript object has a hidden [[Prototype]] property
 * 
 * ANALOGY: Family inheritance
 * - You inherit traits from parents (prototype)
 * - Parents inherit from grandparents
 * - Chain of inheritance
 * 
 * WHY PROTOTYPES?
 * JavaScript doesn't have traditional classes
 * Uses prototypes for inheritance instead
 * 
 * PROTOTYPE CHAIN:
 * Object → Prototype → Prototype's Prototype → null
 */

console.log("=== Prototypes Basics ===");

const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  }
};

// Create object with animal as prototype
const dog = Object.create(animal);
dog.barks = true;

console.log(dog.eats);      // true (inherited from animal)
console.log(dog.barks);     // true (own property)
console.log(dog.walk());    // "Animal walks" (inherited method)

// Check prototype
console.log(Object.getPrototypeOf(dog) === animal);  // true

/* ============================================================
   2. Prototype Chain
   ============================================================ */

/**
 * PROTOTYPE CHAIN
 * ---------------
 * How JavaScript looks up properties
 * 
 * PROCESS:
 * 1. Look in object itself
 * 2. If not found, look in prototype
 * 3. If not found, look in prototype's prototype
 * 4. Continue until null (end of chain)
 */

console.log("=== Prototype Chain ===");

const grandparent = {
  surname: "Smith"
};

const parent = Object.create(grandparent);
parent.firstName = "John";

const child = Object.create(parent);
child.age = 10;

console.log(child.age);         // 10 (own property)
console.log(child.firstName);   // "John" (from parent)
console.log(child.surname);     // "Smith" (from grandparent)

// Chain: child → parent → grandparent → Object.prototype → null

// Check if property is own or inherited
console.log(child.hasOwnProperty('age'));        // true
console.log(child.hasOwnProperty('firstName'));  // false
console.log(child.hasOwnProperty('surname'));    // false

/* ============================================================
   3. Constructor Functions
   ============================================================ */

/**
 * CONSTRUCTOR FUNCTIONS
 * ---------------------
 * Old way to create objects (before ES6 classes)
 * Function that creates objects when called with 'new'
 */

console.log("=== Constructor Functions ===");

function Person(name, age) {
  // 'this' refers to new object being created
  this.name = name;
  this.age = age;
}

// Add method to prototype (shared by all instances)
Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

Person.prototype.getAge = function() {
  return this.age;
};

// Create instances
const alice = new Person("Alice", 25);
const bob = new Person("Bob", 30);

console.log(alice.greet());     // "Hello, I'm Alice"
console.log(bob.greet());       // "Hello, I'm Bob"

// Same method reference (memory efficient)
console.log(alice.greet === bob.greet);  // true

/**
 * WHAT 'new' DOES:
 * 1. Creates empty object {}
 * 2. Sets its prototype to Constructor.prototype
 * 3. Calls constructor with 'this' = new object
 * 4. Returns the object (unless constructor returns object)
 */

/* ============================================================
   4. ES6 Classes
   ============================================================ */

/**
 * ES6 CLASSES
 * -----------
 * Modern syntax for creating objects
 * Syntactic sugar over prototypes
 * 
 * CLEANER & EASIER TO READ!
 */

console.log("=== ES6 Classes ===");

class Animal {
  // Constructor (called when creating instance)
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  
  // Method (added to prototype)
  speak() {
    return `${this.name} makes a sound`;
  }
  
  info() {
    return `${this.name} is a ${this.type}`;
  }
}

// Create instances
const cat = new Animal("Whiskers", "cat");
const parrot = new Animal("Polly", "bird");

console.log(cat.speak());       // "Whiskers makes a sound"
console.log(parrot.info());     // "Polly is a bird"

// Still uses prototypes under the hood
console.log(cat.speak === parrot.speak);  // true

/* ============================================================
   5. Inheritance
   ============================================================ */

/**
 * INHERITANCE
 * -----------
 * Create class based on another class
 * Child class inherits parent's properties and methods
 */

console.log("=== Inheritance ===");

class Dog extends Animal {
  constructor(name, breed) {
    // Call parent constructor
    super(name, "dog");
    this.breed = breed;
  }
  
  // Override parent method
  speak() {
    return `${this.name} barks!`;
  }
  
  // New method specific to Dog
  fetch() {
    return `${this.name} fetches the ball`;
  }
  
  // Call parent method
  describe() {
    return super.info() + ` and is a ${this.breed}`;
  }
}

const buddy = new Dog("Buddy", "Golden Retriever");

console.log(buddy.speak());      // "Buddy barks!" (overridden)
console.log(buddy.info());       // "Buddy is a dog" (inherited)
console.log(buddy.fetch());      // "Buddy fetches the ball" (own)
console.log(buddy.describe());   // Uses super

// instanceof check
console.log(buddy instanceof Dog);      // true
console.log(buddy instanceof Animal);   // true
console.log(buddy instanceof Object);   // true

/* ============================================================
   6. Static Methods
   ============================================================ */

/**
 * STATIC METHODS
 * --------------
 * Methods called on class itself, not instances
 * 
 * ANALOGY:
 * Regular method = Instance behavior (dog.bark())
 * Static method = Class behavior (Dog.compare())
 */

console.log("=== Static Methods ===");

class MathHelper {
  // Regular method (needs instance)
  double(n) {
    return n * 2;
  }
  
  // Static method (called on class)
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
  
  static PI = 3.14159;  // Static property
}

// Static: Called on class
console.log(MathHelper.add(5, 3));       // 8
console.log(MathHelper.multiply(4, 2));  // 8
console.log(MathHelper.PI);              // 3.14159

// Regular: Needs instance
const helper = new MathHelper();
console.log(helper.double(5));           // 10

// Real-world example
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  // Instance method
  sendEmail() {
    return `Sending email to ${this.email}`;
  }
  
  // Static utility method
  static validateEmail(email) {
    return email.includes('@');
  }
  
  static compare(user1, user2) {
    return user1.name.localeCompare(user2.name);
  }
}

console.log(User.validateEmail('test@example.com'));  // true

/* ============================================================
   7. Getters and Setters
   ============================================================ */

/**
 * GETTERS & SETTERS
 * -----------------
 * Special methods that act like properties
 * Control access to object data
 */

console.log("=== Getters and Setters ===");

class Rectangle {
  constructor(width, height) {
    this._width = width;   // _ convention for "private"
    this._height = height;
  }
  
  // Getter: Access like property
  get area() {
    return this._width * this._height;
  }
  
  get perimeter() {
    return 2 * (this._width + this._height);
  }
  
  // Setter: Set like property
  set width(value) {
    if (value > 0) {
      this._width = value;
    } else {
      console.error("Width must be positive");
    }
  }
  
  set height(value) {
    if (value > 0) {
      this._height = value;
    }
  }
}

const rect = new Rectangle(10, 5);

// Access like properties (no parentheses!)
console.log(rect.area);       // 50 (calls getter)
console.log(rect.perimeter);  // 30

// Set like properties
rect.width = 20;              // calls setter
console.log(rect.area);       // 100

rect.width = -5;              // Error: Width must be positive

/* ============================================================
   8. Private Fields
   ============================================================ */

/**
 * PRIVATE FIELDS
 * --------------
 * True private properties (ES2022)
 * Use # prefix
 */

console.log("=== Private Fields ===");

class BankAccount {
  // Private field
  #balance = 0;
  
  constructor(initialBalance) {
    this.#balance = initialBalance;
  }
  
  // Public method to access private field
  getBalance() {
    return this.#balance;
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return true;
    }
    return false;
  }
  
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }
  
  // Private method
  #log(message) {
    console.log(`[LOG] ${message}`);
  }
}

const account = new BankAccount(1000);

console.log(account.getBalance());    // 1000
account.deposit(500);
console.log(account.getBalance());    // 1500

// Can't access private field directly
// console.log(account.#balance);     // SyntaxError!

/**
 * ============================================================
 * Complete Example: Game Character System
 * ============================================================
 */

class Character {
  #health = 100;
  
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  
  get health() {
    return this.#health;
  }
  
  takeDamage(amount) {
    this.#health = Math.max(0, this.#health - amount);
    console.log(`${this.name} took ${amount} damage. Health: ${this.#health}`);
  }
  
  heal(amount) {
    this.#health = Math.min(100, this.#health + amount);
    console.log(`${this.name} healed ${amount}. Health: ${this.#health}`);
  }
  
  isAlive() {
    return this.#health > 0;
  }
  
  attack() {
    return `${this.name} attacks!`;
  }
}

class Warrior extends Character {
  constructor(name) {
    super(name, 'Warrior');
    this.weapon = 'Sword';
  }
  
  attack() {
    return `${this.name} swings ${this.weapon}!`;
  }
  
  block() {
    return `${this.name} blocks with shield!`;
  }
}

class Mage extends Character {
  #mana = 100;
  
  constructor(name) {
    super(name, 'Mage');
  }
  
  attack() {
    if (this.#mana >= 10) {
      this.#mana -= 10;
      return `${this.name} casts fireball! Mana: ${this.#mana}`;
    }
    return `${this.name} is out of mana!`;
  }
}

// Create characters
const warrior = new Warrior('Conan');
const mage = new Mage('Gandalf');

console.log(warrior.attack());   // "Conan swings Sword!"
console.log(mage.attack());      // "Gandalf casts fireball!"

warrior.takeDamage(30);
warrior.heal(20);

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. Prototypes are JavaScript's inheritance mechanism
 * 2. Every object has a hidden [[Prototype]]
 * 3. Prototype chain: object → prototype → ... → null
 * 4. Constructor functions: old way (function + new)
 * 5. ES6 Classes: modern syntax (class keyword)
 * 6. extends: Create child class
 * 7. super: Call parent constructor/methods
 * 8. static: Methods on class, not instances
 * 9. get/set: Control property access
 * 10. #field: True private properties (ES2022)
 *
 * ============================================================
 * End of File
 * ============================================================
 */
