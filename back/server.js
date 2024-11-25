import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connection SUCCESS');
    } catch (error) {
        console.error('MongoDB connection FAIL:', error.message);
        process.exit(1);
    }
};

connectDB();

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
