import express from 'express';
import { getDb } from '../db.js';
import { auth } from '../middleware/auth.js';
import { z } from 'zod';

const router = express.Router();

const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional()
});

// Get all projects for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const db = await getDb();
    const projects = await db.all(
      'SELECT * FROM projects WHERE user_id = ? ORDER BY updated_at DESC',
      [req.user.id]
    );
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// Create new project
router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = projectSchema.parse(req.body);
    const db = await getDb();

    const result = await db.run(
      'INSERT INTO projects (name, description, user_id) VALUES (?, ?, ?)',
      [name, description, req.user.id]
    );

    const project = await db.get('SELECT * FROM projects WHERE id = ?', [result.lastID]);
    res.status(201).json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Error creating project' });
    }
  }
});

// Update project
router.patch('/:id', auth, async (req, res) => {
  try {
    const { name, description } = projectSchema.parse(req.body);
    const db = await getDb();

    await db.run(
      `UPDATE projects 
       SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ? AND user_id = ?`,
      [name, description, req.params.id, req.user.id]
    );

    const project = await db.get('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    res.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: 'Error updating project' });
    }
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    const db = await getDb();
    await db.run(
      'DELETE FROM projects WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting project' });
  }
});

export default router;