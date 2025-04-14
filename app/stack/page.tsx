"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Info, ArrowUp, BookOpen, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { CodeBlock } from "@/components/code-block"

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

// Code snippets for operations
const CODE_SNIPPETS = {
  push: `// Push operation - O(1)
push(item: number) {
  // Add the item to the end of the array
  this.items.push(item)
  return this
}`,
  pop: `// Pop operation - O(1)
pop() {
  // Check if the stack is empty
  if (this.isEmpty()) {
    return null
  }
  // Remove and return the last item
  return this.items.pop()
}`,
  peek: `// Peek operation - O(1)
peek() {
  // Check if the stack is empty
  if (this.isEmpty()) {
    return null
  }
  // Return the last item without removing it
  return this.items[this.items.length - 1]
}`,
  empty: `// Stack is empty
// Use the push operation to add items to the stack
push(item: number) {
  this.items.push(item)
  return this
}`,
}

export default function StackPage() {
  const [stack] = useState(new Stack())
  const [stackItems, setStackItems] = useState<number[]>([])
  const [value, setValue] = useState("")
  const [animationStep, setAnimationStep] = useState(0)
  const [animationItem, setAnimationItem] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [operationDescription, setOperationDescription] = useState("")
  const [poppedItem, setPoppedItem] = useState<number | null>(null)
  const [currentCodeSnippet, setCurrentCodeSnippet] = useState<string>(CODE_SNIPPETS.empty)
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

  // Handle push operation
  const handlePush = () => {
    if (!value || isNaN(Number(value))) return

    const numValue = Number(value)
    clearAnimation()
    setIsAnimating(true)
    setAnimationItem(numValue)
    setOperationDescription(`Pushing ${numValue} onto the stack`)
    setCurrentCodeSnippet(CODE_SNIPPETS.push)
    setCurrentOperation("push")

    // Step 1: Show the new item above the stack
    setAnimationStep(1)

    // Step 2: Push the item onto the stack
    animationTimeoutRef.current = setTimeout(() => {
      stack.push(numValue)
      updateStackItems()
      setAnimationStep(2)

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
    setIsAnimating(true)
    const topItem = stack.peek()
    setAnimationItem(topItem)
    setOperationDescription(`Popping ${topItem} from the stack`)
    setCurrentCodeSnippet(CODE_SNIPPETS.pop)
    setCurrentOperation("pop")

    // Step 1: Highlight the top item
    setAnimationStep(1)

    // Step 2: Pop the item
    animationTimeoutRef.current = setTimeout(() => {
      const poppedValue = stack.pop()
      setPoppedItem(poppedValue)
      updateStackItems()
      setAnimationStep(2)

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
    setIsAnimating(true)
    const topItem = stack.peek()
    setAnimationItem(topItem)
    setOperationDescription(`Peeking at the top item: ${topItem}`)
    setCurrentCodeSnippet(CODE_SNIPPETS.peek)
    setCurrentOperation("peek")

    // Step 1: Highlight the top item
    setAnimationStep(3) // Using a different step for peek

    // Step 2: Complete
    animationTimeoutRef.current = setTimeout(() => {
      clearAnimation()
    }, 2000)
  }

  // Clean up animations on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  // Initialize the stack with some example items
  useEffect(() => {
    if (stackItems.length === 0) {
      stack.push(10)
      stack.push(20)
      stack.push(30)
      updateStackItems()
    }
  }, [stack, stackItems.length])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 bg-black/20">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="ml-auto">
            <Link href="/tutorials/stack/introduction">
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Tutorial Mode
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Stack Visualization
                </h1>
                <p className="mt-2 text-lg text-white/80">
                  Visualize operations on a stack data structure (Last-In-First-Out)
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <Card className="card-gradient">
                    <CardHeader>
                      <CardTitle className="text-white">Visualization</CardTitle>
                      <CardDescription className="text-white/70">Visual representation of the stack</CardDescription>
                    </CardHeader>
                    <CardContent>
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
                      </div>

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
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="card-gradient">
                    <CardHeader>
                      <CardTitle className="text-white">Operations</CardTitle>
                      <CardDescription className="text-white/70">Perform operations on the stack</CardDescription>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                  </Card>

                  <Card className="mt-6 card-gradient">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Info className="h-5 w-5" />
                        Stack Properties
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-sm">
                        <div>
                          <h4 className="font-medium text-white">Last-In-First-Out (LIFO)</h4>
                          <p className="text-white/70 mt-1">
                            The last item added to the stack is the first one to be removed.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-white">Time Complexity</h4>
                          <div className="flex justify-between">
                            <span>Push:</span>
                            <span className="font-mono">O(1)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pop:</span>
                            <span className="font-mono">O(1)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Peek:</span>
                            <span className="font-mono">O(1)</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-white">Applications</h4>
                          <ul className="list-disc list-inside text-white/70 mt-1">
                            <li>Function call management</li>
                            <li>Expression evaluation</li>
                            <li>Undo mechanisms</li>
                            <li>Backtracking algorithms</li>
                          </ul>
                        </div>

                        <div className="pt-2 mt-2 border-t border-white/10">
                          <Link href="/tutorials/stack/introduction">
                            <Button variant="outline" size="sm" className="w-full">
                              <BookOpen className="mr-2 h-4 w-4" />
                              Learn More in Tutorial Mode
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-white/10 py-6 bg-black/20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-sm text-white/60">
              Data Structures Visualizer - An interactive learning tool created by Pau Aranega Bellido
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/pauaranegabellido"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/60 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://github.com/paudefclasspy/data-structures"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/60 hover:text-purple-400 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
