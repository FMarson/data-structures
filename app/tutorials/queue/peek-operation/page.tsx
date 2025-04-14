import { QueueTutorialLayout } from "@/components/queue-tutorial-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function QueuePeekOperationPage() {
  return (
    <QueueTutorialLayout
      title="Peek Operation"
      description="Learn how to view elements without removing them"
      currentStep={4}
      totalSteps={5}
      prevHref="/tutorials/queue/dequeue-operation"
      nextHref="/tutorials/queue/applications"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">The Peek Operation</h2>
          <p className="mb-4">
            The peek operation (sometimes called front) returns the element at the front of the queue without removing
            it. It's like looking at who's next in line without serving them.
          </p>

          <p className="mb-4">When implementing a queue, the peek operation is responsible for:</p>

          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Accessing the element at the front of the queue</li>
            <li>Returning the element without modifying the queue</li>
            <li>Checking if the queue is empty before attempting to peek</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Array-based Implementation</h2>
          <p className="mb-4">In a simple array-based implementation, we access the first element of the array.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <CodeBlock
                title="Peek Operation (Simple Array-based)"
                language="javascript"
                code={`peek() {
  // Check if queue is empty
  if (this.isEmpty()) {
    return null; // Or throw an error
  }
  
  // Return the front element without removing it
  return this.items[0];
}`}
                highlightLines={[3, 7]}
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/70">Queue with peek operation:</div>
              <div className="flex items-center space-x-2">
                {[10, 20, 30, 40].map((value, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center w-12 h-12 ${
                      index === 0 ? "bg-blue-600" : "bg-purple-600"
                    } rounded-md text-white font-bold`}
                  >
                    {value}
                  </div>
                ))}
              </div>
              <div className="mt-2 text-sm text-blue-400">peek() returns 10 without removing it</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                Time Complexity: <span className="text-green-400 font-mono">O(1)</span> - constant time
              </li>
              <li>Does not modify the queue structure</li>
              <li>Always check if the queue is empty before peeking</li>
              <li>Simple to implement using array indexing</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Optimized Array Implementation</h2>
          <p className="mb-4">
            In an optimized array implementation with front and rear pointers, we access the element at the front
            pointer.
          </p>

          <CodeBlock
            title="Peek Operation (Optimized Array-based)"
            language="javascript"
            code={`class OptimizedQueue {
  constructor() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }
  
  // Enqueue and dequeue methods (for reference)
  // ...
  
  peek() {
    // Check if queue is empty
    if (this.isEmpty()) {
      return null;
    }
    
    // Return the front element without removing it
    return this.items[this.front];
  }
  
  isEmpty() {
    return this.rear - this.front === 0;
  }
}`}
            highlightLines={[11, 12, 13, 17]}
          />

          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                Time Complexity: <span className="text-green-400 font-mono">O(1)</span> - constant time
              </li>
              <li>Uses the front pointer to access the first element</li>
              <li>Works with the object-based implementation</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Linked List-based Implementation</h2>
          <p className="mb-4">In a linked list-based implementation, we access the value of the head node.</p>

          <CodeBlock
            title="Peek Operation (Linked List-based)"
            language="javascript"
            code={`class LinkedListQueue {
  constructor() {
    this.head = null; // Front of the queue
    this.tail = null; // Rear of the queue
    this.size = 0;
  }
  
  // Enqueue and dequeue methods (for reference)
  // ...
  
  peek() {
    // Check if queue is empty
    if (this.isEmpty()) {
      return null;
    }
    
    // Return the value of the head node without removing it
    return this.head.value;
  }
  
  isEmpty() {
    return this.size === 0;
  }
}`}
            highlightLines={[11, 12, 13, 17]}
          />

          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                Time Complexity: <span className="text-green-400 font-mono">O(1)</span> - constant time
              </li>
              <li>Accesses the value property of the head node</li>
              <li>No traversal required since we have a direct reference to the head</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Circular Queue Implementation</h2>
          <p className="mb-4">In a circular queue, the peek operation accesses the element at the front position.</p>

          <CodeBlock
            title="Peek Operation (Circular Queue)"
            language="javascript"
            code={`class CircularQueue {
  constructor(capacity = 5) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }
  
  // Enqueue and dequeue methods (for reference)
  // ...
  
  peek() {
    // Check if queue is empty
    if (this.isEmpty()) {
      return null;
    }
    
    // Return the front element without removing it
    return this.items[this.front];
  }
  
  isEmpty() {
    return this.size === 0;
  }
}`}
            highlightLines={[12, 13, 14, 18]}
          />

          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                Time Complexity: <span className="text-green-400 font-mono">O(1)</span> - constant time
              </li>
              <li>Uses the front pointer to access the first element</li>
              <li>Works with the circular array implementation</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Additional Utility Methods</h2>
          <p className="mb-4">
            Besides the core operations (enqueue, dequeue, peek), queues typically support these utility methods:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">isEmpty</h3>
              <CodeBlock
                language="javascript"
                code={`isEmpty() {
  return this.size === 0;
  // Or for array-based: return this.items.length === 0;
}`}
              />
              <p className="mt-2 text-sm text-white/70">Checks if the queue has no elements.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">size</h3>
              <CodeBlock
                language="javascript"
                code={`size() {
  return this.size;
  // Or for array-based: return this.items.length;
}`}
              />
              <p className="mt-2 text-sm text-white/70">Returns the number of elements in the queue.</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">clear</h3>
            <CodeBlock
              language="javascript"
              code={`clear() {
  // For array-based
  this.items = [];
  
  // For linked list-based
  this.head = null;
  this.tail = null;
  this.size = 0;
  
  // For circular queue
  this.items = new Array(this.capacity);
  this.front = 0;
  this.rear = 0;
  this.size = 0;
}`}
            />
            <p className="mt-2 text-sm text-white/70">Removes all elements from the queue.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Practical Example</h2>
          <p className="mb-4">Let's see a complete example of a queue with all operations:</p>

          <CodeBlock
            language="javascript"
            code={`class Queue {
  constructor() {
    this.items = [];
  }
  
  // Add an element to the queue
  enqueue(element) {
    this.items.push(element);
    return this;
  }
  
  // Remove and return the front element
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }
  
  // Return the front element without removing it
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }
  
  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Get the size of the queue
  size() {
    return this.items.length;
  }
  
  // Clear the queue
  clear() {
    this.items = [];
  }
}

// Usage example
const queue = new Queue();

queue.enqueue(10).enqueue(20).enqueue(30);
console.log("Queue:", queue.items); // [10, 20, 30]

console.log("Front element:", queue.peek()); // 10
console.log("Queue after peek:", queue.items); // [10, 20, 30] (unchanged)

const firstItem = queue.dequeue();
console.log("Dequeued item:", firstItem); // 10
console.log("Queue after dequeue:", queue.items); // [20, 30]

console.log("New front element:", queue.peek()); // 20

queue.clear();
console.log("Queue after clear:", queue.items); // []
console.log("Is queue empty?", queue.isEmpty()); // true`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="What happens to the queue when you call the peek operation?"
            options={[
              "The front element is removed from the queue",
              "The front element is returned without modifying the queue",
              "The rear element is returned without modifying the queue",
              "All elements are returned as an array",
            ]}
            correctAnswer={1}
            explanation="The peek operation returns the front element of the queue without removing it or modifying the queue in any way. It's useful for examining the next element to be processed without actually processing it."
          />
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand all the core operations of queues (enqueue, dequeue, and peek), let's explore
            practical applications of queues in the next section.
          </p>
        </section>
      </div>
    </QueueTutorialLayout>
  )
}
