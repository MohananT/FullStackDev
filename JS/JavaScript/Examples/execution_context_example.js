// ========================= Execution Context Overview =========================
// This program demonstrates how JavaScript creates and uses execution contexts.
//
// 1. Global Execution Context (GEC) is created first.
//    - Memory Creation Phase (Hoisting):
//        * n -> undefined
//        * square -> function definition stored in memory
//        * square1 -> undefined
//        * square2 -> undefined
//    - Execution Phase:
//        * Values are assigned and functions are executed line by line
//
// 2. Each time `square()` is called, a new Function Execution Context (FEC)
//    is created with its own memory and execution phases.
// ============================================================================


// Declare a global variable `n` and assign it the value 2
// During GEC execution phase: n = 2
console.log(n);

// console.log(n)

// console.log(square(3))
// Declare a function `square`
// During memory creation phase, the entire function is hoisted
function square(num) {

    // Local variable `ans` is created inside the function execution context
    // `num` is the argument passed when the function is called
    // ans = num * num
    var ans = num * num;

    // Return the computed value to the caller
    // This ends the current function execution context
    return ans;
}


// Call the function `square` with argument `n` (which is 2)
// A new Function Execution Context is created:
//    num = 2
//    ans = 4
// Returned value (4) is assigned to `square1`
var square1 = square(n);


// Call the function `square` with argument 4
// Another new Function Execution Context is created:
//    num = 4
//    ans = 16
// Returned value (16) is assigned to `square2`
var square2 = square(4);
var n = 2;