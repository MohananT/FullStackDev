/**
 * ============================================================
 * React useRef Hook
 * ============================================================
 *
 * Topics covered:
 * 1. What is useRef?
 * 2. Accessing DOM elements
 * 3. Storing mutable values
 * 4. useRef vs useState
 * 5. Common use cases
 * 6. forwardRef
 * 7. Ref callbacks
 * 8. Best practices
 *
 * ============================================================
 */

import React, { useRef, useState, useEffect, forwardRef } from 'react';

/* ============================================================
   1. What is useRef?
   ============================================================ */

/**
 * WHAT IS useRef?
 * ---------------
 * Hook that creates a mutable reference
 * Persists across renders (like state)
 * Doesn't trigger re-render when changed (unlike state)
 * 
 * TWO MAIN USES:
 * 1. Access DOM elements
 * 2. Store values that persist but don't cause re-renders
 * 
 * ANALOGY: Sticky note vs Announcement
 * 
 * useState (Announcement):
 * - Everyone hears it
 * - Component re-renders
 * - Updates UI
 * 
 * useRef (Sticky note):
 * - Private note to yourself
 * - Nobody else notified
 * - No re-render
 * - Value persists
 * 
 * SYNTAX:
 * const ref = useRef(initialValue);
 * - ref.current = the value
 * - Can read/write ref.current
 * - No re-render on change
 */

/* ============================================================
   2. Accessing DOM Elements
   ============================================================ */

/**
 * DOM ACCESS
 * ----------
 * Most common use: Access real DOM elements
 */

function InputFocus() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    // Access DOM element directly
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

/**
 * HOW IT WORKS:
 * 1. Create ref: useRef(null)
 * 2. Attach to element: ref={inputRef}
 * 3. After render, inputRef.current = the DOM element
 * 4. Can call DOM methods: focus(), blur(), etc.
 */

// Scroll to element
function ScrollExample() {
  const sectionRef = useRef(null);
  
  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div>
      <button onClick={scrollToSection}>Scroll Down</button>
      <div style={{ height: '1000px' }}>Content...</div>
      <div ref={sectionRef}>Target Section</div>
    </div>
  );
}

/* ============================================================
   3. Storing Mutable Values
   ============================================================ */

/**
 * MUTABLE VALUES
 * --------------
 * Store values that don't need to trigger re-render
 */

function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);
  
  const startTimer = () => {
    // Store interval ID in ref
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    // Access interval ID from ref
    clearInterval(intervalRef.current);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

/**
 * WHY USE REF HERE?
 * - intervalRef.current doesn't need to trigger render
 * - Value must persist across renders
 * - Perfect use case for useRef
 */

// Previous value tracking
function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  
  useEffect(() => {
    // Update after render
    prevCountRef.current = count;
  });
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

/* ============================================================
   4. useRef vs useState
   ============================================================ */

/**
 * useRef vs useState
 * ------------------
 */

function Comparison() {
  const [stateValue, setStateValue] = useState(0);
  const refValue = useRef(0);
  
  const incrementState = () => {
    setStateValue(prev => prev + 1);
    // Causes re-render ✓
  };
  
  const incrementRef = () => {
    refValue.current = refValue.current + 1;
    // No re-render ✗
    console.log('Ref value:', refValue.current);
  };
  
  console.log('Component rendered');
  
  return (
    <div>
      <p>State: {stateValue}</p>
      <p>Ref: {refValue.current}</p>
      <button onClick={incrementState}>Increment State</button>
      <button onClick={incrementRef}>Increment Ref</button>
    </div>
  );
}

/**
 * WHEN TO USE EACH:
 * 
 * useState:
 * ✅ Value needed in render
 * ✅ Changes should update UI
 * ✅ Form inputs, toggles, counters
 * 
 * useRef:
 * ✅ DOM access
 * ✅ Store values that don't affect UI
 * ✅ Interval/timeout IDs
 * ✅ Previous values
 * ✅ Instance variables
 */

/* ============================================================
   5. Common Use Cases
   ============================================================ */

/**
 * USE CASE 1: Auto-focus on Mount
 * --------------------------------
 */

function AutoFocus() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return <input ref={inputRef} placeholder="Auto-focused" />;
}

/**
 * USE CASE 2: Measuring Elements
 * -------------------------------
 */

function MeasureElement() {
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({});
  
  const measure = () => {
    const rect = divRef.current.getBoundingClientRect();
    setDimensions({
      width: rect.width,
      height: rect.height
    });
  };
  
  return (
    <div>
      <div ref={divRef} style={{ width: '200px', height: '100px', background: '#eee' }}>
        Measure me!
      </div>
      <button onClick={measure}>Get Dimensions</button>
      {dimensions.width && (
        <p>Width: {dimensions.width}px, Height: {dimensions.height}px</p>
      )}
    </div>
  );
}

/**
 * USE CASE 3: Debouncing
 * -----------------------
 */

function SearchWithDebounce() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debounceRef = useRef(null);
  
  const handleSearch = (value) => {
    setQuery(value);
    
    // Clear previous timeout
    clearTimeout(debounceRef.current);
    
    // Set new timeout
    debounceRef.current = setTimeout(() => {
      // Simulate API call
      console.log('Searching for:', value);
      setResults([`Result for "${value}"`]);
    }, 500);
  };
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((result, i) => (
          <li key={i}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * USE CASE 4: Click Outside Detection
 * ------------------------------------
 */

function ClickOutside() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button>
      {isOpen && (
        <div ref={menuRef} style={{
          position: 'absolute',
          background: 'white',
          border: '1px solid #ccc',
          padding: '10px'
        }}>
          <p>Menu Content</p>
          <p>Click outside to close</p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   6. forwardRef
   ============================================================ */

/**
 * FORWARDING REFS
 * ---------------
 * Pass ref from parent to child component
 */

// Child component that accepts ref
const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Parent component
function ParentComponent() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Custom input" />
      <button onClick={focusInput}>Focus Custom Input</button>
    </div>
  );
}

/**
 * WHY forwardRef?
 * - Functional components don't have refs by default
 * - forwardRef allows passing ref through
 * - Useful for reusable components
 */

/* ============================================================
   7. Ref Callbacks
   ============================================================ */

/**
 * REF CALLBACKS
 * -------------
 * Alternative to useRef for dynamic refs
 */

function RefCallback() {
  const [height, setHeight] = useState(0);
  
  // Callback ref
  const measureRef = (node) => {
    if (node) {
      setHeight(node.getBoundingClientRect().height);
    }
  };
  
  return (
    <div>
      <div ref={measureRef} style={{ padding: '20px' }}>
        This element's height is measured
      </div>
      <p>Height: {height}px</p>
    </div>
  );
}

/**
 * WHEN TO USE CALLBACK REFS:
 * - Need to run code when ref attaches/detaches
 * - Measuring element on mount
 * - Dynamic number of refs (list items)
 */

/* ============================================================
   8. Best Practices
   ============================================================ */

/**
 * BEST PRACTICES
 * --------------
 */

// ✅ 1. Initialize with null for DOM refs
const domRef = useRef(null);

// ✅ 2. Check ref.current before using
function SafeRefUse() {
  const ref = useRef(null);
  
  const handleClick = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  
  return <input ref={ref} />;
}

// ✅ 3. Don't read/write ref during render
function WrongRefUse() {
  const ref = useRef(0);
  
  // ❌ Wrong: Modifying ref during render
  // ref.current = ref.current + 1;
  
  // ✅ Correct: Modify in event handler or effect
  const increment = () => {
    ref.current = ref.current + 1;
  };
}

// ✅ 4. Use state if value affects render
// ❌ Don't use ref for values that determine what renders

// ✅ 5. Clean up refs in useEffect
function CleanupExample() {
  const intervalRef = useRef(null);
  
  useEffect(() => {
    intervalRef.current = setInterval(() => {}, 1000);
    
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
}

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. useRef creates mutable reference
 * 2. ref.current holds the value
 * 3. Doesn't trigger re-render when changed
 * 4. Main use: Access DOM elements
 * 5. Also for: storing values that persist
 * 6. forwardRef passes refs through components
 * 7. Callback refs for dynamic cases
 * 8. Initialize DOM refs with null
 * 9. Check ref.current before using
 * 10. Use state for values that affect render
 *
 * ============================================================
 * End of File
 * ============================================================
 */
