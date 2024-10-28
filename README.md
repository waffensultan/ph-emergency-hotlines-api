# Welcome to [Philippines Emergency Hotlines API](https://github.com/waffensultan/philipppines-emergency-hotlines-api)!

Easily retrieve critical emergency hotlines information for your organization or project with just one API call.

## Usage
* #### API Call Structure
```bash
https://ph-emergency-hotlines-api.onrender.com/api/{region}/{province}/{city_or_municipality}?hotline={hotline_type}
```
* #### Example:
```javascript
try {
    const response = await fetch('https://ph-emergency-hotlines-api.onrender.com/api/calabarzon/cavite/alfonso?hotline=police')
    const data = await response.json();

    // Your code on handling data...
} catch (error) {
    // Your error handling process here...
}
```
For better clarification, you can check out the demo here: https://ph-emergency-hotlines-frontend.vercel.app/

## Getting Started

1. Clone the project:
```bash
git clone https://github.com/waffensultan/ph-emergency-hotlines-api.git
```

2. Install the project dependencies:
```bash
npm install
```

3. Run the server:
```bash
npm run dev
```

Your server will now be running locally in your machine!

## Contributing
Contributions are welcomed and appreciated. 

---

- #### Adding new fields
```
region: {
    province: {
        city_municipality: {
            "hotline_type": [
                {
                    "abbreviation"?: string,
                    "name": string,
                    "hotlines": [
                        {
                            "number": string,
                            "range"?: string,
                            "location_code"?: string;
                        }
                    ]
                }
            ]
        }
    }
}
```

The JSON structure above describes the complete format for the central `source.json` file, located in `models/data/source.json`.
Feel free to make contributions or PRs by adding new data to it.

Available hotline types are:
- general
- police
- medical
- rescue_disaster
- earthquake_seismic
- traffic
- social
- digital

Feel free to add more.

---

- #### Generating new source files
After creating new fields, run the following command in your preferred CLI:
```bash
npm generate-source-files
```
What it does is run `scripts/generate-source-files.ts` which automates the process of creating separate `source.json` files for each level (regional, provincial, and city/municipal).

For scalability, separating data into individual `source.json` files is significantly more efficient than relying on a single `source.json` file. This approach greatly reduces GET request response times, resulting in faster data retrieval, previously taking 100+ ms now down to 10-90 ms.