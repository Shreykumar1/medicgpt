# backend/utils.py
import os
from dotenv import load_dotenv
import google.generativeai as genai
from pinecone import Pinecone
from embedding_utils import embed_text  # Import the new function

# Load environment variables from .env file
load_dotenv()

# Configure Google Generative AI
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# Initialize Pinecone
pc = Pinecone(api_key=os.getenv('PINECONE_API_KEY'))
index = pc.Index(os.getenv('PINECONE_INDEX'))   

# Create the model configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
)

def generate_chat_response(text_message):
    # if not isinstance(text_message, list):
    #     raise TypeError("textMessage must be an array")

    chat_session = model.start_chat(history=[
        {"role": "user", "parts": { "text": text_message}},
        # {"role": "model", "content": "Initial model response"}
    ])

    prompt = text_message
    print("prompt", prompt)
    greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "good day"]
    
    if prompt in greetings:
        return "Hello! How can I assist you today?"

    embedding_result = embed_text(prompt)
    # print(embedding_result)
    vec_array = embedding_result['embedding'] if 'embedding' in embedding_result else []

    response = index.query(
        namespace= "ns1",
        top_k=5,
        vector=vec_array,
        include_values=True,
        include_metadata=True,
    )

    fetched_data = "\n".join(match.metadata['text'] for match in response.matches) if response.matches else "No relevant matches found."

    response = chat_session.send_message(f"Use headings in your answer. Question: {prompt}\n\n Context: {fetched_data}")
    return response.text