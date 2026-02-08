/**
 * ============================================================
 * JavaScript Variables & Data Types
 * ============================================================
 *
 * Topics covered:
 * 1. Variable declarations (var, let, const)
 * 2. Primitive data types
 * 3. Reference types
 * 4. typeof operator
 * 5. Variable naming conventions
 * 6. Hoisting behavior
 * 7. Block scope vs function scope
 * 8. Immutability
 * 9. Dynamic typing
 * 10. Template literals
 *
 * ============================================================
 */

/* ============================================================
   1. Variable Declarations
   ============================================================ */

/**
 * WHAT IS A VARIABLE?
 * -------------------
 * A variable is like a labeled box that stores a value
 * Think of it as: Variable Name = Container, Value = Content inside
 * 
 * Example: let age = 25
 *          ↑   ↑   ↑
 *       keyword name value
 */

/**
 * var (old way - AVOID in modern JavaScript)
 * ------------------------------------------
 * 
 * PROBLEMS WITH var:
 * 1. Function scoped (not block scoped) - can leak out of if/loops
 * 2. Hoisted to top - can use before declaration (undefined)
 * 3. Can be redeclared - accidentally overwrite variables
 * 4. Confusing behavior - causes bugs
 * 
 * WHY IT EXISTS: JavaScript's original way (pre-2015)
 * WHY AVOID: Modern alternatives (let/const) are safer
 */

var x = 10;
var x = 20; // ❌ Allowed but dangerous! Silently overwrites previous value
console.log(x); // 20 (first declaration is lost)

// PROBLEM: var leaks out of blocks
if (true) {
  var leakedVariable = "I'm accessible outside!";
}
console.log(leakedVariable); // Works! (This is usually a bug)

/**
 * let (modern - use for variables that CHANGE)
 * ---------------------------------------------
 * 
 * WHEN TO USE let:
 * - Counter variables (i, index, count)
 * - Values that change over time
 * - Loop variables
 * - Temporary calculations
 * 
 * KEY FEATURES:
 * 1. Block scoped - only exists inside { } where declared
 * 2. Cannot be redeclared - protects against mistakes
 * 3. Can be reassigned - value can change
 * 4. Not hoisted (technically hoisted but in "temporal dead zone")
 * 
 * MENTAL MODEL: "let" means "let this value change"
 */

let count = 0;
count = 1; // ✅ Allowed - we're changing the value
count = 2; // ✅ Still allowed
// let count = 2; // ❌ Error: Identifier 'count' has already been declared

// BENEFIT: let is block scoped (stays inside { })
if (true) {
  let blockScoped = "Only inside this block";
  console.log(blockScoped); // ✅ Works here
}
// console.log(blockScoped); // ❌ Error: blockScoped is not defined

/**
 * const (modern - use by DEFAULT)
 * --------------------------------
 * 
 * WHEN TO USE const:
 * - Values that shouldn't change (PI, MAX_SIZE)
 * - Function references
 * - Object/array references (contents can change, but reference can't)
 * - Imported modules
 * - Configuration values
 * 
 * RULE OF THUMB: Use const by default, switch to let only if you need to reassign
 * 
 * KEY FEATURES:
 * 1. Block scoped (like let)
 * 2. Cannot be reassigned - prevents accidental changes
 * 3. Must be initialized when declared
 * 4. IMPORTANT: For objects/arrays, you can modify contents (but not reassign)
 * 
 * MENTAL MODEL: "const" means "constant reference" (not constant value for objects)
 */

const PI = 3.14159;
// PI = 3; // ❌ Error: Assignment to constant variable

// MUST initialize const immediately
// const unitialized; // ❌ Error: Missing initializer
const initialized = "value"; // ✅ Correct

/**
 * DECISION TREE: Which one to use?
 * ---------------------------------
 * 
 * Will the value change? 
 *   YES → Use let
 *   NO → Use const (DEFAULT CHOICE)
 * 
 * Never use var in modern JavaScript!
 */

/* ============================================================
   2. Primitive Data Types
   ============================================================ */

/**
 * JavaScript has 7 primitive types:
 * 1. string
 * 2. number
 * 3. boolean
 * 4. undefined
 * 5. null
 * 6. symbol (ES6)
 * 7. bigint (ES11)
 */

// String - text values
const name = "Alice";
const greeting = 'Hello';
const message = `Welcome ${name}`; // template literal

// Number - integers and decimals
const age = 25;
const price = 19.99;
const negative = -10;
const infinity = Infinity;
const notANumber = NaN;

// Boolean - true/false
const isActive = true;
const hasAccess = false;

// Undefined - variable declared but not assigned
let notAssigned;
console.log(notAssigned); // undefined

// Null - intentional absence of value
const emptyValue = null;

// Symbol - unique identifier (advanced)
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false (always unique)

// BigInt - for very large integers
const bigNumber = 9007199254740991n;
const anotherBig = BigInt("9007199254740991");

/* ============================================================
   3. Reference Types (Objects)
   ============================================================ */

/**
 * Reference types store a reference to data
 * Not the actual data itself
 */

// Object
const person = {
  name: "Bob",
  age: 30
};

// Array (special object)
const colors = ["red", "blue", "green"];

// Function (special object)
function greet() {
  return "Hello";
}

// Date (built-in object)
const now = new Date();

/* ============================================================
   4. typeof Operator
   ============================================================ */

console.log(typeof "text");      // "string"
console.log(typeof 42);          // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof Symbol());    // "symbol"
console.log(typeof 100n);        // "bigint"

// Special cases
console.log(typeof null);        // "object" (historical bug!)
console.log(typeof []);          // "object"
console.log(typeof {});          // "object"
console.log(typeof function(){}); // "function"

/* ============================================================
   5. Variable Naming Conventions
   ============================================================ */

/**
 * Rules:
 * - Must start with letter, _, or $
 * - Can contain letters, numbers, _, $
 * - Case sensitive
 * - Cannot use reserved keywords
 */

// Valid names
const firstName = "John";    // camelCase (recommended)
const _private = "hidden";   // underscore prefix
const $element = "DOM";      // dollar sign
const user123 = "test";      // with numbers

// Invalid names (commented to avoid errors)
// const 123user = "bad";    // cannot start with number
// const first-name = "bad"; // no hyphens
// const let = "bad";        // reserved keyword

// Naming conventions
const MAX_SIZE = 100;        // UPPERCASE for constants
const userId = "abc123";     // camelCase for variables
// class UserProfile {}      // PascalCase for classes

/* ============================================================
   6. Hoisting Behavior
   ============================================================ */

/**
 * WHAT IS HOISTING?
 * -----------------
 * JavaScript moves declarations to the top during compilation phase
 * Think of it as: JavaScript "reads" your code twice:
 *   1st pass: Collect all declarations
 *   2nd pass: Execute the code
 * 
 * ANALOGY: Like reading a book's table of contents before reading chapters
 */

/**
 * VAR HOISTING (Full hoisting - declaration + initialization to undefined)
 * -------------------------------------------------------------------------
 * 
 * WHAT HAPPENS:
 * Before execution, JavaScript moves var declarations to top and sets them to undefined
 * 
 * YOUR CODE:
 *   console.log(hoistedVar);
 *   var hoistedVar = "value";
 * 
 * WHAT JAVASCRIPT ACTUALLY RUNS:
 *   var hoistedVar = undefined;  // ← Moved to top
 *   console.log(hoistedVar);      // undefined
 *   hoistedVar = "value";         // Assignment stays in place
 */

console.log(hoistedVar); // undefined (not an error!)
var hoistedVar = "value";
console.log(hoistedVar); // "value"

/**
 * LET/CONST HOISTING (Temporal Dead Zone)
 * ----------------------------------------
 * 
 * WHAT HAPPENS:
 * let/const ARE hoisted, but placed in a "Temporal Dead Zone" (TDZ)
 * Cannot access them before the line where they're declared
 * 
 * WHY? To prevent bugs from using variables before they're initialized
 * 
 * TEMPORAL DEAD ZONE:
 *   { // ← Block starts - TDZ begins
 *     // hoistedLet is in TDZ here (exists but cannot be accessed)
 *     console.log(hoistedLet); // ❌ ReferenceError
 *     
 *     let hoistedLet = "value"; // ← TDZ ends here
 *     console.log(hoistedLet);  // ✅ Works now
 *   }
 */

// console.log(hoistedLet); // ❌ ReferenceError: Cannot access before initialization
let hoistedLet = "value";
console.log(hoistedLet); // ✅ "value"

/**
 * FUNCTION HOISTING (Fully hoisted - can use before declaration)
 * ---------------------------------------------------------------
 * 
 * WHAT HAPPENS:
 * Function declarations are FULLY hoisted (entire function)
 * You can call the function before it appears in code
 * 
 * WHY? JavaScript moves the entire function definition to the top
 * 
 * YOUR CODE:
 *   sayHello();                    // This works!
 *   function sayHello() {
 *     console.log("Hello");
 *   }
 * 
 * WHAT JAVASCRIPT RUNS:
 *   function sayHello() {           // ← Moved to top
 *     console.log("Hello");
 *   }
 *   sayHello();                     // Now it makes sense
 */

sayHello(); // ✅ "Hello" - works before declaration!
function sayHello() {
  console.log("Hello");
}

/**
 * FUNCTION EXPRESSIONS (NOT hoisted)
 * -----------------------------------
 * 
 * Function expressions behave like let/const
 * Cannot use before declaration
 */

// greet(); // ❌ Error: Cannot access 'greet' before initialization
const greet = function() {
  console.log("Hi");
};
greet(); // ✅ Works after declaration

/**
 * HOISTING SUMMARY:
 * -----------------
 * var:       Hoisted → undefined (can use before declaration, but gets undefined)
 * let/const: Hoisted → TDZ (cannot use before declaration, throws error)
 * function:  Fully hoisted (can call before declaration)
 * 
 * BEST PRACTICE: Declare variables at the top of their scope to avoid confusion
 */

/* ============================================================
   7. Block Scope vs Function Scope
   ============================================================ */

/**
 * var = function scoped
 * let/const = block scoped
 */

function scopeExample() {
  // var is function scoped
  if (true) {
    var functionScoped = "visible outside block";
  }
  console.log(functionScoped); // works!

  // let is block scoped
  if (true) {
    let blockScoped = "only inside block";
  }
  // console.log(blockScoped); // ReferenceError
}

scopeExample();

/* ============================================================
   8. Immutability
   ============================================================ */

/**
 * const prevents reassignment
 * but NOT mutation of objects/arrays
 */

const numbers = [1, 2, 3];
numbers.push(4);        // allowed (mutation)
console.log(numbers);   // [1, 2, 3, 4]

// numbers = [5, 6];    // Error: cannot reassign

const user = { name: "Alice" };
user.name = "Bob";      // allowed (mutation)
console.log(user);      // { name: "Bob" }

// user = {};           // Error: cannot reassign

/* ============================================================
   9. Dynamic Typing
   ============================================================ */

/**
 * JavaScript is dynamically typed
 * Variables can hold any type
 */

let dynamic = 42;           // number
console.log(typeof dynamic);

dynamic = "now a string";   // string
console.log(typeof dynamic);

dynamic = true;             // boolean
console.log(typeof dynamic);

/* ============================================================
   10. Template Literals (ES6)
   ============================================================ */

/**
 * Template literals use backticks
 * Allow string interpolation and multi-line strings
 */

const userName = "Alice";
const userAge = 25;

// String interpolation
const intro = `My name is ${userName} and I'm ${userAge} years old`;
console.log(intro);

// Expressions inside ${}
const calculation = `2 + 2 = ${2 + 2}`;
console.log(calculation);

// Multi-line strings
const multiLine = `
  This is line 1
  This is line 2
  This is line 3
`;
console.log(multiLine);

// Tagged templates (advanced)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}<mark>${values[i] || ""}</mark>`;
  }, "");
}

const html = highlight`User ${userName} is ${userAge} years old`;
console.log(html);

/**
 * ============================================================
 * End of File
 * ============================================================
 */
