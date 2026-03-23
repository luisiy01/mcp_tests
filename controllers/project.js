const Project = require('../models/project');

const saveProject = async (req, res) => {
    return res.status(200).send({
        message: 'Probando controlador'
    });
}

module.exports = {
    saveProject
};