/**
 * ============================================================
 * React Router - Client-Side Routing
 * ============================================================
 *
 * Topics covered:
 * 1. What is React Router?
 * 2. Installation and setup
 * 3. Basic routing
 * 4. Route parameters
 * 5. Navigation (Link, useNavigate)
 * 6. Nested routes
 * 7. Protected routes
 * 8. Common patterns
 *
 * Installation: npm install react-router-dom
 *
 * ============================================================
 */

import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Navigate,
  Outlet
} from 'react-router-dom';

/* ============================================================
   1. What is React Router?
   ============================================================ */

/**
 * WHAT IS REACT ROUTER?
 * ---------------------
 * Library for routing in React applications
 * 
 * WHY ROUTING?
 * Single Page Application (SPA) = One HTML file
 * But users expect multiple "pages"
 * 
 * ANALOGY: TV channels
 * - One TV (one HTML file)
 * - Multiple channels (different views/components)
 * - Remote control (React Router)
 * - Change channel without turning TV off/on
 * 
 * WITHOUT REACT ROUTER:
 * - One URL: myapp.com
 * - Can't bookmark specific view
 * - Can't use browser back/forward
 * - Poor user experience
 * 
 * WITH REACT ROUTER:
 * - Multiple URLs: /home, /about, /products
 * - Bookmarkable
 * - Browser history works
 * - Better UX
 * 
 * CLIENT-SIDE ROUTING:
 * - No page reload
 * - Fast navigation
 * - JavaScript handles route changes
 * - Components swap out dynamically
 */

/* ============================================================
   2. Installation and Setup
   ============================================================ */

/**
 * INSTALLATION:
 * npm install react-router-dom
 * 
 * BASIC SETUP:
 * Wrap app in BrowserRouter
 */

function App() {
  return (
    <BrowserRouter>
      {/* Your routes go here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

/**
 * KEY COMPONENTS:
 * ---------------
 * BrowserRouter: Router wrapper (uses HTML5 history API)
 * Routes: Container for all Route components
 * Route: Defines path and component to render
 * Link: Navigation (like <a> but doesn't reload)
 * Navigate: Programmatic navigation
 */

/* ============================================================
   3. Basic Routing
   ============================================================ */

/**
 * SIMPLE ROUTING EXAMPLE
 * ----------------------
 */

// Components
function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function Contact() {
  return <h1>Contact Page</h1>;
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

// App with routes
function BasicRoutingApp() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all */}
      </Routes>
    </BrowserRouter>
  );
}

/**
 * HOW IT WORKS:
 * -------------
 * 1. User clicks <Link to="/about">
 * 2. URL changes to /about (no page reload!)
 * 3. React Router matches path="/about"
 * 4. Renders <About /> component
 * 5. Other components unmount
 */

/* ============================================================
   4. Route Parameters
   ============================================================ */

/**
 * DYNAMIC ROUTES
 * --------------
 * Use :parameter for dynamic segments
 */

function UserProfile() {
  // Extract parameter from URL
  const { userId } = useParams();
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {userId}</p>
    </div>
  );
}

function BlogPost() {
  const { postId } = useParams();
  
  // Fetch post data using postId
  return (
    <div>
      <h1>Blog Post #{postId}</h1>
    </div>
  );
}

function RouteParamsApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dynamic parameter */}
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="/blog/:postId" element={<BlogPost />} />
        
        {/* Multiple parameters */}
        <Route path="/user/:userId/post/:postId" element={<UserPost />} />
      </Routes>
    </BrowserRouter>
  );
}

/**
 * EXAMPLES:
 * ---------
 * /user/123        → userId = "123"
 * /user/alice      → userId = "alice"
 * /blog/42         → postId = "42"
 * /user/5/post/10  → userId = "5", postId = "10"
 */

/* ============================================================
   5. Navigation (Link, useNavigate)
   ============================================================ */

/**
 * LINK COMPONENT
 * --------------
 * Declarative navigation (like <a>)
 */

function Navigation() {
  return (
    <nav>
      {/* Basic link */}
      <Link to="/">Home</Link>
      
      {/* With parameters */}
      <Link to="/user/123">User 123</Link>
      
      {/* With state */}
      <Link to="/about" state={{ from: 'homepage' }}>
        About
      </Link>
      
      {/* Replace (don't add to history) */}
      <Link to="/login" replace>
        Login
      </Link>
    </nav>
  );
}

/**
 * useNavigate HOOK
 * ----------------
 * Programmatic navigation
 */

function LoginForm() {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Login logic...
    const success = await login();
    
    if (success) {
      // Navigate to dashboard
      navigate('/dashboard');
      
      // Navigate with state
      // navigate('/dashboard', { state: { username: 'Alice' } });
      
      // Navigate back
      // navigate(-1);
      
      // Replace (no back button)
      // navigate('/dashboard', { replace: true });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  );
}

/* ============================================================
   6. Nested Routes
   ============================================================ */

/**
 * NESTED ROUTING
 * --------------
 * Routes within routes
 */

// Layout component with Outlet
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/settings">Settings</Link>
        <Link to="/dashboard/posts">Posts</Link>
      </nav>
      
      {/* Child routes render here */}
      <Outlet />
    </div>
  );
}

function Profile() {
  return <h2>Profile</h2>;
}

function Settings() {
  return <h2>Settings</h2>;
}

function Posts() {
  return <h2>Posts</h2>;
}

function NestedRoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent route */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Child routes */}
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="posts" element={<Posts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

/**
 * URL STRUCTURE:
 * --------------
 * /dashboard          → Dashboard only
 * /dashboard/profile  → Dashboard + Profile
 * /dashboard/settings → Dashboard + Settings
 */

/* ============================================================
   7. Protected Routes
   ============================================================ */

/**
 * AUTHENTICATION
 * --------------
 * Redirect if not authenticated
 */

function ProtectedRoute({ children }) {
  const isAuthenticated = checkAuth(); // Your auth logic
  
  if (!isAuthenticated) {
    // Redirect to login
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Usage
function ProtectedRoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

/**
 * HOW IT WORKS:
 * -------------
 * 1. User tries to access /dashboard
 * 2. ProtectedRoute checks authentication
 * 3. If not authenticated → Redirect to /login
 * 4. If authenticated → Render Dashboard
 */

/* ============================================================
   8. Common Patterns
   ============================================================ */

/**
 * PATTERN 1: Layout Component
 * ----------------------------
 */

function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
      
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  );
}

function LayoutApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

/**
 * PATTERN 2: Loading State
 * -------------------------
 */

function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);
  
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

/**
 * PATTERN 3: Breadcrumbs
 * ----------------------
 */

function Breadcrumbs() {
  return (
    <nav>
      <Link to="/">Home</Link> /
      <Link to="/products">Products</Link> /
      <span>Product Details</span>
    </nav>
  );
}

/**
 * PATTERN 4: Active Link Styling
 * -------------------------------
 */

function NavLink({ to, children }) {
  // Check if link is active
  const isActive = window.location.pathname === to;
  
  return (
    <Link 
      to={to}
      style={{
        color: isActive ? 'blue' : 'black',
        fontWeight: isActive ? 'bold' : 'normal'
      }}
    >
      {children}
    </Link>
  );
}

/**
 * ============================================================
 * Complete Example App
 * ============================================================
 */

function CompleteApp() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          
          {/* Products */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          
          {/* Static pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

/**
 * ============================================================
 * Key Takeaways
 * ============================================================
 *
 * 1. React Router enables client-side routing
 * 2. BrowserRouter wraps entire app
 * 3. Routes container holds all Route components
 * 4. Route defines path and component
 * 5. Link for navigation (no page reload)
 * 6. useNavigate for programmatic navigation
 * 7. useParams to access URL parameters
 * 8. Outlet for nested routes
 * 9. Navigate component for redirects
 * 10. Protect routes with authentication checks
 *
 * ============================================================
 * End of File
 * ============================================================
 */

// Placeholder functions
function checkAuth() { return true; }
function login() { return Promise.resolve(true); }
function HomePage() { return <h1>Home</h1>; }
function ProductList() { return <h1>Products</h1>; }
function ProductDetails() { return <h1>Product Details</h1>; }
function AboutPage() { return <h1>About</h1>; }
function ContactPage() { return <h1>Contact</h1>; }
function LoginPage() { return <h1>Login</h1>; }
function RegisterPage() { return <h1>Register</h1>; }
function DashboardPage() { return <h1>Dashboard</h1>; }
function NotFoundPage() { return <h1>404 Not Found</h1>; }
function Login() { return <h1>Login</h1>; }
function UserPost() { return <h1>User Post</h1>; }
