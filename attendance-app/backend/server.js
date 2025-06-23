const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"));

// Basic Route
app.get('/', (req, res) => {
  res.send("Attendance API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/student'));
app.use('/api/attendance', require('./routes/attendance'));