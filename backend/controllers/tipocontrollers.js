const Tipo = require("../models/Tipo");
const { request, response } = require("express");

const getTipos = async (req = request, res = response) => {

    try {

        const tipos = await Tipo.find();

        res.status(200).json(tipos);

    } catch (error) {

        console.error("Error al obtener tipos:", error);

        res.status(500).json({
            msg: "Error al obtener tipos"
        });
    }

};

const createTipo = async (req = request, res = response) => {

    try {

        const { nombre } = req.body;

        const tipoDB = await Tipo.findOne({ nombre });

        if (tipoDB) {
            return res.status(400).json({
                msg: "El tipo ya existe"
            });
        }

        const tipo = new Tipo(req.body);

        await tipo.save();

        res.status(201).json(tipo);

    } catch (error) {

        console.error("Error al crear tipo:", error);

        res.status(500).json({
            msg: "Error al crear tipo"
        });
    }

};

module.exports = {
    getTipos,
    createTipo
};