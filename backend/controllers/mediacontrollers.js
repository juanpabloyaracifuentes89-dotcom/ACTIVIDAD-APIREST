const Media = require("../models/Media");
const { request, response } = require("express");


// Obtener todas las medias
const getMedias = async (req = request, res = response) => {

    try {

        const medias = await Media.find()
        .populate("genero")
        .populate("director")
        .populate("productora")
        .populate("tipo");

        res.status(200).json(medias);

    } catch (error) {

        console.error("Error al obtener medias:", error);

        res.status(500).json({
            msg:"Error al obtener medias"
        });

    }

};


// Crear media
const createMedia = async (req = request, res = response) => {

    try {

        const { serial, url } = req.body;

        const serialDB = await Media.findOne({ serial });

        if(serialDB){
            return res.status(400).json({
                msg:"El serial ya existe"
            });
        }

        const urlDB = await Media.findOne({ url });

        if(urlDB){
            return res.status(400).json({
                msg:"La URL ya existe"
            });
        }

        const media = new Media(req.body);

        await media.save();

        res.status(201).json(media);

    } catch (error) {

        console.error("Error al crear media:", error);

        res.status(500).json({
            msg:"Error al crear media"
        });

    }

};


// Actualizar media
const updateMedia = async (req = request, res = response) => {

    try {

        const { id } = req.params;
        const { _id, __v, fechaCreacion, ...data } = req.body;
        data.fechaActualizacion = new Date();

        const mediaActualizada = await Media.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        res.status(200).json(mediaActualizada);

    } catch (error) {

        console.error("Error al actualizar media:", error);

        res.status(500).json({
            msg:"Error al actualizar media"
        });

    }

};


// Eliminar media
const deleteMedia = async (req = request, res = response) => {

    try {

        const { id } = req.params;

        await Media.findByIdAndDelete(id);

        res.status(200).json({
            msg:"Media eliminada correctamente"
        });

    } catch (error) {

        console.error("Error al eliminar media:", error);

        res.status(500).json({
            msg:"Error al eliminar media"
        });

    }

};


module.exports = {

    getMedias,
    createMedia,
    updateMedia,
    deleteMedia

};