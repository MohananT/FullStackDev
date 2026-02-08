/**
 * ============================================================
 * DOM Events - Event Handling in JavaScript
 * ============================================================
 *
 * Topics covered:
 * 1. Event listeners
 * 2. Common events
 * 3. Event object
 * 4. Event delegation
 * 5. Preventing defaults
 * 6. Real-world examples
 *
 * ============================================================
 */

/* ============================================================
   1. Event Listeners
   ============================================================ */

const button = document.querySelector("#myButton");

// addEventListener() - modern way (preferred)
button.addEventListener("click", function(event) {
  console.log("Button clicked!");
  console.log(event.target); // element that triggered event
});

// Arrow function
button.addEventListener("click", (e) => {
  console.log("Clicked", e);
});

// Named function (can be removed later)
function handleClick(event) {
  console.log("Handled click");
}

button.addEventListener("click", handleClick);

// Remove event listener
button.removeEventListener("click", handleClick);

// Event listener options
button.addEventListener("click", handleClick, {
  once: true,      // run only once
  capture: false,  // bubble phase (default)
  passive: true    // won't call preventDefault()
});

/* ============================================================
   2. Common Events
   ============================================================ */

console.log("=== Mouse Events ===");

const box = document.querySelector(".box");

// Click events
box.addEventListener("click", () => console.log("Click"));
box.addEventListener("dblclick", () => console.log("Double click"));
box.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // prevent right-click menu
  console.log("Right click");
});

// Mouse movement
box.addEventListener("mouseenter", () => console.log("Mouse entered"));
box.addEventListener("mouseleave", () => console.log("Mouse left"));
box.addEventListener("mouseover", () => console.log("Mouse over"));
box.addEventListener("mouseout", () => console.log("Mouse out"));

box.addEventListener("mousemove", (e) => {
  console.log(`Position: ${e.clientX}, ${e.clientY}`);
});

// Mouse buttons
box.addEventListener("mousedown", () => console.log("Mouse down"));
box.addEventListener("mouseup", () => console.log("Mouse up"));

console.log("=== Keyboard Events ===");

const input = document.querySelector("input");

// Key events
input.addEventListener("keydown", (e) => {
  console.log(`Key down: ${e.key}`);
});

input.addEventListener("keyup", (e) => {
  console.log(`Key up: ${e.key}`);
});

input.addEventListener("keypress", (e) => {
  console.log(`Key press: ${e.key}`); // deprecated
});

// Check specific keys
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("Enter pressed!");
  }

  if (e.key === "Escape") {
    console.log("Escape pressed!");
  }

  // Modifier keys
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    console.log("Ctrl+S pressed");
  }

  if (e.shiftKey) {
    console.log("Shift is held");
  }

  if (e.altKey) {
    console.log("Alt is held");
  }
});

console.log("=== Form Events ===");

// Input events
input.addEventListener("input", (e) => {
  console.log("Value:", e.target.value); // fires on every change
});

input.addEventListener("change", (e) => {
  console.log("Changed:", e.target.value); // fires on blur
});

input.addEventListener("focus", () => {
  console.log("Input focused");
});

input.addEventListener("blur", () => {
  console.log("Input lost focus");
});

// Form submission
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload
  console.log("Form submitted");

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data);
});

console.log("=== Window Events ===");

// Page load
window.addEventListener("load", () => {
  console.log("Page fully loaded");
});

// DOM content loaded (faster, doesn't wait for images)
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready");
});

// Before unload (leaving page)
window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = ""; // show confirmation dialog
});

// Scroll
window.addEventListener("scroll", () => {
  console.log("Scroll position:", window.scrollY);
});

// Resize
window.addEventListener("resize", () => {
  console.log("Window size:", window.innerWidth, window.innerHeight);
});

/* ============================================================
   3. Event Object
   ============================================================ */

button.addEventListener("click", (event) => {
  // Target - element that triggered event
  console.log(event.target);

  // CurrentTarget - element with listener attached
  console.log(event.currentTarget);

  // Type
  console.log(event.type); // "click"

  // Timestamp
  console.log(event.timeStamp);

  // Mouse position
  console.log(event.clientX, event.clientY);   // relative to viewport
  console.log(event.pageX, event.pageY);       // relative to page
  console.log(event.screenX, event.screenY);   // relative to screen

  // Keyboard
  console.log(event.key);        // key name
  console.log(event.code);       // physical key code
  console.log(event.keyCode);    // deprecated

  // Modifiers
  console.log(event.ctrlKey);
  console.log(event.shiftKey);
  console.log(event.altKey);
  console.log(event.metaKey);    // Cmd/Windows key
});

/* ============================================================
   4. Event Delegation
   ============================================================ */

/**
 * Instead of adding listeners to many elements,
 * add one listener to a parent
 */

console.log("=== Event Delegation ===");

const list = document.querySelector("#list");

// ❌ Bad: add listener to each item
// const items = document.querySelectorAll("li");
// items.forEach(item => {
//   item.addEventListener("click", handleItemClick);
// });

// ✅ Good: event delegation (single listener on parent)
list.addEventListener("click", (e) => {
  // Check if clicked element is an li
  if (e.target.tagName === "LI") {
    console.log("List item clicked:", e.target.textContent);
    e.target.classList.toggle("selected");
  }
});

// Works for dynamically added elements!
const newItem = document.createElement("li");
newItem.textContent = "New item";
list.appendChild(newItem); // automatically gets event handling

// More robust check with closest()
list.addEventListener("click", (e) => {
  const item = e.target.closest("li"); // find closest li parent
  if (item && list.contains(item)) {
    console.log("Item:", item.textContent);
  }
});

// Delegate button clicks
const container = document.querySelector("#button-container");

container.addEventListener("click", (e) => {
  if (e.target.matches("button.delete")) {
    console.log("Delete button clicked");
  }

  if (e.target.matches("button.edit")) {
    console.log("Edit button clicked");
  }
});

/* ============================================================
   5. Preventing Defaults & Propagation
   ============================================================ */

// Prevent default behavior
const link = document.querySelector("a");

link.addEventListener("click", (e) => {
  e.preventDefault(); // don't follow link
  console.log("Link clicked but not followed");
});

form.addEventListener("submit", (e) => {
  e.preventDefault(); // don't submit form
  console.log("Form submitted via JS");
});

// Stop propagation (prevent bubbling)
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

parent.addEventListener("click", () => {
  console.log("Parent clicked");
});

child.addEventListener("click", (e) => {
  e.stopPropagation(); // don't trigger parent handler
  console.log("Child clicked");
});

// Stop immediate propagation (stop other handlers on same element)
button.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
  console.log("First handler - others won't run");
});

button.addEventListener("click", () => {
  console.log("This won't run");
});

/* ============================================================
   6. Real-World Examples
   ============================================================ */

// Example 1: Toggle menu
const menuButton = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu");

menuButton?.addEventListener("click", () => {
  menu.classList.toggle("open");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
    menu.classList.remove("open");
  }
});

// Example 2: Form validation
const emailInput = document.querySelector('input[type="email"]');
const submitBtn = document.querySelector('button[type="submit"]');

emailInput?.addEventListener("input", (e) => {
  const isValid = e.target.value.includes("@");

  if (isValid) {
    e.target.classList.remove("invalid");
    e.target.classList.add("valid");
    submitBtn.disabled = false;
  } else {
    e.target.classList.remove("valid");
    e.target.classList.add("invalid");
    submitBtn.disabled = true;
  }
});

// Example 3: Debounced search
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const searchInput = document.querySelector("#search");
const searchHandler = debounce((value) => {
  console.log("Searching for:", value);
  // Make API call here
}, 300);

searchInput?.addEventListener("input", (e) => {
  searchHandler(e.target.value);
});

// Example 4: Drag and drop
const draggable = document.querySelector(".draggable");

draggable?.addEventListener("dragstart", (e) => {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", e.target.innerHTML);
  e.target.classList.add("dragging");
});

draggable?.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
});

const dropzone = document.querySelector(".dropzone");

dropzone?.addEventListener("dragover", (e) => {
  e.preventDefault(); // allow drop
  e.dataTransfer.dropEffect = "move";
});

dropzone?.addEventListener("drop", (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/html");
  e.target.innerHTML = data;
});

// Example 5: Todo list
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

addBtn?.addEventListener("click", () => {
  const text = todoInput.value.trim();

  if (text) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${text}</span>
      <button class="delete">Delete</button>
    `;
    todoList.appendChild(li);
    todoInput.value = "";
  }
});

// Event delegation for delete buttons
todoList?.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

// Add on Enter key
todoInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

/**
 * ============================================================
 * Best Practices
 * ============================================================
 *
 * 1. Use addEventListener (not onclick)
 * 2. Use event delegation for many elements
 * 3. Remove event listeners when not needed
 * 4. Debounce expensive operations (scroll, resize, input)
 * 5. Use passive: true for scroll/touch events
 * 6. Prevent default carefully
 * 7. Cache DOM references
 *
 * ============================================================
 * End of File
 * ============================================================
 */
