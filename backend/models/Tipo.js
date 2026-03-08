const{Schema,model}=require('mongoose');
const Tiposchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre del tipo es obligatorio'],
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
    descripcion:{
        type: String,
        trim: true
    }
    });

module.exports=model("Tipo",Tiposchema);