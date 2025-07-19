from flask import Flask
import os

app = Flask(__name__)

@app.route('/api/')
def home():
  return 'Hello, World!'

@app.route('/api/ai-endpoint')
def ai_endpoint():
  pollai_token = os.environ.get('POLLAI_TOKEN')
  return f"The token is: {pollai_token}"