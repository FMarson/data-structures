import { QueueTutorialLayout } from "@/components/queue-tutorial-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function QueueDequeueOperationPage() {
  return (
    <QueueTutorialLayout
      title="Dequeue Operation"
      description="Learn how to remove elements from a queue"
      currentStep={3}
      totalSteps={5}
      prevHref="/tutorials/queue/enqueue-operation"
      nextHref="/tutorials/queue/peek-operation"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">The Dequeue Operation</h2>
          <p className="mb-4">
            The dequeue operation removes and returns the element at the front of the queue. It's like serving the next
            person in line.
          </p>

          <p className="mb-4">When implementing a queue, the dequeue operation is responsible for:</p>

          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Removing the element from the front of the queue</li>
            <li>Updating the front pointer (if applicable)</li>
            <li>Decreasing the size of the queue</li>
            <li>Returning the removed element</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Array-based Implementation</h2>
          <p className="mb-4">
            In a simple array-based implementation, we use the <code>shift()</code> method to remove the first element
            from the array. However, this is inefficient as it requires shifting all remaining elements.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <CodeBlock
                title="Dequeue Operation (Simple Array-based)"
                language="javascript"
                code={`dequeue() {
  // Check if queue is empty
  if (this.isEmpty()) {
    return null; // Or throw an error
  }
  
  // Remove and return the front element
  return this.items.shift();
}`}
                highlightLines={[3, 7]}
              />
            </div>
            <div>
              <div className="mb-2 text-sm text-white/70">Before dequeuing:</div>
              <div className="flex items-center space-x-2">
                {[10, 20, 30, 40].map((value, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center w-12 h-12 ${
                      index === 0 ? "bg-red-600" : "bg-purple-600"
                    } rounded-md text-white font-bold`}
                  >
                    {value}
                  </div>
                ))}
              </div>

              <div className="mt-6 mb-2 text-sm text-white/70">After dequeuing (10 removed):</div>
              <div className="flex items-center space-x-2">
                {[20, 30, 40].map((value, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-md text-white font-bold"
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
                Time Complexity: <span className="text-red-400 font-mono">O(n)</span> - linear time
              </li>
              <li>
                The <code>shift()</code> operation requires shifting all remaining elements
              </li>
              <li>Simple to implement but inefficient for large queues</li>
              <li>Always check if the queue is empty before dequeuing</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Optimized Array Implementation</h2>
          <p className="mb-4">
            To improve the efficiency of the dequeue operation, we can use a more sophisticated approach with front and
            rear pointers.
          </p>

          <CodeBlock
            title="Dequeue Operation (Optimized Array-based)"
            language="javascript"
            code={`class OptimizedQueue {
  constructor() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }
  
  enqueue(element) {
    this.items[this.rear] = element;
    this.rear++;
    return this;
  }
  
  dequeue() {
    // Check if queue is empty
    if (this.isEmpty()) {
      return null;
    }
    
    // Get the front element
    const item = this.items[this.front];
    
    // Delete the front element
    delete this.items[this.front];
    
    // Move front pointer
    this.front++;
    
    return item;
  }
  
  isEmpty() {
    return this.rear - this.front === 0;
  }
  
  size() {
    return this.rear - this.front;
  }
}`}
            highlightLines={[13, 14, 15, 19, 22, 25]}
          />

          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                Time Complexity: <span className="text-green-400 font-mono">O(1)</span> - constant time
              </li>
              <li>Uses an object instead of an array to avoid the shift operation</li>
              <li>Front and rear pointers keep track of the queue boundaries</li>
              <li>More efficient for large queues with frequent dequeue operations</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Linked List-based Implementation</h2>
          <p className="mb-4">
            In a linked list-based implementation, we remove the node at the head of the linked list.
          </p>

          <CodeBlock
            title="Dequeue Operation (Linked List-based)"
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
  
  // Enqueue method (for reference)
  enqueue(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    return this;
  }
  
  dequeue() {
    // Check if queue is empty
    if (this.isEmpty()) {
      return null;
    }
    
    // Get the value of the head node
    const value = this.head.value;
    
    // If there's only one node
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      // Move head pointer to the next node
      this.head = this.head.next;
    }
    
    this.size--;
    return value;
  }
  
  isEmpty() {
    return this.size === 0;
  }
}`}
            highlightLines={[29, 30, 31, 35, 38, 39, 40, 42, 43, 46]}
          />

          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                Time Complexity: <span className="text-green-400 font-mono">O(1)</span> - constant time
              </li>
              <li>Special handling for the case when there's only one node</li>
              <li>Updates the head pointer to the next node</li>
              <li>No need to shift elements, making it more efficient</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Circular Queue Implementation</h2>
          <p className="mb-4">
            In a circular queue, the dequeue operation removes the element at the front position and updates the front
            pointer.
          </p>

          <CodeBlock
            title="Dequeue Operation (Circular Queue)"
            language="javascript"
            code={`class CircularQueue {
  constructor(capacity = 5) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }
  
  // Enqueue method (for reference)
  enqueue(element) {
    if (this.isFull()) {
      throw new Error("Queue overflow");
    }
    this.items[this.rear] = element;
    this.rear = (this.rear + 1) % this.capacity;
    this.size++;
    return this;
  }
  
  dequeue() {
    // Check if queue is empty
    if (this.isEmpty()) {
      return null;
    }
    
    // Get the front element
    const item = this.items[this.front];
    
    // Clear the front position
    this.items[this.front] = undefined;
    
    // Update front (wrap around if necessary)
    this.front = (this.front + 1) % this.capacity;
    
    // Decrement size
    this.size--;
    
    return item;
  }
  
  isEmpty() {
    return this.size === 0;
  }
  
  isFull() {
    return this.size === this.capacity;
  }
}`}
            highlightLines={[20, 21, 22, 26, 29, 32, 35]}
          />

          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <p className="font-medium">Key Points:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>
                Time Complexity: <span className="text-green-400 font-mono">O(1)</span> - constant time
              </li>
              <li>Uses modulo arithmetic to wrap around the array</li>
              <li>Maintains the circular nature of the queue</li>
              <li>Efficient for both enqueue and dequeue operations</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Edge Cases and Considerations</h2>

          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Queue Underflow</h3>
              <p className="text-sm">
                Always check if the queue is empty before attempting to dequeue. Options for handling empty queues
                include:
              </p>
              <ul className="list-disc list-inside text-sm mt-2">
                <li>Return null or undefined</li>
                <li>Throw an error</li>
                <li>Return a special value indicating failure</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Memory Management</h3>
              <p className="text-sm">In some implementations, you might need to consider memory management:</p>
              <ul className="list-disc list-inside text-sm mt-2">
                <li>In the optimized array implementation, the front and rear pointers keep increasing</li>
                <li>Consider resetting the pointers when the queue becomes empty</li>
                <li>In linked list implementations, removed nodes should be properly garbage collected</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Practical Example</h2>
          <p className="mb-4">Let's see a complete example of a queue with both enqueue and dequeue operations:</p>

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

queue.enqueue(10).enqueue(20).enqueue(30);
console.log("Queue after enqueuing:", queue.items); // [10, 20, 30]

const firstItem = queue.dequeue();
console.log("Dequeued item:", firstItem); // 10
console.log("Queue after dequeuing:", queue.items); // [20, 30]

queue.enqueue(40);
console.log("Queue after enqueuing 40:", queue.items); // [20, 30, 40]

const secondItem = queue.dequeue();
console.log("Dequeued item:", secondItem); // 20
console.log("Queue after dequeuing again:", queue.items); // [30, 40]`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="What is the time complexity of the dequeue operation in a simple array-based queue implementation?"
            options={[
              "O(1) - constant time",
              "O(log n) - logarithmic time",
              "O(n) - linear time",
              "O(n²) - quadratic time",
            ]}
            correctAnswer={2}
            explanation="The dequeue operation in a simple array-based queue implementation has O(n) time complexity because the shift() method requires shifting all remaining elements one position to the left."
          />
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand how to remove elements from a queue with the dequeue operation, let's move on to
            learning how to view the front element without removing it using the peek operation.
          </p>
        </section>
      </div>
    </QueueTutorialLayout>
  )
}
