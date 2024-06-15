const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();

let database = [];

// Assume context of 'users'

router.get('/users', (req, res, next) => {
  res.status(200).json({
    message: `GET - API`,
    database,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

router.get('/users/:id', (req, res, next) => {
  const { id } = req.params;
  const user = database.find((item) => item.id === id);
  if (user) {
    res.status(200).json({
      message: `GET by ID - /api`,
      data: user,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.post('/users', (req, res, next) => {
  // user has name
  const { name } = req.body;
  const newUser = {
    id: uuidv4(),
    name,
  };
  database.push(newUser);
  res.status(201).json({
    message: `POST - /api`,
    data: newUser,
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

router.patch('/users/:id', (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = database.find((item) => item.id === id);

  if (user) {
    user.name = name;
    res.status(200).json({
      message: `PATCH by ID - /api`,
      data: user,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.delete('/users/:id', (req, res, next) => {
  const { id } = req.params;
  const index = database.findIndex((item) => item.id === id);

  if (index !== -1) {
    database.splice(index, 1);
    res.status(200).json({
      message: `DELETE by ID - /api`,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
