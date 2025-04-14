"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Info, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const QueueProperties = memo(() => {
  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Info className="h-5 w-5" />
          Queue Properties
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium text-white">First-In-First-Out (FIFO)</h4>
            <p className="text-white/70 mt-1">
              The first item added to the queue is the first one to be removed.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-white">Time Complexity</h4>
            <div className="flex justify-between">
              <span>Enqueue:</span>
              <span className="font-mono">O(1)</span>
            </div>
            <div className="flex justify-between">
              <span>Dequeue:</span>
              <span className="font-mono">O(n)</span>
            </div>
            <div className="flex justify-between">
              <span>Peek:</span>
              <span className="font-mono">O(1)</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white">Applications</h4>
            <ul className="list-disc list-inside text-white/70 mt-1">
              <li>Task scheduling</li>
              <li>Print job management</li>
              <li>Breadth-first search</li>
              <li>Message queues</li>
            </ul>
          </div>

          <div className="pt-2 mt-2 border-t border-white/10">
            <Link href="/tutorials/queue/introduction">
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

QueueProperties.displayName = "QueueProperties"

export { QueueProperties }
