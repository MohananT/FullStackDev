/**
 * ============================================================
 * ES6 Modules - Modern JavaScript Module System
 * ============================================================
 *
 * Topics covered:
 * 1. What are ES6 Modules?
 * 2. Import and Export
 * 3. Named exports
 * 4. Default exports
 * 5. Import syntax variations
 * 6. Dynamic imports
 * 7. ES6 vs CommonJS
 * 8. Best practices
 *
 * ============================================================
 */

/* ============================================================
   1. What are ES6 Modules?
   ============================================================ */

/**
 * ES6 MODULES
 * -----------
 * Modern JavaScript module system (ECMAScript Modules - ESM)
 * 
 * ANALOGY: Library books
 * - Each file = A book
 * - export = Making book available to borrow
 * - import = Borrowing book from library
 * - Only share what you want (not entire book)
 * 
 * WHY ES6 MODULES?
 * ✅ Native JavaScript (no build tool needed)
 * ✅ Static analysis (tree-shaking)
 * ✅ Better tooling support
 * ✅ Cleaner syntax
 * ✅ Async loading
 * ✅ Browser support (modern)
 * 
 * VS CommonJS:
 * CommonJS: require() and module.exports (Node.js)
 * ES6: import and export (Modern JavaScript)
 */

/* ============================================================
   2. Import and Export Basics
   ============================================================ */

/**
 * EXPORT SYNTAX
 * -------------
 * Share code from a module
 */

// ========== math.js (example file) ==========

// Export individual items
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

/**
 * IMPORT SYNTAX
 * -------------
 * Use code from another module
 */

// ========== app.js (example file) ==========

// Import specific items
// import { add, subtract, PI } from './math.js';

// console.log(add(5, 3));        // 8
// console.log(PI);               // 3.14159

/* ============================================================
   3. Named Exports
   ============================================================ */

/**
 * NAMED EXPORTS
 * -------------
 * Export multiple items with specific names
 * Must import with exact same names (or rename)
 */

// ========== utils.js ==========

// Pattern 1: Export as you declare
export const API_URL = 'https://api.example.com';
export const TIMEOUT = 5000;

export function fetchData(url) {
  return fetch(url);
}

export class User {
  constructor(name) {
    this.name = name;
  }
}

// Pattern 2: Declare first, export later
const version = '1.0.0';
const author = 'Alice';

function formatDate(date) {
  return date.toISOString();
}

// Export at the end
export { version, author, formatDate };

/**
 * IMPORTING NAMED EXPORTS
 */

// Import specific items
// import { fetchData, User, API_URL } from './utils.js';

// Import with rename (alias)
// import { fetchData as getData } from './utils.js';

// Import all as namespace
// import * as Utils from './utils.js';
// Utils.fetchData();
// Utils.API_URL;

/* ============================================================
   4. Default Exports
   ============================================================ */

/**
 * DEFAULT EXPORT
 * --------------
 * One main export per module
 * Can import with any name
 */

// ========== calculator.js ==========

// Pattern 1: Default export inline
export default function calculator(a, b, operation) {
  switch(operation) {
    case 'add': return a + b;
    case 'subtract': return a - b;
    case 'multiply': return a * b;
    case 'divide': return a / b;
    default: return 0;
  }
}

// Pattern 2: Default export class
// export default class Calculator {
//   add(a, b) { return a + b; }
//   subtract(a, b) { return a - b; }
// }

// Pattern 3: Default export object
// const calculator = {
//   add: (a, b) => a + b,
//   subtract: (a, b) => a - b
// };
// export default calculator;

/**
 * IMPORTING DEFAULT EXPORTS
 */

// Import with any name (no curly braces)
// import calc from './calculator.js';
// import myCalculator from './calculator.js';  // Same thing!

// console.log(calc(5, 3, 'add'));  // 8

/**
 * MIXING DEFAULT & NAMED EXPORTS
 */

// ========== module.js ==========
export const version = '1.0.0';
export const name = 'MyModule';

export default function main() {
  console.log('Main function');
}

// Import both
// import main, { version, name } from './module.js';

/* ============================================================
   5. Import Syntax Variations
   ============================================================ */

/**
 * IMPORT PATTERNS
 * ---------------
 */

// 1. Named imports
// import { func1, func2 } from './module.js';

// 2. Default import
// import MyComponent from './MyComponent.js';

// 3. Mixed
// import React, { useState, useEffect } from 'react';

// 4. Rename on import
// import { longFunctionName as fn } from './module.js';

// 5. Import all as namespace
// import * as Utils from './utils.js';
// Utils.function1();

// 6. Import for side effects only (no imports)
// import './styles.css';
// import './polyfills.js';

// 7. Re-export
// export { func1, func2 } from './other.js';
// export * from './everything.js';

/* ============================================================
   6. Dynamic Imports
   ============================================================ */

/**
 * DYNAMIC IMPORTS
 * ---------------
 * Load modules on demand (lazy loading)
 * Returns a Promise
 */

// Load module conditionally
async function loadModule() {
  if (condition) {
    // Only load when needed
    const module = await import('./heavy-module.js');
    module.doSomething();
  }
}

// Load on user action
async function handleClick() {
  const { animate } = await import('./animations.js');
  animate();
}

// Route-based loading
async function loadRoute(route) {
  switch(route) {
    case '/home':
      const home = await import('./pages/Home.js');
      return home.default;
    case '/about':
      const about = await import('./pages/About.js');
      return about.default;
  }
}

/**
 * USE CASES:
 * - Code splitting (reduce initial bundle size)
 * - Conditional features
 * - Route-based loading
 * - Load heavy libraries only when needed
 */

/* ============================================================
   7. ES6 vs CommonJS
   ============================================================ */

/**
 * COMPARISON: ES6 MODULES vs COMMONJS
 * ------------------------------------
 */

// ========== CommonJS (Node.js) ==========
// Exporting:
// module.exports = { func1, func2 };
// exports.func1 = function() {};

// Importing:
// const module = require('./module');
// const { func1 } = require('./module');

// ========== ES6 Modules ==========
// Exporting:
// export const func1 = () => {};
// export default func1;

// Importing:
// import { func1 } from './module.js';
// import func1 from './module.js';

/**
 * KEY DIFFERENCES:
 * ----------------
 * 
 * 1. SYNTAX:
 * CommonJS: require() / module.exports
 * ES6: import / export
 * 
 * 2. LOADING:
 * CommonJS: Synchronous (blocking)
 * ES6: Asynchronous (non-blocking)
 * 
 * 3. WHEN EXECUTED:
 * CommonJS: Runtime
 * ES6: Parse time (static)
 * 
 * 4. TREE SHAKING:
 * CommonJS: Not supported
 * ES6: Supported (remove unused code)
 * 
 * 5. DYNAMIC:
 * CommonJS: Can require() anywhere
 * ES6: Must import at top (except dynamic import)
 * 
 * 6. THIS VALUE:
 * CommonJS: exports object
 * ES6: undefined
 * 
 * 7. BROWSER:
 * CommonJS: Needs bundler
 * ES6: Native support (modern browsers)
 */

/* ============================================================
   8. Best Practices
   ============================================================ */

/**
 * BEST PRACTICES
 * --------------
 */

// ✅ 1. Always use .js extension in imports
// import { func } from './module.js';  // Good
// import { func } from './module';     // May not work in browser

// ✅ 2. One default export per file (if needed)
// export default class MyClass {}

// ✅ 3. Named exports for utilities
// export const util1 = () => {};
// export const util2 = () => {};

// ✅ 4. Group related exports
// export { func1, func2, func3 };

// ✅ 5. Use index files for cleaner imports
// ========== components/index.js ==========
// export { Button } from './Button.js';
// export { Input } from './Input.js';
// export { Card } from './Card.js';

// ========== app.js ==========
// import { Button, Input, Card } from './components/index.js';

// ✅ 6. Dynamic imports for large modules
// const module = await import('./large-library.js');

// ✅ 7. Avoid circular dependencies
// File A imports B, B imports A → BAD!

// ✅ 8. Import order convention
// 1. External libraries (node_modules)
// import React from 'react';
// import axios from 'axios';

// 2. Internal absolute imports
// import { API } from '@/services/api';

// 3. Relative imports
// import { helper } from './utils';
// import './styles.css';

/**
 * ============================================================
 * Complete Examples
 * ============================================================
 */

// ========== user.js ==========
export class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  greet() {
    return `Hello, ${this.name}!`;
  }
}

export function validateEmail(email) {
  return email.includes('@');
}

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
};

// ========== api.js ==========
const API_BASE = 'https://api.example.com';

async function get(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`);
  return response.json();
}

async function post(endpoint, data) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

export default { get, post };

// ========== app.js ==========
// import API from './api.js';
// import { User, validateEmail, USER_ROLES } from './user.js';

// async function main() {
//   const userData = await API.get('/users/1');
//   const user = new User(userData.name, userData.email);
//   
//   if (validateEmail(user.email)) {
//     console.log(user.greet());
//   }
// }

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. ES6 modules are the modern standard
 * 2. export shares code, import uses it
 * 3. Named exports for multiple items
 * 4. Default export for main item
 * 5. Import with {} for named, without for default
 * 6. Dynamic import for lazy loading
 * 7. Static analysis enables tree-shaking
 * 8. Use .js extension in browsers
 * 9. ES6 modules are async, CommonJS is sync
 * 10. Supported in all modern environments
 *
 * ============================================================
 * End of File
 * ============================================================
 */
