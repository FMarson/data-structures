import { TutorialLayout } from "@/components/tutorial-layout"
import { LinkedListVisualizer } from "@/components/linked-list-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function TraversalPage() {
  return (
    <TutorialLayout
      title="Traversal Operations"
      description="Learn how to traverse and process all elements in a linked list"
      currentStep={6}
      totalSteps={6}
      prevHref="/tutorials/searching"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Traversing a Linked List</h2>
          <p className="mb-4">
            Traversal is the process of visiting each node in a linked list. It's a fundamental operation that forms the
            basis for many other operations like searching, printing, and transforming the list.
          </p>

          <p>There are several common traversal patterns and operations:</p>

          <ol className="list-decimal list-inside space-y-2 ml-4 mt-4">
            <li>
              <strong>Basic traversal:</strong> Visit each node in the list
            </li>
            <li>
              <strong>Transforming:</strong> Apply a function to each node's value
            </li>
            <li>
              <strong>Filtering:</strong> Create a new list with nodes that match a condition
            </li>
            <li>
              <strong>Reversing:</strong> Reverse the order of nodes in the list
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Basic Traversal</h2>
          <p className="mb-4">The most basic traversal pattern involves visiting each node in the list:</p>

          <CodeBlock
            title="Basic Traversal"
            language="javascript"
            code={`traverse() {
  // Start at the head of the list
  let current = this.head;
  
  // Visit each node until reaching the end
  while (current) {
    console.log(current.value);
    current = current.next;
  }
}`}
            highlightLines={[3, 6, 7, 8]}
          />

          <div className="my-6">
            <div className="mb-2 text-sm text-white/70">Traversing the list:</div>
            <LinkedListVisualizer initialValues={[10, 20, 30, 40, 50]} activeOperation="traverse" activeIndex={2} />
          </div>

          <p>
            Time Complexity: <strong className="text-yellow-400">O(n)</strong> - We need to visit each node in the list,
            making this a linear-time operation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Transforming Values</h2>
          <p className="mb-4">We can transform a linked list by applying a function to each node's value:</p>

          <CodeBlock
            title="Transform Values"
            language="javascript"
            code={`map(callback) {
  const result = new LinkedList();
  
  // Start at the head of the list
  let current = this.head;
  
  // Visit each node and apply the callback function
  while (current) {
    result.append(callback(current.value));
    current = current.next;
  }
  
  return result;
}`}
            highlightLines={[2, 5, 8, 9]}
          />

          <p className="mt-4">Example usage:</p>

          <CodeBlock
            language="javascript"
            code={`// Double each value in the list
const doubled = list.map(value => value * 2);

// Original list: 10 → 20 → 30
// Doubled list: 20 → 40 → 60`}
          />

          <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-2 text-sm text-white/70">Original list:</div>
              <LinkedListVisualizer initialValues={[10, 20, 30]} />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/70">After doubling each value:</div>
              <LinkedListVisualizer initialValues={[20, 40, 60]} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Filtering Nodes</h2>
          <p className="mb-4">We can create a new list containing only nodes that match a certain condition:</p>

          <CodeBlock
            title="Filter Nodes"
            language="javascript"
            code={`filter(callback) {
  const result = new LinkedList();
  
  // Start at the head of the list
  let current = this.head;
  
  // Visit each node and check the condition
  while (current) {
    if (callback(current.value)) {
      result.append(current.value);
    }
    current = current.next;
  }
  
  return result;
}`}
            highlightLines={[2, 5, 8, 9, 10]}
          />

          <p className="mt-4">Example usage:</p>

          <CodeBlock
            language="javascript"
            code={`// Keep only even numbers
const evens = list.filter(value => value % 2 === 0);

// Original list: 10 → 15 → 20 → 25 → 30
// Filtered list: 10 → 20 → 30`}
          />

          <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-2 text-sm text-white/70">Original list:</div>
              <LinkedListVisualizer initialValues={[10, 15, 20, 25, 30]} />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/70">After filtering for even numbers:</div>
              <LinkedListVisualizer initialValues={[10, 20, 30]} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Reversing a Linked List</h2>
          <p className="mb-4">Reversing a linked list is a common interview question and a useful operation:</p>

          <CodeBlock
            title="Reverse a Linked List"
            language="javascript"
            code={`reverse() {
  // Initialize three pointers
  let previous = null;
  let current = this.head;
  let next = null;
  
  // Traverse the list and reverse the pointers
  while (current) {
    // Save the next node
    next = current.next;
    
    // Reverse the pointer
    current.next = previous;
    
    // Move the pointers forward
    previous = current;
    current = next;
  }
  
  // Update the head to point to the new first node (previously the last)
  this.head = previous;
}`}
            highlightLines={[3, 4, 5, 8, 9, 12, 15, 16, 20]}
          />

          <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-2 text-sm text-white/70">Original list:</div>
              <LinkedListVisualizer initialValues={[10, 20, 30, 40, 50]} />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/70">After reversing:</div>
              <LinkedListVisualizer initialValues={[50, 40, 30, 20, 10]} />
            </div>
          </div>

          <p>
            Time Complexity: <strong className="text-yellow-400">O(n)</strong> - We need to visit each node in the list
            once.
          </p>
          <p>
            Space Complexity: <strong className="text-green-400">O(1)</strong> - We only use a constant amount of extra
            space regardless of the list size.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Interactive Example</h2>
          <p className="mb-4">Try traversing the linked list below:</p>

          <LinkedListVisualizer showControls={true} initialValues={[10, 20, 30, 40, 50]} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="What would be the result of reversing the linked list 5 → 10 → 15 → 20?"
            options={["20 → 15 → 10 → 5", "5 → 10 → 15 → 20 (no change)", "5 ← 10 ← 15 ← 20", "None of the above"]}
            correctAnswer={0}
            explanation="Reversing a linked list changes the order of the nodes, so the last node becomes the first, and so on. The result would be 20 → 15 → 10 → 5."
          />
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Congratulations!</h2>
          <p className="mb-4">You've completed all the tutorials on linked lists! You now understand:</p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>What linked lists are and their basic structure</li>
            <li>How to create nodes and build a linked list</li>
            <li>How to insert nodes at different positions</li>
            <li>How to delete nodes from a linked list</li>
            <li>How to search for elements in a linked list</li>
            <li>How to traverse and process all elements in a linked list</li>
          </ul>

          <p className="mt-4">
            With this knowledge, you're well-equipped to use linked lists in your own projects and understand more
            complex data structures that build upon linked lists, such as stacks, queues, and more advanced variants
            like doubly linked lists and circular linked lists.
          </p>

          <div className="mt-6 p-4 bg-green-900/20 border border-green-500 rounded-md">
            <h3 className="font-medium mb-2">Next Steps</h3>
            <p>To continue your learning journey, consider exploring:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Doubly linked lists</li>
              <li>Circular linked lists</li>
              <li>Skip lists</li>
              <li>Other data structures like stacks, queues, and trees</li>
            </ul>
          </div>
        </section>
      </div>
    </TutorialLayout>
  )
}
