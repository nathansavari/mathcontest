import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { score, username, roomId } = req.body;

  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    const collection = client.db("gameDB").collection("scores");

    const currentBestScore = await collection.findOne(
      { username, roomId },
      { sort: { score: -1 } }
    );

    if (!currentBestScore || score > currentBestScore.score) {
      await collection.updateOne(
        { username, roomId },
        { $max: { score: score } },
        { upsert: true }
      );
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Could not connect to database" });
  } finally {
    await client.close();
  }
}
