const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project');

router.post('/save', projectController.saveProject);

module.exports = router;