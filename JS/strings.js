/**
 * ============================================================
 * JavaScript Strings – Complete Examples in One File
 * ============================================================
 *
 * Topics covered:
 * 1. Creating strings
 * 2. String length
 * 3. Accessing characters
 * 4. toUpperCase() / toLowerCase()
 * 5. trim(), trimStart(), trimEnd()
 * 6. includes(), startsWith(), endsWith()
 * 7. indexOf() / lastIndexOf()
 * 8. slice() vs substring()
 * 9. replace() / replaceAll()
 * 10. split() and join()
 * 11. Template literals
 * 12. repeat()
 *
 * This file is meant for learning and reference.
 * Open it, run it, tweak values, and observe the output.
 * ============================================================
 */

/* ============================================================
   1. Creating Strings
   ============================================================ */

const str1 = "Hello";
const str2 = "World";
const str3 = `JavaScript`;

console.log(str1, str2, str3);

/* ============================================================
   2. String Length
   ============================================================ */

const message = "Hello World";
console.log(message.length); // 11 (includes space)

/* ============================================================
   3. Accessing Characters
   ============================================================ */

const word = "Coding";

console.log(word[0]); // "C"
console.log(word[1]); // "o"
console.log(word.charAt(2)); // "d"

/* ============================================================
   4. toUpperCase() and toLowerCase()
   ============================================================ */

const text = "JavaScript";

console.log(text.toUpperCase()); // "JAVASCRIPT"
console.log(text.toLowerCase()); // "javascript"

/* ============================================================
   5. trim(), trimStart(), trimEnd()
   ============================================================ */

const messy = "   hello world   ";

console.log(messy.trim()); // "hello world"
console.log(messy.trimStart()); // "hello world   "
console.log(messy.trimEnd()); // "   hello world"

/* ============================================================
   6. includes(), startsWith(), endsWith()
   ============================================================ */

const sentence = "I love JavaScript";

console.log(sentence.includes("Java")); // true
console.log(sentence.startsWith("I")); // true
console.log(sentence.endsWith("Script")); // true

/* ============================================================
   7. indexOf() and lastIndexOf()
   ============================================================ */

const data = "banana";

console.log(data.indexOf("a")); // 1 (first match)
console.log(data.lastIndexOf("a")); // 5 (last match)
console.log(data.indexOf("z")); // -1 (not found)

/* ============================================================
   8. slice() vs substring()
   ============================================================ */

const phrase = "JavaScript";

console.log(phrase.slice(0, 4)); // "Java"
console.log(phrase.substring(4, 10)); // "Script"

// slice supports negative indexes
console.log(phrase.slice(-6)); // "Script"

/* ============================================================
   9. replace() and replaceAll()
   ============================================================ */

const greeting = "Hello world world";

console.log(greeting.replace("world", "JS"));
// "Hello JS world" (only first match)

console.log(greeting.replaceAll("world", "JS"));
// "Hello JS JS"

// Using regex (case insensitive)
console.log("HELLO".replace(/hello/i, "Hi")); // "Hi"

/* ============================================================
   10. split() and join()
   ============================================================ */

const csv = "red,green,blue";

// Convert string → array
const colors = csv.split(",");
console.log(colors); // ["red", "green", "blue"]

// Convert array → string
console.log(colors.join(" | ")); // "red | green | blue"

/* ============================================================
   11. Template Literals (String Interpolation)
   ============================================================ */

const name = "Alex";
const age = 28;

const intro = `My name is ${name} and I am ${age} years old.`;
console.log(intro);

/* ============================================================
   12. repeat()
   ============================================================ */

const laugh = "ha";
console.log(laugh.repeat(3)); // "hahaha"

/**
 * ============================================================
 * End of File
 * ============================================================
 */
