const express = require('express');
const connectDb = require('./config/connectDb');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();
connectDb();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res)=> {
    res.json({message: 'backend is running...'});
});

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});