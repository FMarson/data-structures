"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Info, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const HashTableProperties = memo(() => {
  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Info className="h-5 w-5" />
          Hash Table Properties
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium text-white">Key-Value Storage</h4>
            <p className="text-white/70 mt-1">
              Hash tables store data as key-value pairs with fast lookups.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-white">Time Complexity</h4>
            <div className="flex justify-between">
              <span>Set:</span>
              <span className="font-mono">O(1) average</span>
            </div>
            <div className="flex justify-between">
              <span>Get:</span>
              <span className="font-mono">O(1) average</span>
            </div>
            <div className="flex justify-between">
              <span>Delete:</span>
              <span className="font-mono">O(1) average</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white">Applications</h4>
            <ul className="list-disc list-inside text-white/70 mt-1">
              <li>Database indexing</li>
              <li>Caching</li>
              <li>Symbol tables</li>
              <li>Associative arrays</li>
            </ul>
          </div>

          <div className="pt-2 mt-2 border-t border-white/10">
            <Link href="/tutorials/hash-table/introduction">
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

HashTableProperties.displayName = "HashTableProperties"

export { HashTableProperties }
