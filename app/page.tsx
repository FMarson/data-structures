import Link from "next/link"
import { ArrowRight, List, Network, BarChart3, Hash, GitBranch, AlignJustify, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-purple">
      <div className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Data Structures Visualizer
            </h1>
            <p className="text-lg text-white/80">
              Learn data structures through interactive visualizations and step-by-step tutorials
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Start Learning</CardTitle>
                <CardDescription className="text-white/70">
                  Begin your journey through our interactive data structure tutorials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-6">
                  Our step-by-step tutorials will guide you through the fundamentals of data structures, from basic
                  concepts to advanced operations.
                </p>
                <Link href="/linked-list">
                  <Button className="w-full">
                    Start Exploring
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Available Visualizations</CardTitle>
                <CardDescription className="text-white/70">What you'll learn in these tutorials</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <List className="mr-2 h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Linked Lists, Stacks, and Queues</span>
                  </li>
                  <li className="flex items-start">
                    <Hash className="mr-2 h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Hash Tables and their operations</span>
                  </li>
                  <li className="flex items-start">
                    <GitBranch className="mr-2 h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Trees and recursive algorithms</span>
                  </li>
                  <li className="flex items-start">
                    <Network className="mr-2 h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Graphs and traversal algorithms</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Data Structure Visualizations</CardTitle>
                <CardDescription className="text-white/70">
                  Explore our comprehensive data structure visualizations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    {
                      title: "Linked List",
                      description: "Visualize operations on a singly linked list",
                      href: "/linked-list",
                      icon: <List className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Stack",
                      description: "Explore LIFO data structure operations",
                      href: "/stack",
                      icon: <BarChart3 className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Queue",
                      description: "Understand FIFO data structure operations",
                      href: "/queue",
                      icon: <AlignJustify className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Hash Table",
                      description: "Visualize key-value storage with hashing",
                      href: "/hash-table",
                      icon: <Hash className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Binary Tree",
                      description: "Explore hierarchical data structure operations",
                      href: "/binary-tree",
                      icon: <GitBranch className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Graph",
                      description: "Visualize nodes and edges with traversals",
                      href: "/graph",
                      icon: <Network className="h-10 w-10 text-purple-400" />,
                    },
                  ].map((item, index) => (
                    <Link key={index} href={item.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="mb-2">{item.icon}</div>
                          <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 text-sm">{item.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Explore
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Linked List Tutorials</CardTitle>
                <CardDescription className="text-white/70">
                  Explore our comprehensive linked list curriculum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Introduction to Linked Lists",
                      description: "Learn what linked lists are and why they're useful",
                      href: "/tutorials/introduction",
                    },
                    {
                      title: "Creating Nodes",
                      description: "Understand the building blocks of linked lists",
                      href: "/tutorials/creating-nodes",
                    },
                    {
                      title: "Insertion Operations",
                      description: "Add elements at the beginning, end, or specific positions",
                      href: "/tutorials/insertion",
                    },
                    {
                      title: "Deletion Operations",
                      description: "Remove elements from different positions in the list",
                      href: "/tutorials/deletion",
                    },
                    {
                      title: "Searching Operations",
                      description: "Find elements in a linked list efficiently",
                      href: "/tutorials/searching",
                    },
                    {
                      title: "Traversal Operations",
                      description: "Navigate through all elements in a linked list",
                      href: "/tutorials/traversal",
                    },
                    {
                      title: "Applications of Linked Lists",
                      description: "Explore real-world uses of linked list data structures",
                      href: "/tutorials/applications",
                    },
                  ].map((module, index) => (
                    <Link key={index} href={module.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">{module.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70">{module.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Start Module
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Stack Tutorials</CardTitle>
                <CardDescription className="text-white/70">Explore our comprehensive stack curriculum</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Introduction to Stacks",
                      description: "Learn what stacks are and the LIFO principle",
                      href: "/tutorials/stack/introduction",
                    },
                    {
                      title: "Push Operation",
                      description: "Master push, pop, and peek operations",
                      href: "/tutorials/stack/push-operation",
                    },
                    {
                      title: "Pop Operation",
                      description: "Implement stacks using arrays and linked lists",
                      href: "/tutorials/stack/pop-operation",
                    },
                    {
                      title: "Peek Operation",
                      description: "Explore real-world uses of stack data structures",
                      href: "/tutorials/stack/peek-operation",
                    },
                    {
                      title: "Aplication of Stacks",
                      description: "Solve problems using stacks and backtracking",
                      href: "/tutorials/stack/applications",
                    },
                  ].map((module, index) => (
                    <Link key={index} href={module.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">{module.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70">{module.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Start Module
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Queue Tutorials</CardTitle>
                <CardDescription className="text-white/70">Explore our comprehensive queue curriculum</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Introduction to Queues",
                      description: "Learn what queues are and the FIFO principle",
                      href: "/tutorials/queue/introduction",
                    },
                    {
                      title: "Enqueue Operation",
                      description: "Add elements to the end of the queue",
                      href: "/tutorials/queue/enqueue-operation",
                    },
                    {
                      title: "Dequeue Operation",
                      description: "Remove elements from the front of the queue",
                      href: "/tutorials/queue/dequeue-operation",
                    },
                    {
                      title: "Peek Operation",
                      description: "View the front element without removing it",
                      href: "/tutorials/queue/peek-operation",
                    },
                    {
                      title: "Applications of Queues",
                      description: "Explore real-world uses of queue data structures",
                      href: "/tutorials/queue/applications",
                    },
                  ].map((module, index) => (
                    <Link key={index} href={module.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">{module.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70">{module.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Start Module
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Hash Table Tutorials</CardTitle>
                <CardDescription className="text-white/70">
                  Explore our comprehensive hash table curriculum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Introduction to Hash Tables",
                      description: "Learn what hash tables are and how they work",
                      href: "/tutorials/hash-table/introduction",
                    },
                    {
                      title: "Insert Operation",
                      description: "Add key-value pairs to a hash table",
                      href: "/tutorials/hash-table/insert-operation",
                    },
                    {
                      title: "Delete Operation",
                      description: "Remove entries from a hash table",
                      href: "/tutorials/hash-table/delete-operation",
                    },
                    {
                      title: "Search Operation",
                      description: "Look up values in a hash table efficiently",
                      href: "/tutorials/hash-table/search-operation",
                    },
                    {
                      title: "Applications of Hash Tables",
                      description: "Explore real-world uses of hash table data structures",
                      href: "/tutorials/hash-table/applications",
                    },
                  ].map((module, index) => (
                    <Link key={index} href={module.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">{module.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70">{module.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Start Module
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Binary Tree Tutorials</CardTitle>
                <CardDescription className="text-white/70">
                  Explore our comprehensive binary tree curriculum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Introduction to Binary Trees",
                      description: "Learn what binary trees are and how they work",
                      href: "/tutorials/binary-tree/introduction",
                    },
                    {
                      title: "Insert Operation",
                      description: "Add nodes to a binary search tree",
                      href: "/tutorials/binary-tree/insert-operation",
                    },
                    {
                      title: "Search Operation",
                      description: "Find values in a binary search tree efficiently",
                      href: "/tutorials/binary-tree/search-operation",
                    },
                    {
                      title: "Delete Operation",
                      description: "Remove nodes from a binary search tree",
                      href: "/tutorials/binary-tree/delete-operation",
                    },
                    {
                      title: "Traversal Operation",
                      description: "Explore different ways to visit all nodes in a tree",
                      href: "/tutorials/binary-tree/traversal-operation",
                    },
                    {
                      title: "Applications of Binary Trees",
                      description: "Explore real-world uses of binary tree data structures",
                      href: "/tutorials/binary-tree/applications",
                    },
                  ].map((module, index) => (
                    <Link key={index} href={module.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">{module.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70">{module.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Start Module
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <footer className="border-t border-white/10 py-6 bg-black/20">
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
    </main>
  )
}
