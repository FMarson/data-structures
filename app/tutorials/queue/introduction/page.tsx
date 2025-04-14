import { QueueTutorialLayout } from "@/components/queue-tutorial-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function QueueIntroductionPage() {
  return (
    <QueueTutorialLayout
      title="Introduction to Queues"
      description="Learn what queues are and the FIFO principle"
      currentStep={1}
      totalSteps={5}
      nextHref="/tutorials/queue/enqueue-operation"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">What is a Queue?</h2>
          <p className="mb-4">
            A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. This means that the
            first element added to the queue is the first one to be removed. Think of a queue like a line of people
            waiting for a service — the person who arrives first gets served first.
          </p>

          <div className="my-6 bg-white/5 p-4 rounded-md">
            <div className="flex items-center justify-center space-x-2">
              {[40, 30, 20, 10].map((value, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-md text-white font-bold"
                >
                  {value}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-white/70">
              <span>Front (Dequeue from here)</span>
              <span>Rear (Enqueue here)</span>
            </div>
          </div>

          <p>
            In the visualization above, you can see a simple queue with four elements. The front of the queue is on the
            left, and the rear is on the right. When we add a new element (enqueue), it goes to the rear. When we remove
            an element (dequeue), it comes from the front.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">The FIFO Principle</h2>
          <p className="mb-4">
            The defining characteristic of a queue is its FIFO (First-In-First-Out) behavior. This means:
          </p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>The first element added to the queue will be the first element removed.</li>
            <li>Elements can only be added to the rear and removed from the front of the queue.</li>
            <li>
              Access to other elements in the queue is restricted — you can't access elements in the middle without
              first removing the elements at the front.
            </li>
          </ul>

          <div className="mt-6 bg-white/5 p-4 rounded-md">
            <h3 className="font-medium mb-2">Real-world Queue Examples:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>People waiting in line at a checkout counter</li>
              <li>Print jobs sent to a printer</li>
              <li>Requests to a web server</li>
              <li>Processes waiting for CPU time in an operating system</li>
              <li>Messages in a message broker system</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Basic Queue Operations</h2>

          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>
              <strong>Enqueue:</strong> Add an element to the rear of the queue.
            </li>
            <li>
              <strong>Dequeue:</strong> Remove and return the element at the front of the queue.
            </li>
            <li>
              <strong>Peek/Front:</strong> View the element at the front without removing it.
            </li>
            <li>
              <strong>isEmpty:</strong> Check if the queue is empty.
            </li>
            <li>
              <strong>Size:</strong> Get the number of elements in the queue.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Queue Implementation Overview</h2>
          <p className="mb-4">There are several ways to implement a queue:</p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Array-based Implementation</h3>
              <p className="text-sm text-white/80">
                Uses an array to store elements. The front is at the beginning of the array, and the rear is at the end.
              </p>
              <ul className="list-disc list-inside text-sm mt-2 text-white/70">
                <li>Simple to implement</li>
                <li>Fixed size (in some languages)</li>
                <li>Inefficient dequeue operation (O(n))</li>
              </ul>
            </div>
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Circular Queue Implementation</h3>
              <p className="text-sm text-white/80">
                Uses an array with front and rear pointers that wrap around to the beginning when they reach the end.
              </p>
              <ul className="list-disc list-inside text-sm mt-2 text-white/70">
                <li>Efficient operations (O(1))</li>
                <li>Better space utilization</li>
                <li>More complex implementation</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Linked List-based Implementation</h3>
              <p className="text-sm text-white/80">
                Uses a linked list where the head represents the front and the tail represents the rear.
              </p>
              <ul className="list-disc list-inside text-sm mt-2 text-white/70">
                <li>Dynamic size</li>
                <li>Efficient operations (O(1))</li>
                <li>More memory overhead</li>
              </ul>
            </div>
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Double-ended Queue (Deque)</h3>
              <p className="text-sm text-white/80">A queue that allows insertion and deletion at both ends.</p>
              <ul className="list-disc list-inside text-sm mt-2 text-white/70">
                <li>More versatile</li>
                <li>Can be used as both stack and queue</li>
                <li>More complex implementation</li>
              </ul>
            </div>
          </div>

          <p>
            In this tutorial, we'll focus on the array-based and linked list-based implementations as they're commonly
            used.
          </p>

          <CodeBlock
            title="Basic Queue Class Structure"
            language="javascript"
            code={`class Queue {
  constructor() {
    this.items = [];  // Initialize empty array to store elements
  }

  // Core operations will be implemented in the following sections
  enqueue(element) { /* Add element to the rear */ }
  dequeue() { /* Remove and return the front element */ }
  peek() { /* Return the front element without removing it */ }
  
  // Utility methods
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}`}
            highlightLines={[2, 7, 8, 9, 12, 16]}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Advantages and Disadvantages</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2 text-green-400">Advantages</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Simple and intuitive concept</li>
                <li>Preserves the order of elements</li>
                <li>Useful for managing resources and scheduling</li>
                <li>Efficient for FIFO access patterns</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2 text-red-400">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Limited access (can only access the front element)</li>
                <li>Simple array implementations have O(n) dequeue operations</li>
                <li>No random access to elements</li>
                <li>Searching requires emptying the queue</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Queue vs. Stack</h2>
          <p className="mb-4">
            Queues and stacks are both linear data structures, but they differ in how elements are accessed:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Queue (FIFO)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>First element in is the first element out</li>
                <li>Elements are added at the rear and removed from the front</li>
                <li>Like a line of people waiting</li>
                <li>Used for breadth-first search, scheduling, etc.</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Stack (LIFO)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Last element in is the first element out</li>
                <li>Elements are added and removed from the same end (top)</li>
                <li>Like a stack of plates</li>
                <li>Used for depth-first search, undo operations, etc.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="Which principle does a queue follow?"
            options={[
              "Last-In-First-Out (LIFO)",
              "First-In-First-Out (FIFO)",
              "First-In-Last-Out (FILO)",
              "Random Access",
            ]}
            correctAnswer={1}
            explanation="A queue follows the First-In-First-Out (FIFO) principle, which means that the first element added to the queue is the first one to be removed."
          />
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand what queues are and their basic principles, let's move on to implementing the core
            operations of a queue, starting with the enqueue operation.
          </p>
        </section>
      </div>
    </QueueTutorialLayout>
  )
}
