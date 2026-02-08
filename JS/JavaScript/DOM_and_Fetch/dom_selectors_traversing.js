/**
 * ============================================================
 * DOM Selectors & Traversing
 * ============================================================
 *
 * Topics covered:
 * 1. What is the DOM?
 * 2. Selecting elements
 * 3. Query selectors
 * 4. Traversing the DOM
 * 5. Best practices
 *
 * Note: Run in browser console with HTML page
 *
 * ============================================================
 */

/* ============================================================
   1. What is the DOM?
   ============================================================ */

/**
 * DOM (Document Object Model) is a programming interface
 * that represents HTML/XML as a tree of objects
 *
 * Browser parses HTML → Creates DOM tree → JavaScript can manipulate it
 *
 * Example HTML structure:
 * <html>
 *   <body>
 *     <div id="container">
 *       <h1>Title</h1>
 *       <p class="text">Paragraph</p>
 *     </div>
 *   </body>
 * </html>
 */

/* ============================================================
   2. Selecting Elements (Old Methods)
   ============================================================ */

// By ID (returns single element or null)
const container = document.getElementById("container");
console.log(container);

// By class name (returns HTMLCollection - live)
const textElements = document.getElementsByClassName("text");
console.log(textElements);

// By tag name (returns HTMLCollection - live)
const paragraphs = document.getElementsByTagName("p");
console.log(paragraphs);

// HTMLCollection is LIVE - updates automatically
// const divs = document.getElementsByTagName("div");
// console.log(divs.length); // e.g., 3
// document.body.appendChild(document.createElement("div"));
// console.log(divs.length); // now 4 (automatically updated)

/* ============================================================
   3. Query Selectors (Modern - Preferred)
   ============================================================ */

/**
 * querySelector() - returns first match or null
 * querySelectorAll() - returns NodeList (static)
 *
 * Support full CSS selectors
 */

// Select by class
const firstButton = document.querySelector(".btn");

// Select by ID
const title = document.querySelector("#main-title");

// Select by tag
const firstParagraph = document.querySelector("p");

// Select all matches
const allButtons = document.querySelectorAll(".btn");
const allParagraphs = document.querySelectorAll("p");

// NodeList is STATIC - doesn't update
// const divs = document.querySelectorAll("div");
// console.log(divs.length); // e.g., 3
// document.body.appendChild(document.createElement("div"));
// console.log(divs.length); // still 3 (not updated)

// Complex CSS selectors
const specificElement = document.querySelector("div.container > p.active");
const dataElement = document.querySelector('[data-role="admin"]');
const nthChild = document.querySelector("ul li:nth-child(2)");
const notClass = document.querySelector("p:not(.exclude)");

// Multiple selectors
const buttons = document.querySelectorAll("button, .btn, [type='button']");

// Pseudo-classes
const firstChild = document.querySelector("ul li:first-child");
const lastChild = document.querySelector("ul li:last-child");
const evenItems = document.querySelectorAll("li:nth-child(even)");

/* ============================================================
   4. Traversing the DOM
   ============================================================ */

const current = document.querySelector(".current");

// Parent elements
const parent = current.parentElement;
const parentNode = current.parentNode; // can be any node type

console.log(parent);

// Children
const children = current.children; // HTMLCollection (elements only)
const childNodes = current.childNodes; // NodeList (includes text nodes)
const firstChild = current.firstElementChild;
const lastChild = current.lastElementChild;

console.log(children);
console.log(childNodes); // includes text nodes (#text)

// Siblings
const nextSibling = current.nextElementSibling;
const prevSibling = current.previousElementSibling;

console.log(nextSibling);
console.log(prevSibling);

// Closest ancestor (searches up the tree)
const closestDiv = current.closest("div.container");
const closestSection = current.closest("section");

console.log(closestDiv);

// Check if element matches selector
if (current.matches(".current")) {
  console.log("Element matches selector");
}

// Contains check
const container2 = document.querySelector("#container");
const child = document.querySelector(".child");

if (container2.contains(child)) {
  console.log("Container contains child");
}

// Get all ancestors
function getAllParents(element) {
  const parents = [];
  while (element.parentElement) {
    parents.push(element.parentElement);
    element = element.parentElement;
  }
  return parents;
}

// Get all siblings
function getAllSiblings(element) {
  const siblings = [];
  let sibling = element.parentElement.firstElementChild;

  while (sibling) {
    if (sibling !== element) {
      siblings.push(sibling);
    }
    sibling = sibling.nextElementSibling;
  }

  return siblings;
}

/* ============================================================
   5. Best Practices
   ============================================================ */

/**
 * Performance tips
 */

// ✅ Cache DOM queries
const box = document.querySelector(".box");
box.style.color = "red";
box.style.fontSize = "20px";

// ❌ Don't repeat queries
// document.querySelector(".box").style.color = "red";
// document.querySelector(".box").style.fontSize = "20px";

// ✅ Use specific selectors
const userButton = document.querySelector("#user-profile .btn-primary");

// ❌ Avoid overly broad selectors
// const button = document.querySelector("*"); // selects everything

// ✅ Query within context (faster)
const form = document.querySelector("#myForm");
const inputs = form.querySelectorAll("input"); // only searches within form

// ❌ Search entire document
// const inputs = document.querySelectorAll("#myForm input");

// ✅ Use ID when possible (fastest)
const header = document.getElementById("header"); // fastest

// ❌ Query selector for ID (slower)
// const header = document.querySelector("#header");

/**
 * Common patterns
 */

// Check if element exists before using
const element = document.querySelector(".optional");
if (element) {
  element.classList.add("active");
}

// Or use optional chaining
document.querySelector(".optional")?.classList.add("active");

// Convert HTMLCollection/NodeList to array
const divsArray = Array.from(document.querySelectorAll("div"));
// or
const divsArray2 = [...document.querySelectorAll("div")];

// Iterate over elements
document.querySelectorAll(".item").forEach(item => {
  console.log(item.textContent);
});

// Find element by text content
function findByText(selector, text) {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).find(el => el.textContent.trim() === text);
}

// Get element dimensions and position
const rect = element.getBoundingClientRect();
console.log(rect.top, rect.left, rect.width, rect.height);

/**
 * ============================================================
 * Quick Reference
 * ============================================================
 *
 * Old Methods (Avoid):
 * - document.getElementById()
 * - document.getElementsByClassName()
 * - document.getElementsByTagName()
 *
 * Modern Methods (Use):
 * - document.querySelector()
 * - document.querySelectorAll()
 *
 * Traversing:
 * - element.parentElement
 * - element.children
 * - element.nextElementSibling
 * - element.previousElementSibling
 * - element.closest()
 * - element.matches()
 *
 * ============================================================
 * End of File
 * ============================================================
 */
