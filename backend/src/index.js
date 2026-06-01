import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import aiRoutes from './routes/ai.js';
import onboardingRoutes from './routes/onboarding.js';
import goalsRoutes from './routes/goals.js';
import tasksRoutes from './routes/tasks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth routes
app.use('/api/auth', authRoutes);

// AI routes
app.use('/api/ai', aiRoutes);

// Onboarding routes
app.use('/api/onboarding', onboardingRoutes);

// Goals routes
app.use('/api/goals', goalsRoutes);

// Tasks routes
app.use('/api/tasks', tasksRoutes);

// API info
app.get('/api', (req, res) => {
  res.json({ 
    message: '实习生成长导航 API', 
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      ai: '/api/ai',
      onboarding: '/api/onboarding',
      goals: '/api/goals',
      tasks: '/api/tasks',
      health: '/api/health'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
