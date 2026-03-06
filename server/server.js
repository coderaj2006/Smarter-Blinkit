require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY in .env file");
    process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

app.post("/ai-intent", async (req, res) => {

    const query = req.body.query;

    try {

        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content:
                                "Extract grocery items from the request and return only item names separated by commas."
                        },
                        {
                            role: "user",
                            content: query
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        const result =
    data?.choices?.[0]?.message?.content || "";

        res.json({ items: result });

    } catch (error) {

        console.error(error);
        res.status(500).send("AI error");

    }

});

app.listen(3000, () => {
    console.log("AI server running on port 3000");
});