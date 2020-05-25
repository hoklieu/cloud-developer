import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Car, cars as cars_list } from './cars';
import { expandCars } from "./utils";

(async () => {
  let cars:Car[]  = cars_list;

  //Create an express applicaiton
  const app = express(); 
  //default port to listen
  const port = 8082; 
  
  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json()); 

  // Root URI call
  app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  // Get a greeting to a specific person 
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get( "/persons/:name", 
    ( req: Request, res: Response ) => {
      let { name } = req.params;

      if ( !name ) {
        return res.status(400)
        .send(`name is required`);
      }

      return res.status(200)
      .send(`Welcome to the Cloud, ${name}!`);
    } );

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get( "/persons/", ( req: Request, res: Response ) => {
    let { name } = req.query;

    if ( !name ) {
      return res.status(400)
      .send(`name is required`);
    }

    return res.status(200)
    .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as 
  // an application/json body to {{host}}/persons
  app.post( "/persons", 
    async ( req: Request, res: Response ) => {

      const { name } = req.body;

      if ( !name ) {
        return res.status(400)
        .send(`name is required`);
      }

      return res.status(200)
      .send(`Welcome to the Cloud, ${name}!`);
    });

  // @TODO Add an endpoint to GET a list of cars
  app.get("/cars",
    (req: Request, res: Response) => {
      let { make } = req.query;
      if (make) {
        console.log("query");
        let result = cars.filter(function(car) {
          return car.make == make;
        });
        return res.status(200)
        .send(result);
      }
      return res.status(200)
      .send(cars);
    });
  // @TODO Add an endpoint to get a specific car
  // it should fail gracefully if no matching car is found
  app.get("/cars/:id",
    (req: Request, resp: Response) => {
      let { id } = req.params;
      if (id) {
        let result = cars.filter((car) => car.id == id);
        // have to do it this way... empty array still exists
        if (result && result.length != 0)
        {
          return resp.status(200)
          .send(result);
        }
        else
        {
          return resp.status(404)
          .send(`${id} not found! {result}` );
        }

      }
    })

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
  app.post("/cars", 
    async (req : Request, resp: Response) => {
      const { make, id, type, model, cost } = req.body;
      console.log(make, id, type, model, cost);
      if (make && id && type && model && cost)
      {
        if (id <= cars.length)
        {
          return resp.status(404)
          .send("You're missing fields"); 
        }
        const new_car: Car = 
        {"make": make, "id": id, "type": type, "model":model, "cost":cost};
        cars.push(new_car);
        return resp.status(201)
        .send(new_car);
      }
      else
      {
        return resp.status(404)
        .send("You're missing fields");
      }
    });

  // Start the Server
  app.listen( port, () => {
    console.log( `server running http://localhost:${ port }` );
    console.log( `press CTRL+C to stop server` );
  } );
})();