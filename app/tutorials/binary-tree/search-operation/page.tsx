import BinaryTreeTutorialLayout from "@/components/binary-tree-tutorial-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function SearchOperation() {
  return (
    <BinaryTreeTutorialLayout
      title="Search Operation in Binary Search Trees"
      description="Learn how to find values in a binary search tree"
      currentStep={3}
      totalSteps={6}
      prevHref="/tutorials/binary-tree/insert-operation"
      nextHref="/tutorials/binary-tree/delete-operation"
    >
      <div className="space-y-6 text-white">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Understanding the Search Operation</h2>
          <p>
            Searching in a binary search tree (BST) involves finding a node with a specific value. The BST property
            makes this operation efficient because at each step, we can eliminate half of the remaining tree.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Search Algorithm</h2>
          <p>The search algorithm follows these steps:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Start at the root of the tree.</li>
            <li>If the tree is empty, the value is not found.</li>
            <li>If the current node's value equals the search value, the search is successful.</li>
            <li>If the search value is less than the current node's value, recursively search in the left subtree.</li>
            <li>
              If the search value is greater than the current node's value, recursively search in the right subtree.
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Implementation</h2>
          <p>Here's how we implement the search operation in TypeScript:</p>
          <CodeBlock
            code={`class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  // Recursive search
  search(value: number): TreeNode | null {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode | null, value: number): TreeNode | null {
    // If the tree is empty or we've reached the end of a branch
    if (node === null) {
      return null;
    }

    // If the value is found
    if (value === node.value) {
      return node;
    }

    // If the value is less than the current node's value, search in the left subtree
    if (value < node.value) {
      return this.searchNode(node.left, value);
    }
    
    // If the value is greater than the current node's value, search in the right subtree
    return this.searchNode(node.right, value);
  }

  // Iterative search (alternative implementation)
  searchIterative(value: number): TreeNode | null {
    let current = this.root;

    while (current !== null) {
      // If the value is found
      if (value === current.value) {
        return current;
      }

      // If the value is less than the current node's value, go to the left subtree
      if (value < current.value) {
        current = current.left;
      } 
      // If the value is greater than the current node's value, go to the right subtree
      else {
        current = current.right;
      }
    }

    // Value not found
    return null;
  }
}`}
            language="typescript"
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Example</h2>
          <p>Let's consider the following binary search tree:</p>
          <pre className="bg-black/20 p-4 rounded-md overflow-auto">
            {`        10
       /  \\
      5    15
     / \\  / \\
    3   7 12 18`}
          </pre>
          <p>Let's search for the value 7:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Start at the root (10).</li>
            <li>7 &lt; 10, so we move to the left child (5).</li>
            <li>7 &gt; 5, so we move to the right child (7).</li>
            <li>7 === 7, so we've found the value!</li>
          </ol>
          <p>Now, let's search for the value 9:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Start at the root (10).</li>
            <li>9 &lt; 10, so we move to the left child (5).</li>
            <li>9 &gt; 5, so we move to the right child (7).</li>
            <li>9 &gt; 7, but there's no right child of 7, so the value is not found.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Time and Space Complexity</h2>
          <p>
            <span className="font-semibold">Time Complexity:</span> O(h) where h is the height of the tree. In a
            balanced BST, this is O(log n), but in the worst case (a skewed tree), it can be O(n).
          </p>
          <p>
            <span className="font-semibold">Space Complexity:</span> O(h) for the recursive implementation due to the
            call stack, where h is the height of the tree. The iterative implementation has O(1) space complexity.
          </p>
        </section>

        <section className="mt-8">
          <InteractiveExercise
            question="Consider the following binary search tree. How many comparisons would it take to search for the value 14?"
            options={["1 comparison", "2 comparisons", "3 comparisons", "4 comparisons"]}
            correctAnswer={2}
            explanation="To search for 14 in the tree, we start at the root (10), compare 14 > 10, so we go right to 15. Then compare 14 < 15, so we go left to 12. Finally, compare 14 > 12, so we go right to 14. This takes 3 comparisons in total."
          />
        </section>
      </div>
    </BinaryTreeTutorialLayout>
  )
}
