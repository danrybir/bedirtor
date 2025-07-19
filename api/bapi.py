from flask import Flask

app = Flask(__name__)

@app.route('/api/')
def home():
  return 'Hello, World!'

@app.route('/api/ai-endpoint')
def ai_endpoint():
  return 'TODO'