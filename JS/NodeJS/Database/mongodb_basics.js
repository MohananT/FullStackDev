/**
 * ============================================================
 * MongoDB with Node.js - NoSQL Database Basics
 * ============================================================
 *
 * Topics covered:
 * 1. What is MongoDB?
 * 2. MongoDB vs SQL databases
 * 3. Installing MongoDB driver
 * 4. Connecting to MongoDB
 * 5. CRUD operations (Create, Read, Update, Delete)
 * 6. Mongoose (ODM)
 * 7. Schema and Models
 * 8. Best practices
 *
 * Installation: npm install mongodb mongoose
 *
 * ============================================================
 */

/* ============================================================
   1. What is MongoDB?
   ============================================================ */

/**
 * WHAT IS MONGODB?
 * ----------------
 * MongoDB is a NoSQL document database
 * 
 * ANALOGY: File cabinet vs Excel spreadsheet
 * 
 * SQL Database (MySQL, PostgreSQL):
 * - Like Excel spreadsheet
 * - Rows and columns
 * - Fixed structure (schema)
 * - Related tables
 * 
 * MongoDB (NoSQL):
 * - Like file cabinet with folders
 * - Documents (JSON-like objects)
 * - Flexible structure
 * - Embedded or referenced data
 * 
 * KEY CONCEPTS:
 * -------------
 * Database → Collection → Document
 * 
 * Compare to SQL:
 * Database → Table → Row
 * 
 * MONGODB STRUCTURE:
 * {
 *   "_id": ObjectId("..."),
 *   "name": "Alice",
 *   "age": 25,
 *   "hobbies": ["reading", "gaming"],
 *   "address": {
 *     "city": "NYC",
 *     "zip": "10001"
 *   }
 * }
 * 
 * WHY MONGODB?
 * ✅ Flexible schema (no fixed structure)
 * ✅ JSON-like documents (natural for JavaScript)
 * ✅ Scalable (horizontal scaling)
 * ✅ Fast for certain use cases
 * ✅ Embedded documents
 * ✅ Popular with Node.js/Express/React stack (MERN)
 */

/* ============================================================
   2. MongoDB vs SQL Databases
   ============================================================ */

/**
 * COMPARISON
 * ----------
 * 
 * TERMINOLOGY:
 * SQL           | MongoDB
 * --------------|------------------
 * Database      | Database
 * Table         | Collection
 * Row           | Document
 * Column        | Field
 * Primary Key   | _id field
 * JOIN          | Embedded or $lookup
 * 
 * DATA STRUCTURE:
 * 
 * SQL (Relational):
 * Users Table:
 * | id | name  | email           |
 * |----|-------|-----------------|
 * | 1  | Alice | alice@ex.com    |
 * 
 * Posts Table:
 * | id | user_id | title      |
 * |----|---------|------------|
 * | 1  | 1       | My Post    |
 * 
 * MongoDB (Document):
 * {
 *   "_id": ObjectId("..."),
 *   "name": "Alice",
 *   "email": "alice@ex.com",
 *   "posts": [
 *     { "title": "My Post", "content": "..." }
 *   ]
 * }
 * 
 * WHEN TO USE MONGODB:
 * ✅ Rapidly changing requirements
 * ✅ Flexible schema needed
 * ✅ Large amounts of data
 * ✅ Real-time analytics
 * ✅ Content management
 * 
 * WHEN TO USE SQL:
 * ✅ Complex transactions
 * ✅ Fixed schema
 * ✅ Complex relationships
 * ✅ ACID compliance critical
 */

/* ============================================================
   3. Installing MongoDB Driver
   ============================================================ */

/**
 * INSTALLATION
 * ------------
 * 
 * Native MongoDB Driver:
 * npm install mongodb
 * 
 * Mongoose (ODM - Object Data Modeling):
 * npm install mongoose
 * 
 * WHICH TO USE?
 * - Native driver: More control, closer to MongoDB
 * - Mongoose: Easier, schema validation, more features
 * 
 * Most projects use Mongoose
 */

/* ============================================================
   4. Connecting to MongoDB
   ============================================================ */

const { MongoClient } = require('mongodb');

/**
 * NATIVE DRIVER CONNECTION
 * ------------------------
 */

async function connectNative() {
  // Connection URI
  const uri = 'mongodb://localhost:27017';
  // Or MongoDB Atlas (cloud):
  // const uri = 'mongodb+srv://user:pass@cluster.mongodb.net/';
  
  const client = new MongoClient(uri);
  
  try {
    // Connect
    await client.connect();
    console.log('Connected to MongoDB');
    
    // Get database
    const db = client.db('myDatabase');
    
    // Get collection
    const collection = db.collection('users');
    
    // Use collection...
    
  } catch (error) {
    console.error('Connection error:', error);
  } finally {
    await client.close();
  }
}

/**
 * MONGOOSE CONNECTION
 * -------------------
 */

const mongoose = require('mongoose');

async function connectMongoose() {
  try {
    await mongoose.connect('mongodb://localhost:27017/myDatabase');
    console.log('Connected to MongoDB with Mongoose');
  } catch (error) {
    console.error('Connection error:', error);
  }
}

// Connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

/* ============================================================
   5. CRUD Operations
   ============================================================ */

/**
 * CREATE - Insert Documents
 * --------------------------
 */

async function createOperations() {
  const db = client.db('myDatabase');
  const users = db.collection('users');
  
  // Insert one document
  const result = await users.insertOne({
    name: 'Alice',
    email: 'alice@example.com',
    age: 25
  });
  console.log('Inserted:', result.insertedId);
  
  // Insert multiple documents
  const result2 = await users.insertMany([
    { name: 'Bob', email: 'bob@example.com', age: 30 },
    { name: 'Charlie', email: 'charlie@example.com', age: 35 }
  ]);
  console.log('Inserted:', result2.insertedIds);
}

/**
 * READ - Find Documents
 * ---------------------
 */

async function readOperations() {
  const db = client.db('myDatabase');
  const users = db.collection('users');
  
  // Find all documents
  const allUsers = await users.find({}).toArray();
  console.log('All users:', allUsers);
  
  // Find one document
  const user = await users.findOne({ name: 'Alice' });
  console.log('User:', user);
  
  // Find with conditions
  const adults = await users.find({ age: { $gte: 18 } }).toArray();
  console.log('Adults:', adults);
  
  // Find with projection (select fields)
  const names = await users.find({}, { projection: { name: 1, email: 1 } }).toArray();
  console.log('Names:', names);
  
  // Sort
  const sorted = await users.find({}).sort({ age: -1 }).toArray();
  console.log('Sorted by age (desc):', sorted);
  
  // Limit and skip
  const page1 = await users.find({}).skip(0).limit(10).toArray();
  const page2 = await users.find({}).skip(10).limit(10).toArray();
}

/**
 * UPDATE - Modify Documents
 * -------------------------
 */

async function updateOperations() {
  const db = client.db('myDatabase');
  const users = db.collection('users');
  
  // Update one document
  const result = await users.updateOne(
    { name: 'Alice' },           // Filter
    { $set: { age: 26 } }        // Update
  );
  console.log('Modified:', result.modifiedCount);
  
  // Update multiple documents
  const result2 = await users.updateMany(
    { age: { $lt: 18 } },        // Filter: age < 18
    { $set: { isMinor: true } }  // Update
  );
  
  // Increment value
  await users.updateOne(
    { name: 'Alice' },
    { $inc: { age: 1 } }         // Increment age by 1
  );
  
  // Add to array
  await users.updateOne(
    { name: 'Alice' },
    { $push: { hobbies: 'reading' } }
  );
  
  // Remove field
  await users.updateOne(
    { name: 'Alice' },
    { $unset: { isMinor: '' } }
  );
}

/**
 * DELETE - Remove Documents
 * -------------------------
 */

async function deleteOperations() {
  const db = client.db('myDatabase');
  const users = db.collection('users');
  
  // Delete one document
  const result = await users.deleteOne({ name: 'Alice' });
  console.log('Deleted:', result.deletedCount);
  
  // Delete multiple documents
  const result2 = await users.deleteMany({ age: { $lt: 18 } });
  console.log('Deleted:', result2.deletedCount);
  
  // Delete all documents
  // await users.deleteMany({});
}

/* ============================================================
   6. Mongoose (ODM)
   ============================================================ */

/**
 * WHAT IS MONGOOSE?
 * -----------------
 * Object Data Modeling (ODM) library for MongoDB
 * 
 * BENEFITS:
 * ✅ Schema definitions
 * ✅ Validation
 * ✅ Type casting
 * ✅ Query building
 * ✅ Middleware (hooks)
 * ✅ Virtual properties
 */

/* ============================================================
   7. Schema and Models
   ============================================================ */

/**
 * DEFINING SCHEMAS
 * ----------------
 */

// Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  age: {
    type: Number,
    min: 0,
    max: 120,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  hobbies: [String],
  address: {
    street: String,
    city: String,
    zip: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create model
const User = mongoose.model('User', userSchema);

/**
 * USING MODELS
 * ------------
 */

async function mongooseOperations() {
  // CREATE
  const user = new User({
    name: 'Alice',
    email: 'alice@example.com',
    age: 25,
    hobbies: ['reading', 'gaming']
  });
  
  await user.save();
  console.log('User created:', user._id);
  
  // Or use create()
  const user2 = await User.create({
    name: 'Bob',
    email: 'bob@example.com'
  });
  
  // READ
  const allUsers = await User.find();
  const alice = await User.findOne({ name: 'Alice' });
  const userById = await User.findById('507f1f77bcf86cd799439011');
  
  // With conditions
  const adults = await User.find({ age: { $gte: 18 } });
  
  // With select (projection)
  const names = await User.find().select('name email -_id');
  
  // With sort and limit
  const recent = await User.find().sort({ createdAt: -1 }).limit(10);
  
  // UPDATE
  await User.updateOne({ name: 'Alice' }, { age: 26 });
  
  // Or findByIdAndUpdate
  const updated = await User.findByIdAndUpdate(
    '507f1f77bcf86cd799439011',
    { age: 26 },
    { new: true } // Return updated document
  );
  
  // DELETE
  await User.deleteOne({ name: 'Alice' });
  await User.findByIdAndDelete('507f1f77bcf86cd799439011');
}

/* ============================================================
   8. Best Practices
   ============================================================ */

/**
 * BEST PRACTICES
 * --------------
 * 
 * 1. Use Mongoose for most projects
 * 2. Define schemas with validation
 * 3. Index frequently queried fields
 * 4. Use lean() for read-only queries (faster)
 * 5. Handle connection errors
 * 6. Close connections properly
 * 7. Use environment variables for connection strings
 * 8. Implement proper error handling
 * 9. Use transactions for multi-document operations
 * 10. Sanitize user input
 */

// ✅ Good: Schema with validation
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0 }
});

// ✅ Good: Index for performance
productSchema.index({ name: 1, price: -1 });

// ✅ Good: Use lean() for read-only
const products = await Product.find().lean();

// ✅ Good: Error handling
try {
  const user = await User.create(userData);
} catch (error) {
  if (error.code === 11000) {
    console.error('Duplicate key error');
  } else {
    console.error('Database error:', error);
  }
}

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. MongoDB is NoSQL document database
 * 2. Stores data as JSON-like documents
 * 3. Collection = Table, Document = Row
 * 4. Mongoose provides schema and validation
 * 5. CRUD: create, find, update, delete
 * 6. Use async/await for operations
 * 7. Define schemas for data structure
 * 8. Index frequently queried fields
 * 9. Handle errors properly
 * 10. Popular with MERN stack
 *
 * ============================================================
 * End of File
 * ============================================================
 */
