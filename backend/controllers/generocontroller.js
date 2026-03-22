const { get } = require("mongoose");
const Genero =require("../models/Genero");

const {request, response} =require("express");

const getGeneros = async (req = request, res = response) =>{
    try {
        const generos = await Genero.find();
        res.status(200).json(generos);
    } catch (error){
        console.error('Error al obtener los géneros:', error);
        res.status(500).json({ msg: 'Error al obtener los géneros' });
    }
}
const createGenero = async (req = request, res = response) =>{
    try {
        const {nombre, descripcion} = req.body;

        const GeneroDB = await Genero.findOne({nombre});
        if (GeneroDB){
            return res.status(400).json({msg: 'El género ya existe'});
        }
        const genero = new Genero({nombre, descripcion});

        await genero.save();
        res.status(201).json(genero);
    } catch (error){
        console.error('Error al crear el género:', error);
        res.status(500).json({ msg: 'Error al crear el género' });
    }
}

const updateGenero = async (req = request, res = response) =>{
    try {
        const { id } = req.params;
        const { _id, __v, fechaCreacion, ...data } = req.body;
        data.fechaActualizacion = new Date();
        const generoActualizado = await Genero.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json(generoActualizado);
    } catch (error) {
        console.error('Error al actualizar el género:', error);
        res.status(500).json({ msg: 'Error al actualizar el género' });
    }
}

const deleteGenero = async (req = request, res = response) =>{
    try {
        const { id } = req.params;
        await Genero.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Género eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el género:', error);
        res.status(500).json({ msg: 'Error al eliminar el género' });
    }
}

module.exports = {
    getGeneros,
    createGenero,
    updateGenero,
    deleteGenero
}