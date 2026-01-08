/**
 * arrays-advanced.js
 * ===============================
 * Covers:
 * - Mutate vs Immutable
 * - Non-mutating methods
 * - Modern ES2023+ methods
 * - Common patterns (React-safe)
 */

/* ======================================
   MUTATION VS IMMUTABILITY
====================================== */

const original = [1, 2, 3];

/**
 * MUTATION
 * Changes original array (same reference)
 */
original.push(4);
console.log(original); // [1,2,3,4]

/**
 * IMMUTABLE UPDATE
 * Returns a NEW array
 */
const immutableAdd = [...original, 5];
console.log(original); // unchanged
console.log(immutableAdd);

/* ======================================
   TRANSFORMATION METHODS (IMMUTABLE)
====================================== */

// map → transform elements
const doubled = original.map((x) => x * 2);
console.log(doubled);

// filter → remove elements conditionally
const evens = original.filter((x) => x % 2 === 0);
console.log(evens);

// reduce → accumulate to single value
const sum = original.reduce((acc, x) => acc + x, 0);
console.log(sum);

/* ======================================
   SLICE VS SPLICE
====================================== */

const nums = [10, 20, 30, 40];

// slice (IMMUTABLE)
const sliced = nums.slice(1, 3);
console.log(nums, sliced);

// splice (MUTATES)
nums.splice(1, 1);
console.log(nums);

/* ======================================
   SORTING (IMPORTANT TRAP)
====================================== */

const scores = [50, 10, 40];

// MUTATES
scores.sort((a, b) => a - b);
console.log(scores);

// IMMUTABLE (ES2023+)
const safeSorted = scores.toSorted((a, b) => b - a);
console.log(safeSorted);

/* ======================================
   MODERN IMMUTABLE METHODS (ES2023+)
====================================== */

const data = [1, 2, 3];

// Replace element immutably
const replaced = data.with(1, 99);
console.log(data, replaced);

// Reverse immutably
console.log(data.toReversed());

// Splice immutably
console.log(data.toSpliced(1, 1, 100));

/* ======================================
   FLATTENING
====================================== */

const nested = [1, [2, [3, 4]]];

// flat
console.log(nested.flat(2));

// flatMap
console.log([1, 2, 3].flatMap((x) => [x, x * 2]));

/* ======================================
   FINDING ELEMENTS
====================================== */

// find → value
console.log(data.find((x) => x > 1));

// findIndex → index
console.log(data.findIndex((x) => x === 2));

// findLast (from right)
console.log([1, 2, 3, 2].findLast((x) => x === 2));

/* ======================================
   REACT-SAFE PATTERNS
====================================== */

// Add item
const addItem = (arr) => [...arr, 10];

// Remove item by index
const removeAt = (arr, index) => arr.filter((_, i) => i !== index);

// Update item
const updateAt = (arr, index, value) =>
  arr.map((x, i) => (i === index ? value : x));

console.log(addItem([1, 2, 3]));
console.log(removeAt([1, 2, 3], 1));
console.log(updateAt([1, 2, 3], 2, 99));

/* ======================================
   REFERENCE CHECK (CRITICAL)
====================================== */

const a = [1, 2];
const b = a;

b.push(3);
console.log(a); // mutated due to shared reference 😱

const c = [...a];
c.push(4);
console.log(a); // safe
console.log(c);
