/**
 * ============================================================
 * Array Methods - Transform & Filter
 * ============================================================
 *
 * Topics covered:
 * 1. map() - Transform elements
 * 2. filter() - Keep matching elements
 * 3. find() - Find first match
 * 4. findIndex() - Find index of match
 * 5. includes() - Check if contains value
 * 6. some() & every() - Test conditions
 *
 * ============================================================
 */

/* ============================================================
   1. map() - Transform Elements
   ============================================================ */

console.log("=== map() ===");

/**
 * WHAT IS map()?
 * --------------
 * map() is like a transformation factory for arrays
 * It takes each item, transforms it, and puts the result in a new array
 * 
 * REAL-WORLD ANALOGY:
 * Imagine a car wash:
 * - Input: Array of dirty cars [🚗, 🚗, 🚗]
 * - Process: Wash each car (transformation)
 * - Output: Array of clean cars [✨🚗, ✨🚗, ✨🚗]
 * 
 * The original cars (array) aren't modified!
 * You get a new array of transformed items
 * 
 * SYNTAX:
 * array.map((element, index, array) => {
 *   return transformedElement;
 * })
 * 
 * HOW IT WORKS:
 * 1. map() loops through each element
 * 2. Calls your function for each element
 * 3. Takes the return value
 * 4. Puts return value in new array at same position
 * 5. Returns the new array
 * 
 * KEY POINTS:
 * ✅ Returns NEW array (original unchanged)
 * ✅ New array has SAME length as original
 * ✅ Each element is transformed
 * ✅ Must return a value from callback
 * ✅ If you don't return, you get array of undefined
 * 
 * WHEN TO USE map():
 * - Transform each element (multiply, format, extract property)
 * - Convert data structure (array of objects → array of strings)
 * - Apply operation to all items
 * - Need array of same length with different values
 * 
 * MENTAL MODEL:
 * map() = "Apply this transformation to every item"
 */

const numbers = [1, 2, 3, 4, 5];

/**
 * EXAMPLE 1: Basic transformation
 * --------------------------------
 * Goal: Double each number
 * Input:  [1, 2, 3, 4, 5]
 * Process: Multiply each by 2
 * Output: [2, 4, 6, 8, 10]
 */

const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

/**
 * WHAT HAPPENS INTERNALLY:
 * -------------------------
 * Original: [1, 2, 3, 4, 5]
 * 
 * Iteration 1: num = 1 → return 1 * 2 = 2
 * Iteration 2: num = 2 → return 2 * 2 = 4
 * Iteration 3: num = 3 → return 3 * 2 = 6
 * Iteration 4: num = 4 → return 4 * 2 = 8
 * Iteration 5: num = 5 → return 5 * 2 = 10
 * 
 * New array: [2, 4, 6, 8, 10]
 * Original array unchanged: [1, 2, 3, 4, 5]
 * 
 * IMPORTANT: map() creates a NEW array
 * The original 'numbers' array is NOT modified
 */

console.log("Original:", numbers); // Still [1, 2, 3, 4, 5]

const squared = numbers.map(num => num ** 2);
console.log(squared); // [1, 4, 9, 16, 25]

// Working with objects
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 }
];

// Extract property
const names = users.map(user => user.name);
console.log(names); // ["Alice", "Bob"]

// Transform to new structure
const userSummaries = users.map(user => ({
  id: user.id,
  displayName: user.name.toUpperCase(),
  isAdult: user.age >= 18
}));
console.log(userSummaries);

// With index parameter
const indexed = numbers.map((num, index) => `${index}: ${num}`);
console.log(indexed); // ["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"]

// Create objects from array
const fruits = ["apple", "banana", "orange"];
const fruitObjects = fruits.map((fruit, id) => ({
  id,
  name: fruit,
  emoji: fruit === "apple" ? "🍎" : fruit === "banana" ? "🍌" : "🍊"
}));
console.log(fruitObjects);

/* ============================================================
   2. filter() - Keep Matching Elements
   ============================================================ */

console.log("=== filter() ===");

/**
 * filter() keeps elements that pass test
 * Returns new array
 */

// Basic filtering
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

const oddNumbers = numbers.filter(num => num % 2 !== 0);
console.log(oddNumbers); // [1, 3, 5]

const greaterThanThree = numbers.filter(num => num > 3);
console.log(greaterThanThree); // [4, 5]

// Filter objects
const people = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 17, active: false },
  { name: "Charlie", age: 30, active: true },
  { name: "David", age: 15, active: true }
];

const adults = people.filter(person => person.age >= 18);
console.log(adults); // Alice and Charlie

const activeAdults = people.filter(person => {
  return person.age >= 18 && person.active === true;
});
console.log(activeAdults);

// Remove falsy values
const mixed = [0, 1, false, 2, "", 3, null, undefined, 4, NaN];
const truthy = mixed.filter(Boolean);
console.log(truthy); // [1, 2, 3, 4]

// Remove specific values
const withZeros = [1, 0, 2, 0, 3, 0, 4];
const withoutZeros = withZeros.filter(num => num !== 0);
console.log(withoutZeros); // [1, 2, 3, 4]

// Remove duplicates
const withDuplicates = [1, 2, 2, 3, 3, 4, 1, 5];
const unique = withDuplicates.filter((item, index, arr) => {
  return arr.indexOf(item) === index;
});
console.log(unique); // [1, 2, 3, 4, 5]

// Filter by string search
const words = ["apple", "banana", "avocado", "cherry", "apricot"];
const startsWithA = words.filter(word => word.startsWith("a"));
console.log(startsWithA); // ["apple", "avocado", "apricot"]

const containsAn = words.filter(word => word.includes("an"));
console.log(containsAn); // ["banana"]

/* ============================================================
   3. find() - Find First Match
   ============================================================ */

console.log("=== find() ===");

/**
 * find() returns first matching element
 * Returns undefined if not found
 * Stops searching after first match (efficient)
 */

const foundNumber = numbers.find(num => num > 3);
console.log(foundNumber); // 4 (first number > 3)

// Find object
const foundUser = users.find(user => user.id === 2);
console.log(foundUser); // { id: 2, name: "Bob", age: 30 }

// Find by multiple conditions
const foundPerson = people.find(person => {
  return person.age >= 18 && person.active;
});
console.log(foundPerson); // Alice

// Returns undefined if not found
const notFound = numbers.find(num => num > 10);
console.log(notFound); // undefined

// Common pattern: find by ID
function getUserById(users, id) {
  return users.find(user => user.id === id);
}

/* ============================================================
   4. findIndex() - Find Index of Match
   ============================================================ */

console.log("=== findIndex() ===");

/**
 * findIndex() returns index of first match
 * Returns -1 if not found
 */

const indexFound = numbers.findIndex(num => num > 3);
console.log(indexFound); // 3 (index of 4)

// Find index in array of objects
const userIndex = users.findIndex(user => user.name === "Bob");
console.log(userIndex); // 1

// Not found
const notFoundIndex = numbers.findIndex(num => num > 10);
console.log(notFoundIndex); // -1

// Use case: remove item by condition
function removeFirstMatch(arr, condition) {
  const index = arr.findIndex(condition);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}

const testArray = [1, 2, 3, 4, 5];
removeFirstMatch(testArray, num => num > 3);
console.log(testArray); // [1, 2, 3, 5] (removed 4)

/* ============================================================
   5. includes() - Check if Contains Value
   ============================================================ */

console.log("=== includes() ===");

/**
 * includes() checks if array contains value
 * Returns boolean
 * Works with primitive values
 */

console.log(numbers.includes(3)); // true
console.log(numbers.includes(10)); // false

// Case sensitive for strings
const colors = ["red", "blue", "green"];
console.log(colors.includes("red")); // true
console.log(colors.includes("Red")); // false

// With start index
console.log(numbers.includes(3, 3)); // false (starts from index 3)
console.log(numbers.includes(3, 0)); // true

// NaN handling (works correctly unlike indexOf)
const arrayWithNaN = [1, 2, NaN, 4];
console.log(arrayWithNaN.includes(NaN)); // true
console.log(arrayWithNaN.indexOf(NaN));  // -1

/* ============================================================
   6. some() & every() - Test Conditions
   ============================================================ */

console.log("=== some() ===");

/**
 * some() checks if ANY element passes test
 * Returns boolean
 * Stops at first match
 */

const hasNegative = numbers.some(num => num < 0);
console.log(hasNegative); // false

const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

// With objects
const hasMinor = people.some(person => person.age < 18);
console.log(hasMinor); // true

// Check if any string is long
const hasLongWord = words.some(word => word.length > 7);
console.log(hasLongWord); // false

console.log("=== every() ===");

/**
 * every() checks if ALL elements pass test
 * Returns boolean
 * Stops at first failure
 */

const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true

const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // false

// With objects
const allAdults = people.every(person => person.age >= 18);
console.log(allAdults); // false

// Validation use case
function isValidUserArray(users) {
  return users.every(user => {
    return user.name && user.name.length > 0 &&
           user.age && user.age > 0;
  });
}

/**
 * ============================================================
 * Combining Methods
 * ============================================================
 */

console.log("=== Combining Methods ===");

// map + filter
const doubledEvens = numbers
  .filter(num => num % 2 === 0)
  .map(num => num * 2);
console.log(doubledEvens); // [4, 8]

// filter + find
const firstActiveAdult = people
  .filter(person => person.age >= 18)
  .find(person => person.active);
console.log(firstActiveAdult);

// Real-world example: Process user data
const rawUsers = [
  { name: "alice", email: "ALICE@EXAMPLE.COM", age: 25 },
  { name: "bob", email: "bob@example.com", age: 17 },
  { name: "charlie", email: "CHARLIE@EXAMPLE.COM", age: 30 }
];

const processedAdultUsers = rawUsers
  .filter(user => user.age >= 18)
  .map(user => ({
    name: user.name.charAt(0).toUpperCase() + user.name.slice(1),
    email: user.email.toLowerCase(),
    age: user.age
  }));

console.log(processedAdultUsers);

/**
 * ============================================================
 * Performance Tips
 * ============================================================
 */

// ✅ Use find() instead of filter()[0]
const firstMatch = numbers.find(n => n > 3);  // stops at first match

// ❌ Less efficient
const firstMatchBad = numbers.filter(n => n > 3)[0]; // checks all

// ✅ Use some() instead of filter().length > 0
const hasMatch = numbers.some(n => n > 3);   // stops at first match

// ❌ Less efficient
const hasMatchBad = numbers.filter(n => n > 3).length > 0; // checks all

/**
 * ============================================================
 * End of File
 * ============================================================
 */
