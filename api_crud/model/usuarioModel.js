const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema
(
    {
        usuario:
        {
            type: String,
            require: [true, "Insira um nome de usuário"]
        },
        senha:
        {
            type: String,
            required: [true, "Insira uma senha"]
        }
    },
    {
        timestamps: true
    }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;