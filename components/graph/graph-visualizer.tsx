"use client"

import { useState, useRef, useEffect, memo } from "react"
import { Graph, GraphData } from "@/lib/data-structures/graph"
import { CodeBlock } from "@/components/code-block"

interface GraphVisualizerProps {
  initialNodes?: { id: string, label: string }[]
  initialEdges?: { source: string, target: string, weight?: number }[]
}

const GraphVisualizer = memo(({ 
  initialNodes = [
    { id: "A", label: "A" },
    { id: "B", label: "B" },
    { id: "C", label: "C" },
    { id: "D", label: "D" },
    { id: "E", label: "E" }
  ],
  initialEdges = [
    { source: "A", target: "B" },
    { source: "A", target: "C" },
    { source: "B", target: "D" },
    { source: "C", target: "E" },
    { source: "D", target: "E" }
  ]
}: GraphVisualizerProps) => {
  const [graph] = useState(new Graph())
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], edges: [] })
  const [animationStep, setAnimationStep] = useState(0)
  const [animationItem, setAnimationItem] = useState<{ id?: string, source?: string, target?: string } | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [operationDescription, setOperationDescription] = useState("")
  const [currentCodeSnippet, setCurrentCodeSnippet] = useState<string>("")
  const [currentOperation, setCurrentOperation] = useState<string>("empty")
  const [highlightedPath, setHighlightedPath] = useState<string[]>([])
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Update the graph visualization whenever the graph changes
  const updateGraph = () => {
    setGraphData(graph.getGraphData())
  }

  // Initialize the graph with example nodes and edges
  useEffect(() => {
    if (graphData.nodes.length === 0 && initialNodes.length > 0) {
      // Add nodes
      initialNodes.forEach(node => graph.addVertex(node.id, node.label))
      
      // Add edges
      initialEdges.forEach(edge => graph.addEdge(edge.source, edge.target, edge.weight))
      
      updateGraph()
    }
  }, [graph, graphData.nodes.length, initialNodes, initialEdges])

  // Clean up animations on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  // Calculate node positions in a circle layout
  const getNodePosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI
    const x = radius * Math.cos(angle) + 200
    const y = radius * Math.sin(angle) + 150
    return { x, y }
  }

  return (
    <div className="relative min-h-[400px] flex flex-col items-center justify-center">
      <div className="w-full h-[300px] border border-white/10 rounded-md bg-black/20 overflow-hidden">
        <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 400 300">
          {/* Edges */}
          {graphData.edges.map((edge, index) => {
            const sourceNode = graphData.nodes.find(n => n.id === edge.source)
            const targetNode = graphData.nodes.find(n => n.id === edge.target)
            
            if (!sourceNode || !targetNode) return null
            
            const sourcePos = getNodePosition(
              graphData.nodes.findIndex(n => n.id === sourceNode.id),
              graphData.nodes.length,
              100
            )
            const targetPos = getNodePosition(
              graphData.nodes.findIndex(n => n.id === targetNode.id),
              graphData.nodes.length,
              100
            )
            
            const isHighlighted = 
              isAnimating && 
              animationItem && 
              animationItem.source === edge.source && 
              animationItem.target === edge.target
            
            return (
              <line
                key={`${edge.source}-${edge.target}`}
                x1={sourcePos.x}
                y1={sourcePos.y}
                x2={targetPos.x}
                y2={targetPos.y}
                stroke={isHighlighted ? "#a855f7" : "rgba(255, 255, 255, 0.3)"}
                strokeWidth={isHighlighted ? 3 : 1}
                className={isHighlighted ? "filter drop-shadow-glow" : ""}
              />
            )
          })}
          
          {/* Nodes */}
          {graphData.nodes.map((node, index) => {
            const pos = getNodePosition(index, graphData.nodes.length, 100)
            
            const isHighlighted = 
              isAnimating && 
              animationItem && 
              animationItem.id === node.id
            
            const isInPath = highlightedPath.includes(node.id)
            
            return (
              <g key={node.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={20}
                  fill={isHighlighted ? "#a855f7" : isInPath ? "#7c3aed" : "rgba(255, 255, 255, 0.1)"}
                  stroke={isHighlighted ? "#d8b4fe" : "rgba(255, 255, 255, 0.3)"}
                  strokeWidth={isHighlighted ? 3 : 1}
                  className={isHighlighted ? "filter drop-shadow-glow" : ""}
                />
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="14"
                >
                  {node.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Operation description */}
      {isAnimating && (
        <div className="mt-6 p-3 bg-white/5 rounded-md w-full max-w-[500px]">
          <p className="font-medium">{operationDescription}</p>
          <p className="text-sm text-white/70 mt-1">
            {animationStep === 1 && "Preparing operation..."}
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
              currentOperation === "addVertex"
                ? [2, 3, 4, 5, 6]
                : currentOperation === "addEdge"
                  ? [2, 3, 4, 5]
                  : currentOperation === "removeVertex"
                    ? [4, 5, 6, 7, 8, 9, 10, 11, 12]
                    : currentOperation === "bfs" || currentOperation === "dfs"
                      ? [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
                      : []
            }
          />
        </div>
      )}
    </div>
  )
})

GraphVisualizer.displayName = "GraphVisualizer"

export { GraphVisualizer }
