/**
 * ============================================================
 * JavaScript Scope & Closures – In One File
 * ============================================================
 *
 * Topics covered:
 * 1. What scope is
 * 2. Global scope
 * 3. Function scope
 * 4. Block scope (let / const)
 * 5. Lexical scope
 * 6. Scope chain
 * 7. Variable shadowing
 * 8. Closures
 * 9. Practical closure examples
 * 10. Common closure pitfalls
 * 11. Closures in loops
 * 12. Why closures matter
 *
 * Real-world explanations for modern JavaScript.
 * ============================================================
 */

/* ============================================================
   1. What Is Scope?
   ============================================================ */

/**
 * Scope determines WHERE variables are accessible
 * in your code.
 *
 * JavaScript uses LEXICAL (static) scoping:
 * Scope is decided by where code is written,
 * not where it is executed.
 */

/* ============================================================
   2. Global Scope
   ============================================================ */

/**
 * Variables declared outside any function or block
 * are in the global scope.
 *
 * Global variables are accessible everywhere,
 * but should be avoided to prevent conflicts.
 */

var globalVar = "I am global";

function accessGlobal() {
  console.log(globalVar);
}

accessGlobal();

/* ============================================================
   3. Function Scope
   ============================================================ */

/**
 * Variables declared inside a function
 * are only accessible within that function.
 *
 * Applies to:
 * - var
 * - let
 * - const
 */

function functionScopeExample() {
  var x = 10;
  let y = 20;
  const z = 30;

  console.log(x, y, z);
}

functionScopeExample();

// console.log(x); // ❌ ReferenceError

/* ============================================================
   4. Block Scope (let / const)
   ============================================================ */

/**
 * Block scope exists within:
 * - if
 * - for
 * - while
 * - switch
 * - {}
 *
 * ONLY let and const are block-scoped.
 * var ignores block scope.
 */

if (true) {
  var a = 1;
  let b = 2;
  const c = 3;
}

console.log(a); // 1
// console.log(b); // ❌ ReferenceError
// console.log(c); // ❌ ReferenceError

/* ============================================================
   5. Lexical Scope
   ============================================================ */

/**
 * Lexical scope means:
 * Inner functions have access to variables
 * defined in their outer (parent) scopes.
 */

function outer() {
  let outerVar = "I am outside";

  function inner() {
    console.log(outerVar);
  }

  inner();
}

outer();

/* ============================================================
   6. Scope Chain
   ============================================================ */

/**
 * When a variable is accessed,
 * JavaScript looks for it in this order:
 *
 * 1. Current scope
 * 2. Parent scope
 * 3. Grandparent scope
 * 4. Global scope
 *
 * If not found → ReferenceError
 */

let level = "global";

function first() {
  let level = "first";

  function second() {
    let level = "second";
    console.log(level);
  }

  second();
}

first(); // "second"

/* ============================================================
   7. Variable Shadowing
   ============================================================ */

/**
 * Variable shadowing occurs when
 * a variable in an inner scope has
 * the same name as one in an outer scope.
 *
 * The inner variable "shadows" the outer one.
 */

let color = "blue";

function paint() {
  let color = "red";
  console.log(color);
}

paint();      // "red"
console.log(color); // "blue"

/* ============================================================
   8. Closures
   ============================================================ */

/**
 * A closure is created when:
 * A function "remembers" variables
 * from its lexical scope even AFTER
 * the outer function has finished executing.
 */

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2

/* ============================================================
   9. Practical Closure Examples
   ============================================================ */

/**
 * Closures are used for:
 * - Data privacy
 * - Encapsulation
 * - Function factories
 */

function createUser(name) {
  return {
    getName() {
      return name;
    },
  };
}

const user = createUser("Alex");
console.log(user.getName()); // "Alex"

/* ============================================================
   10. Common Closure Pitfalls
   ============================================================ */

/**
 * Closures capture VARIABLES, not values.
 * This can cause unexpected behavior in loops.
 */

var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs.push(function () {
    console.log(i);
  });
}

funcs[0](); // 3
funcs[1](); // 3
funcs[2](); // 3

/* ============================================================
   11. Closures in Loops (Correct Way)
   ============================================================ */

/**
 * Using let creates a new binding
 * for each loop iteration.
 */

var funcsFixed = [];

for (let i = 0; i < 3; i++) {
  funcsFixed.push(function () {
    console.log(i);
  });
}

funcsFixed[0](); // 0
funcsFixed[1](); // 1
funcsFixed[2](); // 2

/* ============================================================
   12. Why Closures Matter
   ============================================================ */

/**
 * Closures enable:
 * - React hooks
 * - Event handlers
 * - Memoization
 * - Private state
 *
 * Mastering closures means mastering JavaScript.
 */


