/**
 * ============================================================
 * React useReducer, useMemo, useCallback Hooks
 * ============================================================
 *
 * Topics covered:
 * 1. useReducer - Complex state logic
 * 2. When to use useReducer
 * 3. useMemo - Memoize expensive calculations
 * 4. useCallback - Memoize functions
 * 5. Performance optimization
 * 6. Common patterns
 *
 * ============================================================
 */

import React, { useReducer, useMemo, useCallback, useState } from 'react';

/* ============================================================
   1. useReducer - Complex State Logic
   ============================================================ */

/**
 * WHAT IS useReducer?
 * -------------------
 * Alternative to useState for complex state logic
 * 
 * ANALOGY: Calculator vs Accounting System
 * 
 * useState (Simple Calculator):
 * - One value at a time
 * - Simple operations
 * - setCount(count + 1)
 * 
 * useReducer (Accounting System):
 * - Multiple related values
 * - Complex operations
 * - dispatch({ type: 'DEPOSIT', amount: 100 })
 * 
 * WHEN TO USE:
 * ✅ Multiple related state values
 * ✅ Complex state transitions
 * ✅ Next state depends on previous
 * ✅ State logic needs testing in isolation
 * 
 * SYNTAX:
 * const [state, dispatch] = useReducer(reducer, initialState);
 */

// Reducer function: (currentState, action) => newState
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}

/**
 * HOW IT WORKS:
 * 1. dispatch({ type: 'INCREMENT' }) called
 * 2. Reducer function receives current state + action
 * 3. Returns new state
 * 4. Component re-renders with new state
 */

/* ============================================================
   2. When to use useReducer
   ============================================================ */

/**
 * COMPLEX STATE EXAMPLE: Todo List
 * ---------------------------------
 */

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
      
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
      
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
      
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
      
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  });
  
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };
  
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'completed') return todo.completed;
    if (state.filter === 'active') return !todo.completed;
    return true;
  });
  
  return (
    <div>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add</button>
      
      <div>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}>
          All
        </button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}>
          Active
        </button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}>
          Completed
        </button>
      </div>
      
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   3. useMemo - Memoize Expensive Calculations
   ============================================================ */

/**
 * WHAT IS useMemo?
 * ----------------
 * Memoize (cache) expensive calculations
 * Only recalculate when dependencies change
 * 
 * ANALOGY: Calculator history
 * - Remember previous calculation
 * - If same input, return saved result
 * - Don't recalculate
 * 
 * WHY useMemo?
 * ✅ Avoid expensive re-calculations
 * ✅ Optimization for performance
 * ✅ Prevent unnecessary work
 * 
 * NOTE: Premature optimization is bad!
 * Only use when actually needed
 */

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // ❌ Without useMemo: Runs on every render
  // const expensiveValue = expensiveCalculation(count);
  
  // ✅ With useMemo: Only runs when count changes
  const expensiveValue = useMemo(() => {
    console.log('Calculating...');
    return expensiveCalculation(count);
  }, [count]);  // Only recalculate if count changes
  
  return (
    <div>
      <p>Result: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <input 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here (doesn't trigger calculation)"
      />
    </div>
  );
}

function expensiveCalculation(num) {
  // Simulate expensive operation
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += num;
  }
  return result;
}

/**
 * WHEN TO USE useMemo:
 * ✅ Expensive calculations (loops, sorting large arrays)
 * ✅ Creating objects/arrays that are dependencies
 * ✅ Preventing child re-renders with React.memo
 * 
 * WHEN NOT TO USE:
 * ❌ Simple calculations (useMemo has overhead!)
 * ❌ Values that change every render anyway
 */

// Practical example: Filtering large list
function SearchList({ items }) {
  const [query, setQuery] = useState('');
  
  // Memoize filtered results
  const filteredItems = useMemo(() => {
    console.log('Filtering...');
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);  // Recalculate if items or query changes
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   4. useCallback - Memoize Functions
   ============================================================ */

/**
 * WHAT IS useCallback?
 * --------------------
 * Memoize function reference
 * Same function instance between renders
 * 
 * WHY useCallback?
 * In JavaScript, functions are objects
 * () => {} !== () => {}  (different references!)
 * 
 * This causes child components to re-render unnecessarily
 * 
 * useCallback prevents this
 */

// Without useCallback
function Parent() {
  const [count, setCount] = useState(0);
  
  // ❌ New function every render (causes Child to re-render)
  const handleClick = () => {
    console.log('Clicked');
  };
  
  return <Child onClick={handleClick} />;
}

// With useCallback
function Parent2() {
  const [count, setCount] = useState(0);
  
  // ✅ Same function reference between renders
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);  // Empty array = never changes
  
  return <Child onClick={handleClick} />;
}

// Child wrapped in React.memo (only re-renders if props change)
const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});

/**
 * WHEN TO USE useCallback:
 * ✅ Passing callbacks to optimized child components
 * ✅ Function is dependency of useEffect
 * ✅ Function is dependency of useMemo
 * 
 * WHEN NOT TO USE:
 * ❌ Function not passed to children
 * ❌ Child not optimized with React.memo
 * ❌ Function changes every render anyway
 */

// Practical example: Form handler
function Form() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  // Memoize onChange handler
  const handleChange = useCallback((field) => {
    return (e) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    };
  }, []);  // Doesn't depend on formData
  
  return (
    <div>
      <Input value={formData.name} onChange={handleChange('name')} />
      <Input value={formData.email} onChange={handleChange('email')} />
    </div>
  );
}

const Input = React.memo(({ value, onChange }) => {
  console.log('Input rendered');
  return <input value={value} onChange={onChange} />;
});

/* ============================================================
   5. Performance Optimization
   ============================================================ */

/**
 * OPTIMIZATION TECHNIQUES
 * -----------------------
 */

// 1. Memoize expensive calculations
function OptimizedList({ items }) {
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);
  
  return (
    <ul>
      {sortedItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// 2. Memoize event handlers
function OptimizedCounter() {
  const [count, setCount] = useState(0);
  
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);
  
  return (
    <div>
      <p>{count}</p>
      <CounterButton onClick={increment} text="+" />
      <CounterButton onClick={decrement} text="-" />
    </div>
  );
}

const CounterButton = React.memo(({ onClick, text }) => {
  console.log(`Button ${text} rendered`);
  return <button onClick={onClick}>{text}</button>;
});

/* ============================================================
   6. Common Patterns
   ============================================================ */

/**
 * PATTERN: useReducer + useCallback
 * ----------------------------------
 */

function TodoWithCallbacks() {
  const [state, dispatch] = useReducer(todoReducer, { todos: [], filter: 'all' });
  
  // Memoize dispatch actions
  const addTodo = useCallback((text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  }, []);
  
  const toggleTodo = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);
  
  const deleteTodo = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);
  
  return (
    <div>
      <TodoInput onAdd={addTodo} />
      <TodoList 
        todos={state.todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

const TodoInput = React.memo(({ onAdd }) => {
  const [text, setText] = useState('');
  
  const handleSubmit = () => {
    onAdd(text);
    setText('');
  };
  
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
});

const TodoList = React.memo(({ todos, onToggle, onDelete }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
});

const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  return (
    <li>
      <input 
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * useReducer:
 * 1. For complex state logic
 * 2. (state, action) => newState
 * 3. dispatch({ type, payload })
 * 4. Better for testing
 * 5. Multiple related state values
 *
 * useMemo:
 * 1. Memoize expensive calculations
 * 2. Only recalculate when dependencies change
 * 3. Don't overuse (has overhead)
 * 4. Good for filtering, sorting, heavy math
 *
 * useCallback:
 * 1. Memoize function references
 * 2. Prevent unnecessary child re-renders
 * 3. Use with React.memo
 * 4. Good for event handlers
 *
 * General:
 * - Optimize only when needed
 * - Measure before optimizing
 * - Don't premature optimize
 *
 * ============================================================
 * End of File
 * ============================================================
 */
