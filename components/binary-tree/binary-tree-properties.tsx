"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Info, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const BinaryTreeProperties = memo(() => {
  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Info className="h-5 w-5" />
          Binary Search Tree Properties
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium text-white">Ordered Structure</h4>
            <p className="text-white/70 mt-1">
              For each node, all values in the left subtree are less than the node's value, and all values in the right subtree are greater.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-white">Time Complexity</h4>
            <div className="flex justify-between">
              <span>Insert:</span>
              <span className="font-mono">O(log n) average</span>
            </div>
            <div className="flex justify-between">
              <span>Find:</span>
              <span className="font-mono">O(log n) average</span>
            </div>
            <div className="flex justify-between">
              <span>Remove:</span>
              <span className="font-mono">O(log n) average</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white">Applications</h4>
            <ul className="list-disc list-inside text-white/70 mt-1">
              <li>Hierarchical data storage</li>
              <li>Priority queues</li>
              <li>Sorting algorithms</li>
              <li>Database indexing</li>
            </ul>
          </div>

          <div className="pt-2 mt-2 border-t border-white/10">
            <Link href="/tutorials/binary-tree/introduction">
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

BinaryTreeProperties.displayName = "BinaryTreeProperties"

export { BinaryTreeProperties }
