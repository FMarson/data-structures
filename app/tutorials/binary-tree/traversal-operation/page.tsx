import BinaryTreeTutorialLayout from "@/components/binary-tree-tutorial-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function TraversalOperation() {
  return (
    <BinaryTreeTutorialLayout
      title="Traversal Operations in Binary Trees"
      description="Learn different ways to visit all nodes in a binary tree"
      currentStep={5}
      totalSteps={5}
      prevHref="/tutorials/binary-tree/delete-operation"
    >
      <div className="space-y-6 text-white">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Understanding Tree Traversals</h2>
          <p>
            Tree traversal is the process of visiting each node in a tree exactly once. There are several ways to
            traverse a binary tree, each with different applications:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <span className="font-semibold">In-order Traversal:</span> Visit left subtree, then root, then right
              subtree (LNR)
            </li>
            <li>
              <span className="font-semibold">Pre-order Traversal:</span> Visit root, then left subtree, then right
              subtree (NLR)
            </li>
            <li>
              <span className="font-semibold">Post-order Traversal:</span> Visit left subtree, then right subtree, then
              root (LRN)
            </li>
            <li>
              <span className="font-semibold">Level-order Traversal:</span> Visit nodes level by level, from left to
              right
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">In-order Traversal</h2>
          <p>
            In-order traversal visits the left subtree, then the root, then the right subtree. For a binary search tree,
            this produces nodes in ascending order.
          </p>
          <CodeBlock
            code={`inOrderTraversal(node: TreeNode | null): number[] {
  const result: number[] = [];
  
  const traverse = (node: TreeNode | null) => {
    if (node !== null) {
      // First, visit left subtree
      traverse(node.left);
      
      // Then, visit the node itself
      result.push(node.value);
      
      // Finally, visit right subtree
      traverse(node.right);
    }
  };
  
  traverse(node);
  return result;
}`}
            language="typescript"
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Pre-order Traversal</h2>
          <p>
            Pre-order traversal visits the root, then the left subtree, then the right subtree. This is useful for
            creating a copy of the tree or for getting a prefix expression of an expression tree.
          </p>
          <CodeBlock
            code={`preOrderTraversal(node: TreeNode | null): number[] {
  const result: number[] = [];
  
  const traverse = (node: TreeNode | null) => {
    if (node !== null) {
      // First, visit the node itself
      result.push(node.value);
      
      // Then, visit left subtree
      traverse(node.left);
      
      // Finally, visit right subtree
      traverse(node.right);
    }
  };
  
  traverse(node);
  return result;
}`}
            language="typescript"
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Post-order Traversal</h2>
          <p>
            Post-order traversal visits the left subtree, then the right subtree, then the root. This is useful for
            deleting a tree or for getting a postfix expression of an expression tree.
          </p>
          <CodeBlock
            code={`postOrderTraversal(node: TreeNode | null): number[] {
  const result: number[] = [];
  
  const traverse = (node: TreeNode | null) => {
    if (node !== null) {
      // First, visit left subtree
      traverse(node.left);
      
      // Then, visit right subtree
      traverse(node.right);
      
      // Finally, visit the node itself
      result.push(node.value);
    }
  };
  
  traverse(node);
  return result;
}`}
            language="typescript"
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Level-order Traversal</h2>
          <p>
            Level-order traversal visits nodes level by level, from left to right. This is also known as breadth-first
            search (BFS) and is implemented using a queue.
          </p>
          <CodeBlock
            code={`levelOrderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  
  if (root === null) {
    return result;
  }
  
  // Create a queue and enqueue the root
  const queue: TreeNode[] = [root];
  
  while (queue.length > 0) {
    // Dequeue a node
    const node = queue.shift()!;
    
    // Process the node
    result.push(node.value);
    
    // Enqueue the left child if it exists
    if (node.left !== null) {
      queue.push(node.left);
    }
    
    // Enqueue the right child if it exists
    if (node.right !== null) {
      queue.push(node.right);
    }
  }
  
  return result;
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
          <p>The different traversals would produce:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <span className="font-semibold">In-order:</span> [3, 5, 7, 10, 12, 15, 18] (sorted order for a BST)
            </li>
            <li>
              <span className="font-semibold">Pre-order:</span> [10, 5, 3, 7, 15, 12, 18]
            </li>
            <li>
              <span className="font-semibold">Post-order:</span> [3, 7, 5, 12, 18, 15, 10]
            </li>
            <li>
              <span className="font-semibold">Level-order:</span> [10, 5, 15, 3, 7, 12, 18]
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Applications of Tree Traversals</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <span className="font-semibold">In-order:</span> Used to get elements of a BST in sorted order.
            </li>
            <li>
              <span className="font-semibold">Pre-order:</span> Used to create a copy of the tree or to get a prefix
              expression of an expression tree.
            </li>
            <li>
              <span className="font-semibold">Post-order:</span> Used to delete a tree or to get a postfix expression of
              an expression tree.
            </li>
            <li>
              <span className="font-semibold">Level-order:</span> Used in level-order applications like printing a tree
              level by level.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Time and Space Complexity</h2>
          <p>
            <span className="font-semibold">Time Complexity:</span> O(n) for all traversals, where n is the number of
            nodes in the tree, as each node is visited exactly once.
          </p>
          <p>
            <span className="font-semibold">Space Complexity:</span> O(h) for recursive in-order, pre-order, and
            post-order traversals due to the call stack, where h is the height of the tree. For level-order traversal,
            the space complexity is O(w), where w is the maximum width of the tree.
          </p>
        </section>

        <section className="mt-8">
          <InteractiveExercise
            question="Given the following binary tree, what is the result of an in-order traversal?"
            options={[
              "[4, 2, 5, 1, 6, 3, 7]",
              "[1, 2, 4, 5, 3, 6, 7]",
              "[4, 5, 2, 6, 7, 3, 1]",
              "[1, 2, 3, 4, 5, 6, 7]",
            ]}
            correctAnswer={0}
            explanation="In an in-order traversal, we visit the left subtree, then the root, then the right subtree (LNR). Starting from the root (1), we first visit its left subtree (2), which means we visit 2's left child (4), then 2 itself, then 2's right child (5). Then we visit the root (1), followed by its right subtree (3), which means we visit 3's left child (6), then 3 itself, then 3's right child (7). This gives us the sequence [4, 2, 5, 1, 6, 3, 7]."
          />
        </section>
      </div>
    </BinaryTreeTutorialLayout>
  )
}
