from flask import Flask
import os
import requests

app = Flask(__name__)

@app.route('/api/')
def home():
  return 'Hello, World!'

@app.route('/api/ai-endpoint')
def ai_endpoint():
  pollai_token = os.environ.get('POLLAI_TOKEN')
  try:
    response = requests.post(
      'https://text.pollinations.ai/openai',
      headers={
        'Content-Type': 'application/json',
        'Authentication': 'Bearer {pollai_token}'
      },
      json={
        'model': 'gpt-4o-mini',
        'messages': [
          { 'role': 'system', 'content': 'You are a helpful assistant.' },
          { 'role': 'user', 'content': 'In two sentences, what is your guess on what Bedirtor means? This is in English, not French or anything.' }
        ],
        'temperature': 0.9,
        'private': True,
      }
    )
    response.raise_for_status()  # Raise an exception for HTTP errors
    data = response.json().get('choices', [{}])[0].get('message', {}).get('content', 'N/A')
    return f'The token was removed for privacy reasons<br>{data}'
  except requests.exceptions.RequestException as e:
    return f'Error making request: {e}'