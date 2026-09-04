import express from 'express';
import { generatePlans, parseNaturalLanguageQuery, getCatalog } from '../services/plannerService.js';

const router = express.Router();

// GET /api/planner/catalog - Get full catalog
router.get('/catalog', (req, res) => {
  try {
    const catalog = getCatalog();
    res.json({ success: true, catalog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/planner/generate - Generate 3 tiered plans
router.post('/generate', (req, res) => {
  try {
    const { budget, categories, query, preferences } = req.body;

    let targetBudget = budget;
    let targetCategories = categories || [];

    // If natural language query provided, extract info
    if (query && (!targetCategories.length || !targetBudget)) {
      const parsed = parseNaturalLanguageQuery(query);
      if (parsed.budget && !targetBudget) targetBudget = parsed.budget;
      if (parsed.categories.length && !targetCategories.length) targetCategories = parsed.categories;
    }

    if (!targetCategories.length) {
      targetCategories = ['keyboard', 'mouse', 'headphones'];
    }

    if (!targetBudget) {
      targetBudget = 5000;
    }

    const planResult = generatePlans({
      budget: targetBudget,
      categories: targetCategories,
      preferences: preferences || []
    });

    res.json({ success: true, data: planResult });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/planner/parse-query - Parse raw user prompt
router.post('/parse-query', (req, res) => {
  try {
    const { query } = req.body;
    const parsed = parseNaturalLanguageQuery(query || '');
    res.json({ success: true, parsed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
