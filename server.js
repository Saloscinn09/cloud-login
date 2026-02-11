const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/login", (req, res) => {

    const {email, senha} = req.body;

    const usuarios = JSON.parse(fs.readFileSync("usuarios.json"));

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if(usuario){
        res.json({ok:true});
    }else{
        res.json({ok:false});
    }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando"));

