"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"
import { ArrayVisualizer } from "@/components/array-visualizer"

export default function ArraysPage() {
  const [array, setArray] = useState<number[]>([1, 2, 3, 4, 5])
  const [index, setIndex] = useState<number>(0)
  const [value, setValue] = useState<number>(0)
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null)

  // Base code structure for Array operations
  const baseCode = `class ArrayOperations {
  constructor() {
    // Array operations implementation
  }
}`

  // Operation-specific code snippets
  const operationCodes: Record<string, { code: string; description: string }> = {
    access: {
      code: `  // Access an element at a specific index
  access(arr, index) {
    if (index < 0 || index >= arr.length) {
      return "Index out of bounds";
    }
    return arr[index]; // O(1) constant time operation
  }`,
      description: "Accessing an element in an array is an O(1) operation as it uses direct indexing.",
    },
    insert: {
      code: `  // Insert an element at a specific index
  insert(arr, index, value) {
    if (index < 0 || index > arr.length) {
      return "Invalid index";
    }
    
    // Shift elements to make room for the new value
    for (let i = arr.length; i > index; i--) {
      arr[i] = arr[i - 1]; // O(n) in worst case
    }
    
    arr[index] = value;
    return arr;
  }`,
      description: "Insertion in an array can be O(n) in the worst case as elements may need to be shifted.",
    },
    delete: {
      code: `  // Delete an element at a specific index
  delete(arr, index) {
    if (index < 0 || index >= arr.length) {
      return "Index out of bounds";
    }
    
    // Shift elements to fill the gap
    for (let i = index; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1]; // O(n) in worst case
    }
    
    arr.length = arr.length - 1;
    return arr;
  }`,
      description: "Deletion in an array can be O(n) in the worst case as elements may need to be shifted.",
    },
    search: {
      code: `  // Search for a value in the array
  search(arr, value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        return i; // Found at index i
      }
    }
    return -1; // Not found
  }`,
      description: "Searching in an unsorted array is O(n) as it may require checking every element.",
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

  const handleAccess = () => {
    setSelectedOperation("access")
    // Implementation logic
    if (index >= 0 && index < array.length) {
      // Highlight the accessed element
      // This is just a visual indication, not changing the array
    }
  }

  const handleInsert = () => {
    setSelectedOperation("insert")
    if (index >= 0 && index <= array.length) {
      const newArray = [...array]
      // Shift elements
      for (let i = newArray.length; i > index; i--) {
        newArray[i] = newArray[i - 1]
      }
      newArray[index] = value
      setArray(newArray)
    }
  }

  const handleDelete = () => {
    setSelectedOperation("delete")
    if (index >= 0 && index < array.length) {
      const newArray = [...array]
      // Shift elements
      for (let i = index; i < newArray.length - 1; i++) {
        newArray[i] = newArray[i + 1]
      }
      newArray.pop()
      setArray(newArray)
    }
  }

  const handleSearch = () => {
    setSelectedOperation("search")
    // Implementation logic - just visual indication
  }

  const resetView = () => {
    setSelectedOperation(null)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Arrays</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Array Operations</CardTitle>
            <CardDescription>{getDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleAccess}>Access</Button>
                <Button onClick={handleInsert}>Insert</Button>
                <Button onClick={handleDelete}>Delete</Button>
                <Button onClick={handleSearch}>Search</Button>
                {selectedOperation && (
                  <Button variant="outline" onClick={resetView}>
                    Reset View
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Index</label>
                  <input
                    type="number"
                    value={index}
                    onChange={(e) => setIndex(Number.parseInt(e.target.value) || 0)}
                    className="w-full p-2 border rounded"
                  />
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Array Visualization</CardTitle>
            <CardDescription>Visual representation of the array and its operations</CardDescription>
          </CardHeader>
          <CardContent>
            <ArrayVisualizer array={array} highlightIndex={index} />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedOperation
                ? `${selectedOperation.charAt(0).toUpperCase() + selectedOperation.slice(1)} Operation Code`
                : "Array Implementation"}
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
