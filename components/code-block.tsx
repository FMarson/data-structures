"use client"

import { useState } from "react"
import { Check, Clipboard, Code } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  highlightLines?: number[]
  className?: string
}

export function CodeBlock({ code, language = "javascript", title, highlightLines = [], className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("rounded-md overflow-hidden", className)}>
      {title && (
        <div className="flex items-center justify-between bg-white/10 px-4 py-2 text-sm text-white/70">
          <div className="flex items-center">
            <Code className="mr-2 h-4 w-4" />
            <span>{title}</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleCopy}
              className="flex items-center text-xs text-white/70 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="mr-1 h-3.5 w-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Clipboard className="mr-1 h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      )}
      <pre className="text-sm text-white/90 font-mono relative overflow-auto bg-black/50 p-4">
        {code.split("\n").map((line, i) => (
          <div
            key={i}
            className={cn(
              "px-2 -mx-2 rounded",
              highlightLines.includes(i + 1) && "bg-purple-900/30 border-l-2 border-purple-500",
            )}
          >
            {line || " "}
          </div>
        ))}
      </pre>
    </div>
  )
}
