import { QueueTutorialLayout } from "@/components/queue-tutorial-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function QueueApplicationsPage() {
  return (
    <QueueTutorialLayout
      title="Applications of Queues"
      description="Explore real-world use cases and implementations"
      currentStep={5}
      totalSteps={5}
      prevHref="/tutorials/queue/peek-operation"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Common Applications of Queues</h2>
          <p className="mb-4">
            Queues are fundamental data structures with numerous applications in computer science and everyday
            scenarios. Let's explore some of the most common applications of queues in various domains.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Operating Systems</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>CPU scheduling (process queues)</li>
                <li>Interrupt handling</li>
                <li>Spooling in printers</li>
                <li>Buffer for devices like keyboards</li>
                <li>I/O request management</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Web Development</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Request processing in web servers</li>
                <li>Task scheduling in background jobs</li>
                <li>Message queues in distributed systems</li>
                <li>Event handling in JavaScript</li>
                <li>API rate limiting</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Algorithms</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Breadth-first search (BFS)</li>
                <li>Level order traversal of trees</li>
                <li>Handling of synchronous operations</li>
                <li>Implementing LRU caches</li>
                <li>Sliding window problems</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2">Real-world Scenarios</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Ticket systems in customer service</li>
                <li>Traffic management</li>
                <li>Waiting lines in simulations</li>
                <li>Call center phone systems</li>
                <li>Shared resource management</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Breadth-First Search (BFS)</h2>
          <p className="mb-4">
            One of the most common applications of queues is in the Breadth-First Search algorithm, which is used to
            traverse or search tree or graph data structures.
          </p>

          <CodeBlock
            title="Breadth-First Search Using a Queue"
            language="javascript"
            code={`function breadthFirstSearch(graph, startNode) {
  // Create a queue for BFS
  const queue = [];
  
  // Set to keep track of visited nodes
  const visited = new Set();
  
  // Mark the start node as visited and enqueue it
  visited.add(startNode);
  queue.push(startNode);
  
  while (queue.length > 0) {
    // Dequeue a node from the queue
    const currentNode = queue.shift();
    
    console.log("Visiting node:", currentNode);
    
    // Get all adjacent nodes of the dequeued node
    // If an adjacent node has not been visited, mark it as visited and enqueue it
    const neighbors = graph[currentNode] || [];
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

// Example usage
const graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};

breadthFirstSearch(graph, 'A');
// Output: Visiting node: A, B, C, D, E, F`}
          />

          <p className="mt-4">
            In this example, the queue ensures that nodes are visited in the order of their distance from the starting
            node, which is the defining characteristic of breadth-first search.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Task Scheduling</h2>
          <p className="mb-4">
            Queues are often used in task scheduling systems to manage the execution of tasks in a first-come,
            first-served manner.
          </p>

          <CodeBlock
            title="Simple Task Scheduler"
            language="javascript"
            code={`class Task {
  constructor(id, description, executionTime) {
    this.id = id;
    this.description = description;
    this.executionTime = executionTime; // in milliseconds
  }
  
  execute() {
    console.log(\`Executing task \${this.id}: \${this.description}\`);
    // Simulate task execution
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(\`Task \${this.id} completed\`);
        resolve();
      }, this.executionTime);
    });
  }
}

class TaskScheduler {
  constructor() {
    this.taskQueue = [];
    this.isProcessing = false;
  }
  
  addTask(task) {
    this.taskQueue.push(task);
    console.log(\`Task \${task.id} added to the queue\`);
    
    // Start processing if not already in progress
    if (!this.isProcessing) {
      this.processQueue();
    }
    
    return this;
  }
  
  async processQueue() {
    if (this.isProcessing || this.taskQueue.length === 0) {
      return;
    }
    
    this.isProcessing = true;
    
    while (this.taskQueue.length > 0) {
      const task = this.taskQueue.shift(); // Dequeue the next task
      console.log(\`Processing task \${task.id}\`);
      
      try {
        await task.execute();
      } catch (error) {
        console.error(\`Error executing task \${task.id}:\`, error);
      }
    }
    
    this.isProcessing = false;
    console.log("All tasks completed");
  }
  
  getQueueLength() {
    return this.taskQueue.length;
  }
}

// Example usage
const scheduler = new TaskScheduler();

scheduler.addTask(new Task(1, "Send email notification", 1000));
scheduler.addTask(new Task(2, "Generate report", 2000));
scheduler.addTask(new Task(3, "Backup database", 1500));

console.log(\`Tasks in queue: \${scheduler.getQueueLength()}\`);`}
          />

          <p className="mt-4">
            This task scheduler uses a queue to manage tasks and process them in the order they were added. This is a
            common pattern in many systems, including job queues, print spoolers, and background workers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Message Queues in Distributed Systems</h2>
          <p className="mb-4">
            In distributed systems, message queues are used to decouple different components and enable asynchronous
            communication. Popular message queue systems include RabbitMQ, Apache Kafka, and AWS SQS.
          </p>

          <div className="bg-white/5 p-4 rounded-md mb-4">
            <h3 className="font-medium mb-2">Benefits of Message Queues</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Decoupling: Producers and consumers don't need to interact directly</li>
              <li>Scalability: Can handle varying loads by buffering messages</li>
              <li>Reliability: Messages persist even if consumers are temporarily unavailable</li>
              <li>Load balancing: Distribute work across multiple consumers</li>
              <li>Asynchronous processing: Producers don't need to wait for consumers</li>
            </ul>
          </div>

          <p>Here's a simplified example of how a message queue might be used in a web application:</p>

          <CodeBlock
            title="Simple Message Queue System"
            language="javascript"
            code={`class MessageQueue {
  constructor(name) {
    this.name = name;
    this.messages = [];
    this.consumers = [];
  }
  
  // Producer sends a message to the queue
  publish(message) {
    this.messages.push(message);
    console.log(\`[\${this.name}] Message published: \${JSON.stringify(message)}\`);
    this.processMessages();
    return this;
  }
  
  // Consumer subscribes to receive messages
  subscribe(callback) {
    this.consumers.push(callback);
    console.log(\`[\${this.name}] New consumer subscribed\`);
    this.processMessages();
    return this;
  }
  
  // Process messages if there are any and consumers are available
  processMessages() {
    if (this.messages.length === 0 || this.consumers.length === 0) {
      return;
    }
    
    // Get the next message
    const message = this.messages.shift();
    
    // Round-robin distribution to consumers
    const consumer = this.consumers.shift();
    this.consumers.push(consumer);
    
    // Send the message to the consumer
    setTimeout(() => {
      try {
        consumer(message);
      } catch (error) {
        console.error(\`[\${this.name}] Error processing message:\`, error);
        // In a real system, might requeue the message or send to a dead letter queue
        this.messages.unshift(message);
      }
      
      // Continue processing if there are more messages
      this.processMessages();
    }, 0);
  }
  
  getQueueLength() {
    return this.messages.length;
  }
}

// Example usage
const emailQueue = new MessageQueue("EmailQueue");

// Add consumers
emailQueue.subscribe((message) => {
  console.log(\`Consumer 1 processing: \${JSON.stringify(message)}\`);
  // Send email logic would go here
});

emailQueue.subscribe((message) => {
  console.log(\`Consumer 2 processing: \${JSON.stringify(message)}\`);
  // Send email logic would go here
});

// Producers publish messages
emailQueue.publish({ to: "user1@example.com", subject: "Welcome!", body: "Hello there!" });
emailQueue.publish({ to: "user2@example.com", subject: "Order Confirmation", body: "Your order has shipped." });
emailQueue.publish({ to: "user3@example.com", subject: "Password Reset", body: "Click here to reset your password." });`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Level Order Traversal of Trees</h2>
          <p className="mb-4">
            Queues are used to perform level order traversal of trees, where nodes are visited level by level from top
            to bottom.
          </p>

          <CodeBlock
            title="Level Order Traversal of Binary Tree"
            language="javascript"
            code={`class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function levelOrderTraversal(root) {
  if (!root) {
    return [];
  }
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.value);
      
      if (node.left) {
        queue.push(node.left);
      }
      
      if (node.right) {
        queue.push(node.right);
      }
    }
    
    result.push(currentLevel);
  }
  
  return result;
}

// Example usage
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

/*
      1
     / \\
    2   3
   / \\ / \\
  4  5 6  7
*/

const levels = levelOrderTraversal(root);
console.log(levels);
// Output: [[1], [2, 3], [4, 5, 6, 7]]`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Implementing a Custom Queue Class</h2>
          <p className="mb-4">Let's implement a more robust queue class that can be used in real-world applications:</p>

          <CodeBlock
            title="Robust Queue Implementation"
            language="javascript"
            code={`class Queue {
  constructor(capacity = Infinity) {
    this.capacity = capacity;
    this.storage = {};
    this.head = 0;
    this.tail = 0;
  }
  
  enqueue(item) {
    if (this.size() >= this.capacity) {
      throw new Error("Queue has reached max capacity, cannot enqueue");
    }
    
    this.storage[this.tail] = item;
    this.tail++;
    return this.size();
  }
  
  dequeue() {
    if (this.size() === 0) {
      return undefined;
    }
    
    const item = this.storage[this.head];
    delete this.storage[this.head];
    this.head++;
    
    // Reset head and tail pointers to avoid integer overflow
    if (this.head === this.tail) {
      this.head = 0;
      this.tail = 0;
    }
    
    return item;
  }
  
  peek() {
    if (this.size() === 0) {
      return undefined;
    }
    
    return this.storage[this.head];
  }
  
  size() {
    return this.tail - this.head;
  }
  
  isEmpty() {
    return this.size() === 0;
  }
  
  isFull() {
    return this.size() === this.capacity;
  }
  
  clear() {
    this.storage = {};
    this.head = 0;
    this.tail = 0;
  }
  
  toArray() {
    const result = [];
    for (let i = this.head; i < this.tail; i++) {
      result.push(this.storage[i]);
    }
    return result;
  }
}

// Example usage
const queue = new Queue(5); // Queue with capacity of 5

queue.enqueue("Task 1");
queue.enqueue("Task 2");
queue.enqueue("Task 3");

console.log("Queue size:", queue.size()); // 3
console.log("Front item:", queue.peek()); // "Task 1"
console.log("Is queue full?", queue.isFull()); // false

const item = queue.dequeue();
console.log("Dequeued item:", item); // "Task 1"
console.log("Queue size after dequeue:", queue.size()); // 2

console.log("Queue as array:", queue.toArray()); // ["Task 2", "Task 3"]`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Priority Queues</h2>
          <p className="mb-4">
            A priority queue is a special type of queue where elements are dequeued based on their priority rather than
            their arrival order.
          </p>

          <CodeBlock
            title="Simple Priority Queue Implementation"
            language="javascript"
            code={`class PriorityQueue {
  constructor() {
    this.items = [];
  }
  
  // Add an element with a priority
  enqueue(element, priority) {
    const queueElement = { element, priority };
    
    // If queue is empty, add the element
    if (this.isEmpty()) {
      this.items.push(queueElement);
      return;
    }
    
    // Find the correct position based on priority
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    
    // If the element has the lowest priority, add it to the end
    if (!added) {
      this.items.push(queueElement);
    }
  }
  
  // Remove and return the highest priority element
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift().element;
  }
  
  // Return the highest priority element without removing it
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0].element;
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
  
  clear() {
    this.items = [];
  }
}

// Example usage
const emergencyRoom = new PriorityQueue();

// Lower number = higher priority
emergencyRoom.enqueue("Common Cold", 5);
emergencyRoom.enqueue("Gunshot Wound", 1);
emergencyRoom.enqueue("High Fever", 4);
emergencyRoom.enqueue("Broken Arm", 2);
emergencyRoom.enqueue("Glass in Foot", 3);

console.log("Patients in queue:", emergencyRoom.size()); // 5
console.log("Next patient to be treated:", emergencyRoom.peek()); // "Gunshot Wound"

console.log("Treating patients in priority order:");
while (!emergencyRoom.isEmpty()) {
  console.log(emergencyRoom.dequeue());
}
// Output:
// "Gunshot Wound"
// "Broken Arm"
// "Glass in Foot"
// "High Fever"
// "Common Cold"`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <InteractiveExercise
            question="Which of the following is NOT a common application of queues?"
            options={[
              "Breadth-first search in graphs",
              "Task scheduling in operating systems",
              "Undo functionality in text editors",
              "Message passing in distributed systems",
            ]}
            correctAnswer={2}
            explanation="Undo functionality in text editors typically uses a stack (LIFO) rather than a queue, as you want to undo the most recent action first. The other options are all common applications of queues."
          />
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Conclusion</h2>
          <p>
            Queues are versatile data structures with applications across many domains of computer science and software
            engineering. Understanding how to implement and use queues effectively is an essential skill for any
            developer.
          </p>
          <p className="mt-4">
            You've now completed the Queue tutorial! You've learned about the FIFO principle, how to implement the core
            operations (enqueue, dequeue, peek), and explored various applications of queues. You can now apply this
            knowledge to solve problems that require ordered processing or breadth-first traversal.
          </p>
        </section>
      </div>
    </QueueTutorialLayout>
  )
}
