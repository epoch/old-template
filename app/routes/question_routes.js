const express = require('express')
const Question = require('../models/question')
const router = express.Router()

// INDEX
// GET /questions
router.get('/questions', async (req, res, next) => {
  const { rows: questions } = await Question.all().catch(next)
  res.status(200).json({ questions })
})

// SHOW
// GET /questions/21
router.get('/questions/:id', async (req, res, next) => {
  const { rows: questions } = await Question.findById(req.params.id).catch(next)
  res.status(200).json(questions[0])
})

// CREATE
// POST /questions
router.post('/questions', async (req, res, next) => {
  const { rows } = await Question.insert(req.body.question).catch(next)
  res.status(201).json(rows[0])
})

// // DESTROY
// // DELETE /questions/21
router.delete('/questions/:id', async (req, res, next) => {
  await Question.delete(req.params.id).catch(next)
  res.sendStatus(204)
})

module.exports = router
