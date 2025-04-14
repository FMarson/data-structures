"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"

interface ArrayVisualizerProps {
  array?: number[]
  highlightIndex?: number
  highlightedIndices?: number[]
  highlightedValues?: number[]
}

const ArrayVisualizer = memo(({ 
  array = [], 
  highlightIndex = -1,
  highlightedIndices = [],
  highlightedValues = []
}: ArrayVisualizerProps) => {
  return (
    <div className="relative min-h-[100px] flex items-center justify-center">
      {array.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p>The array is empty</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 justify-center">
          {array.map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-md border-2",
                  (highlightIndex === index || highlightedIndices.includes(index) || highlightedValues.includes(value))
                    ? "border-purple-500 bg-purple-900 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    : "border-white/30 bg-white/10 text-white"
                )}
              >
                {value}
              </div>
              <div className="text-xs text-white/70 mt-1">{index}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})

ArrayVisualizer.displayName = "ArrayVisualizer"

export { ArrayVisualizer }
