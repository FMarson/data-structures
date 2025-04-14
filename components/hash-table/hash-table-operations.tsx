"use client"

import { useState, useRef, memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2 } from "lucide-react"
import { HashTable, HASH_TABLE_CODE_SNIPPETS } from "@/lib/data-structures/hash-table"

interface HashTableOperationsProps {
  hashTable: HashTable
  onHashTableUpdate: () => void
  onAnimationStart: (params: {
    step: number
    item: { key: string, value: any, index: number } | null
    description: string
    codeSnippet: string
    operation: string
  }) => void
  onAnimationEnd: () => void
  isAnimating: boolean
}

const HashTableOperations = memo(({
  hashTable,
  onHashTableUpdate,
  onAnimationStart,
  onAnimationEnd,
  isAnimating
}: HashTableOperationsProps) => {
  const [key, setKey] = useState("")
  const [value, setValue] = useState("")
  const [lookupKey, setLookupKey] = useState("")
  const [deleteKey, setDeleteKey] = useState("")
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clear any ongoing animations
  const clearAnimation = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }
    onAnimationEnd()
  }

  // Handle set operation
  const handleSet = () => {
    if (!key || !value) return

    clearAnimation()
    const index = hashTable.hash(key)
    
    // Step 1: Show hash calculation
    onAnimationStart({
      step: 1,
      item: { key, value, index },
      description: `Setting ${key}: ${value} (Hash: ${index})`,
      codeSnippet: HASH_TABLE_CODE_SNIPPETS.hash,
      operation: "hash"
    })

    // Step 2: Show item placement
    animationTimeoutRef.current = setTimeout(() => {
      onAnimationStart({
        step: 2,
        item: { key, value, index },
        description: `Setting ${key}: ${value} (Hash: ${index})`,
        codeSnippet: HASH_TABLE_CODE_SNIPPETS.set,
        operation: "set"
      })
      
      // Perform the operation
      hashTable.set(key, value)
      onHashTableUpdate()

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        onAnimationStart({
          step: 3,
          item: { key, value, index },
          description: `Set ${key}: ${value} successfully`,
          codeSnippet: HASH_TABLE_CODE_SNIPPETS.set,
          operation: "set"
        })
        
        // Clear animation
        animationTimeoutRef.current = setTimeout(() => {
          clearAnimation()
          setKey("")
          setValue("")
        }, 1000)
      }, 1000)
    }, 1000)
  }

  // Handle get operation
  const handleGet = () => {
    if (!lookupKey) return
    if (!hashTable.has(lookupKey)) {
      alert(`Key "${lookupKey}" not found`)
      return
    }

    clearAnimation()
    const index = hashTable.hash(lookupKey)
    const value = hashTable.get(lookupKey)
    
    // Step 1: Show hash calculation
    onAnimationStart({
      step: 1,
      item: { key: lookupKey, value, index },
      description: `Getting value for key "${lookupKey}" (Hash: ${index})`,
      codeSnippet: HASH_TABLE_CODE_SNIPPETS.hash,
      operation: "hash"
    })

    // Step 2: Show item retrieval
    animationTimeoutRef.current = setTimeout(() => {
      onAnimationStart({
        step: 2,
        item: { key: lookupKey, value, index },
        description: `Getting value for key "${lookupKey}" (Hash: ${index})`,
        codeSnippet: HASH_TABLE_CODE_SNIPPETS.get,
        operation: "get"
      })

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        onAnimationStart({
          step: 3,
          item: { key: lookupKey, value, index },
          description: `Found value: ${value}`,
          codeSnippet: HASH_TABLE_CODE_SNIPPETS.get,
          operation: "get"
        })
        
        // Clear animation
        animationTimeoutRef.current = setTimeout(() => {
          clearAnimation()
          setLookupKey("")
        }, 1000)
      }, 1000)
    }, 1000)
  }

  // Handle delete operation
  const handleDelete = () => {
    if (!deleteKey) return
    if (!hashTable.has(deleteKey)) {
      alert(`Key "${deleteKey}" not found`)
      return
    }

    clearAnimation()
    const index = hashTable.hash(deleteKey)
    const value = hashTable.get(deleteKey)
    
    // Step 1: Show hash calculation
    onAnimationStart({
      step: 1,
      item: { key: deleteKey, value, index },
      description: `Deleting key "${deleteKey}" (Hash: ${index})`,
      codeSnippet: HASH_TABLE_CODE_SNIPPETS.hash,
      operation: "hash"
    })

    // Step 2: Show item deletion
    animationTimeoutRef.current = setTimeout(() => {
      onAnimationStart({
        step: 2,
        item: { key: deleteKey, value, index },
        description: `Deleting key "${deleteKey}" (Hash: ${index})`,
        codeSnippet: HASH_TABLE_CODE_SNIPPETS.delete,
        operation: "delete"
      })
      
      // Perform the operation
      hashTable.delete(deleteKey)
      onHashTableUpdate()

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        onAnimationStart({
          step: 3,
          item: null,
          description: `Deleted key "${deleteKey}" successfully`,
          codeSnippet: HASH_TABLE_CODE_SNIPPETS.delete,
          operation: "delete"
        })
        
        // Clear animation
        animationTimeoutRef.current = setTimeout(() => {
          clearAnimation()
          setDeleteKey("")
        }, 1000)
      }, 1000)
    }, 1000)
  }

  return (
    <Tabs defaultValue="set" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="set" className="flex-1">
          Set
        </TabsTrigger>
        <TabsTrigger value="get" className="flex-1">
          Get
        </TabsTrigger>
        <TabsTrigger value="delete" className="flex-1">
          Delete
        </TabsTrigger>
      </TabsList>

      <TabsContent value="set" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Key</label>
          <Input
            type="text"
            placeholder="Enter a key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            disabled={isAnimating}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Value</label>
          <Input
            type="text"
            placeholder="Enter a value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isAnimating}
          />
        </div>

        <Button className="w-full" onClick={handleSet} disabled={!key || !value || isAnimating}>
          Set Key-Value Pair
        </Button>
      </TabsContent>

      <TabsContent value="get" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Key</label>
          <Input
            type="text"
            placeholder="Enter a key to look up"
            value={lookupKey}
            onChange={(e) => setLookupKey(e.target.value)}
            disabled={isAnimating}
          />
        </div>

        <Button
          className="w-full"
          variant="outline"
          onClick={handleGet}
          disabled={!lookupKey || isAnimating}
        >
          Get Value
        </Button>
      </TabsContent>

      <TabsContent value="delete" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Key</label>
          <Input
            type="text"
            placeholder="Enter a key to delete"
            value={deleteKey}
            onChange={(e) => setDeleteKey(e.target.value)}
            disabled={isAnimating}
          />
        </div>

        <Button
          className="w-full"
          variant="destructive"
          onClick={handleDelete}
          disabled={!deleteKey || isAnimating}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Key
        </Button>
      </TabsContent>
    </Tabs>
  )
})

HashTableOperations.displayName = "HashTableOperations"

export { HashTableOperations }
