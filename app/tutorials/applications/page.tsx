import { TutorialLayout } from "@/components/tutorial-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function LinkedListApplicationsPage() {
  return (
    <TutorialLayout
      title="Applications of Linked Lists"
      description="Explore real-world applications of linked lists in various domains"
      currentStep={6}
      totalSteps={6}
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Real-World Applications of Linked Lists</h2>
        <p className="text-white/80">
          Linked lists are versatile data structures that find applications in numerous domains. Their dynamic nature
          and efficient insertion/deletion operations make them suitable for solving a wide range of problems.
        </p>

        <div className="space-y-8 mt-8">
          {/* Implementing Stacks and Queues */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">1. Implementing Stacks and Queues</h3>
            <p className="text-white/80">
              Linked lists provide an efficient way to implement other abstract data types like stacks and queues. Their
              dynamic nature allows for flexible memory allocation and efficient operations.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">Advantages of Linked List Implementation</h4>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>No fixed size limitation (unlike array-based implementations)</li>
                <li>Efficient insertion and deletion operations (O(1) time complexity)</li>
                <li>Memory is allocated only when needed (no need to pre-allocate)</li>
                <li>Easy to implement and understand</li>
              </ul>
            </div>

            <CodeBlock
              code={`// Node class for linked list
class Node<T> {
  constructor(
    public value: T,
    public next: Node<T> | null = null
  ) {}
}

// Stack implementation using linked list
class LinkedListStack<T> {
  private head: Node<T> | null = null;
  private _size: number = 0;
  
  // Add element to the top of the stack
  push(value: T): void {
    const newNode = new Node(value, this.head);
    this.head = newNode;
    this._size++;
  }
  
  // Remove and return the top element
  pop(): T | undefined {
    if (!this.head) return undefined;
    
    const value = this.head.value;
    this.head = this.head.next;
    this._size--;
    
    return value;
  }
  
  // Return the top element without removing it
  peek(): T | undefined {
    return this.head?.value;
  }
  
  // Check if stack is empty
  isEmpty(): boolean {
    return this.head === null;
  }
  
  // Return the number of elements in the stack
  get size(): number {
    return this._size;
  }
}

// Queue implementation using linked list
class LinkedListQueue<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private _size: number = 0;
  
  // Add element to the end of the queue
  enqueue(value: T): void {
    const newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    
    this._size++;
  }
  
  // Remove and return the front element
  dequeue(): T | undefined {
    if (!this.head) return undefined;
    
    const value = this.head.value;
    this.head = this.head.next;
    
    if (!this.head) {
      this.tail = null;
    }
    
    this._size--;
    return value;
  }
  
  // Return the front element without removing it
  peek(): T | undefined {
    return this.head?.value;
  }
  
  // Check if queue is empty
  isEmpty(): boolean {
    return this.head === null;
  }
  
  // Return the number of elements in the queue
  get size(): number {
    return this._size;
  }
}`}
              language="typescript"
              title="Stack and Queue Implementation using Linked Lists"
            />
          </div>

          {/* Dynamic Memory Allocation */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">2. Dynamic Memory Allocation</h3>
            <p className="text-white/80">
              Linked lists are used in memory management systems to keep track of free memory blocks. This application
              is particularly important in operating systems and memory allocators.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">Memory Allocation with Linked Lists</h4>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>Free memory blocks are maintained as a linked list</li>
                <li>Memory allocation involves finding a suitable block and removing it from the list</li>
                <li>Memory deallocation involves adding the freed block back to the list</li>
                <li>Supports various allocation strategies (first-fit, best-fit, worst-fit)</li>
              </ul>
            </div>

            <CodeBlock
              code={`// Memory block representation
class MemoryBlock {
  constructor(
    public address: number,
    public size: number,
    public next: MemoryBlock | null = null
  ) {}
}

// Simple memory allocator using linked list
class MemoryAllocator {
  private freeList: MemoryBlock | null;
  
  constructor(initialSize: number) {
    // Initialize with one large free block
    this.freeList = new MemoryBlock(0, initialSize);
  }
  
  // Allocate memory using first-fit strategy
  allocate(size: number): number | null {
    if (!this.freeList) return null;
    
    let current = this.freeList;
    let prev: MemoryBlock | null = null;
    
    // Find the first block that's large enough
    while (current && current.size < size) {
      prev = current;
      current = current.next;
    }
    
    // No suitable block found
    if (!current) return null;
    
    const allocatedAddress = current.address;
    
    // If the block is exactly the size we need, remove it from the list
    if (current.size === size) {
      if (prev) {
        prev.next = current.next;
      } else {
        this.freeList = current.next;
      }
    } else {
      // Otherwise, reduce the block size and adjust its address
      current.size -= size;
      current.address += size;
    }
    
    return allocatedAddress;
  }
  
  // Free memory and add it back to the free list
  free(address: number, size: number): void {
    // Create a new block for the freed memory
    const newBlock = new MemoryBlock(address, size);
    
    // Insert at the beginning of the free list (could be optimized to merge adjacent blocks)
    newBlock.next = this.freeList;
    this.freeList = newBlock;
    
    // In a real implementation, we would merge adjacent free blocks here
    this.mergeFreeBlocks();
  }
  
  // Merge adjacent free blocks to reduce fragmentation
  private mergeFreeBlocks(): void {
    if (!this.freeList) return;
    
    // Sort free list by address
    let blocks: MemoryBlock[] = [];
    let current = this.freeList;
    
    while (current) {
      blocks.push(current);
      current = current.next;
    }
    
    blocks.sort((a, b) => a.address - b.address);
    
    // Rebuild the list, merging adjacent blocks
    this.freeList = blocks[0];
    current = this.freeList;
    
    for (let i = 1; i < blocks.length; i++) {
      const block = blocks[i];
      
      // If this block is adjacent to the current one, merge them
      if (current.address + current.size === block.address) {
        current.size += block.size;
      } else {
        // Otherwise, link to the next block
        current.next = block;
        current = block;
      }
      
      current.next = null;
    }
  }
  
  // Get the current state of the free list
  getFreeBlocks(): { address: number, size: number }[] {
    const blocks: { address: number, size: number }[] = [];
    let current = this.freeList;
    
    while (current) {
      blocks.push({ address: current.address, size: current.size });
      current = current.next;
    }
    
    return blocks;
  }
}`}
              language="typescript"
              title="Memory Allocator using Linked Lists"
            />
          </div>

          {/* LRU Cache Implementation */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">3. LRU Cache Implementation</h3>
            <p className="text-white/80">
              Linked lists, particularly doubly linked lists, are used to implement Least Recently Used (LRU) caches.
              These caches are essential in operating systems, databases, and web browsers to optimize memory usage.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">LRU Cache Characteristics</h4>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>Maintains items in order of recent access</li>
                <li>Most recently used items are kept at the front of the list</li>
                <li>When the cache is full, the least recently used item is evicted</li>
                <li>Provides O(1) time complexity for both lookup and insertion operations</li>
              </ul>
            </div>

            <CodeBlock
              code={`// Node for doubly linked list
class DoublyLinkedNode<K, V> {
  constructor(
    public key: K,
    public value: V,
    public prev: DoublyLinkedNode<K, V> | null = null,
    public next: DoublyLinkedNode<K, V> | null = null
  ) {}
}

// LRU Cache implementation using doubly linked list and hash map
class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, DoublyLinkedNode<K, V>>;
  private head: DoublyLinkedNode<K, V> | null = null;
  private tail: DoublyLinkedNode<K, V> | null = null;
  
  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  // Get value from cache
  get(key: K): V | undefined {
    const node = this.cache.get(key);
    
    if (!node) return undefined;
    
    // Move accessed node to the front (most recently used)
    this.moveToFront(node);
    
    return node.value;
  }
  
  // Put value in cache
  put(key: K, value: V): void {
    // If key already exists, update value and move to front
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      node.value = value;
      this.moveToFront(node);
      return;
    }
    
    // If cache is full, remove least recently used item (tail)
    if (this.cache.size >= this.capacity) {
      this.removeLRUItem();
    }
    
    // Create new node and add to front
    const newNode = new DoublyLinkedNode(key, value);
    this.addToFront(newNode);
    
    // Add to cache map
    this.cache.set(key, newNode);
  }
  
  // Move a node to the front of the list (most recently used)
  private moveToFront(node: DoublyLinkedNode<K, V>): void {
    // If already at front, do nothing
    if (node === this.head) return;
    
    // Remove from current position
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    
    // If it's the tail, update tail
    if (node === this.tail) {
      this.tail = node.prev;
    }
    
    // Add to front
    this.addToFront(node);
  }
  
  // Add a node to the front of the list
  private addToFront(node: DoublyLinkedNode<K, V>): void {
    node.next = this.head;
    node.prev = null;
    
    if (this.head) {
      this.head.prev = node;
    }
    
    this.head = node;
    
    // If this is the first node, it's also the tail
    if (!this.tail) {
      this.tail = node;
    }
  }
  
  // Remove the least recently used item (from the tail)
  private removeLRUItem(): void {
    if (!this.tail) return;
    
    // Remove from cache map
    this.cache.delete(this.tail.key);
    
    // Update tail
    this.tail = this.tail.prev;
    
    // If there's still a tail, its next should be null
    if (this.tail) {
      this.tail.next = null;
    } else {
      // If no tail, there's no head either
      this.head = null;
    }
  }
  
  // Get the current size of the cache
  get size(): number {
    return this.cache.size;
  }
  
  // Check if the cache is empty
  isEmpty(): boolean {
    return this.cache.size === 0;
  }
  
  // Clear the cache
  clear(): void {
    this.cache.clear();
    this.head = null;
    this.tail = null;
  }
}`}
              language="typescript"
              title="LRU Cache Implementation using Linked Lists"
            />
          </div>

          {/* Polynomial Representation */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">4. Polynomial Representation</h3>
            <p className="text-white/80">
              Linked lists are used to represent polynomials in mathematical applications. Each node represents a term
              with its coefficient and exponent, allowing for efficient polynomial operations.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">Advantages for Polynomial Operations</h4>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>Easy to represent sparse polynomials (with many zero coefficients)</li>
                <li>Efficient addition and multiplication operations</li>
                <li>Simple to insert and remove terms</li>
                <li>Memory efficient for large polynomials</li>
              </ul>
            </div>

            <CodeBlock
              code={`// Polynomial term node
class PolynomialTerm {
  constructor(
    public coefficient: number,
    public exponent: number,
    public next: PolynomialTerm | null = null
  ) {}
}

// Polynomial representation using linked list
class Polynomial {
  private head: PolynomialTerm | null = null;
  
  // Add a term to the polynomial
  addTerm(coefficient: number, exponent: number): void {
    if (coefficient === 0) return; // Skip zero coefficients
    
    const newTerm = new PolynomialTerm(coefficient, exponent);
    
    // If list is empty or new term has higher exponent than head
    if (!this.head || exponent > this.head.exponent) {
      newTerm.next = this.head;
      this.head = newTerm;
      return;
    }
    
    // Find the right position to insert (keeping terms in descending order of exponents)
    let current = this.head;
    
    while (current.next && current.next.exponent >= exponent) {
      current = current.next;
    }
    
    // If term with same exponent exists, add coefficients
    if (current.exponent === exponent) {
      current.coefficient += coefficient;
      
      // Remove term if coefficient becomes zero
      if (current.coefficient === 0) {
        this.removeTerm(exponent);
      }
    } else {
      // Insert new term
      newTerm.next = current.next;
      current.next = newTerm;
    }
  }
  
  // Remove a term with the given exponent
  removeTerm(exponent: number): void {
    if (!this.head) return;
    
    // If head is the term to remove
    if (this.head.exponent === exponent) {
      this.head = this.head.next;
      return;
    }
    
    // Find the term to remove
    let current = this.head;
    
    while (current.next && current.next.exponent !== exponent) {
      current = current.next;
    }
    
    // If found, remove it
    if (current.next && current.next.exponent === exponent) {
      current.next = current.next.next;
    }
  }
  
  // Add another polynomial to this one
  add(other: Polynomial): Polynomial {
    const result = new Polynomial();
    
    // Copy this polynomial
    let current = this.head;
    while (current) {
      result.addTerm(current.coefficient, current.exponent);
      current = current.next;
    }
    
    // Add the other polynomial
    current = other.head;
    while (current) {
      result.addTerm(current.coefficient, current.exponent);
      current = current.next;
    }
    
    return result;
  }
  
  // Multiply by another polynomial
  multiply(other: Polynomial): Polynomial {
    const result = new Polynomial();
    
    // Multiply each term of this polynomial with each term of the other
    let thisTerm = this.head;
    
    while (thisTerm) {
      let otherTerm = other.head;
      
      while (otherTerm) {
        // Multiply coefficients and add exponents
        const newCoefficient = thisTerm.coefficient * otherTerm.coefficient;
        const newExponent = thisTerm.exponent + otherTerm.exponent;
        
        result.addTerm(newCoefficient, newExponent);
        otherTerm = otherTerm.next;
      }
      
      thisTerm = thisTerm.next;
    }
    
    return result;
  }
  
  // Evaluate the polynomial for a given value of x
  evaluate(x: number): number {
    let result = 0;
    let current = this.head;
    
    while (current) {
      result += current.coefficient * Math.pow(x, current.exponent);
      current = current.next;
    }
    
    return result;
  }
  
  // Convert to string representation (e.g., "3x^2 + 2x - 5")
  toString(): string {
    if (!this.head) return "0";
    
    let result = "";
    let current = this.head;
    
    while (current) {
      // Add sign
      if (current !== this.head) {
        result += current.coefficient >= 0 ? " + " : " - ";
      } else if (current.coefficient < 0) {
        result += "-";
      }
      
      // Add coefficient (absolute value)
      const absCoef = Math.abs(current.coefficient);
      if (absCoef !== 1 || current.exponent === 0) {
        result += absCoef;
      }
      
      // Add variable and exponent
      if (current.exponent > 0) {
        result += "x";
        if (current.exponent > 1) {
          result += "^" + current.exponent;
        }
      }
      
      current = current.next;
    }
    
    return result;
  }
}`}
              language="typescript"
              title="Polynomial Representation using Linked Lists"
            />
          </div>

          {/* Sparse Matrix Representation */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">5. Sparse Matrix Representation</h3>
            <p className="text-white/80">
              Linked lists are used to efficiently represent sparse matrices (matrices with mostly zero elements). This
              representation saves memory by only storing non-zero elements.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">Sparse Matrix Benefits</h4>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>Memory efficient for matrices with many zero elements</li>
                <li>Reduces computational complexity for operations on sparse matrices</li>
                <li>Simplifies matrix operations like addition and multiplication</li>
                <li>Used in scientific computing, graph algorithms, and neural networks</li>
              </ul>
            </div>

            <CodeBlock
              code={`// Matrix element node
class MatrixNode {
  constructor(
    public row: number,
    public col: number,
    public value: number,
    public nextRow: MatrixNode | null = null,
    public nextCol: MatrixNode | null = null
  ) {}
}

// Sparse matrix using linked lists
class SparseMatrix {
  private rowHeads: (MatrixNode | null)[];
  private colHeads: (MatrixNode | null)[];
  private numRows: number;
  private numCols: number;
  
  constructor(rows: number, cols: number) {
    this.numRows = rows;
    this.numCols = cols;
    this.rowHeads = Array(rows).fill(null);
    this.colHeads = Array(cols).fill(null);
  }
  
  // Set value at position (row, col)
  set(row: number, col: number, value: number): void {
    if (row < 0 || row >= this.numRows || col < 0 || col >= this.numCols) {
      throw new Error("Index out of bounds");
    }
    
    // If value is 0, remove the node if it exists
    if (value === 0) {
      this.remove(row, col);
      return;
    }
    
    // Check if element already exists
    const existing = this.findNode(row, col);
    if (existing) {
      existing.value = value;
      return;
    }
    
    // Create new node
    const newNode = new MatrixNode(row, col, value);
    
    // Insert into row list
    let rowPrev: MatrixNode | null = null;
    let rowCurrent = this.rowHeads[row];
    
    while (rowCurrent && rowCurrent.col < col) {
      rowPrev = rowCurrent;
      rowCurrent = rowCurrent.nextRow;
    }
    
    if (rowPrev) {
      rowPrev.nextRow = newNode;
    } else {
      this.rowHeads[row] = newNode;
    }
    
    newNode.nextRow = rowCurrent;
    
    // Insert into column list
    let colPrev: MatrixNode | null = null;
    let colCurrent = this.colHeads[col];
    
    while (colCurrent && colCurrent.row < row) {
      colPrev = colCurrent;
      colCurrent = colCurrent.nextCol;
    }
    
    if (colPrev) {
      colPrev.nextCol = newNode;
    } else {
      this.colHeads[col] = newNode;
    }
    
    newNode.nextCol = colCurrent;
  }
  
  // Get value at position (row, col)
  get(row: number, col: number): number {
    if (row < 0 || row >= this.numRows || col < 0 || col >= this.numCols) {
      throw new Error("Index out of bounds");
    }
    
    const node = this.findNode(row, col);
    return node ? node.value : 0;
  }
  
  // Find node at position (row, col)
  private findNode(row: number, col: number): MatrixNode | null {
    // Start from row head (usually more efficient for sparse matrices)
    let current = this.rowHeads[row];
    
    while (current && current.col !== col) {
      current = current.nextRow;
    }
    
    return current;
  }
  
  // Remove node at position (row, col)
  private remove(row: number, col: number): void {
    // Remove from row list
    if (this.rowHeads[row]) {
      if (this.rowHeads[row]!.col === col) {
        this.rowHeads[row] = this.rowHeads[row]!.nextRow;
      } else {
        let current = this.rowHeads[row];
        
        while (current!.nextRow && current!.nextRow.col !== col) {
          current = current!.nextRow;
        }
        
        if (current!.nextRow) {
          current!.nextRow = current!.nextRow.nextRow;
        }
      }
    }
    
    // Remove from column list
    if (this.colHeads[col]) {
      if (this.colHeads[col]!.row === row) {
        this.colHeads[col] = this.colHeads[col]!.nextCol;
      } else {
        let current = this.colHeads[col];
        
        while (current!.nextCol && current!.nextCol.row !== row) {
          current = current!.nextCol;
        }
        
        if (current!.nextCol) {
          current!.nextCol = current!.nextCol.nextCol;
        }
      }
    }
  }
  
  // Add another matrix to this one
  add(other: SparseMatrix): SparseMatrix {
    if (this.numRows !== other.numRows || this.numCols !== other.numCols) {
      throw new Error("Matrix dimensions must match");
    }
    
    const result = new SparseMatrix(this.numRows, this.numCols);
    
    // Add all elements from this matrix
    for (let i = 0; i < this.numRows; i++) {
      let current = this.rowHeads[i];
      
      while (current) {
        result.set(current.row, current.col, current.value);
        current = current.nextRow;
      }
    }
    
    // Add all elements from other matrix
    for (let i = 0; i < other.numRows; i++) {
      let current = other.rowHeads[i];
      
      while (current) {
        result.set(current.row, current.col, result.get(current.row, current.col) + current.value);
        current = current.nextRow;
      }
    }
    
    return result;
  }
  
  // Convert to dense matrix representation (2D array)
  toDenseMatrix(): number[][] {
    const matrix: number[][] = Array(this.numRows)
      .fill(0)
      .map(() => Array(this.numCols).fill(0));
    
    for (let i = 0; i < this.numRows; i++) {
      let current = this.rowHeads[i];
      
      while (current) {
        matrix[current.row][current.col] = current.value;
        current = current.nextRow;
      }
    }
    
    return matrix;
  }
}`}
              language="typescript"
              title="Sparse Matrix Representation using Linked Lists"
            />
          </div>
        </div>

        <InteractiveExercise
          questions={[
            {
              question:
                "Which linked list application is best suited for implementing a cache that evicts the least recently used items?",
              options: ["Stack Implementation", "Dynamic Memory Allocation", "LRU Cache", "Polynomial Representation"],
              correctAnswer: 2,
              explanation:
                "LRU (Least Recently Used) Cache uses a doubly linked list to efficiently track the order of item access, allowing for O(1) operations when accessing, inserting, or removing items.",
            },
            {
              question:
                "Which application uses linked lists to efficiently represent mathematical expressions with many zero coefficients?",
              options: [
                "Sparse Matrix Representation",
                "Polynomial Representation",
                "Dynamic Memory Allocation",
                "Stack Implementation",
              ],
              correctAnswer: 0,
              explanation:
                "Sparse Matrix Representation uses linked lists to store only non-zero elements, saving memory and computational resources when working with matrices that contain mostly zeros.",
            },
            {
              question: "In which application are linked lists used to track available memory blocks in a system?",
              options: ["LRU Cache", "Dynamic Memory Allocation", "Stack Implementation", "Polynomial Representation"],
              correctAnswer: 1,
              explanation:
                "Dynamic Memory Allocation uses linked lists to track free memory blocks, allowing for efficient allocation and deallocation of memory in operating systems and memory managers.",
            },
          ]}
        />
      </section>
    </TutorialLayout>
  )
}
