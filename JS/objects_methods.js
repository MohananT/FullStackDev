/**
 * ============================================================
 * JavaScript Objects – Advanced Examples in One File
 * ============================================================
 *
 * Topics covered:
 * 1. Object.assign()
 * 2. Spread operator with objects
 * 3. Object.entries()
 * 4. Object.values()
 * 5. Object.fromEntries()
 * 6. Destructuring objects
 * 7. Default values in destructuring
 * 8. Optional chaining (?.)
 * 9. Nullish coalescing (??)
 * 10. Object.freeze()
 * 11. Object.seal()
 * 12. Checking property existence ("in" vs hasOwnProperty)
 *
 * Real-world style usage for modern JavaScript.
 * ============================================================
 */

/* ============================================================
   1. Object.assign()
   ============================================================ */

const user = { name: "Alex" };
const details = { age: 30, country: "Canada" };

// Merge objects
const profile = Object.assign({}, user, details);

console.log(profile); // { name: "Alex", age: 30, country: "Canada" }

/* ============================================================
   2. Spread Operator with Objects (...)
   ============================================================ */

const base = { a: 1, b: 2 };
const extra = { c: 3 };

// Modern way to copy + merge
const combined = { ...base, ...extra };

console.log(combined); // { a:1, b:2, c:3 }

/* ============================================================
   3. Object.entries()
   ============================================================ */

const settings = { theme: "dark", debug: true };

const entries = Object.entries(settings);
console.log(entries);
// [["theme", "dark"], ["debug", true]]

entries.forEach(([key, value]) => {
  console.log(key, value);
});

/* ============================================================
   4. Object.values()
   ============================================================ */

console.log(Object.values(settings));
// ["dark", true]

/* ============================================================
   5. Object.fromEntries()
   ============================================================ */

const pairs = [
  ["id", 101],
  ["status", "active"],
];

const objFromPairs = Object.fromEntries(pairs);
console.log(objFromPairs); // { id: 101, status: "active" }

/* ============================================================
   6. Object Destructuring
   ============================================================ */

const person = { firstName: "Sam", age: 25 };

const { firstName, age } = person;
console.log(firstName); // "Sam"
console.log(age); // 25

/* ============================================================
   7. Default Values in Destructuring
   ============================================================ */

const config = { mode: "dark" };

const { mode, fontSize = 14 } = config;
console.log(fontSize); // 14 (default used)

/* ============================================================
   8. Optional Chaining (?.)
   ============================================================ */

const data = {
  user: {
    profile: {
      name: "Alex",
    },
  },
};

// Prevents crash if something is undefined
console.log(data.user?.profile?.name); // "Alex"
console.log(data.user?.address?.city); // undefined

/* ============================================================
   9. Nullish Coalescing (??)
   ============================================================ */

const input = null;

const value = input ?? "Default value";
console.log(value); // "Default value"

/* ============================================================
   10. Object.freeze()
   ============================================================ */

const frozenObj = { role: "admin" };

Object.freeze(frozenObj);

// This will fail silently (or error in strict mode)
frozenObj.role = "user";

console.log(frozenObj.role); // "admin"

/* ============================================================
   11. Object.seal()
   ============================================================ */

const sealedObj = { score: 10 };

Object.seal(sealedObj);

sealedObj.score = 20; // allowed (modify existing)
delete sealedObj.score; // NOT allowed

console.log(sealedObj); // { score: 20 }

/* ============================================================
   12. Property Existence: "in" vs hasOwnProperty()
   ============================================================ */

const parent = { a: 1 };
const child = Object.create(parent);
child.b = 2;

console.log("a" in child); // true (includes inherited)
console.log(child.hasOwnProperty("a")); // false (not own property)
console.log(child.hasOwnProperty("b")); // true

/**
 * ============================================================
 * End of File
 * ============================================================
 */
