import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Replace with your actual API key
genai.configure(api_key=os.getenv('GEMINI_API_KEY')) 

def embed_text(prompt):
    """
    Embeds the given text using the specified model.

    Args:
        prompt (str): The text to embed.

    Returns:
        dict: The embedding result.
    """
    embedding_text = genai.embed_content(model="models/text-embedding-004", content=prompt)
    return embedding_text 