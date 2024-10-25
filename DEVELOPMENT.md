## Project Name: Philippines Emergency Hotlines API
## Tech Stack: TypeScript, Express
## Deployment: Render

## Architecture and Principles: MVC (Model-View-Controller), DRY (Don't Repeat Yourself)
## MVC (Model-View-Controller) Architecture:
--> Follow MVC (Model-View-Controller) Pattern
---> Controller: Handles incoming HTTP requests and returns responses
---> Service: Contains business logic (E.g., logic to fetch emergency hotline for a specific location)
---> Model: Represents the data (This contains source.json where Service retrieves from)

## Implement:
- Rate Limiting
- CORS
- Error Handling
- Authentication (Maybe you can add API keys?)
- AWESOME Documentation

## Features:
-

## Example Usage:
- emergency hotline types:
- general
- animals
- fire
- rescue/disaster
- weather/seismic
- traffic
- coast guard
- medical
- police

- https://api.phemergencyhotlines.com/{region}/{province}/{city or municipality}/{barangay=optional}/{hotline_type}
- result: https://api.phemergencyhotlines.com/cavite/alfonso/luksuhin-ibaba/rescue

- notes:
- 1. fetching without any parameters will result in retrieving national emergency hotlines
- e.g. https://api.phemergencyhotlines.com/ <--- receive national emergency hotlines