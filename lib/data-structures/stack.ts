// Stack class implementation
export class Stack {
  items: number[]

  constructor() {
    this.items = []
  }

  // Push an item onto the stack
  push(item: number) {
    this.items.push(item)
    return this
  }

  // Pop an item from the stack
  pop() {
    if (this.isEmpty()) {
      return null
    }
    return this.items.pop()
  }

  // Peek at the top item without removing it
  peek() {
    if (this.isEmpty()) {
      return null
    }
    return this.items[this.items.length - 1]
  }

  // Check if the stack is empty
  isEmpty() {
    return this.items.length === 0
  }

  // Get the size of the stack
  size() {
    return this.items.length
  }

  // Get all items in the stack
  getItems() {
    return [...this.items]
  }
}

// Code snippets for operations
export const STACK_CODE_SNIPPETS = {
  push: `// Push operation - O(1)
push(item: number) {
  // Add the item to the end of the array
  this.items.push(item)
  return this
}`,
  pop: `// Pop operation - O(1)
pop() {
  // Check if the stack is empty
  if (this.isEmpty()) {
    return null
  }
  // Remove and return the last item
  return this.items.pop()
}`,
  peek: `// Peek operation - O(1)
peek() {
  // Check if the stack is empty
  if (this.isEmpty()) {
    return null
  }
  // Return the last item without removing it
  return this.items[this.items.length - 1]
}`,
  empty: `// Stack is empty
// Use the push operation to add items to the stack
push(item: number) {
  this.items.push(item)
  return this
}`,
}
