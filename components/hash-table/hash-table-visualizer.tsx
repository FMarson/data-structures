"use client"

import { useState, useRef, useEffect, memo } from "react"
import { HashTable } from "@/lib/data-structures/hash-table"
import { CodeBlock } from "@/components/code-block"

interface HashTableVisualizerProps {
  initialItems?: { key: string, value: any }[]
}

const HashTableVisualizer = memo(({ initialItems = [
  { key: "name", value: "John" },
  { key: "age", value: 30 },
  { key: "city", value: "New York" }
] }: HashTableVisualizerProps) => {
  const [hashTable] = useState(new HashTable(10))
  const [buckets, setBuckets] = useState<any[][]>([])
  const [animationStep, setAnimationStep] = useState(0)
  const [animationItem, setAnimationItem] = useState<{ key: string, value: any, index: number } | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [operationDescription, setOperationDescription] = useState("")
  const [currentCodeSnippet, setCurrentCodeSnippet] = useState<string>("")
  const [currentOperation, setCurrentOperation] = useState<string>("empty")
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Update the buckets whenever the hash table changes
  const updateBuckets = () => {
    setBuckets(hashTable.getBuckets())
  }

  // Initialize the hash table with example items
  useEffect(() => {
    if (buckets.length === 0 && initialItems.length > 0) {
      initialItems.forEach(item => hashTable.set(item.key, item.value))
      updateBuckets()
    }
  }, [hashTable, buckets.length, initialItems])

  // Clean up animations on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="relative min-h-[400px] flex flex-col items-center justify-center">
      <div className="w-full max-w-[500px] space-y-2">
        {buckets.map((bucket, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-md border-2 border-white/30 bg-white/10 text-white">
              {index}
            </div>
            <div className="flex-1 min-h-[40px] rounded-md border-2 border-white/30 bg-white/10 p-2">
              {bucket.length === 0 ? (
                <div className="text-xs text-white/50 italic">Empty bucket</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {bucket.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`
                        px-2 py-1 rounded-md text-xs
                        ${
                          isAnimating &&
                          animationItem?.key === item.key &&
                          animationItem?.index === index
                            ? "bg-purple-900 border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                            : "bg-white/20"
                        }
                      `}
                    >
                      {item.key}: {item.value}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Operation description */}
      {isAnimating && (
        <div className="mt-6 p-3 bg-white/5 rounded-md w-full max-w-[500px]">
          <p className="font-medium">{operationDescription}</p>
          <p className="text-sm text-white/70 mt-1">
            {animationStep === 1 && "Calculating hash..."}
            {animationStep === 2 && "Placing item in bucket..."}
            {animationStep === 3 && "Operation completed successfully"}
          </p>
        </div>
      )}

      {/* Code snippet for current operation */}
      {currentCodeSnippet && (
        <div className="mt-4 w-full max-w-[500px]">
          <CodeBlock
            code={currentCodeSnippet}
            language="typescript"
            title={`${currentOperation.charAt(0).toUpperCase() + currentOperation.slice(1)} Operation`}
            highlightLines={
              currentOperation === "hash"
                ? [3, 4, 5, 6]
                : currentOperation === "set"
                  ? [3, 4, 7, 8, 9, 10, 11]
                  : currentOperation === "get"
                    ? [3, 4, 5]
                    : currentOperation === "delete"
                      ? [3, 4, 5, 7, 8, 9]
                      : []
            }
          />
        </div>
      )}
    </div>
  )
})

HashTableVisualizer.displayName = "HashTableVisualizer"

export { HashTableVisualizer }
