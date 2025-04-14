import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"
import BinaryTreeTutorialLayout from "@/components/binary-tree-tutorial-layout"

export default function BinaryTreeApplicationsPage() {
  return (
    <BinaryTreeTutorialLayout
      title="Applications of Binary Trees"
      description="Explore real-world applications of binary trees in various domains"
      progress={100}
    >
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Real-World Applications of Binary Trees</h2>
        <p className="text-white/80">
          Binary trees are versatile data structures that find applications in numerous domains. Their hierarchical
          nature and efficient operations make them suitable for solving a wide range of problems.
        </p>

        <div className="space-y-8 mt-8">
          {/* Database Indexing */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">1. Database Indexing</h3>
            <p className="text-white/80">
              Binary trees, particularly balanced variants like B-trees and B+ trees, are extensively used in database
              systems to create indexes that speed up data retrieval operations.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">How B-trees Optimize Database Queries</h4>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>B-trees maintain sorted data, allowing for efficient range queries and equality searches</li>
                <li>They minimize disk I/O operations by storing multiple keys in each node (high fanout)</li>
                <li>Self-balancing properties ensure consistent performance regardless of insertion order</li>
                <li>Used in almost all relational database management systems (MySQL, PostgreSQL, Oracle, etc.)</li>
              </ul>
            </div>

            <CodeBlock
              code={`// Simplified B-tree node structure
class BTreeNode {
  keys: number[];           // Array of keys
  children: BTreeNode[];    // Array of child pointers
  isLeaf: boolean;          // Whether this node is a leaf
  
  constructor(isLeaf = false, order = 3) {
    this.keys = [];
    this.children = [];
    this.isLeaf = isLeaf;
  }
}

// Example search operation in a B-tree
function search(root: BTreeNode, key: number): boolean {
  let i = 0;
  
  // Find the first key greater than or equal to k
  while (i < root.keys.length && key > root.keys[i]) {
    i++;
  }
  
  // If the found key is equal to k, return true
  if (i < root.keys.length && key === root.keys[i]) {
    return true;
  }
  
  // If key wasn't found and this is a leaf node, return false
  if (root.isLeaf) {
    return false;
  }
  
  // Recursively search in the appropriate child
  return search(root.children[i], key);
}`}
              language="typescript"
              title="B-tree Implementation"
            />
          </div>

          {/* File System Organization */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">2. File System Organization</h3>
            <p className="text-white/80">
              Binary trees are used to organize file systems, where directories and files form a hierarchical structure.
              This organization allows for efficient file lookup, insertion, and deletion operations.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">File System Tree Structure</h4>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>The root directory serves as the root node of the tree</li>
                <li>Each directory is a node that can have multiple children (files and subdirectories)</li>
                <li>File paths represent the traversal path from the root to a specific node</li>
                <li>Operations like file search, creation, and deletion map to tree traversal and modification</li>
              </ul>
            </div>

            <CodeBlock
              code={`// File system node representation
interface FileSystemNode {
  name: string;
  isDirectory: boolean;
  size?: number;           // For files
  children?: FileSystemNode[]; // For directories
}

// Example file system tree
const fileSystem: FileSystemNode = {
  name: "root",
  isDirectory: true,
  children: [
    {
      name: "home",
      isDirectory: true,
      children: [
        {
          name: "user",
          isDirectory: true,
          children: [
            { name: "documents", isDirectory: true, children: [] },
            { name: "profile.txt", isDirectory: false, size: 1024 }
          ]
        }
      ]
    },
    {
      name: "etc",
      isDirectory: true,
      children: []
    },
    {
      name: "boot.log",
      isDirectory: false,
      size: 2048
    }
  ]
};

// Function to find a file or directory
function findNode(root: FileSystemNode, path: string[]): FileSystemNode | null {
  if (path.length === 0) return root;
  
  if (!root.isDirectory || !root.children) return null;
  
  const nextName = path[0];
  const child = root.children.find(node => node.name === nextName);
  
  if (!child) return null;
  
  return findNode(child, path.slice(1));
}`}
              language="typescript"
              title="File System Tree Implementation"
            />
          </div>

          {/* Decision Trees */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">3. Decision Trees in Machine Learning</h3>
            <p className="text-white/80">
              Binary decision trees are widely used in machine learning for classification and regression tasks. Each
              internal node represents a decision based on a feature, and each leaf node represents an outcome.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">Decision Tree Applications</h4>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>Classification problems (e.g., spam detection, medical diagnosis)</li>
                <li>Regression problems (e.g., predicting house prices)</li>
                <li>Feature importance analysis</li>
                <li>Random forests (ensembles of decision trees)</li>
              </ul>
            </div>

            <CodeBlock
              code={`// Simple decision tree node for classification
class DecisionTreeNode {
  feature?: number;        // Feature index to split on
  threshold?: number;      // Threshold value for the split
  left?: DecisionTreeNode; // Left subtree (feature value <= threshold)
  right?: DecisionTreeNode; // Right subtree (feature value > threshold)
  prediction?: number;     // Class prediction (for leaf nodes)
  
  // Predict class for a given sample
  predict(sample: number[]): number {
    // If this is a leaf node, return the prediction
    if (this.prediction !== undefined) {
      return this.prediction;
    }
    
    // Otherwise, navigate to the appropriate child based on the feature value
    if (sample[this.feature!] <= this.threshold!) {
      return this.left!.predict(sample);
    } else {
      return this.right!.predict(sample);
    }
  }
}

// Example usage
const decisionTree = new DecisionTreeNode();
decisionTree.feature = 0; // Age
decisionTree.threshold = 30;

decisionTree.left = new DecisionTreeNode();
decisionTree.left.feature = 1; // Income
decisionTree.left.threshold = 50000;

decisionTree.left.left = new DecisionTreeNode();
decisionTree.left.left.prediction = 0; // Class 0

decisionTree.left.right = new DecisionTreeNode();
decisionTree.left.right.prediction = 1; // Class 1

decisionTree.right = new DecisionTreeNode();
decisionTree.right.prediction = 1; // Class 1

// Predict class for a new sample: [age, income]
const sample = [25, 60000];
const prediction = decisionTree.predict(sample); // Returns 1`}
              language="typescript"
              title="Decision Tree Implementation"
            />
          </div>

          {/* Expression Trees */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">4. Expression Trees in Compilers</h3>
            <p className="text-white/80">
              Binary trees are used to represent arithmetic and logical expressions in compilers and interpreters. These
              expression trees facilitate evaluation, optimization, and code generation.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">Expression Tree Benefits</h4>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>Preserves operator precedence and associativity</li>
                <li>Enables easy evaluation through recursive traversal</li>
                <li>Facilitates expression optimization (constant folding, algebraic simplifications)</li>
                <li>Supports code generation for different target architectures</li>
              </ul>
            </div>

            <CodeBlock
              code={`// Expression tree node
class ExprNode {
  constructor(
    public type: 'operator' | 'number' | 'variable',
    public value: string | number,
    public left?: ExprNode,
    public right?: ExprNode
  ) {}
  
  // Evaluate the expression tree
  evaluate(variables: Record<string, number> = {}): number {
    if (this.type === 'number') {
      return this.value as number;
    }
    
    if (this.type === 'variable') {
      const varName = this.value as string;
      if (!(varName in variables)) {
        throw new Error(\`Variable \${varName} not defined\`);
      }
      return variables[varName];
    }
    
    // Must be an operator with two children
    const leftValue = this.left!.evaluate(variables);
    const rightValue = this.right!.evaluate(variables);
    
    switch (this.value) {
      case '+': return leftValue + rightValue;
      case '-': return leftValue - rightValue;
      case '*': return leftValue * rightValue;
      case '/': return leftValue / rightValue;
      default: throw new Error(\`Unknown operator: \${this.value}\`);
    }
  }
}

// Example: Build an expression tree for (3 + x) * (y - 2)
const expressionTree = new ExprNode(
  'operator', '*',
  new ExprNode(
    'operator', '+',
    new ExprNode('number', 3),
    new ExprNode('variable', 'x')
  ),
  new ExprNode(
    'operator', '-',
    new ExprNode('variable', 'y'),
    new ExprNode('number', 2)
  )
);

// Evaluate the expression with x=5 and y=10
const result = expressionTree.evaluate({ x: 5, y: 10 }); // (3 + 5) * (10 - 2) = 8 * 8 = 64`}
              language="typescript"
              title="Expression Tree Implementation"
            />
          </div>

          {/* Huffman Coding */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">5. Huffman Coding for Data Compression</h3>
            <p className="text-white/80">
              Binary trees are used in Huffman coding, a popular algorithm for lossless data compression. The algorithm
              builds a binary tree where frequently occurring characters have shorter codes.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-lg font-medium text-white mb-2">Huffman Coding Process</h4>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>Count frequency of each character in the input</li>
                <li>Build a priority queue of nodes, ordered by frequency</li>
                <li>Repeatedly merge the two nodes with lowest frequencies to form a new internal node</li>
                <li>Assign 0 to left edges and 1 to right edges to generate variable-length codes</li>
              </ul>
            </div>

            <CodeBlock
              code={`// Huffman tree node
class HuffmanNode {
  constructor(
    public char: string | null,
    public frequency: number,
    public left: HuffmanNode | null = null,
    public right: HuffmanNode | null = null
  ) {}
  
  // Check if this is a leaf node
  isLeaf(): boolean {
    return this.left === null && this.right === null;
  }
}

// Build Huffman tree from character frequencies
function buildHuffmanTree(text: string): HuffmanNode {
  // Count character frequencies
  const frequencies: Record<string, number> = {};
  for (const char of text) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  
  // Create leaf nodes for each character
  const queue: HuffmanNode[] = Object.entries(frequencies).map(
    ([char, freq]) => new HuffmanNode(char, freq)
  );
  
  // Sort by frequency (ascending)
  queue.sort((a, b) => a.frequency - b.frequency);
  
  // Build the tree by repeatedly merging the two nodes with lowest frequencies
  while (queue.length > 1) {
    const left = queue.shift()!;
    const right = queue.shift()!;
    
    // Create a new internal node with these two nodes as children
    const parent = new HuffmanNode(
      null, 
      left.frequency + right.frequency,
      left,
      right
    );
    
    // Add the new node back to the queue and resort
    queue.push(parent);
    queue.sort((a, b) => a.frequency - b.frequency);
  }
  
  // The last remaining node is the root of the Huffman tree
  return queue[0];
}

// Generate Huffman codes for each character
function generateCodes(root: HuffmanNode): Record<string, string> {
  const codes: Record<string, string> = {};
  
  function traverse(node: HuffmanNode, code: string) {
    if (node.isLeaf()) {
      codes[node.char!] = code || '0'; // Special case for single character input
      return;
    }
    
    if (node.left) traverse(node.left, code + '0');
    if (node.right) traverse(node.right, code + '1');
  }
  
  traverse(root, '');
  return codes;
}

// Example usage
const text = "this is an example for huffman encoding";
const tree = buildHuffmanTree(text);
const codes = generateCodes(tree);

console.log("Huffman Codes:");
for (const [char, code] of Object.entries(codes)) {
  console.log(\`\${char}: \${code}\`);
}`}
              language="typescript"
              title="Huffman Coding Implementation"
            />
          </div>
        </div>

        <InteractiveExercise
          questions={[
            {
              question: "Which binary tree application is primarily used for efficient data retrieval in databases?",
              options: ["Decision Trees", "B-trees and B+ trees", "Expression Trees", "Huffman Coding"],
              correctAnswer: 1,
              explanation:
                "B-trees and B+ trees are specifically designed for efficient data retrieval in databases, minimizing disk I/O operations and providing fast access to sorted data.",
            },
            {
              question:
                "Which application uses binary trees to represent hierarchical relationships between files and directories?",
              options: ["File System Organization", "Huffman Coding", "Database Indexing", "Expression Trees"],
              correctAnswer: 0,
              explanation:
                "File systems use tree structures to represent the hierarchical relationship between directories and files, with the root directory as the root node.",
            },
            {
              question:
                "In which application are binary trees used to assign shorter codes to frequently occurring symbols?",
              options: ["Expression Trees", "Decision Trees", "Huffman Coding", "File System Organization"],
              correctAnswer: 2,
              explanation:
                "Huffman coding uses binary trees to assign variable-length codes to characters, with shorter codes for more frequent characters, resulting in efficient data compression.",
            },
          ]}
        />
      </section>
    </BinaryTreeTutorialLayout>
  )
}
