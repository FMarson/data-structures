import { TutorialLayout } from "@/components/tutorial-layout"
import { LinkedListVisualizer } from "@/components/linked-list-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function DeletionPage() {
  return (
    <TutorialLayout
      title="Deletion Operations"
      description="Learn how to remove nodes from a linked list"
      currentStep={4}
      totalSteps={6}
      prevHref="/tutorials/insertion"
      nextHref="/tutorials/searching"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Types of Deletion Operations</h2>
          <p className="mb-4">There are several ways to delete nodes from a linked list:</p>

          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>
              <strong>Delete the first node</strong> (head)
            </li>
            <li>
              <strong>Delete the last node</strong> (tail)
            </li>
            <li>
              <strong>Delete a node at a specific position</strong>
            </li>
            <li>
              <strong>Delete a node with a specific value</strong>
            </li>
          </ol>

          <p className="mt-4">Let's explore each of these operations in detail.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Delete the First Node (Head)</h2>
          <p className="mb-4">Deleting the first node is straightforward:</p>

          <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
            <li>Check if the list is empty</li>
            <li>Update the head to point to the second node</li>
          </ol>

          <CodeBlock
            title="Delete the First Node"
            language="javascript"
            code={`deleteFirst() {
  // Check if the list is empty
  if (!this.head) {
    return;
  }
  
  // Update the head to point to the second node
  this.head = this.head.next;
}`}
            highlightLines={[3, 7]}
          />

          <div className="my-6">
            <div className="mb-2 text-sm text-white/70">Before deletion (head → 10 → 20 → 30):</div>
            <LinkedListVisualizer initialValues={[10, 20, 30]} />

            <div className="mt-6 mb-2 text-sm text-white/70">After deleting the first node (head → 20 → 30):</div>
            <LinkedListVisualizer initialValues={[20, 30]} activeOperation="delete" activeIndex={0} />
          </div>

          <p>
            Time Complexity: <strong className="text-green-400">O(1)</strong> - This is a constant-time operation as it
            only requires updating the head pointer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Delete the Last Node (Tail)</h2>
          <p className="mb-4">Deleting the last node requires traversing the list to find the second-to-last node:</p>

          <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
            <li>Check if the list is empty or has only one node</li>
            <li>Traverse the list to find the second-to-last node</li>
            <li>Set the second-to-last node's next pointer to null</li>
          </ol>

          <CodeBlock
            title="Delete the Last Node"
            language="javascript"
            code={`deleteLast() {
  // Check if the list is empty
  if (!this.head) {
    return;
  }
  
  // If there's only one node, delete it
  if (!this.head.next) {
    this.head = null;
    return;
  }
  
  // Traverse to find the second-to-last node
  let current = this.head;
  while (current.next.next) {
    current = current.next;
  }
  
  // Set the second-to-last node's next pointer to null
  current.next = null;
}`}
            highlightLines={[3, 7, 8, 14, 15, 19]}
          />

          <div className="my-6">
            <div className="mb-2 text-sm text-white/70">Before deletion (head → 10 → 20 → 30):</div>
            <LinkedListVisualizer initialValues={[10, 20, 30]} />

            <div className="mt-6 mb-2 text-sm text-white/70">After deleting the last node (head → 10 → 20):</div>
            <LinkedListVisualizer initialValues={[10, 20]} activeOperation="delete" activeIndex={2} />
          </div>

          <p>
            Time Complexity: <strong className="text-yellow-400">O(n)</strong> - This operation requires traversing the
            list to find the second-to-last node, making it linear in the size of the list.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Delete a Node at a Specific Position</h2>
          <p className="mb-4">Deleting a node at a specific position combines elements of the previous operations:</p>

          <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
            <li>If position is 0, use the deleteFirst method</li>
            <li>Traverse the list to the node just before the target position</li>
            <li>Update the pointers to skip the node to be deleted</li>
          </ol>

          <CodeBlock
            title="Delete a Node at a Specific Position"
            language="javascript"
            code={`deleteAt(position) {
  // Check if the list is empty
  if (!this.head) {
    return;
  }
  
  // If position is 0, delete the first node
  if (position === 0) {
    this.head = this.head.next;
    return;
  }
  
  // Traverse to the node just before the target position
  let current = this.head;
  let count = 0;
  
  while (current.next && count < position - 1) {
    current = current.next;
    count++;
  }
  
  // If the position is valid, update pointers to skip the node
  if (current.next) {
    current.next = current.next.next;
  }
}`}
            highlightLines={[7, 8, 16, 17, 22, 23]}
          />

          <div className="my-6">
            <div className="mb-2 text-sm text-white/70">Before deletion (head → 10 → 20 → 30 → 40):</div>
            <LinkedListVisualizer initialValues={[10, 20, 30, 40]} />

            <div className="mt-6 mb-2 text-sm text-white/70">
              After deleting the node at position 2 (head → 10 → 20 → 40):
            </div>
            <LinkedListVisualizer initialValues={[10, 20, 40]} activeOperation="delete" activeIndex={2} />
          </div>

          <p>
            Time Complexity: <strong className="text-yellow-400">O(n)</strong> - In the worst case, we need to traverse
            to the end of the list, making this a linear-time operation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Delete a Node with a Specific Value</h2>
          <p className="mb-4">Deleting a node with a specific value requires searching for the node first:</p>

          <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
            <li>Check if the list is empty</li>
            <li>If the head node has the target value, delete it</li>
            <li>Otherwise, traverse the list to find the node with the target value</li>
            <li>Update the pointers to skip the node to be deleted</li>
          </ol>

          <CodeBlock
            title="Delete a Node with a Specific Value"
            language="javascript"
            code={`delete(value) {
  // Check if the list is empty
  if (!this.head) {
    return;
  }
  
  // If the head node has the target value, delete it
  if (this.head.value === value) {
    this.head = this.head.next;
    return;
  }
  
  // Traverse the list to find the node with the target value
  let current = this.head;
  while (current.next && current.next.value !== value) {
    current = current.next;
  }
  
  // If the node is found, update pointers to skip it
  if (current.next) {
    current.next = current.next.next;
  }
}`}
            highlightLines={[3, 7, 8, 14, 15, 20, 21]}
          />

          <div className="my-6">
            <div className="mb-2 text-sm text-white/70">Before deletion (head → 10 → 20 → 30 → 40):</div>
            <LinkedListVisualizer initialValues={[10, 20, 30, 40]} />

            <div className="mt-6 mb-2 text-sm text-white/70">
              After deleting the node with value 30 (head → 10 → 20 → 40):
            </div>
            <LinkedListVisualizer initialValues={[10, 20, 40]} activeOperation="delete" activeIndex={2} />
          </div>

          <p>
            Time Complexity: <strong className="text-yellow-400">O(n)</strong> - This operation requires traversing the
            list to find the node with the target value, making it linear in the size of the list.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Interactive Example</h2>
          <p className="mb-4">Try deleting nodes from the linked list below:</p>

          <LinkedListVisualizer showControls={true} initialValues={[10, 20, 30, 40, 50]} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="What is the time complexity of deleting the last node in a singly linked list?"
            options={[
              "O(1) - constant time",
              "O(log n) - logarithmic time",
              "O(n) - linear time",
              "O(n²) - quadratic time",
            ]}
            correctAnswer={2}
            explanation="Deleting the last node in a singly linked list is an O(n) operation because you need to traverse the entire list to find the second-to-last node, whose next pointer needs to be updated to null."
          />
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand how to delete nodes from a linked list, let's move on to learning about searching
            operations in the next tutorial.
          </p>
        </section>
      </div>
    </TutorialLayout>
  )
}
