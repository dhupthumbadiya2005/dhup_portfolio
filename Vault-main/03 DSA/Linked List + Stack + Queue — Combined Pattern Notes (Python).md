These three are grouped because they're all **linear structures with restricted access**, and together they cover almost every "data structure mechanics" question asked at the 10-12 LPA level. Less about clever tricks, more about **getting the pointer/index manipulation right without bugs** — so drill these until they're muscle memory.

---

# PART 1: LINKED LIST

## When to think "Linked List"

Trigger words/situations:

- Problem literally gives you a `ListNode` structure
- "Reverse", "merge", "detect cycle", "middle of list", "remove nth from end"
- Anything about rearranging nodes without extra array space

**Node definition (memorize this, you'll write it every time):**

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

There are **4 sub-patterns**.

---

## SUB-PATTERN A: Reversal

**1.   (Easy — the most fundamental LL question, must be instant)**

```python
def reverseList(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev
```

**Key insight:** 3 pointers — `prev`, `curr`, `next_node`. Save next before breaking the link.

**2. Reverse Linked List II (Medium — reverse only a sub-portion, between position m and n)**

```python
def reverseBetween(head, left, right):
    dummy = ListNode(0, head)
    prev = dummy
    for _ in range(left - 1):
        prev = prev.next

    curr = prev.next
    for _ in range(right - left):
        next_node = curr.next
        curr.next = next_node.next
        next_node.next = prev.next
        prev.next = next_node
    return dummy.next
```

**Dummy node trick:** whenever the head itself might change, create a `dummy = ListNode(0, head)` so you never special-case "what if head changes."

**3. Reverse Nodes in k-Group (Hard but common at senior-ish level — good to know, lower priority for 10-12 LPA)** Same reversal block as (1), applied repeatedly in chunks of k with careful boundary linking.

---

## SUB-PATTERN B: Fast & Slow Pointers (Floyd's Technique)

**Recognize:** cycle detection, finding middle, finding a specific node from the end.

**1. Linked List Cycle (Easy — must be instant)**

```python
def hasCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```

**Key insight:** fast moves 2 steps, slow moves 1. If there's a cycle, they will eventually meet.

**2. Linked List Cycle II — Find the Start of the Cycle (Medium)**

```python
def detectCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            ptr = head
            while ptr != slow:
                ptr = ptr.next
                slow = slow.next
            return ptr
    return None
```

**Key insight (memorize, don't derive under pressure):** once slow/fast meet, move a third pointer from `head` and advance both by 1 step — they meet exactly at the cycle's start. This is a math fact from Floyd's algorithm, just remember it.

**3. Middle of the Linked List (Easy)**

```python
def middleNode(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```

**4. Remove Nth Node From End of List (Medium — very common)**

```python
def removeNthFromEnd(head, n):
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n):
        fast = fast.next
    while fast.next:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next
```

**Key insight:** move `fast` n steps ahead first, then move both together — gap of n keeps `slow` at the node just before the target.

---

## SUB-PATTERN C: Merge / Combine

**1. Merge Two Sorted Lists (Easy — must be instant)**

```python
def mergeTwoLists(l1, l2):
    dummy = ListNode()
    tail = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next
```

**2. Merge k Sorted Lists (Hard but common — use a heap)**   - not done

```python
import heapq

def mergeKLists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    dummy = ListNode()
    tail = dummy
    while heap:
        val, i, node = heapq.heappop(heap)
        tail.next = node
        tail = tail.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next
```

**Key insight:** push the index `i` alongside val to break ties (ListNode isn't directly comparable).

**3. Add Two Numbers (Medium — linked list represents a number, digit by digit)**

```python
def addTwoNumbers(l1, l2):
    dummy = ListNode()
    tail = dummy
    carry = 0
    while l1 or l2 or carry:
        v1 = l1.val if l1 else 0
        v2 = l2.val if l2 else 0
        total = v1 + v2 + carry
        carry = total // 10
        tail.next = ListNode(total % 10)
        tail = tail.next
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    return dummy.next
```

---

## SUB-PATTERN D: Structural Checks / Rearrangement

**1. Palindrome Linked List (Easy — combines middle-finding + reversal)**

```python
def isPalindrome(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    prev = None
    while slow:
        next_node = slow.next
        slow.next = prev
        prev = slow
        slow = next_node

    left, right = head, prev
    while right:
        if left.val != right.val:
            return False
        left = left.next
        right = right.next
    return True
```

**2. Reorder List (Medium — find middle + reverse second half + merge alternately)** Combines sub-patterns B, A, and C in one problem — good test of whether you've actually internalized the building blocks.

**3. Intersection of Two Linked Lists (Easy)**
https://leetcode.com/problems/intersection-of-two-linked-lists/
![[Pasted image 20260715225514.png]]

```python
def getIntersectionNode(headA, headB):
    a, b = headA, headB
    while a != b:
        a = a.next if a else headB
        b = b.next if b else headA
    return a
```

**Key insight:** switching heads when a pointer hits None equalizes the path length difference — they meet at intersection (or both hit None together).

---

## Linked List Quick Recall

| Sub-pattern | Trigger phrase                          | Core tool                            |
| ----------- | --------------------------------------- | ------------------------------------ |
| Reversal    | "reverse", "reverse between/in groups"  | prev/curr/next_node, 3-pointer swap  |
| Fast & Slow | "cycle", "middle", "nth from end"       | 2x speed pointer                     |
| Merge       | "merge sorted lists", "combine"         | dummy node + tail pointer            |
| Structural  | "palindrome", "reorder", "intersection" | combination of above building blocks |

**Always use a dummy node whenever head might change** — it eliminates edge-case bugs.

---

# PART 2: STACK

## When to think "Stack"

Trigger words/situations:

- Matching/nesting: brackets, tags
- "Next greater/smaller element" (to the right or left)
- Need to process in **reverse order of arrival** (LIFO)
- Undo operations, backtracking through history
- Expression evaluation (postfix, infix, calculator problems)

There are **3 sub-patterns**.

---

## SUB-PATTERN A: Matching / Validity

**1. Valid Parentheses (Easy — must be instant)** - Important

```python
def isValid(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack
```

**2. Min Stack (Medium — design a stack that tracks minimum in O(1))**

```python
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        min_val = val if not self.min_stack else min(val, self.min_stack[-1])
        self.min_stack.append(min_val)

    def pop(self):
        self.stack.pop()
        self.min_stack.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.min_stack[-1]
```

**Key insight:** maintain a **parallel stack** that always tracks the min-so-far at each level.

**3. Evaluate Reverse Polish Notation (Medium)**

```python
def evalRPN(tokens):
    stack = []
    ops = {'+', '-', '*', '/'}
    for token in tokens:
        if token in ops:
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            else:
                stack.append(int(a / b))   # truncate toward zero
        else:
            stack.append(int(token))
    return stack[0]
```

---

## SUB-PATTERN B: Monotonic Stack (Next Greater/Smaller Element)

**Recognize:** "next greater element", "daily temperatures", "trapping rain water" style problems — this is the **highest-yield stack sub-pattern** at this level.

**Template (next greater, to the right):**

```python
def next_greater_elements(arr):
    n = len(arr)
    result = [-1] * n
    stack = []   # stores indices, values decreasing bottom to top

    for i in range(n):
        while stack and arr[stack[-1]] < arr[i]:
            idx = stack.pop()
            result[idx] = arr[i]
        stack.append(i)

    return result
```

### Most asked problems

**1. Next Greater Element I (Easy)** — direct application of the template.

**2. Daily Temperatures (Medium — extremely common)**

```python
def dailyTemperatures(temperatures):
    n = len(temperatures)
    result = [0] * n
    stack = []   # indices, decreasing temps

    for i, t in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < t:
            idx = stack.pop()
            result[idx] = i - idx
        stack.append(i)

    return result
```

**3. Largest Rectangle in Histogram (Hard but very common — monotonic stack classic)**

Not Done

```python
def largestRectangleArea(heights):
    stack = []   # indices, increasing heights
    max_area = 0
    heights = heights + [0]   # sentinel to flush stack at the end

    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)

    return max_area
```

**4. Trapping Rain Water (Medium — monotonic stack version, alternative to two-pointer/prefix-sum versions you already know)**

```python
def trap(height):
    stack = []
    water = 0
    for i, h in enumerate(height):
        while stack and height[stack[-1]] < h:
            top = stack.pop()
            if not stack:
                break
            distance = i - stack[-1] - 1
            bounded_height = min(h, height[stack[-1]]) - height[top]
            water += distance * bounded_height
        stack.append(i)
    return water
```

---

## SUB-PATTERN C: Stack for Nested/Recursive Simulation

**Recognize:** need to simulate recursion iteratively, or process nested structures (parentheses with operations, decode strings).

**1. Decode String (Medium — e.g. "3[a2[c]]" → "accaccacc")**

https://leetcode.com/problems/decode-string/

Revise again 

```python
def decodeString(s):
    stack = []
    curr_str = ""
    curr_num = 0

    for ch in s:
        if ch.isdigit():
            curr_num = curr_num * 10 + int(ch)
        elif ch == '[':
            stack.append((curr_str, curr_num))
            curr_str = ""
            curr_num = 0
        elif ch == ']':
            prev_str, num = stack.pop()
            curr_str = prev_str + curr_str * num
        else:
            curr_str += ch

    return curr_str
```

**2. Basic Calculator II (Medium — infix expression with +,-,*,/)**

```python
def calculate(s):
    stack = []
    num = 0
    op = '+'
    s = s.replace(' ', '') + '+'

    for ch in s:
        if ch.isdigit():
            num = num * 10 + int(ch)
        else:
            if op == '+':
                stack.append(num)
            elif op == '-':
                stack.append(-num)
            elif op == '*':
                stack.append(stack.pop() * num)
            elif op == '/':
                stack.append(int(stack.pop() / num))
            op = ch
            num = 0

    return sum(stack)
```

---

## Stack Quick Recall

| Sub-pattern       | Trigger phrase                                    | Core tool                                    |
| ----------------- | ------------------------------------------------- | -------------------------------------------- |
| Matching/validity | brackets, "valid", min/max tracking               | simple LIFO stack                            |
| Monotonic stack   | "next greater/smaller", "daily temperatures"      | stack of indices, pop while condition breaks |
| Nested simulation | "decode string", "calculator", nested expressions | stack of (partial state) tuples              |

---

# PART 3: QUEUE

## When to think "Queue"

Trigger words/situations:

- Need **FIFO** processing (first in, first out)
- **BFS** on trees/graphs (queue is the core engine of BFS — this is the #1 reason you need queues)
- "Level order", "shortest path in unweighted graph"
- Sliding window maximum (deque)
- Design problems: recent counter, moving average

There are **2 sub-patterns** worth knowing well at this stage (a third — priority queue/heap — you'll cover separately as its own pattern).

---

## SUB-PATTERN A: Plain Queue (FIFO) — mostly powers BFS

**Python tool:** `collections.deque` (never use `list.pop(0)` — that's O(n), deque's `popleft()` is O(1)).
![[Pasted image 20260716205049.png]]

**Template (BFS skeleton — you'll use this constantly in the Trees/Graphs pattern coming up next):**

```python
from collections import deque

def bfs_template(start):
    queue = deque([start])
    visited = {start}
    while queue:
        node = queue.popleft()
        # process node
        for neighbor in get_neighbors(node):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

**1. Number of Recent Calls (Easy — simple queue design question)**

```python
from collections import deque

class RecentCounter(object):

    def __init__(self):
        # Initialize an empty queue to store timestamps
        self.queue = deque()

    def ping(self, t):
        # Step 1: Add the current timestamp to the back of the queue
        self.queue.append(t)
        
        # Step 2: Remove all timestamps that are older than t - 3000 from the front
        while self.queue and self.queue[0] < t - 3000:
            self.queue.popleft()
            
        # Step 3: The remaining items in the queue represent all valid pings in the window
        return len(self.queue)
```

**2. Implement Queue using Stacks (Easy — common "implement X using Y" design question)**

```python
class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def push(self, x):
        self.in_stack.append(x)

    def pop(self):
        self.peek()
        return self.out_stack.pop()

    def peek(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]

    def empty(self):
        return not self.in_stack and not self.out_stack
```

**Key insight:** two stacks, one for input one for output — reversing twice restores original order.

_(Note: BFS itself — level order traversal, number of islands, rotting oranges, etc. — is covered in depth in the upcoming Trees and Graphs pattern notes, since queue here is just the mechanism, not the main pattern being tested.)_

---

## SUB-PATTERN B: Monotonic Deque (Sliding Window Maximum/Minimum)

**Recognize:** you already saw this in Sliding Window notes — repeating it here because it's fundamentally a **queue** pattern (double-ended).

**1. Sliding Window Maximum (Hard but common)**

```python
from collections import deque

def maxSlidingWindow(nums, k):
    dq = deque()   # indices, values decreasing
    res = []
    for i, n in enumerate(nums):
        while dq and nums[dq[-1]] < n:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res
```

**2. Moving Average from Data Stream (Easy — design question)**

```python
from collections import deque

class MovingAverage(object):

    def __init__(self, size):
        """
        Initialize your data structure here.
        :type size: int
        """
        self.queue = deque()
        self.max_size = size
        self.window_sum = 0.0  # Track running sum as a float for division

    def next(self, val):
        """
        :type val: int
        :rtype: float
        """
        # 1. Add the new value to the queue and the running sum
        self.queue.append(val)
        self.window_sum += val
        
        # 2. If the window is full, evict the oldest element
        if len(self.queue) > self.max_size:
            oldest = self.queue.popleft()
            self.window_sum -= oldest
            
        # 3. Calculate and return the average
        return self.window_sum / len(self.queue)
```

---

## Queue Quick Recall

|Sub-pattern|Trigger phrase|Core tool|
|---|---|---|
|Plain FIFO queue|BFS, "level order", "shortest path unweighted", recent-window design|`deque`, `popleft()`|
|Monotonic deque|sliding window max/min|`deque` storing indices, pop from both ends|

---

## Combined One-Line Decision Rule

> Nodes connected by `.next` pointers, need reversal/cycle/merge → **Linked List** (pick sub-pattern by keyword: reverse/cycle/merge/structural). Need LIFO — matching, "next greater", nested expression → **Stack** (plain / monotonic / simulation). Need FIFO — BFS traversal, "shortest path," window max → **Queue** (deque / monotonic deque).

---

## Practice list (do in this order — ~24 problems total)

**Linked List (10):**

1. Reverse Linked List
2. Linked List Cycle
3. Middle of the Linked List
4. Merge Two Sorted Lists
5. Remove Nth Node From End of List
6. Palindrome Linked List
7. Linked List Cycle II
8. Reverse Linked List II
9. Add Two Numbers
10. Reorder List

**Stack (8):** 
11. Valid Parentheses 
12. Min Stack
13. Evaluate Reverse Polish Notation 
14. Next Greater Element I
15. Daily Temperatures
16. Decode String 
17. Largest Rectangle in Histogram 
18. Basic Calculator II

**Queue (6):**
19. Implement Queue using Stacks 
20. Number of Recent Calls 
21. Moving Average from Data Stream 
22. Sliding Window Maximum (revisit if already done in Sliding Window pattern) 
23. Design Circular Queue (Medium — good design-round practice) 
24. Merge k Sorted Lists (bonus — ties Linked List + Queue/Heap together)

**Rule of thumb before moving to the next pattern:** you should be able to write `reverseList`, `hasCycle`, `mergeTwoLists`, `isValid` (parentheses), and the monotonic stack template completely from memory, no hesitation — these five are asked so often they're basically guaranteed to appear in some form.