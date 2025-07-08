import express from 'express';
const PORT = 4545;
const TIMESTAMP = new Date().toLocaleString();

const server = express();

server.use(express.json());

server.get('/greet', (req, res) => {
    res.send({ "msg": `hi from get endpoint ${TIMESTAMP}` });
});

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})