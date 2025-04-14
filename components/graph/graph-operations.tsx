"use client"

import { useState, useRef, memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Trash2 } from "lucide-react"
import { Graph, GRAPH_CODE_SNIPPETS } from "@/lib/data-structures/graph"

interface GraphOperationsProps {
  graph: Graph
  onGraphUpdate: () => void
  onAnimationStart: (params: {
    step: number
    item: { id?: string, source?: string, target?: string } | null
    description: string
    codeSnippet: string
    operation: string
    highlightedPath?: string[]
  }) => void
  onAnimationEnd: () => void
  isAnimating: boolean
}

const GraphOperations = memo(({
  graph,
  onGraphUpdate,
  onAnimationStart,
  onAnimationEnd,
  isAnimating
}: GraphOperationsProps) => {
  const [nodeId, setNodeId] = useState("")
  const [nodeLabel, setNodeLabel] = useState("")
  const [sourceId, setSourceId] = useState("")
  const [targetId, setTargetId] = useState("")
  const [removeId, setRemoveId] = useState("")
  const [startNode, setStartNode] = useState("")
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clear any ongoing animations
  const clearAnimation = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }
    onAnimationEnd()
  }

  // Handle add vertex operation
  const handleAddVertex = () => {
    if (!nodeId) return

    clearAnimation()
    
    // Step 1: Show preparation
    onAnimationStart({
      step: 1,
      item: { id: nodeId },
      description: `Adding vertex ${nodeId} (${nodeLabel || nodeId})`,
      codeSnippet: GRAPH_CODE_SNIPPETS.addVertex,
      operation: "addVertex"
    })

    // Step 2: Perform operation
    animationTimeoutRef.current = setTimeout(() => {
      onAnimationStart({
        step: 2,
        item: { id: nodeId },
        description: `Adding vertex ${nodeId} (${nodeLabel || nodeId})`,
        codeSnippet: GRAPH_CODE_SNIPPETS.addVertex,
        operation: "addVertex"
      })
      
      // Perform the operation
      graph.addVertex(nodeId, nodeLabel || nodeId)
      onGraphUpdate()

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        onAnimationStart({
          step: 3,
          item: { id: nodeId },
          description: `Added vertex ${nodeId} successfully`,
          codeSnippet: GRAPH_CODE_SNIPPETS.addVertex,
          operation: "addVertex"
        })
        
        // Clear animation
        animationTimeoutRef.current = setTimeout(() => {
          clearAnimation()
          setNodeId("")
          setNodeLabel("")
        }, 1000)
      }, 1000)
    }, 1000)
  }

  // Handle add edge operation
  const handleAddEdge = () => {
    if (!sourceId || !targetId) return

    if (!graph.getVertices().includes(sourceId)) {
      alert(`Vertex ${sourceId} does not exist`)
      return
    }

    if (!graph.getVertices().includes(targetId)) {
      alert(`Vertex ${targetId} does not exist`)
      return
    }

    clearAnimation()
    
    // Step 1: Show preparation
    onAnimationStart({
      step: 1,
      item: { source: sourceId, target: targetId },
      description: `Adding edge from ${sourceId} to ${targetId}`,
      codeSnippet: GRAPH_CODE_SNIPPETS.addEdge,
      operation: "addEdge"
    })

    // Step 2: Perform operation
    animationTimeoutRef.current = setTimeout(() => {
      onAnimationStart({
        step: 2,
        item: { source: sourceId, target: targetId },
        description: `Adding edge from ${sourceId} to ${targetId}`,
        codeSnippet: GRAPH_CODE_SNIPPETS.addEdge,
        operation: "addEdge"
      })
      
      // Perform the operation
      graph.addEdge(sourceId, targetId)
      onGraphUpdate()

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        onAnimationStart({
          step: 3,
          item: { source: sourceId, target: targetId },
          description: `Added edge from ${sourceId} to ${targetId} successfully`,
          codeSnippet: GRAPH_CODE_SNIPPETS.addEdge,
          operation: "addEdge"
        })
        
        // Clear animation
        animationTimeoutRef.current = setTimeout(() => {
          clearAnimation()
          setSourceId("")
          setTargetId("")
        }, 1000)
      }, 1000)
    }, 1000)
  }

  // Handle remove vertex operation
  const handleRemoveVertex = () => {
    if (!removeId) return

    if (!graph.getVertices().includes(removeId)) {
      alert(`Vertex ${removeId} does not exist`)
      return
    }

    clearAnimation()
    
    // Step 1: Show preparation
    onAnimationStart({
      step: 1,
      item: { id: removeId },
      description: `Removing vertex ${removeId}`,
      codeSnippet: GRAPH_CODE_SNIPPETS.removeVertex,
      operation: "removeVertex"
    })

    // Step 2: Perform operation
    animationTimeoutRef.current = setTimeout(() => {
      onAnimationStart({
        step: 2,
        item: { id: removeId },
        description: `Removing vertex ${removeId}`,
        codeSnippet: GRAPH_CODE_SNIPPETS.removeVertex,
        operation: "removeVertex"
      })
      
      // Perform the operation
      graph.removeVertex(removeId)
      onGraphUpdate()

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        onAnimationStart({
          step: 3,
          item: null,
          description: `Removed vertex ${removeId} successfully`,
          codeSnippet: GRAPH_CODE_SNIPPETS.removeVertex,
          operation: "removeVertex"
        })
        
        // Clear animation
        animationTimeoutRef.current = setTimeout(() => {
          clearAnimation()
          setRemoveId("")
        }, 1000)
      }, 1000)
    }, 1000)
  }

  // Handle BFS traversal
  const handleBFS = () => {
    if (!startNode) return

    if (!graph.getVertices().includes(startNode)) {
      alert(`Vertex ${startNode} does not exist`)
      return
    }

    clearAnimation()
    
    // Step 1: Show preparation
    onAnimationStart({
      step: 1,
      item: { id: startNode },
      description: `Starting BFS traversal from ${startNode}`,
      codeSnippet: GRAPH_CODE_SNIPPETS.bfs,
      operation: "bfs"
    })

    // Step 2: Perform operation
    animationTimeoutRef.current = setTimeout(() => {
      const path = graph.bfs(startNode)
      
      onAnimationStart({
        step: 2,
        item: { id: startNode },
        description: `BFS traversal from ${startNode}`,
        codeSnippet: GRAPH_CODE_SNIPPETS.bfs,
        operation: "bfs",
        highlightedPath: path
      })

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        onAnimationStart({
          step: 3,
          item: { id: startNode },
          description: `BFS traversal result: ${path.join(' → ')}`,
          codeSnippet: GRAPH_CODE_SNIPPETS.bfs,
          operation: "bfs",
          highlightedPath: path
        })
        
        // Clear animation
        animationTimeoutRef.current = setTimeout(() => {
          clearAnimation()
          setStartNode("")
        }, 2000)
      }, 2000)
    }, 1000)
  }

  // Handle DFS traversal
  const handleDFS = () => {
    if (!startNode) return

    if (!graph.getVertices().includes(startNode)) {
      alert(`Vertex ${startNode} does not exist`)
      return
    }

    clearAnimation()
    
    // Step 1: Show preparation
    onAnimationStart({
      step: 1,
      item: { id: startNode },
      description: `Starting DFS traversal from ${startNode}`,
      codeSnippet: GRAPH_CODE_SNIPPETS.dfs,
      operation: "dfs"
    })

    // Step 2: Perform operation
    animationTimeoutRef.current = setTimeout(() => {
      const path = graph.dfs(startNode)
      
      onAnimationStart({
        step: 2,
        item: { id: startNode },
        description: `DFS traversal from ${startNode}`,
        codeSnippet: GRAPH_CODE_SNIPPETS.dfs,
        operation: "dfs",
        highlightedPath: path
      })

      // Step 3: Complete
      animationTimeoutRef.current = setTimeout(() => {
        onAnimationStart({
          step: 3,
          item: { id: startNode },
          description: `DFS traversal result: ${path.join(' → ')}`,
          codeSnippet: GRAPH_CODE_SNIPPETS.dfs,
          operation: "dfs",
          highlightedPath: path
        })
        
        // Clear animation
        animationTimeoutRef.current = setTimeout(() => {
          clearAnimation()
          setStartNode("")
        }, 2000)
      }, 2000)
    }, 1000)
  }

  return (
    <Tabs defaultValue="add-vertex" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="add-vertex" className="flex-1">
          Add Vertex
        </TabsTrigger>
        <TabsTrigger value="add-edge" className="flex-1">
          Add Edge
        </TabsTrigger>
        <TabsTrigger value="remove" className="flex-1">
          Remove
        </TabsTrigger>
        <TabsTrigger value="traverse" className="flex-1">
          Traverse
        </TabsTrigger>
      </TabsList>

      <TabsContent value="add-vertex" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Vertex ID</label>
          <Input
            type="text"
            placeholder="Enter a vertex ID (e.g., A, B, C)"
            value={nodeId}
            onChange={(e) => setNodeId(e.target.value)}
            disabled={isAnimating}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Label (optional)</label>
          <Input
            type="text"
            placeholder="Enter a label (defaults to ID)"
            value={nodeLabel}
            onChange={(e) => setNodeLabel(e.target.value)}
            disabled={isAnimating}
          />
        </div>

        <Button className="w-full" onClick={handleAddVertex} disabled={!nodeId || isAnimating}>
          Add Vertex
        </Button>
      </TabsContent>

      <TabsContent value="add-edge" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Source Vertex</label>
          <Input
            type="text"
            placeholder="Enter source vertex ID"
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
            disabled={isAnimating}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Target Vertex</label>
          <Input
            type="text"
            placeholder="Enter target vertex ID"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            disabled={isAnimating}
          />
        </div>

        <Button className="w-full" onClick={handleAddEdge} disabled={!sourceId || !targetId || isAnimating}>
          Add Edge
        </Button>
      </TabsContent>

      <TabsContent value="remove" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Vertex ID</label>
          <Input
            type="text"
            placeholder="Enter vertex ID to remove"
            value={removeId}
            onChange={(e) => setRemoveId(e.target.value)}
            disabled={isAnimating}
          />
        </div>

        <Button
          className="w-full"
          variant="destructive"
          onClick={handleRemoveVertex}
          disabled={!removeId || isAnimating}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remove Vertex
        </Button>
      </TabsContent>

      <TabsContent value="traverse" className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Vertex</label>
          <Input
            type="text"
            placeholder="Enter starting vertex ID"
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            disabled={isAnimating}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={handleBFS}
            disabled={!startNode || isAnimating}
          >
            <Play className="mr-2 h-4 w-4" />
            BFS Traversal
          </Button>
          
          <Button
            variant="outline"
            onClick={handleDFS}
            disabled={!startNode || isAnimating}
          >
            <Play className="mr-2 h-4 w-4" />
            DFS Traversal
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  )
})

GraphOperations.displayName = "GraphOperations"

export { GraphOperations }
