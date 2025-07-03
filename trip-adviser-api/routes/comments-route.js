import { ObjectId } from "@fastify/mongodb";

export const commentSchema = {
  type: "object",
  required: ["name", "rate", "text"],
  properties: {
    name: { type: "string" },
    date: { type: "number" },
    rate: { type: "number" },
    text: { type: "string" },
    isApproved: { type: "boolean", default: false },
  },
};

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 */
export default async function (fastify) {
  const collection = fastify.mongo.db.collection("places");

  // Add a new comment
  fastify.post(
    "/places/:placeId/comments",
    {
      schema: {
        body: commentSchema,
      },
    },
    async (request) => {
      const placeId = ObjectId.createFromHexString(request.params.placeId);
      const comment = request.body;

      comment._id = new ObjectId();
      comment.isApproved = null;

      // Add the comment to the place
      const result = await collection.updateOne(
        { _id: placeId },
        { $push: { comments: comment } }
      );

      if (result.modifiedCount === 0) {
        throw new Error("Failed to add comment");
      }

      return result;
    }
  );

  // Add a new comment to a place
  fastify.post(
    "/places/:placeId/comments/:id",
    {
      schema: {
        body: commentSchema,
      },
    },
    async (request) => {
      const placeId = ObjectId.createFromHexString(request.params.placeId);
      const commentId = ObjectId.createFromHexString(request.params.id);
      const comment = request.body;

      comment._id = commentId;

      // Update the comment in the place
      const result = await collection.updateOne(
        { _id: placeId },
        { $set: { "comments.$[elem]": comment } },
        {
          arrayFilters: [{ "elem._id": commentId }],
        }
      );

      if (result.modifiedCount === 0) {
        throw new Error("Failed to update comment");
      }

      return result;
    }
  );

  // Review comments
  fastify.get("/review-comments", {}, async (request) => {
    const result = await collection
      .find(
        { "comments.isApproved": null },
        {
          projection: {
            _id: 1,
            title: 1,
            comments: {
              $filter: {
                input: "$comments",
                as: "comment",
                cond: { $eq: ["$$comment.isApproved", null] },
              },
            },
            name: 1,
          },
        }
      )
      .toArray();

    return result;
  });

  // Approve a comment
  fastify.post(
    "/approve-comment",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            placeId: { type: "string" },
            commentId: { type: "string" },
            isApproved: { type: "boolean" },
          },
        },
      },
    },
    async (request) => {
      const { placeId, commentId, isApproved } = request.body;

      // Update isApproved comment in the comments array
      const result = await collection.updateOne(
        { _id: ObjectId.createFromHexString(placeId) },
        { $set: { "comments.$[elem].isApproved": isApproved } },
        {
          arrayFilters: [
            { "elem._id": ObjectId.createFromHexString(commentId) },
          ],
        }
      );

      if (result.modifiedCount === 0) {
        throw new Error("Failed to update comment");
      }

      return result;
    }
  );
}
