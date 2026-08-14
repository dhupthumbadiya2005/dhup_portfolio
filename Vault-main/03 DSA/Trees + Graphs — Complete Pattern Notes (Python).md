# PART 1: TREES

## Basic Theory (quick refresher)

**Node definition:**

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

- **Binary Tree:** each node has at most 2 children.
- **BST (Binary Search Tree):** left subtree < node < right subtree, for every node. This property is what makes search/insert O(log n) on balanced trees.
- **Height/Depth of tree:** number of edges (or nodes, depending on definition) on longest path from root to leaf.
- **Balanced tree:** height difference between left and right subtree of any node ≤ 1.
- **Traversal types:**
    - **Preorder:** root → left → right
    - **Inorder:** left → root → right (gives **sorted order** for a BST — important fact)
    - **Postorder:** left → right → root (used when children must be processed before parent, e.g. deletion, height calculation)
    - **Level order (BFS):** level by level, using a queue

**When to think "Tree":** problem gives a `TreeNode` structure, or talks about "ancestor," "depth," "path from root to leaf," "balanced," "subtree."

---

## SUB-PATTERN A: Traversals (must be automatic)

**1. Recursive traversals (write all 3 from memory)**

```python
def preorder(root):
    if not root:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)

def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

def postorder(root):
    if not root:
        return []
    return postorder(root.left) + postorder(root.right) + [root.val]
```

**2. Level Order Traversal / BFS (Medium — extremely common, this IS the queue pattern from before, applied to trees)**

```python
from collections import deque

def levelOrder(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result
```

**Key insight:** the `for _ in range(len(queue))` trick processes exactly one level at a time — this is the template for almost all "level by level" tree/graph problems.

**3. Iterative Inorder Traversal (Medium — common "do it without recursion" ask)**

```python
def inorderTraversal(root):
    result = []
    stack = []
    curr = root
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        result.append(curr.val)
        curr = curr.right
    return result
```

---

## SUB-PATTERN B: Height / Depth / Diameter (Bottom-Up Recursion)

**Recognize:** need info from children before deciding something at the parent — classic postorder-style recursion.

**1. Maximum Depth of Binary Tree (Easy — must be instant)**

```python
def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))
```

**2. Balanced Binary Tree (Easy)**

```python
def isBalanced(root):
    def height(node):
        if not node:
            return 0
        left = height(node.left)
        if left == -1:
            return -1
        right = height(node.right)
        if right == -1:
            return -1
        if abs(left - right) > 1:
            return -1
        return 1 + max(left, right)

    return height(root) != -1
```

**Key insight:** use -1 as a "signal" for imbalance found deeper in the tree, so you don't recompute height repeatedly (avoids O(n²)).

**3. Diameter of Binary Tree (Medium — very common)**

```python
def diameterOfBinaryTree(root):
    diameter = 0

    def height(node):
        nonlocal diameter
        if not node:
            return 0
        left = height(node.left)
        right = height(node.right)
        diameter = max(diameter, left + right)
        return 1 + max(left, right)

    height(root)
    return diameter
```

**Key insight:** diameter through any node = `left height + right height`. Track the max of this while computing height anyway — one pass, no extra work.

**4. Same Tree (Easy)**

```python
def isSameTree(p, q):
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)
```

**5. Symmetric Tree (Easy)**

```python
def isSymmetric(root):
    def mirror(t1, t2):
        if not t1 and not t2:
            return True
        if not t1 or not t2 or t1.val != t2.val:
            return False
        return mirror(t1.left, t2.right) and mirror(t1.right, t2.left)

    return mirror(root, root)
```

---

## SUB-PATTERN C: Path Problems

**Recognize:** "path from root to leaf," "path sum," "any path" — usually DFS with a running value passed down.

**1. Path Sum (Easy)**

```python
def hasPathSum(root, targetSum):
    if not root:
        return False
    if not root.left and not root.right:
        return targetSum == root.val
    remaining = targetSum - root.val
    return hasPathSum(root.left, remaining) or hasPathSum(root.right, remaining)
```

**2. Binary Tree Maximum Path Sum (Hard but common — path can go through any node, not just root-to-leaf)**

```python
def maxPathSum(root):
    best = float('-inf')

    def gain(node):
        nonlocal best
        if not node:
            return 0
        left_gain = max(gain(node.left), 0)
        right_gain = max(gain(node.right), 0)
        best = max(best, node.val + left_gain + right_gain)
        return node.val + max(left_gain, right_gain)

    gain(root)
    return best
```

**3. Lowest Common Ancestor of a Binary Tree (Medium — very common)**

```python
def lowestCommonAncestor(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left and right:
        return root
    return left or right
```

**Key insight:** if both left and right recursive calls return non-null, current node is the LCA. Otherwise bubble up whichever side found something.

**4. Lowest Common Ancestor of a BST (Easy — simpler version, exploit BST property)**

```python
def lowestCommonAncestorBST(root, p, q):
    curr = root
    while curr:
        if p.val < curr.val and q.val < curr.val:
            curr = curr.left
        elif p.val > curr.val and q.val > curr.val:
            curr = curr.right
        else:
            return curr
    return None
```

---

## SUB-PATTERN D: BST-Specific

**1. Validate Binary Search Tree (Medium — very common)**

```python
def isValidBST(root):
    def validate(node, low, high):
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)

    return validate(root, float('-inf'), float('inf'))
```

**Key insight:** pass down a valid range (low, high) — don't just compare node to its immediate children, that's a common bug.

**2. Kth Smallest Element in a BST (Medium)**

```python
def kthSmallest(root, k):
    stack = []
    curr = root
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        k -= 1
        if k == 0:
            return curr.val
        curr = curr.right
```

**Key insight:** inorder traversal of a BST gives sorted order — so the kth element in inorder traversal is the answer. Iterative version stops early instead of building the whole list.

**3. Convert Sorted Array to Binary Search Tree (Easy)**

```python
def sortedArrayToBST(nums):
    if not nums:
        return None
    mid = len(nums) // 2
    root = TreeNode(nums[mid])
    root.left = sortedArrayToBST(nums[:mid])
    root.right = sortedArrayToBST(nums[mid + 1:])
    return root
```

---

## Trees Quick Recall

|Sub-pattern|Trigger phrase|Core tool|
|---|---|---|
|Traversal|"print/return traversal", "level order"|recursion (pre/in/post) or queue (BFS)|
|Height/Diameter|"depth", "balanced", "diameter"|bottom-up (postorder) recursion|
|Path problems|"path sum", "path from root to leaf", "LCA"|DFS passing running value down / bubbling result up|
|BST-specific|"validate BST", "kth smallest"|exploit sorted-order property via inorder or range-passing|

---

# PART 2: GRAPHS

## Basic Theory (quick refresher)

- **Representation:** most interview problems use **adjacency list** (dict of lists) or an implicit **grid** (2D array where adjacency = up/down/left/right neighbors).
- **Directed vs Undirected:** matters for cycle detection and traversal logic.
- **BFS:** explores level by level using a queue — gives **shortest path in unweighted graphs**.
- **DFS:** explores as deep as possible before backtracking — used for connectivity, cycle detection, topological sort.
- **Visited set:** always needed to avoid infinite loops / reprocessing.

**When to think "Graph":** grid problems (matrix traversal), explicit graph/adjacency list given, "connected components," "shortest path," "can you reach X from Y."

At the 10-12 LPA level, **BFS and DFS cover the vast majority of graph questions asked.** Dijkstra, Union-Find, MST are lower priority — skip unless you have spare time.

---

## SUB-PATTERN A: Grid Traversal (BFS/DFS on Matrix)

**Recognize:** 2D grid, "number of islands," "flood fill," connected regions of same value.

**Template (DFS on grid):**

```python
def dfs_grid(grid, r, c, visited):
    rows, cols = len(grid), len(grid[0])
    if r < 0 or r >= rows or c < 0 or c >= cols or (r, c) in visited or grid[r][c] == 0:
        return
    visited.add((r, c))
    for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
        dfs_grid(grid, r + dr, c + dc, visited)
```

**1. Number of Islands (Medium — must be instant, one of the most asked graph questions overall)**

```python
def numIslands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    visited = set()
    count = 0

    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols or
                (r, c) in visited or grid[r][c] == '0'):
            return
        visited.add((r, c))
        for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            dfs(r + dr, c + dc)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1' and (r, c) not in visited:
                count += 1
                dfs(r, c)
    return count
```

**2. Flood Fill (Easy)** — same DFS grid template, replace matching color.

**3. Rotting Oranges (Medium — very common, multi-source BFS)**

```python
from collections import deque

def orangesRotting(grid):
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c, 0))
            elif grid[r][c] == 1:
                fresh += 1

    minutes = 0
    while queue:
        r, c, time = queue.popleft()
        minutes = max(minutes, time)
        for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                queue.append((nr, nc, time + 1))

    return minutes if fresh == 0 else -1
```

**Key insight:** start BFS from **all rotten oranges at once** (multi-source BFS) — push them all into the queue before starting, instead of running BFS separately from each.

**4. Max Area of Island (Medium)** — same as Number of Islands, but DFS returns area count instead of just incrementing a counter.

---

## SUB-PATTERN B: Graph Traversal (Adjacency List) — Connectivity & Cycles

**1. Find if Path Exists in Graph (Easy — simple BFS/DFS on adjacency list)**

```python
from collections import deque, defaultdict

def validPath(n, edges, source, destination):
    graph = defaultdict(list)
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)

    visited = {source}
    queue = deque([source])
    while queue:
        node = queue.popleft()
        if node == destination:
            return True
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return False
```

**2. Number of Connected Components (Medium — very common)**

```python
def countComponents(n, edges):
    graph = defaultdict(list)
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)

    visited = set()
    count = 0

    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)

    for node in range(n):
        if node not in visited:
            count += 1
            dfs(node)
    return count
```

**3. Course Schedule (Medium — cycle detection in directed graph, VERY common)**

```python
def canFinish(numCourses, prerequisites):
    graph = defaultdict(list)
    for course, prereq in prerequisites:
        graph[course].append(prereq)

    state = [0] * numCourses   # 0 = unvisited, 1 = visiting, 2 = done

    def has_cycle(node):
        if state[node] == 1:
            return True    # back edge found -> cycle
        if state[node] == 2:
            return False   # already confirmed safe

        state[node] = 1
        for neighbor in graph[node]:
            if has_cycle(neighbor):
                return True
        state[node] = 2
        return False

    for course in range(numCourses):
        if has_cycle(course):
            return False
    return True
```

**Key insight:** 3-state DFS (unvisited/visiting/done) is the standard cycle-detection trick for **directed** graphs. "Visiting" means currently on the recursion stack — hitting a "visiting" node again means a cycle (back edge).

**4. Clone Graph (Medium)**

```python
def cloneGraph(node):
    if not node:
        return None
    visited = {}

    def dfs(n):
        if n in visited:
            return visited[n]
        copy = Node(n.val)
        visited[n] = copy
        for neighbor in n.neighbors:
            copy.neighbors.append(dfs(neighbor))
        return copy

    return dfs(node)
```

---

## Trees + Graphs Quick Recall

|Sub-pattern|Trigger phrase|Core tool|
|---|---|---|
|Grid traversal|"islands," "flood fill," "rotting oranges"|DFS/BFS with (r,c) visited set, 4-directional check|
|Adjacency list traversal|"connected components," "path exists," "course schedule"|BFS/DFS with visited set (or 3-state for cycle detection)|

**One-line decision rule:**

> Is it a tree (has left/right children)? → recursion is usually cleanest (pre/in/post-order style depending on what info you need). Is it a grid or adjacency list? → BFS for shortest path / level-by-level, DFS for connectivity / cycle detection / exploring fully. Directed graph + "can you complete all tasks" / cycle-ish wording → 3-state DFS (course schedule pattern).

---

## Practice list (do in this order — ~20 problems total)

**Trees (12):**

1. Maximum Depth of Binary Tree
2. Same Tree
3. Symmetric Tree
4. Level Order Traversal
5. Path Sum
6. Balanced Binary Tree
7. Diameter of Binary Tree
8. Lowest Common Ancestor of a BST
9. Lowest Common Ancestor of a Binary Tree
10. Validate Binary Search Tree
11. Kth Smallest Element in a BST
12. Binary Tree Maximum Path Sum (bonus, if time allows)

**Graphs (8):** 13. Number of Islands 14. Flood Fill 15. Max Area of Island 16. Rotting Oranges 17. Find if Path Exists in Graph 18. Number of Connected Components in an Undirected Graph 19. Course Schedule 20. Clone Graph

**Skip for now (low ROI at 10-12 LPA):** Dijkstra's shortest path, Union-Find (unless a specific problem demands it), Minimum Spanning Tree, Topological Sort beyond Course Schedule's basic version, Segment Trees/Tries.

**Rule of thumb before moving on:** you should be able to write `numIslands` (grid DFS) and `levelOrder` (tree BFS) completely from memory in under 3 minutes each — these two templates, slightly modified, solve the majority of tree/graph questions you'll see.
