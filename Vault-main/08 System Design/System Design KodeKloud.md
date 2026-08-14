### 1. Fundamentals & Core Architectural Concepts

- **System Design Definition**: The skill of selecting and positioning components (servers, databases, caches, load balancers, storage) to solve specific software requirements.
- **High-Level Design (HLD) vs. Low-Level Design (LLD)**:
    - **HLD**: Zoomed-out architectural blueprint showing major components and data flow (e.g., designing Instagram as a whole).
    - **LLD**: Zoomed-in implementation details of specific features, classes, and data structures (e.g., designing the like button or an in-memory cache).
    - _Interview Tip_: Always state your altitude upfront (e.g., "I'll start with high-level architecture and zoom into specific components as needed").
- **Requirements Gathering**:
    - **Functional Requirements**: Visible features users interact with directly (sign up, upload photo, follow user, scroll feed, like/comment).
    - **Non-Functional Requirements**: System quality attributes (speed/latency, durability, scalability, availability, cost).
    - **5 Core Clarifying Questions**:
        1. _Scale & Growth_: How many users currently exist, and how fast is traffic growing?
        2. _Traffic Pattern_: Is the app read-heavy or write-heavy? (e.g., photo apps are heavily read-dominated).
        3. _Durability_: What data can never be lost (photos) vs. what can be briefly inconsistent (like counts)?
        4. _Latency Tolerance_: How fast must operations feel? (e.g., feed load < 200ms; photo upload can take 2–3s).
        5. _Cost Constraints_: How do we meet performance targets for the least monthly expenditure?

---

### 2. Architecture & Scaling Strategies

- **Monolith vs. Microservices**:
    - **Monolith**: Single codebase deployed as one program unit. Features talk via function calls (no network latency). Simple to test, deploy, and debug; best for early-stage applications.
    - **Microservices**: Application split into independent programs (upload, feed, notifications) communicating over network calls. Allows independent component scaling (e.g., 10 feed servers vs. 2 upload servers) and team autonomy, but introduces network latency and debugging complexity.
    - _Strategy_: Start as a monolith and split out individual services only when scaling or organizational demands require it ("monolith + satellites").
- **Vertical vs. Horizontal Scaling**:
    - **Vertical Scaling (Scaling Up)**: Upgrading CPU/RAM/Disk on a single server. Simple with zero code changes, but hits a strict hardware ceiling and leaves a Single Point of Failure (SPOF).
    - **Horizontal Scaling (Scaling Out)**: Adding multiple cheaper servers in parallel. Provides an unlimited scaling ceiling and eliminates SPOF, but requires load balancing and centralized state management.
    - _Rule_: Scale vertically first for simplicity, then transition to horizontal scaling when hitting hardware or availability limits.

---

### 3. Traffic Distribution & Stateless Architecture

- **Load Balancing (Reverse Proxy)**:
    - A server running reverse-proxy software (Nginx, HAProxy, AWS ELB) that routes incoming client traffic across multiple app servers.
    - Performs active **health checks** to automatically redirect traffic away from crashed or overloaded servers.
    - _Algorithms_: Round-Robin (sequential rotation), Least Connections (routes to server with fewest pending requests), Weighted Distribution (allocates traffic by server capacity).
    - _High Availability_: Deployed in redundant clusters to prevent the load balancer itself from becoming a SPOF.
- **Stateless vs. Stateful App Servers**:
    - _Problem_: Storing user login sessions in local server memory causes users to get logged out when subsequent requests hit different app servers.
    - _Solution_: Keep app servers **stateless** by moving sessions and application state into a shared external store (e.g., Redis) accessible by all servers.
    - _Sticky Sessions_: Pinning users to a specific server is discouraged because server crashes cause session loss and create uneven traffic distribution.

---

### 4. Data Modeling & Database Selection

- **Data Modeling Process**: Identify **access patterns** (the questions users repeatedly ask) first $\rightarrow$ define data shapes and relations second $\rightarrow$ select database technology last.
- **SQL vs. NoSQL Selection**:
    - **SQL (PostgreSQL)**: Best for structured data with fixed schemas, complex relational joins (users, photos, follows, likes), and strict ACID transaction guarantees.
    - **NoSQL (MongoDB, DynamoDB)**: Best for unstructured or flexible data with high volume and minimal inter-relationships (user preferences, activity logs).
    - _Hybrid Architecture_: Real-world systems routinely combine both (SQL for relational data, NoSQL for non-relational preferences or analytics).
- **Database Indexing**:
    - Prevents full-table scans by creating a lookup structure on heavily queried columns (e.g., `posted_by`, `upload_time`) to jump directly to matching rows.
    - _Trade-off_: Speeds up read queries dramatically, but adds write overhead (updating the index on insertions) and uses extra disk space.

---

### 5. Caching & Data Consistency

- **In-Memory Caching (Redis)**:
    - A fast memory layer placed in front of the database to serve hot/frequently accessed data (trending posts, profile cards) in <1ms vs. 20–30ms database reads. Also used for shared session storage.
    - _Cache Hit_: Data found in cache and returned immediately.
    - _Cache Miss_: Data fetched from DB, stored in cache, and returned to client.
- **Sync & Invalidation Strategies**:
    - **TTL (Time To Live)**: Expiration timer set on cached entries. Simple ("lazy") approach suitable for feeds and profile data where brief lag is acceptable.
    - **Active Invalidation**: Explicitly deleting old cache entries immediately upon a database write. Essential for sensitive data (e.g., privacy settings).
    - **Cache Stampede**: Concurrent cache misses hitting the database simultaneously when a popular item's TTL expires. Mitigated by staggering TTLs or locking cache rebuilds.
    - **Eviction Policy**: Least Recently Used (LRU) removes the oldest unaccessed items when memory capacity is reached.

---

### 6. Replication, Consistency Models & Sharding

- **Database Replication (Read Scaling & Redundancy)**:
    - Configures 1 Primary DB (handles all writes) and multiple Replica DBs (stream data from Primary and handle read queries via a DB load balancer).
    - **Replication Lag & Eventual Consistency**: Replicas take milliseconds to sync; eventual consistency is acceptable for general feed browsing.
    - **Read-Your-Own-Writes**: Route a user's reads of their own recent posts directly to the Primary DB to ensure **Strong Consistency**.
    - **Failover**: Automatically promoting a replica to become the new primary if the primary DB fails.
    - _Replicas vs. Backups_: Replicas copy mistakes/deletions instantly; isolated database **snapshots/backups** are required for disaster recovery.
- **Database Sharding (Horizontal Partitioning)**:
    - Splitting a massive database horizontally across multiple database machines using a **Shard Key** (e.g., `user_id`) when data exceeds single-machine disk storage.
    - **Hot Shards**: Traffic overloads on single shards containing celebrity accounts. Solved by selecting well-scattered shard keys.
    - **Consistent Hashing**:The assignment rule does not depend directly on the total number of shards.When a new 5th shard is added, it only takes over a small range of user IDs from a single neighboring shar

![[Pasted image 20260802190841.png]]

