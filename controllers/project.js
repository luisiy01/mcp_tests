const Project = require('../models/project');

const saveProject = async (req, res) => {

    const body = req.body;

    if (!body.name || !body.description || !body.state) {
        return res.status(400).send({
            status: 'error',
            message: 'Faltan datos por enviar'
        });
    }

    let projectToSave = new Project(body);

    try {
        const projectStored = await projectToSave.save();

        return res.status(200).send({
            status: 'success',
            project: projectStored
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Error al guardar el proyecto',
            error
        });
    }


}

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).send({
            status: 'success',
            projects
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Error al obtener los proyectos',
            error
        });
    }
}

module.exports = {
    saveProject,
    getProjects
};