# Node.js Learning Path

> Comprehensive guide to learning Node.js from beginner to advanced

## 📚 Table of Contents

1. [Introduction](#introduction)
2. [Folder Structure](#folder-structure)
3. [Learning Path](#learning-path)
4. [Quick Reference](#quick-reference)
5. [Resources](#resources)

---

## Introduction

This repository contains comprehensive learning materials for **Node.js**, covering everything from basics to advanced topics. Each file includes:

- ✅ Clear explanations with real-world analogies
- ✅ Practical code examples
- ✅ Best practices and common pitfalls
- ✅ Hands-on exercises

---

## Folder Structure

```
NodeJS/
├── Basics/
│   ├── nodejs_introduction.js    # What is Node.js, Event Loop, Architecture
│   └── npm_packages.js            # npm, package.json, Dependencies
│
├── Modules/
│   ├── commonjs_modules.js        # require(), module.exports, Module system
│   └── filesystem_module.js       # File operations (fs module)
│
├── Express/
│   └── express_basics.js          # Web framework, Routing, Middleware
│
├── Database/
│   └── mongodb_basics.js          # MongoDB, Mongoose, CRUD operations
│
├── Authentication/
│   (Future: JWT, Passport, Sessions)
│
└── Testing/
    (Future: Jest, Mocha, Testing strategies)
```

---

## Learning Path

### 🎯 Beginner (Start Here!)

**Goal:** Understand Node.js fundamentals and setup

1. **Node.js Introduction** (`Basics/nodejs_introduction.js`)
   - What is Node.js?
   - Event Loop and Architecture
   - First Node.js program
   - Global objects and process

2. **npm Packages** (`Basics/npm_packages.js`)
   - Package management
   - package.json configuration
   - Installing and using packages
   - Semantic versioning

3. **CommonJS Modules** (`Modules/commonjs_modules.js`)
   - Module system
   - require() and module.exports
   - Creating custom modules
   - Module caching

**Practice Project:** Create a simple CLI calculator that uses modules

---

### 🚀 Intermediate

**Goal:** Build web servers and handle files

4. **File System Module** (`Modules/filesystem_module.js`)
   - Reading and writing files
   - Working with directories
   - Async vs sync operations
   - Best practices

5. **Express Basics** (`Express/express_basics.js`)
   - Creating web servers
   - Routing (GET, POST, PUT, DELETE)
   - Middleware
   - Request and response handling

**Practice Project:** Build a REST API for a todo list

---

### 💪 Advanced

**Goal:** Database integration and full-stack development

6. **MongoDB Basics** (`Database/mongodb_basics.js`)
   - NoSQL database concepts
   - Mongoose ODM
   - CRUD operations
   - Schema and models

**Practice Project:** Build a full MERN stack application (MongoDB, Express, React, Node.js)

---

## Quick Reference

### Common Commands

```bash
# Node.js
node filename.js              # Run JavaScript file
node -v                       # Check Node version
node                          # Start REPL

# npm
npm init                      # Create package.json
npm install package           # Install package
npm install                   # Install all dependencies
npm start                     # Run start script
npm run dev                   # Run dev script
npm test                      # Run tests

# Express server
npm install express           # Install Express
node app.js                   # Start server
```

### Module Patterns

```javascript
// Exporting
module.exports = function() { /* ... */ };
module.exports = { func1, func2 };
exports.something = value;

// Importing
const module = require('./module');
const { func1, func2 } = require('./module');
```

### Express Server Template

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/items', (req, res) => {
  res.json({ items: [] });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

## Resources

### Official Documentation
- [Node.js Docs](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [Mongoose Docs](https://mongoosejs.com/docs/)

### Tutorials
- [Node.js Official Guides](https://nodejs.org/en/docs/guides/)
- [freeCodeCamp Node.js Course](https://www.freecodecamp.org/learn/back-end-development-and-apis/)
- [The Net Ninja Node.js Playlist](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - MongoDB GUI
- [nodemon](https://nodemon.io/) - Auto-restart during development

---

## 📝 Study Tips

1. **Practice Every Day**: Write code daily, even if just for 30 minutes
2. **Build Projects**: Theory is important, but building solidifies learning
3. **Read Documentation**: Get comfortable reading official docs
4. **Debug Actively**: Use console.log and debugger tools
5. **Join Communities**: Stack Overflow, Reddit r/node, Discord servers

---

## 🎓 Certification Paths

- [Node.js Certification (OpenJS Foundation)](https://openjsf.org/certification/)
- [MongoDB Certified Developer](https://university.mongodb.com/certification)

---

## 🤝 Contributing

Found an error or want to add content? Feel free to contribute!

---

## License

MIT License - Feel free to use for learning purposes

---

**Happy Learning! 🚀**
