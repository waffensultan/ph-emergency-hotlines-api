import type { Request, Response } from "express";

import fs from "fs";
import path from "path";

const api_handler = (req: Request, res: Response) => {
    const { region, province, city_or_municipality } = req.params;
    const { hotline } = req.query;
    const keys = [region, province, city_or_municipality].filter(Boolean);

    const file_path =
        "../models/data/" +
        keys
            .map(
                (param, index) => param + (index !== keys.length - 1 ? "/" : "")
            )
            .join("");
    let data;

    try {
        const file = path.resolve(__dirname, `${file_path}/source.json`);
        data = JSON.parse(fs.readFileSync(file, "utf-8"));

        if (hotline) {
            data = data[hotline.toString()];
        }

        if (data) {
            res.json({
                status: "success",
                data: data,
            });
        } else {
            res.status(400).json({
                status: "error",
                error: "No data found for the specified parameters.",
            });
        }
    } catch (erorr) {
        res.status(503).json({
            status: "error",
            message: "Could not retrieve data from source.",
        });
    }
};

export default api_handler;
