import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

let app = express();
let port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const response = await axios.get(
    "https://api.jikan.moe/v4/top/anime?filter=favorite"
  );
  const result = response.data.data;
  res.render("index.ejs", { data: result });
});

app.get("/popularity", async (req, res) => {
  const response = await axios.get(
    "https://api.jikan.moe/v4/top/anime?filter=bypopularity"
  );
  const result = response.data.data;
  res.render("index.ejs", { data: result });
});

app.get("/characters",async(req,res)=>{
  const response = await axios.get("https://api.jikan.moe/v4/top/characters")
  const result = response.data.data
  res.render("index.ejs",{data:result})
})

app.get("/random", async (req, res) => {
  try {
    const response = await axios.get("https://api.jikan.moe/v4/random/anime");
    const result = response.data.data;
    console.log(result);
    res.render("random.ejs", { randomdata: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("random.ejs", {
      error: error.message,
    });
  }
});

app.get("/search", async (req, res) => {
  try {
    const query = req.query.search;
    const response = await axios.get(
      "https://api.jikan.moe/v4/anime?q=" + query
    );
    const result = response.data.data;
    console.log(result);
    res.render("index.ejs", { searchdata: result, query });
  } catch (error) {
    console.error("Error fetching anime data:", error);
    res.render("index.ejs", { query: query });
  }
});

app.listen(port, () => {
  console.log("Server is running on port" + port);
});
