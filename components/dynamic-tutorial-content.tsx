"use client"

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface DynamicTutorialContentProps {
  tutorialPath: string
  fallback?: React.ReactNode
}

export function DynamicTutorialContent({ 
  tutorialPath, 
  fallback = <div className="space-y-4 p-8">
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
    <div className="mt-8">
      <Skeleton className="h-32 w-full rounded-md" />
    </div>
  </div>
}: DynamicTutorialContentProps) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    
    // Dynamically import the tutorial content
    const importComponent = async () => {
      try {
        const module = await import(`@/app/tutorials/${tutorialPath}/page`)
        setComponent(() => module.default)
      } catch (error) {
        console.error(`Error loading tutorial content: ${tutorialPath}`, error)
      } finally {
        setIsLoading(false)
      }
    }

    importComponent()
  }, [tutorialPath])

  if (isLoading || !Component) {
    return <>{fallback}</>
  }

  return <Component />
}
