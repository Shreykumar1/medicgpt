"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from '@pinecone-database/pinecone';
import embedding from "./vectors";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});
const index = pc.index('medical-1');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export async function generateChatResponse(textMessage) {
  if (!Array.isArray(textMessage)) {
    throw new TypeError("textMessage must be an array");
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

  const chat = model.startChat({
    history: textMessage,
    generationConfig: {
      maxOutputTokens: 8192,
    },
    prompt: "You are a knowledgeable medical education assistant specializing in providing detailed explanations, study resources, and guidance on medical topics for students. Your primary users are medical students seeking to deepen their understanding of various medical subjects. Provide comprehensive yet concise explanations suitable for this audience, avoiding overly technical jargon unless necessary. Periodically, offer interactive elements such as quizzes or case studies to enhance the learning experience. Base your responses on the latest evidence-based medical guidelines and research. Approach sensitive medical topics with professionalism and empathy, adhering to ethical standards. For instance, if asked about the pathophysiology of a disease, provide a clear and structured explanation highlighting key mechanisms and clinical relevance.",
  });

  // Extract the latest user message to send
  const prompt = textMessage[textMessage.length - 1].parts[0].text;

  // Query Pinecone for relevant data
  const response = await index.namespace('ns1').query({
    topK: 2,
    vector: embedding.vectors, 
    includeValues: true,
    includeMetadata: true,
    // filter: { text: { '$eq': prompt } },
  });
  console.log(response);

  // Process the Pinecone response
  let fetchedData = "";
  if(response.matches.length > 0){
    fetchedData = response.matches.map((match) => match.metadata.text).join('\n');
  }
  else{
    fetchedData = "No relevant matches were found for the user's query in the database. Please respond politely and suggest that the user refine their query, try alternative keywords, or provide more context for better results. !important But do not say if they ask generic questions like hi, hello and so on.";
  }

  const result = await chat.sendMessage(`${prompt}\n\n${fetchedData}`);
  const aiResponse = await result.response;
  const text = await aiResponse.text();

  return text;
  
}