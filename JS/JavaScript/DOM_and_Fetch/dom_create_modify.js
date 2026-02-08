/**
 * ============================================================
 * DOM - Creating & Modifying Elements
 * ============================================================
 *
 * Topics covered:
 * 1. Creating elements
 * 2. Adding/removing elements
 * 3. Modifying content
 * 4. Changing styles
 * 5. Managing classes
 * 6. Attributes
 *
 * ============================================================
 */

/* ============================================================
   1. Creating Elements
   ============================================================ */

// Create element
const newDiv = document.createElement("div");
const newParagraph = document.createElement("p");
const newButton = document.createElement("button");

// Create text node
const textNode = document.createTextNode("Hello World");

// Create document fragment (better performance)
const fragment = document.createDocumentFragment();

/* ============================================================
   2. Adding & Removing Elements
   ============================================================ */

console.log("=== Adding Elements ===");

// appendChild() - adds as last child (old way)
newParagraph.appendChild(textNode);
newDiv.appendChild(newParagraph);
document.body.appendChild(newDiv);

// append() - modern, can add multiple nodes and strings
const container = document.getElementById("container");
container.append("Text ", newParagraph, " more text");

// Multiple elements at once
container.append(newDiv, newButton, "Some text");

// prepend() - add as first child
container.prepend(newDiv);

// Insert before/after specific element
const reference = document.querySelector(".reference");
reference.before(newDiv);  // insert before
reference.after(newDiv);   // insert after

// insertAdjacentHTML() - insert HTML at position
element.insertAdjacentHTML("beforebegin", "<p>Before</p>");
element.insertAdjacentHTML("afterbegin", "<p>Start of element</p>");
element.insertAdjacentHTML("beforeend", "<p>End of element</p>");
element.insertAdjacentHTML("afterend", "<p>After</p>");

// insertAdjacentElement() - insert element
const newEl = document.createElement("span");
reference.insertAdjacentElement("beforebegin", newEl);

console.log("=== Removing Elements ===");

// remove() - modern way
const elementToRemove = document.querySelector(".old");
elementToRemove?.remove();

// removeChild() - old way
const parent = element.parentNode;
parent.removeChild(element);

// Replace element
const oldElement = document.querySelector(".old");
const newElement = document.createElement("span");
oldElement?.replaceWith(newElement);

// Clear all children
container.innerHTML = ""; // fast but destroys event listeners
// or
while (container.firstChild) {
  container.removeChild(container.firstChild);
}

/* ============================================================
   3. Modifying Content
   ============================================================ */

const element = document.querySelector("#content");

// innerHTML - gets/sets HTML content (parses HTML)
element.innerHTML = "<strong>Bold text</strong>";
console.log(element.innerHTML);

// textContent - gets/sets text only (no HTML parsing)
element.textContent = "Plain text";
console.log(element.textContent);

// innerText - similar to textContent but respects CSS styling
element.innerText = "Visible text";

/**
 * Differences:
 * - innerHTML: Parses HTML tags
 * - textContent: Returns all text including hidden
 * - innerText: Returns only visible text (slower)
 */

// Example
const div = document.createElement("div");
div.innerHTML = "<p>Hello <span style='display:none'>World</span></p>";

console.log(div.textContent); // "Hello World"
console.log(div.innerText);   // "Hello" (World is hidden)

// WARNING: innerHTML is vulnerable to XSS
// ❌ Dangerous
const userInput = "<img src=x onerror='alert(1)'>";
element.innerHTML = userInput; // XSS attack!

// ✅ Safe
element.textContent = userInput; // displays as text

/* ============================================================
   4. Changing Styles
   ============================================================ */

const box = document.querySelector(".box");

// Inline styles (camelCase property names)
box.style.backgroundColor = "blue";
box.style.fontSize = "20px";
box.style.padding = "10px";
box.style.borderRadius = "5px";

// Multiple styles at once
Object.assign(box.style, {
  color: "white",
  border: "2px solid black",
  margin: "10px"
});

// Get computed style
const computedStyle = window.getComputedStyle(box);
console.log(computedStyle.backgroundColor);
console.log(computedStyle.fontSize);

// Remove style
box.style.backgroundColor = "";

// CSS variables
document.documentElement.style.setProperty("--main-color", "#ff0000");
const mainColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--main-color");

/* ============================================================
   5. Managing Classes
   ============================================================ */

console.log("=== Classes ===");

// Add class
box.classList.add("active");
box.classList.add("highlight", "large"); // multiple

// Remove class
box.classList.remove("active");

// Toggle class (add if absent, remove if present)
box.classList.toggle("active");

// Toggle with condition
box.classList.toggle("active", true);  // always add
box.classList.toggle("active", false); // always remove

// Check if has class
if (box.classList.contains("active")) {
  console.log("Box is active");
}

// Replace class
box.classList.replace("old-class", "new-class");

// Get all classes as string
console.log(box.className); // "box active highlight"

// Set all classes (overwrites)
box.className = "new-class another-class";

/* ============================================================
   6. Attributes
   ============================================================ */

const link = document.querySelector("a");

// Get attribute
const href = link.getAttribute("href");
const target = link.getAttribute("target");

// Set attribute
link.setAttribute("href", "https://example.com");
link.setAttribute("target", "_blank");
link.setAttribute("rel", "noopener noreferrer");

// Remove attribute
link.removeAttribute("target");

// Check if has attribute
if (link.hasAttribute("href")) {
  console.log("Link has href");
}

// Direct property access (for standard attributes)
console.log(link.href);        // full URL
link.href = "https://google.com";

console.log(link.id);
link.id = "my-link";

// Data attributes (data-*)
const user = document.querySelector(".user");
user.setAttribute("data-user-id", "123");
user.setAttribute("data-role", "admin");
user.setAttribute("data-full-name", "John Doe");

// Access via dataset (camelCase conversion)
console.log(user.dataset.userId);     // "123"
console.log(user.dataset.role);       // "admin"
console.log(user.dataset.fullName);   // "John Doe"

// Set via dataset
user.dataset.status = "active";       // sets data-status="active"
user.dataset.loginCount = "5";        // sets data-login-count="5"

/* ============================================================
   Real-World Examples
   ============================================================
 */

// Example 1: Create card component
function createCard(title, description) {
  const card = document.createElement("div");
  card.className = "card";

  const cardTitle = document.createElement("h3");
  cardTitle.textContent = title;

  const cardDesc = document.createElement("p");
  cardDesc.textContent = description;

  card.append(cardTitle, cardDesc);
  return card;
}

// const myCard = createCard("Title", "Description");
// document.body.appendChild(myCard);

// Example 2: Create list from array
function createList(items, className = "list") {
  const ul = document.createElement("ul");
  ul.className = className;

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });

  return ul;
}

// const list = createList(["Apple", "Banana", "Cherry"]);
// document.body.appendChild(list);

// Example 3: Batch DOM updates with fragment
function addManyItems(parent, items) {
  const fragment = document.createDocumentFragment();

  items.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item;
    fragment.appendChild(div);
  });

  parent.appendChild(fragment); // single reflow
}

// Example 4: Clone element
const original = document.querySelector(".template");
const clone = original.cloneNode(true); // true = deep clone
clone.id = "cloned";
document.body.appendChild(clone);

/**
 * ============================================================
 * Best Practices
 * ============================================================
 *
 * 1. Use textContent instead of innerHTML when possible
 * 2. Batch DOM updates using DocumentFragment
 * 3. Cache DOM references
 * 4. Use classList instead of className
 * 5. Sanitize user input before inserting
 * 6. Use data attributes for custom data
 * 7. Prefer creating elements over innerHTML for dynamic content
 *
 * ============================================================
 * End of File
 * ============================================================
 */
