const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const port = 8000;
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

dotenv.config();

const MEAN_CLOUD_API_KEY = process.env.API_KEY;
const meaningCloudAPI = "https://api.meaningcloud.com/sentiment-2.1";

// Function to analyze the sentiment
const analyze = async (url, key) => {
  try {
    // Fetch data from the MeaningCloud API
    const response = await fetch(
      `${meaningCloudAPI}?key=${key}&url=${url}&lang=en`
    );

    if (!response.ok) {
      return { code: 500, msg: "Error fetching data from API" };
    }

    const data = await response.json();
    const { code } = data.status;

    // Handle errors based on the response code
    if (code === 100) {
      return handleError(code, "Please enter a valid URL");
    } else if (code === 212) {
      return handleError(code, data.status.msg);
    }

    return successResponse(data, code);
  } catch (error) {
    return { code: 500, msg: "An unexpected error occurred" };
  }
};

// Helper function to handle errors
const handleError = (code, msg) => {
  return { code, msg };
};

// Helper function to prepare a successful response
const successResponse = (data, code) => {
  const { score_tag, agreement, subjectivity, confidence, irony } = data;
  const sample = {
    score_tag,
    agreement,
    subjectivity,
    confidence,
    irony,
  };
  return { sample, status: code };
};

// Route to serve the HTML page
app.get("/", (req, res) => {
  res.render("index.html");
});

// Route to handle the POST request with the URL
app.post("/", async (req, res) => {
  const url = req.body.URI;

  // Call the analyze function with the URL and API key
  const analysis = await analyze(url, MEAN_CLOUD_API_KEY);
  const { code, msg, sample } = analysis;

  // Send errors if result was wrong
  if (code === 212 || code === 100) {
    return res.send({ msg, code });
  }

  return res.send({ sample, code });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});
