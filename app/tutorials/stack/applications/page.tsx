import { StackTutorialLayout } from "@/components/stack-tutorial-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function StackApplicationsPage() {
  return (
    <StackTutorialLayout
      title="Applications of Stacks"
      description="Explore real-world uses of stack data structures"
      currentStep={5}
      totalSteps={5}
      prevHref="/tutorials/stack/peek-operation"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Common Applications of Stacks</h2>
          <p className="mb-4">
            Stacks are one of the most widely used data structures in computer science. Their LIFO (Last-In-First-Out)
            behavior makes them perfect for many applications where the most recently added item needs to be processed
            first.
          </p>

          <p className="mb-4">Let's explore some of the most common and important applications of stacks.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Function Call Management</h2>
          <p className="mb-4">
            One of the most important applications of stacks is in managing function calls in programming languages.
            When a function is called, its execution context (local variables, return address, etc.) is pushed onto a
            stack known as the "call stack."
          </p>

          <p className="mb-4">
            When the function returns, its context is popped from the stack, and execution resumes from the return
            address.
          </p>

          <div className="bg-white/5 p-4 rounded-md mt-4">
            <h3 className="font-medium mb-2">Call Stack Example:</h3>
            <CodeBlock
              language="javascript"
              code={`function first() {
  console.log("Starting first");
  second();
  console.log("Ending first");
}

function second() {
  console.log("Starting second");
  third();
  console.log("Ending second");
}

function third() {
  console.log("In third function");
}

// Call stack progression:
// 1. main() is pushed
// 2. first() is pushed
// 3. second() is pushed
// 4. third() is pushed
// 5. third() completes and is popped
// 6. second() completes and is popped
// 7. first() completes and is popped
// 8. main() continues

first();`}
              highlightLines={[3, 8, 13]}
            />
            <p className="mt-2 text-sm text-white/70">Output:</p>
            <pre className="mt-1 p-2 bg-black/30 rounded text-sm overflow-x-auto">
              Starting first Starting second In third function Ending second Ending first
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Expression Evaluation</h2>
          <p className="mb-4">
            Stacks are used to evaluate expressions, particularly those in postfix (Reverse Polish) notation. They're
            also used in the implementation of expression parsers and compilers.
          </p>

          <div className="bg-white/5 p-4 rounded-md mt-4">
            <h3 className="font-medium mb-2">Evaluating Postfix Expression:</h3>
            <CodeBlock
              language="javascript"
              code={`function evaluatePostfix(expression) {
  const stack = new Stack();
  
  for (let token of expression.split(' ')) {
    if (!isNaN(token)) {
      // If token is a number, push it onto the stack
      stack.push(Number(token));
    } else {
      // If token is an operator, pop two operands and apply the operator
      const b = stack.pop();
      const a = stack.pop();
      
      switch(token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(a / b); break;
      }
    }
  }
  
  // The final result should be the only item left on the stack
  return stack.pop();
}

// Example: "2 3 + 5 *" = (2 + 3) * 5 = 25
console.log(evaluatePostfix("2 3 + 5 *")); // Output: 25`}
              highlightLines={[6, 10, 11, 13, 14, 15, 16, 22]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Balanced Parentheses</h2>
          <p className="mb-4">
            Stacks are perfect for checking if an expression has balanced parentheses, brackets, and braces. This is a
            common problem in code editors, compilers, and syntax validators.
          </p>

          <div className="bg-white/5 p-4 rounded-md mt-4">
            <h3 className="font-medium mb-2">Checking Balanced Parentheses:</h3>
            <CodeBlock
              language="javascript"
              code={`function isBalanced(expression) {
  const stack = new Stack();
  
  for (let char of expression) {
    if (char === '(' || char === '[' || char === '{') {
      // Push opening brackets onto the stack
      stack.push(char);
    } else if (char === ')' || char === ']' || char === '}') {
      // For closing brackets, check if they match the top of the stack
      if (stack.isEmpty()) {
        return false; // More closing brackets than opening
      }
      
      const top = stack.pop();
      
      // Check if the popped bracket matches the current closing bracket
      if ((char === ')' && top !== '(') || 
          (char === ']' && top !== '[') || 
          (char === '}' && top !== '{')) {
        return false; // Mismatched brackets
      }
    }
  }
  
  // If the stack is empty, all brackets were matched
  return stack.isEmpty();
}

console.log(isBalanced("({[]})")); // Output: true
console.log(isBalanced("({[})")); // Output: false`}
              highlightLines={[6, 10, 14, 16, 17, 18, 24]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Undo/Redo Functionality</h2>
          <p className="mb-4">
            The undo/redo functionality in text editors and graphic applications is often implemented using two stacks:
            one for undo operations and one for redo operations.
          </p>

          <div className="bg-white/5 p-4 rounded-md mt-4">
            <h3 className="font-medium mb-2">Simple Undo/Redo Implementation:</h3>
            <CodeBlock
              language="javascript"
              code={`class TextEditor {
  constructor() {
    this.text = "";
    this.undoStack = new Stack();
    this.redoStack = new Stack();
  }
  
  // Add text and save previous state for undo
  addText(newText) {
    this.undoStack.push(this.text);
    this.text += newText;
    this.redoStack = new Stack(); // Clear redo stack on new action
  }
  
  // Undo the last action
  undo() {
    if (this.undoStack.isEmpty()) {
      return; // Nothing to undo
    }
    
    this.redoStack.push(this.text); // Save current state for redo
    this.text = this.undoStack.pop(); // Restore previous state
  }
  
  // Redo a previously undone action
  redo() {
    if (this.redoStack.isEmpty()) {
      return; // Nothing to redo
    }
    
    this.undoStack.push(this.text); // Save current state for undo
    this.text = this.redoStack.pop(); // Restore next state
  }
  
  // Get current text
  getText() {
    return this.text;
  }
}

// Example usage
const editor = new TextEditor();
editor.addText("Hello");
editor.addText(" World");
console.log(editor.getText()); // Output: "Hello World"

editor.undo();
console.log(editor.getText()); // Output: "Hello"

editor.redo();
console.log(editor.getText()); // Output: "Hello World"`}
              highlightLines={[4, 5, 10, 11, 19, 20, 28, 29]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Browser History</h2>
          <p className="mb-4">
            The back and forward buttons in web browsers use stacks to keep track of the browsing history. The back
            button pops from the history stack, while the forward button pops from a separate forward stack.
          </p>

          <div className="bg-white/5 p-4 rounded-md mt-4">
            <h3 className="font-medium mb-2">Simple Browser History Implementation:</h3>
            <CodeBlock
              language="javascript"
              code={`class BrowserHistory {
  constructor(homepage) {
    this.backStack = new Stack();
    this.forwardStack = new Stack();
    this.currentPage = homepage;
  }
  
  // Navigate to a new page
  visit(url) {
    this.backStack.push(this.currentPage);
    this.currentPage = url;
    this.forwardStack = new Stack(); // Clear forward history
  }
  
  // Go back to the previous page
  back() {
    if (this.backStack.isEmpty()) {
      return false; // Can't go back
    }
    
    this.forwardStack.push(this.currentPage);
    this.currentPage = this.backStack.pop();
    return true;
  }
  
  // Go forward to the next page
  forward() {
    if (this.forwardStack.isEmpty()) {
      return false; // Can't go forward
    }
    
    this.backStack.push(this.currentPage);
    this.currentPage = this.forwardStack.pop();
    return true;
  }
  
  // Get current page
  getCurrentPage() {
    return this.currentPage;
  }
}

// Example usage
const browser = new BrowserHistory("https://www.example.com");
browser.visit("https://www.example.com/page1");
browser.visit("https://www.example.com/page2");

console.log(browser.getCurrentPage()); // Output: "https://www.example.com/page2"

browser.back();
console.log(browser.getCurrentPage()); // Output: "https://www.example.com/page1"

browser.forward();
console.log(browser.getCurrentPage()); // Output: "https://www.example.com/page2"

browser.visit("https://www.example.com/page3");
console.log(browser.getCurrentPage()); // Output: "https://www.example.com/page3"

// Can't go forward now (forward history was cleared)
console.log(browser.forward()); // Output: false`}
              highlightLines={[3, 4, 9, 10, 19, 20, 29, 30]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Other Common Applications</h2>
          <p className="mb-4">Stacks are used in many other applications, including:</p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Backtracking Algorithms:</strong> Used in maze solving, puzzle solutions, and game AI.
            </li>
            <li>
              <strong>Memory Management:</strong> Used in memory allocation and deallocation.
            </li>
            <li>
              <strong>Syntax Parsing:</strong> Compilers and interpreters use stacks for parsing expressions and syntax.
            </li>
            <li>
              <strong>String Reversal:</strong> A simple application where each character is pushed onto a stack and
              then popped to reverse the string.
            </li>
            <li>
              <strong>Depth-First Search:</strong> Graph traversal algorithms often use stacks to keep track of vertices
              to visit.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="Which of the following is NOT a typical application of stacks?"
            options={[
              "Managing function calls",
              "Implementing undo functionality",
              "Priority-based scheduling",
              "Checking balanced parentheses",
            ]}
            correctAnswer={2}
            explanation="Priority-based scheduling typically uses a priority queue (often implemented with a heap), not a stack. Stacks follow LIFO order which doesn't consider priority levels."
          />

          <div className="mt-6">
            <InteractiveExercise
              question="In the expression evaluation algorithm, why do we pop two elements when we encounter an operator?"
              options={[
                "To maintain the stack's balance",
                "Because operators always need two operands",
                "To follow the LIFO principle",
                "To optimize the algorithm's performance",
              ]}
              correctAnswer={1}
              explanation="In postfix notation, operators come after their operands. When we encounter an operator, we need to pop the two most recent operands from the stack to apply the operation to them."
            />
          </div>
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Congratulations!</h2>
          <p className="mb-4">You've completed the Stack tutorial! You now understand:</p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>What a stack is and the LIFO principle</li>
            <li>How to implement the push operation to add elements</li>
            <li>How to implement the pop operation to remove elements</li>
            <li>How to implement the peek operation to view elements without removing them</li>
            <li>Real-world applications of stacks</li>
          </ul>

          <p className="mt-4">
            With this knowledge, you're well-equipped to use stacks in your own programs and understand how they're used
            in various algorithms and applications.
          </p>

          <div className="mt-6 text-center">
            <Link href="/">
              <Button size="lg" className="gap-2">
                Return to Home
                <Home className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </StackTutorialLayout>
  )
}
