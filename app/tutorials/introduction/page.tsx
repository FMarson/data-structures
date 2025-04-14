import { TutorialLayout } from "@/components/tutorial-layout"
import { LinkedListVisualizer } from "@/components/linked-list-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function IntroductionPage() {
  return (
    <TutorialLayout
      title="Introduction to Linked Lists"
      description="Learn what linked lists are and why they're useful"
      currentStep={1}
      totalSteps={6}
      nextHref="/tutorials/creating-nodes"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">What is a Linked List?</h2>
          <p className="mb-4">
            A linked list is a linear data structure where elements are stored in nodes. Unlike arrays, linked list
            elements are not stored in contiguous memory locations. Instead, each node contains data and a reference (or
            link) to the next node in the sequence.
          </p>

          <div className="my-6">
            <LinkedListVisualizer initialValues={[10, 20, 30, 40]} />
          </div>

          <p>
            In the visualization above, you can see a simple linked list with four nodes. Each node contains a value,
            and an arrow pointing to the next node in the sequence. The last node points to null, indicating the end of
            the list.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Characteristics of Linked Lists</h2>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Dynamic Size:</strong> Linked lists can grow or shrink during execution as needed.
            </li>
            <li>
              <strong>Efficient Insertions/Deletions:</strong> Adding or removing elements doesn't require shifting
              other elements.
            </li>
            <li>
              <strong>Non-Contiguous Memory:</strong> Nodes can be stored anywhere in memory, unlike arrays.
            </li>
            <li>
              <strong>Sequential Access:</strong> To access a specific element, you must traverse from the head node.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Basic Structure in Code</h2>

          <CodeBlock
            title="Linked List Node Structure"
            language="javascript"
            code={`class Node {
  constructor(value) {
    this.value = value;  // The data stored in the node
    this.next = null;    // Reference to the next node
  }
}

class LinkedList {
  constructor() {
    this.head = null;  // Reference to the first node
  }
  
  // Methods for operations will go here
}`}
            highlightLines={[3, 4, 9]}
          />

          <p className="mt-4">
            The code above shows the basic structure of a linked list in JavaScript. Each node contains a value and a
            reference to the next node. The linked list itself has a head property that points to the first node in the
            list.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Advantages and Disadvantages</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2 text-green-400">Advantages</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Dynamic size allocation</li>
                <li>Efficient insertions and deletions</li>
                <li>No need to pre-allocate memory</li>
                <li>Can easily grow or shrink during execution</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2 text-red-400">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>No random access (must traverse from head)</li>
                <li>Extra memory for storing references</li>
                <li>Not cache-friendly due to non-contiguous memory</li>
                <li>Reverse traversal is difficult in singly linked lists</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="Which of the following is NOT a characteristic of linked lists?"
            options={[
              "Nodes are connected via references/pointers",
              "Elements are stored in contiguous memory locations",
              "The size can be changed during execution",
              "Efficient for insertion and deletion operations",
            ]}
            correctAnswer={1}
            explanation="Unlike arrays, linked lists do not store elements in contiguous memory locations. Each node can be stored anywhere in memory, with references connecting them."
          />
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand what linked lists are and their basic structure, let's move on to creating nodes and
            building a linked list from scratch in the next tutorial.
          </p>
        </section>
      </div>
    </TutorialLayout>
  )
}
