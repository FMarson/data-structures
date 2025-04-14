import BinaryTreeTutorialLayout from "@/components/binary-tree-tutorial-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function InsertOperation() {
  return (
    <BinaryTreeTutorialLayout
      title="Insert Operation in Binary Search Trees"
      description="Learn how to add new nodes to a binary search tree"
      currentStep={2}
      totalSteps={6}
      prevHref="/tutorials/binary-tree/introduction"
      nextHref="/tutorials/binary-tree/search-operation"
    >
      <div className="space-y-6 text-white">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Understanding the Insert Operation</h2>
          <p>
            Insertion in a binary search tree (BST) involves adding a new node while maintaining the BST property: for
            each node, all elements in its left subtree are less than the node's value, and all elements in its right
            subtree are greater than the node's value.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Insertion Algorithm</h2>
          <p>The insertion algorithm follows these steps:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>If the tree is empty, create a new node and make it the root.</li>
            <li>Otherwise, compare the new value with the current node's value.</li>
            <li>
              If the new value is less than the current node's value, recursively insert into the left subtree. If the
              left child is null, create a new node and make it the left child.
            </li>
            <li>
              If the new value is greater than the current node's value, recursively insert into the right subtree. If
              the right child is null, create a new node and make it the right child.
            </li>
            <li>If the value already exists in the tree, you can either update it or ignore the insertion.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Implementation</h2>
          <p>Here's how we implement the insert operation in TypeScript:</p>
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

  insert(value: number): void {
    const newNode = new TreeNode(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const insertNode = (node: TreeNode, newNode: TreeNode): void => {
      if (newNode.value < node.value) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else if (newNode.value > node.value) {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    };

    insertNode(this.root, newNode);
  }
}`}
            language="typescript"
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Example</h2>
          <p>Let's see how insertion works with an example:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Start with an empty tree and insert 10. This becomes the root.</li>
            <li>Insert 5. Since 5 &lt; 10, it becomes the left child of 10.</li>
            <li>Insert 15. Since 15 &gt; 10, it becomes the right child of 10.</li>
            <li>Insert 3. Since 3 &lt; 10 and 3 &lt; 5, it becomes the left child of 5.</li>
            <li>Insert 7. Since 7 &lt; 10 but 7 &gt; 5, it becomes the right child of 5.</li>
            <li>Insert 12. Since 12 &gt; 10 but 12 &lt; 15, it becomes the left child of 15.</li>
            <li>Insert 18. Since 18 &gt; 10 and 18 &gt; 15, it becomes the right child of 15.</li>
          </ol>
          <p>The resulting tree would look like:</p>
          <pre className="bg-black/20 p-4 rounded-md overflow-auto">
            {`        10
       /  \\
      5    15
     / \\  / \\
    3   7 12 18`}
          </pre>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Time and Space Complexity</h2>
          <div className="bg-black/20 p-4 rounded-lg">
            <p>
              <span className="font-semibold">Time Complexity:</span> O(h) where h is the height of the tree. In a
              balanced BST, this is O(log n), but in the worst case (a skewed tree), it can be O(n).
            </p>
            <p>
              <span className="font-semibold">Space Complexity:</span> O(h) for the recursive call stack, where h is the
              height of the tree.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <InteractiveExercise
            question="What would be the structure of a binary search tree after inserting the values 8, 3, 10, 1, 6, 14, 4, 7, 13 in that order?"
            options={[
              `    8
   / \\
  3   10
 / \\    \\
1   6    14
   / \\   /
  4   7 13`,
              `    8
   / \\
  3   10
 / \\    \\
1   6    14
     \\   /
      7 13`,
              `    8
   / \\
  3   10
 / \\    \\
1   6    14
   /     /
  4     13`,
              `    8
   / \\
  3   10
 / \\    \\
1   6    14
   / \\   
  4   7  `,
            ]}
            correctAnswer={0}
            explanation="The correct tree structure shows the result of inserting the values in the given order. The value 8 becomes the root, 3 and 10 become its left and right children respectively. Then 1 becomes the left child of 3, 6 becomes the right child of 3, and so on, following the BST property where values less than a node go to its left and values greater go to its right."
          />
        </section>

        <div className="bg-black/20 p-4 rounded-lg mt-6">
          <h3 className="text-xl font-semibold mb-2 text-purple-300">Next Steps</h3>
          <p>
            Now that you understand how to insert nodes into a binary search tree, let's move on to the search
            operation, which allows us to find specific values within the tree structure.
          </p>
        </div>
      </div>
    </BinaryTreeTutorialLayout>
  )
}
