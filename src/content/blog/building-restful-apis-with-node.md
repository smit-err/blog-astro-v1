---
title: Builing RESTful APIs with Node
posted_on: "May 01 2025"
description: Menubars, menus, toolbars, and tablists are part of a larger family of ‘button groups’. Here’s how they should behave when using the keyboard.
---

## Prerequisites

- Node.js installed (version 14 or later)
- Basic knowledge of JavaScript
- A code editor like VS Code

## Setting Up the Project

First, create a new directory and initialize a Node.js project:

```bash
mkdir todo-api
cd todo-api
npm init -y
```

Install Express:

```bash
npm install express
```

## Creating the API

Create a file named `index.js` with the following code:

```javascript
const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage for todos
let todos = [{ id: 1, task: "Learn Node.js", completed: false }];

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST a new todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }
  const newTodo = {
    id: todos.length + 1,
    task,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT to update a todo
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task, completed } = req.body;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  if (task !== undefined) todo.task = task;
  if (completed !== undefined) todo.completed = completed;
  res.json(todo);
});

// DELETE a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

## Explaining the Code

- **Express Setup**: We import Express and create an app instance.
- **Middleware**: `express.json()` parses incoming JSON requests.
- **Routes**:
  - `GET /todos`: Returns all todos.
  - `POST /todos`: Creates a new todo.
  - `PUT /todos/:id`: Updates a todo by ID.
  - `DELETE /todos/:id`: Deletes a todo by ID.
- **In-Memory Storage**: For simplicity, we use an array (`todos`) to store data. In production, you’d use a database like MongoDB.

## Testing the API

Run the server:

```bash
node index.js
```

Use a tool like Postman or `curl` to test the API. Here’s an example using `curl`:

```bash
# Get all todos
curl http://localhost:3000/todos

# Create a new todo
curl -X POST -H "Content-Type: application/json" -d '{"task":"Write a blog"}' http://localhost:3000/todos

# Update a todo
curl -X PUT -H "Content-Type: application/json" -d '{"completed":true}' http://localhost:3000/todos/1

# Delete a todo
curl -X DELETE http://localhost:3000/todos/1
```

## Adding Error Handling

To make the API more robust, add a global error handler:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
```

Place this at the end of your routes to catch unexpected errors.

## Next Steps

- **Database Integration**: Replace the in-memory array with MongoDB or PostgreSQL.
- **Authentication**: Add JWT or OAuth for secure access.
- **Validation**: Use a library like Joi to validate incoming data.

## Conclusion

Building a RESTful API with Node.js and Express is straightforward yet powerful. This tutorial covered the basics, but you can extend the API with features like pagination, filtering, or logging. Try deploying it to a platform like Heroku or Vercel to share it with the world!
