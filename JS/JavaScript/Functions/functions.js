/**
 * ============================================================
 * JavaScript Functions – Types & Usage in One File
 * ============================================================
 *
 * Topics covered:
 * 1. What functions are
 * 2. Function declarations
 * 3. Function expressions
 * 4. Arrow functions
 * 5. Parameters vs arguments
 * 6. Default parameters
 * 7. Return values
 * 8. Anonymous functions
 * 9. Callback functions
 * 10. IIFE (Immediately Invoked Function Expressions)
 * 11. Higher-order functions
 * 12. Pure vs impure functions
 *
 * Real-world explanations for modern JavaScript.
 * ============================================================
 */

/* ============================================================
   1. What Are Functions?
   ============================================================ */

/**
 * A function is a reusable block of code
 * designed to perform a specific task.
 *
 * Functions help with:
 * - Reusability
 * - Readability
 * - Abstraction
 */

function greet() {
  console.log("Hello!");
}

greet(); // "Hello!"

/* ============================================================
   2. Function Declarations
   ============================================================ */

/**
 * Function declaration syntax:
 *
 * function name() {}
 *
 * IMPORTANT:
 * Function declarations are HOISTED.
 * This means they can be called BEFORE they are defined.
 */

sayHi();

function sayHi() {
  console.log("Hi!");
}

/* ============================================================
   3. Function Expressions
   ============================================================ */

/**
 * A function expression assigns a function
 * to a variable.
 *
 * Function expressions are NOT hoisted.
 */

const sayHello = function () {
  console.log("Hello!");
};

sayHello();

/* ============================================================
   4. Arrow Functions (=>)
   ============================================================ */

/**
 * Arrow functions are a shorter syntax
 * for function expressions.
 *
 * Key differences:
 * - No own `this`
 * - No `arguments` object
 * - Cannot be used as constructors
 */

const add = (a, b) => {
  return a + b;
};

console.log(add(2, 3)); // 5

/**
 * Implicit return (single expression):
 */

const multiply = (a, b) => a * b;
console.log(multiply(2, 3)); // 6

/* ============================================================
   5. Parameters vs Arguments
   ============================================================ */

/**
 * Parameters:
 * Variables listed in the function definition.
 *
 * Arguments:
 * Actual values passed when calling the function.
 */

function introduce(name, age) { // parameters
  console.log(name, age);
}

introduce("Sam", 25); // arguments

/* ============================================================
   6. Default Parameters
   ============================================================ */

/**
 * Default parameters are used when
 * an argument is undefined.
 */

function createUser(role = "user") {
  console.log(role);
}

createUser();        // "user"
createUser("admin"); // "admin"

/* ============================================================
   7. Return Values
   ============================================================ */

/**
 * Functions can return values using `return`.
 *
 * Without return, a function returns undefined.
 */

function square(num) {
  return num * num;
}

const result = square(4);
console.log(result); // 16

/* ============================================================
   8. Anonymous Functions
   ============================================================ */

/**
 * Anonymous functions are functions
 * without a name.
 *
 * Commonly used as:
 * - Callbacks
 * - Function expressions
 */

setTimeout(function () {
  console.log("Runs later");
}, 1000);

/* ============================================================
   9. Callback Functions
   ============================================================ */

/**
 * A callback is a function passed
 * into another function as an argument.
 */

function process(value, callback) {
  callback(value);
}

process("Data", function (data) {
  console.log(data);
});

/* ============================================================
   10. IIFE (Immediately Invoked Function Expression)
   ============================================================ */

/**
 * An IIFE runs immediately after being defined.
 *
 * Used to:
 * - Avoid polluting global scope
 * - Create private variables
 */

(function () {
  console.log("I run immediately!");
})();

/* ============================================================
   11. Higher-Order Functions
   ============================================================ */

/**
 * A higher-order function:
 * - Accepts functions as arguments
 * - OR returns a function
 */

function multiplyBy(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
console.log(double(5)); // 10

/* ============================================================
   12. Pure vs Impure Functions
   ============================================================ */

/**
 * Pure functions:
 * - Same input → same output
 * - No side effects
 */

function pureAdd(a, b) {
  return a + b;
}

/**
 * Impure functions:
 * - Depend on external state
 * - Cause side effects
 */

let count = 0;

function impureIncrement() {
  count++;
  return count;
}


