// Queue class implementation
export class Queue {
  items: number[]

  constructor() {
    this.items = []
  }

  // Add an item to the queue (at the end)
  enqueue(item: number) {
    this.items.push(item)
    return this
  }

  // Remove an item from the queue (from the front)
  dequeue() {
    if (this.isEmpty()) {
      return null
    }
    return this.items.shift()
  }

  // Look at the front item without removing it
  peek() {
    if (this.isEmpty()) {
      return null
    }
    return this.items[0]
  }

  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0
  }

  // Get the size of the queue
  size() {
    return this.items.length
  }

  // Get all items in the queue
  getItems() {
    return [...this.items]
  }
}

// Code snippets for operations
export const QUEUE_CODE_SNIPPETS = {
  enqueue: `// Enqueue operation - O(1)
enqueue(item: number) {
  // Add the item to the end of the array
  this.items.push(item)
  return this
}`,
  dequeue: `// Dequeue operation - O(n)
dequeue() {
  // Check if the queue is empty
  if (this.isEmpty()) {
    return null
  }
  // Remove and return the first item
  return this.items.shift()
}`,
  peek: `// Peek operation - O(1)
peek() {
  // Check if the queue is empty
  if (this.isEmpty()) {
    return null
  }
  // Return the first item without removing it
  return this.items[0]
}`,
  empty: `// Queue is empty
// Use the enqueue operation to add items to the queue
enqueue(item: number) {
  this.items.push(item)
  return this
}`,
}
