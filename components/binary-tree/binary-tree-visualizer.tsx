"use client"

import { useState, useRef, useEffect, memo } from "react"
import { BinarySearchTree, TreeNode } from "@/lib/data-structures/binary-tree"
import { CodeBlock } from "@/components/code-block"

interface BinaryTreeVisualizerProps {
  initialItems?: number[]
}

interface TreeNodeProps {
  node: TreeNode
  isHighlighted?: boolean
  level: number
}

const TreeNodeComponent = memo(({ node, isHighlighted, level }: TreeNodeProps) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          w-12 h-12 rounded-full flex items-center justify-center
          ${isHighlighted
            ? "bg-purple-900 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            : "bg-white/10 border-2 border-white/30"
          }
          transition-all duration-300
        `}
      >
        {node.value}
      </div>
      
      {(node.left || node.right) && (
        <div className="flex mt-4 gap-2 sm:gap-4 md:gap-8">
          {node.left ? (
            <div className="flex flex-col items-center">
              <div className="h-6 w-px bg-white/30"></div>
              <TreeNodeComponent node={node.left} level={level + 1} />
            </div>
          ) : (
            <div className="w-12"></div>
          )}
          
          {node.right ? (
            <div className="flex flex-col items-center">
              <div className="h-6 w-px bg-white/30"></div>
              <TreeNodeComponent node={node.right} level={level + 1} />
            </div>
          ) : (
            <div className="w-12"></div>
          )}
        </div>
      )}
    </div>
  )
})

TreeNodeComponent.displayName = "TreeNodeComponent"

const BinaryTreeVisualizer = memo(({ initialItems = [50, 30, 70, 20, 40, 60, 80] }: BinaryTreeVisualizerProps) => {
  const [tree] = useState(new BinarySearchTree())
  const [treeRoot, setTreeRoot] = useState<TreeNode | null>(null)
  const [animationStep, setAnimationStep] = useState(0)
  const [animationValue, setAnimationValue] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [operationDescription, setOperationDescription] = useState("")
  const [currentCodeSnippet, setCurrentCodeSnippet] = useState<string>("")
  const [currentOperation, setCurrentOperation] = useState<string>("empty")
  const [highlightedPath, setHighlightedPath] = useState<number[]>([])
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Update the tree visualization whenever the tree changes
  const updateTree = () => {
    setTreeRoot(tree.getTree())
  }

  // Initialize the tree with example items
  useEffect(() => {
    if (!treeRoot && initialItems.length > 0) {
      initialItems.forEach(item => tree.insert(item))
      updateTree()
    }
  }, [tree, treeRoot, initialItems])

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
      <div className="w-full overflow-auto py-4">
        <div className="min-w-[500px] flex justify-center">
          {treeRoot ? (
            <TreeNodeComponent node={treeRoot} level={0} />
          ) : (
            <div className="text-center text-muted-foreground">
              <p>The tree is empty</p>
              <p className="text-sm">Use the controls to add nodes</p>
            </div>
          )}
        </div>
      </div>

      {/* Operation description */}
      {isAnimating && (
        <div className="mt-6 p-3 bg-white/5 rounded-md w-full max-w-[500px]">
          <p className="font-medium">{operationDescription}</p>
          <p className="text-sm text-white/70 mt-1">
            {animationStep === 1 && "Traversing the tree..."}
            {animationStep === 2 && "Performing operation..."}
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
              currentOperation === "insert"
                ? animationStep === 1 ? [4, 5, 6, 7, 8, 9] : [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
                : currentOperation === "find"
                  ? [4, 5, 6, 7, 8]
                  : currentOperation === "remove"
                    ? [4, 5, 6, 7, 8, 9, 10, 11, 12]
                    : []
            }
          />
        </div>
      )}
    </div>
  )
})

BinaryTreeVisualizer.displayName = "BinaryTreeVisualizer"

export { BinaryTreeVisualizer }
