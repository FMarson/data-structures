import { CodeBlock } from "@/components/code-block"
import { HashTableTutorialLayout } from "@/components/hash-table-tutorial-layout"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function HashTableDeleteOperationPage() {
  return (
    <HashTableTutorialLayout
      title="Hash Table Delete Operation"
      description="Learn how to remove key-value pairs from a hash table"
      currentStep={3}
      totalSteps={5}
      prevHref="/tutorials/hash-table/insert-operation"
      nextHref="/tutorials/hash-table/search-operation"
    >
      <div className="space-y-6 text-white">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Understanding the Delete Operation</h2>
          <p>
            The delete operation (often called <code className="bg-black/30 px-1 rounded">remove</code>) removes a
            key-value pair from the hash table. This operation involves:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Computing the hash code for the key</li>
            <li>Finding the key-value pair in the hash table</li>
            <li>Removing the entry while maintaining the integrity of the data structure</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Delete with Separate Chaining</h2>
          <p>With separate chaining, deleting an entry is relatively straightforward:</p>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Compute the index using the hash function</li>
            <li>Search for the key in the chain at that index</li>
            <li>If found, remove the entry from the chain</li>
          </ol>

          <div className="mt-4">
            <CodeBlock
              code={`class HashTable {
  // ... constructor and other methods ...

  delete(key) {
    // Step 1: Compute the index using the hash function
    const index = this._hash(key);
    
    // Step 2: Search for the key in the chain
    for (let i = 0; i < this.keyMap[index].length; i++) {
      if (this.keyMap[index][i][0] === key) {
        // Step 3: If found, remove the entry from the chain
        const removedValue = this.keyMap[index][i][1];
        this.keyMap[index].splice(i, 1);
        return removedValue;
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
              <li>We iterate through the chain to find the key</li>
              <li>
                If found, we use <code className="bg-black/30 px-1 rounded">splice</code> to remove the entry from the
                array
              </li>
              <li>We return the removed value to confirm the deletion</li>
              <li>
                If the key is not found, we return <code className="bg-black/30 px-1 rounded">undefined</code>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Delete with Open Addressing</h2>
          <p>
            Deleting entries in an open addressing hash table is more complex. Simply removing an entry can break the
            probe sequences for other keys.
          </p>

          <h3 className="text-xl font-semibold mt-4">The Tombstone Approach</h3>
          <p>
            Instead of setting the slot to <code className="bg-black/30 px-1 rounded">null</code>, we mark it with a
            special "tombstone" value to indicate that an entry was deleted. This preserves the probe sequences for
            other keys.
          </p>

          <div className="mt-4">
            <CodeBlock
              code={`class HashTableLinearProbing {
  constructor(size = 53) {
    this.keyMap = Array(size).fill(null);
    this.size = 0;
    this.TOMBSTONE = Symbol('TOMBSTONE'); // Special marker for deleted entries
  }

  // ... hash and other methods ...

  delete(key) {
    // Step 1: Compute the initial index
    let index = this._hash(key);
    
    // Step 2: Find the key using linear probing
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
      
      // If we find the key, mark the slot as deleted
      if (this.keyMap[currentIndex][0] === key) {
        const value = this.keyMap[currentIndex][1];
        this.keyMap[currentIndex] = this.TOMBSTONE;
        this.size--;
        return value;
      }
      
      i++;
    }
    
    // If we've checked all slots and didn't find the key
    return undefined;
  }

  // The get method also needs to be updated to skip tombstones
  get(key) {
    let index = this._hash(key);
    
    let i = 0;
    while (i < this.keyMap.length) {
      const currentIndex = (index + i) % this.keyMap.length;
      
      if (this.keyMap[currentIndex] === null) {
        return undefined;
      }
      
      if (this.keyMap[currentIndex] === this.TOMBSTONE) {
        i++;
        continue;
      }
      
      if (this.keyMap[currentIndex][0] === key) {
        return this.keyMap[currentIndex][1];
      }
      
      i++;
    }
    
    return undefined;
  }
}`}
              language="javascript"
            />
          </div>

          <div className="bg-black/20 p-4 rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">Key Points</h3>
            <ul className="list-disc list-inside pl-4">
              <li>
                We use a special <code className="bg-black/30 px-1 rounded">TOMBSTONE</code> value to mark deleted
                entries
              </li>
              <li>Tombstones are treated as "deleted" during searches but as "occupied" during insertions</li>
              <li>This preserves the probe sequences for other keys that might have collided</li>
              <li>
                The <code className="bg-black/30 px-1 rounded">get</code> method must be updated to skip tombstones
                during searches
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Lazy Deletion vs. Eager Deletion</h2>
          <p>There are two main approaches to handling deletions in hash tables:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Lazy Deletion</h3>
              <p>
                Mark entries as deleted (using tombstones) but don't physically remove them. This is simpler but can
                lead to wasted space.
              </p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Eager Deletion</h3>
              <p>
                Physically remove entries and potentially rehash other entries to maintain the integrity of the hash
                table. This is more complex but more space-efficient.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Handling Tombstone Accumulation</h2>
          <p>
            Over time, tombstones can accumulate and degrade performance. There are several strategies to address this:
          </p>
          <div className="bg-black/20 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-purple-300">Rehashing</h3>
            <p>
              When the number of tombstones exceeds a certain threshold, rehash the entire table to remove all
              tombstones.
            </p>
            <CodeBlock
              code={`// Add this to the HashTableLinearProbing class
_shouldRehash() {
  // Rehash if tombstones exceed 25% of the table
  const tombstoneCount = this.keyMap.filter(entry => entry === this.TOMBSTONE).length;
  return tombstoneCount > this.keyMap.length * 0.25;
}

set(key, value) {
  // Check if we need to rehash due to tombstones
  if (this._shouldRehash()) {
    this._rehash();
  }
  
  // ... rest of the set method ...
}

_rehash() {
  const oldKeyMap = this.keyMap;
  this.keyMap = Array(oldKeyMap.length).fill(null);
  this.size = 0;
  
  // Reinsert all existing key-value pairs, skipping tombstones
  for (let i = 0; i < oldKeyMap.length; i++) {
    if (oldKeyMap[i] !== null && oldKeyMap[i] !== this.TOMBSTONE) {
      this.set(oldKeyMap[i][0], oldKeyMap[i][1]);
    }
  }
}`}
              language="javascript"
            />
          </div>
        </section>

        <section className="space-y-5 mt-8">
          <h2 className="text-2xl font-bold">Practice Exercises</h2>
          <p>Test your understanding of hash table deletion with these interactive exercises:</p>

          <InteractiveExercise
            question="In a hash table using open addressing with linear probing, why can't we simply set a slot to null when deleting an entry?"
            options={[
              "It would waste memory",
              "It would make the hash table inconsistent",
              "It would break the probe sequences for other keys",
              "It would cause the hash table to resize unnecessarily",
            ]}
            correctAnswer={2}
            explanation="Setting a slot to null would break the probe sequences for other keys that were inserted after collisions. During a search, if we encounter a null slot, we would incorrectly conclude that the key doesn't exist, even if it was placed further in the probe sequence."
            className="mt-6"
          />

          <InteractiveExercise
            question="What is 'lazy deletion' in the context of hash tables?"
            options={[
              "Deleting entries only when the table is resized",
              "Marking entries as deleted without physically removing them",
              "Delaying deletion until a certain number of delete operations are queued",
              "Randomly selecting entries for deletion to improve performance",
            ]}
            correctAnswer={1}
            explanation="Lazy deletion refers to marking entries as deleted (using tombstones) without physically removing them from the hash table. This approach is simpler to implement but can lead to wasted space if many entries are deleted."
            className="mt-6"
          />
        </section>

        <div className="bg-black/20 p-4 rounded-lg mt-6">
          <h3 className="text-xl font-semibold mb-2 text-purple-300">Next Steps</h3>
          <p>
            Now that you understand how to delete entries from a hash table, let's move on to the search operation.
            Searching is one of the most common operations performed on hash tables and is the reason they're so widely
            used.
          </p>
        </div>
      </div>
    </HashTableTutorialLayout>
  )
}
