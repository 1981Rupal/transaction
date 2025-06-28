const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes'); // ✅ Must be correct
const transactionRoutes = require('./routes/transactionRoutes'); // ✅ Must be correct

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


app.use('/api/auth', authRoutes);
app.use('/api', transactionRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('✅ Expense Tracker API is running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
