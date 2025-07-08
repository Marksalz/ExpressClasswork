import express from 'express';
const PORT = 4545;
const TIMESTAMP = Date.now();

const server = express();

server.use(express.json());

server.get('/greet', (req, res) => {
    res.send({ "msg": `hi from get endpoint ${TIMESTAMP}` });
})