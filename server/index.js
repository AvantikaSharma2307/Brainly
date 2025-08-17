import express from "express";
import multer from "multer";
import fs from "fs";
import mammoth from "mammoth";
import bodyParser from "body-parser";
import cors from "cors";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5174" }));

// Summarize endpoint
app.post("/summarize", upload.single("file"), async (req, res) => {
  try {
    let fileContent = "";

    if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // Handle DOCX
      const result = await mammoth.extractRawText({ path: req.file.path });
      fileContent = result.value;
    } else {
      // Assume plain text
      fileContent = fs.readFileSync(req.file.path, "utf-8");
    }

    // Call Groq SDK
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Summarize this meeting transcript:\n\n${fileContent}`,
        },
      ],
      max_completion_tokens: 500,
      temperature: 0.3,
    });

    const summary = completion.choices[0]?.message?.content || "No summary generated.";
    res.json({ summary });
  } catch (error) {
    console.error("Summarization error:", error);
    res
      .status(500)
      .json({ error: "Summarization failed", details: error.message });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
