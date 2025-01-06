// Install the necessary library before running the script:
// npm install @google/generative-ai

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Replace with your input JSON file path
const inputFilePath = "./reduced_dataset1.json";
const outputFilePath = "./output_embeddings2.json";

// Function to create embeddings and include metadata
async function processTextMessages() {
  try {
    // Read the input JSON file
    const inputData = JSON.parse(fs.readFileSync(inputFilePath, "utf-8"));

    if (!Array.isArray(inputData)) {
      throw new Error("Input JSON must be an array of objects with {id, text}.");
    }

    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    // Check if output file exists, create it if not
    if (!fs.existsSync(outputFilePath)) {
      fs.writeFileSync(outputFilePath, JSON.stringify([]), "utf-8");
    }

    let responses = [];

    for (let i = 0; i < inputData.length; i++) {
      const item = inputData[i];

      if (!item.id || !item.text) {
        throw new Error("Each item in the JSON must have 'id' and 'text' properties.");
      }

      console.log(`Processing text for ID: ${item.id}`);

      // Generate embedding
      
      const embedding = await model.embedContent(item.text);
    //   console.log(embedding);

      if (!embedding) {
        throw new Error(`Failed to generate embedding for ID: ${item.id}`);
      }

      // Add the embedding and metadata
      responses.push({
        id: item.id,
        values: embedding.embedding.values, // Store the actual embedding values
        metadata: {
          text: item.text, // Include the original text as metadata
        },
      });
    //   console.log(responses);
      

      // Write to file every 50 responses
      if (responses.length >= 50 || i === inputData.length - 1) {
        const existingData = JSON.parse(fs.readFileSync(outputFilePath, "utf-8"));
        fs.writeFileSync(outputFilePath, JSON.stringify(existingData.concat(responses), null, 2), "utf-8");
        console.log(`Added ${responses.length} responses to ${outputFilePath}`);
        responses = []; // Clear the batch
      }
    }

    console.log(`All data processed and saved to ${outputFilePath}`);
  } catch (error) {
    console.error("Error processing text messages:", error.message);
  }
}

processTextMessages();
