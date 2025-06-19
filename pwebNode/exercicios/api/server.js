const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 3000;

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname)));

let tarefas = [];

app.get('/tarefas', (req, res) => {
    const {tarefas} = req.body;
    tarefas.push(tarefas);
    res.status(201).json({message: 'Tarefa adicionada com sucesso'});
});

app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`);
});
