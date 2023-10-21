import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const { roomId } = req.query;

  try {
    await client.connect();
    const collection = client.db("gameDB").collection("scores");

    const pipeline = [
      { $match: { roomId } },
      { $sort: { score: -1 } },
      {
        $group: {
          _id: "$username",
          score: { $first: "$score" },
        },
      },
      {
        $project: {
          username: "$_id",
          score: 1,
        },
      },
      { $sort: { score: -1 } },
      { $limit: 10 },
    ];

    const topScores = await collection.aggregate(pipeline).toArray();

    res.status(200).json(topScores);
  } catch (error) {
    res.status(500).json({ error: "Could not connect to database" });
  } finally {
    await client.close();
  }
}
