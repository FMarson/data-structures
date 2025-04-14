"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"

interface QueueVisualizerProps {
  queue?: number[]
  highlightIndex?: number
  highlightedIndices?: number[]
  highlightedValues?: number[]
}

const SimpleQueueVisualizer = memo(({ 
  queue = [], 
  highlightIndex = -1,
  highlightedIndices = [],
  highlightedValues = []
}: QueueVisualizerProps) => {
  return (
    <div className="relative min-h-[100px] flex items-center justify-center">
      {queue.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p>The queue is empty</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="text-xs text-white/70">Front</div>
            <div className="text-xs text-white/70">Back</div>
          </div>
          <div className="flex items-center gap-2 w-full">
            {queue.map((value, index) => (
              <div
                key={index}
                className={cn(
                  "flex h-12 flex-1 items-center justify-center rounded-md border-2",
                  (highlightIndex === index || highlightedIndices.includes(index) || highlightedValues.includes(value))
                    ? "border-purple-500 bg-purple-900 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    : "border-white/30 bg-white/10 text-white"
                )}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
})

SimpleQueueVisualizer.displayName = "SimpleQueueVisualizer"

export { SimpleQueueVisualizer as QueueVisualizer }
