"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"
import { GraphVisualizer } from "@/components/graph/graph-visualizer"

export default function GraphsPage() {
  const [graph, setGraph] = useState({
    nodes: ["A", "B", "C", "D", "E"],
    edges: [
      { source: "A", target: "B" },
      { source: "A", target: "C" },
      { source: "B", target: "D" },
      { source: "C", target: "E" },
      { source: "D", target: "E" },
    ],
  })
  const [source, setSource] = useState<string>("")
  const [target, setTarget] = useState<string>("")
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null)

  // Base code structure for Graph operations
  const baseCode = `class Graph {
  constructor() {
    this.adjacencyList = {};
  }
}`

  // Operation-specific code snippets
  const operationCodes: Record<string, { code: string; description: string }> = {
    addVertex: {
      code: `  // Add a vertex to the graph
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
    return this;
  }`,
      description: "addVertex operation adds a new vertex to the graph with O(1) time complexity.",
    },
    addEdge: {
      code: `  // Add an edge between two vertices
  addEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[  {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
    }
    return this;
  }`,
      description: "addEdge operation creates a connection between two vertices with O(1) time complexity.",
    },
    removeEdge: {
      code: `  // Remove an edge between two vertices
  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(v => v !== vertex2);
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(v => v !== vertex1);
    }
    return this;
  }`,
      description:
        "removeEdge operation removes a connection between two vertices with O(E) time complexity where E is the number of edges.",
    },
    removeVertex: {
      code: `  // Remove a vertex and all its connections
  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) return this;

    // Remove all edges connected to this vertex
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }

    // Delete the vertex key
    delete this.adjacencyList[vertex];
    return this;
  }`,
      description:
        "removeVertex operation removes a vertex and all its connections with O(V+E) time complexity where V is the number of vertices and E is the number of edges.",
    },
    dfs: {
      code: `  // Depth-first search traversal
  depthFirstSearch(start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    (function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);

      adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          return dfs(neighbor);
        }
      });
    })(start);

    return result;
  }`,
      description:
        "Depth-first search traverses the graph by exploring as far as possible along each branch before backtracking. Time complexity is O(V+E).",
    },
    bfs: {
      code: `  // Breadth-first search traversal
  breadthFirstSearch(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;

    while (queue.length) {
      const currentVertex = queue.shift();
      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }

    return result;
  }`,
      description:
        "Breadth-first search traverses the graph by exploring all neighbors at the present depth before moving on to nodes at the next depth level. Time complexity is O(V+E).",
    },
  }

  // Combine base code with selected operation code
  const getDisplayCode = () => {
    if (!selectedOperation) return baseCode
    return `${baseCode}\n\n${operationCodes[selectedOperation].code}`
  }

  // Get description based on selected operation
  const getDescription = () => {
    if (!selectedOperation) return "Select an operation to see its implementation and time complexity."
    return operationCodes[selectedOperation].description
  }

  // Simplified graph operations for demonstration
  const handleAddVertex = () => {
    setSelectedOperation("addVertex")
    // Simplified add vertex logic for demonstration
  }

  const handleAddEdge = () => {
    setSelectedOperation("addEdge")
    // Simplified add edge logic for demonstration
  }

  const handleRemoveEdge = () => {
    setSelectedOperation("removeEdge")
    // Simplified remove edge logic for demonstration
  }

  const handleRemoveVertex = () => {
    setSelectedOperation("removeVertex")
    // Simplified remove vertex logic for demonstration
  }

  const handleDFS = () => {
    setSelectedOperation("dfs")
    // Simplified DFS logic for demonstration
  }

  const handleBFS = () => {
    setSelectedOperation("bfs")
    // Simplified BFS logic for demonstration
  }

  const resetView = () => {
    setSelectedOperation(null)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Graphs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Graph Operations</CardTitle>
            <CardDescription>{getDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleAddVertex}>Add Vertex</Button>
                <Button onClick={handleAddEdge}>Add Edge</Button>
                <Button onClick={handleRemoveEdge}>Remove Edge</Button>
                <Button onClick={handleRemoveVertex}>Remove Vertex</Button>
                <Button onClick={handleDFS}>DFS</Button>
                <Button onClick={handleBFS}>BFS</Button>
                {selectedOperation && (
                  <Button variant="outline" onClick={resetView}>
                    Reset View
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Source</label>
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Target</label>
                  <input
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Graph Visualization</CardTitle>
            <CardDescription>Visual representation of the graph and its operations</CardDescription>
          </CardHeader>
          <CardContent>
            <GraphVisualizer graph={graph} />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedOperation
                ? `${selectedOperation.charAt(0).toUpperCase() + selectedOperation.slice(1)} Operation Code`
                : "Graph Implementation"}
            </CardTitle>
            <CardDescription>
              {selectedOperation
                ? `Highlighting the ${selectedOperation} operation implementation`
                : "Select an operation to see its implementation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock code={getDisplayCode()} language="javascript" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
