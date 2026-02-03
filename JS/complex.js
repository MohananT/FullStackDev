/**
 * ============================================================
 * JavaScript Objects + Arrays – Real-World Examples
 * ============================================================
 *
 * Topics covered:
 * 1. Mapping an array of objects
 * 2. Filtering objects
 * 3. Finding an object
 * 4. Transforming array → object (keyed by id)
 * 5. Grouping data (groupBy pattern)
 * 6. Counting occurrences
 * 7. Merging arrays of objects
 * 8. Removing duplicates (by property)
 * 9. Updating an object inside an array
 * 10. Sorting objects
 *
 * These are patterns used in APIs, React apps, dashboards, etc.
 * ============================================================
 */

const users = [
  { id: 1, name: "Alex", role: "admin", age: 28 },
  { id: 2, name: "Sam", role: "user", age: 22 },
  { id: 3, name: "Jamie", role: "user", age: 30 },
  { id: 4, name: "Taylor", role: "admin", age: 35 },
];

/* ============================================================
   1. Mapping an Array of Objects
   ============================================================ */

// Get only names
const names = users.map((u) => u.name);
console.log(names); // ["Alex", "Sam", "Jamie", "Taylor"]

/* ============================================================
   2. Filtering Objects
   ============================================================ */

// Get only admins
const admins = users.filter((u) => u.role === "admin");
console.log(admins);

/* ============================================================
   3. Finding an Object
   ============================================================ */

const user2 = users.find((u) => u.id === 2);
console.log(user2); // Sam

/* ============================================================
   4. Transform Array → Object (Keyed by ID)
   ============================================================ */

// Very common for fast lookups
const usersById = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

console.log(usersById[3]); // Jamie

/* ============================================================
   5. Grouping Data (groupBy Pattern)
   ============================================================ */

const groupedByRole = users.reduce((acc, user) => {
  const key = user.role;

  if (!acc[key]) {
    acc[key] = [];
  }

  acc[key].push(user);
  return acc;
}, {});

console.log(groupedByRole);
/*
{
  admin: [...],
  user: [...]
}
*/

/* ============================================================
   6. Counting Occurrences
   ============================================================ */

const roleCount = users.reduce((acc, user) => {
  acc[user.role] = (acc[user.role] || 0) + 1;
  return acc;
}, {});

console.log(roleCount); // { admin: 2, user: 2 }

/* ============================================================
   7. Merging Arrays of Objects
   ============================================================ */

const updates = [
  { id: 2, age: 23 },
  { id: 3, role: "admin" },
];

const merged = users.map((user) => {
  const update = updates.find((u) => u.id === user.id);
  return update ? { ...user, ...update } : user;
});

console.log(merged);

/* ============================================================
   8. Removing Duplicates (by property)
   ============================================================ */

const duplicateUsers = [
  { id: 1, name: "Alex" },
  { id: 2, name: "Sam" },
  { id: 1, name: "Alex" },
];

const uniqueUsers = Object.values(
  duplicateUsers.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {})
);

console.log(uniqueUsers);

/* ============================================================
   9. Updating an Object Inside an Array
   ============================================================ */

const updatedUsers = users.map((user) =>
  user.id === 2 ? { ...user, name: "Samuel" } : user
);

console.log(updatedUsers);

/* ============================================================
   10. Sorting Objects
   ============================================================ */

// By age ascending
const sortedByAge = [...users].sort((a, b) => a.age - b.age);
console.log(sortedByAge);

// By name alphabetically
const sortedByName = [...users].sort((a, b) => a.name.localeCompare(b.name));
console.log(sortedByName);

/**
 * ============================================================
 * End of File
 * ============================================================
 */
