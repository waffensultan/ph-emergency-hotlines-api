import type { Request, Response } from "express";

import fs from 'fs';
import path from 'path';

const api_handler = (req: Request, res: Response) => {
    const { region, province, city_or_municipality, } = req.params;
    const { hotline } = req.query;

    const file_path = path.resolve(__dirname, '../models/source.json');
    let source;

    try {
        source = JSON.parse(fs.readFileSync(file_path, 'utf-8'))[0];
    } catch (error) {
        console.error('Error reading source JSON file: ', error)

        res.status(503).json({
            status: "error",
            message: 'Could not load data from source.'
        })
    }

    const keys = [region, province, city_or_municipality].filter(Boolean);
    const response = get_nested_data(source, keys);

    if (response) {
        let final_response = response;

        if (hotline) {
            final_response = final_response[hotline.toString()];

            if (!final_response) {
                res.status(400).json({
                    status: 'error',
                    error: "No data found for the specified parameters."
                })
            }
        }

        res.json({
            status: 'success',
            data: final_response
        })
    } else {
        res.status(400).json({
            status: 'error',
            error: "No data found for the specified parameters."
        })
    }
}

const get_nested_data = (data: any, keys: any) => {
    return keys.reduce((acc: any, key: any) => (acc && acc[key] ? acc[key] : null), data);
}

export default api_handler;
