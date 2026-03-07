require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
if (!process.env.GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY in .env file");
    process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

app.post("/ai-intent", async (req, res) => {

    const query = req.body.query;

    try {

                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            contents: [
                {
                parts: [
                    {
                    text: `Extract grocery item names from this request and return ONLY a comma-separated list: ${query}`
                    }
                ]
                }
            ]
            })
        }
        );

        const data = await response.json();

        console.log("Full API response:", data);

        const result =
            data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        console.log("AI response:", result);

        res.json({ items: result });

    } catch (error) {

        console.error(error);
        res.status(500).send("AI error");

    }

});

app.listen(3000, () => {
    console.log("AI server running on port 3000");
});