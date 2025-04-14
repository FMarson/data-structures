// Graph implementation
export interface GraphNode {
  id: string
  label: string
}

export interface GraphEdge {
  source: string
  target: string
  weight?: number
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export class Graph {
  private adjacencyList: Map<string, Map<string, number>>
  private nodeLabels: Map<string, string>

  constructor() {
    this.adjacencyList = new Map()
    this.nodeLabels = new Map()
  }

  // Add a vertex to the graph
  addVertex(id: string, label: string = id): boolean {
    if (!this.adjacencyList.has(id)) {
      this.adjacencyList.set(id, new Map())
      this.nodeLabels.set(id, label)
      return true
    }
    return false
  }

  // Add an edge between vertices
  addEdge(source: string, target: string, weight: number = 1): boolean {
    if (this.adjacencyList.has(source) && this.adjacencyList.has(target)) {
      this.adjacencyList.get(source)!.set(target, weight)
      return true
    }
    return false
  }

  // Remove a vertex and all its edges
  removeVertex(id: string): boolean {
    if (!this.adjacencyList.has(id)) return false

    // Remove all edges pointing to this vertex
    for (const [vertex, edges] of this.adjacencyList.entries()) {
      edges.delete(id)
    }

    // Remove the vertex itself
    this.adjacencyList.delete(id)
    this.nodeLabels.delete(id)
    return true
  }

  // Remove an edge between vertices
  removeEdge(source: string, target: string): boolean {
    if (this.adjacencyList.has(source)) {
      return this.adjacencyList.get(source)!.delete(target)
    }
    return false
  }

  // Get all neighbors of a vertex
  getNeighbors(id: string): Map<string, number> | null {
    return this.adjacencyList.get(id) || null
  }

  // Check if an edge exists
  hasEdge(source: string, target: string): boolean {
    return this.adjacencyList.has(source) && this.adjacencyList.get(source)!.has(target)
  }

  // Get all vertices
  getVertices(): string[] {
    return Array.from(this.adjacencyList.keys())
  }

  // Get the label of a vertex
  getVertexLabel(id: string): string | null {
    return this.nodeLabels.get(id) || null
  }

  // Breadth-first search
  bfs(startVertex: string): string[] {
    if (!this.adjacencyList.has(startVertex)) return []

    const visited = new Set<string>()
    const queue: string[] = [startVertex]
    const result: string[] = []

    visited.add(startVertex)

    while (queue.length > 0) {
      const currentVertex = queue.shift()!
      result.push(currentVertex)

      for (const neighbor of this.adjacencyList.get(currentVertex)!.keys()) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push(neighbor)
        }
      }
    }

    return result
  }

  // Depth-first search
  dfs(startVertex: string): string[] {
    if (!this.adjacencyList.has(startVertex)) return []

    const visited = new Set<string>()
    const result: string[] = []

    const dfsHelper = (vertex: string) => {
      visited.add(vertex)
      result.push(vertex)

      for (const neighbor of this.adjacencyList.get(vertex)!.keys()) {
        if (!visited.has(neighbor)) {
          dfsHelper(neighbor)
        }
      }
    }

    dfsHelper(startVertex)
    return result
  }

  // Get the graph data for visualization
  getGraphData(): GraphData {
    const nodes: GraphNode[] = []
    const edges: GraphEdge[] = []

    // Add nodes
    for (const [id, label] of this.nodeLabels.entries()) {
      nodes.push({ id, label })
    }

    // Add edges
    for (const [source, targets] of this.adjacencyList.entries()) {
      for (const [target, weight] of targets.entries()) {
        edges.push({ source, target, weight })
      }
    }

    return { nodes, edges }
  }
}

// Code snippets for operations
export const GRAPH_CODE_SNIPPETS = {
  addVertex: `// Add vertex operation - O(1)
addVertex(id: string, label: string = id): boolean {
  if (!this.adjacencyList.has(id)) {
    this.adjacencyList.set(id, new Map())
    this.nodeLabels.set(id, label)
    return true
  }
  return false
}`,
  addEdge: `// Add edge operation - O(1)
addEdge(source: string, target: string, weight: number = 1): boolean {
  if (this.adjacencyList.has(source) && this.adjacencyList.has(target)) {
    this.adjacencyList.get(source)!.set(target, weight)
    return true
  }
  return false
}`,
  removeVertex: `// Remove vertex operation - O(V + E)
removeVertex(id: string): boolean {
  if (!this.adjacencyList.has(id)) return false

  // Remove all edges pointing to this vertex
  for (const [vertex, edges] of this.adjacencyList.entries()) {
    edges.delete(id)
  }

  // Remove the vertex itself
  this.adjacencyList.delete(id)
  this.nodeLabels.delete(id)
  return true
}`,
  bfs: `// Breadth-first search - O(V + E)
bfs(startVertex: string): string[] {
  if (!this.adjacencyList.has(startVertex)) return []

  const visited = new Set<string>()
  const queue: string[] = [startVertex]
  const result: string[] = []

  visited.add(startVertex)

  while (queue.length > 0) {
    const currentVertex = queue.shift()!
    result.push(currentVertex)

    for (const neighbor of this.adjacencyList.get(currentVertex)!.keys()) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
      }
    }
  }

  return result
}`,
  dfs: `// Depth-first search - O(V + E)
dfs(startVertex: string): string[] {
  if (!this.adjacencyList.has(startVertex)) return []

  const visited = new Set<string>()
  const result: string[] = []

  const dfsHelper = (vertex: string) => {
    visited.add(vertex)
    result.push(vertex)

    for (const neighbor of this.adjacencyList.get(vertex)!.keys()) {
      if (!visited.has(neighbor)) {
        dfsHelper(neighbor)
      }
    }
  }

  dfsHelper(startVertex)
  return result
}`,
  empty: `// Empty graph
// Use the addVertex and addEdge operations to build the graph
addVertex(id: string, label: string = id): boolean {
  this.adjacencyList.set(id, new Map())
  this.nodeLabels.set(id, label)
  return true
}`,
}
