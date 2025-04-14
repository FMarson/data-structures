import { CodeBlock } from "@/components/code-block"
import { HashTableTutorialLayout } from "@/components/hash-table-tutorial-layout"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function HashTableApplicationsPage() {
  return (
    <HashTableTutorialLayout
      title="Applications of Hash Tables"
      description="Explore real-world use cases and implementations of hash tables"
      currentStep={5}
      totalSteps={5}
      prevHref="/tutorials/hash-table/search-operation"
    >
      <div className="space-y-6 text-white">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Common Applications of Hash Tables</h2>
          <p>
            Hash tables are one of the most versatile and widely used data structures in computer science. Their ability
            to provide fast lookups, insertions, and deletions makes them ideal for many applications:
          </p>
        </section>

        <section className="space-y-4">
          <div className="bg-black/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">1. Database Indexing</h3>
            <p>
              Hash tables are used to create indexes in databases, allowing for quick lookups of records by specific
              fields.
            </p>
            <div className="mt-3">
              <CodeBlock
                code={`// Simplified example of a database index using a hash table
class DatabaseIndex {
  constructor() {
    this.index = new Map(); // JavaScript's built-in hash table
  }

  // Add a record to the index
  addRecord(key, recordId) {
    if (!this.index.has(key)) {
      this.index.set(key, []);
    }
    this.index.get(key).push(recordId);
  }

  // Find records by key
  findRecords(key) {
    return this.index.has(key) ? this.index.get(key) : [];
  }
}`}
                language="javascript"
              />
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">2. Caching</h3>
            <p>
              Hash tables are used to implement caches, storing recently accessed or computed data for quick retrieval.
            </p>
            <div className="mt-3">
              <CodeBlock
                code={`// Simple LRU Cache implementation using a hash table
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // For O(1) lookups
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    
    // Update access order by removing and re-adding
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    // Remove the key to update access order
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // Evict the least recently used item if at capacity
    else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    
    this.cache.set(key, value);
  }
}`}
                language="javascript"
              />
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">3. Symbol Tables in Compilers</h3>
            <p>
              Compilers and interpreters use hash tables to store information about variables, functions, and other
              symbols.
            </p>
            <div className="mt-3">
              <CodeBlock
                code={`// Simplified symbol table for a compiler
class SymbolTable {
  constructor() {
    this.symbols = new Map();
    this.scopes = []; // Stack of scopes
    this.currentScope = 0;
  }

  enterScope() {
    this.scopes.push(this.currentScope);
    this.currentScope = this.symbols.size;
  }

  exitScope() {
    // Remove all symbols added in the current scope
    for (let i = this.currentScope; i < this.symbols.size; i++) {
      const key = Array.from(this.symbols.keys())[i];
      this.symbols.delete(key);
    }
    this.currentScope = this.scopes.pop();
  }

  define(name, type, value) {
    const key = \`\${name}@\${this.currentScope}\`;
    this.symbols.set(key, { type, value });
  }

  lookup(name) {
    // Look for the symbol in the current scope and all parent scopes
    for (let scope = this.currentScope; scope >= 0; scope--) {
      const key = \`\${name}@\${scope}\`;
      if (this.symbols.has(key)) {
        return this.symbols.get(key);
      }
    }
    return null; // Symbol not found
  }
}`}
                language="javascript"
              />
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">4. Implementing Sets and Maps</h3>
            <p>
              Hash tables are the underlying data structure for implementing sets and maps in many programming
              languages.
            </p>
            <div className="mt-3">
              <CodeBlock
                code={`// JavaScript's built-in Set and Map are implemented using hash tables
const set = new Set(); // A collection of unique values
set.add('apple');
set.add('banana');
set.add('apple'); // Duplicate, won't be added
console.log(set.has('apple')); // true
console.log(set.size); // 2

const map = new Map(); // A collection of key-value pairs
map.set('name', 'John');
map.set('age', 30);
console.log(map.get('name')); // 'John'
console.log(map.has('email')); // false`}
                language="javascript"
              />
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">5. Counting Frequencies</h3>
            <p>Hash tables are excellent for counting the frequency of items in a collection.</p>
            <div className="mt-3">
              <CodeBlock
                code={`// Count word frequencies in a text
function countWordFrequencies(text) {
  const words = text.toLowerCase().match(/\\w+/g) || [];
  const frequencies = new Map();
  
  for (const word of words) {
    frequencies.set(word, (frequencies.get(word) || 0) + 1);
  }
  
  return frequencies;
}

const text = "To be or not to be, that is the question.";
const wordFreq = countWordFrequencies(text);
console.log(wordFreq); // Map { 'to' => 2, 'be' => 2, 'or' => 1, 'not' => 1, ... }`}
                language="javascript"
              />
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">6. De-duplication</h3>
            <p>Hash tables can efficiently remove duplicates from a collection by storing only unique values.</p>
            <div className="mt-3">
              <CodeBlock
                code={`// Remove duplicates from an array
function removeDuplicates(array) {
  return [...new Set(array)];
}

const numbers = [1, 2, 3, 2, 1, 4, 5, 4, 3];
console.log(removeDuplicates(numbers)); // [1, 2, 3, 4, 5]`}
                language="javascript"
              />
            </div>
          </div>

          <div className="bg-black/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">7. Two-Sum Problem</h3>
            <p>Hash tables are used to solve the classic "Two-Sum" problem efficiently.</p>
            <div className="mt-3">
              <CodeBlock
                code={`// Find two numbers in an array that add up to a target
function twoSum(nums, target) {
  const numMap = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }
    
    numMap.set(nums[i], i);
  }
  
  return null; // No solution found
}

const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target)); // [0, 1] (2 + 7 = 9)`}
                language="javascript"
              />
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Hash Tables in Different Languages</h2>
          <p>Many programming languages provide built-in hash table implementations:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">JavaScript</h3>
              <ul className="list-disc list-inside pl-4">
                <li>
                  <code className="bg-black/30 px-1 rounded">Map</code> - Key-value pairs with any type of keys
                </li>
                <li>
                  <code className="bg-black/30 px-1 rounded">Set</code> - Collection of unique values
                </li>
                <li>
                  <code className="bg-black/30 px-1 rounded">Object</code> - Simple key-value store with string/symbol
                  keys
                </li>
              </ul>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Python</h3>
              <ul className="list-disc list-inside pl-4">
                <li>
                  <code className="bg-black/30 px-1 rounded">dict</code> - Dictionary for key-value pairs
                </li>
                <li>
                  <code className="bg-black/30 px-1 rounded">set</code> - Collection of unique values
                </li>
                <li>
                  <code className="bg-black/30 px-1 rounded">collections.defaultdict</code> - Dictionary with default
                  values for missing keys
                </li>
                <li>
                  <code className="bg-black/30 px-1 rounded">collections.Counter</code> - Dictionary for counting
                  hashable objects
                </li>
              </ul>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Java</h3>
              <ul className="list-disc list-inside pl-4">
                <li>
                  <code className="bg-black/30 px-1 rounded">HashMap</code> - General-purpose map implementation
                </li>
                <li>
                  <code className="bg-black/30 px-1 rounded">HashSet</code> - Set implementation backed by a hash table
                </li>
                <li>
                  <code className="bg-black/30 px-1 rounded">LinkedHashMap</code> - Hash map that maintains insertion
                  order
                </li>
                <li>
                  <code className="bg-black/30 px-1 rounded">ConcurrentHashMap</code> - Thread-safe hash map
                </li>
              </ul>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">C++</h3>
              <ul className="list-disc list-inside pl-4">
                <li>
                  <code className="bg-black/30 px-1 rounded">std::unordered_map</code> - Hash table implementation of
                  map
                </li>
                <li>
                  <code className="bg-black/30 px-1 rounded">std::unordered_set</code> - Hash table implementation of
                  set
                </li>
                <li>
                  <code className="bg-black/30 px-1 rounded">std::unordered_multimap</code> - Hash table with multiple
                  values per key
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Advanced Hash Table Concepts</h2>
          <p>As you continue to work with hash tables, you may encounter these advanced concepts:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Perfect Hashing</h3>
              <p>A technique that guarantees no collisions, typically used when the set of keys is known in advance.</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Consistent Hashing</h3>
              <p>A technique used in distributed systems to minimize rehashing when the number of slots changes.</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Cuckoo Hashing</h3>
              <p>A technique that uses multiple hash functions and guarantees O(1) worst-case lookup time.</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Bloom Filters</h3>
              <p>
                A space-efficient probabilistic data structure that uses hash functions to test whether an element is a
                member of a set.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-5 mt-8">
          <h2 className="text-2xl font-bold">Practice Exercises</h2>
          <p>Test your understanding of hash table applications with these interactive exercises:</p>

          <InteractiveExercise
            question="Which of these is NOT a common application of hash tables?"
            options={[
              "Database indexing",
              "Caching frequently accessed data",
              "Sorting algorithms",
              "Implementing dictionaries and maps",
            ]}
            correctAnswer={2}
            explanation="Sorting algorithms typically do not use hash tables as their primary data structure. Hash tables don't maintain order, making them unsuitable for sorting. Sorting algorithms usually use arrays, linked lists, or tree structures."
            className="mt-6"
          />

          <InteractiveExercise
            question="You're implementing a spell checker that needs to check if words are valid. Which data structure would be most efficient?"
            options={["Sorted array with binary search", "Binary search tree", "Hash table (Set)", "Linked list"]}
            correctAnswer={2}
            explanation="A hash table (Set) would be most efficient for a spell checker. It provides O(1) average time lookups to check if a word exists in the dictionary, which is faster than the O(log n) time of binary search in a sorted array or binary search tree."
            className="mt-6"
          />
        </section>

        <div className="bg-black/20 p-4 rounded-lg mt-6">
          <h3 className="text-xl font-semibold mb-2 text-purple-300">Congratulations!</h3>
          <p>You've completed the Hash Table tutorial! You now understand:</p>
          <ul className="list-disc list-inside pl-4 mt-2">
            <li>What hash tables are and how they work</li>
            <li>How to implement insert, delete, and search operations</li>
            <li>Common applications and use cases for hash tables</li>
            <li>Advanced concepts and variations of hash tables</li>
          </ul>
          <p className="mt-4">
            Hash tables are one of the most important data structures in computer science, and understanding them well
            will help you solve many programming problems efficiently.
          </p>
        </div>
      </div>
    </HashTableTutorialLayout>
  )
}
