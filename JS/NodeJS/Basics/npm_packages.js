/**
 * ============================================================
 * npm (Node Package Manager) - Managing Packages
 * ============================================================
 *
 * Topics covered:
 * 1. What is npm?
 * 2. package.json
 * 3. Installing packages
 * 4. Package versions (semver)
 * 5. Dependencies vs devDependencies
 * 6. npm scripts
 * 7. Common commands
 * 8. Popular packages
 *
 * ============================================================
 */

/* ============================================================
   1. What is npm?
   ============================================================ */

/**
 * WHAT IS npm?
 * ------------
 * npm = Node Package Manager
 * 
 * TWO THINGS:
 * 1. Registry: Online repository of packages (npmjs.com)
 * 2. CLI tool: Command-line tool to manage packages
 * 
 * REAL-WORLD ANALOGY:
 * npm = App Store for Node.js
 * - Browse millions of packages
 * - Download and install with one command
 * - Update easily
 * - Share your own packages
 * 
 * WHY npm?
 * ✅ Reuse code (don't reinvent the wheel)
 * ✅ Millions of packages available
 * ✅ Easy to install and update
 * ✅ Manage dependencies automatically
 * ✅ Version control
 * 
 * ALTERNATIVES:
 * - Yarn (Facebook)
 * - pnpm (fast, efficient)
 * 
 * COMES WITH NODE.JS:
 * Installing Node.js also installs npm
 * Check version: npm --version
 */

/* ============================================================
   2. package.json
   ============================================================ */

/**
 * WHAT IS package.json?
 * ---------------------
 * Configuration file for your Node.js project
 * 
 * ANALOGY: Recipe card
 * - Project name
 * - Ingredients (dependencies)
 * - Instructions (scripts)
 * - Author info
 * 
 * CREATING package.json:
 * ----------------------
 * 
 * Method 1: Interactive (asks questions)
 * npm init
 * 
 * Method 2: Default values
 * npm init -y
 * 
 * WHAT IT CONTAINS:
 * -----------------
 */

/**
 * EXAMPLE package.json:
 * 
 * {
 *   "name": "my-app",
 *   "version": "1.0.0",
 *   "description": "My awesome app",
 *   "main": "index.js",
 *   "scripts": {
 *     "start": "node index.js",
 *     "dev": "nodemon index.js",
 *     "test": "jest"
 *   },
 *   "keywords": ["web", "api"],
 *   "author": "Your Name",
 *   "license": "MIT",
 *   "dependencies": {
 *     "express": "^4.18.2",
 *     "mongoose": "^7.5.0"
 *   },
 *   "devDependencies": {
 *     "nodemon": "^3.0.1",
 *     "jest": "^29.6.4"
 *   }
 * }
 */

/**
 * KEY FIELDS:
 * -----------
 * name: Package name (required)
 * version: Current version (required)
 * description: What it does
 * main: Entry point file
 * scripts: Commands you can run
 * dependencies: Packages needed in production
 * devDependencies: Packages needed only for development
 * keywords: Search terms
 * author: Creator
 * license: License type (MIT, ISC, etc.)
 */

/* ============================================================
   3. Installing Packages
   ============================================================ */

console.log("=== Installing Packages ===");

/**
 * INSTALL COMMANDS:
 * -----------------
 * 
 * Install single package:
 * npm install express
 * npm i express           (shorthand)
 * 
 * Install multiple packages:
 * npm install express mongoose axios
 * 
 * Install specific version:
 * npm install express@4.18.0
 * 
 * Install globally (available everywhere):
 * npm install -g nodemon
 * 
 * Install as devDependency:
 * npm install --save-dev jest
 * npm install -D jest     (shorthand)
 * 
 * Install from package.json:
 * npm install
 * (Installs all dependencies listed)
 * 
 * WHAT HAPPENS:
 * -------------
 * 1. Downloads package from npmjs.com
 * 2. Saves to node_modules/ folder
 * 3. Updates package.json
 * 4. Creates/updates package-lock.json
 */

/**
 * EXAMPLE:
 * --------
 * 
 * $ npm install express
 * 
 * Result:
 * - node_modules/express/  (package code)
 * - package.json updated:
 *   "dependencies": {
 *     "express": "^4.18.2"
 *   }
 * - package-lock.json created/updated
 */

/* ============================================================
   4. Package Versions (Semantic Versioning)
   ============================================================ */

/**
 * SEMANTIC VERSIONING (semver)
 * ----------------------------
 * Format: MAJOR.MINOR.PATCH
 * Example: 4.18.2
 * 
 * MAJOR (4):
 * - Breaking changes
 * - Not backward compatible
 * - Example: 3.0.0 → 4.0.0
 * 
 * MINOR (18):
 * - New features
 * - Backward compatible
 * - Example: 4.17.0 → 4.18.0
 * 
 * PATCH (2):
 * - Bug fixes
 * - Backward compatible
 * - Example: 4.18.1 → 4.18.2
 * 
 * VERSION SYMBOLS:
 * ----------------
 * 
 * ^4.18.2  (Caret - default)
 * - Allow minor and patch updates
 * - 4.18.2, 4.19.0, 4.20.5 ✅
 * - 5.0.0 ❌ (major change)
 * 
 * ~4.18.2  (Tilde)
 * - Allow only patch updates
 * - 4.18.2, 4.18.3 ✅
 * - 4.19.0 ❌ (minor change)
 * 
 * 4.18.2   (Exact)
 * - Only this exact version
 * - 4.18.2 ✅
 * - 4.18.3 ❌
 * 
 * *        (Wildcard)
 * - Any version (not recommended)
 * 
 * >=4.18.2
 * - Greater than or equal
 * 
 * 4.18.x   (x wildcard)
 * - Any patch version
 */

/**
 * EXAMPLES:
 * ---------
 * "express": "^4.18.2"
 * npm update → may install 4.19.0
 * 
 * "express": "~4.18.2"
 * npm update → may install 4.18.5
 * 
 * "express": "4.18.2"
 * npm update → stays at 4.18.2
 */

/* ============================================================
   5. Dependencies vs devDependencies
   ============================================================ */

/**
 * DEPENDENCIES vs devDependencies
 * --------------------------------
 * 
 * DEPENDENCIES:
 * - Needed in production
 * - Code that runs on server
 * - Examples: express, mongoose, axios
 * - Install: npm install package
 * 
 * devDependencies:
 * - Needed only for development
 * - Testing, building, debugging tools
 * - Examples: nodemon, jest, eslint
 * - Install: npm install -D package
 * 
 * ANALOGY:
 * Building a house:
 * - Dependencies = Materials (wood, cement)
 * - devDependencies = Tools (hammer, drill)
 *   Tools not needed after house is built
 */

/**
 * EXAMPLE:
 * 
 * {
 *   "dependencies": {
 *     "express": "^4.18.2",      // Server framework
 *     "mongoose": "^7.5.0",      // Database
 *     "axios": "^1.5.0"          // HTTP client
 *   },
 *   "devDependencies": {
 *     "nodemon": "^3.0.1",       // Auto-restart
 *     "jest": "^29.6.4",         // Testing
 *     "eslint": "^8.50.0"        // Linting
 *   }
 * }
 */

/**
 * INSTALLING IN PRODUCTION:
 * npm install --production
 * (Installs only dependencies, skips devDependencies)
 */

/* ============================================================
   6. npm Scripts
   ============================================================ */

/**
 * npm SCRIPTS
 * -----------
 * Custom commands defined in package.json
 * 
 * ANALOGY: Shortcuts
 * Instead of typing long commands, define shortcuts
 */

/**
 * EXAMPLE package.json:
 * 
 * {
 *   "scripts": {
 *     "start": "node index.js",
 *     "dev": "nodemon index.js",
 *     "test": "jest",
 *     "build": "webpack",
 *     "lint": "eslint .",
 *     "format": "prettier --write ."
 *   }
 * }
 * 
 * RUNNING SCRIPTS:
 * ----------------
 * npm start         (special: no 'run' needed)
 * npm test          (special: no 'run' needed)
 * npm run dev
 * npm run build
 * npm run lint
 * 
 * COMMON SCRIPTS:
 * ---------------
 * start:  Start production server
 * dev:    Start development server
 * test:   Run tests
 * build:  Build for production
 * lint:   Check code quality
 */

/* ============================================================
   7. Common Commands
   ============================================================ */

/**
 * ESSENTIAL npm COMMANDS:
 * -----------------------
 * 
 * INITIALIZE:
 * npm init                 Create package.json
 * npm init -y              Create with defaults
 * 
 * INSTALL:
 * npm install              Install all dependencies
 * npm install express      Install package
 * npm install -D jest      Install as devDependency
 * npm install -g pm2       Install globally
 * 
 * UNINSTALL:
 * npm uninstall express    Remove package
 * npm uninstall -g pm2     Remove global package
 * 
 * UPDATE:
 * npm update               Update all packages
 * npm update express       Update specific package
 * npm outdated             Check for outdated packages
 * 
 * INFO:
 * npm list                 List installed packages
 * npm list -g              List global packages
 * npm view express         View package info
 * npm search express       Search for packages
 * 
 * AUDIT:
 * npm audit                Check for vulnerabilities
 * npm audit fix            Fix vulnerabilities
 * 
 * CLEAN:
 * rm -rf node_modules      Delete node_modules
 * npm install              Reinstall all
 * 
 * OTHER:
 * npm run <script>         Run custom script
 * npm test                 Run tests
 * npm start                Start app
 */

/* ============================================================
   8. Popular Packages
   ============================================================ */

/**
 * POPULAR npm PACKAGES
 * --------------------
 */

// WEB FRAMEWORKS
// express - Fast, minimalist web framework
// npm install express

// DATABASE
// mongoose - MongoDB object modeling
// npm install mongoose

// HTTP CLIENT
// axios - Promise-based HTTP client
// npm install axios

// UTILITIES
// lodash - Utility functions
// npm install lodash

// DATE/TIME
// date-fns - Modern date utility
// npm install date-fns

// VALIDATION
// joi - Schema validation
// npm install joi

// AUTHENTICATION
// jsonwebtoken - JWT tokens
// npm install jsonwebtoken
// bcrypt - Password hashing
// npm install bcrypt

// ENVIRONMENT
// dotenv - Load environment variables
// npm install dotenv

// TESTING
// jest - Testing framework
// npm install -D jest

// DEVELOPMENT
// nodemon - Auto-restart server
// npm install -D nodemon

// CODE QUALITY
// eslint - JavaScript linter
// npm install -D eslint
// prettier - Code formatter
// npm install -D prettier

/**
 * EXAMPLE USAGE:
 * --------------
 */

// Express server
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);

// Axios HTTP request
const axios = require('axios');

async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Lodash utilities
const _ = require('lodash');

const numbers = [1, 2, 3, 4, 5];
const sum = _.sum(numbers);
const unique = _.uniq([1, 2, 2, 3, 3, 3]);

// Dotenv (load .env file)
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. npm = Node Package Manager
 * 2. package.json = project configuration
 * 3. npm install = download packages
 * 4. node_modules/ = installed packages
 * 5. Semantic versioning: MAJOR.MINOR.PATCH
 * 6. ^ allows minor/patch updates
 * 7. dependencies = production code
 * 8. devDependencies = development tools
 * 9. npm scripts = custom commands
 * 10. Millions of packages available
 *
 * ============================================================
 * End of File
 * ============================================================
 */
