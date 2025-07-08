import express from 'express';
const PORT = 4545;

const server = express();

function logger(req, res, next) {
    req.startTime = new Date().toLocaleString();
    console.log(`request with ${req.method} method, url: ${req.url}, startTime: ${req.startTime}\n`);
    next();
}

server.use(express.json(), logger);

server.get('/greet', (req, res) => {
    res.send({ msg: `hi from get endpoint ${new Date().toLocaleString()}` });
});

server.get('/greet/:name', (req, res) => {
    console.log(`I got name: ${req.params.name}\n`);
    res.send({ msg: `got name: ${req.params.name}` });
});

server.get('/test', async (req, res) => {
    const response = await fetch('http://localhost:4545/greet/Bob');
    const data = await response.json();
    if ("msg" in data && data.msg === "got name: Bob") {
        return res.send({ result: "ok" });
    }
    else {
        return res.send({ result: "fail" });
    }
});

server.post('/action', async (req, res) => {
    if (!req.body.action || (req.body.action !== "joke" && req.body.action !== "cat fact")) {
        return res.status(400).send({ msg: "body is malformed" });
    }
    else {
        if (req.body.action === "joke") {
            const response = await fetch("https://official-joke-api.appspot.com/random_joke");
            const data = await response.json();
            return res.send({ joke: `${data.setup.toUpperCase()} ${data.punchline.toUpperCase()}` });
        } else if (req.body.action === "cat fact") {
            const api_key = "live_WghUt5yfrePa7WhYrHpclGEKqANg5NFVH50ls15M9UZZ7mUmdmDg6KPNmVUv51o2";
            const response = await fetch(
                "https://api.thecatapi.com/v1/images/search?limit=12",
                {
                    headers: {
                        "x-api-key": api_key
                    }
                }
            );
            const data = await response.json();
            return res.send({ length: `${data.length}` });
        }
    }
})

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}\n`);
});