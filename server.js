const express = require('express');
const bodyParser = require("body-parser");
const server = express();

server.use(bodyParser.json());

server.get('/my/first/server', (req, res) => {
    res.send('Hola mundo!!!');
});

server.get('/error', (req, res) => {
    res.statusCode = 500;
    res.json({ error: 'Algo salió mal :(' });
});

let photos = [
    {
        id: 1,
        title: 'Example 1',
        url: 'https://example.com/images/1'
    },
    {
        id: 2,
        title: 'Example 2',
        url: 'https://example.com/images/2'
    }
];


// GET
server.get('/photos', (req, res) => {
    res.send(photos);
});

// Definicion de la ruta de express 
// que retorna una foto especifica
server.get('/photos/:indexPhoto', (req, res) => {
    const indexPhoto = req.params.indexPhoto-1;
    res.json(photos[indexPhoto] || 'Photo incorrect');
});

//POST
server.post("/photos",(req,res) =>{
    photos.push(req.body);
    res.json("Photo added correctly...");
});

// DELETE
server.delete("/photos/:id", (req,res) =>{
    const index = req.params.id;
    photos.splice(index, 1);
    res.status(204).json();
});

//PUT
server.put("/photos/:id", (req,res) =>{
    const index = req.params.id;
    photos.splice(index, 1, req.body);
    res.json("Update photo "+ index);
});

let listener = server.listen(3000, () => {
console.log('startListen', `NodeJS Application, appPort= ${listener.address().port}`);
});
