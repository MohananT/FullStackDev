/**
 * ============================================================
 * JavaScript 'this' Keyword
 * ============================================================
 *
 * Topics covered:
 * 1. What is 'this'?
 * 2. Global context
 * 3. Object methods
 * 4. Constructor functions
 * 5. Arrow functions
 * 6. call, apply, bind
 * 7. Event handlers
 * 8. Common pitfalls
 *
 * ============================================================
 */

/* ============================================================
   1. What is 'this'?
   ============================================================ */

/**
 * THE 'this' KEYWORD
 * ------------------
 * Special keyword that refers to current execution context
 * 
 * ANALOGY: "Me" in conversation
 * - "I am hungry" - "I" depends on who's speaking
 * - 'this' depends on HOW function is called
 * 
 * KEY RULE:
 * 'this' is determined by HOW a function is CALLED,
 * NOT where it's DEFINED
 * 
 * 4 BINDING RULES:
 * 1. Default binding (global)
 * 2. Implicit binding (object method)
 * 3. Explicit binding (call, apply, bind)
 * 4. new binding (constructor)
 */

/* ============================================================
   2. Global Context
   ============================================================ */

/**
 * GLOBAL CONTEXT
 * --------------
 * Outside any function, 'this' = global object
 * Browser: window
 * Node.js: global
 */

console.log("=== Global Context ===");

console.log(this);  // window (browser) or global (Node.js)

function regularFunction() {
  console.log(this);  // window/global (non-strict mode)
                      // undefined (strict mode)
}

regularFunction();

/**
 * STRICT MODE:
 * In strict mode, 'this' is undefined in regular functions
 */

'use strict';
function strictFunction() {
  console.log(this);  // undefined
}

// strictFunction();

/* ============================================================
   3. Object Methods
   ============================================================ */

/**
 * OBJECT METHOD CONTEXT
 * ---------------------
 * When function is called as object method,
 * 'this' = the object
 */

console.log("=== Object Methods ===");

const user = {
  name: 'Alice',
  age: 25,
  
  // Method
  greet() {
    console.log(`Hello, I'm ${this.name}`);
    console.log(this);  // 'this' = user object
  },
  
  getAge() {
    return this.age;
  },
  
  // Nested method
  profile: {
    bio: 'Developer',
    show() {
      console.log(this);  // 'this' = profile object (NOT user!)
    }
  }
};

user.greet();           // 'this' = user
console.log(user.getAge());  // 'this' = user

user.profile.show();    // 'this' = profile

/**
 * IMPORTANT: 'this' = object BEFORE the dot
 */

/* ============================================================
   4. Constructor Functions
   ============================================================ */

/**
 * CONSTRUCTOR CONTEXT
 * -------------------
 * With 'new' keyword, 'this' = new object being created
 */

console.log("=== Constructor Functions ===");

function Person(name, age) {
  // 'this' = new empty object
  this.name = name;
  this.age = age;
  
  this.greet = function() {
    console.log(`Hi, I'm ${this.name}`);
  };
}

const alice = new Person('Alice', 25);
const bob = new Person('Bob', 30);

alice.greet();  // 'this' = alice
bob.greet();    // 'this' = bob

/* ============================================================
   5. Arrow Functions
   ============================================================ */

/**
 * ARROW FUNCTIONS & 'this'
 * -------------------------
 * Arrow functions DON'T have their own 'this'
 * Inherit 'this' from surrounding scope (lexical 'this')
 * 
 * IMPORTANT: Arrow functions CANNOT change 'this'
 */

console.log("=== Arrow Functions ===");

const person = {
  name: 'Alice',
  
  // Regular function
  greet: function() {
    console.log(`Hello from ${this.name}`);
    
    // setTimeout with regular function
    setTimeout(function() {
      console.log(this);  // window/global (NOT person!)
    }, 100);
    
    // setTimeout with arrow function
    setTimeout(() => {
      console.log(this.name);  // 'Alice' (inherits 'this' from greet)
    }, 100);
  },
  
  // Arrow function as method (DON'T DO THIS!)
  sayHi: () => {
    console.log(this);  // window/global (NOT person!)
  }
};

person.greet();  // 'this' = person
person.sayHi();  // 'this' = window/global (WRONG!)

/**
 * ARROW FUNCTION RULES:
 * ✅ Use for callbacks inside methods
 * ❌ Don't use as object methods
 */

/* ============================================================
   6. call, apply, bind
   ============================================================ */

/**
 * EXPLICIT BINDING
 * ----------------
 * Manually set what 'this' should be
 */

console.log("=== call, apply, bind ===");

function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const user1 = { name: 'Alice' };
const user2 = { name: 'Bob' };

/**
 * CALL:
 * call(thisArg, arg1, arg2, ...)
 * Calls function immediately with 'this' = thisArg
 */

console.log(introduce.call(user1, 'Hello', '!'));
// "Hello, I'm Alice!"

console.log(introduce.call(user2, 'Hi', '.'));
// "Hi, I'm Bob."

/**
 * APPLY:
 * apply(thisArg, [argsArray])
 * Same as call, but arguments in array
 */

console.log(introduce.apply(user1, ['Hey', '...']));
// "Hey, I'm Alice..."

/**
 * BIND:
 * bind(thisArg, arg1, arg2, ...)
 * Returns NEW function with 'this' bound permanently
 * Doesn't call immediately
 */

const aliceIntroduce = introduce.bind(user1);
console.log(aliceIntroduce('Greetings', '!'));
// "Greetings, I'm Alice!"

// Can also bind arguments
const aliceHello = introduce.bind(user1, 'Hello');
console.log(aliceHello('!!!'));
// "Hello, I'm Alice!!!"

/**
 * PRACTICAL EXAMPLE:
 */

const calculator = {
  value: 0,
  
  add(n) {
    this.value += n;
    return this;
  },
  
  multiply(n) {
    this.value *= n;
    return this;
  },
  
  getValue() {
    return this.value;
  }
};

// Method borrowing
const obj = { value: 5 };
calculator.add.call(obj, 10);
console.log(obj.value);  // 15

/* ============================================================
   7. Event Handlers
   ============================================================ */

/**
 * EVENT HANDLER CONTEXT
 * ---------------------
 * In event handlers, 'this' = element that received event
 */

console.log("=== Event Handlers ===");

// Example HTML: <button id="btn">Click me</button>

// Regular function
/*
document.getElementById('btn').addEventListener('click', function() {
  console.log(this);  // <button> element
  this.textContent = 'Clicked!';
});
*/

// Arrow function
/*
document.getElementById('btn').addEventListener('click', () => {
  console.log(this);  // window (NOT button!)
  // Can't access button element with 'this'
});
*/

// Solution with arrow function
/*
const button = document.getElementById('btn');
button.addEventListener('click', () => {
  console.log(button);  // Use variable instead
  button.textContent = 'Clicked!';
});
*/

/* ============================================================
   8. Common Pitfalls
   ============================================================ */

/**
 * PITFALL 1: Losing 'this' context
 * ---------------------------------
 */

console.log("=== Common Pitfalls ===");

const counter = {
  count: 0,
  
  increment() {
    this.count++;
  }
};

counter.increment();
console.log(counter.count);  // 1

// ❌ Losing context
const increment = counter.increment;
// increment();  // Error! 'this' is undefined/window

// ✅ Solution 1: bind
const boundIncrement = counter.increment.bind(counter);
boundIncrement();
console.log(counter.count);  // 2

// ✅ Solution 2: Arrow function wrapper
const wrappedIncrement = () => counter.increment();
wrappedIncrement();
console.log(counter.count);  // 3

/**
 * PITFALL 2: Arrow function as method
 * ------------------------------------
 */

const obj = {
  name: 'Alice',
  
  // ❌ Wrong: Arrow function
  greet: () => {
    console.log(this.name);  // undefined (this = window)
  },
  
  // ✅ Correct: Regular function
  sayHi() {
    console.log(this.name);  // 'Alice'
  }
};

/**
 * PITFALL 3: Callback 'this' confusion
 * -------------------------------------
 */

const timer = {
  seconds: 0,
  
  // ❌ Wrong: Regular function callback
  startWrong() {
    setInterval(function() {
      this.seconds++;  // 'this' = window!
      console.log(this.seconds);
    }, 1000);
  },
  
  // ✅ Correct: Arrow function callback
  startRight() {
    setInterval(() => {
      this.seconds++;  // 'this' = timer
      console.log(this.seconds);
    }, 1000);
  },
  
  // ✅ Also correct: bind
  startWithBind() {
    setInterval(function() {
      this.seconds++;
      console.log(this.seconds);
    }.bind(this), 1000);
  }
};

/**
 * ============================================================
 * Summary: 'this' Determination Rules
 * ============================================================
 *
 * 1. NEW BINDING:
 *    new Func() → 'this' = new object
 *
 * 2. EXPLICIT BINDING:
 *    func.call(obj) → 'this' = obj
 *    func.apply(obj) → 'this' = obj
 *    func.bind(obj) → returns function with 'this' = obj
 *
 * 3. IMPLICIT BINDING:
 *    obj.func() → 'this' = obj
 *
 * 4. DEFAULT BINDING:
 *    func() → 'this' = window/global (or undefined in strict mode)
 *
 * 5. ARROW FUNCTIONS:
 *    Inherit 'this' from surrounding scope (lexical)
 *    Cannot be changed with call/apply/bind
 *
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. 'this' depends on HOW function is called
 * 2. Object method: this = object
 * 3. Constructor: this = new object
 * 4. Arrow functions: inherit 'this' from parent scope
 * 5. call/apply: call function with specific 'this'
 * 6. bind: create new function with permanent 'this'
 * 7. Event handlers: this = element (regular function)
 * 8. Use arrow functions for callbacks
 * 9. Don't use arrow functions as object methods
 * 10. Use bind() to preserve 'this' context
 *
 * ============================================================
 * End of File
 * ============================================================
 */
