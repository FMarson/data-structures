import { StackTutorialLayout } from "@/components/stack-tutorial-layout"
import { StackVisualizer } from "@/components/stack-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function StackOperationsPage() {
  return (
    <StackTutorialLayout
      title="Stack Operations"
      description="Master push, pop, and peek operations"
      currentStep={2}
      totalSteps={5}
      prevHref="/tutorials/stack/introduction"
      nextHref="/tutorials/stack/push-operation"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Core Stack Operations</h2>
          <p className="mb-4">
            A stack supports several fundamental operations that define its behavior. Let's explore each of these
            operations in detail.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Push Operation</h2>
          <p className="mb-4">
            The push operation adds an element to the top of the stack. It's like placing a plate on top of a stack of
            plates.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <CodeBlock
                title="Push Operation"
                language="javascript"
                code={`push(element) {
  // Add element to the top of the stack
  this.items.push(element);
  return this; // For chaining
}`}
                highlightLines={[2, 3]}
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/70">Before pushing 50:</div>
              <StackVisualizer initialValues={[30, 20, 10]} />

              <div className="mt-6 mb-2 text-sm text-white/70">After pushing 50:</div>
              <StackVisualizer initialValues={[50, 30, 20, 10]} highlightedIndices={[0]} />
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                Time Complexity: <span className="text-green-400 font-mono">O(1)</span> - constant time
              </li>
              <li>Always adds to the top of the stack</li>
              <li>Can cause stack overflow if using a fixed-size implementation and the stack is full</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Pop Operation</h2>
          <p className="mb-4">
            The pop operation removes and returns the top element from the stack. It's like taking the top plate off a
            stack of plates.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <CodeBlock
                title="Pop Operation"
                language="javascript"
                code={`pop() {
  // Check if stack is empty
  if (this.isEmpty()) {
    return null; // Or throw error
  }
  
  // Remove and return the top element
  return this.items.pop();
}`}
                highlightLines={[3, 7]}
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/70">Before popping:</div>
              <StackVisualizer initialValues={[40, 30, 20, 10]} />

              <div className="mt-6 mb-2 text-sm text-white/70">After popping (40 removed):</div>
              <StackVisualizer initialValues={[30, 20, 10]} activeOperation="pop" activeIndex={0} />
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                Time Complexity: <span className="text-green-400 font-mono">O(1)</span> - constant time
              </li>
              <li>Always removes from the top of the stack</li>
              <li>Can cause stack underflow if attempted on an empty stack</li>
              <li>Should check if the stack is empty before popping</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Peek/Top Operation</h2>
          <p className="mb-4">
            The peek (or top) operation returns the top element from the stack without removing it. It's like looking at
            the top plate in a stack without taking it off.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <CodeBlock
                title="Peek Operation"
                language="javascript"
                code={`peek() {
  // Check if stack is empty
  if (this.isEmpty()) {
    return null; // Or throw error
  }
  
  // Return the top element without removing it
  return this.items[this.items.length - 1];
}`}
                highlightLines={[3, 7]}
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/70">Stack with peek operation:</div>
              <StackVisualizer initialValues={[40, 30, 20, 10]} highlightedIndices={[0]} activeOperation="peek" />
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                Time Complexity: <span className="text-green-400 font-mono">O(1)</span> - constant time
              </li>
              <li>Only accesses the top element without modifying the stack</li>
              <li>Useful for checking the next element to be processed</li>
              <li>Should check if the stack is empty before peeking</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Additional Operations</h2>
          <p className="mb-4">Besides the core operations, stacks typically support these utility operations:</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">isEmpty</h3>
              <CodeBlock
                language="javascript"
                code={`isEmpty() {
  return this.items.length === 0;
}`}
              />
              <p className="mt-2 text-sm text-white/70">Checks if the stack has no elements.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">size</h3>
              <CodeBlock
                language="javascript"
                code={`size() {
  return this.items.length;
}`}
              />
              <p className="mt-2 text-sm text-white/70">Returns the number of elements in the stack.</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">clear</h3>
            <CodeBlock
              language="javascript"
              code={`clear() {
  this.items = [];
}`}
            />
            <p className="mt-2 text-sm text-white/70">Removes all elements from the stack.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Interactive Example</h2>
          <p className="mb-4">Try out these stack operations with the interactive visualizer below:</p>

          <StackVisualizer showControls={true} initialValues={[30, 20, 10]} />
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
            explanation="The push operation in a stack has O(1) time complexity because it just adds an element to the top of the stack, regardless of how many elements are already in the stack."
          />
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand the core operations of stacks, let's look at how to implement the push operation in
            detail in the next tutorial.
          </p>
        </section>
      </div>
    </StackTutorialLayout>
  )
}
