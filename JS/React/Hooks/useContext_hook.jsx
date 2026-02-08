/**
 * ============================================================
 * React useContext Hook
 * ============================================================
 *
 * Topics covered:
 * 1. What is useContext?
 * 2. Creating Context
 * 3. Provider and Consumer
 * 4. useContext hook
 * 5. Multiple contexts
 * 6. Updating context
 * 7. Common patterns
 * 8. Best practices
 *
 * ============================================================
 */

import React, { createContext, useContext, useState } from 'react';

/* ============================================================
   1. What is useContext?
   ============================================================ */

/**
 * WHAT IS useContext?
 * -------------------
 * Hook to access React Context (shared state)
 * 
 * PROBLEM WITHOUT CONTEXT:
 * Component A → Component B → Component C → Component D
 * To pass data from A to D, must pass through B and C (prop drilling)
 * 
 * ANALOGY: TV Remote vs Room Thermostat
 * 
 * Without Context (Props):
 * - Like passing TV remote from person to person
 * - Everyone must hold it, even if they don't use it
 * - Tedious and error-prone
 * 
 * With Context:
 * - Like room thermostat on wall
 * - Anyone in room can access it
 * - No passing required
 * 
 * WHY useContext?
 * ✅ Avoid prop drilling
 * ✅ Share data globally
 * ✅ Cleaner code
 * ✅ Common for: theme, auth, language, user data
 * 
 * WHEN TO USE:
 * - Data needed by many components
 * - Passing props through multiple levels is tedious
 * - Theme, authentication, language settings
 */

/* ============================================================
   2. Creating Context
   ============================================================ */

/**
 * CREATING CONTEXT
 * ----------------
 * Step 1: Create context
 */

// Create context with default value
const ThemeContext = createContext('light');

// Can also create without default
const UserContext = createContext();

/**
 * DEFAULT VALUE:
 * Used only when NO Provider above component
 * Usually provide default value for TypeScript/testing
 */

/* ============================================================
   3. Provider and Consumer
   ============================================================ */

/**
 * PROVIDER
 * --------
 * Wraps components that need access to context
 * Provides the actual value
 */

function AppWithProvider() {
  return (
    <ThemeContext.Provider value="dark">
      {/* All children can access "dark" */}
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

/* ============================================================
   4. useContext Hook
   ============================================================ */

/**
 * USING CONTEXT
 * -------------
 * Access context value with useContext()
 */

function ThemedButton() {
  // Access context value
  const theme = useContext(ThemeContext);
  
  return (
    <button style={{
      background: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000'
    }}>
      I'm a {theme} themed button
    </button>
  );
}

/**
 * HOW IT WORKS:
 * 1. useContext(ThemeContext) looks up the tree
 * 2. Finds nearest ThemeContext.Provider
 * 3. Returns its value
 * 4. If no Provider found, uses default value
 */

/* ============================================================
   5. Multiple Contexts
   ============================================================ */

/**
 * USING MULTIPLE CONTEXTS
 * ------------------------
 * Can use multiple contexts in one component
 */

const ThemeContext2 = createContext();
const LanguageContext = createContext();

function App() {
  return (
    <ThemeContext2.Provider value="dark">
      <LanguageContext.Provider value="en">
        <Page />
      </LanguageContext.Provider>
    </ThemeContext2.Provider>
  );
}

function Page() {
  const theme = useContext(ThemeContext2);
  const language = useContext(LanguageContext);
  
  return (
    <div>
      <p>Theme: {theme}</p>
      <p>Language: {language}</p>
    </div>
  );
}

/* ============================================================
   6. Updating Context
   ============================================================ */

/**
 * UPDATING CONTEXT VALUES
 * ------------------------
 * Context value can be anything: object, functions, etc.
 * Common pattern: Provide state + updater functions
 */

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = (username) => {
    setUser({ username });
  };
  
  const logout = () => {
    setUser(null);
  };
  
  // Provide object with state and functions
  const value = {
    user,
    login,
    logout,
    isAuthenticated: user !== null
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easier access
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage
function LoginButton() {
  const { login, logout, isAuthenticated, user } = useAuth();
  
  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {user.username}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
  
  return (
    <button onClick={() => login('Alice')}>
      Login
    </button>
  );
}

/* ============================================================
   7. Common Patterns
   ============================================================ */

/**
 * PATTERN 1: Theme Context
 * -------------------------
 */

const ThemeContext3 = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext3.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext3.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext3);
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}

/**
 * PATTERN 2: Shopping Cart Context
 * ---------------------------------
 */

const CartContext = createContext();

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  
  const addItem = (item) => {
    setItems(prev => [...prev, item]);
  };
  
  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearCart,
      total,
      itemCount: items.length
    }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

function CartSummary() {
  const { items, total, itemCount } = useCart();
  
  return (
    <div>
      <h3>Cart ({itemCount} items)</h3>
      <p>Total: ${total}</p>
    </div>
  );
}

/**
 * PATTERN 3: Multi-language (i18n)
 * ---------------------------------
 */

const translations = {
  en: {
    welcome: 'Welcome',
    goodbye: 'Goodbye'
  },
  es: {
    welcome: 'Bienvenido',
    goodbye: 'Adiós'
  }
};

const LanguageContext2 = createContext();

function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  
  const t = (key) => translations[lang][key];
  
  return (
    <LanguageContext2.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext2.Provider>
  );
}

function useLanguage() {
  return useContext(LanguageContext2);
}

function Greeting() {
  const { t, lang, setLang } = useLanguage();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')}>
        Switch Language
      </button>
    </div>
  );
}

/* ============================================================
   8. Best Practices
   ============================================================ */

/**
 * BEST PRACTICES
 * --------------
 */

// ✅ 1. Create custom hook for context
const MyContext = createContext();

function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
}

// ✅ 2. Separate concerns (one context = one purpose)
// Good: ThemeContext, AuthContext, CartContext
// Bad: AppContext (everything in one)

// ✅ 3. Memoize context value to prevent unnecessary renders
function OptimizedProvider({ children }) {
  const [state, setState] = useState(initialState);
  
  // Memoize value
  const value = useMemo(() => ({
    state,
    updateState: setState
  }), [state]);
  
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}

// ✅ 4. Don't overuse Context
// Context for: auth, theme, language
// Props for: component-specific data

// ✅ 5. Split contexts if values update independently
// Bad: { theme, user, cart } all in one
// Good: ThemeContext, UserContext, CartContext

/**
 * ============================================================
 * Complete Example: Todo App with Context
 * ============================================================
 */

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    setTodos(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false
    }]);
  };
  
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  return (
    <TodoContext.Provider value={{
      todos,
      addTodo,
      toggleTodo,
      deleteTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodos() {
  return useContext(TodoContext);
}

function TodoApp() {
  return (
    <TodoProvider>
      <TodoInput />
      <TodoList />
      <TodoStats />
    </TodoProvider>
  );
}

function TodoInput() {
  const [text, setText] = useState('');
  const { addTodo } = useTodos();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
}

function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodos();
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input 
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}>
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

function TodoStats() {
  const { todos } = useTodos();
  
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  
  return (
    <div>
      <p>Total: {total}</p>
      <p>Completed: {completed}</p>
      <p>Remaining: {total - completed}</p>
    </div>
  );
}

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. useContext accesses shared state
 * 2. Avoids prop drilling
 * 3. createContext() creates context
 * 4. Provider wraps components
 * 5. useContext(Context) gets value
 * 6. Can update context with state
 * 7. Create custom hooks for contexts
 * 8. One context per concern
 * 9. Memoize value to optimize
 * 10. Don't overuse - props are fine for local data
 *
 * ============================================================
 * End of File
 * ============================================================
 */
