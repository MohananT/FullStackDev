/**
 * ============================================================
 * React Functional Components
 * ============================================================
 *
 * Topics covered:
 * 1. What are functional components?
 * 2. Props (properties)
 * 3. Destructuring props
 * 4. Default props
 * 5. Children prop
 * 6. Conditional rendering
 * 7. Lists and keys
 * 8. Component composition
 *
 * ============================================================
 */

import React from 'react';

/* ============================================================
   1. What are Functional Components?
   ============================================================ */

/**
 * FUNCTIONAL COMPONENTS
 * ---------------------
 * JavaScript functions that return JSX
 * 
 * ANALOGY: Recipe
 * - Ingredients = Props (input)
 * - Instructions = Component logic
 * - Finished dish = JSX (output)
 * 
 * SIMPLE FORMULA:
 * Input (Props) → Component Function → Output (JSX)
 * 
 * CHARACTERISTICS:
 * ✅ Just JavaScript functions
 * ✅ Must return JSX
 * ✅ Receive props as parameter
 * ✅ Can use Hooks (useState, useEffect)
 * ✅ Simpler than class components
 * ✅ Modern React standard
 */

// Simplest component
function Hello() {
  return <h1>Hello, World!</h1>;
}

// Arrow function component
const Goodbye = () => {
  return <h1>Goodbye!</h1>;
};

// Implicit return (no curly braces)
const Welcome = () => <h1>Welcome!</h1>;

// Multi-line JSX (wrap in parentheses)
const Card = () => (
  <div className="card">
    <h2>Title</h2>
    <p>Description</p>
  </div>
);

/* ============================================================
   2. Props (Properties)
   ============================================================ */

/**
 * WHAT ARE PROPS?
 * ---------------
 * Props = Data passed from parent to child component
 * 
 * ANALOGY: Function parameters
 * function greet(name) → name is parameter
 * <Greet name="Alice" /> → name is prop
 * 
 * KEY POINTS:
 * ✅ Props are READ-ONLY (cannot modify)
 * ✅ Flow down (parent → child)
 * ✅ Can be any type (string, number, object, function)
 * ✅ Used to customize components
 * 
 * THINK OF PROPS AS:
 * Props = Settings/configuration for component
 * Like TV settings (brightness, volume, channel)
 */

// Component receiving props
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Using the component
function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
      <Greeting name="Charlie" />
    </div>
  );
}

/**
 * WHAT HAPPENS:
 * -------------
 * 1. <Greeting name="Alice" />
 * 2. React calls: Greeting({ name: "Alice" })
 * 3. props = { name: "Alice" }
 * 4. Return: <h1>Hello, Alice!</h1>
 * 5. React renders to DOM
 */

// Multiple props
function UserCard(props) {
  return (
    <div className="user-card">
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Email: {props.email}</p>
      <p>Role: {props.role}</p>
    </div>
  );
}

// Usage
<UserCard 
  name="Alice"
  age={25}
  email="alice@example.com"
  role="Developer"
/>

/**
 * PROP TYPES:
 * -----------
 */

function PropsExample(props) {
  return (
    <div>
      {/* String prop */}
      <p>{props.text}</p>
      
      {/* Number prop (use curly braces) */}
      <p>Count: {props.count}</p>
      
      {/* Boolean prop */}
      {props.isActive && <span>Active</span>}
      
      {/* Array prop */}
      <ul>
        {props.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      {/* Object prop */}
      <p>{props.user.name} - {props.user.email}</p>
      
      {/* Function prop */}
      <button onClick={props.onButtonClick}>
        Click me
      </button>
    </div>
  );
}

/* ============================================================
   3. Destructuring Props
   ============================================================ */

/**
 * DESTRUCTURING PROPS
 * -------------------
 * Cleaner way to access props
 */

// Without destructuring
function UserBad(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      <p>{props.age}</p>
    </div>
  );
}

// ✅ With destructuring (cleaner!)
function UserGood({ name, email, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{age}</p>
    </div>
  );
}

// Destructuring with defaults
function Button({ text = 'Click me', type = 'button', disabled = false }) {
  return (
    <button type={type} disabled={disabled}>
      {text}
    </button>
  );
}

// Usage
<Button text="Submit" type="submit" />
<Button /> {/* Uses all defaults */}

/* ============================================================
   4. Default Props
   ============================================================ */

/**
 * DEFAULT PROPS
 * -------------
 * Fallback values if prop not provided
 */

function Badge({ text, color = 'blue', size = 'medium' }) {
  return (
    <span className={`badge badge-${color} badge-${size}`}>
      {text}
    </span>
  );
}

// Usage
<Badge text="New" />                    {/* blue, medium */}
<Badge text="Sale" color="red" />       {/* red, medium */}
<Badge text="Hot" color="orange" size="large" />

/* ============================================================
   5. Children Prop
   ============================================================ */

/**
 * CHILDREN PROP
 * -------------
 * Special prop: content between component tags
 * 
 * ANALOGY: Container
 * <Container> stuff goes here </Container>
 * "stuff goes here" = props.children
 */

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Usage
<Card>
  <h2>Card Title</h2>
  <p>Card content here</p>
  <button>Action</button>
</Card>

// Wrapper components
function Layout({ children }) {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}

<Layout>
  <h1>Page Title</h1>
  <p>Page content</p>
</Layout>

/* ============================================================
   6. Conditional Rendering
   ============================================================ */

/**
 * CONDITIONAL RENDERING
 * ---------------------
 * Show/hide elements based on conditions
 */

// Method 1: if/else (outside JSX)
function Message({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in</h1>;
  }
}

// Method 2: Ternary operator (inside JSX)
function Status({ isOnline }) {
  return (
    <div>
      <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
    </div>
  );
}

// Method 3: && operator (show if true)
function Notification({ hasNewMessages, messageCount }) {
  return (
    <div>
      {hasNewMessages && (
        <span>You have {messageCount} new messages</span>
      )}
    </div>
  );
}

// Method 4: Switch statement
function Badge2({ status }) {
  let message;
  
  switch(status) {
    case 'success':
      message = '✓ Success';
      break;
    case 'error':
      message = '✗ Error';
      break;
    case 'warning':
      message = '⚠ Warning';
      break;
    default:
      message = 'Unknown';
  }
  
  return <span>{message}</span>;
}

/* ============================================================
   7. Lists and Keys
   ============================================================ */

/**
 * RENDERING LISTS
 * ---------------
 * Use .map() to render arrays
 * MUST provide 'key' prop for each item
 * 
 * WHY KEYS?
 * Keys help React identify which items changed
 * Makes updates faster
 */

function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}

// Usage
const usersData = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

<UserList users={usersData} />

/**
 * KEY RULES:
 * ----------
 * ✅ Use unique identifier (user.id)
 * ❌ Don't use array index (can cause bugs)
 * ✅ Key must be stable (same item = same key)
 * ✅ Key only needs to be unique among siblings
 */

// ❌ Bad: Using index as key
users.map((user, index) => (
  <li key={index}>{user.name}</li>
));

// ✅ Good: Using unique ID
users.map((user) => (
  <li key={user.id}>{user.name}</li>
));

/* ============================================================
   8. Component Composition
   ============================================================ */

/**
 * COMPOSITION
 * -----------
 * Building complex UIs from small components
 * 
 * ANALOGY: Building blocks
 * Small blocks → Medium structures → Large building
 */

// Small components
function Avatar({ src, alt }) {
  return <img src={src} alt={alt} className="avatar" />;
}

function UserName({ name }) {
  return <h3>{name}</h3>;
}

function UserEmail({ email }) {
  return <p>{email}</p>;
}

// Composed component
function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <Avatar src={user.avatar} alt={user.name} />
      <div className="user-info">
        <UserName name={user.name} />
        <UserEmail email={user.email} />
      </div>
    </div>
  );
}

// Higher-level composition
function UserList2({ users }) {
  return (
    <div className="user-list">
      {users.map(user => (
        <UserProfile key={user.id} user={user} />
      ))}
    </div>
  );
}

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. Functional components are just JavaScript functions
 * 2. Return JSX from components
 * 3. Props pass data from parent to child
 * 4. Destructure props for cleaner code
 * 5. props.children for wrapper components
 * 6. Use conditional rendering for dynamic UIs
 * 7. map() for lists, always provide keys
 * 8. Build complex UIs through composition
 * 9. Keep components small and focused
 * 10. Component names must be PascalCase
 *
 * ============================================================
 * End of File
 * ============================================================
 */
