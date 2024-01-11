// server.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
const mongoURI =
  'mongodb+srv://sashalehedza:methman42@cluster0.imczw.mongodb.net/data-manipulations-gpt' // Replace with your MongoDB connection URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  sex: { type: String, enum: ['Male', 'Female'], required: true },
})

const User = mongoose.model('User', userSchema)

// Routes

// Fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' })
  }
})

// Add a new user
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body)
    await newUser.save()
    res.json(newUser)
  } catch (error) {
    res.status(400).json({ error: 'Error adding user' })
  }
})

// Update an existing user
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({ error: 'Error updating user' })
  }
})

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(400).json({ error: 'Error deleting user' })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
