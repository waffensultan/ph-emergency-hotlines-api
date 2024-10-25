import type { Request, Response, Application} from "express";

import express from "express";

// import dotenv from 'dotenv';
// dotenv.config();

const server: Application = express();
const port = process.env.PORT || 8000;

server.get('/', (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript server!");
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})