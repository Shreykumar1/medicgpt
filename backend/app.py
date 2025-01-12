# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import generate_chat_response

app = Flask(__name__)
CORS(app)

@app.route('/generate-response', methods=['POST'])
def generate_response():
    data = request.json
    print("data", data)
    print("data['textMessage']", data['textMessage'])
    # text_message = data.get('textMessage', [])
    text_message = data['textMessage']
    
    try:
        response = generate_chat_response(text_message)
        return jsonify({"response": response}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)