import type { Application} from "express";

import api_router from "./routes/api_router";

import express from "express";

// import dotenv from 'dotenv';
// dotenv.config();

const server: Application = express();
const port = process.env.PORT || 8000;

server.use(api_router);

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})