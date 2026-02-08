/**
 * ============================================================
 * Express.js - Node.js Web Framework Basics
 * ============================================================
 *
 * Topics covered:
 * 1. What is Express?
 * 2. Creating a basic server
 * 3. Routing (GET, POST, PUT, DELETE)
 * 4. Request and Response objects
 * 5. Middleware
 * 6. Route parameters
 * 7. Query strings
 * 8. Sending responses
 *
 * Installation: npm install express
 *
 * ============================================================
 */

/* ============================================================
   1. What is Express?
   ============================================================ */

/**
 * WHAT IS EXPRESS.JS?
 * -------------------
 * Express is a minimal and flexible Node.js web framework
 * 
 * ANALOGY: Building a house
 * - Node.js = Raw materials (wood, nails, cement)
 * - Express = Power tools (makes building easier/faster)
 * 
 * WHY EXPRESS?
 * Without Express (raw Node.js):
 * - Complex code for simple tasks
 * - Manual routing
 * - Manual request parsing
 * - More code, more bugs
 * 
 * With Express:
 * - Simple, clean syntax
 * - Built-in routing
 * - Easy request/response handling
 * - Middleware support
 * - Less code, faster development
 * 
 * WHAT CAN YOU BUILD?
 * ✅ REST APIs
 * ✅ Web applications
 * ✅ Microservices
 * ✅ Server-side rendering
 * ✅ Real-time apps (with Socket.io)
 */

const express = require('express');

/* ============================================================
   2. Creating a Basic Server
   ============================================================ */

/**
 * BASIC EXPRESS SERVER
 * --------------------
 * 
 * FLOW:
 * 1. Import express
 * 2. Create app instance
 * 3. Define routes
 * 4. Start server (listen on port)
 */

console.log("=== Basic Server ===");

// Step 1: Create Express application
const app = express();

// Step 2: Define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Step 3: Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/**
 * WHAT HAPPENS:
 * -------------
 * 1. app.listen(3000) starts server on port 3000
 * 2. Server waits for requests
 * 3. User visits http://localhost:3000
 * 4. app.get('/') matches the route
 * 5. Callback function executes
 * 6. res.send() sends response
 * 7. Browser displays "Hello World!"
 * 
 * MENTAL MODEL:
 * Express app = Restaurant
 * Routes = Menu items
 * Request = Customer order
 * Response = Serving the food
 */

/* ============================================================
   3. Routing (GET, POST, PUT, DELETE)
   ============================================================ */

console.log("=== Routing ===");

/**
 * HTTP METHODS (CRUD operations)
 * ------------------------------
 * GET    - Read/Retrieve data
 * POST   - Create new data
 * PUT    - Update/Replace data
 * PATCH  - Partial update
 * DELETE - Remove data
 * 
 * ANALOGY: Library
 * GET    = Browse and read books
 * POST   = Add new book to library
 * PUT    = Replace entire book
 * DELETE = Remove book from library
 */

// GET - Read data
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
  res.json(users);
});

// POST - Create data
app.post('/api/users', (req, res) => {
  const newUser = req.body; // Needs middleware to parse
  // Save to database
  res.status(201).json({ message: 'User created', user: newUser });
});

// PUT - Update data
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  // Update in database
  res.json({ message: 'User updated', id: userId });
});

// DELETE - Remove data
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  // Delete from database
  res.json({ message: 'User deleted', id: userId });
});

/* ============================================================
   4. Request and Response Objects
   ============================================================ */

/**
 * REQUEST OBJECT (req)
 * --------------------
 * Contains information about the HTTP request
 */

app.get('/demo', (req, res) => {
  // Request properties
  console.log('Method:', req.method);        // GET
  console.log('URL:', req.url);              // /demo
  console.log('Path:', req.path);            // /demo
  console.log('Headers:', req.headers);      // Request headers
  console.log('Query:', req.query);          // ?name=Alice
  console.log('Params:', req.params);        // /users/:id
  console.log('Body:', req.body);            // POST data
  console.log('IP:', req.ip);                // Client IP
  
  res.send('Check console for request details');
});

/**
 * RESPONSE OBJECT (res)
 * ---------------------
 * Used to send response back to client
 */

app.get('/response-examples', (req, res) => {
  // Send plain text
  // res.send('Hello');
  
  // Send JSON
  // res.json({ message: 'Success', data: [] });
  
  // Send HTML
  // res.send('<h1>Hello HTML</h1>');
  
  // Send status code
  // res.status(404).send('Not Found');
  
  // Redirect
  // res.redirect('/other-page');
  
  // Send file
  // res.sendFile('/path/to/file.html');
  
  // Set headers
  res.set('Content-Type', 'application/json');
  res.json({ demo: 'response methods' });
});

/* ============================================================
   5. Middleware
   ============================================================ */

/**
 * WHAT IS MIDDLEWARE?
 * -------------------
 * Functions that have access to req, res, and next
 * Execute in sequence before route handler
 * 
 * ANALOGY: Airport Security
 * You (request) → Check ticket (middleware 1)
 *              → Security scan (middleware 2)
 *              → Passport control (middleware 3)
 *              → Board plane (route handler)
 * 
 * Each step processes you and passes to next
 * 
 * USES:
 * ✅ Parse request body
 * ✅ Authentication/authorization
 * ✅ Logging
 * ✅ Error handling
 * ✅ CORS
 */

// Built-in middleware
app.use(express.json());        // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse form data

// Custom logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Pass to next middleware/route
});

// Authentication middleware
function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Validate token
  // ...
  
  next(); // Authenticated, continue
}

// Use middleware on specific route
app.get('/protected', requireAuth, (req, res) => {
  res.json({ message: 'Secret data' });
});

/* ============================================================
   6. Route Parameters
   ============================================================ */

/**
 * URL PARAMETERS
 * --------------
 * Dynamic parts of URL
 * Accessed via req.params
 */

// :id is a parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Fetch user from database
  res.json({ id: userId, name: 'Alice' });
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Optional parameters
app.get('/users/:id?', (req, res) => {
  if (req.params.id) {
    res.json({ id: req.params.id });
  } else {
    res.json({ message: 'All users' });
  }
});

/* ============================================================
   7. Query Strings
   ============================================================ */

/**
 * QUERY PARAMETERS
 * ----------------
 * ?key=value&key2=value2
 * Accessed via req.query
 */

// URL: /search?q=node&limit=10&page=2
app.get('/search', (req, res) => {
  const query = req.query.q;         // 'node'
  const limit = req.query.limit;     // '10'
  const page = req.query.page;       // '2'
  
  res.json({ query, limit, page });
});

// With defaults
app.get('/api/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || 'name';
  
  res.json({ page, limit, sort });
});

/* ============================================================
   8. Sending Responses
   ============================================================ */

app.get('/response-types', (req, res) => {
  // JSON response (most common for APIs)
  res.json({ message: 'Success', data: [1, 2, 3] });
});

app.get('/text', (req, res) => {
  // Plain text
  res.send('Plain text response');
});

app.get('/html', (req, res) => {
  // HTML
  res.send('<h1>HTML Response</h1><p>Paragraph</p>');
});

app.get('/status', (req, res) => {
  // Status codes
  res.status(201).json({ created: true });
  // res.sendStatus(404); // Sends "Not Found"
});

app.get('/download', (req, res) => {
  // Download file
  res.download('./file.pdf');
});

app.get('/redirect', (req, res) => {
  // Redirect
  res.redirect('/other-page');
});

/**
 * ============================================================
 * Complete REST API Example
 * ============================================================
 */

const express2 = require('express');
const app2 = express2();

app2.use(express2.json());

// In-memory data store
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET all users
app2.get('/api/users', (req, res) => {
  res.json(users);
});

// GET single user
app2.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// CREATE user
app2.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE user
app2.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  user.name = req.body.name;
  user.email = req.body.email;
  
  res.json(user);
});

// DELETE user
app2.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users.splice(index, 1);
  res.status(204).send();
});

// Start server
app2.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. Express simplifies Node.js web development
 * 2. app.get/post/put/delete for routing
 * 3. req contains request data
 * 4. res sends response
 * 5. Middleware processes requests in sequence
 * 6. express.json() parses JSON body
 * 7. Route parameters: /users/:id → req.params.id
 * 8. Query strings: ?page=1 → req.query.page
 * 9. Always handle errors (404, 500)
 * 10. Use proper HTTP status codes
 *
 * ============================================================
 * End of File
 * ============================================================
 */
