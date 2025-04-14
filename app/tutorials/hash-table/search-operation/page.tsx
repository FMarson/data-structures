import { CodeBlock } from "@/components/code-block"
import { HashTableTutorialLayout } from "@/components/hash-table-tutorial-layout"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function HashTableSearchOperationPage() {
  return (
    <HashTableTutorialLayout
      title="Hash Table Search Operation"
      description="Learn how to search for values in a hash table"
      currentStep={4}
      totalSteps={5}
      prevHref="/tutorials/hash-table/delete-operation"
      nextHref="/tutorials/hash-table/applications"
    >
      <div className="space-y-6 text-white">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Understanding the Search Operation</h2>
          <p>
            The search operation (often called <code className="bg-black/30 px-1 rounded">get</code>,{" "}
            <code className="bg-black/30 px-1 rounded">lookup</code>, or{" "}
            <code className="bg-black/30 px-1 rounded">find</code>) retrieves a value associated with a given key. This
            operation involves:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Computing the hash code for the key</li>
            <li>Finding the key-value pair in the hash table</li>
            <li>Returning the associated value (or indicating that the key doesn't exist)</li>
          </ol>
          <p>
            The search operation is what makes hash tables so powerful - it provides O(1) average time complexity for
            lookups, which is much faster than the O(n) time required for searching in unsorted arrays or linked lists.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Search with Separate Chaining</h2>
          <p>With separate chaining, searching for a key involves:</p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Compute the index using the hash function</li>
            <li>Search for the key in the chain at that index</li>
            <li>Return the associated value if found, or undefined if not found</li>
          </ol>

          <div className="mt-4">
            <CodeBlock
              code={`class HashTable {
  // ... constructor and other methods ...

  get(key) {
    // Step 1: Compute the index using the hash function
    const index = this._hash(key);
    
    // Step 2: Search for the key in the chain
    for (let i = 0; i < this.keyMap[index].length; i++) {
      if (this.keyMap[index][i][0] === key) {
        // Step 3: If found, return the associated value
        return this.keyMap[index][i][1];
      }
    }
    
    // If the key is not found, return undefined
    return undefined;
  }
}`}
              language="javascript"
            />
          </div>

          <div className="bg-black/20 p-4 rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">Key Points</h3>
            <ul className="list-disc list-inside pl-4">
              <li>We only need to search within the specific bucket where the key would be stored</li>
              <li>
                The search is O(1) on average, but could be O(n) in the worst case if all keys hash to the same index
              </li>
              <li>
                We return <code className="bg-black/30 px-1 rounded">undefined</code> if the key is not found
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Search with Open Addressing</h2>
          <p>
            With open addressing, searching for a key involves following the same probe sequence used during insertion:
          </p>

          <h3 className="text-xl font-semibold mt-4">Linear Probing Search</h3>
          <p>
            In linear probing, we start at the initial hash index and check each slot sequentially until we find the key
            or an empty slot.
          </p>

          <div className="mt-4">
            <CodeBlock
              code={`class HashTableLinearProbing {
  // ... constructor and other methods ...

  get(key) {
    // Step 1: Compute the initial index
    let index = this._hash(key);
    
    // Step 2: Search for the key using linear probing
    let i = 0;
    while (i < this.keyMap.length) {
      const currentIndex = (index + i) % this.keyMap.length;
      
      // If we find an empty slot, the key doesn't exist
      if (this.keyMap[currentIndex] === null) {
        return undefined;
      }
      
      // Skip tombstones but continue searching
      if (this.keyMap[currentIndex] === this.TOMBSTONE) {
        i++;
        continue;
      }
      
      // If we find the key, return the associated value
      if (this.keyMap[currentIndex][0] === key) {
        return this.keyMap[currentIndex][1];
      }
      
      i++;
    }
    
    // If we've checked all slots and didn't find the key
    return undefined;
  }
}`}
              language="javascript"
            />
          </div>

          <div className="bg-black/20 p-4 rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">Key Points</h3>
            <ul className="list-disc list-inside pl-4">
              <li>We follow the same probe sequence used during insertion</li>
              <li>We stop searching if we encounter an empty slot (not a tombstone)</li>
              <li>We skip tombstones and continue searching</li>
              <li>The search is O(1) on average, but could be O(n) in the worst case</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Additional Search Operations</h2>
          <p>
            Besides the basic <code className="bg-black/30 px-1 rounded">get</code> operation, hash tables often
            implement other useful search-related operations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">contains / has</h3>
              <p>Checks if a key exists in the hash table without retrieving its value.</p>
              <CodeBlock
                code={`contains(key) {
  return this.get(key) !== undefined;
}`}
                language="javascript"
              />
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">keys</h3>
              <p>Returns an array of all keys in the hash table.</p>
              <CodeBlock
                code={`keys() {
  const keysArr = [];
  for (let i = 0; i < this.keyMap.length; i++) {
    if (this.keyMap[i]) {
      for (let j = 0; j < this.keyMap[i].length; j++) {
        keysArr.push(this.keyMap[i][j][0]);
      }
    }
  }
  return keysArr;
}`}
                language="javascript"
              />
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">values</h3>
              <p>Returns an array of all values in the hash table.</p>
              <CodeBlock
                code={`values() {
  const valuesArr = [];
  for (let i = 0; i < this.keyMap.length; i++) {
    if (this.keyMap[i]) {
      for (let j = 0; j < this.keyMap[i].length; j++) {
        valuesArr.push(this.keyMap[i][j][1]);
      }
    }
  }
  return valuesArr;
}`}
                language="javascript"
              />
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">entries</h3>
              <p>Returns an array of all key-value pairs in the hash table.</p>
              <CodeBlock
                code={`entries() {
  const entriesArr = [];
  for (let i = 0; i < this.keyMap.length; i++) {
    if (this.keyMap[i]) {
      for (let j = 0; j < this.keyMap[i].length; j++) {
        entriesArr.push(this.keyMap[i][j]);
      }
    }
  }
  return entriesArr;
}`}
                language="javascript"
              />
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Optimizing Search Performance</h2>
          <p>Several factors affect search performance in hash tables:</p>
          <div className="bg-black/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">Load Factor</h3>
            <p>
              The load factor (ratio of entries to buckets) significantly impacts search performance. A lower load
              factor generally means faster searches but more memory usage.
            </p>
            <ul className="list-disc list-inside pl-4 mt-2">
              <li>For separate chaining, a load factor around 0.7-1.0 is often optimal</li>
              <li>For open addressing, a load factor below 0.7 is recommended</li>
            </ul>
          </div>

          <div className="bg-black/20 p-4 rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">Hash Function Quality</h3>
            <p>
              A good hash function distributes keys uniformly across the buckets, minimizing collisions and improving
              search performance.
            </p>
            <p className="mt-2">For string keys, common techniques include:</p>
            <ul className="list-disc list-inside pl-4 mt-2">
              <li>Polynomial rolling hash functions</li>
              <li>FNV-1a hash</li>
              <li>djb2 hash</li>
            </ul>
          </div>
        </section>

        <section className="space-y-5 mt-8">
          <h2 className="text-2xl font-bold">Practice Exercises</h2>
          <p>Test your understanding of hash table searching with these interactive exercises:</p>

          <InteractiveExercise
            question="What makes hash tables so efficient for lookups compared to arrays or linked lists?"
            options={[
              "They always store data in sorted order",
              "They use binary search internally",
              "They can directly compute the location of a key without scanning the entire structure",
              "They compress the data to make it faster to access",
            ]}
            correctAnswer={2}
            explanation="Hash tables are efficient because they use a hash function to directly compute the location of a key, allowing for O(1) average time lookups without needing to scan the entire data structure. This is in contrast to unsorted arrays or linked lists, which require O(n) time to find an element."
            className="mt-6"
          />

          <InteractiveExercise
            question="In a hash table using open addressing with linear probing, when should a search operation stop?"
            options={[
              "After checking a fixed number of slots",
              "When it finds the key or an empty slot",
              "When it has checked all slots in the table",
              "When it encounters a tombstone",
            ]}
            correctAnswer={1}
            explanation="A search operation should stop when it either finds the key (successful search) or encounters an empty slot (unsuccessful search). Empty slots indicate that the key would have been placed there during insertion if it existed, so we can conclude the key is not in the table."
            className="mt-6"
          />
        </section>

        <div className="bg-black/20 p-4 rounded-lg mt-6">
          <h3 className="text-xl font-semibold mb-2 text-purple-300">Next Steps</h3>
          <p>
            Now that you understand how to search for values in a hash table, let's explore the practical applications
            of hash tables and see how they're used in real-world scenarios.
          </p>
        </div>
      </div>
    </HashTableTutorialLayout>
  )
}
