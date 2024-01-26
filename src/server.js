const express = require("express");
const axios = require("axios");
const path = require("path");
// Import the cors module
const cors = require("cors"); 

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/launches", async (req, res) => {
  try {
    const response = await axios.get("https://api.spacexdata.com/v3/launches", {
      params: req.query,
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);

    // Send an error response in JSON format
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.get("/", (req, res) => {
  // Send the HTML file when the root URL is accessed
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
