const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project');

router.post('/save', projectController.saveProject);
router.get('/list', projectController.getProjects);
router.get('/item/:id', projectController.getProject);
router.delete('/delete/:id', projectController.deleteProject);
router.put('/update/:id', projectController.updateProject);

module.exports = router;