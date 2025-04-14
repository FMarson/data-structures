"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Node class for linked list
class ListNode {
  value: number
  next: ListNode | null

  constructor(value: number) {
    this.value = value
    this.next = null
  }
}

// Linked List class
class LinkedList {
  head: ListNode | null

  constructor() {
    this.head = null
  }

  // Insert at the beginning
  insertAtBeginning(value: number) {
    const newNode = new ListNode(value)
    newNode.next = this.head
    this.head = newNode
    return this
  }

  // Insert at the end
  insertAtEnd(value: number) {
    const newNode = new ListNode(value)

    if (!this.head) {
      this.head = newNode
      return this
    }

    let current = this.head
    while (current.next) {
      current = current.next
    }

    current.next = newNode
    return this
  }

  // Insert at a specific position
  insertAtPosition(value: number, position: number) {
    if (position === 0) {
      return this.insertAtBeginning(value)
    }

    const newNode = new ListNode(value)
    let current = this.head
    let count = 0

    while (current && count < position - 1) {
      current = current.next
      count++
    }

    if (!current) {
      return this.insertAtEnd(value)
    }

    newNode.next = current.next
    current.next = newNode
    return this
  }

  // Delete a node with a specific value
  delete(value: number) {
    if (!this.head) {
      return this
    }

    if (this.head.value === value) {
      this.head = this.head.next
      return this
    }

    let current = this.head
    while (current.next && current.next.value !== value) {
      current = current.next
    }

    if (current.next) {
      current.next = current.next.next
    }

    return this
  }

  // Search for a value
  search(value: number) {
    let current = this.head
    let position = 0

    while (current) {
      if (current.value === value) {
        return position
      }
      current = current.next
      position++
    }

    return -1
  }

  // Convert to array for visualization
  toArray() {
    const result = []
    let current = this.head

    while (current) {
      result.push(current.value)
      current = current.next
    }

    return result
  }
}

interface LinkedListVisualizerProps {
  initialValues?: number[]
  highlightedIndices?: number[]
  highlightedValues?: number[]
  activeOperation?: "insert" | "delete" | "search" | "traverse"
  activeIndex?: number
  showControls?: boolean
  className?: string
}

export function LinkedListVisualizer({
  initialValues = [],
  highlightedIndices = [],
  highlightedValues = [],
  activeOperation,
  activeIndex,
  showControls = false,
  className,
}: LinkedListVisualizerProps) {
  const [linkedList] = useState(new LinkedList())
  const [listArray, setListArray] = useState<number[]>([])
  const [value, setValue] = useState("")
  const [position, setPosition] = useState("0")
  const [operation, setOperation] = useState<"beginning" | "end" | "position">("beginning")

  // Update the list array whenever the linked list changes
  const updateListArray = () => {
    setListArray(linkedList.toArray())
  }

  // Initialize with initial values
  useEffect(() => {
    // Clear existing list
    while (linkedList.head) {
      linkedList.delete(linkedList.head.value)
    }

    // Add initial values
    for (const val of initialValues) {
      linkedList.insertAtEnd(val)
    }

    updateListArray()
  }, [initialValues])

  // Handle insertion operations
  const handleInsert = () => {
    if (!value || isNaN(Number(value))) return

    const numValue = Number(value)

    if (operation === "beginning") {
      linkedList.insertAtBeginning(numValue)
    } else if (operation === "end") {
      linkedList.insertAtEnd(numValue)
    } else if (operation === "position") {
      linkedList.insertAtPosition(numValue, Number(position))
    }

    updateListArray()
    setValue("")
  }

  // Handle delete operation
  const handleDelete = () => {
    if (!value || isNaN(Number(value))) return

    const numValue = Number(value)
    linkedList.delete(numValue)
    updateListArray()
    setValue("")
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Linked list visualization */}
      <div className="relative min-h-[80px] flex items-center justify-center">
        {listArray.length === 0 ? (
          <div className="text-center text-white/70">
            <p>The linked list is empty</p>
            {showControls && <p className="text-sm">Use the controls to add nodes</p>}
          </div>
        ) : (
          <div className="flex items-center overflow-x-auto py-4 px-2">
            {listArray.map((value, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2",
                    highlightedIndices.includes(index) || highlightedValues.includes(value)
                      ? "border-purple-500 bg-purple-900 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                      : activeOperation === "delete" && activeIndex === index
                        ? "border-red-500 bg-red-900 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                        : activeOperation === "search" && activeIndex === index
                          ? "border-green-500 bg-green-900 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                          : activeOperation === "traverse" && activeIndex === index
                            ? "border-blue-500 bg-blue-900 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            : "border-white/30 bg-white/10 text-white",
                  )}
                >
                  {value}
                </div>
                {index < listArray.length - 1 && (
                  <div className="flex w-6 items-center justify-center">
                    <ChevronRight className="h-5 w-5 text-white/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Controls (optional) */}
      {showControls && (
        <div className="space-y-4 border-t border-white/10 pt-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Value</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
                placeholder="Enter a number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Operation</label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value as any)}
                className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
              >
                <option value="beginning">Insert at Beginning</option>
                <option value="end">Insert at End</option>
                <option value="position">Insert at Position</option>
              </select>
            </div>
          </div>

          {operation === "position" && (
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Position</label>
              <input
                type="number"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
                placeholder="Enter position"
                min="0"
              />
            </div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={handleInsert}
              className="flex-1 rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
              disabled={!value}
            >
              Insert
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
              disabled={!value}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
