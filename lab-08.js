/*
    CIT 281 Lab 8
    Name: Melinda Chan
*/

// #1 TODO: Declare fastify object from fastify, and execute
const fastify = require("fastify")();

// #2 TODO: Declare fetch object from node-fetch
const fetch = require("node-fetch");

fastify.get("/photos", (request, reply) => {
    // #3 TODO:
    // Adapt the following code to attempt to retrieve
    // all photos from JSONPlaceholder site
    // using fetch, and handle returned Promise using:
    // - two .then() chain methods, return 200
    // - single .catch() chain method, return 404
    fetch("https://jsonplaceholder.typicode.com/photos")
        .then ( (response) => { return response.json()}) // asynchronous call, json is an ARRAY
        .then( (json) => {
            reply
                .code(200)
                .header("Content-Type", "application/json; charset=utf-8") // make sure application/json not text/json
                .send({ error: "", statusCode: 200, photos: json });
        })
        .catch (error => {
            reply
                .code(404)
                .header("Content-Type", "application/json; charset=utf-8")
                .send({ error: "Error message", statusCode: 404, photos: [] }); // FIX ERROR MESSAGE
        })
        // .then(json => reply.send({json}))
  });

  fastify.get("/photos/:id", (request, reply) => {
    // #4 TODO:
    // Adapt the following code to attempt to retrieve
    // a single photo from JSONPlaceholder site
    // using fetch, and handle returned Promise using:
    // - single .then() chain method, return 200
    // - single .catch() chain method, return 404
    const { id = "" } = request.params
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then ( (response) => { return response.json()})
      .then ((json) => {
        reply
          .code(200)
          .header("Content-Type", "application/json; charset=utf-8")
          .send({ error: "", statusCode: 200, photo: json });
      })
      .catch (error => {
        reply
            .code(404)
            .header("Content-Type", "application/json; charset=utf-8")
            .send({ error: "Error message", statusCode: 404, photos: {} }); // FIX ERROR MESSAGE
      })
  })


    // for (x of json.photos) 
    // photos is an array with photo objects, photos property is itelf within a JSON object

    // .then (response => {json.parse(response/body)})
    


    // You may also try to use Object.keys() to 
    // ensure JSONPlaceholder returns an object with
    // properties. An empty object returned from 
    // JSONPlaceholder means that the passed photo ID
    // was invalid. Your server would also return
    // a 404 status code for an invalid Photo ID.
  
  // Start server and listen to requests using Fastify
  const listenIP = "localhost";
  const listenPort = 8080;
  fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });
