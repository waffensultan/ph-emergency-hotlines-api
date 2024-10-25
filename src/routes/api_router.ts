import type { Response } from "express";
import express from "express";

import api_handler from "../controllers/api_handler";

const api_router = express.Router();

api_router.get('/api/:region?/:province?/:city_or_municipality?/:barangay?', api_handler);
api_router.get('/', (_, res: Response) => {
    res.json({
        message: "Welcome to the Philippines Emergency Hotlines API!",
        example: "Usage: /api/{region}/{province}/{city_or_municipality}?hotline_type={hotline_type}",
        note: "Hotline types are: General, Police, Medical, Rescue/Disaster, Earthquake/Seismic, Traffic",
        additional_note: "Some locations might not have every type of emergency hotline."
    })
})

export default api_router;

// - https://api.phemergencyhotlines.com/{region}/{province}/{city or municipality}/{barangay}/?hotline_type={hotline_type}
// - result: https://api.phemergencyhotlines.com/cavite/alfonso/luksuhin-ibaba/?hotline_type=police

// /api/{region}/{province}/{city_or_municipality}/

// - notes:
// - 1. fetching without any parameters will result in retrieving national emergency hotlines
// - e.g. https://api.phemergencyhotlines.com/ <--- receive national emergency hotlines