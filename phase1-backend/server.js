import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const dbUri = process.env.DB_URI;

mongoose
  .connect(dbUri, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  start_price: Number,
  reserve_price: Number,
});

const Item = mongoose.model("Item", itemSchema);

app.get("/", (req, res) => {
  res.send("Connected to the server");
});

app.get("/catalogue/listings", (req, res) => {
  Item.find()
    .then((results) => {
      console.log("Fetched data", results);
      res.json(results);
    })
    .catch((error) => {
      console.log("Error fetching data", error);
      res.status(500).send("Error fetching data");
    });
});

app.post("/catalogue/listings/search", (req, res) => {
  console.log("Request body:", req.body);
  const search = req.body.search;
  if (!search) {
    return res.status(400).send("Search term is required");
  }
  Item.find({ title: { $regex: search, $options: "i" } })
    .limit(10)
    .then((results) => {
      console.log("Fetched data", results);
      res.json(results);
    })
    .catch((error) => {
      console.log("Error fetching data", error);
      res.status(500).send("Error fetching data");
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
