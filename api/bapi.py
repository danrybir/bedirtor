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
    response = requests.get("https://api.github.com/users/octocat")
    response.raise_for_status() # Raise an exception for HTTP errors
    data = response.json()
    return f"The token is: {pollai_token[:7]}... and Octocat's name is {data.get('name', 'N/A')}"
  except requests.exceptions.RequestException as e:
    return f"Error making request: {e}"