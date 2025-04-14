import { StackTutorialLayout } from "@/components/stack-tutorial-layout"
import { StackVisualizer } from "@/components/stack-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function StackPushOperationPage() {
  return (
    <StackTutorialLayout
      title="Push Operation"
      description="Learn how to add elements to a stack"
      currentStep={2}
      totalSteps={5}
      prevHref="/tutorials/stack/introduction"
      nextHref="/tutorials/stack/pop-operation"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">The Push Operation</h2>
          <p className="mb-4">
            The push operation adds an element to the top of the stack. It's one of the fundamental operations that
            defines a stack's behavior.
          </p>

          <p className="mb-4">
            Think of it like placing a plate on top of a stack of plates. The new plate becomes the top of the stack,
            and it's the first one you'll remove when you need a plate.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Implementing Push</h2>
          <p className="mb-4">
            In our array-based implementation, the push operation is straightforward. We simply add the new element to
            the end of the array, which represents the top of our stack.
          </p>

          <CodeBlock
            title="Push Implementation"
            language="javascript"
            code={`class Stack {
  constructor() {
    this.items = [];
  }

  // Push: Add an element to the top of the stack
  push(element) {
    // Simply add the element to the end of the array
    this.items.push(element);
    
    // Optional: return this for method chaining
    return this;
  }

  // Other methods...
}`}
            highlightLines={[6, 7, 8, 10]}
          />

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Before Push</h3>
              <StackVisualizer initialValues={[30, 20, 10]} />
              <div className="mt-2 text-center text-sm text-white/70">Stack with elements: [10, 20, 30]</div>
            </div>
            <div>
              <h3 className="font-medium mb-2">After Push(40)</h3>
              <StackVisualizer initialValues={[40, 30, 20, 10]} highlightedIndices={[0]} />
              <div className="mt-2 text-center text-sm text-white/70">Stack with elements: [10, 20, 30, 40]</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How Push Works</h2>
          <p className="mb-4">Let's break down the push operation step by step:</p>

          <ol className="list-decimal list-inside space-y-3 ml-4">
            <li>
              <strong>Accept an element</strong> - The push method takes a parameter, which is the element to be added
              to the stack.
            </li>
            <li>
              <strong>Add to the top</strong> - In our array implementation, we add the element to the end of the array
              using the built-in <code>push</code> method of JavaScript arrays.
            </li>
            <li>
              <strong>Return the stack instance</strong> - Optionally, we return <code>this</code> (the stack instance)
              to allow for method chaining, which can be useful in some scenarios.
            </li>
          </ol>

          <div className="mt-6 p-4 bg-white/5 rounded-md">
            <h3 className="font-medium mb-2">Key Points About Push:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                <strong>Time Complexity:</strong> O(1) - The push operation is constant time, meaning it takes the same
                amount of time regardless of how many elements are in the stack.
              </li>
              <li>
                <strong>Stack Growth:</strong> In JavaScript, arrays automatically resize, so we don't need to worry
                about stack overflow. In languages with fixed-size arrays, you would need to check if the stack is full
                before pushing.
              </li>
              <li>
                <strong>Method Chaining:</strong> Returning <code>this</code> allows for method chaining like{" "}
                <code>stack.push(10).push(20).push(30)</code>.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Push Operation in Action</h2>
          <p className="mb-4">Here's an example of using the push operation to build a stack:</p>

          <CodeBlock
            title="Using Push"
            language="javascript"
            code={`// Create a new stack
const stack = new Stack();

// Push elements onto the stack
stack.push(10);
stack.push(20);
stack.push(30);

// Stack now contains [10, 20, 30] with 30 at the top

// We can also chain push operations
stack.push(40).push(50);

// Stack now contains [10, 20, 30, 40, 50] with 50 at the top`}
            highlightLines={[4, 5, 6, 10]}
          />

          <div className="mt-6">
            <StackVisualizer initialValues={[50, 40, 30, 20, 10]} />
            <div className="mt-2 text-center text-sm text-white/70">Final stack after all push operations</div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="What is the time complexity of the push operation in a stack?"
            options={[
              "O(1) - constant time",
              "O(log n) - logarithmic time",
              "O(n) - linear time",
              "O(n²) - quadratic time",
            ]}
            correctAnswer={0}
            explanation="The push operation in a stack has O(1) time complexity because it simply adds an element to the end of the array, which takes constant time regardless of the stack's size."
          />

          <div className="mt-6">
            <InteractiveExercise
              question="After executing the following code, what will be the top element of the stack?"
              options={["10", "20", "30", "Empty stack"]}
              correctAnswer={2}
              explanation="The push operations add elements in order: 10, then 20, then 30. Since a stack follows LIFO, the last element pushed (30) will be at the top."
              code={`const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);`}
            />
          </div>
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand how to add elements to a stack with the push operation, let's move on to learning
            how to remove elements with the pop operation.
          </p>
        </section>
      </div>
    </StackTutorialLayout>
  )
}
