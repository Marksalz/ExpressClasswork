import express from 'express';
const PORT = 4545;

const server = express();

function logger(req, res, next) {
    req.startTime = new Date().toLocaleString();
    console.log(`request with ${req.method} method, url: ${req.url}\nstartTime: ${req.startTime}\n`);
    next();
}

server.use(express.json(), logger);

server.get('/greet', (req, res) => {
    res.send(JSON.stringify({ msg: `hi from get endpoint ${new Date().toLocaleString()}` }));
});

server.get('/greet/:name', (req, res) => {
    console.log(`I got name: ${req.params.name}\n`);
    res.send(JSON.stringify({ msg: `got name: ${req.params.name}` }));
});

server.get('/test', async (req, res) => {
    const response = await fetch('http://localHost:4545/greet/Bob',);
    const data = await response.json();
    console.log(data);
    if ("msg" in data && data.msg === "got name: Bob") {
        res.send(JSON.stringify({ result: "ok" }));
    }
    else {
        res.send(JSON.stringify({ result: "fail" }));
        
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}\n`);
})