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

//get all todos

//get a todo

//update a todo

//delete a todo

app.listen(5000, () => {
  console.log("Server has started on port 5000");
})

