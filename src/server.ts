import express, { type Application } from "express";
import api_router from "./routes/api_router";

const server: Application = express();
const port = process.env.PORT || 8000; // Defaults to Port 8000 if not specified

server.use(api_router);
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
