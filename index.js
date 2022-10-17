const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5500;

//middlewares
app.use(cors());
app.use(express.json());

//mongoDB connections
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.s87fbwh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const videoDataCollection = client.db("epicurious").collection("videoData");
    const bestOfEpidataCollection = client
      .db("epicurious")
      .collection("bestOfEpiData");

    app.get("/videoData", async (req, res) => {
      const query = {};
      const cursor = videoDataCollection.find(query);
      const videoData = await cursor.toArray();
      res.send(videoData);
    });

    app.get("/bestOfEpiData", async (req, res) => {
      const query = {};
      const cursor = bestOfEpidataCollection.find(query);
      const bestOfEpiData = await cursor.toArray();
      res.send(bestOfEpiData);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Epicurius server running!");
});

app.listen(port, () => {
  console.log("Server is running successfully!!");
});
