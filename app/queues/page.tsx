"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"
import { QueueVisualizer } from "@/components/queue/simple-queue-visualizer"

export default function QueuesPage() {
  const [queue, setQueue] = useState<number[]>([1, 2, 3, 4, 5])
  const [value, setValue] = useState<number>(0)
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null)

  // Base code structure for Queue operations
  const baseCode = `class Queue {
  constructor() {
    this.items = [];
    this.front = 0;
    this.rear = -1;
  }
}`

  // Operation-specific code snippets
  const operationCodes: Record<string, { code: string; description: string }> = {
    enqueue: {
      code: `  // Add an element to the end of the queue
  enqueue(value) {
    this.rear++;
    this.items[this.rear] = value;
    return this.items; // O(1) constant time operation
  }`,
      description: "Enqueue operation adds an element to the end of the queue with O(1) time complexity.",
    },
    dequeue: {
      code: `  // Remove the front element from the queue
  dequeue() {
    if (this.isEmpty()) {
      return "Queue underflow";
    }

    const value = this.items[this.front];
    this.front++;

    // Reset the queue when it becomes empty
    if (this.front > this.rear) {
      this.front = 0;
      this.rear = -1;
      this.items = [];
    }

    return value; // O(1) constant time operation
  }`,
      description: "Dequeue operation removes the front element from the queue with O(1) time complexity.",
    },
    peek: {
      code: `  // View the front element without removing it
  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }

    return this.items[this.front]; // O(1) constant time operation
  }`,
      description: "Peek operation returns the front element without removing it with O(1) time complexity.",
    },
    isEmpty: {
      code: `  // Check if the queue is empty
  isEmpty() {
    return this.front > this.rear; // O(1) constant time operation
  }`,
      description: "isEmpty operation checks if the queue is empty with O(1) time complexity.",
    },
  }

  // Combine base code with selected operation code
  const getDisplayCode = () => {
    if (!selectedOperation) return baseCode
    return `${baseCode}\n\n${operationCodes[selectedOperation].code}`
  }

  // Get description based on selected operation
  const getDescription = () => {
    if (!selectedOperation) return "Select an operation to see its implementation and time complexity."
    return operationCodes[selectedOperation].description
  }

  const handleEnqueue = () => {
    setSelectedOperation("enqueue")
    const newQueue = [...queue]
    newQueue.push(value)
    setQueue(newQueue)
  }

  const handleDequeue = () => {
    setSelectedOperation("dequeue")
    if (queue.length > 0) {
      const newQueue = [...queue]
      newQueue.shift()
      setQueue(newQueue)
    }
  }

  const handlePeek = () => {
    setSelectedOperation("peek")
    // Just visual indication, not changing the queue
  }

  const handleIsEmpty = () => {
    setSelectedOperation("isEmpty")
    // Just visual indication, not changing the queue
  }

  const resetView = () => {
    setSelectedOperation(null)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Queues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Queue Operations</CardTitle>
            <CardDescription>{getDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleEnqueue}>Enqueue</Button>
                <Button onClick={handleDequeue}>Dequeue</Button>
                <Button onClick={handlePeek}>Peek</Button>
                <Button onClick={handleIsEmpty}>Is Empty</Button>
                {selectedOperation && (
                  <Button variant="outline" onClick={resetView}>
                    Reset View
                  </Button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number.parseInt(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Queue Visualization</CardTitle>
            <CardDescription>Visual representation of the queue and its operations</CardDescription>
          </CardHeader>
          <CardContent>
            <QueueVisualizer queue={queue} />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedOperation
                ? `${selectedOperation.charAt(0).toUpperCase() + selectedOperation.slice(1)} Operation Code`
                : "Queue Implementation"}
            </CardTitle>
            <CardDescription>
              {selectedOperation
                ? `Highlighting the ${selectedOperation} operation implementation`
                : "Select an operation to see its implementation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock code={getDisplayCode()} language="javascript" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
