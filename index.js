const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5500;

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Epicurius server running!");
});

app.listen(port, () => {
  console.log("Server is running successfully!!");
});
