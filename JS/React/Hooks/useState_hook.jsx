/**
 * ============================================================
 * React useState Hook
 * ============================================================
 *
 * Topics covered:
 * 1. What is useState?
 * 2. Basic usage
 * 3. Updating state
 * 4. Multiple state variables
 * 5. State with objects and arrays
 * 6. Previous state updates
 * 7. State initialization
 * 8. Common patterns and pitfalls
 *
 * ============================================================
 */

import React, { useState } from 'react';

/* ============================================================
   1. What is useState?
   ============================================================ */

/**
 * WHAT IS useState?
 * -----------------
 * Hook that adds state to functional components
 * 
 * ANALOGY: Memory
 * Component without state = Person with amnesia
 *   - Forgets everything after each render
 *   - Starts fresh every time
 * 
 * Component with useState = Person with memory
 *   - Remembers values between renders
 *   - Can update and recall information
 * 
 * WHY useState?
 * ✅ Remember data between renders
 * ✅ Trigger re-render when data changes
 * ✅ Interactive components
 * ✅ Forms, counters, toggles, etc.
 * 
 * SYNTAX:
 * const [value, setValue] = useState(initialValue);
 * 
 * BREAKDOWN:
 * - value: Current state value
 * - setValue: Function to update state
 * - initialValue: Starting value
 * - useState: The Hook function
 * 
 * WHAT HAPPENS:
 * 1. Call useState(0) → Returns [0, function]
 * 2. Use state: count
 * 3. Update: setCount(1)
 * 4. React re-renders component
 * 5. count is now 1
 */

/* ============================================================
   2. Basic Usage
   ============================================================ */

/**
 * COUNTER EXAMPLE
 * ---------------
 * Classic first useState example
 */

function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

/**
 * WHAT HAPPENS WHEN CLICKED:
 * --------------------------
 * 1. User clicks button
 * 2. onClick fires → setCount(count + 1)
 * 3. State updates: 0 → 1
 * 4. React re-renders Counter component
 * 5. count now has new value (1)
 * 6. UI updates automatically!
 */

// Toggle example
function ToggleButton() {
  const [isOn, setIsOn] = useState(false);
  
  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

// Text input example
function NameInput() {
  const [name, setName] = useState('');
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

/* ============================================================
   3. Updating State
   ============================================================ */

/**
 * STATE UPDATE RULES
 * ------------------
 * ✅ Use setter function (setCount)
 * ❌ Never modify state directly
 */

function UpdateExample() {
  const [count, setCount] = useState(0);
  
  // ✅ Correct: Use setter
  const increment = () => {
    setCount(count + 1);
  };
  
  // ❌ Wrong: Direct modification
  // const incrementWrong = () => {
  //   count = count + 1; // Won't work! Won't re-render!
  // };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

/* ============================================================
   4. Multiple State Variables
   ============================================================ */

/**
 * MULTIPLE useState CALLS
 * -----------------------
 * Can call useState multiple times
 * Each independent piece of state
 */

function UserForm() {
  // Multiple state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, age, isSubscribed });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      
      <input 
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
      
      <label>
        <input 
          type="checkbox"
          checked={isSubscribed}
          onChange={(e) => setIsSubscribed(e.target.checked)}
        />
        Subscribe to newsletter
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
}

/* ============================================================
   5. State with Objects and Arrays
   ============================================================ */

/**
 * OBJECT STATE
 * ------------
 * IMPORTANT: Must spread (...) to avoid mutation
 */

function UserProfile() {
  const [user, setUser] = useState({
    name: 'Alice',
    email: 'alice@example.com',
    age: 25
  });
  
  // ✅ Correct: Spread operator
  const updateName = (newName) => {
    setUser({
      ...user,           // Copy existing properties
      name: newName      // Update name
    });
  };
  
  // ❌ Wrong: Mutation
  // const updateNameWrong = (newName) => {
  //   user.name = newName; // Don't do this!
  //   setUser(user);
  // };
  
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={() => updateName('Bob')}>
        Change Name
      </button>
    </div>
  );
}

/**
 * ARRAY STATE
 * -----------
 */

function TodoList() {
  const [todos, setTodos] = useState(['Buy milk', 'Walk dog']);
  const [input, setInput] = useState('');
  
  // Add item (create new array)
  const addTodo = () => {
    setTodos([...todos, input]);
    setInput('');
  };
  
  // Remove item (filter creates new array)
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  
  // Update item
  const updateTodo = (index, newValue) => {
    const newTodos = [...todos];
    newTodos[index] = newValue;
    setTodos(newTodos);
  };
  
  return (
    <div>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * ARRAY OPERATIONS:
 * ----------------
 * Add: [...array, newItem]
 * Remove: array.filter((item, i) => i !== indexToRemove)
 * Update: [...array].map((item, i) => i === index ? newItem : item)
 */

/* ============================================================
   6. Previous State Updates
   ============================================================ */

/**
 * FUNCTIONAL UPDATES
 * ------------------
 * Use when new state depends on previous state
 * 
 * WHY?
 * setState is asynchronous
 * Multiple updates might use same old value
 */

function CounterProblem() {
  const [count, setCount] = useState(0);
  
  // ❌ Problem: Might not work correctly
  const incrementThree = () => {
    setCount(count + 1); // Uses current count
    setCount(count + 1); // Uses same current count!
    setCount(count + 1); // Uses same current count!
    // Result: Only increments by 1, not 3!
  };
  
  // ✅ Solution: Functional update
  const incrementThreeCorrect = () => {
    setCount(prev => prev + 1); // prev = latest value
    setCount(prev => prev + 1); // prev = updated value
    setCount(prev => prev + 1); // prev = latest updated
    // Result: Correctly increments by 3!
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementThreeCorrect}>+3</button>
    </div>
  );
}

/**
 * RULE OF THUMB:
 * --------------
 * Use functional update when new state depends on old state
 * 
 * Simple update:
 * setCount(5)           // Set to specific value
 * 
 * Functional update:
 * setCount(prev => prev + 1)  // Based on previous
 */

/* ============================================================
   7. State Initialization
   ============================================================ */

/**
 * LAZY INITIALIZATION
 * -------------------
 * Initialize state with function
 * Function runs only once (on mount)
 */

// ❌ Runs on every render (inefficient)
function BadInit() {
  const [data, setData] = useState(expensiveCalculation());
  // expensiveCalculation() runs every render!
}

// ✅ Runs only once (efficient)
function GoodInit() {
  const [data, setData] = useState(() => expensiveCalculation());
  // Function runs only on initial render
}

function expensiveCalculation() {
  console.log('Calculating...');
  return Array(1000).fill(0);
}

// Real-world example: localStorage
function useLocalStorageExample() {
  const [name, setName] = useState(() => {
    // Only read from localStorage once
    const saved = localStorage.getItem('name');
    return saved || '';
  });
  
  return { name, setName };
}

/* ============================================================
   8. Common Patterns and Pitfalls
   ============================================================ */

/**
 * PATTERN 1: Toggle Boolean
 * --------------------------
 */

function TogglePattern() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Toggle function
  const toggle = () => setIsVisible(prev => !prev);
  
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      {isVisible && <p>I'm visible!</p>}
    </div>
  );
}

/**
 * PATTERN 2: Reset Form
 * ----------------------
 */

function ResetFormPattern() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };
  
  return (
    <form>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <button type="button" onClick={resetForm}>Reset</button>
    </form>
  );
}

/**
 * PATTERN 3: Loading States
 * --------------------------
 */

function LoadingPattern() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (data) return <p>Data: {JSON.stringify(data)}</p>;
  
  return <button onClick={fetchData}>Load Data</button>;
}

/**
 * PITFALL 1: State doesn't update immediately
 * -------------------------------------------
 */

function ImmediateUpdatePitfall() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
    console.log(count); // Still shows old value!
    // setState is asynchronous
  };
  
  return <button onClick={increment}>Count: {count}</button>;
}

/**
 * PITFALL 2: Modifying state directly
 * ------------------------------------
 */

function MutationPitfall() {
  const [items, setItems] = useState(['a', 'b']);
  
  // ❌ Wrong: Mutates state
  // items.push('c');
  // setItems(items);
  
  // ✅ Correct: Create new array
  const addItem = () => {
    setItems([...items, 'c']);
  };
  
  return <button onClick={addItem}>Add Item</button>;
}

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. useState adds state to functional components
 * 2. Returns [value, setter] array
 * 3. Always use setter function to update
 * 4. Never modify state directly
 * 5. Use functional updates for state based on previous
 * 6. Can have multiple useState calls
 * 7. Spread operator for objects/arrays
 * 8. State updates trigger re-render
 * 9. State updates are asynchronous
 * 10. Lazy initialization for expensive calculations
 *
 * ============================================================
 * End of File
 * ============================================================
 */
