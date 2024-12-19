import fs from "fs";
import path from "path";

const generate_source_files = () => {
    const central_source_JSON = path.resolve(
        __dirname,
        "../models/data/source.json"
    );
    const data = JSON.parse(fs.readFileSync(central_source_JSON, "utf-8"))[0];

    const regions = Object.keys(data).slice(1); // Exclude national for now

    /* We can refactor the code below with recursion */
    regions.forEach((region) => {
        generate_source_json([region], data);

        const provinces = Object.keys(data[region]);
        provinces.forEach((province) => {
            generate_source_json([region, province], data);

            const cities_municipalities = Object.keys(data[region][province]);
            cities_municipalities.forEach((city_municipality) => {
                generate_source_json(
                    [region, province, city_municipality],
                    data
                );
            });
        });
    });
};

const generate_source_json = (params: string[], data: any) => {
    const source_json = params.reduce(
        (acc, key) => (acc && acc[key] ? acc[key] : null),
        data
    );
    const file_path =
        "../models/data/" +
        params
            .map(
                (param, index) =>
                    param + (index !== params.length - 1 ? "/" : "")
            )
            .join("");

    if (source_json) {
        const dir_path = path.join(__dirname, file_path);

        try {
            fs.mkdirSync(dir_path, { recursive: true });
            fs.writeFileSync(
                `${dir_path}/source.json`,
                JSON.stringify(source_json, null, 2)
            );
        } catch (error) {
            console.error("Error creating source files!");
        }
    } else {
        console.error("Error retrieving data for source.json!");
    }
};

generate_source_files();
