import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// const SEARCH_API_KEY = process.env.SEARCH_API_KEY;
const PORT = process.env.PORT || 4000;
const dbUri = process.env.DB_URI;
// const customSearchUri = `https://www.googleapis.com/customsearch/v1?key=${SEARCH_API_KEY}&cx=163cac5c633fb4ee1&num=5`;

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

// app.post("/search", async (req, res) => {
//   const query = req.body.query;
//   if (!query) {
//     return res.status(400).send("Query is required");
//   }

//   const searchUri = `${customSearchUri}&q=${encodeURIComponent(query)}`;
//   try {
//     const response = await fetch(searchUri);
//     const data = await response.json();
//     const itemTitles = data.items.map((item) => item.title);
//     res.json(itemTitles);
//   } catch (error) {
//     console.log("Error fetching data", error);
//     res.status(500).send("Error fetching data");
//   }
// });

app.post("/search", async (req, res) => {
  const query = req.body.query;
  if (!query) {
    return res.status(400).send("Query is required");
  }

  try {
    const items = await Item.find({ title: new RegExp(query, "i") })
      .limit(10)
      .select("title");
    const itemTitles = items.map((item) => item.title);
    res.json(itemTitles);
  } catch (error) {
    console.log("Error fetching data", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
