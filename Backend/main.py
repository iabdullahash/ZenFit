from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

#--------------------------------------------------- MAIN JSON SAVE/LOAD ---------------------------------------------------

def load_data():
    with open('database.json', 'r') as file:
        data = json.load(file)
    return data

def save_data(data):
    with open('database.json', 'w') as file:
        json.dump(data, file, indent=4)



#--------------------------------------------------- LOGIN ---------------------------------------------------

@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    data = load_data()
    users = data.get('users', [])

    for user in users:
        if user['email'] == email:
            if user['password'] == password:
                # Successful login
                return jsonify({'message': 'Login Successful'})
            else:
                return jsonify({'message': 'Invalid Password'}), 401    
        else:
            return jsonify({'message': 'E-mail does not exist'}), 401
            
    # Failed login
    return jsonify({'message': 'Invalid email or password'}), 401




#--------------------------------------------------- SIGN-UP ---------------------------------------------------
@app.route('/api/signup', methods=['POST'])
def signup():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

    data = load_data()
    users = data.get('users', [])

    # Check if the email is already registered
    for user in users:
        if user['email'] == email:
            return jsonify({'message': 'Email already exists'}), 400

    # Create a new user and add it to the database
    new_user = {'name':name,'email': email, 'password': password}
    users.append(new_user)
    data['users'] = users
    save_data(data)

    return jsonify({'message': 'Signup successful'})







if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
