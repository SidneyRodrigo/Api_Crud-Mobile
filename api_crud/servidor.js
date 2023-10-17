const senhaDB = ""

const express = require("express");
const mongoose = require("mongoose");
const Usuario = require("./model/usuarioModel");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(express.static("html"));

// rota create -------------------------------------------------
app.get("/create", (req, res) =>
{
    res.sendFile(__dirname + "/html/create.html");
});

app.post("/create", async(req, res) =>
{
    try
    {
        const usuario = await Usuario.create(req.body);
        console.log("Usuario criado: ", usuario);
        res.redirect('/');
    }
    catch (erro)
    {
        console.log(erro.message);
        res.status(500).json({message: erro.message});
    }
});

// rota read ---------------------------------------------------------
app.get("/read", (req, res) =>
{
    res.sendFile(__dirname + "/html/read.html");
});

app.get("/api/read", async(req, res) =>
{
    try
    {
        const usuario = await Usuario.find({})
        res.status(200).json(usuario);
    }
    catch (erro)
    {
        console.log(erro.message);
        res.status(500).json({message: erro.message});
    }
});

app.get("/read/:id", async(req, res) => 
{
    try
    {
        const {id} = req.params;
        const usuario = await Usuario.findById(id);
        res.status(200).json(usuario);
    }
    catch (erro)
    {
        console.log(erro.message);
        res.status(500).json({message: erro.message});
    }
})

// rota update -------------------------------------------------------------------
app.get("/update", (req, res) =>
{
    res.sendFile(__dirname + "/html/update.html");
});

app.post("/update", async (req, res) => 
{
    try 
    {
        const { id, usuario, senha } = req.body;
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, { usuario, senha }, { new: true });

        if (!usuarioAtualizado) 
        {
            return res.status(404).json({ message: `Usuário com ID: ${id} não encontrado` });
        }

        res.redirect("/");
    } 
    catch (error) 
    {
        res.status(500).json({ message: error.message });
    }
});

// rota delete ------------------------------------------------------------------------------
app.get("/delete", (req, res) =>
{
    res.sendFile(__dirname + "/html/delete.html");
});

app.post("/delete", async (req, res) => {
    try {
        const { id } = req.body;
        const usuarioExcluido = await Usuario.findByIdAndDelete(id);

        if (!usuarioExcluido) {
            return res.status(404).json({ message: `Usuário com ID: ${id} não encontrado` });
        }

        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// rota raiz
app.get("/", (req, res) =>
{
    res.sendFile(__dirname + "/html/index.html");
});

// conectar ao banco
mongoose.connect(`mongodb+srv://sidneyrsilvestre:${senhaDB}@faculdade.v9mt9uz.mongodb.net/?retryWrites=true&w=majority`)
.then(() =>
{
    console.log("conectado ao MongoDB");
    app.listen(3000, () => 
    {
        console.log("API rodando na porta 3000.")
    })    
}).catch((erro) =>
{
    console.log(erro)
})