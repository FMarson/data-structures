import { StackTutorialLayout } from "@/components/stack-tutorial-layout"
import { StackVisualizer } from "@/components/stack-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function StackPeekOperationPage() {
  return (
    <StackTutorialLayout
      title="Peek Operation"
      description="Learn how to view the top element without removing it"
      currentStep={4}
      totalSteps={5}
      prevHref="/tutorials/stack/pop-operation"
      nextHref="/tutorials/stack/applications"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">The Peek Operation</h2>
          <p className="mb-4">
            The peek operation (sometimes called "top") allows you to view the top element of the stack without removing
            it. This is useful when you need to check what's next in the stack without altering its structure.
          </p>

          <p className="mb-4">
            Think of it like looking at the top plate in a stack of plates without actually taking it off the stack.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Implementing Peek</h2>
          <p className="mb-4">
            In our array-based implementation, the peek operation simply returns the last element of the array (which
            represents the top of our stack) without removing it.
          </p>

          <CodeBlock
            title="Peek Implementation"
            language="javascript"
            code={`class Stack {
  constructor() {
    this.items = [];
  }

  // Push and pop methods...

  // Peek: Return the top element without removing it
  peek() {
    // Check if the stack is empty
    if (this.isEmpty()) {
      return null; // Or throw an error
    }
    
    // Return the last element without removing it
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  // Other methods...
}`}
            highlightLines={[7, 9, 10, 14]}
          />

          <div className="mt-6">
            <h3 className="font-medium mb-2">Peek Operation Visualization</h3>
            <StackVisualizer initialValues={[40, 30, 20, 10]} highlightedIndices={[0]} activeOperation="peek" />
            <div className="mt-2 text-center text-sm text-white/70">
              Stack remains unchanged: [10, 20, 30, 40], peek returns: 40
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How Peek Works</h2>
          <p className="mb-4">Let's break down the peek operation step by step:</p>

          <ol className="list-decimal list-inside space-y-3 ml-4">
            <li>
              <strong>Check if the stack is empty</strong> - Before attempting to access an element, we check if the
              stack is empty to avoid errors.
            </li>
            <li>
              <strong>Handle empty stack</strong> - If the stack is empty, we return null or throw an error, depending
              on how we want to handle this edge case.
            </li>
            <li>
              <strong>Return the top element</strong> - We access the last element of the array (which is the top of our
              stack) using <code>this.items[this.items.length - 1]</code> and return it without modifying the array.
            </li>
          </ol>

          <div className="mt-6 p-4 bg-white/5 rounded-md">
            <h3 className="font-medium mb-2">Key Points About Peek:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>
                <strong>Time Complexity:</strong> O(1) - The peek operation is constant time, meaning it takes the same
                amount of time regardless of how many elements are in the stack.
              </li>
              <li>
                <strong>Non-destructive:</strong> Unlike pop, peek does not modify the stack. The stack remains
                unchanged after a peek operation.
              </li>
              <li>
                <strong>Empty Stack Handling:</strong> Always check if the stack is empty before peeking to avoid
                errors.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Peek Operation in Action</h2>
          <p className="mb-4">Here's an example of using the peek operation:</p>

          <CodeBlock
            title="Using Peek"
            language="javascript"
            code={`// Create a new stack and push some elements
const stack = new Stack();
stack.push(10).push(20).push(30);

// Stack contains [10, 20, 30] with 30 at the top

// Peek at the top element
const topElement = stack.peek();
console.log(topElement); // Output: 30

// Stack still contains [10, 20, 30] with 30 at the top

// We can peek multiple times without changing the stack
console.log(stack.peek()); // Output: 30
console.log(stack.peek()); // Output: 30

// Check if stack is empty before peeking
if (!stack.isEmpty()) {
  const topItem = stack.peek();
  console.log(topItem); // Output: 30
}

// Pop an element and peek again
stack.pop(); // Removes 30
console.log(stack.peek()); // Output: 20`}
            highlightLines={[7, 8, 12, 13, 17, 18, 22, 23]}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Peek vs. Pop</h2>
          <p className="mb-4">It's important to understand the difference between peek and pop:</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Peek</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Returns the top element</li>
                <li>Does NOT remove the element</li>
                <li>Stack remains unchanged</li>
                <li>Can be called multiple times with the same result</li>
              </ul>
            </div>
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Pop</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Returns the top element</li>
                <li>Removes the element from the stack</li>
                <li>Stack is modified</li>
                <li>Consecutive calls return different elements</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <CodeBlock
              title="Peek vs. Pop Example"
              language="javascript"
              code={`const stack = new Stack();
stack.push(10).push(20).push(30);

// Using peek
console.log(stack.peek()); // Output: 30
console.log(stack.peek()); // Output: 30 (same result)

// Stack still contains [10, 20, 30]

// Using pop
console.log(stack.pop()); // Output: 30
console.log(stack.pop()); // Output: 20 (different result)

// Stack now contains only [10]`}
              highlightLines={[4, 5, 9, 10]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Common Use Cases for Peek</h2>
          <p className="mb-4">The peek operation is particularly useful in these scenarios:</p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Decision Making:</strong> When you need to make a decision based on the top element without
              removing it.
            </li>
            <li>
              <strong>Validation:</strong> Checking if the next element to be processed meets certain criteria.
            </li>
            <li>
              <strong>Expression Evaluation:</strong> In algorithms like expression evaluation, you might need to check
              the top operator without removing it.
            </li>
            <li>
              <strong>Lookahead:</strong> When you need to "look ahead" at what's coming next in the stack.
            </li>
          </ul>

          <div className="mt-6 p-4 bg-white/5 rounded-md">
            <h3 className="font-medium mb-2">Example: Balanced Parentheses</h3>
            <p className="text-sm mb-2">
              In a balanced parentheses algorithm, you might peek at the top of the stack to check if it matches the
              current closing bracket before popping.
            </p>
            <CodeBlock
              language="javascript"
              code={`function isBalanced(expression) {
  const stack = new Stack();
  
  for (let char of expression) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else if (char === ')' || char === ']' || char === '}') {
      // Peek first to check if the top matches
      if (stack.isEmpty() || !isMatchingPair(stack.peek(), char)) {
        return false;
      }
      // If it matches, then pop
      stack.pop();
    }
  }
  
  return stack.isEmpty();
}

function isMatchingPair(open, close) {
  return (open === '(' && close === ')') ||
         (open === '[' && close === ']') ||
         (open === '{' && close === '}');
}`}
              highlightLines={[9, 12]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="What is the main difference between peek and pop operations?"
            options={[
              "Peek is faster than pop",
              "Pop returns the bottom element, peek returns the top",
              "Peek doesn't modify the stack, pop removes the top element",
              "Peek can only be called once, pop can be called multiple times",
            ]}
            correctAnswer={2}
            explanation="The main difference is that peek only returns the top element without modifying the stack, while pop both returns and removes the top element from the stack."
          />

          <div className="mt-6">
            <InteractiveExercise
              question="After executing the following code, what will be the value of 'result'?"
              options={["10", "20", "30", "null"]}
              correctAnswer={1}
              explanation="The stack starts empty, then we push 10, 20, and 30. After popping once, 30 is removed. Then we peek, which returns the new top element, 20, without removing it."
              code={`const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
stack.pop();
const result = stack.peek();`}
            />
          </div>
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand the three core operations of a stack (push, pop, and peek), let's explore some
            real-world applications of stacks in the next section.
          </p>
        </section>
      </div>
    </StackTutorialLayout>
  )
}
