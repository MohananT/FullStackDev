/**
 * ============================================================
 * Node.js File System (fs) Module
 * ============================================================
 *
 * Topics covered:
 * 1. Reading files (sync & async)
 * 2. Writing files
 * 3. Appending to files
 * 4. Deleting files
 * 5. Working with directories
 * 6. File stats and info
 * 7. Promises API (fs/promises)
 * 8. Best practices
 *
 * ============================================================
 */

/* ============================================================
   1. Reading Files
   ============================================================ */

const fs = require('fs');
const path = require('path');

/**
 * WHY FILE SYSTEM MODULE?
 * -----------------------
 * Node.js can interact with computer's file system
 * 
 * ANALOGY: File system = Filing cabinet
 * - fs.readFile() = Open drawer and read document
 * - fs.writeFile() = Write new document and file it
 * - fs.unlink() = Shred and throw away document
 * 
 * TWO WAYS TO READ/WRITE:
 * 1. Synchronous (blocking) - wait for operation
 * 2. Asynchronous (non-blocking) - continue while it happens
 */

console.log("=== Reading Files ===");

/**
 * ASYNC READ (Preferred - Non-blocking)
 * --------------------------------------
 * Process continues while reading
 * Use callbacks or promises
 */

// Callback style
fs.readFile('example.txt', 'utf8', (error, data) => {
  if (error) {
    console.error('Error reading file:', error);
    return;
  }
  console.log('File content:', data);
});

console.log('This runs while file is being read');

/**
 * SYNC READ (Blocking - Avoid in servers)
 * ----------------------------------------
 * Everything waits until file is read
 * Use only for initialization/config
 */

try {
  const data = fs.readFileSync('example.txt', 'utf8');
  console.log('File content:', data);
} catch (error) {
  console.error('Error:', error);
}

console.log('This runs AFTER file is read');

/**
 * PROMISES API (Modern - Async/await)
 * ------------------------------------
 * Cleaner than callbacks
 */

const fsPromises = require('fs/promises');

async function readFileAsync() {
  try {
    const data = await fsPromises.readFile('example.txt', 'utf8');
    console.log('Content:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// readFileAsync();

/* ============================================================
   2. Writing Files
   ============================================================ */

console.log("=== Writing Files ===");

/**
 * WRITE FILE
 * ----------
 * Creates new file or overwrites existing
 */

// Async (callback)
const content = 'Hello from Node.js!';

fs.writeFile('output.txt', content, 'utf8', (error) => {
  if (error) {
    console.error('Write error:', error);
    return;
  }
  console.log('File written successfully');
});

// Sync (blocking)
try {
  fs.writeFileSync('output.txt', content, 'utf8');
  console.log('File written');
} catch (error) {
  console.error('Error:', error);
}

// Async/await (promises)
async function writeFileAsync() {
  try {
    await fsPromises.writeFile('output.txt', content, 'utf8');
    console.log('File written');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Write JSON data
const userData = { name: 'Alice', age: 25 };
const jsonData = JSON.stringify(userData, null, 2);

fs.writeFile('user.json', jsonData, (error) => {
  if (error) throw error;
  console.log('JSON saved');
});

/* ============================================================
   3. Appending to Files
   ============================================================ */

console.log("=== Appending to Files ===");

/**
 * APPEND FILE
 * -----------
 * Add content to end of file (doesn't overwrite)
 */

// Append text
fs.appendFile('log.txt', 'New log entry\n', (error) => {
  if (error) throw error;
  console.log('Log appended');
});

// Append with promises
async function appendLog(message) {
  try {
    await fsPromises.appendFile('log.txt', `${message}\n`);
    console.log('Appended:', message);
  } catch (error) {
    console.error('Error:', error);
  }
}

// appendLog('User logged in at ' + new Date());

/* ============================================================
   4. Deleting Files
   ============================================================ */

console.log("=== Deleting Files ===");

/**
 * DELETE FILE (unlink)
 * --------------------
 */

// Async
fs.unlink('file-to-delete.txt', (error) => {
  if (error) {
    console.error('Delete error:', error);
    return;
  }
  console.log('File deleted');
});

// Async/await
async function deleteFile(filename) {
  try {
    await fsPromises.unlink(filename);
    console.log('Deleted:', filename);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('File does not exist');
    } else {
      console.error('Error:', error);
    }
  }
}

/* ============================================================
   5. Working with Directories
   ============================================================ */

console.log("=== Directories ===");

// Create directory
fs.mkdir('new-folder', { recursive: true }, (error) => {
  if (error) throw error;
  console.log('Directory created');
});

// Read directory contents
fs.readdir('.', (error, files) => {
  if (error) throw error;
  console.log('Files:', files);
});

// Remove directory (must be empty)
fs.rmdir('folder-to-remove', (error) => {
  if (error) throw error;
  console.log('Directory removed');
});

// Check if exists
fs.access('file.txt', fs.constants.F_OK, (error) => {
  if (error) {
    console.log('File does not exist');
  } else {
    console.log('File exists');
  }
});

// Promises API
async function directoryOperations() {
  try {
    // Create nested directories
    await fsPromises.mkdir('logs/2024/january', { recursive: true });
    
    // List files
    const files = await fsPromises.readdir('.');
    console.log('Files:', files);
    
    // Remove directory and contents
    await fsPromises.rm('temp-folder', { recursive: true, force: true });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

/* ============================================================
   6. File Stats and Info
   ============================================================ */

console.log("=== File Stats ===");

/**
 * GET FILE INFORMATION
 * --------------------
 */

fs.stat('example.txt', (error, stats) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log('Is file:', stats.isFile());
  console.log('Is directory:', stats.isDirectory());
  console.log('Size:', stats.size, 'bytes');
  console.log('Created:', stats.birthtime);
  console.log('Modified:', stats.mtime);
});

// Async/await
async function getFileStats(filename) {
  try {
    const stats = await fsPromises.stat(filename);
    return {
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory(),
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

/* ============================================================
   7. Promises API (fs/promises) - Modern Approach
   ============================================================ */

/**
 * FS PROMISES API
 * ---------------
 * Cleaner async code with async/await
 * No callbacks needed!
 */

const fsp = require('fs/promises');

async function fileOperations() {
  try {
    // Read file
    const content = await fsp.readFile('input.txt', 'utf8');
    console.log('Read:', content);
    
    // Process content
    const processed = content.toUpperCase();
    
    // Write to new file
    await fsp.writeFile('output.txt', processed);
    console.log('Processed and saved');
    
    // Copy file
    await fsp.copyFile('output.txt', 'backup.txt');
    console.log('Backup created');
    
    // Rename file
    await fsp.rename('backup.txt', 'backup_renamed.txt');
    console.log('File renamed');
    
  } catch (error) {
    console.error('Operation failed:', error);
  }
}

/* ============================================================
   8. Best Practices
   ============================================================ */

/**
 * BEST PRACTICES
 * --------------
 * 
 * 1. Use Promises API (fs/promises) with async/await
 * 2. Always handle errors (try/catch)
 * 3. Close file descriptors when done
 * 4. Use async methods (don't block event loop)
 * 5. Check if file exists before operating
 * 6. Use path.join() for cross-platform paths
 * 7. Set proper file permissions
 * 8. Use streams for large files
 */

// ✅ Good: Async with proper error handling
async function readFileGood(filename) {
  try {
    const data = await fsp.readFile(filename, 'utf8');
    return data;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('File not found:', filename);
    } else {
      console.error('Read error:', error);
    }
    return null;
  }
}

// ✅ Good: Cross-platform paths
const filePath = path.join(__dirname, 'data', 'users.json');

// ❌ Bad: Hardcoded paths (Windows specific)
// const badPath = 'C:\\Users\\data\\users.json';

// ✅ Good: Check if exists first
async function safeDelete(filename) {
  try {
    await fsp.access(filename);
    await fsp.unlink(filename);
    console.log('Deleted:', filename);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('File doesn\'t exist');
    } else {
      throw error;
    }
  }
}

/**
 * ============================================================
 * Real-World Examples
 * ============================================================
 */

// Example 1: Read JSON config file
async function loadConfig() {
  try {
    const data = await fsp.readFile('config.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load config:', error);
    return { /* default config */ };
  }
}

// Example 2: Write logs
async function writeLog(level, message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level}] ${message}\n`;
  
  try {
    await fsp.appendFile('app.log', logEntry);
  } catch (error) {
    console.error('Failed to write log:', error);
  }
}

// Example 3: List all files in directory
async function getAllFiles(dirPath) {
  try {
    const files = await fsp.readdir(dirPath);
    const fileDetails = [];
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stats = await fsp.stat(fullPath);
      
      fileDetails.push({
        name: file,
        path: fullPath,
        isDirectory: stats.isDirectory(),
        size: stats.size
      });
    }
    
    return fileDetails;
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
}

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * - fs module for file operations
 * - Async methods prevent blocking
 * - Use fs/promises with async/await
 * - Always handle errors
 * - Use path module for cross-platform paths
 * - Sync methods only for initialization
 * - Check file existence before operations
 * - Use streams for large files
 *
 * ============================================================
 * End of File
 * ============================================================
 */
