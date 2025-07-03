import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";

dotenv.config();

const { MONGODB_URI } = process.env;

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector(fastify, options) {
  fastify.register(fastifyMongo, {
    url: MONGODB_URI,
  });
}

export default fastifyPlugin(dbConnector);
