import { StackTutorialLayout } from "@/components/stack-tutorial-layout"
import { StackVisualizer } from "@/components/stack-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function StackPopOperationPage() {
  return (
    <StackTutorialLayout
      title="Pop Operation"
      description="Learn how to remove elements from a stack"
      currentStep={3}
      totalSteps={5}
      prevHref="/tutorials/stack/push-operation"
      nextHref="/tutorials/stack/peek-operation"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">The Pop Operation</h2>
          <p className="mb-4">
            The pop operation removes and returns the top element from the stack. Along with push, it's one of the
            fundamental operations that defines a stack's behavior.
          </p>

          <p className="mb-4">
            Think of it like taking the top plate off a stack of plates. You can only take the plate that's on top, and
            once you take it, the plate below becomes the new top.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Implementing Pop</h2>
          <p className="mb-4">
            In our array-based implementation, the pop operation removes the last element from the array (which
            represents the top of our stack) and returns it.
          </p>

          <CodeBlock
            title="Pop Implementation"
            language="javascript"
            code={`class Stack {
  constructor() {
    this.items = [];
  }

  // Push method...

  // Pop: Remove and return the top element from the stack
  pop() {
    // Check if the stack is empty
    if (this.isEmpty()) {
      return null; // Or throw an error
    }
    
    // Remove and return the last element from the array
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  // Other methods...
}`}
            highlightLines={[7, 9, 10, 14]}
          />

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Before Pop</h3>
              <StackVisualizer initialValues={[40, 30, 20, 10]} />
              <div className="mt-2 text-center text-sm text-white/70">Stack with elements: [10, 20, 30, 40]</div>
            </div>
            <div>
              <h3 className="font-medium mb-2">After Pop()</h3>
              <StackVisualizer initialValues={[30, 20, 10]} activeOperation="pop" activeIndex={0} />
              <div className="mt-2 text-center text-sm text-white/70">
                Stack with elements: [10, 20, 30], returned: 40
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How Pop Works</h2>
          <p className="mb-4">Let's break down the pop operation step by step:</p>

          <ol className="list-decimal list-inside space-y-3 ml-4">
            <li>
              <strong>Check if the stack is empty</strong> - Before attempting to remove an element, we check if the
              stack is empty to avoid errors.
            </li>
            <li>
              <strong>Handle empty stack</strong> - If the stack is empty, we return null or throw an error, depending
              on how we want to handle this edge case.
            </li>
            <li>
              <strong>Remove and return the top element</strong> - We use the built-in <code>pop</code> method of
              JavaScript arrays to remove and return the last element, which is the top of our stack.
            </li>
          </ol>

          <div className="mt-6 p-4 bg-white/5 rounded-md">
            <h3 className="font-medium mb-2">Key Points About Pop:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                <strong>Time Complexity:</strong> O(1) - The pop operation is constant time, meaning it takes the same
                amount of time regardless of how many elements are in the stack.
              </li>
              <li>
                <strong>Empty Stack Handling:</strong> Always check if the stack is empty before popping to avoid "stack
                underflow" errors.
              </li>
              <li>
                <strong>Return Value:</strong> The pop operation returns the element that was removed, which is useful
                when you need to process that element.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Pop Operation in Action</h2>
          <p className="mb-4">Here's an example of using the pop operation:</p>

          <CodeBlock
            title="Using Pop"
            language="javascript"
            code={`// Create a new stack and push some elements
const stack = new Stack();
stack.push(10).push(20).push(30);

// Stack contains [10, 20, 30] with 30 at the top

// Pop the top element
const topElement = stack.pop();
console.log(topElement); // Output: 30

// Stack now contains [10, 20] with 20 at the top

// Pop again
const nextElement = stack.pop();
console.log(nextElement); // Output: 20

// Stack now contains [10] with 10 at the top

// Check if stack is empty before popping
if (!stack.isEmpty()) {
  const lastElement = stack.pop();
  console.log(lastElement); // Output: 10
}

// Stack is now empty`}
            highlightLines={[7, 8, 12, 13, 18, 19]}
          />

          <div className="mt-6">
            <StackVisualizer initialValues={[]} />
            <div className="mt-2 text-center text-sm text-white/70">Final empty stack after all pop operations</div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Common Errors with Pop</h2>
          <p className="mb-4">When working with the pop operation, be aware of these common pitfalls:</p>

          <div className="bg-white/5 p-4 rounded-md">
            <h3 className="font-medium mb-2 text-red-400">Common Pop Errors:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                <strong>Stack Underflow:</strong> Attempting to pop from an empty stack. Always check if the stack is
                empty before popping.
              </li>
              <li>
                <strong>Not Storing the Return Value:</strong> The pop operation returns the removed element, which you
                might need. Don't forget to store it if needed.
              </li>
              <li>
                <strong>Popping Without Checking:</strong> Always verify the stack isn't empty before popping to avoid
                runtime errors.
              </li>
            </ul>
          </div>

          <CodeBlock
            title="Handling Empty Stack"
            language="javascript"
            code={`// Bad practice - might cause errors
const element = stack.pop();

// Good practice - check before popping
if (!stack.isEmpty()) {
  const element = stack.pop();
  // Process element
} else {
  console.log("Cannot pop from empty stack");
}`}
            highlightLines={[2, 5, 6, 9]}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="What happens when you try to pop from an empty stack in our implementation?"
            options={["It returns null", "It throws an error", "It returns undefined", "It crashes the program"]}
            correctAnswer={0}
            explanation="In our implementation, we check if the stack is empty and return null if it is. This is a common way to handle stack underflow, though some implementations might throw an error instead."
          />

          <div className="mt-6">
            <InteractiveExercise
              question="After executing the following code, what will the stack contain?"
              options={["[]", "[10]", "[20]", "[10, 20]"]}
              correctAnswer={1}
              explanation="The stack starts empty, then we push 10 and 20. After popping once, the top element (20) is removed, leaving only 10 in the stack."
              code={`const stack = new Stack();
stack.push(10);
stack.push(20);
stack.pop();`}
            />
          </div>
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand how to remove elements from a stack with the pop operation, let's move on to
            learning how to view the top element without removing it using the peek operation.
          </p>
        </section>
      </div>
    </StackTutorialLayout>
  )
}
