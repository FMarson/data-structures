"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Info, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const GraphProperties = memo(() => {
  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Info className="h-5 w-5" />
          Graph Properties
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium text-white">Vertices and Edges</h4>
            <p className="text-white/70 mt-1">
              Graphs consist of vertices (nodes) connected by edges, representing relationships between entities.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-white">Time Complexity</h4>
            <div className="flex justify-between">
              <span>Add Vertex:</span>
              <span className="font-mono">O(1)</span>
            </div>
            <div className="flex justify-between">
              <span>Add Edge:</span>
              <span className="font-mono">O(1)</span>
            </div>
            <div className="flex justify-between">
              <span>Remove Vertex:</span>
              <span className="font-mono">O(V + E)</span>
            </div>
            <div className="flex justify-between">
              <span>BFS/DFS:</span>
              <span className="font-mono">O(V + E)</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white">Applications</h4>
            <ul className="list-disc list-inside text-white/70 mt-1">
              <li>Social networks</li>
              <li>Route planning</li>
              <li>Web page ranking</li>
              <li>Network topology</li>
            </ul>
          </div>

          <div className="pt-2 mt-2 border-t border-white/10">
            <Link href="/tutorials/graph/introduction">
              <Button variant="outline" size="sm" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Learn More in Tutorial Mode
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

GraphProperties.displayName = "GraphProperties"

export { GraphProperties }
