/**
 * ============================================================
 * React useEffect Hook
 * ============================================================
 *
 * Topics covered:
 * 1. What is useEffect?
 * 2. Basic usage
 * 3. Dependency array
 * 4. Cleanup function
 * 5. Multiple effects
 * 6. Common use cases
 * 7. Rules and best practices
 * 8. Common pitfalls
 *
 * ============================================================
 */

import React, { useState, useEffect } from 'react';

/* ============================================================
   1. What is useEffect?
   ============================================================ */

/**
 * WHAT IS useEffect?
 * ------------------
 * Hook for side effects in functional components
 * 
 * WHAT ARE SIDE EFFECTS?
 * Operations that affect things outside the component:
 * ✅ Fetching data (API calls)
 * ✅ Subscribing to events
 * ✅ Manually changing the DOM
 * ✅ Timers (setTimeout, setInterval)
 * ✅ Logging
 * ✅ Local storage
 * 
 * ANALOGY: Restaurant kitchen
 * Component render = Cooking the dish
 * useEffect = Side tasks:
 *   - Ordering supplies (fetch data)
 *   - Cleaning up (cleanup function)
 *   - Setting timers
 * 
 * WHEN DOES IT RUN?
 * 1. After every render (by default)
 * 2. After first render (with empty [])
 * 3. When dependencies change (with [dep1, dep2])
 * 
 * SYNTAX:
 * useEffect(() => {
 *   // Side effect code here
 *   
 *   return () => {
 *     // Cleanup (optional)
 *   };
 * }, [dependencies]);
 */

/* ============================================================
   2. Basic Usage
   ============================================================ */

/**
 * SIMPLEST EXAMPLE
 * ----------------
 * Runs after every render
 */

function BasicExample() {
  const [count, setCount] = useState(0);
  
  // Runs after EVERY render
  useEffect(() => {
    console.log('Component rendered!');
    console.log('Count is:', count);
  });
  
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
 * WHAT HAPPENS:
 * -------------
 * 1. Component renders
 * 2. JSX updates DOM
 * 3. useEffect runs
 * 4. Click button → count updates
 * 5. Component re-renders
 * 6. useEffect runs again
 */

/* ============================================================
   3. Dependency Array
   ============================================================ */

/**
 * CONTROLLING WHEN useEffect RUNS
 * --------------------------------
 * Second argument controls when effect executes
 */

// No dependency array - Runs after EVERY render
function NoDepArray() {
  useEffect(() => {
    console.log('Runs after every render');
  });
}

// Empty array [] - Runs ONCE (on mount)
function EmptyDepArray() {
  useEffect(() => {
    console.log('Runs only once when component mounts');
  }, []);
}

// With dependencies - Runs when they change
function WithDependencies() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // Runs when 'count' changes (not when 'name' changes)
  useEffect(() => {
    console.log('Count changed to:', count);
  }, [count]);
  
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

/**
 * DEPENDENCY ARRAY GUIDE:
 * -----------------------
 * 
 * useEffect(() => { ... });
 * → Runs after every render
 * 
 * useEffect(() => { ... }, []);
 * → Runs once on mount
 * 
 * useEffect(() => { ... }, [value]);
 * → Runs when 'value' changes
 * 
 * useEffect(() => { ... }, [val1, val2]);
 * → Runs when 'val1' OR 'val2' changes
 */

/* ============================================================
   4. Cleanup Function
   ============================================================ */

/**
 * CLEANUP FUNCTION
 * ----------------
 * Return function from useEffect to cleanup
 * 
 * WHEN IT RUNS:
 * 1. Before effect runs again
 * 2. When component unmounts
 * 
 * WHY CLEANUP?
 * ✅ Cancel subscriptions
 * ✅ Clear timers
 * ✅ Remove event listeners
 * ✅ Abort fetch requests
 */

// Timer example
function TimerExample() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    console.log('Setting up timer');
    
    // Start timer
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup: Clear timer
    return () => {
      console.log('Cleaning up timer');
      clearInterval(timer);
    };
  }, []); // Empty array = timer runs once
  
  return <p>Seconds: {seconds}</p>;
}

/**
 * WHAT HAPPENS:
 * -------------
 * 1. Component mounts
 * 2. useEffect runs → Start timer
 * 3. Timer updates every second
 * 4. Component unmounts
 * 5. Cleanup runs → Clear timer
 */

// Event listener example
function WindowSizeExample() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // Event handler
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    
    // Add listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup: Remove listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <p>Window width: {width}px</p>;
}

/* ============================================================
   5. Multiple Effects
   ============================================================ */

/**
 * MULTIPLE useEffect CALLS
 * ------------------------
 * Can have multiple effects for different purposes
 * Separates concerns
 */

function MultipleEffects() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // Effect 1: Update document title
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  // Effect 2: Save name to localStorage
  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);
  
  // Effect 3: Log on mount
  useEffect(() => {
    console.log('Component mounted');
    return () => console.log('Component unmounted');
  }, []);
  
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

/* ============================================================
   6. Common Use Cases
   ============================================================ */

/**
 * USE CASE 1: Fetching Data
 * -------------------------
 */

function FetchDataExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []); // Fetch once on mount
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (data) return <p>Data: {JSON.stringify(data)}</p>;
}

/**
 * USE CASE 2: Subscribing to Events
 * ---------------------------------
 */

function SubscriptionExample() {
  const [online, setOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return (
    <div>
      Status: {online ? '🟢 Online' : '🔴 Offline'}
    </div>
  );
}

/**
 * USE CASE 3: Syncing with localStorage
 * -------------------------------------
 */

function LocalStorageExample() {
  const [name, setName] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('name') || '';
  });
  
  // Save to localStorage when name changes
  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);
  
  return (
    <input 
      value={name}
      onChange={e => setName(e.target.value)}
      placeholder="Your name"
    />
  );
}

/**
 * USE CASE 4: Document Title
 * --------------------------
 */

function DocumentTitleExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  useEffect(() => {
    document.title = `${name || 'User'} - Count: ${count}`;
  }, [name, count]);
  
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

/**
 * USE CASE 5: Debouncing
 * ----------------------
 */

function DebouncedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    // Debounce: Wait 500ms after user stops typing
    const timer = setTimeout(() => {
      if (searchTerm) {
        // Perform search
        fetch(`/api/search?q=${searchTerm}`)
          .then(res => res.json())
          .then(data => setResults(data));
      }
    }, 500);
    
    // Cleanup: Cancel previous timer
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  return (
    <div>
      <input 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   7. Rules and Best Practices
   ============================================================ */

/**
 * RULES:
 * ------
 * 1. Call useEffect at top level (not in loops/conditions)
 * 2. Only call in React functions
 * 3. List all dependencies (or use empty array)
 * 4. Clean up subscriptions/timers
 * 5. Async functions need wrapper
 */

// ✅ Good: Async wrapper
function GoodAsync() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/data');
      const data = await response.json();
    };
    
    fetchData();
  }, []);
}

// ❌ Bad: useEffect can't be async directly
// function BadAsync() {
//   useEffect(async () => {
//     const data = await fetch('/api/data');
//   }, []);
// }

/**
 * BEST PRACTICES:
 * ---------------
 * 1. One effect = one purpose
 * 2. Include all dependencies
 * 3. Use cleanup for subscriptions
 * 4. Avoid too many effects
 * 5. Consider custom hooks for complex logic
 */

/* ============================================================
   8. Common Pitfalls
   ============================================================ */

/**
 * PITFALL 1: Missing Dependencies
 * --------------------------------
 */

function MissingDependency() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(2);
  
  // ❌ Wrong: Missing 'multiplier' in dependencies
  // useEffect(() => {
  //   console.log(count * multiplier);
  // }, [count]); // Should be [count, multiplier]
  
  // ✅ Correct: All dependencies listed
  useEffect(() => {
    console.log(count * multiplier);
  }, [count, multiplier]);
}

/**
 * PITFALL 2: Infinite Loop
 * -------------------------
 */

function InfiniteLoop() {
  const [count, setCount] = useState(0);
  
  // ❌ Infinite loop!
  // useEffect(() => {
  //   setCount(count + 1); // Updates state
  // }); // No dependency array → runs after every render
  //     // State update → re-render → useEffect runs → infinite!
  
  // ✅ Correct: Empty array or controlled dependency
  useEffect(() => {
    // Run once or with specific dependency
  }, []);
}

/**
 * PITFALL 3: Stale Closures
 * --------------------------
 */

function StaleClosureExample() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      // ❌ Always uses initial count (0)
      // console.log('Count:', count);
      // setCount(count + 1);
      
      // ✅ Use functional update for latest value
      setCount(prev => {
        console.log('Count:', prev);
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // Empty array → count never updates in closure
  
  return <p>Count: {count}</p>;
}

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. useEffect for side effects
 * 2. Runs after render (by default)
 * 3. Control with dependency array []
 * 4. Empty [] = run once on mount
 * 5. [dep] = run when dep changes
 * 6. Return cleanup function
 * 7. Cleanup runs before next effect and on unmount
 * 8. Multiple effects for separation of concerns
 * 9. Can't make useEffect async directly
 * 10. List all dependencies to avoid bugs
 *
 * ============================================================
 * End of File
 * ============================================================
 */
