"use client"

import { useState, useRef, useEffect, memo } from "react"
import { Stack } from "@/lib/data-structures/stack"
import { CodeBlock } from "@/components/code-block"

interface StackVisualizerProps {
  initialItems?: number[]
}

const StackVisualizer = memo(({ initialItems = [10, 20, 30] }: StackVisualizerProps) => {
  const [stack] = useState(new Stack())
  const [stackItems, setStackItems] = useState<number[]>([])
  const [animationStep, setAnimationStep] = useState(0)
  const [animationItem, setAnimationItem] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [operationDescription, setOperationDescription] = useState("")
  const [poppedItem, setPoppedItem] = useState<number | null>(null)
  const [currentCodeSnippet, setCurrentCodeSnippet] = useState<string>("")
  const [currentOperation, setCurrentOperation] = useState<string>("empty")
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Update the stack items whenever the stack changes
  const updateStackItems = () => {
    setStackItems(stack.getItems())
  }

  // Clear any ongoing animations
  const clearAnimation = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }
    setAnimationStep(0)
    setAnimationItem(null)
    setIsAnimating(false)
    setPoppedItem(null)
  }

  // Initialize the stack with example items
  useEffect(() => {
    if (stackItems.length === 0 && initialItems.length > 0) {
      initialItems.forEach(item => stack.push(item))
      updateStackItems()
    }
  }, [stack, stackItems.length, initialItems])

  // Clean up animations on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="relative min-h-[400px] flex items-center justify-center">
      {stackItems.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p>The stack is empty</p>
          <p className="text-sm">Use the controls to add items</p>
        </div>
      ) : (
        <div className="flex flex-col-reverse items-center gap-2 w-full max-w-[200px]">
          <div className="text-xs text-white/70 mb-2">Bottom</div>
          {stackItems.map((value, index) => (
            <div
              key={index}
              className={`
                flex h-12 w-full items-center justify-center rounded-md border-2
                ${
                  index === stackItems.length - 1 &&
                  isAnimating &&
                  (animationStep === 1 || animationStep === 3)
                    ? "border-purple-500 bg-purple-900 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    : "border-white/30 bg-white/10 text-white"
                }
                transition-all duration-300
              `}
            >
              {value}
            </div>
          ))}
          <div className="text-xs text-white/70 mt-2">Top</div>
        </div>
      )}

      {/* Animation for pushing */}
      {isAnimating && animationStep === 1 && animationItem !== null && (
        <div className="absolute top-4 flex h-12 w-[200px] items-center justify-center rounded-md border-2 border-purple-500 bg-purple-900 text-white animate-bounce shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          {animationItem}
        </div>
      )}

      {/* Animation for popping */}
      {isAnimating && animationStep === 2 && poppedItem !== null && (
        <div className="absolute top-4 flex h-12 w-[200px] items-center justify-center rounded-md border-2 border-red-500 bg-red-900 text-white animate-fade-up shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          {poppedItem}
        </div>
      )}

      {/* Operation description */}
      {isAnimating && (
        <div className="mt-4 p-3 bg-white/5 rounded-md">
          <p className="font-medium">{operationDescription}</p>
          <p className="text-sm text-white/70 mt-1">
            {animationStep === 1 && "Preparing operation..."}
            {animationStep === 2 && "Operation completed successfully"}
            {animationStep === 3 && "Peeking at the top element without removing it"}
          </p>
        </div>
      )}

      {/* Code snippet for current operation */}
      {currentCodeSnippet && (
        <div className="mt-4">
          <CodeBlock
            code={currentCodeSnippet}
            language="typescript"
            title={`${currentOperation.charAt(0).toUpperCase() + currentOperation.slice(1)} Operation`}
            highlightLines={
              currentOperation === "push"
                ? [3]
                : currentOperation === "pop"
                  ? [5, 7]
                  : currentOperation === "peek"
                    ? [5, 7]
                    : []
            }
          />
        </div>
      )}
    </div>
  )
})

StackVisualizer.displayName = "StackVisualizer"

export { StackVisualizer }
