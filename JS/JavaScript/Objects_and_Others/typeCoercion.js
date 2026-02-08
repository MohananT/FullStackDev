/**
 * ============================================================
 * JavaScript Type Coercion – Advanced Examples in One File
 * ============================================================
 *
 * Topics covered:
 * 1. What type coercion is
 * 2. Implicit coercion (automatic)
 * 3. String coercion
 * 4. Number coercion
 * 5. Boolean coercion (truthy / falsy)
 * 6. Explicit coercion
 * 7. Equality coercion (== vs ===)
 * 8. Null vs undefined
 * 9. Object & array coercion
 * 10. Comparison coercion
 * 11. Common pitfalls
 * 12. Best practices
 *
 * Real-world explanations for modern JavaScript.
 * ============================================================
 */

/* ============================================================
   1. What Is Type Coercion?
   ============================================================ */

/**
 * Type coercion is JavaScript automatically converting
 * one data type into another at runtime.
 *
 * JavaScript is loosely typed, meaning variables
 * do not have fixed types.
 */

let value = 5;
value = "five"; // allowed

/* ============================================================
   2. Implicit Type Coercion (Automatic)
   ============================================================ */

/**
 * Implicit coercion happens when JavaScript converts
 * types WITHOUT you explicitly asking for it.
 *
 * This usually occurs during:
 * - Arithmetic operations
 * - Comparisons
 * - Logical expressions
 */

/* ============================================================
   3. String Coercion
   ============================================================ */

/**
 * String coercion occurs when the + operator is used
 * AND at least one operand is a string.
 *
 * JavaScript converts everything to a string.
 */

console.log(1 + "2");       // "12"
console.log("hello" + 5);   // "hello5"

/**
 * Order matters:
 * Evaluation happens left → right.
 */

console.log(10 + 5 + "px"); // "15px"
console.log("px" + 10 + 5); // "px105"

/* ============================================================
   4. Number Coercion
   ============================================================ */

/**
 * Number coercion happens with math operators
 * EXCEPT the + operator.
 *
 * JavaScript attempts to convert values into numbers.
 */

console.log("10" - 2); // 8
console.log("10" * 2); // 20
console.log("10" / 2); // 5

/**
 * If conversion fails, the result is NaN (Not a Number).
 */

console.log("abc" - 2); // NaN

/* ============================================================
   5. Boolean Coercion (Truthy / Falsy)
   ============================================================ */

/**
 * Boolean coercion happens in conditions:
 * - if statements
 * - logical operators
 * - loops
 *
 * JavaScript converts values to true or false.
 */

/**
 * FALSY VALUES (only these):
 * false
 * 0
 * -0
 * ""
 * null
 * undefined
 * NaN
 */

if (0) {
  // will NOT run
}

if ("hello") {
  // will run
}

/**
 * Important gotchas:
 * Empty arrays and objects are truthy.
 */

if ([]) {
  // runs
}

if ({}) {
  // runs
}

/* ============================================================
   6. Explicit Type Coercion
   ============================================================ */

/**
 * Explicit coercion is when YOU intentionally
 * convert a value to another type.
 *
 * This is the recommended approach.
 */

// To String
console.log(String(123)); // "123"

// To Number
console.log(Number("42")); // 42
console.log(Number(""));   // 0
console.log(Number(null)); // 0
console.log(Number("abc"));// NaN

// Unary plus (shortcut)
console.log(+"99"); // 99

// To Boolean
console.log(Boolean(1));   // true
console.log(Boolean(0));   // false

// Double NOT (common trick)
console.log(!!"text"); // true
console.log(!!0);      // false

/* ============================================================
   7. Equality Coercion (== vs ===)
   ============================================================ */

/**
 * == (loose equality)
 * Performs type coercion before comparison.
 */

console.log("5" == 5);        // true
console.log(false == 0);      // true
console.log(null == undefined); // true

/**
 * === (strict equality)
 * NO type coercion.
 * Compares both value AND type.
 */

console.log("5" === 5); // false
console.log(null === undefined); // false

/**
 * Best practice:
 * ALWAYS use === unless you fully understand == behavior.
 */

/* ============================================================
   8. null vs undefined
   ============================================================ */

/**
 * null = intentional absence of value
 * undefined = value not assigned
 */

console.log(null == undefined);  // true
console.log(null === undefined); // false

/* ============================================================
   9. Object & Array Coercion
   ============================================================ */

/**
 * Objects and arrays are coerced to strings
 * when used with + or comparisons.
 */

console.log([] + []);   // ""
console.log([] + {});   // "[object Object]"
console.log({} + []);   // 0 (context-dependent)

/**
 * Reason:
 * Objects → toString() → "[object Object]"
 */

/* ============================================================
   10. Comparison Coercion
   ============================================================ */

/**
 * Comparison operators (<, >, <=, >=)
 * can trigger number or string coercion.
 */

console.log("10" > 5);   // true (number coercion)
console.log("2" > "10"); // true (string comparison)

/**
 * If BOTH operands are strings,
 * comparison is lexicographical (dictionary order).
 */

/* ============================================================
   11. Common Pitfalls
   ============================================================ */

console.log("" == 0);     // true
console.log(false == ""); // true
console.log([] == false); // true

/**
 * These results are why == is dangerous.
 */

/* ============================================================
   12. Best Practices
   ============================================================ */

/**
 * ✔ Use explicit type conversion
 * ✔ Use === instead of ==
 * ✔ Avoid relying on implicit coercion
 * ✔ Be cautious with + operator
 *
 * Understanding coercion makes JavaScript predictable,
 * not weird.
 */

/**
 * ============================================================
 * End of File
 * ============================================================
 */
