import express from 'express';
const PORT = 4545;

const server = express();

server.use(express.json());

server.get('/greet', (req, res) => {
    res.send({ "msg": `hi from get endpoint ${new Date().toLocaleString()}` });
});

server.get('/greet/:name', (req, res) => {
    console.log(`I got name: ${req.params.name}`);
    res.send({ "msg": `got name: ${req.params.name}` });
});

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})