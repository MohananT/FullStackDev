/**
 * ============================================================
 * JavaScript Arrays – Complete Examples in One File
 * ============================================================
 *
 * Topics covered:
 * 1. Creating arrays
 * 2. Accessing elements
 * 3. length property
 * 4. push(), pop()
 * 5. unshift(), shift()
 * 6. slice() vs splice()
 * 7. forEach()
 * 8. map()
 * 9. filter()
 * 10. find()
 * 11. includes() / indexOf()
 * 12. join()
 * 13. reduce()
 *
 * This file is meant for learning and reference.
 * Open it, run it, tweak values, and observe the output.
 * ============================================================
 */

/* ============================================================
   1. Creating Arrays
   ============================================================ */

const numbers = [1, 2, 3, 4];
const fruits = ["apple", "banana", "mango"];

console.log(numbers);
console.log(fruits);

/* ============================================================
   2. Accessing Elements
   ============================================================ */

console.log(fruits[0]); // "apple"
console.log(fruits[2]); // "mango"

/* ============================================================
   3. length Property
   ============================================================ */

console.log(fruits.length); // 3

// Last element trick
console.log(fruits[fruits.length - 1]); // "mango"

/* ============================================================
   4. push() and pop()
   ============================================================ */

const stack = [10, 20];

stack.push(30); // add to END
console.log(stack); // [10, 20, 30]

stack.pop(); // remove from END
console.log(stack); // [10, 20]

/* ============================================================
   5. unshift() and shift()
   ============================================================ */

const queue = [2, 3];

queue.unshift(1); // add to START
console.log(queue); // [1, 2, 3]

queue.shift(); // remove from START
console.log(queue); // [2, 3]

/* ============================================================
   6. slice() vs splice()
   ============================================================ */

const arr = [1, 2, 3, 4, 5];

// slice → DOES NOT modify original
const part = arr.slice(1, 4);
console.log(part); // [2, 3, 4]
console.log(arr); // [1, 2, 3, 4, 5]

// splice → DOES modify original
arr.splice(2, 2); // remove 2 items starting at index 2
console.log(arr); // [1, 2, 5]

/* ============================================================
   7. forEach()
   ============================================================ */

const nums = [1, 2, 3];

nums.forEach((n, i) => {
  console.log(`Index ${i}: ${n}`);
});

/* ============================================================
   8. map()
   ============================================================ */

// Creates NEW array
const doubled = nums.map((n) => n * 2);
console.log(doubled); // [2, 4, 6]

/* ============================================================
   9. filter()
   ============================================================ */

// Keep elements that match condition
const evens = [1, 2, 3, 4, 5, 6].filter((n) => n % 2 === 0);
console.log(evens); // [2, 4, 6]

/* ============================================================
   10. find()
   ============================================================ */

// Returns FIRST match
const found = [5, 10, 15].find((n) => n > 8);
console.log(found); // 10

/* ============================================================
   11. includes() and indexOf()
   ============================================================ */

const letters = ["a", "b", "c"];

console.log(letters.includes("b")); // true
console.log(letters.indexOf("c")); // 2
console.log(letters.indexOf("z")); // -1

/* ============================================================
   12. join()
   ============================================================ */

const words = ["Hello", "world"];
console.log(words.join(" ")); // "Hello world"

/* ============================================================
   13. reduce()
   ============================================================ */

// Accumulator pattern
const total = [1, 2, 3, 4].reduce((sum, num) => {
  return sum + num;
}, 0);

console.log(total); // 10

/**
 * ============================================================
 * End of File
 * ============================================================
 */
