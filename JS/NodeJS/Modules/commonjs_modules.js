/**
 * ============================================================
 * Node.js CommonJS Modules
 * ============================================================
 *
 * Topics covered:
 * 1. What are modules?
 * 2. require() - importing modules
 * 3. module.exports - exporting
 * 4. exports shorthand
 * 5. Built-in modules
 * 6. Creating custom modules
 * 7. Module caching
 * 8. CommonJS vs ES6 modules
 *
 * ============================================================
 */

/* ============================================================
   1. What are Modules?
   ============================================================ */

/**
 * WHAT ARE MODULES?
 * -----------------
 * Modules are reusable pieces of code
 * Each file is a module in Node.js
 * 
 * REAL-WORLD ANALOGY:
 * Think of modules like LEGO blocks:
 * - Each block (module) does one thing
 * - You connect blocks to build something bigger
 * - Can reuse same block in different builds
 * - Organized and maintainable
 * 
 * WHY MODULES?
 * ✅ Code organization (split large codebase)
 * ✅ Reusability (use same code in multiple places)
 * ✅ Encapsulation (private/public parts)
 * ✅ Maintainability (easier to debug/update)
 * ✅ Avoid naming conflicts
 * 
 * IN NODE.JS:
 * - Every .js file is automatically a module
 * - Variables/functions are private by default
 * - Must explicitly export what you want to share
 * - Import using require()
 */

/* ============================================================
   2. require() - Importing Modules
   ============================================================ */

/**
 * REQUIRE() - IMPORT CODE
 * -----------------------
 * 
 * SYNTAX:
 * const module = require('module-name');
 * 
 * HOW IT WORKS:
 * 1. Node.js looks for module
 * 2. Loads the file
 * 3. Executes the code
 * 4. Returns module.exports
 * 5. Caches the result
 * 
 * WHERE NODE.JS LOOKS (in order):
 * 1. Core modules (fs, http, path) - built-in
 * 2. ./file or ../file - relative path
 * 3. node_modules/ - installed packages
 */

console.log("=== require() Examples ===");

// Import built-in module
const fs = require('fs');
const path = require('path');
const http = require('http');

// Import local module (your file)
// const myModule = require('./myModule');
// const utils = require('../utils/helpers');

// Import npm package
// const express = require('express');
// const axios = require('axios');

// Import specific file
// const config = require('./config.json'); // Can import JSON!

// Destructuring import
const { readFile, writeFile } = require('fs');
// Same as: const fs = require('fs'); const readFile = fs.readFile;

/**
 * REQUIRE PATH RULES:
 * -------------------
 * 
 * Built-in module (no path):
 * require('fs')        → Node.js core module
 * 
 * Relative path (starts with . or ..):
 * require('./file')    → Same directory
 * require('../file')   → Parent directory
 * require('./utils/helper') → Subfolder
 * 
 * npm package (no path, not built-in):
 * require('express')   → Looks in node_modules/
 * 
 * Can omit .js extension:
 * require('./myModule')  → looks for myModule.js
 */

/* ============================================================
   3. module.exports - Exporting
   ============================================================ */

/**
 * MODULE.EXPORTS - SHARE CODE
 * ---------------------------
 * 
 * Whatever you assign to module.exports becomes
 * available to other files via require()
 * 
 * THINK OF IT AS:
 * module.exports = the package you're sending
 * require() = receiving the package
 */

console.log("=== module.exports Examples ===");

// ========== math.js (example module) ==========

// Pattern 1: Export an object
module.exports = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  },
  PI: 3.14159
};

// Usage in another file:
// const math = require('./math');
// console.log(math.add(5, 3)); // 8
// console.log(math.PI);        // 3.14159

// ========== user.js (example module) ==========

// Pattern 2: Export a class
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  greet() {
    return `Hello, ${this.name}`;
  }
}

module.exports = User;

// Usage:
// const User = require('./user');
// const alice = new User('Alice', 'alice@example.com');
// console.log(alice.greet());

// ========== utils.js (example module) ==========

// Pattern 3: Export a function
module.exports = function(name) {
  return `Hello, ${name}!`;
};

// Usage:
// const greet = require('./utils');
// console.log(greet('Alice')); // "Hello, Alice!"

/* ============================================================
   4. exports Shorthand
   ============================================================ */

/**
 * EXPORTS SHORTHAND
 * -----------------
 * 
 * exports is a reference to module.exports
 * Shortcut for adding properties
 * 
 * IMPORTANT:
 * ✅ Can do: exports.something = value
 * ❌ Can't do: exports = value (breaks reference!)
 */

// ========== helpers.js (example) ==========

// ✅ Correct: Add properties
exports.double = function(n) {
  return n * 2;
};

exports.triple = function(n) {
  return n * 3;
};

// Same as:
// module.exports.double = function(n) { ... };

// ❌ Wrong: Reassigning exports
// exports = function() { ... }; 
// This doesn't work! Use module.exports

// ✅ Correct way to export single thing:
module.exports = function() {
  return "single export";
};

/**
 * MENTAL MODEL:
 * -------------
 * Initially: exports → module.exports → {}
 * 
 * exports.add = fn;
 * → module.exports = { add: fn }  ✅ Works!
 * 
 * exports = fn;
 * → exports now points elsewhere
 * → module.exports still = {}     ❌ Doesn't work!
 */

/* ============================================================
   5. Built-in Modules
   ============================================================ */

/**
 * CORE MODULES (No Installation Needed)
 * --------------------------------------
 */

console.log("=== Built-in Modules ===");

// fs - File System
const fsModule = require('fs');
// Read files, write files, create directories

// path - Path utilities
const pathModule = require('path');
console.log(pathModule.join(__dirname, 'file.txt'));
console.log(pathModule.extname('file.txt')); // .txt

// os - Operating System info
const os = require('os');
console.log("Platform:", os.platform());
console.log("CPU:", os.cpus().length, "cores");
console.log("Free memory:", os.freemem());
console.log("Total memory:", os.totalmem());

// http / https - Create servers
const httpModule = require('http');

// crypto - Cryptography
const crypto = require('crypto');

// events - Event emitter
const EventEmitter = require('events');

// util - Utility functions
const util = require('util');

// stream - Streaming data
const stream = require('stream');

/* ============================================================
   6. Creating Custom Modules
   ============================================================ */

/**
 * EXAMPLE: Create Calculator Module
 * ----------------------------------
 */

// ========== calculator.js ==========
// (This would be in a separate file)

// Private variables (not exported)
const PI = 3.14159;
const E = 2.71828;

// Private function (not exported)
function validateNumber(n) {
  return typeof n === 'number' && !isNaN(n);
}

// Public API (exported)
module.exports = {
  add(a, b) {
    if (!validateNumber(a) || !validateNumber(b)) {
      throw new Error('Invalid numbers');
    }
    return a + b;
  },
  
  multiply(a, b) {
    return a * b;
  },
  
  getPI() {
    return PI;
  }
};

// ========== app.js (main file) ==========
// const calculator = require('./calculator');
// console.log(calculator.add(5, 3));      // 8
// console.log(calculator.getPI());        // 3.14159
// console.log(calculator.PI);             // undefined (private!)
// console.log(calculator.validateNumber); // undefined (private!)

/* ============================================================
   7. Module Caching
   ============================================================ */

/**
 * MODULE CACHING
 * --------------
 * 
 * IMPORTANT: Modules are cached after first load
 * 
 * WHAT HAPPENS:
 * 1. First require('./module') → Load & execute
 * 2. Second require('./module') → Return cached version
 * 3. Code in module runs ONLY ONCE
 * 
 * ANALOGY: Reading a book
 * - First time: Read the whole book
 * - Second time: Remember what you read
 * - Don't re-read from scratch!
 */

// ========== counter.js (example) ==========
let count = 0;

module.exports = {
  increment() {
    count++;
    return count;
  },
  
  getCount() {
    return count;
  }
};

// ========== app.js ==========
// const counter1 = require('./counter');
// const counter2 = require('./counter');

// console.log(counter1.increment()); // 1
// console.log(counter2.increment()); // 2 (same instance!)
// console.log(counter1 === counter2); // true (cached!)

/**
 * CLEARING CACHE (rarely needed):
 * delete require.cache[require.resolve('./module')];
 */

/* ============================================================
   8. CommonJS vs ES6 Modules
   ============================================================ */

/**
 * TWO MODULE SYSTEMS
 * ------------------
 * 
 * COMMONJS (Traditional Node.js):
 * ✅ Default in Node.js
 * ✅ Synchronous loading
 * ✅ Dynamic (can require anywhere)
 * ✅ Use: require() and module.exports
 * 
 * ES6 MODULES (Modern):
 * ✅ Native JavaScript modules
 * ✅ Asynchronous loading
 * ✅ Static (imports hoisted)
 * ✅ Use: import and export
 * ✅ Better for tree-shaking
 */

// ========== CommonJS ==========
// Exporting:
module.exports = { add, subtract };

// Importing:
// const math = require('./math');

// ========== ES6 Modules ==========
// Exporting:
// export const add = (a, b) => a + b;
// export default class User {}

// Importing:
// import { add } from './math.js';
// import User from './user.js';

/**
 * USING ES6 MODULES IN NODE.JS:
 * -----------------------------
 * 
 * Method 1: Use .mjs extension
 * - File: math.mjs
 * - import { add } from './math.mjs';
 * 
 * Method 2: Add to package.json
 * - "type": "module"
 * - Now all .js files are ES6 modules
 * 
 * WHICH TO USE?
 * - Learning Node.js? Start with CommonJS
 * - Modern project? Use ES6 modules
 * - Both work in Node.js 14+
 */

/**
 * ============================================================
 * Complete Module Example
 * ============================================================
 */

// ========== database.js ==========
class Database {
  constructor() {
    this.connection = null;
  }
  
  connect(connectionString) {
    console.log('Connecting to database...');
    this.connection = connectionString;
    return this;
  }
  
  query(sql) {
    if (!this.connection) {
      throw new Error('Not connected');
    }
    console.log('Executing:', sql);
    return { rows: [] };
  }
  
  close() {
    this.connection = null;
    console.log('Connection closed');
  }
}

module.exports = Database;

// ========== app.js ==========
// const Database = require('./database');
// 
// const db = new Database();
// db.connect('mongodb://localhost:27017');
// db.query('SELECT * FROM users');
// db.close();

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. Every file is a module in Node.js
 * 2. require() imports modules (synchronous)
 * 3. module.exports defines what to export
 * 4. exports is shorthand for module.exports
 * 5. Modules are cached after first load
 * 6. Built-in modules: fs, path, http, os, etc.
 * 7. Can import JSON files directly
 * 8. CommonJS is Node.js default
 * 9. Can use ES6 modules with .mjs or package.json config
 * 10. Relative paths need ./ or ../
 *
 * ============================================================
 * End of File
 * ============================================================
 */
