# MedicGPT

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Knowledge Base Enhancement](#knowledge-base-enhancement)
- [Installation](#installation)
- [Usage](#usage)

## Overview

MedicGPT is an advanced web application designed specifically for medical students, providing an interactive AI-driven chatbot that enhances learning and knowledge acquisition. By leveraging state-of-the-art AI capabilities, MedicGPT offers personalized responses and a comprehensive knowledge base derived from medical literature.

## Features

- **Authentication:** Secure user authentication with Clerk.js, including dark/light mode switching.
- **AI Chat:** Integrated with Google’s Gemini-1.5-Flash model for real-time, AI-driven conversations tailored for medical inquiries.
- **Knowledge Base:** Enhanced knowledge base created from medical textbooks, allowing for more informed and contextually relevant responses.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, DaisyUI
- **AI Integration:** Gemini GenAI (Google's Gemini-1.5-Flash model), Pinecone for storing and retrieving embeddings
- **Authentication:** Clerk.js

## Knowledge Base Enhancement

To create a more robust knowledge base for MedicGPT, we implemented the following process:

1. **Text Extraction:** We extracted text from various medical textbooks and literature, ensuring a diverse and comprehensive knowledge base.

2. **Embedding Creation:** The extracted text was processed to create embeddings, which are numerical representations of the text that capture semantic meaning. This allows the chatbot to understand and retrieve relevant information effectively.

3. **Pinecone Integration:** The generated embeddings were stored in Pinecone, a vector database designed for efficient similarity search. This enables quick retrieval of contextually relevant information based on user queries.

4. **Contextual Query Handling:** When a user submits a query, the system retrieves the most relevant embeddings from Pinecone. This contextual information is then combined with the Google model to generate accurate and informative responses, enhancing the overall user experience.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shreykumar1/MedicGPT.git
   cd MedicGPT
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory and add your API keys and other necessary configurations.

4. Run the application:
   ```bash
   npm run dev
   ```

## Usage

- Navigate to `http://localhost:3000` in your web browser to access the application.
- Use the chat feature to interact with the AI, asking questions related to medical topics.

