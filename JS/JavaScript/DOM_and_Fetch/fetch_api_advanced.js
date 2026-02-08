/**
 * ============================================================
 * Fetch API - Advanced Topics
 * ============================================================
 *
 * Topics covered:
 * 1. Request headers
 * 2. Response properties
 * 3. Error handling
 * 4. Retry logic
 * 5. Parallel requests
 * 6. File uploads
 * 7. Real-world patterns
 *
 * ============================================================
 */

/* ============================================================
   1. Request Headers
   ============================================================ */

console.log("=== Request Headers ===");

// Common headers
async function fetchWithHeaders() {
  const response = await fetch("https://api.example.com/data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer your-token-here",
      "Accept": "application/json",
      "User-Agent": "MyApp/1.0",
      "X-Custom-Header": "value"
    }
  });

  return await response.json();
}

// Using Headers object
const headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Authorization", "Bearer token");
headers.append("Accept", "application/json");

async function fetchWithHeadersObject() {
  const response = await fetch("https://api.example.com/data", {
    headers: headers
  });

  return await response.json();
}

// Dynamic headers (authentication)
function getAuthHeaders() {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

async function authenticatedRequest(url) {
  const response = await fetch(url, {
    headers: getAuthHeaders()
  });

  return await response.json();
}

/* ============================================================
   2. Response Properties
   ============================================================ */

console.log("=== Response Properties ===");

async function inspectResponse(url) {
  const response = await fetch(url);

  // Status information
  console.log("Status:", response.status);           // 200
  console.log("OK:", response.ok);                   // true (200-299)
  console.log("Status Text:", response.statusText);  // "OK"
  console.log("URL:", response.url);
  console.log("Redirected:", response.redirected);   // false

  // Headers
  console.log("Content-Type:", response.headers.get("content-type"));
  console.log("Content-Length:", response.headers.get("content-length"));

  // Iterate over headers
  for (const [key, value] of response.headers) {
    console.log(`${key}: ${value}`);
  }

  // Response types
  const jsonData = await response.json();     // Parse as JSON
  // const textData = await response.text();  // Parse as text
  // const blobData = await response.blob();  // Parse as blob
  // const arrayBuffer = await response.arrayBuffer(); // Binary data
}

/* ============================================================
   3. Error Handling
   ============================================================ */

console.log("=== Error Handling ===");

// Comprehensive error handling
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);

    // Check HTTP status
    if (!response.ok) {
      // Handle different status codes
      switch(response.status) {
        case 400:
          throw new Error("Bad Request");
        case 401:
          throw new Error("Unauthorized - Please log in");
        case 403:
          throw new Error("Forbidden - Access denied");
        case 404:
          throw new Error("Resource not found");
        case 500:
          throw new Error("Internal server error");
        default:
          throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    // Check content type
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    const data = await response.json();
    return { success: true, data };

  } catch (error) {
    console.error("Fetch failed:", error.message);

    // Network errors
    if (error instanceof TypeError) {
      return { success: false, error: "Network error or CORS issue" };
    }

    return { success: false, error: error.message };
  }
}

// Timeout handling
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  }
}

/* ============================================================
   4. Retry Logic
   ============================================================ */

console.log("=== Retry Logic ===");

// Retry failed requests
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return await response.json();
      }

      // Retry on server errors (5xx)
      if (response.status >= 500 && attempt < maxRetries) {
        console.log(`Attempt ${attempt} failed. Retrying...`);
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
        continue;
      }

      throw new Error(`HTTP ${response.status}`);

    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      console.log(`Attempt ${attempt} failed:`, error.message);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Exponential backoff
async function fetchWithExponentialBackoff(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }

    // Wait: 1s, 2s, 4s, 8s, ...
    const waitTime = Math.pow(2, i) * 1000;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
}

/* ============================================================
   5. Parallel Requests
   ============================================================ */

console.log("=== Parallel Requests ===");

// Fetch multiple resources simultaneously
async function fetchMultiple() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()),
      fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
      fetch("https://jsonplaceholder.typicode.com/comments").then(r => r.json())
    ]);

    return { users, posts, comments };
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

// Fetch with fallback
async function fetchWithFallback(primaryUrl, fallbackUrl) {
  try {
    const response = await fetch(primaryUrl);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log("Primary failed, trying fallback");
  }

  // Try fallback
  const response = await fetch(fallbackUrl);
  return await response.json();
}

// Race condition - use first response
async function fetchFastest(urls) {
  const requests = urls.map(url => fetch(url).then(r => r.json()));

  try {
    return await Promise.race(requests);
  } catch (error) {
    console.error("All requests failed:", error);
  }
}

/* ============================================================
   6. File Uploads
   ============================================================ */

console.log("=== File Uploads ===");

// Upload single file
async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("description", "My file");

  try {
    const response = await fetch("https://api.example.com/upload", {
      method: "POST",
      body: formData
      // Don't set Content-Type header - browser sets it automatically
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

// Upload multiple files
async function uploadMultipleFiles(files) {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  const response = await fetch("https://api.example.com/upload-multiple", {
    method: "POST",
    body: formData
  });

  return await response.json();
}

// Download file
async function downloadFile(url, filename) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    // Create download link
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);

  } catch (error) {
    console.error("Download failed:", error);
  }
}

/* ============================================================
   7. Real-World Patterns
   ============================================================ */

// Pattern 1: Complete API wrapper
class API {
  constructor(baseUrl, options = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = options.headers || {};
    this.timeout = options.timeout || 10000;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          ...this.defaultHeaders,
          ...options.headers
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw error;
    }
  }

  async get(endpoint, options) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  async post(endpoint, data, options) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data, options) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint, options) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }
}

// Usage
const api = new API("https://api.example.com", {
  headers: { "Authorization": "Bearer token" },
  timeout: 5000
});

// Pattern 2: Pagination
async function fetchPaginated(page = 1, limit = 10) {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
  const response = await fetch(url);

  return {
    data: await response.json(),
    total: response.headers.get("X-Total-Count"),
    page,
    limit
  };
}

// Pattern 3: Search with debounce
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const searchAPI = debounce(async (query) => {
  const response = await fetch(`https://api.example.com/search?q=${query}`);
  return await response.json();
}, 300);

/**
 * ============================================================
 * Best Practices
 * ============================================================
 *
 * 1. Always check response.ok before parsing
 * 2. Use try/catch for error handling
 * 3. Set appropriate timeouts
 * 4. Implement retry logic for failed requests
 * 5. Use AbortController for cancellable requests
 * 6. Handle different response types appropriately
 * 7. Don't expose sensitive data in client code
 * 8. Use HTTPS for secure communication
 * 9. Validate and sanitize data before sending
 * 10. Cache responses when appropriate
 *
 * ============================================================
 * End of File
 * ============================================================
 */
