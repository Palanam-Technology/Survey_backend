const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 
const surveyRoutes = require('./routes/surveyRoutes');

const app = express();

app.use(cors());
app.use(express.json());

//A check for backend deployment on Render
app.get('/', (_req, res) => {
  res.send('Backend is running!');
});


app.use('/api/users', userRoutes); // handles both /signup and /login
app.use('/api/survey', surveyRoutes); //handles survey routes


// for connecting with MongoDB,one can find URI in .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database connection error:', err));
