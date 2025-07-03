import Fastify from "fastify";
import cors from "@fastify/cors";

import DatabaseRoute from "./routes/db-connector.js";
import PlacesRoute from "./routes/places-route.js";
import CommentsRoute from "./routes/comments-route.js";

const fastify = Fastify({
  logger: true,
});

export default async function (fastify, opts) {
  fastify.register(cors, {
    origin: "*", // Allow all origins for development purposes
  });

  fastify.get("/", async function handler(request, reply) {
    return { message: "App is live!" };
  });

  // Register the database connector
  fastify.register(DatabaseRoute);

  // Register the routes
  fastify.register(PlacesRoute);
  fastify.register(CommentsRoute);
}
