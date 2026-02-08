/**
 * ============================================================
 * React Introduction - What is React?
 * ============================================================
 *
 * Topics covered:
 * 1. What is React?
 * 2. Why React?
 * 3. Virtual DOM
 * 4. JSX (JavaScript XML)
 * 5. Components
 * 6. First React Component
 * 7. React vs Vanilla JavaScript
 * 8. Create React App
 *
 * ============================================================
 */

/* ============================================================
   1. What is React?
   ============================================================ */

/**
 * WHAT IS REACT?
 * --------------
 * React is a JavaScript library for building user interfaces
 * 
 * REAL-WORLD ANALOGY:
 * Building a house:
 * - Vanilla JS = Building from scratch (bricks, cement, wood)
 * - React = Pre-fabricated components (walls, windows, doors)
 *   Just assemble the pieces!
 * 
 * TECHNICAL DEFINITION:
 * React is a declarative, component-based JavaScript library
 * for building fast and interactive UIs
 * 
 * KEY CONCEPTS:
 * 1. Component-Based: UI built from reusable pieces
 * 2. Declarative: Describe WHAT you want, React handles HOW
 * 3. Virtual DOM: Fast updates without full page reload
 * 4. One-way data flow: Data flows down, events flow up
 * 
 * CREATED BY:
 * Facebook (Meta) in 2013
 * Open source, huge community
 * 
 * USED BY:
 * Facebook, Instagram, Netflix, Airbnb, WhatsApp, and thousands more
 */

/* ============================================================
   2. Why React?
   ============================================================ */

/**
 * WHY USE REACT?
 * --------------
 * 
 * ADVANTAGE 1: Component Reusability
 * -----------------------------------
 * ANALOGY: LEGO Blocks
 * - Build once, use many times
 * - Button component → Use in 50 places
 * - Change once → Updates everywhere
 * 
 * Example:
 * <Button text="Click me" /> 
 * Use this button everywhere in your app!
 * 
 * ADVANTAGE 2: Virtual DOM (Speed)
 * --------------------------------
 * ANALOGY: Rough draft before final paper
 * 
 * Vanilla JS:
 * - Change data → Update entire DOM → Slow!
 * 
 * React:
 * - Change data → Update Virtual DOM (in memory) → Fast!
 * - Compare with real DOM → Update only differences
 * - Result: Much faster!
 * 
 * ADVANTAGE 3: Declarative (Easy to understand)
 * ---------------------------------------------
 * Vanilla JS (Imperative - HOW):
 * - Create element
 * - Set properties
 * - Append to parent
 * - Add event listener
 * - Update manually on changes
 * 
 * React (Declarative - WHAT):
 * - <Button onClick={handleClick}>Click me</Button>
 * - That's it! React handles the rest
 * 
 * ADVANTAGE 4: Large Ecosystem
 * ----------------------------
 * ✅ React Router - Navigation
 * ✅ Redux/Zustand - State management
 * ✅ Material-UI/Chakra - Component libraries
 * ✅ Next.js - Framework for React
 * ✅ Huge community and job market
 * 
 * WHEN TO USE REACT:
 * ✅ Single Page Applications (SPAs)
 * ✅ Dynamic, interactive UIs
 * ✅ Complex state management
 * ✅ Large applications
 * ✅ Team projects (component structure)
 */

/* ============================================================
   3. Virtual DOM
   ============================================================ */

/**
 * VIRTUAL DOM EXPLAINED
 * ---------------------
 * 
 * ANALOGY: Editing a document
 * 
 * WITHOUT Virtual DOM:
 * - Edit Word document
 * - Each keystroke → Save entire file → Slow!
 * 
 * WITH Virtual DOM:
 * - Edit in memory (auto-save draft)
 * - When done → Save only changes → Fast!
 * 
 * HOW IT WORKS:
 * 
 * 1. State changes (user clicks button)
 *    ↓
 * 2. React creates new Virtual DOM
 *    (JavaScript object, in memory)
 *    ↓
 * 3. Compare with previous Virtual DOM
 *    (This is called "diffing")
 *    ↓
 * 4. Calculate minimum changes needed
 *    ↓
 * 5. Update ONLY those parts in real DOM
 *    (This is called "reconciliation")
 *    ↓
 * 6. Browser re-renders only changed elements
 * 
 * RESULT: Much faster than updating entire DOM!
 * 
 * EXAMPLE:
 * Change name from "Alice" to "Bob"
 * - Vanilla JS: Re-render entire list (slow)
 * - React: Update only that one text node (fast!)
 */

/* ============================================================
   4. JSX (JavaScript XML)
   ============================================================ */

/**
 * WHAT IS JSX?
 * ------------
 * JSX = JavaScript + HTML-like syntax
 * 
 * ANALOGY: Like writing HTML in JavaScript
 * But it's not really HTML, it's JavaScript!
 * 
 * WHY JSX?
 * ✅ More readable (looks like HTML)
 * ✅ Type-safe (catches errors at compile time)
 * ✅ Can use JavaScript expressions
 * ✅ Component syntax natural
 */

import React from 'react';

// JSX Example
const element = <h1>Hello, World!</h1>;

// What it compiles to (you don't write this):
// const element = React.createElement('h1', null, 'Hello, World!');

/**
 * JSX RULES:
 * ----------
 * 1. Must return single parent element
 * 2. Use className (not class)
 * 3. Use camelCase for attributes
 * 4. Close all tags (even <img />)
 * 5. Use {} for JavaScript expressions
 */

// ✅ Correct JSX
const goodJSX = (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);

// ❌ Wrong: Multiple parents
// const badJSX = (
//   <h1>Title</h1>
//   <p>Paragraph</p>
// );

// ✅ Solution: Fragment
const withFragment = (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);

// JavaScript expressions in JSX
const name = 'Alice';
const age = 25;

const dynamicJSX = (
  <div>
    <h1>Hello, {name}!</h1>
    <p>Age: {age}</p>
    <p>Next year: {age + 1}</p>
    <p>Is adult: {age >= 18 ? 'Yes' : 'No'}</p>
  </div>
);

/* ============================================================
   5. Components
   ============================================================ */

/**
 * WHAT ARE COMPONENTS?
 * --------------------
 * Components are reusable UI building blocks
 * 
 * ANALOGY: LEGO blocks
 * - Each block = component
 * - Connect blocks = build UI
 * - Reuse same block = consistent UI
 * 
 * TWO TYPES:
 * 1. Function Components (modern, preferred)
 * 2. Class Components (old, still works)
 */

/* ============================================================
   6. First React Component
   ============================================================ */

/**
 * FUNCTION COMPONENT
 * ------------------
 * Just a JavaScript function that returns JSX
 */

// Simple component
function Welcome() {
  return <h1>Welcome to React!</h1>;
}

// Component with props (parameters)
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Arrow function component
const Button = (props) => {
  return <button>{props.text}</button>;
};

// Using components
function App() {
  return (
    <div>
      <Welcome />
      <Greeting name="Alice" />
      <Greeting name="Bob" />
      <Button text="Click me" />
    </div>
  );
}

/**
 * COMPONENT RULES:
 * ----------------
 * 1. Name must start with capital letter
 * 2. Must return JSX (or null)
 * 3. Can't modify props (read-only)
 * 4. Keep them small and focused
 */

/* ============================================================
   7. React vs Vanilla JavaScript
   ============================================================ */

/**
 * COMPARISON
 * ----------
 */

// ========== Vanilla JavaScript ==========
// Create counter
let count = 0;
const button = document.getElementById('btn');
const display = document.getElementById('count');

button.addEventListener('click', () => {
  count++;
  display.textContent = count; // Manual DOM update
});

// ========== React ==========
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
  // React automatically updates DOM!
}

/**
 * COMPARISON SUMMARY:
 * -------------------
 * 
 * Vanilla JS:
 * - Manual DOM manipulation
 * - Imperative (HOW to do it)
 * - More code
 * - Harder to maintain
 * 
 * React:
 * - Automatic DOM updates
 * - Declarative (WHAT you want)
 * - Less code
 * - Easier to maintain
 * - Component reusability
 */

/* ============================================================
   8. Create React App
   ============================================================ */

/**
 * CREATING A REACT PROJECT
 * ------------------------
 * 
 * Method 1: Create React App (CRA)
 * npm create vite@latest my-app -- --template react
 * cd my-app
 * npm install
 * npm run dev
 * 
 * Method 2: Next.js (React framework)
 * npx create-next-app@latest my-app
 * 
 * Method 3: Vite (faster, modern)
 * npm create vite@latest my-app -- --template react
 * 
 * FOLDER STRUCTURE:
 * my-app/
 * ├── node_modules/
 * ├── public/
 * ├── src/
 * │   ├── App.jsx        ← Main component
 * │   ├── main.jsx       ← Entry point
 * │   └── App.css
 * ├── package.json
 * └── index.html
 */

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. React is a UI library (not a framework)
 * 2. Component-based architecture
 * 3. Virtual DOM for performance
 * 4. JSX = JavaScript + HTML syntax
 * 5. Declarative (describe WHAT, not HOW)
 * 6. Function components are modern standard
 * 7. Props pass data to components
 * 8. One-way data flow
 * 9. Large ecosystem and community
 * 10. Used by major companies worldwide
 *
 * NEXT STEPS:
 * - Learn Components in depth
 * - Learn Hooks (useState, useEffect)
 * - Build your first app
 * - Learn State management
 *
 * ============================================================
 * End of File
 * ============================================================
 */
