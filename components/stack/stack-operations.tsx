"use client"

import { useState, useRef, memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp } from "lucide-react"
import { Stack, STACK_CODE_SNIPPETS } from "@/lib/data-structures/stack"

interface StackOperationsProps {
  stack: Stack
  onStackUpdate: () => void
  onAnimationStart: (params: {
    step: number
    item: number | null
    description: string
    codeSnippet: string
    operation: string
    poppedItem?: number | null
  }) => void
  onAnimationEnd: () => void
  isAnimating: boolean
}

const StackOperations = memo(({
  stack,
  onStackUpdate,
  onAnimationStart,
  onAnimationEnd,
  isAnimating
}: StackOperationsProps) => {
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

  // Handle push operation
  const handlePush = () => {
    if (!value || isNaN(Number(value))) return

    const numValue = Number(value)
    clearAnimation()
    
    onAnimationStart({
      step: 1,
      item: numValue,
      description: `Pushing ${numValue} onto the stack`,
      codeSnippet: STACK_CODE_SNIPPETS.push,
      operation: "push"
    })

    // Step 2: Push the item onto the stack
    animationTimeoutRef.current = setTimeout(() => {
      stack.push(numValue)
      onStackUpdate()
      
      onAnimationStart({
        step: 2,
        item: numValue,
        description: `Pushing ${numValue} onto the stack`,
        codeSnippet: STACK_CODE_SNIPPETS.push,
        operation: "push"
      })

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        clearAnimation()
        setValue("")
      }, 1000)
    }, 1000)
  }

  // Handle pop operation
  const handlePop = () => {
    if (stack.isEmpty()) {
      alert("Stack is empty")
      return
    }

    clearAnimation()
    const topItem = stack.peek()
    
    onAnimationStart({
      step: 1,
      item: topItem,
      description: `Popping ${topItem} from the stack`,
      codeSnippet: STACK_CODE_SNIPPETS.pop,
      operation: "pop"
    })

    // Step 2: Pop the item
    animationTimeoutRef.current = setTimeout(() => {
      const poppedValue = stack.pop()
      
      onAnimationStart({
        step: 2,
        item: topItem,
        description: `Popping ${topItem} from the stack`,
        codeSnippet: STACK_CODE_SNIPPETS.pop,
        operation: "pop",
        poppedItem: poppedValue
      })
      
      onStackUpdate()

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        clearAnimation()
      }, 1000)
    }, 1000)
  }

  // Handle peek operation
  const handlePeek = () => {
    if (stack.isEmpty()) {
      alert("Stack is empty")
      return
    }

    clearAnimation()
    const topItem = stack.peek()
    
    onAnimationStart({
      step: 3,
      item: topItem,
      description: `Peeking at the top item: ${topItem}`,
      codeSnippet: STACK_CODE_SNIPPETS.peek,
      operation: "peek"
    })

    // Step 2: Complete
    animationTimeoutRef.current = setTimeout(() => {
      clearAnimation()
    }, 2000)
  }

  return (
    <Tabs defaultValue="push" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="push" className="flex-1">
          Push
        </TabsTrigger>
        <TabsTrigger value="pop" className="flex-1">
          Pop
        </TabsTrigger>
        <TabsTrigger value="peek" className="flex-1">
          Peek
        </TabsTrigger>
      </TabsList>

      <TabsContent value="push" className="space-y-4">
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

        <Button className="w-full" onClick={handlePush} disabled={!value || isAnimating}>
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
            <path d="M12 5v14" />
            <path d="M19 12l-7-7-7 7" />
          </svg>
          Push Item
        </Button>
      </TabsContent>

      <TabsContent value="pop" className="space-y-4">
        <p className="text-sm text-white/70">Pop removes the top item from the stack.</p>

        <Button
          className="w-full"
          variant="destructive"
          onClick={handlePop}
          disabled={stack.isEmpty() || isAnimating}
        >
          <ArrowUp className="mr-2 h-4 w-4" />
          Pop Item
        </Button>
      </TabsContent>

      <TabsContent value="peek" className="space-y-4">
        <p className="text-sm text-white/70">Peek shows the top item without removing it.</p>

        <Button
          className="w-full"
          variant="outline"
          onClick={handlePeek}
          disabled={stack.isEmpty() || isAnimating}
        >
          Peek at Top Item
        </Button>
      </TabsContent>
    </Tabs>
  )
})

StackOperations.displayName = "StackOperations"

export { StackOperations }
