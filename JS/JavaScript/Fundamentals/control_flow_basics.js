/**
 * ============================================
 * JavaScript Basics: Operators, Control Flow,
 * and Loops — with examples and comments
 *
 * Purpose:
 * - Quick reference / revision file
 * - Shows common syntax and usage patterns
 *
 * Tip:
 * - Prefer `const` by default
 * - Use `let` when reassignment is needed
 * - Avoid `var` in modern JS
 * ============================================
 */

/* ======================================================
   OPERATORS & COMPARISONS
   ====================================================== */

// Arithmetic operators
const a = 10;
const b = 3;

console.log(a + b); // 13 → addition
console.log(a - b); // 7  → subtraction
console.log(a * b); // 30 → multiplication
console.log(a / b); // 3.333... → division
console.log(a % b); // 1 → remainder (modulus)

// Assignment operators
let x = 5;
x += 2; // same as x = x + 2 → 7
x *= 3; // same as x = x * 3 → 21
console.log(x);

// Comparison operators
console.log(5 == "5"); // true  → loose equality (type coercion)
console.log(5 === "5"); // false → strict equality (preferred)
console.log(5 !== 4); // true
console.log(5 > 3); // true
console.log(5 <= 5); // true

// Logical operators
console.log(true && false); // false → AND
console.log(true || false); // true  → OR
console.log(!true); // false → NOT

/* ======================================================
   CONTROL FLOW
   ====================================================== */

// if / else example
const age = 18;

if (age >= 18) {
  console.log("You are allowed to vote");
} else {
  console.log("You are not allowed to vote");
}

// else if example
const score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else {
  console.log("Grade: C or below");
}

// switch statement
const day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the work week");
    break; // prevents fall-through
  case "Friday":
    console.log("Almost the weekend");
    break;
  default:
    console.log("Just another day");
}

/* ======================================================
   LOOPS
   ====================================================== */

// for loop
// Best when you know how many times to loop
for (let i = 0; i < 3; i++) {
  console.log("for loop index:", i);
}

// while loop
// Best when the number of iterations is unknown
let count = 0;

while (count < 3) {
  console.log("while loop count:", count);
  count++; // important to avoid infinite loops
}

// for...of loop
// Used for iterating over values in arrays or strings
const fruits = ["apple", "banana", "cherry"];

for (const fruit of fruits) {
  console.log("for...of value:", fruit);
}

// for...in loop
// Used for iterating over keys in objects
const user = {
  name: "Alex",
  age: 30,
  role: "admin",
};

for (const key in user) {
  console.log("for...in key/value:", key, user[key]);
}

/**
 * ======================================================
 * Summary:
 * - Use === instead of ==
 * - for...of → arrays / iterable values
 * - for...in → object keys
 * - switch → many conditions for one value
 * ======================================================
 */