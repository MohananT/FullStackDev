/**
 * ============================================================
 * Array Sorting & Utility Methods
 * ============================================================
 *
 * Topics covered:
 * 1. sort() and reverse()
 * 2. splice() and slice()
 * 3. flat() and flatMap()
 * 4. Array.from(), Array.of(), fill()
 * 5. join() and concat()
 *
 * ============================================================
 */

/* ============================================================
   1. sort() and reverse()
   ============================================================ */

console.log("=== sort() ===");

/**
 * sort() sorts array IN PLACE (mutates original)
 * Default: converts to strings and sorts alphabetically
 */

const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// ❌ Wrong: default sort (alphabetical)
const wrongSort = [...numbers].sort();
console.log(wrongSort); // [1, 1, 2, 3, 4, 5, 6, 9] - works for single digits
// But: [10, 2, 20, 3].sort() -> [10, 2, 20, 3] (wrong!)

// ✅ Correct: numeric sort
const ascending = [...numbers].sort((a, b) => a - b);
console.log("Ascending:", ascending); // [1, 1, 2, 3, 4, 5, 6, 9]

const descending = [...numbers].sort((a, b) => b - a);
console.log("Descending:", descending); // [9, 6, 5, 4, 3, 2, 1, 1]

// Sort strings alphabetically
const words = ["banana", "apple", "cherry", "date"];
words.sort();
console.log(words); // ["apple", "banana", "cherry", "date"]

// Case-insensitive sort
const mixed = ["Banana", "apple", "Cherry", "date"];
mixed.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(mixed);

// Sort objects by property
const products = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Tablet", price: 700 },
  { name: "Monitor", price: 300 }
];

// Sort by price (ascending)
products.sort((a, b) => a.price - b.price);
console.log("By price:", products);

// Sort by name (alphabetical)
products.sort((a, b) => a.name.localeCompare(b.name));
console.log("By name:", products);

// Multi-level sorting (by category, then price)
const items = [
  { category: "B", price: 100 },
  { category: "A", price: 200 },
  { category: "B", price: 50 },
  { category: "A", price: 150 }
];

items.sort((a, b) => {
  // First sort by category
  if (a.category !== b.category) {
    return a.category.localeCompare(b.category);
  }
  // Then by price
  return a.price - b.price;
});
console.log(items);

console.log("=== reverse() ===");

/**
 * reverse() reverses array IN PLACE
 */

const arr = [1, 2, 3, 4, 5];
const reversed = [...arr].reverse();
console.log(reversed); // [5, 4, 3, 2, 1]
console.log(arr); // [1, 2, 3, 4, 5] (original not mutated due to spread)

/* ============================================================
   2. splice() and slice()
   ============================================================ */

console.log("=== slice() ===");

/**
 * slice() extracts section (doesn't mutate)
 * slice(start, end) - end not included
 */

const fruits = ["apple", "banana", "cherry", "date", "elderberry"];

console.log(fruits.slice(1, 3));    // ["banana", "cherry"]
console.log(fruits.slice(2));       // ["cherry", "date", "elderberry"]
console.log(fruits.slice(-2));      // ["date", "elderberry"] (last 2)
console.log(fruits.slice());        // [...] (shallow copy)

// Negative indices
console.log(fruits.slice(-3, -1));  // ["cherry", "date"]

console.log("=== splice() ===");

/**
 * splice() changes array (mutates)
 * splice(start, deleteCount, items...)
 */

const colors = ["red", "green", "blue", "yellow", "purple"];

// Remove elements
const removed = colors.splice(1, 2); // remove 2 from index 1
console.log("Removed:", removed);    // ["green", "blue"]
console.log("Array:", colors);       // ["red", "yellow", "purple"]

// Insert elements
colors.splice(1, 0, "orange", "pink"); // insert at index 1, delete 0
console.log(colors); // ["red", "orange", "pink", "yellow", "purple"]

// Replace elements
colors.splice(2, 1, "cyan"); // replace 1 element at index 2
console.log(colors); // ["red", "orange", "cyan", "yellow", "purple"]

// Remove from end
colors.splice(-1, 1); // remove last element
console.log(colors);

/* ============================================================
   3. flat() and flatMap()
   ============================================================ */

console.log("=== flat() ===");

/**
 * flat() flattens nested arrays
 * Specify depth (default: 1)
 */

const nested = [1, [2, 3], [4, [5, 6]]];

console.log(nested.flat());          // [1, 2, 3, 4, [5, 6]] (depth 1)
console.log(nested.flat(2));         // [1, 2, 3, 4, 5, 6] (depth 2)
console.log(nested.flat(Infinity));  // [1, 2, 3, 4, 5, 6] (fully flatten)

// Remove empty slots
const withHoles = [1, 2, , 4, 5];
console.log(withHoles.flat()); // [1, 2, 4, 5]

console.log("=== flatMap() ===");

/**
 * flatMap() = map() + flat(1)
 * More efficient than doing both separately
 */

const sentences = ["Hello World", "How are you"];

// map then flat
const words1 = sentences.map(s => s.split(" ")).flat();
console.log(words1);

// flatMap (better)
const words2 = sentences.flatMap(s => s.split(" "));
console.log(words2); // ["Hello", "World", "How", "are", "you"]

// Conditional flattening
const nums = [1, 2, 3, 4];
const result = nums.flatMap(n => n % 2 === 0 ? [n, n] : n);
console.log(result); // [1, 2, 2, 3, 4, 4]

// Filtering and mapping
const users = [
  { name: "Alice", hobbies: ["reading", "coding"] },
  { name: "Bob", hobbies: ["gaming"] },
  { name: "Charlie", hobbies: [] }
];

const allHobbies = users.flatMap(user => user.hobbies);
console.log(allHobbies); // ["reading", "coding", "gaming"]

/* ============================================================
   4. Array.from(), Array.of(), fill()
   ============================================================ */

console.log("=== Array.from() ===");

/**
 * Array.from() creates array from iterable or array-like
 */

// From string
const chars = Array.from("Hello");
console.log(chars); // ["H", "e", "l", "l", "o"]

// From Set
const set = new Set([1, 2, 3, 2, 1]);
const arrFromSet = Array.from(set);
console.log(arrFromSet); // [1, 2, 3]

// From Map
const map = new Map([["a", 1], ["b", 2]]);
const arrFromMap = Array.from(map);
console.log(arrFromMap); // [["a", 1], ["b", 2]]

// With mapping function
const range = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(range); // [1, 2, 3, 4, 5]

// Create squares
const squares = Array.from({ length: 5 }, (_, i) => (i + 1) ** 2);
console.log(squares); // [1, 4, 9, 16, 25]

// Create 2D array
const matrix = Array.from({ length: 3 }, () => Array(3).fill(0));
console.log(matrix); // [[0,0,0], [0,0,0], [0,0,0]]

console.log("=== Array.of() ===");

/**
 * Array.of() creates array from arguments
 */

console.log(Array.of(1, 2, 3));    // [1, 2, 3]
console.log(Array.of(5));          // [5] (not empty array of length 5)

// Compare with Array constructor
console.log(new Array(5));         // [empty × 5]
console.log(Array.of(5));          // [5]

console.log("=== fill() ===");

/**
 * fill() fills array with static value (mutates)
 */

const arr1 = new Array(5).fill(0);
console.log(arr1); // [0, 0, 0, 0, 0]

// Fill specific range
const arr2 = [1, 2, 3, 4, 5];
arr2.fill(0, 1, 3); // fill 0 from index 1 to 3
console.log(arr2); // [1, 0, 0, 4, 5]

// Fill with objects (WARNING: same reference!)
const arr3 = new Array(3).fill({});
arr3[0].value = 1;
console.log(arr3); // All objects have value: 1 (same reference!)

// Correct way for objects
const arr4 = Array.from({ length: 3 }, () => ({}));
arr4[0].value = 1;
console.log(arr4); // Only first object has value

/* ============================================================
   5. join() and concat()
   ============================================================ */

console.log("=== join() ===");

/**
 * join() creates string from array
 */

const elements = ["Fire", "Water", "Earth", "Air"];

console.log(elements.join());       // "Fire,Water,Earth,Air" (default comma)
console.log(elements.join(", "));   // "Fire, Water, Earth, Air"
console.log(elements.join(" - "));  // "Fire - Water - Earth - Air"
console.log(elements.join(""));     // "FireWaterEarthAir"

// Create CSV line
const data = ["Alice", "30", "NYC"];
const csvLine = data.join(",");
console.log(csvLine); // "Alice,30,NYC"

console.log("=== concat() ===");

/**
 * concat() merges arrays (doesn't mutate)
 */

const arr5 = [1, 2, 3];
const arr6 = [4, 5, 6];
const combined = arr5.concat(arr6);
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Multiple arrays
const arr7 = [7, 8];
const combined2 = arr5.concat(arr6, arr7);
console.log(combined2); // [1, 2, 3, 4, 5, 6, 7, 8]

// Modern alternative: spread operator
const combined3 = [...arr5, ...arr6, ...arr7];
console.log(combined3);

/**
 * ============================================================
 * Quick Reference
 * ============================================================
 *
 * Mutating:
 * - sort(), reverse(), splice(), fill()
 *
 * Non-mutating:
 * - slice(), flat(), flatMap(), concat(), join()
 *
 * Creating:
 * - Array.from(), Array.of()
 *
 * ============================================================
 * End of File
 * ============================================================
 */
