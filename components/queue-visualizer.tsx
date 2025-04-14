"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface QueueVisualizerProps {
  initialValues?: number[]
  className?: string
}

export default function QueueVisualizer({ initialValues = [], className }: QueueVisualizerProps) {
  const [queue, setQueue] = useState<number[]>([])

  useEffect(() => {
    setQueue(initialValues)
  }, [initialValues])

  return (
    <div className={cn("space-y-4", className)}>
      {/* Queue visualization */}
      <div className="relative min-h-[80px] flex items-center justify-center">
        {queue.length === 0 ? (
          <div className="text-center text-white/70">
            <p>The queue is empty</p>
          </div>
        ) : (
          <div className="flex items-center overflow-x-auto py-4 px-2">
            {queue.map((value, index) => (
              <div key={index} className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 text-white">
                  {value}
                </div>
                {index < queue.length - 1 && (
                  <div className="flex w-6 items-center justify-center">
                    <span className="text-white/50">&gt;</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
