from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    # Implement your login logic here


@app.route('/api/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')
    # Implement your signup logic here


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
