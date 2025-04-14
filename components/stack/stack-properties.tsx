"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Info, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const StackProperties = memo(() => {
  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Info className="h-5 w-5" />
          Stack Properties
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium text-white">Last-In-First-Out (LIFO)</h4>
            <p className="text-white/70 mt-1">
              The last item added to the stack is the first one to be removed.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-white">Time Complexity</h4>
            <div className="flex justify-between">
              <span>Push:</span>
              <span className="font-mono">O(1)</span>
            </div>
            <div className="flex justify-between">
              <span>Pop:</span>
              <span className="font-mono">O(1)</span>
            </div>
            <div className="flex justify-between">
              <span>Peek:</span>
              <span className="font-mono">O(1)</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white">Applications</h4>
            <ul className="list-disc list-inside text-white/70 mt-1">
              <li>Function call management</li>
              <li>Expression evaluation</li>
              <li>Undo mechanisms</li>
              <li>Backtracking algorithms</li>
            </ul>
          </div>

          <div className="pt-2 mt-2 border-t border-white/10">
            <Link href="/tutorials/stack/introduction">
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

StackProperties.displayName = "StackProperties"

export { StackProperties }
