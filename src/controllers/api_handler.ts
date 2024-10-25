import type { Request, Response } from "express";

import fs from 'fs';
import path from 'path';


const api_handler = (req: Request, res: Response) => {
    const { region, province, city_or_municipality, } = req.params;
    const { hotline_type } = req.query;

    try {
        const file_path = path.resolve(__dirname, '../models/source.json');
        const source = JSON.parse(fs.readFileSync(file_path, 'utf-8'))[0];

        const keys = [region, province, city_or_municipality].filter(Boolean);
        const response = get_nested_data(source, keys);

        if (response) {
            res.json({
                status: 'success',
                data: (!hotline_type ? response : response[hotline_type.toString()])
            })
        } else {
            res.status(400).json({
                status: 'error',
                error: "No data found for the specified parameters."
            })
        }
    } catch (error) {
        console.error('Error reading source JSON file: ', error)
        res.status(503).json({
            status: "error",
            message: 'Could not load data from source.'
        })
    }
}

const get_nested_data = (data: any, keys: any) => {
    return keys.reduce((acc: any, key: any) => (acc && acc[key] ? acc[key] : null), data);
}

export default api_handler;
