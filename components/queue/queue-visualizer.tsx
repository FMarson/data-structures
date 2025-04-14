"use client"

import { useState, useRef, useEffect, memo } from "react"
import { Queue } from "@/lib/data-structures/queue"
import { CodeBlock } from "@/components/code-block"

interface QueueVisualizerProps {
  initialItems?: number[]
}

const QueueVisualizer = memo(({ initialItems = [10, 20, 30] }: QueueVisualizerProps) => {
  const [queue] = useState(new Queue())
  const [queueItems, setQueueItems] = useState<number[]>([])
  const [animationStep, setAnimationStep] = useState(0)
  const [animationItem, setAnimationItem] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [operationDescription, setOperationDescription] = useState("")
  const [dequeuedItem, setDequeuedItem] = useState<number | null>(null)
  const [currentCodeSnippet, setCurrentCodeSnippet] = useState<string>("")
  const [currentOperation, setCurrentOperation] = useState<string>("empty")
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Update the queue items whenever the queue changes
  const updateQueueItems = () => {
    setQueueItems(queue.getItems())
  }

  // Initialize the queue with example items
  useEffect(() => {
    if (queueItems.length === 0 && initialItems.length > 0) {
      initialItems.forEach(item => queue.enqueue(item))
      updateQueueItems()
    }
  }, [queue, queueItems.length, initialItems])

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
      {queueItems.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p>The queue is empty</p>
          <p className="text-sm">Use the controls to add items</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 w-full max-w-[400px]">
          <div className="flex items-center justify-between w-full">
            <div className="text-xs text-white/70">Front</div>
            <div className="text-xs text-white/70">Back</div>
          </div>
          <div className="flex items-center gap-2 w-full">
            {queueItems.map((value, index) => (
              <div
                key={index}
                className={`
                  flex h-12 flex-1 items-center justify-center rounded-md border-2
                  ${
                    index === 0 &&
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
          </div>
        </div>
      )}

      {/* Animation for enqueuing */}
      {isAnimating && animationStep === 1 && animationItem !== null && (
        <div className="absolute right-4 top-20 flex h-12 w-[60px] items-center justify-center rounded-md border-2 border-purple-500 bg-purple-900 text-white animate-bounce shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          {animationItem}
        </div>
      )}

      {/* Animation for dequeuing */}
      {isAnimating && animationStep === 2 && dequeuedItem !== null && (
        <div className="absolute left-4 top-20 flex h-12 w-[60px] items-center justify-center rounded-md border-2 border-red-500 bg-red-900 text-white animate-fade-up shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          {dequeuedItem}
        </div>
      )}

      {/* Operation description */}
      {isAnimating && (
        <div className="mt-4 p-3 bg-white/5 rounded-md">
          <p className="font-medium">{operationDescription}</p>
          <p className="text-sm text-white/70 mt-1">
            {animationStep === 1 && "Preparing operation..."}
            {animationStep === 2 && "Operation completed successfully"}
            {animationStep === 3 && "Peeking at the front element without removing it"}
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
              currentOperation === "enqueue"
                ? [3]
                : currentOperation === "dequeue"
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

QueueVisualizer.displayName = "QueueVisualizer"

export { QueueVisualizer }
