import type { Request, Response } from "express";

import fs from 'fs';
import path from 'path';

const api_handler = (req: Request, res: Response) => {
    const { region, province, city_or_municipality } = req.params;
    const { hotline } = req.query;
    const keys = [region, province, city_or_municipality].filter(Boolean);

    if (keys.length <= 0) {
        res.json({
            message: "Welcome to the Philippines Emergency Hotlines API!",
            example: "Usage: http://ph-emergency-hotlines-api.onrender.com/api/{region}/{province}/{city_or_municipality}?hotline={hotline}",
            hotline_values: "general, police, medical, rescue_disaster, earthquake_seismic, traffic, social, and digital",
            note: "Please understand that some locations might not have every type of emergency hotline available."
        })

        return; // So we don't send two responses
    }

    const file_path = '../models/data/' + keys.map((param, index) => param + (index !== keys.length - 1 ? "/" : "")).join(''); 
    let data;

    try {
        const file = path.resolve(__dirname, `${file_path}/source.json`);
        data = JSON.parse(fs.readFileSync(file, 'utf-8'))

        if (hotline) {
            data = data[hotline.toString()];
        }

        if (data) {
            res.json({
                status: 'success',
                data: data
            })
        } else {
            res.status(400).json({
                status: "error",
                error: "No data found for the specified parameters."
            })
        }
    } catch (erorr) {
        res.status(503).json({
            status: 'error',
            message: 'Could not retrieve data from source.'
        })
    }
}

export default api_handler;
