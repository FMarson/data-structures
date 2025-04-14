"use client"

import { useState, useRef, memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { Queue, QUEUE_CODE_SNIPPETS } from "@/lib/data-structures/queue"

interface QueueOperationsProps {
  queue: Queue
  onQueueUpdate: () => void
  onAnimationStart: (params: {
    step: number
    item: number | null
    description: string
    codeSnippet: string
    operation: string
    dequeuedItem?: number | null
  }) => void
  onAnimationEnd: () => void
  isAnimating: boolean
}

const QueueOperations = memo(({
  queue,
  onQueueUpdate,
  onAnimationStart,
  onAnimationEnd,
  isAnimating
}: QueueOperationsProps) => {
  const [value, setValue] = useState("")
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clear any ongoing animations
  const clearAnimation = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }
    onAnimationEnd()
  }

  // Handle enqueue operation
  const handleEnqueue = () => {
    if (!value || isNaN(Number(value))) return

    const numValue = Number(value)
    clearAnimation()
    
    onAnimationStart({
      step: 1,
      item: numValue,
      description: `Enqueuing ${numValue} to the queue`,
      codeSnippet: QUEUE_CODE_SNIPPETS.enqueue,
      operation: "enqueue"
    })

    // Step 2: Enqueue the item
    animationTimeoutRef.current = setTimeout(() => {
      queue.enqueue(numValue)
      onQueueUpdate()
      
      onAnimationStart({
        step: 2,
        item: numValue,
        description: `Enqueuing ${numValue} to the queue`,
        codeSnippet: QUEUE_CODE_SNIPPETS.enqueue,
        operation: "enqueue"
      })

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        clearAnimation()
        setValue("")
      }, 1000)
    }, 1000)
  }

  // Handle dequeue operation
  const handleDequeue = () => {
    if (queue.isEmpty()) {
      alert("Queue is empty")
      return
    }

    clearAnimation()
    const frontItem = queue.peek()
    
    onAnimationStart({
      step: 1,
      item: frontItem,
      description: `Dequeuing ${frontItem} from the queue`,
      codeSnippet: QUEUE_CODE_SNIPPETS.dequeue,
      operation: "dequeue"
    })

    // Step 2: Dequeue the item
    animationTimeoutRef.current = setTimeout(() => {
      const dequeuedValue = queue.dequeue()
      
      onAnimationStart({
        step: 2,
        item: frontItem,
        description: `Dequeuing ${frontItem} from the queue`,
        codeSnippet: QUEUE_CODE_SNIPPETS.dequeue,
        operation: "dequeue",
        dequeuedItem: dequeuedValue
      })
      
      onQueueUpdate()

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        clearAnimation()
      }, 1000)
    }, 1000)
  }

  // Handle peek operation
  const handlePeek = () => {
    if (queue.isEmpty()) {
      alert("Queue is empty")
      return
    }

    clearAnimation()
    const frontItem = queue.peek()
    
    onAnimationStart({
      step: 3,
      item: frontItem,
      description: `Peeking at the front item: ${frontItem}`,
      codeSnippet: QUEUE_CODE_SNIPPETS.peek,
      operation: "peek"
    })

    // Step 2: Complete
    animationTimeoutRef.current = setTimeout(() => {
      clearAnimation()
    }, 2000)
  }

  return (
    <Tabs defaultValue="enqueue" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="enqueue" className="flex-1">
          Enqueue
        </TabsTrigger>
        <TabsTrigger value="dequeue" className="flex-1">
          Dequeue
        </TabsTrigger>
        <TabsTrigger value="peek" className="flex-1">
          Peek
        </TabsTrigger>
      </TabsList>

      <TabsContent value="enqueue" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Value</label>
          <Input
            type="number"
            placeholder="Enter a number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isAnimating}
          />
        </div>

        <Button className="w-full" onClick={handleEnqueue} disabled={!value || isAnimating}>
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
            className="mr-2"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
          Enqueue Item
        </Button>
      </TabsContent>

      <TabsContent value="dequeue" className="space-y-4">
        <p className="text-sm text-white/70">Dequeue removes the front item from the queue.</p>

        <Button
          className="w-full"
          variant="destructive"
          onClick={handleDequeue}
          disabled={queue.isEmpty() || isAnimating}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Dequeue Item
        </Button>
      </TabsContent>

      <TabsContent value="peek" className="space-y-4">
        <p className="text-sm text-white/70">Peek shows the front item without removing it.</p>

        <Button
          className="w-full"
          variant="outline"
          onClick={handlePeek}
          disabled={queue.isEmpty() || isAnimating}
        >
          Peek at Front Item
        </Button>
      </TabsContent>
    </Tabs>
  )
})

QueueOperations.displayName = "QueueOperations"

export { QueueOperations }
