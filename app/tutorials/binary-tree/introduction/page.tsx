import BinaryTreeTutorialLayout from "@/components/binary-tree-tutorial-layout"
import { CodeBlock } from "@/components/code-block"

export default function IntroductionToBinaryTrees() {
  return (
    <BinaryTreeTutorialLayout
      title="Introduction to Binary Trees"
      description="Learn what binary trees are and why they're useful"
      currentStep={1}
      totalSteps={6}
      nextHref="/tutorials/binary-tree/insert-operation"
    >
      <div className="space-y-6 text-white">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">What is a Binary Tree?</h2>
          <p>
            A binary tree is a hierarchical data structure in which each node has at most two children, referred to as
            the left child and the right child. Each node in a binary tree contains:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>A data element (or value)</li>
            <li>A reference to the left child</li>
            <li>A reference to the right child</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Types of Binary Trees</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Full Binary Tree</h3>
              <p>A binary tree in which every node has either 0 or 2 children.</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Complete Binary Tree</h3>
              <p>
                A binary tree in which all levels are completely filled except possibly the last level, which is filled
                from left to right.
              </p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Perfect Binary Tree</h3>
              <p>
                A binary tree in which all internal nodes have exactly two children and all leaf nodes are at the same
                level.
              </p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Binary Search Tree (BST)</h3>
              <p>
                A binary tree with the property that for each node, all elements in its left subtree are less than the
                node's value, and all elements in its right subtree are greater than the node's value.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Basic Structure of a Binary Tree Node</h2>
          <p>Here's how we define a basic binary tree node in TypeScript:</p>
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
}`}
            language="typescript"
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Why Use Binary Trees?</h2>
          <p>Binary trees are useful for many reasons:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <span className="font-semibold">Efficient Searching:</span> Binary search trees provide O(log n) search
              time on average.
            </li>
            <li>
              <span className="font-semibold">Hierarchical Structure:</span> They naturally represent hierarchical
              relationships between data.
            </li>
            <li>
              <span className="font-semibold">Efficient Insertions/Deletions:</span> BSTs allow for efficient insertions
              and deletions.
            </li>
            <li>
              <span className="font-semibold">Ordered Traversal:</span> In-order traversal of a BST gives elements in
              sorted order.
            </li>
            <li>
              <span className="font-semibold">Foundation for Advanced Data Structures:</span> They form the basis for
              more complex structures like AVL trees, Red-Black trees, and heaps.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Common Operations</h2>
          <p>The main operations performed on binary trees include:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Insertion</h3>
              <p>Adding a new node to the tree</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Deletion</h3>
              <p>Removing a node from the tree</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Searching</h3>
              <p>Finding a specific value in the tree</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Traversal</h3>
              <p>Visiting all nodes in the tree in a specific order (in-order, pre-order, post-order, level-order)</p>
            </div>
          </div>
        </section>

        <div className="bg-black/20 p-4 rounded-lg mt-6">
          <h3 className="text-xl font-semibold mb-2 text-purple-300">Next Steps</h3>
          <p>
            In the following sections, we'll explore each of these operations in detail, focusing on binary search trees
            (BSTs) as they are one of the most commonly used types of binary trees.
          </p>
        </div>
      </div>
    </BinaryTreeTutorialLayout>
  )
}
