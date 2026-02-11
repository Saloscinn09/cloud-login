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

app.post("/cadastro", (req, res) => {

    const {email, senha} = req.body;

    let usuarios = JSON.parse(fs.readFileSync("usuarios.json"));

    const existe = usuarios.find(u => u.email === email);

    if(existe){
        return res.json({msg:"Usuário já existe"});
    }

    usuarios.push({email, senha});

    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2));

    res.json({msg:"Conta criada com sucesso"});
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando"));

