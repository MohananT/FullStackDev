/**
 * ============================================================
 * JavaScript Loops – Complete Guide
 * ============================================================
 *
 * Topics covered:
 * 1. for loop
 * 2. while loop
 * 3. do...while loop
 * 4. for...in loop (objects)
 * 5. for...of loop (iterables)
 * 6. Array iteration methods (forEach, map, filter, etc.)
 * 7. break and continue
 * 8. Nested loops
 * 9. Loop performance tips
 *
 * ============================================================
 */

/* ============================================================
   1. for Loop
   ============================================================ */

/**
 * WHAT IS A for LOOP?
 * -------------------
 * A for loop repeats a block of code a specific number of times
 * 
 * REAL-WORLD ANALOGY:
 * "Do 10 pushups"
 * - Start counting from 1
 * - Do one pushup
 * - Increment counter
 * - Repeat until you reach 10
 * 
 * SYNTAX BREAKDOWN:
 * for (initialization; condition; increment) {
 *   // code to repeat
 * }
 * 
 * THREE PARTS:
 * 1. initialization: Runs ONCE before loop starts (let i = 0)
 * 2. condition: Checked BEFORE each iteration (i < 5)
 * 3. increment: Runs AFTER each iteration (i++)
 * 
 * EXECUTION FLOW:
 * 1. Run initialization: let i = 0
 * 2. Check condition: is i < 5? 
 *    YES → execute code block
 *    NO → exit loop
 * 3. Run increment: i++
 * 4. Go back to step 2
 * 
 * WHEN TO USE:
 * ✅ You know exactly how many times to loop
 * ✅ Need access to index/counter
 * ✅ Want fine control over iteration
 * 
 * BEST FOR:
 * - Iterating arrays with index
 * - Counting from X to Y
 * - Creating ranges
 */

console.log("=== for loop ===");

/**
 * EXAMPLE 1: Basic counting
 * --------------------------
 * Count from 0 to 4 (5 iterations)
 */

for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

/**
 * WHAT HAPPENS (Step by Step):
 * -----------------------------
 * Before loop: let i = 0
 * 
 * Iteration 1:
 *   - Check: is 0 < 5? YES
 *   - Execute: console.log(0)
 *   - Increment: i++ (i becomes 1)
 * 
 * Iteration 2:
 *   - Check: is 1 < 5? YES
 *   - Execute: console.log(1)
 *   - Increment: i++ (i becomes 2)
 * 
 * ... continues ...
 * 
 * Iteration 5:
 *   - Check: is 4 < 5? YES
 *   - Execute: console.log(4)
 *   - Increment: i++ (i becomes 5)
 * 
 * Iteration 6:
 *   - Check: is 5 < 5? NO
 *   - EXIT LOOP
 */

// Counting backwards
for (let i = 5; i > 0; i--) {
  console.log(i); // 5, 4, 3, 2, 1
}

// Step by 2
for (let i = 0; i <= 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8, 10
}

/* ============================================================
   2. while Loop
   ============================================================ */

/**
 * while loop
 * Best for: when you don't know how many iterations
 * Condition checked BEFORE each iteration
 */

console.log("=== while loop ===");

let count = 0;
while (count < 3) {
  console.log(`Count is ${count}`);
  count++;
}

// Example: process until condition met
let sum = 0;
let num = 1;
while (sum < 10) {
  sum += num;
  num++;
}
console.log(`Sum reached: ${sum}`);

/* ============================================================
   3. do...while Loop
   ============================================================ */

/**
 * do...while loop
 * Always runs at least once
 * Condition checked AFTER each iteration
 */

console.log("=== do...while loop ===");

let attempt = 0;
do {
  console.log(`Attempt ${attempt}`);
  attempt++;
} while (attempt < 3);

// Runs once even if condition is false
let x = 10;
do {
  console.log("Runs once!"); // prints once
} while (x < 5);

/* ============================================================
   4. for...in Loop (Objects)
   ============================================================ */

/**
 * for...in iterates over enumerable properties
 * Best for: objects
 * Warning: also iterates inherited properties
 */

console.log("=== for...in loop ===");

const person = {
  name: "Alice",
  age: 30,
  city: "NYC"
};

for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}

// With arrays (not recommended - use for...of instead)
const colors = ["red", "blue", "green"];
for (let index in colors) {
  console.log(index); // "0", "1", "2" (strings!)
}

/* ============================================================
   5. for...of Loop (Iterables)
   ============================================================ */

/**
 * for...of iterates over iterable values
 * Best for: arrays, strings, maps, sets
 * Modern and clean syntax
 */

console.log("=== for...of loop ===");

const fruits = ["apple", "banana", "orange"];

// Iterate over values
for (const fruit of fruits) {
  console.log(fruit);
}

// Iterate over string characters
const text = "Hello";
for (const char of text) {
  console.log(char); // H, e, l, l, o
}

// With index using entries()
for (const [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}

// Iterate over Map
const map = new Map([
  ["a", 1],
  ["b", 2]
]);

for (const [key, value] of map) {
  console.log(`${key} = ${value}`);
}

// Iterate over Set
const set = new Set([1, 2, 3]);
for (const value of set) {
  console.log(value);
}

/* ============================================================
   6. Array Iteration Methods
   ============================================================ */

/**
 * Modern array methods
 * More functional and declarative
 */

console.log("=== Array methods ===");

const numbers = [1, 2, 3, 4, 5];

// forEach - execute function for each element
numbers.forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});

// map - transform each element (returns new array)
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - keep elements that pass test
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

// find - get first element that matches
const found = numbers.find(num => num > 3);
console.log(found); // 4

// findIndex - get index of first match
const foundIndex = numbers.findIndex(num => num > 3);
console.log(foundIndex); // 3

// some - check if ANY element passes test
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

// every - check if ALL elements pass test
const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true

// reduce - reduce array to single value
const total = numbers.reduce((acc, num) => acc + num, 0);
console.log(total); // 15

/* ============================================================
   7. break and continue
   ============================================================ */

/**
 * break - exit loop completely
 * continue - skip to next iteration
 */

console.log("=== break and continue ===");

// break example
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // exit loop when i is 5
  }
  console.log(i); // 0, 1, 2, 3, 4
}

// continue example
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // skip when i is 2
  }
  console.log(i); // 0, 1, 3, 4
}

// Finding first matching item
const items = [1, 3, 5, 8, 10];
let firstEven;

for (const item of items) {
  if (item % 2 === 0) {
    firstEven = item;
    break; // found it, exit early
  }
}
console.log(firstEven); // 8

/* ============================================================
   8. Nested Loops
   ============================================================ */

/**
 * Loops inside loops
 * Useful for: multi-dimensional data, combinations
 */

console.log("=== Nested loops ===");

// Multiplication table
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}

// 2D array (matrix)
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    console.log(`[${row}][${col}] = ${matrix[row][col]}`);
  }
}

// Pattern printing
console.log("Triangle pattern:");
for (let i = 1; i <= 5; i++) {
  let line = "";
  for (let j = 1; j <= i; j++) {
    line += "*";
  }
  console.log(line);
}

/* ============================================================
   9. Loop Performance Tips
   ============================================================ */

/**
 * Performance considerations
 */

console.log("=== Performance tips ===");

const largeArray = Array.from({ length: 1000 }, (_, i) => i);

// ❌ Bad: recalculating length every iteration
console.time("bad");
for (let i = 0; i < largeArray.length; i++) {
  // do something
}
console.timeEnd("bad");

// ✅ Good: cache length
console.time("good");
const len = largeArray.length;
for (let i = 0; i < len; i++) {
  // do something
}
console.timeEnd("good");

// ✅ Best: use for...of for readability (modern engines optimize)
console.time("for...of");
for (const item of largeArray) {
  // do something
}
console.timeEnd("for...of");

/**
 * When to use which loop:
 *
 * for        - when you need index or control over iteration
 * for...of   - when iterating arrays/iterables (most common)
 * for...in   - when iterating object keys
 * while      - when you don't know iteration count
 * do...while - when you need at least one iteration
 * forEach    - when you want functional style (can't break)
 * map/filter - when transforming/filtering arrays
 */

/**
 * ============================================================
 * End of File
 * ============================================================
 */
