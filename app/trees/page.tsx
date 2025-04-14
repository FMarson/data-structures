"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"
import { BinaryTreeVisualizer as TreeVisualizer } from "@/components/binary-tree/binary-tree-visualizer"

export default function TreesPage() {
  const [tree, setTree] = useState<any>({
    value: 10,
    left: {
      value: 5,
      left: { value: 3, left: null, right: null },
      right: { value: 7, left: null, right: null },
    },
    right: {
      value: 15,
      left: { value: 12, left: null, right: null },
      right: { value: 20, left: null, right: null },
    },
  })
  const [value, setValue] = useState<number>(0)
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null)

  // Base code structure for Binary Search Tree operations
  const baseCode = `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
}`

  // Operation-specific code snippets
  const operationCodes: Record<string, { code: string; description: string }> = {
    insert: {
      code: `  // Insert a value into the BST
  insert(value) {
    const newNode = new TreeNode(value);

    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      if (value === current.value) return this;

      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }`,
      description:
        "Insert operation adds a value to the BST while maintaining the BST property. Average time complexity is O(log n), worst case O(n).",
    },
    search: {
      code: `  // Search for a value in the BST
  search(value) {
    if (this.root === null) return false;

    let current = this.root;
    let found = false;

    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }

    return found;
  }`,
      description: "Search operation finds a value in the BST. Average time complexity is O(log n), worst case O(n).",
    },
    inorder: {
      code: `  // Inorder traversal of the BST
  inorderTraversal(node = this.root, result = []) {
    if (node !== null) {
      this.inorderTraversal(node.left, result);
      result.push(node.value);
      this.inorderTraversal(node.right, result);
    }
    return result;
  }`,
      description: "Inorder traversal visits all nodes in ascending order. Time complexity is O(n).",
    },
    preorder: {
      code: `  // Preorder traversal of the BST
  preorderTraversal(node = this.root, result = []) {
    if (node !== null) {
      result.push(node.value);
      this.preorderTraversal(node.left, result);
      this.preorderTraversal(node.right, result);
    }
    return result;
  }`,
      description: "Preorder traversal visits the root before its children. Time complexity is O(n).",
    },
    postorder: {
      code: `  // Postorder traversal of the BST
  postorderTraversal(node = this.root, result = []) {
    if (node !== null) {
      this.postorderTraversal(node.left, result);
      this.postorderTraversal(node.right, result);
      result.push(node.value);
    }
    return result;
  }`,
      description: "Postorder traversal visits the root after its children. Time complexity is O(n).",
    },
  }

  // Combine base code with selected operation code
  const getDisplayCode = () => {
    if (!selectedOperation) return baseCode
    return `${baseCode}\n\n${operationCodes[selectedOperation].code}`
  }

  // Get description based on selected operation
  const getDescription = () => {
    if (!selectedOperation) return "Select an operation to see its implementation and time complexity."
    return operationCodes[selectedOperation].description
  }

  // Simplified tree operations for demonstration
  const handleInsert = () => {
    setSelectedOperation("insert")
    // Simplified insert logic for demonstration
    // In a real implementation, this would follow the BST property
  }

  const handleSearch = () => {
    setSelectedOperation("search")
    // Simplified search logic for demonstration
  }

  const handleInorder = () => {
    setSelectedOperation("inorder")
    // Simplified inorder traversal for demonstration
  }

  const handlePreorder = () => {
    setSelectedOperation("preorder")
    // Simplified preorder traversal for demonstration
  }

  const handlePostorder = () => {
    setSelectedOperation("postorder")
    // Simplified postorder traversal for demonstration
  }

  const resetView = () => {
    setSelectedOperation(null)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Binary Search Trees</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tree Operations</CardTitle>
            <CardDescription>{getDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleInsert}>Insert</Button>
                <Button onClick={handleSearch}>Search</Button>
                <Button onClick={handleInorder}>Inorder</Button>
                <Button onClick={handlePreorder}>Preorder</Button>
                <Button onClick={handlePostorder}>Postorder</Button>
                {selectedOperation && (
                  <Button variant="outline" onClick={resetView}>
                    Reset View
                  </Button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Value</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number.parseInt(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tree Visualization</CardTitle>
            <CardDescription>Visual representation of the binary search tree</CardDescription>
          </CardHeader>
          <CardContent>
            <TreeVisualizer tree={tree} />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedOperation
                ? `${selectedOperation.charAt(0).toUpperCase() + selectedOperation.slice(1)} Operation Code`
                : "Binary Search Tree Implementation"}
            </CardTitle>
            <CardDescription>
              {selectedOperation
                ? `Highlighting the ${selectedOperation} operation implementation`
                : "Select an operation to see its implementation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock code={getDisplayCode()} language="javascript" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
