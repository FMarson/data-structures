// Binary Tree implementation
export class TreeNode {
  value: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export class BinarySearchTree {
  root: TreeNode | null

  constructor() {
    this.root = null
  }

  // Insert a value into the tree
  insert(value: number): BinarySearchTree {
    const newNode = new TreeNode(value)

    if (this.root === null) {
      this.root = newNode
      return this
    }

    let current = this.root
    while (true) {
      if (value === current.value) return this // No duplicates
      
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode
          return this
        }
        current = current.left
      } else {
        if (current.right === null) {
          current.right = newNode
          return this
        }
        current = current.right
      }
    }
  }

  // Find a value in the tree
  find(value: number): TreeNode | null {
    if (!this.root) return null

    let current = this.root
    while (current) {
      if (value === current.value) return current
      current = value < current.value ? current.left : current.right
    }
    
    return null
  }

  // Check if a value exists in the tree
  contains(value: number): boolean {
    return this.find(value) !== null
  }

  // Get the minimum value in the tree
  findMin(): number | null {
    if (!this.root) return null
    
    let current = this.root
    while (current.left) {
      current = current.left
    }
    
    return current.value
  }

  // Get the maximum value in the tree
  findMax(): number | null {
    if (!this.root) return null
    
    let current = this.root
    while (current.right) {
      current = current.right
    }
    
    return current.value
  }

  // Remove a value from the tree
  remove(value: number): BinarySearchTree {
    this.root = this._removeNode(this.root, value)
    return this
  }

  // Helper method for remove
  private _removeNode(node: TreeNode | null, value: number): TreeNode | null {
    if (node === null) return null

    if (value < node.value) {
      node.left = this._removeNode(node.left, value)
      return node
    } else if (value > node.value) {
      node.right = this._removeNode(node.right, value)
      return node
    } else {
      // Case 1: No children
      if (node.left === null && node.right === null) {
        return null
      }
      
      // Case 2: One child
      if (node.left === null) {
        return node.right
      }
      
      if (node.right === null) {
        return node.left
      }
      
      // Case 3: Two children
      // Find the minimum value in the right subtree
      let successor = node.right
      while (successor.left) {
        successor = successor.left
      }
      
      node.value = successor.value
      node.right = this._removeNode(node.right, successor.value)
      return node
    }
  }

  // In-order traversal (left, root, right)
  inOrder(): number[] {
    const result: number[] = []
    
    function traverse(node: TreeNode | null) {
      if (node) {
        traverse(node.left)
        result.push(node.value)
        traverse(node.right)
      }
    }
    
    traverse(this.root)
    return result
  }

  // Pre-order traversal (root, left, right)
  preOrder(): number[] {
    const result: number[] = []
    
    function traverse(node: TreeNode | null) {
      if (node) {
        result.push(node.value)
        traverse(node.left)
        traverse(node.right)
      }
    }
    
    traverse(this.root)
    return result
  }

  // Post-order traversal (left, right, root)
  postOrder(): number[] {
    const result: number[] = []
    
    function traverse(node: TreeNode | null) {
      if (node) {
        traverse(node.left)
        traverse(node.right)
        result.push(node.value)
      }
    }
    
    traverse(this.root)
    return result
  }

  // Get the tree as a hierarchical object for visualization
  getTree(): TreeNode | null {
    return this.root
  }
}

// Code snippets for operations
export const BINARY_TREE_CODE_SNIPPETS = {
  insert: `// Insert operation - O(log n) average, O(n) worst case
insert(value: number): BinarySearchTree {
  const newNode = new TreeNode(value)

  if (this.root === null) {
    this.root = newNode
    return this
  }

  let current = this.root
  while (true) {
    if (value === current.value) return this // No duplicates
    
    if (value < current.value) {
      if (current.left === null) {
        current.left = newNode
        return this
      }
      current = current.left
    } else {
      if (current.right === null) {
        current.right = newNode
        return this
      }
      current = current.right
    }
  }
}`,
  find: `// Find operation - O(log n) average, O(n) worst case
find(value: number): TreeNode | null {
  if (!this.root) return null

  let current = this.root
  while (current) {
    if (value === current.value) return current
    current = value < current.value ? current.left : current.right
  }
  
  return null
}`,
  remove: `// Remove operation - O(log n) average, O(n) worst case
remove(value: number): BinarySearchTree {
  this.root = this._removeNode(this.root, value)
  return this
}

// Helper method for remove
private _removeNode(node: TreeNode | null, value: number): TreeNode | null {
  if (node === null) return null

  if (value < node.value) {
    node.left = this._removeNode(node.left, value)
    return node
  } else if (value > node.value) {
    node.right = this._removeNode(node.right, value)
    return node
  } else {
    // Case 1: No children
    if (node.left === null && node.right === null) {
      return null
    }
    
    // Case 2: One child
    if (node.left === null) {
      return node.right
    }
    
    if (node.right === null) {
      return node.left
    }
    
    // Case 3: Two children
    // Find the minimum value in the right subtree
    let successor = node.right
    while (successor.left) {
      successor = successor.left
    }
    
    node.value = successor.value
    node.right = this._removeNode(node.right, successor.value)
    return node
  }
}`,
  traversal: `// In-order traversal - O(n)
inOrder(): number[] {
  const result: number[] = []
  
  function traverse(node: TreeNode | null) {
    if (node) {
      traverse(node.left)
      result.push(node.value)
      traverse(node.right)
    }
  }
  
  traverse(this.root)
  return result
}`,
  empty: `// Empty binary search tree
// Use the insert operation to add nodes
insert(value: number): BinarySearchTree {
  const newNode = new TreeNode(value)
  this.root = newNode
  return this
}`,
}
