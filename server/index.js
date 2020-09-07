const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

/* MIDDLEWARE */

app.use(cors());
app.use(express.json({ type: 'application/json' }));

/* ROUTES */

// Criar uma tarefa

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;

    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description],
    );

    res.status(201).json({
      status: 'success',
      data: newTodo.rows[0],
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      data: err.message,
    });
  }
});

// Mostrar todas as tarefas

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');

    res.status(200).json({
      status: 'success',
      data: allTodos.rows,
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      data: err.message,
    });
  }
});

// Mostrar uma tarefa específica

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);

    res.status(200).json({
      status: 'success',
      data: todo.rows[0],
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      data: err.message,
    });
  }
});

// Atualizar uma tarefa

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updatedTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *',
      [description, id],
    );

    res.status(201).json({
      status: 'success',
      data: updatedTodo.rows[0],
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      data: err.message,
    });
  }
});

// Deletar uma tarefa

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await pool.query(
      'DELETE FROM todo WHERE todo_id = $1',
      [id],
    );

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      data: err.message,
    });
  }
});

/* Server */
app.listen(5000, () => {
  console.log('****** The server has started! ******');
});
