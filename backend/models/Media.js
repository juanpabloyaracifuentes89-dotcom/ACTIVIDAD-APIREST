const{Schema,model}=require('mongoose');
const Mediaschema = new Schema({
    serial:{
        type: String,
        required: [true, 'El serial de la media es obligatorio'],
        unique: true,
    },
    titulo:{
        type: String,
        required: [true, 'El título de la media es obligatorio'],
    },
    sipnosis:{
        type: String,
        trim: true
    },
    url:{
        type: String,
        trim: true,
        unique: true
    },
    imagen:{
        type: String,
    },
    anioEstreno:{
        type: Number
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
    genero:{
        type: Schema.Types.ObjectId,
        ref: "Genero",
        required: true
    },

    director:{
        type: Schema.Types.ObjectId,
        ref: "Director",
        required: true
    },

    productora:{
        type: Schema.Types.ObjectId,
        ref: "Productora",
        required: true
    },

    tipo:{
        type: Schema.Types.ObjectId,
        ref: "Tipo",
        required: true
    },

});

module.exports=model("Media",Mediaschema);