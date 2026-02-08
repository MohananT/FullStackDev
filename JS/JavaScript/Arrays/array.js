/**
 * arrays-basic.js
 * ===============================
 * Covers:
 * - What arrays are
 * - Creation
 * - Access
 * - Basic mutating methods
 * - Simple iteration
 */

/* ======================================
   WHAT IS AN ARRAY?
====================================== */

// An array is an ordered collection of values
// Arrays are ZERO-indexed
const numbers = [10, 20, 30, 40];

console.log(numbers[0]); // 10
console.log(numbers.length); // 4

/* ======================================
   ARRAY CREATION
====================================== */

// Literal (preferred)
const a = [1, 2, 3];

// Using constructor
const b = new Array(1, 2, 3);

// Creates array of length 5 (empty slots)
const c = new Array(5);

console.log(a, b, c.length);

/* ======================================
   ADD / REMOVE ELEMENTS (MUTATING)
====================================== */

// push → add to end
a.push(4);
console.log(a);

// pop → remove from end
a.pop();
console.log(a);

// unshift → add to beginning
a.unshift(0);
console.log(a);

// shift → remove from beginning
a.shift();
console.log(a);

/* ======================================
   ACCESS & UPDATE
====================================== */

const fruits = ["apple", "banana", "orange"];

// Access
console.log(fruits[1]); // banana

// Update (MUTATES)
fruits[1] = "mango";
console.log(fruits);

/* ======================================
   LOOPING THROUGH ARRAYS
====================================== */

// Classic for loop
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// for...of (preferred)
for (const fruit of fruits) {
  console.log(fruit);
}

// forEach (cannot break)
fruits.forEach((fruit) => {
  console.log("forEach:", fruit);
});

/* ======================================
   BASIC SEARCHING
====================================== */

// indexOf
console.log(fruits.indexOf("mango")); // index or -1

// includes (better than indexOf)
console.log(fruits.includes("apple")); // true

/* ======================================
   BASIC STRING CONVERSION
====================================== */

// join
console.log(fruits.join(", "));

// toString
console.log(fruits.toString());

/* ======================================
   ARRAY CHECK
====================================== */

console.log(Array.isArray(fruits)); // true