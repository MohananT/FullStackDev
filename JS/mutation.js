/**
 * mutable-vs-immutable-arrays.js
 * ==========================================
 * Goal:
 * - Understand what MUTATION is
 * - Understand what IMMUTABILITY is
 * - See SAME operations done both ways
 *
 * Key Rule:
 * Mutation  → changes original array ❌
 * Immutable → returns new array ✅
 */

/* =====================================================
   BASIC CONCEPT
===================================================== */

const original = [1, 2, 3];

console.log("Original:", original);

/**
 * MUTABLE:
 * - Changes the same array in memory
 * - Reference stays the same
 */
original.push(4);

console.log("After mutation:", original); // [1,2,3,4]

/**
 * IMMUTABLE:
 * - Creates a new array
 * - Original stays untouched
 */
const immutableAdd = [...original, 5];

console.log("Original stays:", original);
console.log("New array:", immutableAdd);

/* =====================================================
   ADD ELEMENT
===================================================== */

const addArr = [10, 20, 30];

// ❌ MUTABLE
addArr.push(40);
console.log("Mutable add:", addArr);

// ✅ IMMUTABLE
const addNew = [...addArr, 50];
console.log("Immutable add:", addNew);

/* =====================================================
   REMOVE ELEMENT
===================================================== */

const removeArr = [1, 2, 3, 4];

// ❌ MUTABLE (removes index 1)
removeArr.splice(1, 1);
console.log("Mutable remove:", removeArr);

// ✅ IMMUTABLE
const immutableRemove = removeArr.filter((_, i) => i !== 1);
console.log("Immutable remove:", immutableRemove);

/* =====================================================
   UPDATE / REPLACE ELEMENT
===================================================== */

const updateArr = ["a", "b", "c"];

// ❌ MUTABLE
updateArr[1] = "x";
console.log("Mutable update:", updateArr);

// ✅ IMMUTABLE
const immutableUpdate = updateArr.map((v, i) => (i === 1 ? "y" : v));
console.log("Immutable update:", immutableUpdate);

/* =====================================================
   SORT ARRAY (VERY COMMON TRAP)
===================================================== */

const sortArr = [3, 1, 2];

// ❌ MUTABLE
sortArr.sort((a, b) => a - b);
console.log("Mutable sort:", sortArr);

// ✅ IMMUTABLE (ES2023+)
const immutableSort = sortArr.toSorted((a, b) => b - a);
console.log("Immutable sort:", immutableSort);

/* =====================================================
   REVERSE ARRAY
===================================================== */

const revArr = [1, 2, 3];

// ❌ MUTABLE
revArr.reverse();
console.log("Mutable reverse:", revArr);

// ✅ IMMUTABLE
const immutableReverse = revArr.toReversed();
console.log("Immutable reverse:", immutableReverse);

/* =====================================================
   SLICE vs SPLICE
===================================================== */

const sliceSplice = [10, 20, 30, 40];

// ❌ MUTABLE (splice)
sliceSplice.splice(1, 2);
console.log("After splice:", sliceSplice);

// ✅ IMMUTABLE (slice)
const sliced = sliceSplice.slice(1, 3);
console.log("Slice result:", sliced);

/* =====================================================
   REPLACE ELEMENT (MODERN WAY)
===================================================== */

const replaceArr = [1, 2, 3];

// ❌ MUTABLE
replaceArr[0] = 99;
console.log("Mutable replace:", replaceArr);

// ✅ IMMUTABLE (ES2023+)
const replaced = replaceArr.with(0, 100);
console.log("Immutable replace:", replaced);

/* =====================================================
   REFERENCE PROBLEM (MOST IMPORTANT)
===================================================== */

const refA = [1, 2];
const refB = refA; // same reference

// ❌ MUTATION AFFECTS BOTH
refB.push(3);
console.log("refA:", refA); // changed 😱
console.log("refB:", refB);

// ✅ IMMUTABLE COPY
const refC = [...refA];
refC.push(4);
