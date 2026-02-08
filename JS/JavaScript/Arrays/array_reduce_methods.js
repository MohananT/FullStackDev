/**
 * ============================================================
 * Array Reduce Methods - Aggregation & Transformation
 * ============================================================
 *
 * Topics covered:
 * 1. reduce() basics
 * 2. Common reduce patterns
 * 3. reduceRight()
 * 4. Real-world examples
 * 5. Performance considerations
 *
 * ============================================================
 */

/* ============================================================
   1. reduce() Basics
   ============================================================ */

console.log("=== reduce() Basics ===");

/**
 * WHAT IS reduce()?
 * -----------------
 * reduce() is like a snowball rolling down a hill, gathering snow
 * It processes each array element and "accumulates" a result
 * 
 * ANALOGY:
 * Imagine calculating total price of items in shopping cart:
 * - Start with $0 (initial value)
 * - Pick up first item: $0 + $10 = $10
 * - Pick up second item: $10 + $25 = $35
 * - Pick up third item: $35 + $5 = $40
 * - Final total: $40
 * 
 * That's exactly what reduce() does!
 * 
 * WHY USE reduce()?
 * - Transform array into single value (sum, product, object, string)
 * - More powerful than map/filter
 * - Can replace multiple operations with one
 * 
 * SYNTAX BREAKDOWN:
 * array.reduce((accumulator, currentValue, index, array) => {
 *   return newAccumulator;
 * }, initialValue);
 * 
 * PARAMETERS:
 * - accumulator: The "running total" / result so far
 * - currentValue: Current element being processed
 * - index: Current index (optional)
 * - array: Original array (optional)
 * - initialValue: Starting value for accumulator
 * 
 * HOW IT WORKS (Step by Step):
 * [1, 2, 3, 4, 5].reduce((acc, curr) => acc + curr, 0)
 * 
 * Step 1: acc = 0 (initial), curr = 1 → return 0 + 1 = 1
 * Step 2: acc = 1, curr = 2 → return 1 + 2 = 3
 * Step 3: acc = 3, curr = 3 → return 3 + 3 = 6
 * Step 4: acc = 6, curr = 4 → return 6 + 4 = 10
 * Step 5: acc = 10, curr = 5 → return 10 + 5 = 15
 * Final result: 15
 * 
 * KEY POINTS:
 * ✅ Return value becomes next accumulator
 * ✅ Always provide initial value (0, [], {}, "")
 * ✅ Most flexible array method
 * ✅ Can do everything map/filter can do (and more!)
 */

const numbers = [1, 2, 3, 4, 5];

/**
 * EXAMPLE 1: Sum all numbers
 * ---------------------------
 * Goal: Add all numbers together
 * Initial value: 0 (starting point)
 * Logic: accumulator + current number
 */

const sum = numbers.reduce((accumulator, current) => {
  // Log to visualize what's happening
  console.log(`acc: ${accumulator}, curr: ${current}`);
  // Return new accumulator (old acc + current number)
  return accumulator + current;
}, 0); // ← Initial value: Start counting from 0

console.log("Sum:", sum); // 15

/**
 * EXECUTION TRACE (what actually happens):
 * ----------------------------------------
 * Initial: acc = 0
 * 
 * Iteration 1: acc = 0, curr = 1 → return 0 + 1 = 1
 * Iteration 2: acc = 1, curr = 2 → return 1 + 2 = 3
 * Iteration 3: acc = 3, curr = 3 → return 3 + 3 = 6
 * Iteration 4: acc = 6, curr = 4 → return 6 + 4 = 10
 * Iteration 5: acc = 10, curr = 5 → return 10 + 5 = 15
 * 
 * Final: 15
 */

// Without initial value (uses first element)
const sum2 = numbers.reduce((acc, curr) => acc + curr);
console.log("Sum2:", sum2); // 15

// Product of all numbers
const product = numbers.reduce((acc, curr) => acc * curr, 1);
console.log("Product:", product); // 120

/* ============================================================
   2. Common reduce() Patterns
   ============================================================ */

console.log("=== Common Patterns ===");

// Pattern 1: Find maximum/minimum
const max = numbers.reduce((max, num) => Math.max(max, num), -Infinity);
console.log("Max:", max); // 5

const min = numbers.reduce((min, num) => Math.min(min, num), Infinity);
console.log("Min:", min); // 1

// Pattern 2: Count occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }

// Pattern 3: Group by property
const people = [
  { name: "Alice", age: 25, city: "NYC" },
  { name: "Bob", age: 30, city: "LA" },
  { name: "Charlie", age: 25, city: "NYC" },
  { name: "David", age: 30, city: "LA" }
];

const groupedByAge = people.reduce((acc, person) => {
  const age = person.age;
  if (!acc[age]) {
    acc[age] = [];
  }
  acc[age].push(person);
  return acc;
}, {});
console.log(groupedByAge);

const groupedByCity = people.reduce((acc, person) => {
  const city = person.city;
  acc[city] = acc[city] || [];
  acc[city].push(person);
  return acc;
}, {});
console.log(groupedByCity);

// Pattern 4: Flatten array
const nested = [[1, 2], [3, 4], [5, 6]];
const flattened = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log(flattened); // [1, 2, 3, 4, 5, 6]

// Pattern 5: Create object from array
const pairs = [["name", "Alice"], ["age", 25], ["city", "NYC"]];
const obj = pairs.reduce((acc, [key, value]) => {
  acc[key] = value;
  return acc;
}, {});
console.log(obj); // { name: "Alice", age: 25, city: "NYC" }

// Pattern 6: Remove duplicates
const withDuplicates = [1, 2, 2, 3, 3, 4, 1, 5];
const unique = withDuplicates.reduce((acc, num) => {
  if (!acc.includes(num)) {
    acc.push(num);
  }
  return acc;
}, []);
console.log(unique); // [1, 2, 3, 4, 5]

// Pattern 7: Calculate average
const average = numbers.reduce((sum, num, index, array) => {
  sum += num;
  if (index === array.length - 1) {
    return sum / array.length;
  }
  return sum;
}, 0);
console.log("Average:", average); // 3

// Better average calculation
const avg = numbers.reduce((sum, num, _, arr) => {
  return sum + num / arr.length;
}, 0);
console.log("Avg:", avg); // 3

// Pattern 8: Build query string
const params = { name: "Alice", age: 25, city: "NYC" };
const queryString = Object.entries(params).reduce((acc, [key, value], index) => {
  const separator = index === 0 ? "?" : "&";
  return `${acc}${separator}${key}=${value}`;
}, "");
console.log(queryString); // ?name=Alice&age=25&city=NYC

/* ============================================================
   3. reduceRight()
   ============================================================ */

console.log("=== reduceRight() ===");

/**
 * reduceRight() works from right to left
 * Same as reduce() but in reverse order
 */

const letters = ["a", "b", "c", "d"];

// Normal reduce (left to right)
const leftToRight = letters.reduce((acc, letter) => acc + letter, "");
console.log(leftToRight); // "abcd"

// reduceRight (right to left)
const rightToLeft = letters.reduceRight((acc, letter) => acc + letter, "");
console.log(rightToLeft); // "dcba"

// Use case: Process nested structure in reverse
const operations = [
  { type: "add", value: 5 },
  { type: "multiply", value: 2 },
  { type: "subtract", value: 3 }
];

// Apply operations in reverse
const result = operations.reduceRight((acc, op) => {
  if (op.type === "add") return acc + op.value;
  if (op.type === "multiply") return acc * op.value;
  if (op.type === "subtract") return acc - op.value;
  return acc;
}, 10);
console.log(result);

/* ============================================================
   4. Real-World Examples
   ============================================================ */

console.log("=== Real-World Examples ===");

// Example 1: Shopping cart total
const cart = [
  { product: "Laptop", price: 1000, quantity: 1 },
  { product: "Mouse", price: 25, quantity: 2 },
  { product: "Keyboard", price: 75, quantity: 1 }
];

const totalPrice = cart.reduce((total, item) => {
  return total + (item.price * item.quantity);
}, 0);
console.log(`Total: $${totalPrice}`); // $1125

// Example 2: Extract unique tags from posts
const posts = [
  { title: "Post 1", tags: ["javascript", "react"] },
  { title: "Post 2", tags: ["javascript", "node"] },
  { title: "Post 3", tags: ["react", "redux"] }
];

const allTags = posts.reduce((tags, post) => {
  post.tags.forEach(tag => {
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  });
  return tags;
}, []);
console.log(allTags); // ["javascript", "react", "node", "redux"]

// Example 3: Build nested structure
const flatData = [
  { id: 1, parentId: null, name: "Parent 1" },
  { id: 2, parentId: 1, name: "Child 1.1" },
  { id: 3, parentId: 1, name: "Child 1.2" },
  { id: 4, parentId: null, name: "Parent 2" }
];

const nested2 = flatData.reduce((acc, item) => {
  if (item.parentId === null) {
    acc.push({ ...item, children: [] });
  } else {
    const parent = acc.find(p => p.id === item.parentId);
    if (parent) {
      parent.children.push(item);
    }
  }
  return acc;
}, []);
console.log(JSON.stringify(nested2, null, 2));

// Example 4: Sum by category
const transactions = [
  { category: "food", amount: 50 },
  { category: "transport", amount: 30 },
  { category: "food", amount: 25 },
  { category: "entertainment", amount: 100 },
  { category: "transport", amount: 15 }
];

const sumByCategory = transactions.reduce((acc, t) => {
  acc[t.category] = (acc[t.category] || 0) + t.amount;
  return acc;
}, {});
console.log(sumByCategory);
// { food: 75, transport: 45, entertainment: 100 }

// Example 5: Pipeline (function composition)
const pipeline = [
  (x) => x + 1,
  (x) => x * 2,
  (x) => x - 3
];

const executeP pipeline = (input) => {
  return pipeline.reduce((value, fn) => fn(value), input);
};

console.log(executePipeline(5)); // ((5 + 1) * 2) - 3 = 9

// Example 6: Merge arrays of objects by ID
const users1 = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

const users2 = [
  { id: 2, email: "bob@example.com" },
  { id: 3, name: "Charlie" }
];

const merged = [...users1, ...users2].reduce((acc, user) => {
  const existing = acc.find(u => u.id === user.id);
  if (existing) {
    Object.assign(existing, user);
  } else {
    acc.push(user);
  }
  return acc;
}, []);
console.log(merged);

/* ============================================================
   5. Performance Considerations
   ============================================================ */

console.log("=== Performance ===");

// Reduce can replace multiple array methods
// But not always more readable or faster

// ❌ Hard to read (one reduce doing everything)
const complexReduce = people.reduce((acc, person) => {
  if (person.age >= 18 && person.city === "NYC") {
    acc.push(person.name.toUpperCase());
  }
  return acc;
}, []);

// ✅ More readable (chained methods)
const chainedMethods = people
  .filter(person => person.age >= 18)
  .filter(person => person.city === "NYC")
  .map(person => person.name.toUpperCase());

// When to use reduce():
// ✅ Creating objects from arrays
// ✅ Counting/grouping
// ✅ Calculating totals
// ✅ Flattening (or use flat())
// ✅ Complex transformations

// When NOT to use reduce():
// ❌ Simple transformations (use map)
// ❌ Simple filtering (use filter)
// ❌ Finding values (use find)

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * - reduce() is the most powerful array method
 * - Can replace almost any other array method
 * - Always provide initial value for clarity
 * - Use for aggregation, grouping, transforming
 * - Consider readability vs performance
 * - reduceRight() for right-to-left processing
 *
 * ============================================================
 * End of File
 * ============================================================
 */
