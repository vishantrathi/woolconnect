const express=require('express');
const app=express();
const cors = require('cors');
const User = require('./models/User');
const authRoutes=require('./routes/auth');
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use('/auth',authRoutes);
app.listen(PORT,()=>{
    console.log('Server is running on port 3000');
});