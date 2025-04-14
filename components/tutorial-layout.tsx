"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Home, Menu, X, List, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface TutorialLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  currentStep: number
  totalSteps: number
  prevHref?: string
  nextHref?: string
}

const tutorialRoutes = [
  { path: "/tutorials/introduction", title: "Introduction to Linked Lists" },
  { path: "/tutorials/creating-nodes", title: "Creating Nodes" },
  { path: "/tutorials/insertion", title: "Insertion Operations" },
  { path: "/tutorials/deletion", title: "Deletion Operations" },
  { path: "/tutorials/searching", title: "Searching Operations" },
  { path: "/tutorials/traversal", title: "Traversal Operations" },
]

export function TutorialLayout({
  children,
  title,
  description,
  currentStep,
  totalSteps,
  prevHref,
  nextHref,
}: TutorialLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only if not in an input field
      if (document.activeElement?.tagName === "INPUT") return

      if (e.key === "ArrowLeft" && prevHref) {
        router.push(prevHref)
      } else if (e.key === "ArrowRight" && nextHref) {
        router.push(nextHref)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prevHref, nextHref, router])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-purple">
      {/* Mobile header */}
      <header className="lg:hidden border-b border-white/10 bg-black/20">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 bg-black/30 backdrop-blur-md transform transition-transform lg:translate-x-0 lg:static lg:z-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-16 items-center border-b border-white/10 px-4 lg:h-[65px]">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </div>
          <nav className="p-4">
            <div className="flex items-center mb-4 text-white">
              <List className="h-5 w-5 mr-2 text-purple-400" />
              <p className="text-sm font-semibold uppercase tracking-wider text-white/50">LinkedList Tutorials</p>
            </div>
            <ul className="space-y-1">
              {tutorialRoutes.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors",
                      pathname === route.path
                        ? "bg-primary text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="container px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-medium text-white/70">
                    Step {currentStep} of {totalSteps}
                  </h2>
                  <span className="text-sm text-white/70">
                    {Math.round((currentStep / totalSteps) * 100)}% Complete
                  </span>
                </div>
                <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
              </div>

              {/* Tutorial content */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
                  <p className="mt-2 text-lg text-white/70">{description}</p>
                </div>

                <div className="card-gradient rounded-xl p-6">{children}</div>

                {/* Navigation buttons */}
                <div className="flex justify-between pt-4">
                  {prevHref ? (
                    <Link href={prevHref}>
                      <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Previous
                      </Button>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextHref ? (
                    <Link href={nextHref}>
                      <Button className="gap-2">
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/">
                      <Button className="gap-2">
                        Finish
                        <Home className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer className="border-t border-white/10 py-6 bg-black/20 mt-auto">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-sm text-white/60">
              Data Structures Visualizer - An interactive learning tool created by Pau Aranega Bellido
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/pauaranegabellido"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/60 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://github.com/paudefclasspy/data-structures"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/60 hover:text-purple-400 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
