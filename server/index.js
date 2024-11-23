import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { setupDatabase } from './db.js';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // Serve static files from dist

// Initialize database
await setupDatabase();

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Handle React Router - Send index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});