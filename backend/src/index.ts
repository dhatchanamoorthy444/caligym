import express from 'express';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import dataRoutes from './routes/data';
import userRoutes from './routes/user';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
