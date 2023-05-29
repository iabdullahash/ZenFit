from flask import Flask, jsonify, request
from extras import calculate_calorie_intake
import json

app = Flask(__name__)


#--------------------------------------------------- MAIN JSON SAVE/LOAD ---------------------------------------------------

def load_data():
    with open('database.json', 'r') as file:
        data = json.load(file)
    return data

def save_data(data):
    with open('database.json', 'w') as file:
        json.dump(data, file, indent=4)



#--------------------------------------------------- LOGIN ---------------------------------------------------

@app.route('/api/login', methods=['GET','POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    
    data = load_data()
    users = data.get('users', [])

    for user in users:
        if user['email'] == email:
            if user['password'] == password:
                # Successful login
                return jsonify({'message': 'Login Successful','result': user})
            else:
                return jsonify({'message': 'Invalid Password'}), 401    
        
            
    return jsonify({'message': 'Email does not exist'}), 401        
    # Failed login
    return jsonify({'message': 'Invalid email or password'}), 401




#--------------------------------------------------- SIGN-UP ---------------------------------------------------
@app.route('/api/signup', methods=['POST'])
def signup():
    details = request.json.get('data')
    name = details['name']
    email = details['email']
    password = details['password']
    gender = details['gender']
    age = details['age']
    height = details['height']
    weight = details['weight']

    data = load_data()
    users = data.get('users', [])

    # Check if the email is already registered
    for user in users:
        if user['email'] == email:
            return jsonify({'message': 'Email already exists'}), 400

    # Create a new user and add it to the database
    calorie_intake = calculate_calorie_intake(gender, age, height, weight)
    goals = {"requiredCalories": calorie_intake, "dailyStepsGoal": 10000, "dailyCalorieBurnGoal": 880}
    new_user = {'name':name,'email': email, 'password': password,"weight": weight,"height": height,'age': age,'goals': goals,"googleAuthKey":'',"activity":{}}
    users.append(new_user)
    data['users'] = users
    save_data(data)

    return jsonify({'message': 'Signup successful'})


@app.route("/test",methods=["GET"])
def test():
    data = request.json.get('data')
    print(data)

@app.route("/api/meal_plans", methods=["GET"])
def get_meal_plans():
    
    data = load_data()
    meal_plans = data["mealPlans"]

    return jsonify(meal_plans)

@app.route("/api/workout_plans", methods=["GET"])
def get_workout_plans():

    data = load_data()
    workout_plans = data["workoutPlans"]

    return jsonify(workout_plans)


#--------------------------------------Password Change--------------------------------

@app.route("/api/pass_chg",methods=['GET','POST'])
def pass_chg():
    old = request.json.get('old_password')
    new = request.json.get('new_password')
    confirm = request.json.get('confirm_password')

    data = load_data()
    users = data.get('users', [])

    for user in users :
        if user['email'] == "yourdaddy257@gmail.com":
            if user['password'] == old:
                if new == confirm:

                    user['password'] = new
                    save_data(user)
                                
                    return jsonify({'message': 'Password changed successfully'})

                else:
                    return jsonify({'Error': 'Password not same'}) ,404
            else:
                return jsonify({'Error': 'Incorrect Old Password'}) ,404
                

    

            
                




if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
