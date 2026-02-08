/**
 * ============================================================
 * Node.js Events and EventEmitter
 * ============================================================
 *
 * Topics covered:
 * 1. What are Events?
 * 2. EventEmitter class
 * 3. Emitting and listening
 * 4. Event parameters
 * 5. Multiple listeners
 * 6. Once listeners
 * 7. Removing listeners
 * 8. Real-world examples
 *
 * ============================================================
 */

const EventEmitter = require('events');

/* ============================================================
   1. What are Events?
   ============================================================ */

/**
 * EVENTS IN NODE.JS
 * -----------------
 * Event-driven programming pattern
 * Core to Node.js architecture
 * 
 * ANALOGY: Doorbell
 * - Doorbell = Event
 * - Someone presses (emit event)
 * - You hear and respond (listen to event)
 * - Multiple people can hear same doorbell
 * 
 * WHY EVENTS?
 * ✅ Loose coupling (components don't need to know each other)
 * ✅ Asynchronous communication
 * ✅ Multiple listeners for one event
 * ✅ Core pattern in Node.js (streams, HTTP, etc.)
 * 
 * EVENT-DRIVEN FLOW:
 * 1. Create EventEmitter
 * 2. Register listeners (on/once)
 * 3. Emit events
 * 4. Listeners execute
 */

/* ============================================================
   2. EventEmitter Class
   ============================================================ */

/**
 * CREATING EVENT EMITTER
 * ----------------------
 */

console.log("=== EventEmitter Basics ===");

// Create instance
const emitter = new EventEmitter();

// Or extend EventEmitter
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

/* ============================================================
   3. Emitting and Listening
   ============================================================ */

/**
 * BASIC EVENT FLOW
 * ----------------
 * 1. Register listener (on)
 * 2. Emit event
 * 3. Listener executes
 */

console.log("=== Emit and Listen ===");

// Register listener
emitter.on('greet', () => {
  console.log('Hello!');
});

// Emit event
emitter.emit('greet');  // Output: Hello!

/**
 * ORDER MATTERS!
 * Must register listener BEFORE emitting
 */

// ❌ Won't work
emitter.emit('test');       // No listeners yet
emitter.on('test', () => {  // Too late!
  console.log('Test');
});

// ✅ Works
emitter.on('working', () => {
  console.log('This works!');
});
emitter.emit('working');    // Output: This works!

/* ============================================================
   4. Event Parameters
   ============================================================ */

/**
 * PASSING DATA WITH EVENTS
 * -------------------------
 * Can pass arguments when emitting
 */

console.log("=== Event Parameters ===");

// Single parameter
emitter.on('message', (text) => {
  console.log('Message:', text);
});

emitter.emit('message', 'Hello World');
// Output: Message: Hello World

// Multiple parameters
emitter.on('user', (name, age) => {
  console.log(`User: ${name}, Age: ${age}`);
});

emitter.emit('user', 'Alice', 25);
// Output: User: Alice, Age: 25

// Object parameter
emitter.on('data', (obj) => {
  console.log('Data:', obj);
});

emitter.emit('data', { id: 1, name: 'Item' });
// Output: Data: { id: 1, name: 'Item' }

/* ============================================================
   5. Multiple Listeners
   ============================================================ */

/**
 * MULTIPLE LISTENERS
 * ------------------
 * Same event can have multiple listeners
 * Execute in order they were registered
 */

console.log("=== Multiple Listeners ===");

emitter.on('order', () => {
  console.log('1. Checking inventory');
});

emitter.on('order', () => {
  console.log('2. Processing payment');
});

emitter.on('order', () => {
  console.log('3. Sending confirmation email');
});

emitter.emit('order');
// Output:
// 1. Checking inventory
// 2. Processing payment
// 3. Sending confirmation email

/* ============================================================
   6. Once Listeners
   ============================================================ */

/**
 * ONE-TIME LISTENERS
 * ------------------
 * Listen only once, then auto-remove
 */

console.log("=== Once Listeners ===");

emitter.once('startup', () => {
  console.log('Server started!');
});

emitter.emit('startup');  // Output: Server started!
emitter.emit('startup');  // Nothing (listener removed)

// Compare with regular listener
emitter.on('click', () => {
  console.log('Clicked!');
});

emitter.emit('click');  // Output: Clicked!
emitter.emit('click');  // Output: Clicked! (runs again)

/* ============================================================
   7. Removing Listeners
   ============================================================ */

/**
 * REMOVING LISTENERS
 * ------------------
 * Remove specific or all listeners
 */

console.log("=== Removing Listeners ===");

// Define named function (must be named to remove!)
function onData(data) {
  console.log('Data:', data);
}

// Add listener
emitter.on('data-event', onData);

emitter.emit('data-event', 'First');   // Output: Data: First

// Remove specific listener
emitter.removeListener('data-event', onData);
// Or: emitter.off('data-event', onData);

emitter.emit('data-event', 'Second');  // Nothing (removed)

// Remove all listeners for an event
emitter.on('test1', () => console.log('Test 1'));
emitter.on('test1', () => console.log('Test 2'));

emitter.removeAllListeners('test1');
emitter.emit('test1');  // Nothing (all removed)

/* ============================================================
   8. Real-World Examples
   ============================================================ */

/**
 * EXAMPLE 1: User Authentication System
 * --------------------------------------
 */

console.log("=== Authentication System ===");

class AuthSystem extends EventEmitter {
  login(username, password) {
    // Simulate authentication
    if (username && password) {
      this.emit('login:success', { username, timestamp: new Date() });
    } else {
      this.emit('login:failed', { reason: 'Invalid credentials' });
    }
  }
  
  logout(username) {
    this.emit('logout', { username });
  }
}

const auth = new AuthSystem();

// Register listeners
auth.on('login:success', (data) => {
  console.log(`✓ ${data.username} logged in at ${data.timestamp}`);
});

auth.on('login:failed', (data) => {
  console.log(`✗ Login failed: ${data.reason}`);
});

auth.on('logout', (data) => {
  console.log(`${data.username} logged out`);
});

// Use the system
auth.login('alice', 'password123');
auth.login('', '');
auth.logout('alice');

/**
 * EXAMPLE 2: File Processor
 * --------------------------
 */

console.log("=== File Processor ===");

class FileProcessor extends EventEmitter {
  process(filename) {
    this.emit('start', { filename });
    
    // Simulate processing
    setTimeout(() => {
      this.emit('progress', { filename, percent: 50 });
    }, 100);
    
    setTimeout(() => {
      this.emit('complete', { filename, size: 1024 });
    }, 200);
  }
  
  error(filename, message) {
    this.emit('error', { filename, message });
  }
}

const processor = new FileProcessor();

processor.on('start', (data) => {
  console.log(`Starting: ${data.filename}`);
});

processor.on('progress', (data) => {
  console.log(`Progress: ${data.filename} - ${data.percent}%`);
});

processor.on('complete', (data) => {
  console.log(`Complete: ${data.filename} (${data.size} bytes)`);
});

processor.on('error', (data) => {
  console.error(`Error: ${data.filename} - ${data.message}`);
});

processor.process('document.pdf');

/**
 * EXAMPLE 3: Chat Server
 * -----------------------
 */

console.log("=== Chat Server ===");

class ChatRoom extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
    this.users = [];
  }
  
  join(username) {
    this.users.push(username);
    this.emit('user:joined', { username, room: this.name });
  }
  
  leave(username) {
    this.users = this.users.filter(u => u !== username);
    this.emit('user:left', { username, room: this.name });
  }
  
  message(username, text) {
    this.emit('message', { username, text, timestamp: new Date() });
  }
}

const room = new ChatRoom('General');

room.on('user:joined', (data) => {
  console.log(`${data.username} joined ${data.room}`);
});

room.on('user:left', (data) => {
  console.log(`${data.username} left ${data.room}`);
});

room.on('message', (data) => {
  console.log(`[${data.timestamp.toLocaleTimeString()}] ${data.username}: ${data.text}`);
});

room.join('Alice');
room.message('Alice', 'Hello everyone!');
room.join('Bob');
room.message('Bob', 'Hi Alice!');
room.leave('Alice');

/**
 * EXAMPLE 4: Task Queue
 * ----------------------
 */

console.log("=== Task Queue ===");

class TaskQueue extends EventEmitter {
  constructor() {
    super();
    this.queue = [];
    this.processing = false;
  }
  
  add(task) {
    this.queue.push(task);
    this.emit('task:added', { task, queueLength: this.queue.length });
    
    if (!this.processing) {
      this.processNext();
    }
  }
  
  processNext() {
    if (this.queue.length === 0) {
      this.processing = false;
      this.emit('queue:empty');
      return;
    }
    
    this.processing = true;
    const task = this.queue.shift();
    
    this.emit('task:start', { task });
    
    // Simulate task processing
    setTimeout(() => {
      this.emit('task:complete', { task });
      this.processNext();
    }, 100);
  }
}

const queue = new TaskQueue();

queue.on('task:added', (data) => {
  console.log(`Task added: ${data.task} (Queue: ${data.queueLength})`);
});

queue.on('task:start', (data) => {
  console.log(`Processing: ${data.task}`);
});

queue.on('task:complete', (data) => {
  console.log(`Completed: ${data.task}`);
});

queue.on('queue:empty', () => {
  console.log('All tasks completed!');
});

queue.add('Task 1');
queue.add('Task 2');
queue.add('Task 3');

/**
 * ============================================================
 * EventEmitter Methods Reference
 * ============================================================
 *
 * emitter.on(event, listener)
 *   - Add listener
 *   - Alias: addListener()
 *
 * emitter.once(event, listener)
 *   - Add one-time listener
 *
 * emitter.emit(event, [...args])
 *   - Trigger event
 *   - Returns true if event had listeners
 *
 * emitter.removeListener(event, listener)
 *   - Remove specific listener
 *   - Alias: off()
 *
 * emitter.removeAllListeners([event])
 *   - Remove all listeners (or for specific event)
 *
 * emitter.listeners(event)
 *   - Get array of listeners for event
 *
 * emitter.listenerCount(event)
 *   - Get number of listeners
 *
 * emitter.eventNames()
 *   - Get array of registered event names
 *
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. EventEmitter is core Node.js pattern
 * 2. on() registers listeners
 * 3. emit() triggers events
 * 4. Can pass data with events
 * 5. Multiple listeners per event
 * 6. once() for one-time listeners
 * 7. removeListener() to cleanup
 * 8. Extend EventEmitter for custom classes
 * 9. Register before emitting
 * 10. Used throughout Node.js (streams, HTTP, etc.)
 *
 * ============================================================
 * End of File
 * ============================================================
 */
