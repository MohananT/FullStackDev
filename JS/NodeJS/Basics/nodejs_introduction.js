/**
 * ============================================================
 * Node.js Introduction - What is Node.js?
 * ============================================================
 *
 * Topics covered:
 * 1. What is Node.js?
 * 2. Why Node.js?
 * 3. Node.js vs Browser JavaScript
 * 4. Event Loop in Node.js
 * 5. Node.js Architecture
 * 6. First Node.js Program
 * 7. Global Objects
 * 8. Process Object
 *
 * ============================================================
 */

/* ============================================================
   1. What is Node.js?
   ============================================================ */

/**
 * WHAT IS NODE.JS?
 * ----------------
 * Node.js is JavaScript running OUTSIDE the browser
 * 
 * REAL-WORLD ANALOGY:
 * Browser JavaScript = Calculator app on your phone
 *   - Can only run inside the app
 *   - Limited to what the app allows
 *   - Can't access your file system
 * 
 * Node.js = Calculator app on your computer
 *   - Runs anywhere on your computer
 *   - Can access files, network, databases
 *   - Full system access
 * 
 * TECHNICAL DEFINITION:
 * Node.js is a JavaScript runtime built on Chrome's V8 engine
 * 
 * BREAKDOWN:
 * - Runtime: Environment where code executes
 * - V8 Engine: Google's JavaScript engine (super fast!)
 * - Chrome's V8: Same engine that powers Chrome browser
 * 
 * WHAT CAN YOU BUILD:
 * ✅ Web servers (APIs, websites)
 * ✅ Command-line tools
 * ✅ Real-time applications (chat, gaming)
 * ✅ Microservices
 * ✅ Desktop applications (Electron)
 * ✅ IoT applications
 * ✅ Automation scripts
 * 
 * KEY FEATURES:
 * 1. Asynchronous & Event-Driven (non-blocking I/O)
 * 2. Single-threaded (but can handle many connections)
 * 3. Fast execution (V8 engine compiles to machine code)
 * 4. npm ecosystem (largest package repository)
 * 5. Cross-platform (Windows, Mac, Linux)
 */

/* ============================================================
   2. Why Node.js?
   ============================================================ */

/**
 * WHY USE NODE.JS?
 * ----------------
 * 
 * ADVANTAGE 1: JavaScript Everywhere
 * -----------------------------------
 * Before Node.js:
 * - Frontend: JavaScript
 * - Backend: PHP, Python, Ruby, Java (different language!)
 * 
 * With Node.js:
 * - Frontend: JavaScript
 * - Backend: JavaScript (same language!)
 * 
 * Benefits:
 * ✅ One language to learn
 * ✅ Share code between frontend/backend
 * ✅ Same developers can work on both
 * ✅ Easier to switch between frontend/backend
 * 
 * ADVANTAGE 2: Non-Blocking I/O
 * ------------------------------
 * Traditional server (e.g., PHP):
 * - Request 1 → Wait for database → Response
 * - Request 2 → BLOCKED! Must wait for Request 1
 * 
 * Node.js server:
 * - Request 1 → Database (in background)
 * - Request 2 → Can process immediately!
 * - Database done → Send Response 1
 * 
 * Result: Can handle MANY requests simultaneously
 * 
 * ADVANTAGE 3: npm Ecosystem
 * ---------------------------
 * - Over 2 million packages
 * - Largest software registry in the world
 * - Solution for almost everything
 * 
 * ADVANTAGE 4: Performance
 * ------------------------
 * - V8 engine compiles JavaScript to machine code
 * - Fast execution
 * - Low latency
 * 
 * WHEN TO USE NODE.JS:
 * ✅ Real-time applications (chat, notifications)
 * ✅ APIs and microservices
 * ✅ Data streaming applications
 * ✅ Single-page applications (SPA)
 * ✅ I/O heavy applications
 * 
 * WHEN NOT TO USE NODE.JS:
 * ❌ CPU-intensive tasks (video encoding, AI/ML)
 * ❌ Applications requiring multi-threading
 */

/* ============================================================
   3. Node.js vs Browser JavaScript
   ============================================================ */

/**
 * DIFFERENCES: Node.js vs Browser
 * --------------------------------
 * 
 * SAME:
 * ✅ JavaScript syntax
 * ✅ Core language features (variables, functions, etc.)
 * ✅ Async/await, Promises
 * ✅ Array methods, Object methods
 * 
 * DIFFERENT:
 * 
 * Environment:
 * - Browser: Web pages, user interface
 * - Node.js: Server-side, file system
 * 
 * Global Objects:
 * - Browser: window, document, navigator, localStorage
 * - Node.js: global, process, __dirname, Buffer
 * 
 * APIs Available:
 * - Browser: DOM API, Fetch API, Web APIs
 * - Node.js: File System, HTTP, Crypto, Child Process
 * 
 * Modules:
 * - Browser: ES6 modules (import/export)
 * - Node.js: CommonJS (require/module.exports) + ES6
 */

console.log("=== Node.js vs Browser ===");

// ❌ These DON'T EXIST in Node.js:
// window
// document
// localStorage
// alert()
// fetch() (need to install node-fetch)

// ✅ These ARE AVAILABLE in Node.js:
console.log("Global:", typeof global);           // "object"
console.log("Process:", typeof process);         // "object"
console.log("__dirname:", typeof __dirname);     // "string"
console.log("__filename:", typeof __filename);   // "string"

/* ============================================================
   4. Event Loop in Node.js
   ============================================================ */

/**
 * NODE.JS EVENT LOOP
 * ------------------
 * 
 * ANALOGY: Restaurant Kitchen
 * 
 * Traditional Server (Synchronous):
 * - Chef takes order 1
 * - Cooks order 1 completely
 * - Serves order 1
 * - THEN takes order 2
 * Result: One order at a time → SLOW!
 * 
 * Node.js (Asynchronous):
 * - Chef takes order 1 → Puts it in oven (async)
 * - Takes order 2 → Puts on stove (async)
 * - Takes order 3 → Prepares salad
 * - Oven beeps → Serves order 1
 * - Stove ready → Serves order 2
 * Result: Multiple orders in parallel → FAST!
 * 
 * HOW IT WORKS:
 * 1. Execute synchronous code
 * 2. Start async operations (file read, database, HTTP)
 * 3. Don't wait! Move to next code
 * 4. When async completes, execute callback
 * 5. Repeat
 * 
 * PHASES:
 * 1. Timers (setTimeout, setInterval)
 * 2. I/O callbacks (network, file operations)
 * 3. Poll (retrieve new I/O events)
 * 4. Check (setImmediate)
 * 5. Close callbacks
 */

console.log("=== Event Loop Example ===");

console.log("1. Start");

// Async operation
setTimeout(() => {
  console.log("3. Timeout callback");
}, 0);

// Synchronous
console.log("2. End");

// Output:
// 1. Start
// 2. End
// 3. Timeout callback

/**
 * WHY THIS ORDER?
 * --------------
 * 1. "Start" prints (synchronous)
 * 2. setTimeout registered (goes to Event Loop)
 * 3. "End" prints (synchronous)
 * 4. Call stack empty → Event Loop executes timeout
 * 5. "Timeout callback" prints
 */

/* ============================================================
   5. Node.js Architecture
   ============================================================ */

/**
 * ARCHITECTURE LAYERS
 * -------------------
 * 
 * ┌─────────────────────────────────────┐
 * │   Your JavaScript Code              │ ← You write this
 * ├─────────────────────────────────────┤
 * │   Node.js APIs                      │ ← fs, http, crypto
 * │   (JavaScript bindings)             │
 * ├─────────────────────────────────────┤
 * │   V8 JavaScript Engine              │ ← Executes JavaScript
 * │   (Google Chrome's engine)          │
 * ├─────────────────────────────────────┤
 * │   libuv (C++)                       │ ← Event Loop, async I/O
 * │   Other C++ libraries               │
 * ├─────────────────────────────────────┤
 * │   Operating System                  │ ← Windows, Mac, Linux
 * └─────────────────────────────────────┘
 * 
 * COMPONENTS:
 * 
 * 1. V8 Engine:
 *    - Compiles JavaScript to machine code
 *    - Memory management
 *    - Garbage collection
 * 
 * 2. libuv:
 *    - Event loop
 *    - Async I/O operations
 *    - Thread pool for heavy operations
 * 
 * 3. Node.js Bindings:
 *    - Bridge between JavaScript and C++
 *    - Provides APIs (fs, http, crypto)
 */

/* ============================================================
   6. First Node.js Program
   ============================================================ */

/**
 * RUNNING NODE.JS CODE
 * --------------------
 * 
 * Method 1: Node REPL (Read-Eval-Print-Loop)
 * - Type `node` in terminal
 * - Interactive JavaScript console
 * - Good for testing quick code
 * 
 * Method 2: Execute File
 * - Create file: app.js
 * - Run: node app.js
 * - Production way
 */

console.log("=== First Node.js Program ===");

// Simple hello world
console.log("Hello from Node.js!");

// Calculate and display
const sum = 5 + 10;
console.log("5 + 10 =", sum);

// Working with arrays
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

/**
 * TO RUN THIS FILE:
 * -----------------
 * 1. Save this file as: nodejs_introduction.js
 * 2. Open terminal
 * 3. Navigate to file location
 * 4. Run: node nodejs_introduction.js
 * 5. See output in terminal!
 */

/* ============================================================
   7. Global Objects
   ============================================================ */

/**
 * GLOBAL OBJECTS IN NODE.JS
 * --------------------------
 * Available everywhere without importing
 */

console.log("=== Global Objects ===");

// console - for logging
console.log("Standard log");
console.error("Error message");
console.warn("Warning message");
console.table({ name: "Alice", age: 25 });

// setTimeout / setInterval - timers
setTimeout(() => {
  console.log("After 1 second");
}, 1000);

// __dirname - current directory path
console.log("Current directory:", __dirname);

// __filename - current file path
console.log("Current file:", __filename);

// process - information about Node.js process
console.log("Node version:", process.version);
console.log("Platform:", process.platform);

// global - global namespace (like 'window' in browser)
global.myGlobalVar = "Available everywhere";
console.log("Global var:", global.myGlobalVar);

// Buffer - for working with binary data
const buf = Buffer.from("Hello");
console.log("Buffer:", buf);

/* ============================================================
   8. Process Object
   ============================================================ */

/**
 * PROCESS OBJECT
 * --------------
 * Information about current Node.js process
 * Can control the process
 */

console.log("=== Process Object ===");

// Process information
console.log("Process ID:", process.pid);
console.log("Node version:", process.version);
console.log("Platform:", process.platform); // win32, darwin, linux
console.log("Architecture:", process.arch); // x64, arm
console.log("Memory usage:", process.memoryUsage());

// Current working directory
console.log("CWD:", process.cwd());

// Change directory (be careful!)
// process.chdir('/path/to/directory');

// Environment variables
console.log("User:", process.env.USER);
console.log("Path:", process.env.PATH);

// Command line arguments
console.log("Arguments:", process.argv);
// Run: node file.js arg1 arg2
// process.argv = ['node', 'file.js', 'arg1', 'arg2']

// Exit process
// process.exit(0); // Success
// process.exit(1); // Error

// Process events
process.on('exit', (code) => {
  console.log(`Exiting with code: ${code}`);
});

process.on('uncaughtException', (error) => {
  console.error("Uncaught exception:", error);
  process.exit(1);
});

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. Node.js = JavaScript outside the browser
 * 2. Built on Chrome's V8 engine
 * 3. Asynchronous & non-blocking I/O
 * 4. Perfect for I/O heavy applications
 * 5. Same language for frontend & backend
 * 6. Huge npm ecosystem
 * 7. Event-driven architecture
 * 8. Single-threaded but handles many connections
 * 9. Global objects: process, Buffer, __dirname
 * 10. Run with: node filename.js
 *
 * NEXT STEPS:
 * - Learn File System (fs) module
 * - Learn HTTP module
 * - Build your first server
 * - Understand npm and packages
 *
 * ============================================================
 * End of File
 * ============================================================
 */
