const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project');

router.post('/save', projectController.saveProject);
router.get('/list', projectController.getProjects);

module.exports = router;