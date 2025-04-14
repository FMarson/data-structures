import { TutorialLayout } from "@/components/tutorial-layout"
import { LinkedListVisualizer } from "@/components/linked-list-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function SearchingPage() {
  return (
    <TutorialLayout
      title="Searching Operations"
      description="Learn how to search for elements in a linked list"
      currentStep={5}
      totalSteps={6}
      prevHref="/tutorials/deletion"
      nextHref="/tutorials/traversal"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Searching in a Linked List</h2>
          <p className="mb-4">
            Searching is a fundamental operation in linked lists. There are two common search operations:
          </p>

          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>
              <strong>Search by value:</strong> Find a node with a specific value
            </li>
            <li>
              <strong>Search by position:</strong> Find a node at a specific position
            </li>
          </ol>

          <p className="mt-4">Let's explore both of these operations.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Search by Value</h2>
          <p className="mb-4">Searching for a node with a specific value requires traversing the list:</p>

          <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
            <li>Start at the head of the list</li>
            <li>Traverse the list, comparing each node's value with the target value</li>
            <li>Return the position if found, or -1 if not found</li>
          </ol>

          <CodeBlock
            title="Search by Value"
            language="javascript"
            code={`search(value) {
  // Start at the head of the list
  let current = this.head;
  let position = 0;
  
  // Traverse the list
  while (current) {
    // If the current node's value matches the target, return the position
    if (current.value === value) {
      return position;
    }
    
    // Move to the next node
    current = current.next;
    position++;
  }
  
  // If the value is not found, return -1
  return -1;
}`}
            highlightLines={[3, 4, 7, 8, 9, 13, 14, 18]}
          />

          <div className="my-6">
            <div className="mb-2 text-sm text-white/70">Searching for value 30 in the list:</div>
            <LinkedListVisualizer
              initialValues={[10, 20, 30, 40, 50]}
              highlightedValues={[30]}
              activeOperation="search"
              activeIndex={2}
            />
          </div>

          <p>
            Time Complexity: <strong className="text-yellow-400">O(n)</strong> - In the worst case, we need to traverse
            the entire list to find the target value or determine it's not present.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Search by Position</h2>
          <p className="mb-4">Searching for a node at a specific position also requires traversing the list:</p>

          <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
            <li>Start at the head of the list</li>
            <li>Traverse the list until reaching the desired position</li>
            <li>Return the node's value if found, or null if the position is invalid</li>
          </ol>

          <CodeBlock
            title="Search by Position"
            language="javascript"
            code={`getAt(position) {
  // Start at the head of the list
  let current = this.head;
  let count = 0;
  
  // Traverse the list until reaching the desired position
  while (current) {
    if (count === position) {
      return current.value;
    }
    
    // Move to the next node
    current = current.next;
    count++;
  }
  
  // If the position is invalid, return null
  return null;
}`}
            highlightLines={[3, 4, 7, 8, 9, 13, 14, 18]}
          />

          <div className="my-6">
            <div className="mb-2 text-sm text-white/70">Getting the node at position 3 in the list:</div>
            <LinkedListVisualizer
              initialValues={[10, 20, 30, 40, 50]}
              highlightedIndices={[3]}
              activeOperation="search"
              activeIndex={3}
            />
          </div>

          <p>
            Time Complexity: <strong className="text-yellow-400">O(n)</strong> - In the worst case, we need to traverse
            to the end of the list, making this a linear-time operation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Optimizing Search Operations</h2>
          <p className="mb-4">Linked lists are not optimized for search operations. Here are some considerations:</p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>No random access:</strong> Unlike arrays, linked lists don't support direct indexing, so we always
              need to traverse from the head.
            </li>
            <li>
              <strong>No binary search:</strong> Since we can't jump to the middle of a linked list in constant time, we
              can't use binary search algorithms.
            </li>
            <li>
              <strong>Alternative data structures:</strong> If your application requires frequent searches, consider
              using arrays, hash tables, or binary search trees instead.
            </li>
          </ul>

          <div className="mt-6 p-4 bg-white/5 rounded-md">
            <h3 className="font-medium mb-2">Performance Comparison</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="font-medium">Operation</div>
              <div className="font-medium">Linked List</div>
              <div className="font-medium">Array</div>

              <div>Search by Value</div>
              <div>O(n)</div>
              <div>O(n)</div>

              <div>Search by Position</div>
              <div>O(n)</div>
              <div>O(1)</div>

              <div>Binary Search</div>
              <div>Not applicable</div>
              <div>O(log n)</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Interactive Example</h2>
          <p className="mb-4">Try searching for values in the linked list below:</p>

          <LinkedListVisualizer showControls={true} initialValues={[10, 20, 30, 40, 50]} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="What would the search(30) method return for the following linked list: 10 → 20 → 30 → 40 → 50?"
            options={["0", "1", "2", "3"]}
            correctAnswer={2}
            explanation="The search method returns the position of the node with the value 30. In this linked list, 30 is at position 2 (0-indexed, where the head is at position 0)."
          />
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand how to search for elements in a linked list, let's move on to learning about
            traversal operations in the next tutorial.
          </p>
        </section>
      </div>
    </TutorialLayout>
  )
}
