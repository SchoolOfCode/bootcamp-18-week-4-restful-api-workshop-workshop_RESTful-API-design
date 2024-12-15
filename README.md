# RESTful API Workshop

- You have been asked to write the request handlers which manage the coordination of astronauts in outer space.
- All of the models that retrieve and manage astronaut data have been written for you and have been imported into `routes/astronauts.js`.
- You should adhere to the principles of RESTful API design throughout the tasks. Might help: https://docs.microsoft.com/en-gb/azure/architecture/best-practices/api-design

The API response (for all tasks) should have this shape:

```
{
    "success": boolean,
    "payload": returnedData
}
```

For each of the tasks below:

- Think about what HTTP verb and path should be used for the endpoint.
- Think about what the body and status code in the response might need to be.
- Use the relevant function imported from `models/astronauts.js` to interact with the astronauts collection.

## Task 1 - Get all astronauts

- Add an endpoint to your REST API which returns all astronauts in the response body.
- Run `npm run test1` to check if your request handler passes the tests.

## Task 2 - Get a particular astronaut

- Add an endpoint to your REST API which returns a particular astronaut in the response body.
- Run `npm run test2` to check if your request handler passes the tests.

## Task 3 - Create an astronaut

- Add an endpoint to your REST API which creates a new astronaut and returns the newly created astronaut in the reponse body.
- Run `npm run test3` to check if your request handler passes the tests.

## Task 4 - Replace a particular astronaut

- Add an endpoint to your REST API which replaces a particular astronaut and returns the astronaut's updated state in the response body.
- Run `npm run test4` to check if your request handler passes the tests.

## Task 5 - Delete a particular astronaut

- Add an endpoint to your REST API which deletes a particular astronaut and returns the deleted astronaut in the response body.
- Run `npm run test5` to check if your request handler passes the tests.

## Task 6 - Update a particular astronaut

- Add an endpoint to your REST API which updates a particular astronaut and returns the astronaut's update state in the response body.
- Run `npm run test6` to check if your request handler passes the tests.

## Task 7 (bonus) - Get astronauts by name

- Update your REST API so that it supports getting only those astronauts which match a given `name` query parameter. Include the matching astronauts within the response body. Might help: https://masteringjs.io/tutorials/express/query-parameters
- Run `npm run test7` to check if your request handler passes the tests.

## Task 8 (bonus) - Handling non-existent resources and invalid requests

- Update your REST API so that:
  - when the astronaut doesn't exist, the API responds with HTTP status code 404 and a response body containing at least: `{ success: false }`
  - when the request tries to create/update/replace an astronaut without including any data in the request body, the API responds with HTTP status code 400 and a response body containing at least: `{ success: false }`
- Might help: https://expressjs.com/en/starter/faq.html#how-do-i-handle-404-responses
- Run `npm t` to run all tests and check if your request handler passes the tests.
