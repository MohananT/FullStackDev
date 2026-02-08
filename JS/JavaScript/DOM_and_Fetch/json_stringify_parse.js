/**
 * ============================================================
 * JSON - JavaScript Object Notation
 * ============================================================
 *
 * Topics covered:
 * 1. What is JSON?
 * 2. JSON.stringify() - Convert JS to JSON
 * 3. JSON.parse() - Convert JSON to JS
 * 4. Working with JSON data
 * 5. Common use cases
 *
 * ============================================================
 */

/* ============================================================
   1. What is JSON?
   ============================================================ */

/**
 * JSON (JavaScript Object Notation)
 * - Lightweight data interchange format
 * - Human-readable text
 * - Language-independent
 * - Based on JavaScript object syntax
 *
 * Rules:
 * - Keys must be strings (double quotes)
 * - Values: string, number, boolean, null, array, object
 * - No functions, undefined, Date objects
 * - No trailing commas
 */

// Valid JSON
const validJSON = `{
  "name": "Alice",
  "age": 30,
  "isActive": true,
  "address": {
    "city": "NYC",
    "zip": "10001"
  },
  "hobbies": ["reading", "coding"]
}`;

// Invalid JSON (would fail in JSON file)
// {
//   name: "Alice",        // ❌ keys must be quoted
//   age: 30,
//   active: undefined,    // ❌ undefined not allowed
//   created: new Date(),  // ❌ Date objects not allowed
//   greet: function() {}, // ❌ functions not allowed
// }

/* ============================================================
   2. JSON.stringify()
   ============================================================ */

/**
 * Convert JavaScript value to JSON string
 */

console.log("=== JSON.stringify() ===");

// Basic usage
const user = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

const jsonString = JSON.stringify(user);
console.log(jsonString);
// {"name":"Alice","age":30,"email":"alice@example.com"}

console.log(typeof jsonString); // "string"

// Pretty print with indentation
const prettyJSON = JSON.stringify(user, null, 2);
console.log(prettyJSON);
/*
{
  "name": "Alice",
  "age": 30,
  "email": "alice@example.com"
}
*/

// With replacer function (filter/transform)
const filtered = JSON.stringify(user, (key, value) => {
  // Hide email
  if (key === "email") return undefined;
  return value;
});
console.log(filtered); // {"name":"Alice","age":30}

// With replacer array (whitelist keys)
const limited = JSON.stringify(user, ["name", "age"]);
console.log(limited); // {"name":"Alice","age":30}

// What gets excluded
const complex = {
  name: "Bob",
  age: 25,
  greet: function() { return "Hi"; },  // ❌ excluded
  symbol: Symbol("id"),                 // ❌ excluded
  undef: undefined,                     // ❌ excluded
  date: new Date(),                     // ✅ converted to ISO string
  regex: /test/,                        // ✅ converted to {}
  map: new Map([["a", 1]])             // ✅ converted to {}
};

console.log(JSON.stringify(complex));

/* ============================================================
   3. JSON.parse()
   ============================================================ */

/**
 * Convert JSON string to JavaScript value
 */

console.log("=== JSON.parse() ===");

const json = '{"name":"Alice","age":30,"isActive":true}';
const obj = JSON.parse(json);

console.log(obj.name);     // "Alice"
console.log(obj.age);      // 30
console.log(typeof obj);   // "object"

// With reviver function (transform during parsing)
const dateJSON = '{"name":"Alice","created":"2024-01-01T00:00:00.000Z"}';
const withDate = JSON.parse(dateJSON, (key, value) => {
  // Convert ISO string to Date object
  if (key === "created") {
    return new Date(value);
  }
  return value;
});

console.log(withDate.created instanceof Date); // true

// Error handling
try {
  const invalid = JSON.parse("{ invalid json }");
} catch (error) {
  console.error("Parse error:", error.message);
}

/* ============================================================
   4. Working with JSON Data
   ============================================================ */

console.log("=== Working with JSON ===");

// Deep cloning objects
const original = { name: "Alice", address: { city: "NYC" } };
const clone = JSON.parse(JSON.stringify(original));

clone.address.city = "LA";
console.log(original.address.city); // "NYC" (not affected)

// Limitations of JSON cloning:
// - Loses functions
// - Loses undefined values
// - Loses symbols
// - Converts Date to string

// Comparing objects
const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };

console.log(obj1 === obj2); // false (different references)
console.log(JSON.stringify(obj1) === JSON.stringify(obj2)); // true

// Note: Order matters!
const objA = { a: 1, b: 2 };
const objB = { b: 2, a: 1 };
console.log(JSON.stringify(objA) === JSON.stringify(objB)); // false

/* ============================================================
   5. Common Use Cases
   ============================================================ */

// Use case 1: LocalStorage
const userData = {
  username: "alice",
  preferences: {
    theme: "dark",
    language: "en"
  }
};

// Store in localStorage
localStorage.setItem("user", JSON.stringify(userData));

// Retrieve from localStorage
const stored = JSON.parse(localStorage.getItem("user"));
console.log(stored.preferences.theme); // "dark"

// Use case 2: API communication
const apiData = {
  action: "create",
  data: {
    title: "New Post",
    content: "Content here"
  }
};

const requestBody = JSON.stringify(apiData);
// Send as request body

// Use case 3: Configuration files
const config = {
  api: {
    baseUrl: "https://api.example.com",
    timeout: 5000
  },
  features: {
    darkMode: true,
    notifications: false
  }
};

console.log(JSON.stringify(config, null, 2));

// Use case 4: Data validation
function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

console.log(isValidJSON('{"name": "Alice"}')); // true
console.log(isValidJSON('{name: "Alice"}')); // false

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * - JSON.stringify() converts JS objects to JSON strings
 * - JSON.parse() converts JSON strings to JS objects
 * - Use for data storage, API communication, deep cloning
 * - Be aware of limitations (functions, undefined, etc.)
 * - Always validate/handle parse errors
 *
 * ============================================================
 * End of File
 * ============================================================
 */
