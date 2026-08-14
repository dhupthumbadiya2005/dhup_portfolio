## DDL

_DDL commands define the structure of the database. `CREATE` builds it, `ALTER` modifies it, `DROP` deletes it entirely, `TRUNCATE` empties it but keeps the structure, and `RENAME` changes its name. Unlike DML commands, DDL commands are **auto-commit**, meaning they cannot be rolled back_
Here is your **Ultra-Short DDL Query Guide** – only queries and one important point per command. No theory.


#### 1. CREATE
```sql
CREATE TABLE Students (
    Roll_No INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Age INT
);
```
**Important:** Defines table structure. `NOT NULL` means column cannot be empty.

#### 2. ALTER (Add Column)
```sql
ALTER TABLE Students ADD Email VARCHAR(100);
```
**Important:** Adds a new column to existing table.

#### 3. ALTER (Modify Column)
```sql
ALTER TABLE Students MODIFY Name VARCHAR(100);
```
**Important:** Changes column datatype/size.

#### 4. ALTER (Drop Column)
```sql
ALTER TABLE Students DROP COLUMN Age;
```
**Important:** Permanently removes a column.

#### 5. DROP
```sql
DROP TABLE Students;
```
**Important:** Deletes table + data + structure completely. Cannot undo.

#### 6. TRUNCATE
```sql
TRUNCATE TABLE Students;
```
**Important:** Deletes all rows but keeps empty table structure. Cannot undo.

#### 7. RENAME
```sql
RENAME TABLE Students TO Learners;
```
**Important:** Changes table name. Data stays intact.

#### 8. ALTER (Rename Column - DB specific)
```sql
ALTER TABLE Students RENAME COLUMN Name TO Student_Name;
```
**Important:** Some DBs use `CHANGE` (MySQL) or `RENAME COLUMN` (PostgreSQL).

#### 9. ALTER (Add Primary Key)
```sql
ALTER TABLE Students ADD PRIMARY KEY (Roll_No);
```
**Important:** Adds PK after table creation.

#### 10. ALTER (Drop Primary Key)
```sql
ALTER TABLE Students DROP PRIMARY KEY;
```
**Important:** Removes PK constraint.


---

## DCL
**Data Control Language**


#### 1. GRANT (Give Permissions)

```sql
GRANT SELECT, INSERT ON Students TO User1;
```
**Important:** Gives `User1` permission to read (`SELECT`) and add (`INSERT`) data into the `Students` table.

```sql
GRANT ALL PRIVILEGES ON Students TO User1;
```
**Important:** Gives `User1` **all** permissions (`SELECT`, `INSERT`, `UPDATE`, `DELETE`, `ALTER`, etc.) on the `Students` table.

```sql
GRANT SELECT ON Students TO User1, User2, User3;
```
**Important:** You can grant permissions to **multiple users** at once.

```sql
GRANT SELECT ON Students TO PUBLIC;
```
**Important:** `PUBLIC` means **every user** in the database gets this permission.

```sql
GRANT SELECT ON Students TO User1 WITH GRANT OPTION;
```
**Important:** `WITH GRANT OPTION` allows `User1` to **further grant** the `SELECT` permission to other users.

#### 2. REVOKE (Take Back Permissions)

```sql
REVOKE INSERT ON Students FROM User1;
```
**Important:** Removes `User1`'s permission to insert data into the `Students` table.

```sql
REVOKE ALL PRIVILEGES ON Students FROM User1;
```
**Important:** Removes **all** permissions that `User1` had on the `Students` table.

```sql
REVOKE GRANT OPTION ON Students FROM User1;
```
**Important:** Removes only the `GRANT OPTION` power from `User1`. User1 keeps other permissions but cannot grant them to others.


---

## TCL : 

Here is your **Ultra-Short TCL (Transaction Control Language) Guide** – only queries and one important point per command.

#### The Setup (One Table)

```sql
CREATE TABLE Accounts (
    Acc_ID INT PRIMARY KEY,
    Balance DECIMAL(10,2)
);

INSERT INTO Accounts VALUES (1, 1000), (2, 500);
```

#### 1. COMMIT (Make Changes Permanent)

```sql
UPDATE Accounts SET Balance = Balance - 200 WHERE Acc_ID = 1;
UPDATE Accounts SET Balance = Balance + 200 WHERE Acc_ID = 2;
COMMIT;
```
**Important:** Saves all changes **permanently** to the database. After `COMMIT`, you cannot rollback.

#### 2. ROLLBACK (Undo All Changes)

```sql
UPDATE Accounts SET Balance = Balance - 200 WHERE Acc_ID = 1;
UPDATE Accounts SET Balance = Balance + 200 WHERE Acc_ID = 2;
ROLLBACK;
```
**Important:** Undoes **all changes** since the last `COMMIT`. Database returns to original state (Acc1 = 1000, Acc2 = 500).

#### 3. SAVEPOINT (Partial Rollback)

```sql
SAVEPOINT sp1;
UPDATE Accounts SET Balance = Balance - 200 WHERE Acc_ID = 1;

SAVEPOINT sp2;
UPDATE Accounts SET Balance = Balance + 200 WHERE Acc_ID = 2;

ROLLBACK TO sp2;   -- Undoes only the 2nd update
COMMIT;
```
**Important:** `ROLLBACK TO sp2` undoes changes **after** `sp2` only. The first update (Acc1 = 800) is **kept**.
#### 4. ROLLBACK TO SAVEPOINT (Detailed Example)

```sql
SAVEPOINT start;
UPDATE Accounts SET Balance = 800 WHERE Acc_ID = 1;   -- Step 1

SAVEPOINT step1;
UPDATE Accounts SET Balance = 700 WHERE Acc_ID = 1;   -- Step 2

SAVEPOINT step2;
UPDATE Accounts SET Balance = 600 WHERE Acc_ID = 1;   -- Step 3

ROLLBACK TO step1;   -- Undoes Step 2 & Step 3. Balance is back to 800.
COMMIT;
```
**Important:** `ROLLBACK TO step1` keeps changes until `step1` (Balance = 800) and discards everything after.

#### 5. RELEASE SAVEPOINT (Delete a Savepoint)

```sql
SAVEPOINT sp1;
UPDATE Accounts SET Balance = 800 WHERE Acc_ID = 1;
RELEASE SAVEPOINT sp1;
```
**Important:** Deletes the savepoint `sp1`. You can no longer rollback to it.

#### 6. Auto-Commit (Interview Trap)

```sql
-- In MySQL, auto-commit is ON by default.
SET AUTOCOMMIT = OFF;   -- Now every query waits for manual COMMIT.
UPDATE Accounts SET Balance = 800 WHERE Acc_ID = 1;
COMMIT;   -- Now changes are permanent.
```
**Important:** In most databases, `AUTOCOMMIT` is **ON** by default. Every `INSERT/UPDATE/DELETE` is auto-committed unless you start a transaction explicitly.


## The Only Trap Question

**Interviewer:** *"What happens if you `ROLLBACK` after `COMMIT`?"*

**Answer:** Nothing. `ROLLBACK` only works on changes made **after** the last `COMMIT`. Once committed, changes are permanent and cannot be undone.

---

## Real Interview Scenario (Step-by-Step)

**Question:** *"You are transferring ₹200 from Account 1 to Account 2. Write a TCL-safe transaction."*

```sql
START TRANSACTION;   -- Explicitly start

UPDATE Accounts SET Balance = Balance - 200 WHERE Acc_ID = 1;
UPDATE Accounts SET Balance = Balance + 200 WHERE Acc_ID = 2;

-- If both updates succeed:
COMMIT;

-- If any update fails (e.g., Acc1 has insufficient balance):
ROLLBACK;
```




---


Here is your **Ultra-Short SQL Cheat Sheet** covering all essential commands in a concise, interview-friendly format.

---

## 1. SELECT & FILTERING

| Command | Syntax | Example |
| :--- | :--- | :--- |
| **SELECT** | `SELECT col1, col2 FROM table;` | `SELECT Name, Salary FROM Employees;` |
| **SELECT *** | `SELECT * FROM table;` | `SELECT * FROM Employees;` |
| **SELECT DISTINCT** | `SELECT DISTINCT col FROM table;` | `SELECT DISTINCT Dept FROM Employees;` |
| **WHERE** | `WHERE condition` | `WHERE Salary > 50000` |
| **AND/OR/NOT** | Combine conditions | `WHERE Dept='IT' AND Salary>60000` |
| **ORDER BY** | `ORDER BY col ASC/DESC` | `ORDER BY Salary DESC` |
| **LIMIT/TOP** | `LIMIT n` or `TOP n` | `SELECT * FROM Employees LIMIT 5;` |

---

## 2. DML (Data Manipulation)

| Command | Syntax | Example |
| :--- | :--- | :--- |
| **INSERT** | `INSERT INTO table (cols) VALUES (vals);` | `INSERT INTO Employees (ID, Name) VALUES (1, 'Alice');` |
| **UPDATE** | `UPDATE table SET col=val WHERE condition;` | `UPDATE Employees SET Salary=70000 WHERE ID=1;` |
| **DELETE** | `DELETE FROM table WHERE condition;` | `DELETE FROM Employees WHERE ID=1;` |

---

## 3. NULL Handling

| Command | Syntax | Example |
| :--- | :--- | :--- |
| **IS NULL** | `WHERE col IS NULL` | `SELECT * FROM Employees WHERE Manager_ID IS NULL;` |
| **IS NOT NULL** | `WHERE col IS NOT NULL` | `SELECT * FROM Employees WHERE Manager_ID IS NOT NULL;` |

---

## 4. AGGREGATE FUNCTIONS

| Function | Syntax | Example |
| :--- | :--- | :--- |
| **COUNT** | `COUNT(col)` | `SELECT COUNT(*) FROM Employees;` |
| **SUM** | `SUM(col)` | `SELECT SUM(Salary) FROM Employees;` |
| **AVG** | `AVG(col)` | `SELECT AVG(Salary) FROM Employees;` |
| **MAX** | `MAX(col)` | `SELECT MAX(Salary) FROM Employees;` |
| **MIN** | `MIN(col)` | `SELECT MIN(Salary) FROM Employees;` |

---

## 5. PATTERN MATCHING (LIKE)

| Pattern | Meaning | Example |
| :--- | :--- | :--- |
| `'A%'` | Starts with 'A' | `WHERE Name LIKE 'A%'` |
| `'%a'` | Ends with 'a' | `WHERE Name LIKE '%a'` |
| `'%or%'` | Contains 'or' | `WHERE Name LIKE '%or%'` |
| `'_r%'` | 2nd letter is 'r' | `WHERE Name LIKE '_r%'` |
| `'A__%'` | Starts with 'A', min 3 chars | `WHERE Name LIKE 'A__%'` |

---

## 6. IN & BETWEEN

| Command | Syntax | Example |
| :--- | :--- | :--- |
| **IN** | `WHERE col IN (val1, val2)` | `WHERE Dept IN ('IT', 'HR')` |
| **BETWEEN** | `WHERE col BETWEEN val1 AND val2` | `WHERE Salary BETWEEN 50000 AND 80000` |

---

## 7. JOINS

| Join Type | Syntax | Use Case |
| :--- | :--- | :--- |
| **INNER JOIN** | `SELECT * FROM t1 INNER JOIN t2 ON t1.id = t2.id;` | Matching rows only |
| **LEFT JOIN** | `SELECT * FROM t1 LEFT JOIN t2 ON t1.id = t2.id;` | All from left, matches from right |
| **RIGHT JOIN** | `SELECT * FROM t1 RIGHT JOIN t2 ON t1.id = t2.id;` | All from right, matches from left |
| **FULL JOIN** | `SELECT * FROM t1 FULL JOIN t2 ON t1.id = t2.id;` | All from both tables |

---

## 8. GROUP BY & HAVING

| Command | Syntax | Example |
| :--- | :--- | :--- |
| **GROUP BY** | `GROUP BY col` | `SELECT Dept, COUNT(*) FROM Employees GROUP BY Dept;` |
| **HAVING** | `HAVING condition` | `SELECT Dept, COUNT(*) FROM Employees GROUP BY Dept HAVING COUNT(*) > 2;` |

**Key Point:** `WHERE` filters rows **before** grouping. `HAVING` filters groups **after** grouping.

---

## 9. UNION

| Command | Syntax | Example |
| :--- | :--- | :--- |
| **UNION** | `SELECT ... UNION SELECT ...` | Removes duplicates |
| **UNION ALL** | `SELECT ... UNION ALL SELECT ...` | Keeps duplicates |

**Rule:** Both SELECT statements must have the **same number of columns** and **similar data types**.

---

## 10. DDL (Data Definition Language)

| Command | Syntax | Example |
| :--- | :--- | :--- |
| **CREATE DATABASE** | `CREATE DATABASE db_name;` | `CREATE DATABASE Company;` |
| **DROP DATABASE** | `DROP DATABASE db_name;` | `DROP DATABASE Company;` |
| **CREATE TABLE** | `CREATE TABLE table (col datatype);` | `CREATE TABLE Employees (ID INT, Name VARCHAR(50));` |
| **DROP TABLE** | `DROP TABLE table;` | `DROP TABLE Employees;` |
| **TRUNCATE** | `TRUNCATE TABLE table;` | Deletes all rows, keeps structure |
| **ALTER ADD** | `ALTER TABLE table ADD col datatype;` | `ALTER TABLE Employees ADD Email VARCHAR(100);` |
| **ALTER DROP** | `ALTER TABLE table DROP COLUMN col;` | `ALTER TABLE Employees DROP COLUMN Email;` |
| **ALTER MODIFY** | `ALTER TABLE table MODIFY col datatype;` | `ALTER TABLE Employees MODIFY Name VARCHAR(100);` |

---

## 11. DCL (Data Control Language)

| Command | Syntax | Example |
| :--- | :--- | :--- |
| **GRANT** | `GRANT privilege ON table TO user;` | `GRANT SELECT ON Employees TO User1;` |
| **REVOKE** | `REVOKE privilege ON table FROM user;` | `REVOKE SELECT ON Employees FROM User1;` |

---

## 12. TCL (Transaction Control Language)

| Command | Syntax | Example |
| :--- | :--- | :--- |
| **COMMIT** | `COMMIT;` | Saves all changes permanently |
| **ROLLBACK** | `ROLLBACK;` | Undoes all changes since last commit |
| **SAVEPOINT** | `SAVEPOINT sp_name;` | Creates a bookmark |
| **ROLLBACK TO** | `ROLLBACK TO sp_name;` | Undoes changes after savepoint |

---

## 13. CONSTRAINTS (Quick Reference)

| Constraint      | Purpose                        | Syntax Example                           |
| :-------------- | :----------------------------- | :--------------------------------------- |
| **PRIMARY KEY** | Unique + Not Null              | `ID INT PRIMARY KEY`                     |
| **FOREIGN KEY** | References another table       | `Dept_ID INT REFERENCES Departments(ID)` |
| **UNIQUE**      | All values must be different   | `Email VARCHAR(100) UNIQUE`              |
| **NOT NULL**    | Cannot be empty                | `Name VARCHAR(50) NOT NULL`              |
| **CHECK**       | Custom condition               | `Age INT CHECK (Age >= 18)`              |
| **DEFAULT**     | Default value if none provided | `Status VARCHAR(10) DEFAULT 'Active'`    |







##  SUBQUERIES (Query inside a Query)

|Type|Description|Example|
|---|---|---|
|**Scalar Subquery**|Returns **single value** (1 row, 1 col)|`SELECT * FROM Employees WHERE Salary > (SELECT AVG(Salary) FROM Employees);`|
|**Row Subquery**|Returns **single row** (multiple columns)|`SELECT * FROM Employees WHERE (Dept, Salary) = (SELECT Dept, MAX(Salary) FROM Employees GROUP BY Dept LIMIT 1);`|
|**Table Subquery**|Returns **table** (multiple rows/cols)|`SELECT * FROM (SELECT Dept, AVG(Salary) AS Avg_Sal FROM Employees GROUP BY Dept) AS Dept_Avg WHERE Avg_Sal > 60000;`|
|**Correlated Subquery**|References **outer query** (runs row by row)|`SELECT * FROM Employees e1 WHERE Salary > (SELECT AVG(Salary) FROM Employees e2 WHERE e2.Dept = e1.Dept);`|


### Subquery with IN / EXISTS / ANY / ALL

|Keyword|Description|Example|
|---|---|---|
|**IN**|Matches any value in list|`SELECT * FROM Employees WHERE Dept_ID IN (SELECT Dept_ID FROM Departments WHERE Location = 'NYC');`|
|**NOT IN**|Does not match any value|`SELECT * FROM Employees WHERE Dept_ID NOT IN (SELECT Dept_ID FROM Departments WHERE Location = 'LA');`|
|**EXISTS**|Returns TRUE if subquery has rows|`SELECT * FROM Employees e WHERE EXISTS (SELECT 1 FROM Assignments a WHERE a.Emp_ID = e.Emp_ID);`|
|**NOT EXISTS**|Returns TRUE if subquery is empty|`SELECT * FROM Employees e WHERE NOT EXISTS (SELECT 1 FROM Assignments a WHERE a.Emp_ID = e.Emp_ID);`|
|**ANY**|Compares to **any** value in subquery|`SELECT * FROM Employees WHERE Salary > ANY (SELECT Salary FROM Employees WHERE Dept = 'HR');`|
|**ALL**|Compares to **all** values in subquery|`SELECT * FROM Employees WHERE Salary > ALL (SELECT Salary FROM Employees WHERE Dept = 'HR');`|


### Subquery in SELECT / FROM / WHERE / HAVING

|Location|Example|
|---|---|
|**SELECT**|`SELECT Name, (SELECT AVG(Salary) FROM Employees) AS Company_Avg FROM Employees;`|
|**FROM**|`SELECT * FROM (SELECT Dept, AVG(Salary) AS Avg_Sal FROM Employees GROUP BY Dept) AS Sub;`|
|**WHERE**|`SELECT * FROM Employees WHERE Salary > (SELECT AVG(Salary) FROM Employees);`|
|**HAVING**|`SELECT Dept, AVG(Salary) FROM Employees GROUP BY Dept HAVING AVG(Salary) > (SELECT AVG(Salary) FROM Employees);`|

