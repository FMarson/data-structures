import { StackTutorialLayout } from "@/components/stack-tutorial-layout"
import { StackVisualizer } from "@/components/stack-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function StackIntroductionPage() {
  return (
    <StackTutorialLayout
      title="Introduction to Stacks"
      description="Learn what stacks are and the LIFO principle"
      currentStep={1}
      totalSteps={5}
      nextHref="/tutorials/stack/push-operation"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">What is a Stack?</h2>
          <p className="mb-4">
            A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. This means that the
            last element added to the stack is the first one to be removed. Think of a stack like a pile of plates — you
            add plates to the top and remove them from the top.
          </p>

          <div className="my-6">
            <StackVisualizer initialValues={[40, 30, 20, 10]} />
          </div>

          <p>
            In the visualization above, you can see a simple stack with four elements. The top of the stack is at the
            top of the visualization, and the bottom is at the bottom. When we add a new element, it goes on top. When
            we remove an element, it comes from the top.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">The LIFO Principle</h2>
          <p className="mb-4">
            The defining characteristic of a stack is its LIFO (Last-In-First-Out) behavior. This means:
          </p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>The last element added to the stack will be the first element removed.</li>
            <li>Elements can only be added to or removed from the "top" of the stack.</li>
            <li>
              Access to other elements in the stack is restricted — you can't access elements in the middle without
              first removing the elements on top.
            </li>
          </ul>

          <div className="mt-6 bg-white/5 p-4 rounded-md">
            <h3 className="font-medium mb-2">Real-world Stack Examples:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>A stack of plates or books</li>
              <li>The browser's back button (browsing history)</li>
              <li>The "undo" feature in text editors</li>
              <li>Function call stack in programming</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Basic Stack Operations</h2>

          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>
              <strong>Push:</strong> Add an element to the top of the stack.
            </li>
            <li>
              <strong>Pop:</strong> Remove the top element from the stack.
            </li>
            <li>
              <strong>Peek/Top:</strong> View the top element without removing it.
            </li>
            <li>
              <strong>isEmpty:</strong> Check if the stack is empty.
            </li>
            <li>
              <strong>Size:</strong> Get the number of elements in the stack.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Stack Implementation Overview</h2>
          <p className="mb-4">There are two common ways to implement a stack:</p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Array-based Implementation</h3>
              <p className="text-sm text-white/80">
                Uses an array to store elements. The top of the stack is typically the end of the array.
              </p>
              <ul className="list-disc list-inside text-sm mt-2 text-white/70">
                <li>Simple to implement</li>
                <li>Fixed size (in some languages)</li>
                <li>Potential for stack overflow</li>
              </ul>
            </div>
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Linked List-based Implementation</h3>
              <p className="text-sm text-white/80">
                Uses a linked list where the head of the list represents the top of the stack.
              </p>
              <ul className="list-disc list-inside text-sm mt-2 text-white/70">
                <li>Dynamic size</li>
                <li>No overflow issues</li>
                <li>Slightly more complex</li>
              </ul>
            </div>
          </div>

          <p>
            In this tutorial, we'll focus on the array-based implementation as it's more straightforward and commonly
            used.
          </p>

          <CodeBlock
            title="Basic Stack Class Structure"
            language="javascript"
            code={`class Stack {
  constructor() {
    this.items = [];  // Initialize empty array to store elements
  }

  // Core operations will be implemented in the following sections
  push(element) { /* Add element to the top */ }
  pop() { /* Remove and return the top element */ }
  peek() { /* Return the top element without removing it */ }
  
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
                <li>Simple implementation</li>
                <li>Efficient operations (O(1) time complexity)</li>
                <li>Memory efficient with fixed-size arrays</li>
                <li>Clear, well-defined access pattern</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2 text-red-400">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Limited access (can only access the top element)</li>
                <li>Fixed size in array implementations (potential overflow)</li>
                <li>No random access to elements</li>
                <li>Searching requires emptying the stack</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="Which principle does a stack follow?"
            options={[
              "First-In-First-Out (FIFO)",
              "Last-In-First-Out (LIFO)",
              "First-In-Last-Out (FILO)",
              "Random Access",
            ]}
            correctAnswer={1}
            explanation="A stack follows the Last-In-First-Out (LIFO) principle, which means that the last element added to the stack is the first one to be removed."
          />
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand what stacks are and their basic principles, let's move on to implementing the core
            operations of a stack, starting with the push operation.
          </p>
        </section>
      </div>
    </StackTutorialLayout>
  )
}
