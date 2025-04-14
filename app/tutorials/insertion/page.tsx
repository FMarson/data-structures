import { TutorialLayout } from "@/components/tutorial-layout"
import { LinkedListVisualizer } from "@/components/linked-list-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function InsertionPage() {
  return (
    <TutorialLayout
      title="Insertion Operations"
      description="Learn how to insert nodes at different positions in a linked list"
      currentStep={3}
      totalSteps={6}
      prevHref="/tutorials/creating-nodes"
      nextHref="/tutorials/deletion"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Types of Insertion Operations</h2>
          <p className="mb-4">There are three main ways to insert a node into a linked list:</p>

          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>
              <strong>Insert at the beginning</strong> (prepend)
            </li>
            <li>
              <strong>Insert at the end</strong> (append)
            </li>
            <li>
              <strong>Insert at a specific position</strong>
            </li>
          </ol>

          <p className="mt-4">Let's explore each of these operations in detail.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Insert at the Beginning (Prepend)</h2>
          <p className="mb-4">Inserting a node at the beginning of a linked list is a simple operation:</p>

          <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
            <li>Create a new node with the given value</li>
            <li>Set the new node's next pointer to the current head</li>
            <li>Update the head to point to the new node</li>
          </ol>

          <CodeBlock
            title="Insert at the Beginning"
            language="javascript"
            code={`prepend(value) {
  // Create a new node
  const newNode = new Node(value);
  
  // Set the new node's next pointer to the current head
  newNode.next = this.head;
  
  // Update the head to point to the new node
  this.head = newNode;
}`}
            highlightLines={[3, 6, 9]}
          />

          <div className="my-6">
            <div className="mb-2 text-sm text-white/70">Before insertion (head → 20 → 30):</div>
            <LinkedListVisualizer initialValues={[20, 30]} />

            <div className="mt-6 mb-2 text-sm text-white/70">
              After insertion of 10 at the beginning (head → 10 → 20 → 30):
            </div>
            <LinkedListVisualizer initialValues={[10, 20, 30]} highlightedIndices={[0]} />
          </div>

          <p>
            Time Complexity: <strong className="text-green-400">O(1)</strong> - This is a constant-time operation as it
            only requires updating a few pointers, regardless of the list size.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Insert at the End (Append)</h2>
          <p className="mb-4">
            We've already seen the append operation in the previous tutorial. Here's a reminder of how it works:
          </p>

          <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
            <li>Create a new node with the given value</li>
            <li>If the list is empty, make the new node the head</li>
            <li>Otherwise, traverse to the end of the list</li>
            <li>Set the last node's next pointer to the new node</li>
          </ol>

          <CodeBlock
            title="Insert at the End"
            language="javascript"
            code={`append(value) {
  // Create a new node
  const newNode = new Node(value);
  
  // If the list is empty, make the new node the head
  if (!this.head) {
    this.head = newNode;
    return;
  }
  
  // Traverse to the end of the list
  let current = this.head;
  while (current.next) {
    current = current.next;
  }
  
  // Set the last node's next pointer to the new node
  current.next = newNode;
}`}
            highlightLines={[3, 6, 7, 12, 13, 17]}
          />

          <div className="my-6">
            <div className="mb-2 text-sm text-white/70">Before insertion (head → 10 → 20):</div>
            <LinkedListVisualizer initialValues={[10, 20]} />

            <div className="mt-6 mb-2 text-sm text-white/70">
              After insertion of 30 at the end (head → 10 → 20 → 30):
            </div>
            <LinkedListVisualizer initialValues={[10, 20, 30]} highlightedIndices={[2]} />
          </div>

          <p>
            Time Complexity: <strong className="text-yellow-400">O(n)</strong> - This operation requires traversing the
            entire list to find the last node, so it's linear in the size of the list.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Insert at a Specific Position</h2>
          <p className="mb-4">Inserting at a specific position combines elements of both previous operations:</p>

          <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
            <li>If position is 0, use the prepend method</li>
            <li>Create a new node with the given value</li>
            <li>Traverse the list to the node just before the desired position</li>
            <li>Update the pointers to insert the new node</li>
          </ol>

          <CodeBlock
            title="Insert at a Specific Position"
            language="javascript"
            code={`insertAt(value, position) {
  // If position is 0, use prepend
  if (position === 0) {
    this.prepend(value);
    return;
  }
  
  // Create a new node
  const newNode = new Node(value);
  
  // Traverse to the node just before the desired position
  let current = this.head;
  let count = 0;
  
  while (current && count < position - 1) {
    current = current.next;
    count++;
  }
  
  // If position is beyond the length of the list, append to the end
  if (!current) {
    this.append(value);
    return;
  }
  
  // Update pointers to insert the new node
  newNode.next = current.next;
  current.next = newNode;
}`}
            highlightLines={[3, 4, 9, 14, 15, 24, 25]}
          />

          <div className="my-6">
            <div className="mb-2 text-sm text-white/70">Before insertion (head → 10 → 30):</div>
            <LinkedListVisualizer initialValues={[10, 30]} />

            <div className="mt-6 mb-2 text-sm text-white/70">
              After insertion of 20 at position 1 (head → 10 → 20 → 30):
            </div>
            <LinkedListVisualizer initialValues={[10, 20, 30]} highlightedIndices={[1]} />
          </div>

          <p>
            Time Complexity: <strong className="text-yellow-400">O(n)</strong> - In the worst case, we need to traverse
            to the end of the list, making this a linear-time operation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Interactive Example</h2>
          <p className="mb-4">Try inserting nodes at different positions in the linked list below:</p>

          <LinkedListVisualizer showControls={true} initialValues={[10, 30, 50]} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="What is the time complexity of inserting a node at the beginning of a linked list?"
            options={[
              "O(1) - constant time",
              "O(log n) - logarithmic time",
              "O(n) - linear time",
              "O(n²) - quadratic time",
            ]}
            correctAnswer={0}
            explanation="Inserting at the beginning of a linked list is an O(1) operation because it only requires updating the head pointer and the next pointer of the new node, regardless of the list size."
          />
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand how to insert nodes into a linked list, let's move on to learning about deletion
            operations in the next tutorial.
          </p>
        </section>
      </div>
    </TutorialLayout>
  )
}
