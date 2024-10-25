import type { Response } from "express";
import express from "express";

import api_handler from "../controllers/api_handler";

const api_router = express.Router();

api_router.get('/api/:region?/:province?/:city_or_municipality?/:barangay?', api_handler);
api_router.get('/', (_, res: Response) => {
    res.json({
        message: "Welcome to the Philippines Emergency Hotlines API!",
        example: "Usage: /api/{region}/{province}/{city_or_municipality}?hotline_type={hotline_type}",
        hotline_types: "general, police, medical, rescue_disaster, earthquake_seismic, traffic, social, and digital",
        note: "Please understand that some locations might not have every type of emergency hotline available."
    })
})

export default api_router;