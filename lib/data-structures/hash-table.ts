// Hash Table implementation
interface HashItem {
  key: string
  value: any
}

export class HashTable {
  buckets: HashItem[][]
  size: number

  constructor(size = 10) {
    this.buckets = Array(size).fill(null).map(() => [])
    this.size = size
  }

  // Hash function to convert key to index
  hash(key: string): number {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % this.size
  }

  // Set a key-value pair
  set(key: string, value: any): void {
    const index = this.hash(key)
    const bucket = this.buckets[index]
    
    // Check if key already exists
    const item = bucket.find(item => item.key === key)
    if (item) {
      item.value = value
    } else {
      bucket.push({ key, value })
    }
  }

  // Get a value by key
  get(key: string): any {
    const index = this.hash(key)
    const bucket = this.buckets[index]
    const item = bucket.find(item => item.key === key)
    return item ? item.value : null
  }

  // Delete a key-value pair
  delete(key: string): boolean {
    const index = this.hash(key)
    const bucket = this.buckets[index]
    const itemIndex = bucket.findIndex(item => item.key === key)
    
    if (itemIndex !== -1) {
      bucket.splice(itemIndex, 1)
      return true
    }
    return false
  }

  // Check if a key exists
  has(key: string): boolean {
    const index = this.hash(key)
    const bucket = this.buckets[index]
    return bucket.some(item => item.key === key)
  }

  // Get all keys
  keys(): string[] {
    return this.buckets.reduce((keys, bucket) => {
      return keys.concat(bucket.map(item => item.key))
    }, [] as string[])
  }

  // Get all entries
  entries(): { key: string, value: any }[] {
    return this.buckets.reduce((entries, bucket) => {
      return entries.concat(bucket.map(item => ({ key: item.key, value: item.value })))
    }, [] as { key: string, value: any }[])
  }

  // Get all buckets for visualization
  getBuckets(): HashItem[][] {
    return this.buckets
  }
}

// Code snippets for operations
export const HASH_TABLE_CODE_SNIPPETS = {
  hash: `// Hash function - O(k) where k is key length
hash(key: string): number {
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i)
  }
  return hash % this.size
}`,
  set: `// Set operation - O(1) average, O(n) worst case
set(key: string, value: any): void {
  const index = this.hash(key)
  const bucket = this.buckets[index]
  
  // Check if key already exists
  const item = bucket.find(item => item.key === key)
  if (item) {
    item.value = value
  } else {
    bucket.push({ key, value })
  }
}`,
  get: `// Get operation - O(1) average, O(n) worst case
get(key: string): any {
  const index = this.hash(key)
  const bucket = this.buckets[index]
  const item = bucket.find(item => item.key === key)
  return item ? item.value : null
}`,
  delete: `// Delete operation - O(1) average, O(n) worst case
delete(key: string): boolean {
  const index = this.hash(key)
  const bucket = this.buckets[index]
  const itemIndex = bucket.findIndex(item => item.key === key)
  
  if (itemIndex !== -1) {
    bucket.splice(itemIndex, 1)
    return true
  }
  return false
}`,
  empty: `// Hash table with empty buckets
// Use the set operation to add key-value pairs
set(key: string, value: any): void {
  const index = this.hash(key)
  this.buckets[index].push({ key, value })
}`,
}
