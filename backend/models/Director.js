const{Schema,model}=require('mongoose');
const Directorschema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre del director es obligatorio'],
        unique: true,
        trim: true
    },
    estado:{
        type: String,
        required: true,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    },
    fechaCreacion:{
        type: Date,
        required: true,
        default: Date.now
    },
    fechaActualizacion:{
        type: Date,
        required: true,
        default: Date.now
    }
    });

module.exports=model("Director",Directorschema);