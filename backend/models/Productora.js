const{Schema,model}=require('mongoose');
const Productoraschema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre de la productora es obligatorio'],
        unique: true,
        trim: true
    },
    estado:{
        type: String,
        required: true,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    },
    descripcion:{
        type: String,
        trim: true
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
    },
    slogan:{
        type: String,
        trim: true
    }
    });

module.exports=model("Productora",Productoraschema);