const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// https://www.youtube.com/watch?v=ldYcgPKEZC8&ab_channel=freeCodeCamp.org

// nodemon index
// psql -U postgres


// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES

// index
app.get("/todos", async(request, response) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    response.json(allTodos.rows);

  } catch (error) {
    console.log(error.message);
  }
});

// show
app.get("/todos/:id", async(request, response) => {
  try {
    const { id } = request.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
    response.json(todo.rows[0]);

  } catch (error) {
    console.log(error.message);
  }
});

// create
app.post("/todos", async(request, response) => {
  try {
    const { description } = request.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    response.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});




//update a todo

//delete a todo

app.listen(5000, () => {
  console.log("Server has started on port 5000");
})

