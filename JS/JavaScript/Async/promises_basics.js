/**
 * ============================================================
 * JavaScript Promises - Fundamentals
 * ============================================================
 *
 * Topics covered:
 * 1. Callbacks & Callback Hell
 * 2. What are Promises?
 * 3. Creating Promises
 * 4. Promise states
 * 5. then(), catch(), finally()
 * 6. Promise chaining
 * 7. Promise static methods
 *
 * ============================================================
 */

/* ============================================================
   1. Callbacks & Callback Hell
   ============================================================ */

console.log("=== Callbacks ===");

/**
 * Callbacks = functions passed as arguments
 * Used for handling async operations
 */

function fetchUser(callback) {
  setTimeout(() => {
    const user = { id: 1, name: "Alice" };
    callback(user);
  }, 1000);
}

fetchUser((user) => {
  console.log("User fetched:", user);
});

// Callback Hell (Pyramid of Doom)
console.log("=== Callback Hell ===");

function step1(callback) {
  setTimeout(() => {
    console.log("Step 1 complete");
    callback();
  }, 1000);
}

function step2(callback) {
  setTimeout(() => {
    console.log("Step 2 complete");
    callback();
  }, 1000);
}

function step3(callback) {
  setTimeout(() => {
    console.log("Step 3 complete");
    callback();
  }, 1000);
}

// Nested callbacks (hard to read and maintain)
step1(() => {
  step2(() => {
    step3(() => {
      console.log("All steps done");
    });
  });
});

/* ============================================================
   2. What are Promises?
   ============================================================ */

/**
 * WHAT IS A PROMISE?
 * ------------------
 * A Promise is like a receipt for an async operation
 * 
 * REAL-WORLD ANALOGY:
 * You order food at a restaurant:
 * 1. You place order (start async operation)
 * 2. You get a receipt/buzzer (Promise object)
 * 3. The kitchen prepares food (operation in progress)
 * 4. Either: Food ready (resolved) OR Order cancelled (rejected)
 * 5. You do something with result (then/catch)
 * 
 * TECHNICAL DEFINITION:
 * A Promise is an object representing the eventual completion or failure
 * of an asynchronous operation
 * 
 * WHY PROMISES EXIST:
 * Before Promises, we used callbacks → led to "callback hell"
 * Promises provide a cleaner way to handle async code
 * 
 * BENEFITS:
 * ✅ Better error handling (single .catch() for all errors)
 * ✅ Cleaner syntax (chain .then() instead of nested callbacks)
 * ✅ Easier composition (Promise.all, Promise.race)
 * ✅ Avoid callback hell (pyramid of doom)
 * 
 * MENTAL MODEL:
 * Promise = IOU for a future value
 * "I promise to give you data... eventually"
 */

/* ============================================================
   3. Creating Promises
   ============================================================ */

console.log("=== Creating Promises ===");

/**
 * HOW TO CREATE A PROMISE
 * ------------------------
 * 
 * SYNTAX:
 *   new Promise((resolve, reject) => {
 *     // Do async work
 *     if (success) {
 *       resolve(value);  // Promise fulfilled
 *     } else {
 *       reject(error);   // Promise rejected
 *     }
 *   })
 * 
 * PARAMETERS:
 * - resolve: Function to call when operation succeeds
 * - reject:  Function to call when operation fails
 * 
 * EXECUTION FLOW:
 * 1. new Promise() creates promise object immediately
 * 2. Executor function runs immediately (not async yet)
 * 3. Inside executor, do your async work (fetch, setTimeout, etc.)
 * 4. Call resolve(data) when done successfully
 * 5. Call reject(error) if something goes wrong
 * 6. Promise state changes from pending → fulfilled/rejected
 * 
 * IMPORTANT: Call resolve() OR reject() only once!
 * Calling multiple times does nothing (first call wins)
 */

// Basic promise
const myPromise = new Promise((resolve, reject) => {
  // This function runs IMMEDIATELY when promise is created
  const success = true;

  // Simulate async operation (like API call)
  setTimeout(() => {
    // After 1 second, determine outcome
    if (success) {
      // ✅ Success: Call resolve() with the result data
      resolve("Operation successful!");
    } else {
      // ❌ Failure: Call reject() with error message
      reject("Operation failed!");
    }
  }, 1000);
});

/**
 * USING A PROMISE
 * ---------------
 * 
 * METHODS:
 * .then(successCallback)    - Runs if promise resolves
 * .catch(errorCallback)     - Runs if promise rejects
 * .finally(alwaysCallback)  - Runs regardless of outcome
 * 
 * EXECUTION:
 * 1. Promise is pending while async work happens
 * 2. Either resolve() or reject() is called
 * 3. Appropriate handler (.then or .catch) executes
 * 4. .finally() always executes at the end
 */

// Using the promise
myPromise
  .then((result) => {
    // This runs if resolve() was called
    console.log(result); // "Operation successful!"
    // result = whatever was passed to resolve()
  })
  .catch((error) => {
    // This runs if reject() was called
    console.error(error);
    // error = whatever was passed to reject()
  });

// Real example: fetch data
function fetchUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "Alice" });
      } else {
        reject("Invalid ID");
      }
    }, 1000);
  });
}

fetchUserPromise(1)
  .then(user => console.log("Fetched:", user))
  .catch(error => console.error("Error:", error));

/* ============================================================
   4. Promise States
   ============================================================ */

/**
 * A Promise can be in one of three states:
 *
 * 1. Pending   - initial state, neither fulfilled nor rejected
 * 2. Fulfilled - operation completed successfully (resolved)
 * 3. Rejected  - operation failed
 *
 * Once settled (fulfilled or rejected), state cannot change
 */

// Fulfilled promise
const fulfilled = Promise.resolve("Success!");
fulfilled.then(console.log); // "Success!"

// Rejected promise
const rejected = Promise.reject("Error!");
rejected.catch(console.error); // "Error!"

/* ============================================================
   5. then(), catch(), finally()
   ============================================================ */

console.log("=== then(), catch(), finally() ===");

const promise = new Promise((resolve, reject) => {
  const random = Math.random();
  setTimeout(() => {
    if (random > 0.5) {
      resolve(`Success! (${random})`);
    } else {
      reject(`Failed! (${random})`);
    }
  }, 1000);
});

// then() - handle success
promise.then((result) => {
  console.log("Success:", result);
});

// catch() - handle error
promise.catch((error) => {
  console.error("Error:", error);
});

// finally() - runs regardless of outcome
promise.finally(() => {
  console.log("Promise settled (completed)");
});

// All together
promise
  .then((result) => {
    console.log("Result:", result);
    return result;
  })
  .catch((error) => {
    console.error("Error:", error);
    throw error; // re-throw if needed
  })
  .finally(() => {
    console.log("Cleanup code");
  });

/* ============================================================
   6. Promise Chaining
   ============================================================ */

console.log("=== Promise Chaining ===");

/**
 * Promises can be chained to avoid callback hell
 * Each .then() returns a new promise
 */

function fetchUser2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "Alice" });
    }, 1000);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" }
      ]);
    }, 1000);
  });
}

function fetchComments(postId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: 1, text: "Great post!" }]);
    }, 1000);
  });
}

// Clean chaining (vs callback hell)
fetchUser2()
  .then((user) => {
    console.log("User:", user);
    return fetchPosts(user.id);
  })
  .then((posts) => {
    console.log("Posts:", posts);
    return fetchComments(posts[0].id);
  })
  .then((comments) => {
    console.log("Comments:", comments);
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Chain completed");
  });

// Return value becomes next .then() parameter
Promise.resolve(5)
  .then(num => num * 2)     // 10
  .then(num => num + 3)     // 13
  .then(num => {
    console.log(num);       // 13
  });

// Returning a promise
Promise.resolve("start")
  .then(() => {
    return new Promise(resolve => {
      setTimeout(() => resolve("done"), 1000);
    });
  })
  .then(result => {
    console.log(result); // "done" (after 1 second)
  });

/* ============================================================
   7. Promise Static Methods
   ============================================================ */

console.log("=== Promise.all() ===");

/**
 * Promise.all() - wait for all promises (parallel)
 * Resolves when ALL resolve
 * Rejects if ANY rejects
 */

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve) => setTimeout(() => resolve(2), 1000));
const promise3 = Promise.resolve(1);

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log("All resolved:", values); // [3, 2, 1]
  })
  .catch((error) => {
    console.error("One failed:", error);
  });

// Real example: fetch multiple resources
Promise.all([
  fetch("https://jsonplaceholder.typicode.com/users/1").then(r => r.json()),
  fetch("https://jsonplaceholder.typicode.com/users/2").then(r => r.json()),
  fetch("https://jsonplaceholder.typicode.com/users/3").then(r => r.json())
])
  .then(([user1, user2, user3]) => {
    console.log(user1, user2, user3);
  })
  .catch(error => console.error("Fetch failed:", error));

console.log("=== Promise.race() ===");

/**
 * Promise.race() - returns first settled promise
 * Resolves/rejects with first result
 */

Promise.race([promise1, promise2, promise3])
  .then((value) => {
    console.log("First to finish:", value); // 3 or 1 (both resolve immediately)
  });

// Timeout pattern
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), ms);
  });
}

Promise.race([
  fetch("https://jsonplaceholder.typicode.com/users"),
  timeout(5000)
])
  .then(response => response.json())
  .catch(error => console.error("Request failed or timed out:", error));

console.log("=== Promise.allSettled() (ES2020) ===");

/**
 * Promise.allSettled() - wait for all, regardless of outcome
 * Always resolves with array of results
 */

const mixed = [
  Promise.resolve("success"),
  Promise.reject("error"),
  Promise.resolve("another success")
];

Promise.allSettled(mixed).then((results) => {
  console.log("All settled:", results);
  // [
  //   { status: "fulfilled", value: "success" },
  //   { status: "rejected", reason: "error" },
  //   { status: "fulfilled", value: "another success" }
  // ]

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`${index}: Success -`, result.value);
    } else {
      console.log(`${index}: Failed -`, result.reason);
    }
  });
});

console.log("=== Promise.any() (ES2021) ===");

/**
 * Promise.any() - first fulfilled promise
 * Ignores rejections until all reject
 */

Promise.any([
  Promise.reject("error 1"),
  Promise.resolve("success"),
  Promise.reject("error 2")
]).then((result) => {
  console.log("First success:", result); // "success"
}).catch((error) => {
  console.error("All rejected:", error);
});

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * - Promises solve callback hell
 * - Three states: pending, fulfilled, rejected
 * - Use .then() for success, .catch() for errors, .finally() for cleanup
 * - Chain promises for sequential operations
 * - Promise.all() for parallel operations
 * - Promise.race() for timeout patterns
 * - Promise.allSettled() when you need all results
 * - Promise.any() for first success
 *
 * ============================================================
 * End of File
 * ============================================================
 */
