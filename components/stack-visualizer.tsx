"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

// Stack class
class Stack {
  items: number[]

  constructor() {
    this.items = []
  }

  // Push an item onto the stack
  push(item: number) {
    this.items.push(item)
    return this
  }

  // Pop an item from the stack
  pop() {
    if (this.isEmpty()) {
      return null
    }
    return this.items.pop()
  }

  // Peek at the top item without removing it
  peek() {
    if (this.isEmpty()) {
      return null
    }
    return this.items[this.items.length - 1]
  }

  // Check if the stack is empty
  isEmpty() {
    return this.items.length === 0
  }

  // Get the size of the stack
  size() {
    return this.items.length
  }

  // Get all items in the stack
  getItems() {
    return [...this.items]
  }
}

interface StackVisualizerProps {
  initialValues?: number[]
  highlightedIndices?: number[]
  highlightedValues?: number[]
  activeOperation?: "push" | "pop" | "peek"
  activeIndex?: number
  showControls?: boolean
  className?: string
}

export function StackVisualizer({
  initialValues = [],
  highlightedIndices = [],
  highlightedValues = [],
  activeOperation,
  activeIndex,
  showControls = false,
  className,
}: StackVisualizerProps) {
  const [stack] = useState(new Stack())
  const [stackItems, setStackItems] = useState<number[]>([])
  const [value, setValue] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  // Update the stack items whenever the stack changes
  const updateStackItems = () => {
    setStackItems(stack.getItems())
  }

  // Initialize with initial values
  useEffect(() => {
    // Clear existing stack
    while (!stack.isEmpty()) {
      stack.pop()
    }

    // Add initial values (in reverse to maintain order)
    for (let i = initialValues.length - 1; i >= 0; i--) {
      stack.push(initialValues[i])
    }

    updateStackItems()
  }, [initialValues])

  // Handle push operation
  const handlePush = () => {
    if (!value || isNaN(Number(value))) return

    const numValue = Number(value)
    setIsAnimating(true)

    // Animate the push
    setTimeout(() => {
      stack.push(numValue)
      updateStackItems()
      setValue("")
      setIsAnimating(false)
    }, 500)
  }

  // Handle pop operation
  const handlePop = () => {
    if (stack.isEmpty()) {
      alert("Stack is empty")
      return
    }

    setIsAnimating(true)

    // Animate the pop
    setTimeout(() => {
      stack.pop()
      updateStackItems()
      setIsAnimating(false)
    }, 500)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Stack visualization */}
      <div className="relative min-h-[200px] flex items-center justify-center">
        {stackItems.length === 0 ? (
          <div className="text-center text-white/70">
            <p>The stack is empty</p>
            {showControls && <p className="text-sm">Use the controls to add items</p>}
          </div>
        ) : (
          <div className="flex flex-col-reverse items-center gap-2 w-full max-w-[200px]">
            <div className="text-xs text-white/70 mb-2">Bottom</div>
            {stackItems.map((value, index) => (
              <div
                key={index}
                className={cn(
                  "flex h-12 w-full items-center justify-center rounded-md border-2",
                  highlightedIndices.includes(index) || highlightedValues.includes(value) || activeIndex === index
                    ? "border-purple-500 bg-purple-900 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    : "border-white/30 bg-white/10 text-white",
                )}
              >
                {value}
              </div>
            ))}
            <div className="text-xs text-white/70 mt-2">Top</div>
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
                disabled={isAnimating}
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handlePush}
              className="flex-1 rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700 flex items-center justify-center gap-2"
              disabled={!value || isAnimating}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="M19 12l-7-7-7 7" />
              </svg>
              Push
            </button>
            <button
              onClick={handlePop}
              className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 flex items-center justify-center gap-2"
              disabled={stack.isEmpty() || isAnimating}
            >
              <ArrowUp className="h-4 w-4" />
              Pop
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
