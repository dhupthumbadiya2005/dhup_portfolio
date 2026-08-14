Here's the same content formatted specifically for Obsidian with proper table formatting and Obsidian-compatible syntax:

# 1. DOCKER

### Core definitions
- **Docker** — packages an app with all its dependencies into a container so it runs identically everywhere. Solves "works on my machine."
- **Image** — read-only blueprint/template. **Container** — a running instance of an image.
- **Dockerfile** — text file with instructions to build an image.
- **Docker Hub** — public registry to store and share images.
- **Docker Compose** — run multiple containers together (app + DB) from one YAML file.
- **Volume** — persistent storage outside the container; data survives container deletion.

### Container vs VM (asked almost every time)

| Feature | Container | Virtual Machine |
|---------|-----------|-----------------|
| Virtualizes | OS level (shares host kernel) | Hardware level |
| Contains | App + dependencies | Full guest OS |
| Size | MBs | GBs |
| Startup | Seconds | Minutes |
| Isolation | Weaker | Stronger |

### Dockerfile instructions

| Instruction | Purpose |
|-------------|---------|
| `FROM` | Base image |
| `WORKDIR` | Set working directory |
| `COPY` | Copy files into image |
| `RUN` | Execute at **build** time |
| `EXPOSE` | Document the port |
| `CMD` | Default command at **run** time |

**Layer caching:** each instruction creates a layer. Docker reuses cached layers until something changes. So `COPY package.json` + install goes **above** `COPY . .` — otherwise every code change reinstalls all dependencies.

### Key commands
```bash
docker build -t myapp .
docker run -d -p 8080:3000 myapp
docker ps -a
docker logs <id>
docker exec -it <id> bash
docker images
docker compose up -d
docker compose down
```

**Port mapping** `-p 8080:3000` → host port 8080 forwards to container port 3000.

### Interview Q&A
- **What is Docker / why use it?** → Consistent environments across dev/test/prod, lightweight, fast startup, easy scaling.
- **Container vs VM?** → See table. Key line: container shares the host kernel, VM runs its own OS.
- **Image vs container?** → Blueprint vs running instance. One image → many containers.
- **CMD vs RUN?** → RUN executes during build (baked into image); CMD executes when container starts.
- **How do containers communicate?** → Docker networks. In Compose, by **service name**, not `localhost`.
- **Why does data disappear on container restart?** → Container filesystem is ephemeral. Use volumes.
- **How to reduce image size?** → Alpine/slim base image, multi-stage build, `.dockerignore`, fewer layers.
- **Container exits immediately — why?** → No long-running foreground process, or app crashed. Check `docker logs`.

---

# 2. AWS

### Global infrastructure
- **Region** — geographic area (e.g. ap-south-1 Mumbai)
- **Availability Zone (AZ)** — isolated datacenter inside a region. Multiple AZs = fault tolerance.
- **Shared Responsibility Model** — AWS secures *the cloud* (hardware, infra); you secure *in the cloud* (your data, access, config).

### IAM (Identity & Access Management)

| Term | Meaning |
|------|---------|
| **User** | Permanent identity, has credentials |
| **Group** | Collection of users, share permissions |
| **Role** | Temporary permissions **assumed by a service** (e.g. EC2) — no stored keys |
| **Policy** | JSON document defining allowed/denied actions |

- **Least privilege** — grant only permissions actually needed.
- **Role > access keys** — roles rotate credentials automatically, nothing to leak in your code.

### EC2 (Elastic Compute Cloud) — virtual servers
- **AMI** — Amazon Machine Image, the OS template
- **Instance type** — t2.micro, t3.micro (free tier = 750 hrs/month)
- **Key pair** — SSH login (.pem file)
- **Security Group** — virtual firewall, **stateful**, allow-rules only. Controls inbound/outbound traffic.
- **Elastic IP** — static public IP (normal public IP changes on stop/start)
- **EBS** — the virtual hard disk attached to your instance

**Pricing models:** On-Demand (pay per hour) · Reserved (1–3 yr commitment, cheaper) · Spot (spare capacity, up to 90% off, can be terminated)

### S3 (Simple Storage Service) — object storage
- Stores **objects** (files) in **buckets**. Bucket names are globally unique.
- Not a filesystem — you can't mount it and edit files in place.
- **Storage classes:** Standard (frequent) → Standard-IA (infrequent) → Glacier (archive, cheap, slow retrieval)
- Features: versioning, lifecycle rules, static website hosting, presigned URLs
- **99.999999999% (11 nines) durability**

**S3 vs EBS:** S3 = user uploads, images, backups, static files (accessed over HTTP). EBS = the disk attached to one EC2 instance.

### RDS (Relational Database Service) — managed SQL database
- Supports MySQL, PostgreSQL, MariaDB, Oracle, SQL Server
- AWS handles: backups, patching, replication, failover
- **Multi-AZ** → standby copy in another AZ for **high availability** (automatic failover). Not used for reads.
- **Read Replica** → extra copies to serve **read traffic** (scaling). Can be in other regions.
- **DynamoDB** = AWS's NoSQL option (key-value, serverless)

### Worth recognizing (don't need depth)

| Service | One line |
|---------|----------|
| **Lambda** | Run code without servers, pay per execution |
| **ELB** | Elastic Load Balancer — distributes traffic |
| **Auto Scaling Group** | Adds/removes EC2 instances based on load |
| **VPC** | Your private network in AWS |
| **CloudWatch** | Monitoring, metrics, logs, alarms |
| **CloudFront** | AWS's CDN |
| **Route 53** | DNS service |

### Interview Q&A
- **Which AWS services have you used?** → Name your four + what you did with each.
- **EC2 vs S3?** → Compute (virtual server) vs object storage (files).
- **IAM Role vs User?** → Role is temporary and assumed by a service; user is a permanent identity with credentials.
- **What is a security group?** → Virtual firewall on the instance, controls inbound/outbound, stateful (return traffic auto-allowed).
- **Why RDS over a database on EC2?** → Managed backups, patching, failover — less operational work.
- **Multi-AZ vs Read Replica?** → Availability vs read scaling.
- **Region vs AZ?** → Geographic area vs isolated datacenter within it.
- **App deployed on EC2 but not loading — what do you check?** → (1) Security group inbound rule, (2) is the app actually running, (3) correct port, (4) using public IP not private.
- **IaaS vs PaaS vs SaaS?** → EC2 / Elastic Beanstalk / Gmail.

---

# 3. CI/CD

### Definitions
- **CI (Continuous Integration)** — every push automatically builds and runs tests.
- **CD (Continuous Delivery)** — build is always ready to deploy; deploy is a manual click.
- **CD (Continuous Deployment)** — deploys to production automatically, no manual step.
- **Pipeline** — the automated sequence: checkout → install → test → build → push → deploy.
- **Artifact** — the output of the build (e.g. Docker image, JAR).

**Why it matters:** catches bugs early, removes manual error-prone deploys, faster and more frequent releases, consistent process.

### GitHub Actions
- Workflow file: `.github/workflows/deploy.yml`
- Structure: **`on`** (trigger) → **`jobs`** → **`steps`**
- **Runner** — the machine executing the job (GitHub-hosted or self-hosted)
- **GitHub Secrets** — encrypted store for credentials, referenced as `${{ secrets.NAME }}`
- Common actions: `actions/checkout`, `actions/setup-node`

```yaml
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm test
```

### Jenkins
- **Self-hosted**, open source, automation server
- **Jenkinsfile** — pipeline as code, defines `stages`
- **Plugins** — huge ecosystem (1800+); how Jenkins integrates with everything
- **Agents/Nodes** — machines that run jobs; master/controller schedules them
- Job types: Freestyle (UI-configured) vs Pipeline (code)

### GitHub Actions vs Jenkins

| Feature | GitHub Actions | Jenkins |
|---------|---------------|---------|
| Hosting | Cloud (GitHub-managed) | Self-hosted |
| Setup | Near zero | You install & maintain |
| Cost | Free minutes, then pay | Free software, you pay for servers |
| Flexibility | Good | Very high (plugins) |
| Best for | GitHub projects, small teams | Enterprise, complex/custom pipelines |

### Interview Q&A
- **What is CI/CD?** → Automating build+test on every commit, and automating deployment of the result.
- **Describe your pipeline.** → Walk through your YAML stage by stage.
- **Continuous Delivery vs Deployment?** → Manual approval before prod vs fully automatic.
- **How do you store secrets in a pipeline?** → Secret manager (GitHub Secrets), injected at runtime, never committed.
- **Tests pass locally, fail in CI — why?** → Different environment/OS, missing env variables, missing dependency, test order/timing, no database in CI.
- **Actions vs Jenkins?** → See table.
- **What's a build artifact?** → The packaged output that gets promoted through environments — build once, deploy the same artifact everywhere.

---

# 4. SYSTEM DESIGN — SCALING

### Scaling types

| Feature | Vertical (scale up) | Horizontal (scale out) |
|---------|-------------------|-----------------------|
| Method | Bigger machine (more CPU/RAM) | More machines |
| Limit | Hardware ceiling | Practically unlimited |
| Downtime | Usually needs restart | No |
| SPOF | Yes | No |
| Complexity | Simple | Needs load balancer, stateless app |

### Components and the problem each solves

| Component | Problem solved |
|-----------|----------------|
| **Load Balancer** | One server can't take all traffic / is a single point of failure |
| **Caching (Redis)** | Same expensive query repeated → slow DB |
| **CDN** | Users far from server get slow static content |
| **Read Replica** | Read traffic overwhelming the database |
| **Sharding** | Data too large for one database |
| **Message Queue (SQS/Kafka)** | Slow tasks blocking user requests |
| **Stateless servers** | Can't add servers if each holds session data |

### Key concepts
- **Stateless** — server stores no session data locally; any server can handle any request. Sessions go to Redis or a JWT token. **Required for horizontal scaling.**
- **Load balancer algorithms** — Round Robin, Least Connections, IP Hash.
- **Health checks** — LB stops sending traffic to unhealthy servers.
- **Cache hit vs miss** — found in cache vs had to fetch from DB.
- **Cache invalidation** — keeping cache in sync with DB; famously hard. Strategies: TTL, write-through, delete-on-write.
- **Latency** = time for one request. **Throughput** = requests handled per second.
- **SPOF (Single Point of Failure)** — any component whose failure takes down the system.
- **CAP Theorem** — under a network **P**artition, choose **C**onsistency or **A**vailability.
- **SQL vs NoSQL** — structured + relations + ACID vs flexible schema + horizontal scale.

### Scaling roadmap (the standard answer)
1. Single server
2. Separate the database onto its own machine
3. Add a **load balancer** + multiple **stateless** app servers
4. Add **caching** (Redis) for hot reads
5. Add **read replicas** for the database
6. Move static files to **S3 + CDN**
7. Add **message queues** for slow/async work
8. **Shard** the database if data outgrows one machine

### Interview Q&A
- **Horizontal vs vertical scaling?** → See table. Horizontal preferred: no ceiling, no SPOF.
- **What does a load balancer do?** → Distributes traffic, removes SPOF, does health checks, enables horizontal scaling.
- **Why must servers be stateless?** → So any server can serve any request; otherwise adding servers logs users out randomly.
- **Users get logged out after you added a second server — why?** → Sessions stored locally on one server. Fix: Redis session store or JWT.
- **Where would you add caching?** → Read-heavy, rarely-changing data. Risk introduced: stale data.
- **What is a CDN?** → Geographically distributed edge servers caching static content near users. Reduces latency and origin load.
- **Scale from 100 to 1M users?** → Give the roadmap above, in order.
- **SQL vs NoSQL?** → SQL for relational data and transactions; NoSQL for flexible schema and massive horizontal scale.

---

# 5. RAPID FIRE

| Question | One-line answer |
|----------|-----------------|
| Docker in one line? | Packages app + dependencies into a portable container |
| Container vs VM? | Shares host kernel vs runs its own OS |
| Image vs container? | Blueprint vs running instance |
| What is IAM? | Controls who can do what in AWS |
| Role vs user? | Temporary service permissions vs permanent identity |
| EC2? | Virtual server in the cloud |
| S3? | Object storage for files |
| RDS? | Managed relational database |
| Security group? | Virtual firewall for instances |
| Multi-AZ vs read replica? | Availability vs read scaling |
| CI/CD? | Automated build+test, then automated deploy |
| Pipeline stages? | Checkout → test → build → push → deploy |
| Where do secrets go? | Secret store, injected at runtime |
| Actions vs Jenkins? | Hosted & simple vs self-hosted & flexible |
| Load balancer? | Distributes traffic across servers |
| Why stateless? | So you can add servers freely |
| Why cache? | Avoid repeating expensive DB work |
| CDN? | Edge servers serving static content near users |
| CAP theorem? | Under partition, pick consistency or availability |
| Vertical vs horizontal? | Bigger machine vs more machines |

---

# 6. THE QUESTION THAT DECIDES IT

> **"Walk me through your project."**

Have a 2-minute version rehearsed out loud:

*"I built a REST API in [language] with [database]. I containerized it with Docker — the Dockerfile uses a slim base image and I ordered the layers so dependency installs stay cached. It's deployed on an EC2 instance, connecting to an RDS [MySQL/Postgres] instance, with user uploads going to S3. I set up a GitHub Actions pipeline so every push to main runs the tests, builds the image, pushes it to Docker Hub, and redeploys on EC2 automatically."*

Then add: **one thing that broke and how you fixed it.** ("My app couldn't reach RDS — turned out the RDS security group wasn't allowing inbound from the EC2 security group.") That detail is what makes it sound real instead of memorized.

**Follow-ups you will get:**
- Why Docker and not just deploying the code directly?
- How would you scale this if traffic went 100x?
- How do you handle secrets like the database password?
- What happens if the EC2 instance dies?
- Why did you pick SQL over NoSQL here?

---

**Final tip:** speak these answers aloud, not just read them. Fluency under pressure is a separate skill from knowing the answer.

---

# 7. COMMAND CHEAT SHEET

### Docker Commands
```bash
# Image management
docker build -t myapp .              # Build image
docker images                        # List images
docker rmi <image_id>               # Remove image

# Container management
docker run -d -p 8080:3000 myapp    # Run container in background
docker ps                            # List running containers
docker ps -a                         # List all containers
docker stop <container_id>           # Stop container
docker rm <container_id>             # Remove container

# Debugging
docker logs <container_id>           # View logs
docker exec -it <container_id> bash  # Shell into container
docker inspect <container_id>        # Detailed info

# Compose
docker compose up -d                 # Start all services
docker compose down                  # Stop and remove
docker compose logs                  # View all logs
docker compose ps                    # List services
```

### AWS CLI Commands
```bash
# EC2
aws ec2 describe-instances
aws ec2 start-instances --instance-ids <id>
aws ec2 stop-instances --instance-ids <id>

# S3
aws s3 ls                           # List buckets
aws s3 cp file.txt s3://mybucket/   # Upload file
aws s3 sync ./folder s3://mybucket/ # Sync folder

# IAM
aws iam list-users
aws iam list-roles
```

### Git Commands (for CI/CD)
```bash
git clone <repo_url>
git checkout -b feature-branch
git add .
git commit -m "message"
git push origin main
git pull origin main
git status
git log --oneline
```

### System Design Commands
```bash
# Redis
redis-cli ping                      # Check connection
redis-cli set key value             # Set value
redis-cli get key                   # Get value

# Database
sudo systemctl start postgresql
sudo systemctl status postgresql

# Network
curl http://localhost:8080/health   # Check endpoint
telnet hostname 5432                # Test connection
netstat -tulpn                      # Show listening ports
```

---

# 8. TROUBLESHOOTING CHECKLIST

### Container won't start
- [ ] Check logs: `docker logs <container>`
- [ ] Is the port already in use?
- [ ] Are environment variables set correctly?
- [ ] Does the container have enough memory?
- [ ] Is the Docker daemon running?

### Can't connect to database
- [ ] Security group inbound rules
- [ ] Correct hostname (not localhost in container)
- [ ] Database credentials correct
- [ ] Database service is running
- [ ] Network connectivity between services

### Pipeline fails
- [ ] Check GitHub Actions/Jenkins logs
- [ ] Environment variables/secrets missing
- [ ] Dependency installation fails
- [ ] Test failures (different environment)
- [ ] Permission issues (Docker socket, file permissions)

### Application slow
- [ ] Check database query performance
- [ ] Is caching enabled?
- [ ] CPU/Memory usage
- [ ] Network latency
- [ ] Database connection pool size

---

**Good luck with your interview! 🚀**

---

This version uses Obsidian-compatible markdown tables (using pipes and dashes) and maintains all the original content while fixing the table rendering issues. The code blocks use proper syntax highlighting with backticks, and all lists are properly formatted with proper indentation.