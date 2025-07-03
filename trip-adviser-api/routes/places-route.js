import { ObjectId } from "@fastify/mongodb";
import { commentSchema } from "./comments-route.js";

const placeSchema = {
  type: "object",
  required: ["title", "country"],
  properties: {
    title: { type: "string" },
    country: { type: "string" },
    images: { type: "array", default: [], items: { type: "string" } },
    comments: {
      type: "array",
      default: [],
      items: {
        type: "array",
        default: [],
        items: commentSchema,
      },
    },
    isActive: { type: "boolean", default: false },
  },
};

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 */
export default async function (fastify) {
  const collection = fastify.mongo.db.collection("places");

  // Get all places
  fastify.get("/places", async () => {
    const result = await collection
      .find({
        isActive: true,
      })
      .project({
        title: 1,
        country: 1,
        cardImage: {
          $arrayElemAt: ["$images", 0],
        },
        commentsCount: {
          $size: {
            $filter: {
              input: "$comments",
              as: "comment",
              cond: { $eq: ["$$comment.isApproved", true] },
            },
          },
        },
      })
      .toArray();

    if (result.length === 0) {
      throw new Error("No place found");
    }

    return result;
  });

  // Get a place by id
  fastify.get("/places/:id", async (request) => {
    const result = await collection.findOne(
      {
        _id: ObjectId.createFromHexString(request.params.id),
      },
      {
        projection: {
          title: 1,
          country: 1,
          images: 1,
          isActive: 1,
          comments: {
            $filter: {
              input: "$comments",
              as: "comment",
              cond: { $eq: ["$$comment.isApproved", true] },
            },
          },
        },
      }
    );

    if (!result) {
      throw new Error("Invalid place id");
    }

    return result;
  });

  // Add a new place
  fastify.post(
    "/places",
    {
      schema: {
        body: placeSchema,
      },
    },
    async (request) => {
      const result = await collection.insertOne(request.body);

      return result;
    }
  );
}
