# RESTful API

We've been put onto a project which is pretty important - managing the coordination of astronauts in outer space.

It's an existing project - there's already a lot of functionality that's been created. Everything we need to retrieve and manage astronaut data exists and has been imported already into `app.js`.

The requirements of our task are:

- to adhere to the principles of RESTful API design
- to create functionality for each ticket, test it works, and then commit the working code
- to document as you go, making sure you and your colleagues understand what you are trying to do at all times

To get started, enter `npm run dev` in your console. The server will magically start, and will restart anytime you save changes 🪄

Remember, you can test the routes and request handlers you're creating through tools like [Postman](https://www.postman.com/). Once you think it's working, you can use `npm test` to see if your solution passes the acceptance tests.

All of your request handlers should be written in `app.js` for now - at a later date, we'll look at splitting out routes into different files for better code management. For now, don't worry about that! `app.js` is the place to be!

When you are handling a request and sending back a response, all responses should contain objects which follow the pattern:

```js
{
  "success": boolean,
  "payload": returnedData
}
```

Our API will be JSON as a response format, so you'll use the appropriate response method to send back data to the requester.

Good luck! And if in doubt, break it down!

## Ticket 1 - GET Request

Write a request handler to return the correct response when a `GET` request is received to `/astronauts`.
Choose the appropriate function from the imported functions at the top of the `app.js` to get your data.

## Ticket 2 - POST request

Write a request handler to return the correct response and perform the correct action when a `POST` request is received to `/astronauts`. Choose the appropriate function from the imported functions at the top of the `app.js` to perform the action.

## Ticket 3 - GET astronaut by ID

Write the request handler to return the data from the function getAstronautById. Have this handler listen to requests at the appropriate path.

## Ticket 4 - PUT astronaut by ID

Write the request handler to perform the action and return the data from the function replaceAstronautById. Have this handler listen to requests at the appropriate path.

## Ticket 5 - DELETE astronaut by ID

Write the request handler to perform the action and return the data from the function deleteAstronautById. Have this handler listen to requests at the appropriate path.

## Ticket 6 - PATCH astronaut by ID

Write the request handler to perform the action and return the data from the function updateAstronautById. Have this handler listen to requests at the appropriate path.

## BONUS

### GET astronaut by name

Modify your program to use a [query](https://masteringjs.io/tutorials/express/query-parameters) to handle `GET` requests is received to `/astronauts?name=<name>`. Add the functionality to your existing GET request handler.

### Error Handling

What would happen if someone tried to request an astronaut not in the database? Start thinking about how you'd handle this in your code in each route.
