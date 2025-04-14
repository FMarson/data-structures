"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"
import { StackVisualizer } from "@/components/stack-visualizer"

export default function StacksPage() {
  const [stack, setStack] = useState<number[]>([5, 4, 3, 2, 1])
  const [value, setValue] = useState<number>(0)
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null)

  // Base code structure for Stack operations
  const baseCode = `class Stack {
  constructor() {
    this.items = [];
    this.top = -1;
  }
}`

  // Operation-specific code snippets
  const operationCodes: Record<string, { code: string; description: string }> = {
    push: {
      code: `  // Add an element to the top of the stack
  push(value) {
    this.top++;
    this.items[this.top] = value;
    return this.items; // O(1) constant time operation
  }`,
      description: "Push operation adds an element to the top of the stack with O(1) time complexity.",
    },
    pop: {
      code: `  // Remove the top element from the stack
  pop() {
    if (this.isEmpty()) {
      return "Stack underflow";
    }
    
    const value = this.items[this.top];
    this.top--;
    this.items.length = this.top + 1;
    return value; // O(1) constant time operation
  }`,
      description: "Pop operation removes the top element from the stack with O(1) time complexity.",
    },
    peek: {
      code: `  // View the top element without removing it
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    
    return this.items[this.top]; // O(1) constant time operation
  }`,
      description: "Peek operation returns the top element without removing it with O(1) time complexity.",
    },
    isEmpty: {
      code: `  // Check if the stack is empty
  isEmpty() {
    return this.top === -1; // O(1) constant time operation
  }`,
      description: "isEmpty operation checks if the stack is empty with O(1) time complexity.",
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

  const handlePush = () => {
    setSelectedOperation("push")
    const newStack = [...stack]
    newStack.push(value)
    setStack(newStack)
  }

  const handlePop = () => {
    setSelectedOperation("pop")
    if (stack.length > 0) {
      const newStack = [...stack]
      newStack.pop()
      setStack(newStack)
    }
  }

  const handlePeek = () => {
    setSelectedOperation("peek")
    // Just visual indication, not changing the stack
  }

  const handleIsEmpty = () => {
    setSelectedOperation("isEmpty")
    // Just visual indication, not changing the stack
  }

  const resetView = () => {
    setSelectedOperation(null)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Stacks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Stack Operations</CardTitle>
            <CardDescription>{getDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Button onClick={handlePush}>Push</Button>
                <Button onClick={handlePop}>Pop</Button>
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
            <CardTitle>Stack Visualization</CardTitle>
            <CardDescription>Visual representation of the stack and its operations</CardDescription>
          </CardHeader>
          <CardContent>
            <StackVisualizer stack={stack} />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedOperation
                ? `${selectedOperation.charAt(0).toUpperCase() + selectedOperation.slice(1)} Operation Code`
                : "Stack Implementation"}
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
