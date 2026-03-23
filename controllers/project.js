const fs = require('fs')
const path = require('path')

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

const getProject = async (req, res) => {
    const id = req.params.id;

    try {
        const project = await Project.findById(id);
        return res.status(200).send({
            status: 'success',
            project
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Error al obtener el proyecto',
            error
        });
    }
}

const deleteProject = async (req, res) => {
    const id = req.params.id;

    try {
        const project = await Project.findByIdAndDelete(id);
        return res.status(200).send({
            status: 'success',
            project
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Error al eliminar el proyecto',
            error
        });
    }
}

const updateProject = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const project = await Project.findByIdAndUpdate(id, body, { new: true });
        return res.status(200).send({
            status: 'success',
            project
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Error al actualizar el proyecto',
            error
        });
    }
}

const upload = async (req, res) => {

    try {

        let id = req.params.id;

        if (!req.file) {
            return res.status(400).send({
                status: 'error',
                message: 'No se ha subido ningun archivo'
            });
        }

        const filePath = req.file.path;
        const extension = path.extname(req.file.originalname).toLocaleLowerCase().replace('.', '');

        if (extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg' && extension !== 'gif') {
            fs.unlinkSync(filePath);

            return res.status(400).send({
                status: 'error',
                message: 'La extension del archivo no es valida'
            });
        }

        const project = await Project.findByIdAndUpdate({ _id: id }, { image: req.file.filename }, { new: true });
        return res.status(200).send({
            status: 'success',
            project,
            newFile: req.filename
        });
    } catch (error) {
        fs.unlinkSync(filePath);
        return res.status(500).send({
            status: 'error',
            message: 'Error al actualizar el proyecto',
            error
        });
    }

}

const getImageFile = async (req, res) => {
    const file = req.params.file;
    const filePath = './uploads/images/' + file;

    fs.stat(filePath, (err, exists) => {
        if (err) {
            return res.status(404).send({
                status: 'error',
                message: 'La imagen no existe'
            });
        }

        return res.status(200).sendFile(path.resolve(filePath));
    });


}

module.exports = {
    saveProject,
    getProjects,
    getProject,
    deleteProject,
    updateProject,
    upload,
    getImageFile
};