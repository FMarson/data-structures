import BinaryTreeTutorialLayout from "@/components/binary-tree-tutorial-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function DeleteOperation() {
  return (
    <BinaryTreeTutorialLayout
      title="Delete Operation in Binary Search Trees"
      description="Learn how to remove nodes from a binary search tree"
      currentStep={4}
      totalSteps={5}
      prevHref="/tutorials/binary-tree/search-operation"
      nextHref="/tutorials/binary-tree/traversal-operation"
    >
      <div className="space-y-6 text-white">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Understanding the Delete Operation</h2>
          <p>
            Deletion in a binary search tree (BST) is more complex than insertion or search because removing a node
            requires restructuring the tree to maintain the BST property. There are three cases to consider:
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Deleting a leaf node (a node with no children)</li>
            <li>Deleting a node with one child</li>
            <li>Deleting a node with two children</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Deletion Algorithm</h2>
          <p>The deletion algorithm follows these steps:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Search for the node to be deleted.</li>
            <li>If the node is not found, the deletion is complete (nothing to delete).</li>
            <li>
              If the node is found, handle one of the three cases:
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>
                  <span className="font-semibold">Case 1: Leaf Node</span> - Simply remove the node by setting its
                  parent's reference to null.
                </li>
                <li>
                  <span className="font-semibold">Case 2: Node with One Child</span> - Replace the node with its child.
                </li>
                <li>
                  <span className="font-semibold">Case 3: Node with Two Children</span> - Find the node's in-order
                  successor (the smallest value in its right subtree), replace the node's value with the successor's
                  value, and then delete the successor.
                </li>
              </ul>
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Implementation</h2>
          <p>Here's how we implement the delete operation in TypeScript:</p>
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

  delete(value: number): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(root: TreeNode | null, value: number): TreeNode | null {
    // Base case: if the tree is empty
    if (root === null) {
      return null;
    }

    // Recursively search for the node to delete
    if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      // Node found, now delete it

      // Case 1: Leaf node (no children)
      if (root.left === null && root.right === null) {
        return null;
      }

      // Case 2: Node with only one child
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }

      // Case 3: Node with two children
      // Find the inorder successor (smallest node in right subtree)
      root.value = this.findMinValue(root.right);

      // Delete the inorder successor
      root.right = this.deleteNode(root.right, root.value);
    }

    return root;
  }

  private findMinValue(node: TreeNode): number {
    let minValue = node.value;
    while (node.left !== null) {
      minValue = node.left.value;
      node = node.left;
    }
    return minValue;
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
          <p>Let's delete the node with value 5:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Find the node with value 5.</li>
            <li>This node has two children (3 and 7), so we need to find its in-order successor.</li>
            <li>The in-order successor is the smallest value in the right subtree of 5, which is 7.</li>
            <li>Replace the value of the node with 7.</li>
            <li>Delete the node with value 7 from the right subtree of the original node.</li>
          </ol>
          <p>The resulting tree would look like:</p>
          <pre className="bg-black/20 p-4 rounded-md overflow-auto">
            {`        10
       /  \\
      7    15
     /    / \\
    3    12 18`}
          </pre>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Time and Space Complexity</h2>
          <p>
            <span className="font-semibold">Time Complexity:</span> O(h) where h is the height of the tree. In a
            balanced BST, this is O(log n), but in the worst case (a skewed tree), it can be O(n).
          </p>
          <p>
            <span className="font-semibold">Space Complexity:</span> O(h) for the recursive call stack, where h is the
            height of the tree.
          </p>
        </section>

        <section className="mt-8">
          <InteractiveExercise
            question="What is the result of deleting the node with value 10 (the root) from the following binary search tree?"
            options={[
              `        12
       /  \\
      5    15
     / \\    \\
    3   7   18`,
              `        15
       /  \\
      5    18
     / \\  /
    3   7 12`,
              `        7
       /  \\
      5    15
     /    / \\
    3    12 18`,
              `        12
       /  \\
      5    18
     / \\  /
    3   7 15`,
            ]}
            correctAnswer={0}
            explanation="When deleting a node with two children (like the root 10), we replace it with its in-order successor, which is the smallest value in its right subtree. In this case, the successor is 12. After replacing 10 with 12, we delete the original 12 node from the right subtree, resulting in the tree shown in the first option."
          />
        </section>
      </div>
    </BinaryTreeTutorialLayout>
  )
}
