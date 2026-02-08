/**
 * ============================================================
 * JavaScript Async/Await - Modern Async Programming
 * ============================================================
 *
 * Topics covered:
 * 1. What is async/await?
 * 2. async functions
 * 3. await keyword
 * 4. Error handling with try/catch
 * 5. Sequential vs Parallel execution
 * 6. Common patterns
 * 7. Real-world examples
 *
 * ============================================================
 */

/* ============================================================
   1. What is async/await?
   ============================================================ */

/**
 * WHAT IS async/await?
 * --------------------
 * async/await is syntactic sugar over Promises
 * Makes asynchronous code look and behave like synchronous code
 * 
 * REAL-WORLD ANALOGY:
 * Promises = Ordering food and getting a receipt
 * async/await = Waiting in line at a restaurant
 * 
 * With Promises (receipt):
 * - Order food → get receipt → do other things → check back later
 * - .then(checkFood).then(eat)
 * 
 * With async/await (waiting):
 * - Order food → WAIT right there → get food → eat
 * - const food = await orderFood(); eat(food);
 * 
 * WHY USE async/await?
 * ✅ More readable - looks like normal code
 * ✅ Easier to debug - can use regular debugger
 * ✅ Better error handling - use try/catch
 * ✅ No callback hell - no deep nesting
 * ✅ Cleaner than .then() chains
 * 
 * RELATIONSHIP:
 * async/await is built ON TOP of Promises
 * - async function always returns a Promise
 * - await only works with Promises
 * - It's just a cleaner way to write Promise code
 * 
 * MENTAL MODEL:
 * "async/await makes async code read like a recipe"
 * Step 1: Do this and wait
 * Step 2: Then do that and wait
 * Step 3: Finally do this
 */

/* ============================================================
   2. async Functions
   ============================================================ */

console.log("=== async Functions ===");

/**
 * WHAT DOES 'async' DO?
 * ----------------------
 * The 'async' keyword before a function does TWO things:
 * 
 * 1. Makes the function ALWAYS return a Promise
 *    - If you return a value, it's wrapped in Promise.resolve()
 *    - If you throw an error, it's wrapped in Promise.reject()
 * 
 * 2. Allows you to use 'await' inside the function
 * 
 * SYNTAX:
 * async function myFunction() {
 *   // can use await here
 * }
 * 
 * EXECUTION FLOW:
 * 1. Call async function
 * 2. Function returns Promise immediately
 * 3. Function body executes
 * 4. When done, Promise resolves/rejects
 */

// Basic async function
async function greet() {
  return "Hello"; // Automatically wrapped in Promise.resolve("Hello")
}

// What actually happens:
// function greet() {
//   return Promise.resolve("Hello");
// }

// Using the async function
greet().then(message => console.log(message)); // "Hello"

/**
 * ASYNC FUNCTION ALWAYS RETURNS PROMISE
 * --------------------------------------
 * Even if you return a plain value, it becomes a Promise
 */

async function getNumber() {
  return 42; // Returns Promise<42>
}

// Must use .then() or await to get the value
getNumber().then(num => console.log(num)); // 42

/**
 * DIFFERENT WAYS TO WRITE ASYNC FUNCTIONS
 * ----------------------------------------
 */

// Function declaration
async function declaredFunction() {
  return "declared";
}

// Function expression
const expressionFunction = async function() {
  return "expression";
};

// Arrow function
const arrowFunction = async () => {
  return "arrow";
};

// Method in object
const obj = {
  async method() {
    return "method";
  }
};

// Method in class
class MyClass {
  async method() {
    return "class method";
  }
}

/* ============================================================
   3. await Keyword
   ============================================================ */

console.log("=== await Keyword ===");

/**
 * WHAT DOES 'await' DO?
 * ----------------------
 * The 'await' keyword does THREE things:
 * 
 * 1. PAUSES execution of async function
 * 2. WAITS for Promise to resolve
 * 3. RETURNS the resolved value (or throws if rejected)
 * 
 * IMPORTANT RULES:
 * ❌ Can ONLY use await inside async functions
 * ❌ Cannot use await in regular functions
 * ✅ Can only await Promises (or values that become Promises)
 * 
 * HOW IT WORKS:
 * const result = await somePromise;
 * 
 * Step 1: somePromise starts executing
 * Step 2: await pauses the function HERE
 * Step 3: JavaScript does other things while waiting
 * Step 4: When Promise resolves, function resumes
 * Step 5: result gets the resolved value
 * Step 6: Continue to next line
 * 
 * VISUAL EXPLANATION:
 * 
 * WITHOUT await:
 * console.log("Start");
 * const promise = fetch(url);     // Returns Promise immediately
 * console.log("End");             // Runs right away
 * promise.then(data => ...);      // Runs later
 * 
 * WITH await:
 * console.log("Start");
 * const data = await fetch(url);  // WAITS here until done
 * console.log("End");             // Runs AFTER fetch completes
 */

// Helper function for examples
function delay(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

/**
 * EXAMPLE 1: Basic await usage
 * -----------------------------
 * Fetching data step by step
 */

async function fetchUserData() {
  console.log("1. Starting fetch...");
  
  // WAIT for this to complete before moving on
  const user = await delay(1000, { id: 1, name: "Alice" });
  console.log("2. Got user:", user);
  
  // WAIT for this to complete before moving on
  const posts = await delay(1000, ["Post 1", "Post 2"]);
  console.log("3. Got posts:", posts);
  
  console.log("4. All done!");
  return { user, posts };
}

// Call it
// fetchUserData();

/**
 * EXECUTION TRACE:
 * ----------------
 * Time 0ms:   "1. Starting fetch..."
 * Time 0ms:   await delay(1000) → PAUSE HERE
 *             (JavaScript does other things for 1 second)
 * Time 1000ms: await completes, user = { id: 1, name: "Alice" }
 * Time 1000ms: "2. Got user: ..."
 * Time 1000ms: await delay(1000) → PAUSE HERE AGAIN
 *             (JavaScript does other things for 1 second)
 * Time 2000ms: await completes, posts = ["Post 1", "Post 2"]
 * Time 2000ms: "3. Got posts: ..."
 * Time 2000ms: "4. All done!"
 * Time 2000ms: Function returns { user, posts }
 * 
 * TOTAL TIME: 2 seconds (sequential)
 */

/**
 * EXAMPLE 2: Comparing Promises vs async/await
 * ---------------------------------------------
 */

// ❌ With Promises (harder to read)
function getUserWithPromises() {
  return fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => response.json())
    .then(user => {
      return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
        .then(response => response.json())
        .then(posts => {
          return { user, posts };
        });
    });
}

// ✅ With async/await (much cleaner!)
async function getUserWithAsync() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();
  
  const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
  const posts = await postsResponse.json();
  
  return { user, posts };
}

/**
 * COMPARISON:
 * -----------
 * Promises version:
 * - Nested .then() calls
 * - Hard to see flow
 * - Variables need careful scoping
 * 
 * async/await version:
 * - Reads top to bottom
 * - Clear sequential steps
 * - Variables naturally scoped
 * - Looks like synchronous code!
 */

/* ============================================================
   4. Error Handling with try/catch
   ============================================================ */

console.log("=== Error Handling ===");

/**
 * ERROR HANDLING: try/catch vs .catch()
 * --------------------------------------
 * 
 * With Promises:
 * - Use .catch() at end of chain
 * - Can miss errors in nested chains
 * 
 * With async/await:
 * - Use try/catch blocks (like regular code!)
 * - Catches ALL errors in the block
 * - More familiar pattern
 * 
 * MENTAL MODEL:
 * try = "Try this code"
 * catch = "If anything goes wrong, do this"
 * finally = "Do this regardless"
 */

/**
 * EXAMPLE 1: Basic error handling
 * --------------------------------
 */

async function fetchWithErrorHandling() {
  try {
    // Try to execute this code
    const response = await fetch("https://api.example.com/data");
    
    // Check if response is ok (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Success:", data);
    return data;
    
  } catch (error) {
    // If ANY error occurs above, handle it here
    console.error("Error occurred:", error.message);
    
    // Can re-throw if needed
    // throw error;
    
    // Or return default value
    return null;
    
  } finally {
    // This ALWAYS runs (success or failure)
    console.log("Cleanup: Request completed");
  }
}

/**
 * EXECUTION FLOW:
 * ---------------
 * 
 * SUCCESS PATH:
 * 1. Enter try block
 * 2. await fetch → succeeds
 * 3. await response.json() → succeeds
 * 4. console.log("Success")
 * 5. Skip catch block
 * 6. Run finally block
 * 7. Return data
 * 
 * ERROR PATH:
 * 1. Enter try block
 * 2. await fetch → throws error OR response.ok is false
 * 3. Jump to catch block immediately
 * 4. console.error
 * 5. Run finally block
 * 6. Return null
 */

/**
 * EXAMPLE 2: Handling specific errors
 * ------------------------------------
 */

async function fetchUserById(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    
    // Handle different HTTP status codes
    if (response.status === 404) {
      throw new Error("User not found");
    }
    
    if (response.status === 401) {
      throw new Error("Unauthorized - please log in");
    }
    
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    
    return await response.json();
    
  } catch (error) {
    // Check error type and handle accordingly
    if (error.message.includes("not found")) {
      console.log("User doesn't exist");
      return null;
    }
    
    if (error.message.includes("Unauthorized")) {
      console.log("Need to authenticate");
      // Redirect to login
      return null;
    }
    
    // Unknown error
    console.error("Unexpected error:", error);
    throw error; // Re-throw for caller to handle
  }
}

/**
 * EXAMPLE 3: Multiple operations with error handling
 * ---------------------------------------------------
 */

async function processData() {
  try {
    // Step 1
    const userData = await fetchUserData();
    console.log("User data:", userData);
    
    // Step 2
    const processedData = await processUser(userData);
    console.log("Processed:", processedData);
    
    // Step 3
    const savedData = await saveToDatabase(processedData);
    console.log("Saved:", savedData);
    
    return savedData;
    
  } catch (error) {
    // This catches errors from ANY of the steps above
    console.error("Pipeline failed at some step:", error);
    
    // Log which step failed
    if (error.message.includes("fetch")) {
      console.error("Failed to fetch user");
    } else if (error.message.includes("process")) {
      console.error("Failed to process data");
    } else if (error.message.includes("save")) {
      console.error("Failed to save to database");
    }
    
    return null;
  }
}

/* ============================================================
   5. Sequential vs Parallel Execution
   ============================================================ */

console.log("=== Sequential vs Parallel ===");

/**
 * SEQUENTIAL EXECUTION (One after another)
 * -----------------------------------------
 * Use when: Second operation depends on first
 * Speed: Slower (sum of all times)
 */

async function sequentialExample() {
  console.time("sequential");
  
  // Wait for first to complete
  const user = await delay(1000, "Alice");      // 1 second
  console.log("Got user:", user);
  
  // Then wait for second to complete
  const posts = await delay(1000, ["Post 1"]);  // 1 second
  console.log("Got posts:", posts);
  
  console.timeEnd("sequential"); // Total: ~2 seconds
  
  return { user, posts };
}

// sequentialExample();

/**
 * EXECUTION TIMELINE (Sequential):
 * ---------------------------------
 * 0ms     → Start
 * 0-1000ms → Waiting for user
 * 1000ms   → Got user
 * 1000-2000ms → Waiting for posts
 * 2000ms   → Got posts
 * Total: 2000ms
 */

/**
 * PARALLEL EXECUTION (At the same time)
 * --------------------------------------
 * Use when: Operations are independent
 * Speed: Faster (longest time only)
 */

async function parallelExample() {
  console.time("parallel");
  
  // Start BOTH operations at once (don't await yet!)
  const userPromise = delay(1000, "Alice");
  const postsPromise = delay(1000, ["Post 1"]);
  
  // Now wait for BOTH to complete
  const user = await userPromise;   // Already running!
  const posts = await postsPromise; // Already running!
  
  console.timeEnd("parallel"); // Total: ~1 second
  
  return { user, posts };
}

// parallelExample();

/**
 * EXECUTION TIMELINE (Parallel):
 * -------------------------------
 * 0ms     → Start both operations
 * 0-1000ms → Both running simultaneously
 * 1000ms   → Both complete
 * Total: 1000ms (50% faster!)
 */

/**
 * USING Promise.all() FOR PARALLEL
 * ---------------------------------
 * Cleaner way to run multiple Promises in parallel
 */

async function parallelWithPromiseAll() {
  console.time("Promise.all");
  
  // Run all at once and wait for ALL to complete
  const [user, posts, comments] = await Promise.all([
    delay(1000, "Alice"),
    delay(1500, ["Post 1", "Post 2"]),
    delay(800, ["Comment 1"])
  ]);
  
  console.timeEnd("Promise.all"); // Total: ~1500ms (longest one)
  
  return { user, posts, comments };
}

// parallelWithPromiseAll();

/**
 * WHEN TO USE WHICH:
 * ------------------
 * 
 * SEQUENTIAL (await one by one):
 * ✅ Second depends on first result
 * ✅ Need to process in order
 * ✅ Want to fail fast (stop on first error)
 * Example: Fetch user → then fetch user's posts
 * 
 * PARALLEL (Promise.all):
 * ✅ Operations are independent
 * ✅ Want maximum speed
 * ✅ All results needed
 * Example: Fetch user + posts + comments all at once
 */

/**
 * EXAMPLE: When to use Sequential vs Parallel
 * --------------------------------------------
 */

// ❌ BAD: Sequential when could be parallel (SLOW)
async function slowWay() {
  const users = await fetch("/api/users").then(r => r.json());     // 1s
  const products = await fetch("/api/products").then(r => r.json()); // 1s
  const orders = await fetch("/api/orders").then(r => r.json());    // 1s
  return { users, products, orders };
  // Total: 3 seconds
}

// ✅ GOOD: Parallel when operations are independent (FAST)
async function fastWay() {
  const [users, products, orders] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/products").then(r => r.json()),
    fetch("/api/orders").then(r => r.json())
  ]);
  return { users, products, orders };
  // Total: 1 second (assuming each takes 1s)
}

// ✅ CORRECT: Sequential when second depends on first
async function correctSequential() {
  const user = await fetch("/api/user/1").then(r => r.json());
  // ↑ Need user.id for next request
  const posts = await fetch(`/api/posts?userId=${user.id}`).then(r => r.json());
  // ↑ Depends on user, must wait
  return { user, posts };
}

/* ============================================================
   6. Common Patterns
   ============================================================ */

console.log("=== Common Patterns ===");

/**
 * PATTERN 1: Retry logic
 * -----------------------
 */

async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries}`);
      const response = await fetch(url);
      
      if (response.ok) {
        return await response.json();
      }
      
      // If not last attempt, wait and retry
      if (attempt < maxRetries) {
        await delay(1000 * attempt); // Exponential backoff
      }
      
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
      }
      // Wait and retry
      await delay(1000 * attempt);
    }
  }
}

/**
 * PATTERN 2: Timeout wrapper
 * ---------------------------
 */

function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), ms);
  });
}

async function fetchWithTimeout(url, timeoutMs = 5000) {
  try {
    // Race: whichever finishes first wins
    const response = await Promise.race([
      fetch(url),
      timeout(timeoutMs)
    ]);
    
    return await response.json();
    
  } catch (error) {
    if (error.message === "Timeout") {
      console.error("Request timed out");
    }
    throw error;
  }
}

/**
 * PATTERN 3: Processing array items sequentially
 * -----------------------------------------------
 */

async function processSequentially(items) {
  const results = [];
  
  for (const item of items) {
    // Wait for each one before moving to next
    const result = await processItem(item);
    results.push(result);
  }
  
  return results;
}

/**
 * PATTERN 4: Processing array items in parallel
 * ----------------------------------------------
 */

async function processInParallel(items) {
  // Start all at once
  const promises = items.map(item => processItem(item));
  
  // Wait for all to complete
  return await Promise.all(promises);
}

/**
 * PATTERN 5: Processing with concurrency limit
 * ---------------------------------------------
 */

async function processWithLimit(items, limit = 3) {
  const results = [];
  
  for (let i = 0; i < items.length; i += limit) {
    // Process 'limit' items at a time
    const batch = items.slice(i, i + limit);
    const batchResults = await Promise.all(
      batch.map(item => processItem(item))
    );
    results.push(...batchResults);
  }
  
  return results;
}

/* ============================================================
   7. Real-World Examples
   ============================================================ */

console.log("=== Real-World Examples ===");

/**
 * EXAMPLE 1: Complete CRUD operations
 * ------------------------------------
 */

class UserAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  
  async getAll() {
    try {
      const response = await fetch(`${this.baseUrl}/users`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Failed to get users:", error);
      throw error;
    }
  }
  
  async getById(id) {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found");
      }
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  }
  
  async create(userData) {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) throw new Error("Failed to create user");
    return await response.json();
  }
  
  async update(id, updates) {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    });
    
    if (!response.ok) throw new Error("Failed to update user");
    return await response.json();
  }
  
  async delete(id) {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: "DELETE"
    });
    
    if (!response.ok) throw new Error("Failed to delete user");
    return true;
  }
}

/**
 * EXAMPLE 2: Data pipeline
 * -------------------------
 */

async function dataProcessingPipeline() {
  try {
    console.log("1. Fetching raw data...");
    const rawData = await fetchRawData();
    
    console.log("2. Validating data...");
    const validData = await validateData(rawData);
    
    console.log("3. Transforming data...");
    const transformedData = await transformData(validData);
    
    console.log("4. Saving to database...");
    const savedData = await saveToDatabase(transformedData);
    
    console.log("5. Sending notification...");
    await sendNotification(savedData);
    
    console.log("✅ Pipeline completed successfully!");
    return savedData;
    
  } catch (error) {
    console.error("❌ Pipeline failed:", error);
    await logError(error);
    throw error;
  }
}

/**
 * EXAMPLE 3: Parallel data fetching with dependencies
 * ----------------------------------------------------
 */

async function loadDashboard(userId) {
  try {
    // Step 1: Get user (needed for other requests)
    const user = await fetch(`/api/users/${userId}`).then(r => r.json());
    
    // Step 2: Fetch all user-related data in parallel
    const [posts, comments, favorites, followers] = await Promise.all([
      fetch(`/api/posts?userId=${user.id}`).then(r => r.json()),
      fetch(`/api/comments?userId=${user.id}`).then(r => r.json()),
      fetch(`/api/favorites?userId=${user.id}`).then(r => r.json()),
      fetch(`/api/followers?userId=${user.id}`).then(r => r.json())
    ]);
    
    // Step 3: Process and return
    return {
      user,
      posts,
      comments,
      favorites,
      followers,
      stats: {
        totalPosts: posts.length,
        totalComments: comments.length,
        totalFavorites: favorites.length,
        totalFollowers: followers.length
      }
    };
    
  } catch (error) {
    console.error("Failed to load dashboard:", error);
    throw error;
  }
}

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. async functions always return Promises
 * 2. await pauses execution until Promise resolves
 * 3. Use try/catch for error handling (like regular code!)
 * 4. Sequential = one after another (slower but sometimes needed)
 * 5. Parallel = all at once (faster when possible)
 * 6. Use Promise.all() for parallel operations
 * 7. async/await is just cleaner Promise syntax
 * 8. Can only use await inside async functions
 * 9. Makes async code read like synchronous code
 * 10. Much more maintainable than nested .then() chains
 *
 * ============================================================
 * End of File
 * ============================================================
 */
