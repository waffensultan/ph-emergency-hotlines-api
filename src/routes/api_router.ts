import express, { type Response } from "express";
import cors from 'cors';

import api_handler from "../controllers/api_handler";

const api_router = express.Router();

const cors_options = {
    origin: "*",
    "methods": "GET",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
api_router.use(cors(cors_options));

api_router.get('/api/:region?/:province?/:city_or_municipality?/:barangay?', api_handler);
api_router.get('/', (_, res: Response) => {
    res.json({
        message: "Welcome to the Philippines Emergency Hotlines API!",
        example: "Usage: http://ph-emergency-hotlines-api.onrender.com/api/{region}/{province}/{city_or_municipality}?hotline={hotline}",
        hotline_type_values: "general, police, medical, rescue_disaster, earthquake_seismic, traffic, social, and digital",
        note: "Please understand that some locations might not have every type of emergency hotline available."
    })
})

export default api_router;