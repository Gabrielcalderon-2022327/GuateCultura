import { createServer } from "http";
import { router } from "./router";
const PORT = 3000;


const server = createServer(async (req, res) => {
    try {
        await router(req, res);
    } catch (error) {
        console.error('Error interno:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error interno del servidor' }));
    }
});

server.listen(PORT, () => {
    console.log("\n--------------------------------");
    console.log("SERVER INCIADO");
    console.log(`PUERTO: ${PORT}`);
    console.log("URL: http://localhost:" + PORT);
    console.log("--------------------------------");
});
