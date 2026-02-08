/**
 * ============================================================
 * Fetch API - HTTP Requests in JavaScript
 * ============================================================
 *
 * Topics covered:
 * 1. Fetch API basics
 * 2. GET requests
 * 3. POST requests
 * 4. PUT & PATCH requests
 * 5. DELETE requests
 * 6. Request configuration
 *
 * ============================================================
 */

/* ============================================================
   1. Fetch API Basics
   ============================================================ */

/**
 * WHAT IS THE FETCH API?
 * -----------------------
 * fetch() is JavaScript's modern way to make HTTP requests
 * Think of it as: "Hey browser, go get this data from the internet"
 * 
 * REAL-WORLD ANALOGY:
 * fetch() is like ordering food delivery:
 * 1. You place order (fetch request)
 * 2. Get confirmation number (Promise)
 * 3. Wait for delivery (async operation)
 * 4. Receive food (response)
 * 5. Unpack and eat (parse JSON)
 * 
 * WHY USE FETCH?
 * - Get data from APIs (weather, user info, posts)
 * - Send data to servers (create account, submit form)
 * - Update data (edit profile, like post)
 * - Delete data (remove comment, delete account)
 * 
 * OLD WAY vs NEW WAY:
 * ❌ Old: XMLHttpRequest (verbose, callback-based, ugly)
 * ✅ New: fetch() (clean, Promise-based, modern)
 * 
 * KEY CHARACTERISTICS:
 * ✅ Returns a Promise (async by nature)
 * ✅ Two-step process: get response → parse data
 * ✅ Promise-based (use .then() or async/await)
 * ✅ Built into browsers (no library needed)
 * 
 * IMPORTANT GOTCHA:
 * fetch() only rejects on NETWORK errors (no internet)
 * HTTP errors (404, 500) don't reject! Must check response.ok
 */

console.log("=== Fetch API Basics ===");

/**
 * BASIC STRUCTURE (Two-Step Process)
 * -----------------------------------
 * 
 * Step 1: fetch(url) → Returns Promise<Response>
 * Step 2: response.json() → Returns Promise<Data>
 * 
 * WHY TWO STEPS?
 * - First: Browser fetches the raw response (headers + body)
 * - Second: We parse the body (convert to JavaScript object)
 * 
 * EXAMPLE FLOW:
 */

// fetch(url, options)                    // 1. Send request
//   .then(response => response.json())   // 2. Parse JSON
//   .then(data => console.log(data))     // 3. Use data
//   .catch(error => console.error(error)); // 4. Handle errors

/**
 * STEP-BY-STEP BREAKDOWN:
 * ------------------------
 * 
 * fetch('https://api.example.com/users')
 *   ↓
 * Browser sends HTTP GET request to server
 *   ↓
 * Server processes request and sends back response
 *   ↓
 * fetch() returns Promise<Response>
 *   ↓
 * .then(response => ...)
 *   ↓
 * We have Response object (headers, status, body)
 *   ↓
 * response.json()
 *   ↓
 * Parse body as JSON, returns Promise<Data>
 *   ↓
 * .then(data => ...)
 *   ↓
 * We have actual JavaScript data (object/array)
 *   ↓
 * Use the data!
 */

/* ============================================================
   2. GET Requests
   ============================================================ */

console.log("=== GET Requests ===");

// Basic GET request (default method)
async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // Check if request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    console.log(users);
    return users;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// With .then() syntax
function getUsersWithThen() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
}

// GET with URL parameters
async function searchUsers(query) {
  const url = new URL("https://api.example.com/search");
  url.searchParams.append("q", query);
  url.searchParams.append("limit", "10");

  const response = await fetch(url);
  return await response.json();
}

// GET single resource
async function getUserById(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await response.json();
  return user;
}

/* ============================================================
   3. POST Requests
   ============================================================ */

console.log("=== POST Requests ===");

// Create new resource
async function createUser(userData) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newUser = await response.json();
    console.log("Created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Create error:", error);
  }
}

// Example usage
const newUser = {
  name: "John Doe",
  email: "john@example.com",
  age: 30
};

// createUser(newUser);

// POST with form data
async function submitForm(formElement) {
  const formData = new FormData(formElement);

  const response = await fetch("https://api.example.com/submit", {
    method: "POST",
    body: formData // no need to stringify FormData
  });

  return await response.json();
}

/* ============================================================
   4. PUT & PATCH Requests
   ============================================================ */

console.log("=== PUT & PATCH ===");

// PUT - replace entire resource
async function updateUser(id, userData) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// PATCH - update partial resource
async function patchUser(id, updates) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Example usage
// updateUser(1, { name: "Jane", email: "jane@example.com" });
// patchUser(1, { email: "newemail@example.com" });

/* ============================================================
   5. DELETE Requests
   ============================================================ */

console.log("=== DELETE Requests ===");

// Delete resource
async function deleteUser(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("User deleted successfully");
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}

// deleteUser(1);

/* ============================================================
   6. Request Configuration
   ============================================================ */

console.log("=== Request Configuration ===");

// Complete fetch configuration
async function makeRequest(url, data = null) {
  const config = {
    method: data ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    // Include credentials (cookies)
    credentials: "include",
    // Cache mode
    cache: "no-cache",
    // Redirect handling
    redirect: "follow"
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);
  return await response.json();
}

// Abort request (timeout)
async function fetchWithAbort(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request was aborted");
    }
    throw error;
  }
}

/**
 * ============================================================
 * Common Patterns
 * ============================================================
 */

// Pattern 1: Reusable API client
class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  }

  async get(endpoint) {
    return this.request(endpoint);
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: "DELETE"
    });
  }
}

// Usage
const api = new ApiClient("https://jsonplaceholder.typicode.com");

// api.get("/users").then(users => console.log(users));
// api.post("/users", { name: "John" });

/**
 * ============================================================
 * End of File
 * ============================================================
 */
