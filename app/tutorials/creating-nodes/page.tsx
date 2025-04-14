import { TutorialLayout } from "@/components/tutorial-layout"
import { LinkedListVisualizer } from "@/components/linked-list-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function CreatingNodesPage() {
  return (
    <TutorialLayout
      title="Creating Nodes"
      description="Learn how to create nodes and build a linked list"
      currentStep={2}
      totalSteps={6}
      prevHref="/tutorials/introduction"
      nextHref="/tutorials/insertion"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Node Structure</h2>
          <p className="mb-4">
            The fundamental building block of a linked list is a node. Each node contains two key components:
          </p>

          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>
              <strong>Data:</strong> The value stored in the node (e.g., a number, string, or object)
            </li>
            <li>
              <strong>Next Pointer:</strong> A reference to the next node in the sequence
            </li>
          </ul>

          <CodeBlock
            title="Node Class Definition"
            language="javascript"
            code={`class Node {
  constructor(value) {
    this.value = value;  // The data stored in the node
    this.next = null;    // Reference to the next node
  }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Creating Individual Nodes</h2>
          <p className="mb-4">Let's create some individual nodes and see how they look:</p>

          <CodeBlock
            title="Creating Nodes"
            language="javascript"
            code={`// Create three nodes
const node1 = new Node(10);
const node2 = new Node(20);
const node3 = new Node(30);

// At this point, all nodes are isolated
console.log(node1); // Node { value: 10, next: null }
console.log(node2); // Node { value: 20, next: null }
console.log(node3); // Node { value: 30, next: null }`}
            highlightLines={[2, 3, 4]}
          />

          <div className="my-6 flex justify-center">
            <div className="grid grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-white">
                  10
                </div>
                <div className="mt-2 text-sm text-white/70">node1</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-white">
                  20
                </div>
                <div className="mt-2 text-sm text-white/70">node2</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-white">
                  30
                </div>
                <div className="mt-2 text-sm text-white/70">node3</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Connecting Nodes</h2>
          <p className="mb-4">
            To form a linked list, we need to connect these nodes by setting the <code>next</code> pointer of each node
            to point to the following node:
          </p>

          <CodeBlock
            title="Connecting Nodes"
            language="javascript"
            code={`// Connect the nodes to form a linked list
node1.next = node2;
node2.next = node3;
// node3.next remains null (end of the list)

// Now we can traverse from node1 to node3
console.log(node1.value);           // 10
console.log(node1.next.value);      // 20
console.log(node1.next.next.value); // 30`}
            highlightLines={[2, 3, 8, 9, 10]}
          />

          <div className="my-6">
            <LinkedListVisualizer initialValues={[10, 20, 30]} />
          </div>

          <p>
            Now we have a simple linked list! The nodes are connected in sequence, with each node pointing to the next
            one. The last node (node3) points to null, indicating the end of the list.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Creating a Linked List Class</h2>
          <p className="mb-4">
            While we can manually create and connect nodes, it's more practical to encapsulate this logic in a
            LinkedList class:
          </p>

          <CodeBlock
            title="LinkedList Class"
            language="javascript"
            code={`class LinkedList {
  constructor() {
    this.head = null; // Reference to the first node
  }
  
  // Add a node to the end of the list
  append(value) {
    const newNode = new Node(value);
    
    // If the list is empty, make the new node the head
    if (!this.head) {
      this.head = newNode;
      return;
    }
    
    // Otherwise, find the last node and add the new node
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    
    current.next = newNode;
  }
  
  // Print the list values
  printList() {
    let values = [];
    let current = this.head;
    
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    
    return values;
  }
}`}
            highlightLines={[3, 8, 11, 12, 17, 18, 21]}
          />

          <p className="mt-4">Now we can use this class to create and manage a linked list more easily:</p>

          <CodeBlock
            title="Using the LinkedList Class"
            language="javascript"
            code={`// Create a new linked list
const list = new LinkedList();

// Add nodes to the list
list.append(10);
list.append(20);
list.append(30);

// Print the list
console.log(list.printList()); // [10, 20, 30]`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="What would be the output of the following code?"
            options={[
              "[10, 20, 30, 40]",
              "[40, 30, 20, 10]",
              "Error: Cannot read property 'next' of null",
              "[10, 20, 30]",
            ]}
            correctAnswer={0}
            explanation="The code creates a linked list with values 10, 20, and 30, then appends 40 to the end. The printList method traverses the list and returns [10, 20, 30, 40]."
            className="mb-6"
          />

          <CodeBlock
            language="javascript"
            code={`const list = new LinkedList();
list.append(10);
list.append(20);
list.append(30);
list.append(40);
console.log(list.printList());`}
          />
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you know how to create nodes and build a basic linked list, let's move on to learning about
            insertion operations in the next tutorial.
          </p>
        </section>
      </div>
    </TutorialLayout>
  )
}
