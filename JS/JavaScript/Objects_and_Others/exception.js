/**
 * ============================================================
 * JavaScript Exception Handling – In One File
 * ============================================================
 *
 * Topics covered:
 * 1. What exceptions are
 * 2. Runtime errors vs syntax errors
 * 3. try...catch
 * 4. Error object
 * 5. catch without error variable
 * 6. finally block
 * 7. Throwing custom errors
 * 8. Built-in error types
 * 9. Synchronous vs asynchronous errors
 * 10. Error handling with async / await
 * 11. Re-throwing errors
 * 12. Best practices
 *
 * Real-world explanations for modern JavaScript.
 * ============================================================
 */

/* ============================================================
   1. What Are Exceptions?
   ============================================================ */

/**
 * An exception is an error that occurs
 * while the program is running.
 *
 * When an exception occurs:
 * - Normal execution stops
 * - Control jumps to the nearest catch block
 */

console.log("Start");
// console.log(notDefined); // ❌ ReferenceError
console.log("End");

/* ============================================================
   2. Runtime Errors vs Syntax Errors
   ============================================================ */

/**
 * Syntax errors:
 * - Detected before code runs
 * - Cannot be caught with try...catch
 */

// if (true { } // ❌ SyntaxError

/**
 * Runtime errors:
 * - Occur during execution
 * - CAN be caught with try...catch
 */

/* ============================================================
   3. try...catch
   ============================================================ */

/**
 * try block:
 * - Contains code that may throw an error
 *
 * catch block:
 * - Executes if an error occurs
 */

try {
  let result = 10 / unknownVar;
  console.log(result);
} catch (error) {
  console.log("Something went wrong");
}

/* ============================================================
   4. The Error Object
   ============================================================ */

/**
 * The error object contains useful info:
 * - name
 * - message
 * - stack (debugging info)
 */

try {
  JSON.parse("{ invalid json }");
} catch (error) {
  console.log(error.name);    // SyntaxError
  console.log(error.message); // Unexpected token
}

/* ============================================================
   5. catch Without Error Variable
   ============================================================ */

/**
 * If you don't need the error object,
 * you can omit it.
 */

try {
  console.log("Safe code");
} catch {
  console.log("Error occurred");
}

/* ============================================================
   6. finally Block
   ============================================================ */

/**
 * finally:
 * - Always runs
 * - Executes whether an error occurs or not
 *
 * Used for cleanup logic.
 */

try {
  console.log("Try block");
} catch {
  console.log("Catch block");
} finally {
  console.log("Finally block");
}

/* ============================================================
   7. Throwing Custom Errors
   ============================================================ */

/**
 * You can manually throw errors using `throw`.
 *
 * Best practice:
 * Throw Error objects, not strings.
 */

function withdraw(amount) {
  if (amount <= 0) {
    throw new Error("Amount must be positive");
  }
  return amount;
}

try {
  withdraw(-10);
} catch (error) {
  console.log(error.message);
}

/* ============================================================
   8. Built-in Error Types
   ============================================================ */

/**
 * Common built-in errors:
 *
 * - Error
 * - ReferenceError
 * - TypeError
 * - RangeError
 * - SyntaxError
 */

try {
  let num = 1;
  num.toUpperCase(); // ❌ TypeError
} catch (error) {
  console.log(error.name); // TypeError
}

/* ============================================================
   9. Synchronous vs Asynchronous Errors
   ============================================================ */

/**
 * try...catch only catches SYNCHRONOUS errors.
 *
 * It will NOT catch errors thrown
 * inside asynchronous callbacks.
 */

try {
  setTimeout(() => {
    throw new Error("Async error");
  }, 100);
} catch (error) {
  console.log("Will NOT catch async error");
}

/* ============================================================
   10. Error Handling with async / await
   ============================================================ */

/**
 * async / await allows async errors
 * to be caught using try...catch.
 */

async function fetchData() {
  try {
    throw new Error("Failed to fetch");
  } catch (error) {
    console.log(error.message);
  }
}

fetchData();

/* ============================================================
   11. Re-throwing Errors
   ============================================================ */

/**
 * Sometimes you want to:
 * - Handle an error partially
 * - Then pass it up the call stack
 */

function parseData(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log("Invalid JSON");
    throw error; // re-throw
  }
}

try {
  parseData("{ bad json }");
} catch (error) {
  console.log("Handled at higher level");
}

/* ============================================================
   12. Best Practices
   ============================================================ */

/**
 * ✔ Use try...catch for expected failures
 * ✔ Throw meaningful Error objects
 * ✔ Don't swallow errors silently
 * ✔ Handle async errors with async/await
 * ✔ Avoid using try...catch for normal control flow
 */
