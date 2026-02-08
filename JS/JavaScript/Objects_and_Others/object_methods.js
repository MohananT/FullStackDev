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

/**
 * Object.assign(target, ...sources)
 *
 * PURPOSE:
 * Copies properties from one or more source objects into a target object.
 *
 * IMPORTANT BEHAVIOR:
 * - It performs a SHALLOW COPY (nested objects are still references).
 * - If multiple objects have the same key, later ones overwrite earlier ones.
 * - We pass {} as the first argument to avoid mutating `user`.
 */

// Merge objects into a NEW object
const profile = Object.assign({}, user, details);

console.log(profile); // { name: "Alex", age: 30, country: "Canada" }

/* ============================================================
   2. Spread Operator with Objects (...)
   ============================================================ */

const base = { a: 1, b: 2 };
const extra = { c: 3 };

/**
 * Spread syntax for objects is the modern, cleaner alternative
 * to Object.assign() for copying and merging.
 *
 * { ...obj } → copies properties into a new object
 *
 * Order matters:
 * { ...obj1, ...obj2 } → obj2 can overwrite keys from obj1
 */

// Modern way to copy + merge
const combined = { ...base, ...extra };

console.log(combined); // { a:1, b:2, c:3 }

/* ============================================================
   3. Object.entries()
   ============================================================ */

const settings = { theme: "dark", debug: true };

/**
 * Object.entries(obj)
 *
 * Converts an object into an ARRAY of [key, value] pairs.
 *
 * This is extremely useful when:
 * - Looping over objects
 * - Transforming objects
 * - Using array methods like map, filter, reduce
 */

const entries = Object.entries(settings);
console.log(entries);
// [["theme", "dark"], ["debug", true]]

/**
 * Array destructuring inside the loop:
 * [key, value] pulls each pair apart.
 */
entries.forEach(([key, value]) => {
  console.log(key, value);
});

/* ============================================================
   4. Object.values()
   ============================================================ */

/**
 * Object.values(obj)
 *
 * Returns ONLY the values of the object as an array.
 * Keys are discarded.
 */

console.log(Object.values(settings));
// ["dark", true]

/* ============================================================
   5. Object.fromEntries()
   ============================================================ */

const pairs = [
  ["id", 101],
  ["status", "active"],
];

/**
 * Object.fromEntries()
 *
 * Reverse of Object.entries().
 * Converts an array of [key, value] pairs back into an object.
 *
 * Very powerful when transforming objects via array methods.
 */

const objFromPairs = Object.fromEntries(pairs);
console.log(objFromPairs); // { id: 101, status: "active" }

/* ============================================================
   6. Object Destructuring
   ============================================================ */

const person = { firstName: "Sam", age: 25 };

/**
 * Object destructuring lets us pull properties into variables
 * without repeatedly writing `person.firstName`.
 *
 * Variable names must match property names (unless renamed).
 */

const { firstName, age } = person;
console.log(firstName); // "Sam"
console.log(age); // 25

/* ============================================================
   7. Default Values in Destructuring
   ============================================================ */

const config = { mode: "dark" };

/**
 * If the property doesn't exist (is undefined),
 * the default value is used.
 *
 * NOTE: Default is NOT used for null — only undefined.
 */

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

/**
 * Optional chaining (?.)
 *
 * Safely accesses deeply nested properties without throwing
 * "Cannot read property of undefined" errors.
 *
 * If anything before ?. is null or undefined,
 * the expression short-circuits and returns undefined.
 */

// Prevents crash if something is undefined
console.log(data.user?.profile?.name); // "Alex"
console.log(data.user?.address?.city); // undefined

/* ============================================================
   9. Nullish Coalescing (??)
   ============================================================ */

const input = null;

/**
 * ?? returns the right-hand value ONLY if the left side is:
 * - null
 * - undefined
 *
 * Unlike ||, it does NOT treat 0, false, or "" as missing.
 */

const value = input ?? "Default value";
console.log(value); // "Default value"

/* ============================================================
   10. Object.freeze()
   ============================================================ */

const frozenObj = { role: "admin" };

/**
 * Object.freeze(obj)
 *
 * Makes an object IMMUTABLE:
 * - Cannot add properties
 * - Cannot delete properties
 * - Cannot modify existing values
 */

Object.freeze(frozenObj);

// This will fail silently (or error in strict mode)
frozenObj.role = "user";

console.log(frozenObj.role); // "admin"

/* ============================================================
   11. Object.seal()
   ============================================================ */

const sealedObj = { score: 10 };

/**
 * Object.seal(obj)
 *
 * Middle ground between normal and frozen:
 * - Cannot add new properties
 * - Cannot delete properties
 * - CAN modify existing properties
 */

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

/**
 * "in" operator:
 * Checks BOTH own properties AND inherited ones.
 */
console.log("a" in child); // true (inherited from parent)

/**
 * hasOwnProperty():
 * Checks ONLY properties directly on the object itself.
 */
console.log(child.hasOwnProperty("a")); // false (not own property)
console.log(child.hasOwnProperty("b")); // true

/**
 * ============================================================
 * End of File
 * ============================================================
 */
