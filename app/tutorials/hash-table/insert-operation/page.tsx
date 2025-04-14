import { CodeBlock } from "@/components/code-block"
import { HashTableTutorialLayout } from "@/components/hash-table-tutorial-layout"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function HashTableInsertOperationPage() {
  return (
    <HashTableTutorialLayout
      title="Hash Table Insert Operation"
      description="Learn how to insert key-value pairs into a hash table"
      currentStep={2}
      totalSteps={5}
      prevHref="/tutorials/hash-table/introduction"
      nextHref="/tutorials/hash-table/delete-operation"
    >
      <div className="space-y-6 text-white">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Understanding the Insert Operation</h2>
          <p>
            The insert operation (often called <code className="bg-black/30 px-1 rounded">set</code> or{" "}
            <code className="bg-black/30 px-1 rounded">put</code>) adds a new key-value pair to the hash table. This
            operation involves:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Computing the hash code for the key</li>
            <li>Mapping the hash code to an index in the array</li>
            <li>Storing the key-value pair at that index, handling any collisions</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Insert with Separate Chaining</h2>
          <p>
            With separate chaining, each bucket contains a linked list (or another data structure) of entries. When
            inserting a new key-value pair:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Compute the index using the hash function</li>
            <li>
              Check if the key already exists in the chain at that index
              <ul className="list-disc list-inside pl-4">
                <li>If it exists, update the value</li>
                <li>If not, append a new key-value pair to the chain</li>
              </ul>
            </li>
          </ol>

          <div className="mt-4">
            <CodeBlock
              code={`class HashTable {
  constructor(size = 53) {
    this.keyMap = Array(size).fill().map(() => []);
  }

  _hash(key) {
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    // Step 1: Compute the index using the hash function
    const index = this._hash(key);
    
    // Step 2: Check if the key already exists
    for (let i = 0; i < this.keyMap[index].length; i++) {
      if (this.keyMap[index][i][0] === key) {
        // Update the value if the key exists
        this.keyMap[index][i][1] = value;
        return;
      }
    }
    
    // Step 3: If the key doesn't exist, add a new key-value pair
    this.keyMap[index].push([key, value]);
    return this;
  }
}`}
              language="javascript"
            />
          </div>

          <div className="bg-black/20 p-4 rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">Key Points</h3>
            <ul className="list-disc list-inside pl-4">
              <li>We first check if the key already exists to avoid duplicates</li>
              <li>If the key exists, we update its value</li>
              <li>If the key doesn't exist, we add a new entry to the chain</li>
              <li>
                The time complexity is O(1) on average, but could be O(n) in the worst case if all keys hash to the same
                index
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Insert with Open Addressing</h2>
          <p>
            With open addressing, all entries are stored directly in the bucket array. When a collision occurs, we
            search for another empty slot according to a probing sequence.
          </p>

          <h3 className="text-xl font-semibold mt-4">Linear Probing</h3>
          <p>
            In linear probing, if a collision occurs at index i, we try index (i+1), then (i+2), and so on until we find
            an empty slot.
          </p>

          <div className="mt-4">
            <CodeBlock
              code={`class HashTableLinearProbing {
  constructor(size = 53) {
    this.keyMap = Array(size).fill(null);
    this.size = 0;
  }

  _hash(key) {
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    // Check if we need to resize
    if (this.size >= this.keyMap.length * 0.7) {
      this._resize();
    }

    // Step 1: Compute the initial index
    let index = this._hash(key);
    
    // Step 2: Find an available slot using linear probing
    while (this.keyMap[index] !== null) {
      // If the key already exists, update the value
      if (this.keyMap[index][0] === key) {
        this.keyMap[index][1] = value;
        return this;
      }
      
      // Move to the next slot (linear probing)
      index = (index + 1) % this.keyMap.length;
    }
    
    // Step 3: Insert the key-value pair in the empty slot
    this.keyMap[index] = [key, value];
    this.size++;
    return this;
  }

  _resize() {
    // Create a new array with double the size
    const oldKeyMap = this.keyMap;
    this.keyMap = Array(oldKeyMap.length * 2).fill(null);
    this.size = 0;
    
    // Reinsert all existing key-value pairs
    for (let i = 0; i < oldKeyMap.length; i++) {
      if (oldKeyMap[i] !== null) {
        this.set(oldKeyMap[i][0], oldKeyMap[i][1]);
      }
    }
  }
}`}
              language="javascript"
            />
          </div>

          <div className="bg-black/20 p-4 rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">Key Points</h3>
            <ul className="list-disc list-inside pl-4">
              <li>We check if the load factor exceeds a threshold (typically 0.7) before inserting</li>
              <li>If the load factor is too high, we resize the hash table to maintain performance</li>
              <li>We use linear probing to find the next available slot in case of a collision</li>
              <li>If the key already exists, we update its value</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Handling Duplicates</h2>
          <p>When inserting a key that already exists in the hash table, there are two common approaches:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Update the Value</h3>
              <p>
                Replace the existing value with the new one. This is the most common approach and is shown in the
                examples above.
              </p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Allow Duplicates</h3>
              <p>
                Store multiple values for the same key, typically in a list. This is less common but useful for certain
                applications like multisets.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Resizing the Hash Table</h2>
          <p>
            As the hash table fills up, its performance can degrade. To maintain efficiency, we resize the hash table
            when the load factor exceeds a certain threshold.
          </p>
          <div className="bg-black/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">Resizing Process</h3>
            <ol className="list-decimal list-inside space-y-2 pl-4">
              <li>Create a new array with a larger capacity (typically double the size)</li>
              <li>Rehash all existing key-value pairs into the new array</li>
              <li>Replace the old array with the new one</li>
            </ol>
            <p className="mt-2 text-sm text-white/70">
              Note: Resizing is an expensive operation (O(n) time complexity), but it happens infrequently enough that
              the amortized cost remains O(1) per operation.
            </p>
          </div>
        </section>

        <section className="space-y-5 mt-8">
          <h2 className="text-2xl font-bold">Practice Exercises</h2>
          <p>Test your understanding of hash table insertion with these interactive exercises:</p>

          <InteractiveExercise
            question="What happens when you insert a key that already exists in a hash table?"
            options={[
              "It creates a duplicate entry",
              "It replaces the existing value with the new value",
              "It throws an error",
              "It adds the new value to an array of values for that key",
            ]}
            correctAnswer={1}
            explanation="By default, when you insert a key that already exists in a hash table, the existing value is replaced with the new value. This ensures that each key in the hash table is unique."
            className="mt-6"
          />

          <InteractiveExercise
            question="What is the average time complexity of inserting a key-value pair into a hash table?"
            options={["O(n)", "O(log n)", "O(1)", "O(n log n)"]}
            correctAnswer={2}
            explanation="The average time complexity of inserting a key-value pair into a hash table is O(1) - constant time. This is what makes hash tables so efficient for lookups and insertions. However, in the worst case (when there are many collisions), it could degrade to O(n)."
            className="mt-6"
          />
        </section>

        <div className="bg-black/20 p-4 rounded-lg mt-6">
          <h3 className="text-xl font-semibold mb-2 text-purple-300">Next Steps</h3>
          <p>
            Now that you understand how to insert key-value pairs into a hash table, let's move on to the delete
            operation. Deleting entries from a hash table requires careful handling, especially with open addressing, to
            maintain the integrity of the data structure.
          </p>
        </div>
      </div>
    </HashTableTutorialLayout>
  )
}
