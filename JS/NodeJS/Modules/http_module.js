/**
 * ============================================================
 * Node.js HTTP Module - Creating Web Servers
 * ============================================================
 *
 * Topics covered:
 * 1. What is HTTP module?
 * 2. Creating a basic server
 * 3. Handling requests
 * 4. Sending responses
 * 5. Routing
 * 6. Serving files
 * 7. HTTP methods
 * 8. Status codes
 *
 * ============================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

/* ============================================================
   1. What is HTTP Module?
   ============================================================ */

/**
 * HTTP MODULE
 * -----------
 * Built-in Node.js module for creating web servers
 * 
 * ANALOGY: Restaurant
 * - Server = Restaurant building
 * - Request = Customer order
 * - Response = Serving food
 * - Route = Different menu items
 * 
 * WHY HTTP MODULE?
 * ✅ No external dependencies
 * ✅ Full control over server
 * ✅ Lightweight
 * ✅ Foundation for frameworks (Express built on this)
 * 
 * NOTE: For production, use Express.js
 * HTTP module is lower-level but good to understand
 */

/* ============================================================
   2. Creating a Basic Server
   ============================================================ */

/**
 * BASIC SERVER
 * ------------
 * Simplest possible web server
 */

console.log("=== Creating Basic Server ===");

// Create server
const server1 = http.createServer((req, res) => {
  // This function runs for EVERY request
  console.log('Request received!');
  
  // Send response
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!');
});

// Start server
const PORT1 = 3000;
// server1.listen(PORT1, () => {
//   console.log(`Server running at http://localhost:${PORT1}/`);
// });

/**
 * WHAT HAPPENS:
 * 1. createServer() creates server
 * 2. Callback function handles each request
 * 3. listen() starts server on port 3000
 * 4. Visit http://localhost:3000 in browser
 * 5. See "Hello World!"
 */

/* ============================================================
   3. Handling Requests
   ============================================================ */

/**
 * REQUEST OBJECT (req)
 * --------------------
 * Contains all information about incoming request
 */

const server2 = http.createServer((req, res) => {
  console.log("=== Request Object ===");
  
  // Request URL
  console.log('URL:', req.url);
  // Examples: /, /about, /products?id=5
  
  // HTTP Method
  console.log('Method:', req.method);
  // GET, POST, PUT, DELETE, etc.
  
  // Headers
  console.log('Headers:', req.headers);
  // user-agent, accept, cookie, etc.
  
  // Host
  console.log('Host:', req.headers.host);
  // localhost:3000
  
  res.end('Check console for request details');
});

/* ============================================================
   4. Sending Responses
   ============================================================ */

/**
 * RESPONSE OBJECT (res)
 * ---------------------
 * Used to send data back to client
 */

const server3 = http.createServer((req, res) => {
  console.log("=== Response Object ===");
  
  // Set status code
  res.statusCode = 200;  // OK
  
  // Set headers
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Custom-Header', 'MyValue');
  
  // Send response body
  res.write('<h1>Hello!</h1>');
  res.write('<p>This is a response</p>');
  
  // End response (required!)
  res.end();
});

/**
 * RESPONSE METHODS:
 * ----------------
 * res.statusCode = 200
 * res.setHeader(name, value)
 * res.write(data)  - Send chunk of data
 * res.end(data)    - End response (optionally send data)
 * res.writeHead(statusCode, headers)  - Shorthand
 */

/* ============================================================
   5. Routing
   ============================================================ */

/**
 * BASIC ROUTING
 * -------------
 * Respond differently based on URL
 */

const server4 = http.createServer((req, res) => {
  console.log("=== Routing ===");
  
  const url = req.url;
  const method = req.method;
  
  // Set common headers
  res.setHeader('Content-Type', 'text/html');
  
  // Route handling
  if (url === '/' && method === 'GET') {
    res.statusCode = 200;
    res.end('<h1>Home Page</h1><a href="/about">About</a>');
    
  } else if (url === '/about' && method === 'GET') {
    res.statusCode = 200;
    res.end('<h1>About Page</h1><a href="/">Home</a>');
    
  } else if (url === '/api/data' && method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'API data', items: [1, 2, 3] }));
    
  } else {
    // 404 Not Found
    res.statusCode = 404;
    res.end('<h1>404 - Page Not Found</h1>');
  }
});

/* ============================================================
   6. Serving Files
   ============================================================ */

/**
 * SERVING STATIC FILES
 * --------------------
 * Read and send HTML, CSS, JS files
 */

const server5 = http.createServer((req, res) => {
  console.log("=== Serving Files ===");
  
  // Get file path
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  
  // Get file extension
  const extname = path.extname(filePath);
  
  // Set content type based on file extension
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }
  
  // Read and send file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>');
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

/* ============================================================
   7. HTTP Methods
   ============================================================ */

/**
 * HANDLING DIFFERENT METHODS
 * --------------------------
 * GET, POST, PUT, DELETE, etc.
 */

const server6 = http.createServer((req, res) => {
  console.log("=== HTTP Methods ===");
  
  const { method, url } = req;
  
  if (url === '/api/users') {
    if (method === 'GET') {
      // Read - Get all users
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ users: ['Alice', 'Bob'] }));
      
    } else if (method === 'POST') {
      // Create - Add new user
      let body = '';
      
      // Collect data chunks
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      // When all data received
      req.on('end', () => {
        const newUser = JSON.parse(body);
        console.log('New user:', newUser);
        
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User created', user: newUser }));
      });
      
    } else if (method === 'PUT') {
      // Update - Modify user
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User updated' }));
      
    } else if (method === 'DELETE') {
      // Delete - Remove user
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User deleted' }));
      
    } else {
      // Method not allowed
      res.writeHead(405);
      res.end('Method Not Allowed');
    }
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

/* ============================================================
   8. Status Codes
   ============================================================ */

/**
 * HTTP STATUS CODES
 * -----------------
 * Numbers indicating response status
 */

const server7 = http.createServer((req, res) => {
  console.log("=== Status Codes ===");
  
  const { url } = req;
  
  if (url === '/ok') {
    // 200 - OK (Success)
    res.writeHead(200);
    res.end('Success!');
    
  } else if (url === '/created') {
    // 201 - Created (Resource created)
    res.writeHead(201);
    res.end('Resource created');
    
  } else if (url === '/redirect') {
    // 302 - Found (Temporary redirect)
    res.writeHead(302, { 'Location': '/' });
    res.end();
    
  } else if (url === '/bad-request') {
    // 400 - Bad Request (Client error)
    res.writeHead(400);
    res.end('Bad Request');
    
  } else if (url === '/unauthorized') {
    // 401 - Unauthorized (Authentication required)
    res.writeHead(401);
    res.end('Unauthorized');
    
  } else if (url === '/forbidden') {
    // 403 - Forbidden (No permission)
    res.writeHead(403);
    res.end('Forbidden');
    
  } else if (url === '/not-found') {
    // 404 - Not Found
    res.writeHead(404);
    res.end('Not Found');
    
  } else if (url === '/error') {
    // 500 - Internal Server Error
    res.writeHead(500);
    res.end('Server Error');
    
  } else {
    res.writeHead(404);
    res.end('Unknown route');
  }
});

/**
 * COMMON STATUS CODES:
 * --------------------
 * 2xx - Success
 *   200 OK
 *   201 Created
 *   204 No Content
 * 
 * 3xx - Redirection
 *   301 Moved Permanently
 *   302 Found (Temporary redirect)
 *   304 Not Modified
 * 
 * 4xx - Client Errors
 *   400 Bad Request
 *   401 Unauthorized
 *   403 Forbidden
 *   404 Not Found
 *   405 Method Not Allowed
 * 
 * 5xx - Server Errors
 *   500 Internal Server Error
 *   502 Bad Gateway
 *   503 Service Unavailable
 */

/**
 * ============================================================
 * Complete Example: Simple REST API
 * ============================================================
 */

// In-memory data store
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

const apiServer = http.createServer((req, res) => {
  const { method, url } = req;
  
  // CORS headers (allow cross-origin requests)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight request
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Set JSON content type
  res.setHeader('Content-Type', 'application/json');
  
  // Routes
  if (url === '/api/users' && method === 'GET') {
    // GET all users
    res.writeHead(200);
    res.end(JSON.stringify(users));
    
  } else if (url.match(/\/api\/users\/\d+/) && method === 'GET') {
    // GET single user
    const id = parseInt(url.split('/')[3]);
    const user = users.find(u => u.id === id);
    
    if (user) {
      res.writeHead(200);
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'User not found' }));
    }
    
  } else if (url === '/api/users' && method === 'POST') {
    // CREATE user
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const newUser = JSON.parse(body);
        newUser.id = users.length + 1;
        users.push(newUser);
        
        res.writeHead(201);
        res.end(JSON.stringify(newUser));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    
  } else if (url.match(/\/api\/users\/\d+/) && method === 'DELETE') {
    // DELETE user
    const id = parseInt(url.split('/')[3]);
    const index = users.findIndex(u => u.id === id);
    
    if (index !== -1) {
      users.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'User not found' }));
    }
    
  } else {
    // 404 Not Found
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

// Start server
const API_PORT = 3001;
apiServer.listen(API_PORT, () => {
  console.log(`API Server running at http://localhost:${API_PORT}/`);
  console.log(`Try: http://localhost:${API_PORT}/api/users`);
});

/**
 * TEST WITH CURL:
 * ---------------
 * 
 * # Get all users
 * curl http://localhost:3001/api/users
 * 
 * # Get single user
 * curl http://localhost:3001/api/users/1
 * 
 * # Create user
 * curl -X POST http://localhost:3001/api/users \
 *   -H "Content-Type: application/json" \
 *   -d '{"name":"Charlie","email":"charlie@example.com"}'
 * 
 * # Delete user
 * curl -X DELETE http://localhost:3001/api/users/1
 */

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. http.createServer() creates web server
 * 2. Request object (req) has url, method, headers
 * 3. Response object (res) sends data back
 * 4. res.end() finalizes response (required!)
 * 5. Route by checking req.url and req.method
 * 6. Set status code with res.statusCode
 * 7. Set headers with res.setHeader()
 * 8. For POST data, collect req.on('data') chunks
 * 9. Serve static files with fs.readFile()
 * 10. Use Express for production (built on HTTP module)
 *
 * ============================================================
 * End of File
 * ============================================================
 */
