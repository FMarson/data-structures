"use client"

import { useState, useRef, memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Trash2 } from "lucide-react"
import { BinarySearchTree, BINARY_TREE_CODE_SNIPPETS } from "@/lib/data-structures/binary-tree"

interface BinaryTreeOperationsProps {
  tree: BinarySearchTree
  onTreeUpdate: () => void
  onAnimationStart: (params: {
    step: number
    value: number | null
    description: string
    codeSnippet: string
    operation: string
    highlightedPath?: number[]
  }) => void
  onAnimationEnd: () => void
  isAnimating: boolean
}

const BinaryTreeOperations = memo(({
  tree,
  onTreeUpdate,
  onAnimationStart,
  onAnimationEnd,
  isAnimating
}: BinaryTreeOperationsProps) => {
  const [value, setValue] = useState("")
  const [findValue, setFindValue] = useState("")
  const [removeValue, setRemoveValue] = useState("")
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clear any ongoing animations
  const clearAnimation = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }
    onAnimationEnd()
  }

  // Handle insert operation
  const handleInsert = () => {
    if (!value || isNaN(Number(value))) return

    const numValue = Number(value)
    clearAnimation()
    
    // Step 1: Show traversal
    onAnimationStart({
      step: 1,
      value: numValue,
      description: `Inserting ${numValue} into the tree`,
      codeSnippet: BINARY_TREE_CODE_SNIPPETS.insert,
      operation: "insert"
    })

    // Step 2: Perform insertion
    animationTimeoutRef.current = setTimeout(() => {
      onAnimationStart({
        step: 2,
        value: numValue,
        description: `Inserting ${numValue} into the tree`,
        codeSnippet: BINARY_TREE_CODE_SNIPPETS.insert,
        operation: "insert"
      })
      
      // Perform the operation
      tree.insert(numValue)
      onTreeUpdate()

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        onAnimationStart({
          step: 3,
          value: numValue,
          description: `Inserted ${numValue} successfully`,
          codeSnippet: BINARY_TREE_CODE_SNIPPETS.insert,
          operation: "insert"
        })
        
        // Clear animation
        animationTimeoutRef.current = setTimeout(() => {
          clearAnimation()
          setValue("")
        }, 1000)
      }, 1000)
    }, 1000)
  }

  // Handle find operation
  const handleFind = () => {
    if (!findValue || isNaN(Number(findValue))) return

    const numValue = Number(findValue)
    clearAnimation()
    
    // Step 1: Show traversal
    onAnimationStart({
      step: 1,
      value: numValue,
      description: `Finding ${numValue} in the tree`,
      codeSnippet: BINARY_TREE_CODE_SNIPPETS.find,
      operation: "find"
    })

    // Step 2: Show result
    animationTimeoutRef.current = setTimeout(() => {
      const found = tree.contains(numValue)
      
      onAnimationStart({
        step: 3,
        value: numValue,
        description: found ? `Found ${numValue} in the tree` : `${numValue} not found in the tree`,
        codeSnippet: BINARY_TREE_CODE_SNIPPETS.find,
        operation: "find"
      })
      
      // Clear animation
      animationTimeoutRef.current = setTimeout(() => {
        clearAnimation()
        setFindValue("")
      }, 2000)
    }, 1500)
  }

  // Handle remove operation
  const handleRemove = () => {
    if (!removeValue || isNaN(Number(removeValue))) return

    const numValue = Number(removeValue)
    if (!tree.contains(numValue)) {
      alert(`Value ${numValue} not found in the tree`)
      return
    }

    clearAnimation()
    
    // Step 1: Show traversal
    onAnimationStart({
      step: 1,
      value: numValue,
      description: `Removing ${numValue} from the tree`,
      codeSnippet: BINARY_TREE_CODE_SNIPPETS.remove,
      operation: "remove"
    })

    // Step 2: Perform removal
    animationTimeoutRef.current = setTimeout(() => {
      onAnimationStart({
        step: 2,
        value: numValue,
        description: `Removing ${numValue} from the tree`,
        codeSnippet: BINARY_TREE_CODE_SNIPPETS.remove,
        operation: "remove"
      })
      
      // Perform the operation
      tree.remove(numValue)
      onTreeUpdate()

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        onAnimationStart({
          step: 3,
          value: null,
          description: `Removed ${numValue} successfully`,
          codeSnippet: BINARY_TREE_CODE_SNIPPETS.remove,
          operation: "remove"
        })
        
        // Clear animation
        animationTimeoutRef.current = setTimeout(() => {
          clearAnimation()
          setRemoveValue("")
        }, 1000)
      }, 1000)
    }, 1000)
  }

  return (
    <Tabs defaultValue="insert" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="insert" className="flex-1">
          Insert
        </TabsTrigger>
        <TabsTrigger value="find" className="flex-1">
          Find
        </TabsTrigger>
        <TabsTrigger value="remove" className="flex-1">
          Remove
        </TabsTrigger>
      </TabsList>

      <TabsContent value="insert" className="space-y-4">
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

        <Button className="w-full" onClick={handleInsert} disabled={!value || isAnimating}>
          Insert Node
        </Button>
      </TabsContent>

      <TabsContent value="find" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Value</label>
          <Input
            type="number"
            placeholder="Enter a value to find"
            value={findValue}
            onChange={(e) => setFindValue(e.target.value)}
            disabled={isAnimating}
          />
        </div>

        <Button
          className="w-full"
          variant="outline"
          onClick={handleFind}
          disabled={!findValue || isAnimating}
        >
          <Search className="mr-2 h-4 w-4" />
          Find Node
        </Button>
      </TabsContent>

      <TabsContent value="remove" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Value</label>
          <Input
            type="number"
            placeholder="Enter a value to remove"
            value={removeValue}
            onChange={(e) => setRemoveValue(e.target.value)}
            disabled={isAnimating}
          />
        </div>

        <Button
          className="w-full"
          variant="destructive"
          onClick={handleRemove}
          disabled={!removeValue || isAnimating}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove Node
        </Button>
      </TabsContent>
    </Tabs>
  )
})

BinaryTreeOperations.displayName = "BinaryTreeOperations"

export { BinaryTreeOperations }
