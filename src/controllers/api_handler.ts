import type { Request, Response } from "express";
import fs from "fs";
import path from "path";

const api_handler = (req: Request, res: Response) => {
    const { region, province, city_or_municipality } = req.params;
    const { hotline } = req.query;
    const keys = [region, province, city_or_municipality].filter(Boolean);

    /* Retrieve the source file based on the user's query parameters */
    const file_path =
        "../models/data/" +
        keys
            .map((param, index) => param + (index !== keys.length - 1 ? "/" : ""))
            .join("")
        + "/source.json";

    try {
        const file = path.resolve(__dirname, file_path);

        const data = hotline
            ? JSON.parse(fs.readFileSync(file, "utf-8"))[hotline.toString()]
            : JSON.parse(fs.readFileSync(file, "utf-8"));

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
    } catch (error) {
        res.status(503).json({
            status: "error",
            message: "Could not retrieve data from source.",
        });
    }
};

export default api_handler;
