const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/images');
    },
    filename: (req, file, cb) => {
        cb(null, "project-" + Date.now() + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/save', projectController.saveProject);
router.get('/list', projectController.getProjects);
router.get('/item/:id', projectController.getProject);
router.get('/image/:file', projectController.getImageFile);
router.delete('/delete/:id', projectController.deleteProject);
router.put('/update/:id', projectController.updateProject);
router.put('/upload/:id', upload.single('file0'), projectController.upload);

module.exports = router;