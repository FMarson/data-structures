import { QueueTutorialLayout } from "@/components/queue-tutorial-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function QueueEnqueueOperationPage() {
  return (
    <QueueTutorialLayout
      title="Enqueue Operation"
      description="Learn how to add elements to a queue"
      currentStep={2}
      totalSteps={5}
      prevHref="/tutorials/queue/introduction"
      nextHref="/tutorials/queue/dequeue-operation"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">The Enqueue Operation</h2>
          <p className="mb-4">
            The enqueue operation adds an element to the rear (end) of the queue. It's like a person joining the back of
            a line.
          </p>

          <p className="mb-4">When implementing a queue, the enqueue operation is responsible for:</p>

          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Adding a new element to the end of the queue</li>
            <li>Updating the rear pointer (if applicable)</li>
            <li>Increasing the size of the queue</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Array-based Implementation</h2>
          <p className="mb-4">
            In an array-based implementation, the enqueue operation is straightforward. We simply add the new element to
            the end of the array.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <CodeBlock
                title="Enqueue Operation (Array-based)"
                language="javascript"
                code={`enqueue(element) {
  // Add element to the end of the array
  this.items.push(element);
  return this; // For method chaining
}`}
                highlightLines={[2, 3]}
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/70">Before enqueuing 50:</div>
              <div className="flex items-center space-x-2">
                {[10, 20, 30].map((value, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-md text-white font-bold"
                  >
                    {value}
                  </div>
                ))}
              </div>

              <div className="mt-6 mb-2 text-sm text-white/70">After enqueuing 50:</div>
              <div className="flex items-center space-x-2">
                {[10, 20, 30, 50].map((value, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center w-12 h-12 ${
                      value === 50 ? "bg-green-600" : "bg-purple-600"
                    } rounded-md text-white font-bold`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                Time Complexity: <span className="text-green-400 font-mono">O(1)</span> - constant time
              </li>
              <li>Always adds to the rear of the queue</li>
              <li>Simple to implement using JavaScript's built-in array methods</li>
              <li>May require resizing the array if it has a fixed capacity</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Linked List-based Implementation</h2>
          <p className="mb-4">
            In a linked list-based implementation, we add a new node to the tail of the linked list.
          </p>

          <CodeBlock
            title="Enqueue Operation (Linked List-based)"
            language="javascript"
            code={`class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListQueue {
  constructor() {
    this.head = null; // Front of the queue
    this.tail = null; // Rear of the queue
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    
    // If queue is empty, set both head and tail to the new node
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, add to the end and update tail
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
    return this;
  }
  
  isEmpty() {
    return this.size === 0;
  }
}`}
            highlightLines={[15, 18, 19, 20, 22, 23, 26]}
          />

          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                Time Complexity: <span className="text-green-400 font-mono">O(1)</span> - constant time
              </li>
              <li>Requires maintaining both head and tail pointers for efficiency</li>
              <li>Special handling for the first element (when the queue is empty)</li>
              <li>No capacity limitations (can grow as needed)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Circular Queue Implementation</h2>
          <p className="mb-4">
            In a circular queue, we use an array with front and rear pointers that wrap around to the beginning when
            they reach the end. This allows for more efficient use of space.
          </p>

          <CodeBlock
            title="Enqueue Operation (Circular Queue)"
            language="javascript"
            code={`class CircularQueue {
  constructor(capacity = 5) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enqueue(element) {
    // Check if queue is full
    if (this.isFull()) {
      throw new Error("Queue overflow");
      // Alternatively, resize the queue
      // this.resize();
    }
    
    // Add element at the rear position
    this.items[this.rear] = element;
    
    // Update rear (wrap around if necessary)
    this.rear = (this.rear + 1) % this.capacity;
    
    // Increment size
    this.size++;
    
    return this;
  }
  
  isFull() {
    return this.size === this.capacity;
  }
  
  isEmpty() {
    return this.size === 0;
  }
}`}
            highlightLines={[10, 11, 12, 17, 20, 23]}
          />

          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                Time Complexity: <span className="text-green-400 font-mono">O(1)</span> - constant time
              </li>
              <li>Uses modulo arithmetic to wrap around the array</li>
              <li>Requires tracking size separately from front and rear pointers</li>
              <li>More efficient space utilization compared to simple array implementation</li>
              <li>Needs to handle the queue being full</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Edge Cases and Considerations</h2>

          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Queue Overflow</h3>
              <p className="text-sm">
                In fixed-size implementations, you need to handle the case when the queue is full. Options include:
              </p>
              <ul className="list-disc list-inside text-sm mt-2">
                <li>Throw an error</li>
                <li>Return a failure indicator</li>
                <li>Resize the queue (dynamic array)</li>
                <li>Implement a circular buffer</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Performance Considerations</h3>
              <p className="text-sm">While the enqueue operation is typically O(1), there are some considerations:</p>
              <ul className="list-disc list-inside text-sm mt-2">
                <li>Array resizing can occasionally cause O(n) operations</li>
                <li>Memory allocation for new nodes in linked list implementations</li>
                <li>Cache locality is better in array-based implementations</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Practical Example</h2>
          <p className="mb-4">Let's see a complete example of a queue with the enqueue operation:</p>

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
  
  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Get the size of the queue
  size() {
    return this.items.length;
  }
}

// Usage example
const queue = new Queue();

console.log("Queue created. Is empty?", queue.isEmpty()); // true

queue.enqueue(10);
console.log("After enqueuing 10:", queue.items); // [10]

queue.enqueue(20).enqueue(30); // Method chaining
console.log("After enqueuing 20 and 30:", queue.items); // [10, 20, 30]

console.log("Queue size:", queue.size()); // 3`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="What is the time complexity of the enqueue operation in a properly implemented queue?"
            options={[
              "O(1) - constant time",
              "O(log n) - logarithmic time",
              "O(n) - linear time",
              "O(n²) - quadratic time",
            ]}
            correctAnswer={0}
            explanation="The enqueue operation in a properly implemented queue has O(1) time complexity because it simply adds an element to the rear of the queue, regardless of how many elements are already in the queue."
          />
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand how to add elements to a queue with the enqueue operation, let's move on to learning
            how to remove elements from a queue with the dequeue operation.
          </p>
        </section>
      </div>
    </QueueTutorialLayout>
  )
}
