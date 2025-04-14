import { CodeBlock } from "@/components/code-block"
import { HashTableTutorialLayout } from "@/components/hash-table-tutorial-layout"

export default function HashTableIntroductionPage() {
  return (
    <HashTableTutorialLayout
      title="Introduction to Hash Tables"
      description="Learn the fundamentals of hash tables and how they work"
      currentStep={1}
      totalSteps={5}
      nextHref="/tutorials/hash-table/insert-operation"
    >
      <div className="space-y-6 text-white">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">What is a Hash Table?</h2>
          <p>
            A hash table (also known as a hash map) is a data structure that implements an associative array abstract
            data type, a structure that can map keys to values. It uses a hash function to compute an index into an
            array of buckets or slots, from which the desired value can be found.
          </p>
          <p>
            Hash tables are designed to be extremely efficient for lookup, insertion, and deletion operations, typically
            achieving O(1) time complexity on average.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Key Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Hash Function</h3>
              <p>
                Converts keys into array indices. A good hash function distributes keys uniformly across the array to
                minimize collisions.
              </p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Buckets/Slots</h3>
              <p>
                The array elements where key-value pairs are stored. Each bucket can hold a single entry or multiple
                entries (in case of collisions).
              </p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Collision Resolution</h3>
              <p>Strategies for handling situations when two different keys hash to the same index.</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Load Factor</h3>
              <p>
                The ratio of the number of stored entries to the number of buckets, which affects performance and memory
                usage.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">How Hash Tables Work</h2>
          <p>When you want to store a key-value pair in a hash table:</p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>The hash function computes a hash code for the key</li>
            <li>The hash code is mapped to an index in the array</li>
            <li>The key-value pair is stored at that index</li>
          </ol>
          <p>When you want to retrieve a value by its key:</p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>The hash function computes the same hash code for the key</li>
            <li>The hash code is mapped to the same index in the array</li>
            <li>The value is retrieved from that index</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Collision Handling</h2>
          <p>
            Collisions occur when two different keys hash to the same index. There are several strategies to handle
            collisions:
          </p>
          <div className="space-y-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Separate Chaining</h3>
              <p>
                Each bucket contains a linked list of entries. When a collision occurs, the new entry is appended to the
                list.
              </p>
              <div className="mt-2">
                <CodeBlock
                  code={`// Simplified separate chaining implementation
class HashTable {
  constructor(size = 53) {
    this.keyMap = Array(size).fill().map(() => []);
  }

  _hash(key) {
    // Simple hash function
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * PRIME + value) % this.keyMap.length;
    }
    return total;
  }
}`}
                  language="javascript"
                />
              </div>
            </div>

            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Open Addressing</h3>
              <p>
                When a collision occurs, the algorithm searches for the next available slot in the array. Common probing
                techniques include:
              </p>
              <ul className="list-disc list-inside pl-4 mt-2">
                <li>Linear Probing: Check the next slot sequentially</li>
                <li>Quadratic Probing: Check slots at quadratic distances</li>
                <li>Double Hashing: Use a second hash function to determine the step size</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Basic Hash Table Implementation</h2>
          <p>Here's a simple implementation of a hash table using separate chaining:</p>
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
    const index = this._hash(key);
    this.keyMap[index].push([key, value]);
    return index;
  }

  get(key) {
    const index = this._hash(key);
    for (let i = 0; i < this.keyMap[index].length; i++) {
      if (this.keyMap[index][i][0] === key) {
        return this.keyMap[index][i][1];
      }
    }
    return undefined;
  }
}`}
            language="javascript"
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Time Complexity</h2>
          <p>Hash tables offer excellent performance characteristics:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black/30">
                  <th className="border border-white/10 p-2 text-left">Operation</th>
                  <th className="border border-white/10 p-2 text-left">Average Case</th>
                  <th className="border border-white/10 p-2 text-left">Worst Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-white/10 p-2">Insert</td>
                  <td className="border border-white/10 p-2">O(1)</td>
                  <td className="border border-white/10 p-2">O(n)</td>
                </tr>
                <tr>
                  <td className="border border-white/10 p-2">Delete</td>
                  <td className="border border-white/10 p-2">O(1)</td>
                  <td className="border border-white/10 p-2">O(n)</td>
                </tr>
                <tr>
                  <td className="border border-white/10 p-2">Search</td>
                  <td className="border border-white/10 p-2">O(1)</td>
                  <td className="border border-white/10 p-2">O(n)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-white/70">
            Note: The worst-case O(n) occurs when all keys hash to the same index, creating a long chain. With a good
            hash function and appropriate load factor, this is extremely rare.
          </p>
        </section>

        <div className="bg-black/20 p-4 rounded-lg mt-6">
          <h3 className="text-xl font-semibold mb-2 text-purple-300">Next Steps</h3>
          <p>In the next sections, we'll explore the core operations of hash tables in detail:</p>
          <ul className="list-disc list-inside pl-4 mt-2">
            <li>Insert Operation: Adding key-value pairs to the hash table</li>
            <li>Delete Operation: Removing entries from the hash table</li>
            <li>Search Operation: Finding values by their keys</li>
          </ul>
        </div>
      </div>
    </HashTableTutorialLayout>
  )
}
