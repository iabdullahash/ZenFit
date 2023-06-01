from flask import Flask, jsonify, request
from extras import calculate_calorie_intake,calculate_steps_to_burn_calories,calculate_calories_goal
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
    calorie_intake = calculate_calorie_intake(gender, int(age), int(height), weight)
    goals = {"requiredCalories": calorie_intake, "dailyStepsGoal": 10000, "dailyCalorieBurnGoal": 880}
    new_user = {'name':name,'email': email, 'password': password,'gender':gender ,"weight": weight,"height": int(height),'age': int(age),'goals': goals,"googleAuthKey":'',"meals": {"breakfast":[],"lunch":[],"dinner":[],"snacks":[]}}
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

#--------------------------------------Personael Info Change--------------------------------

@app.route("/api/info_chg",methods=['GET','POST'])
def info_chg():
    user_email = request.json.get('user_email')
    user_name = request.json.get('name_chg')
    user_new_email = request.json.get('email_chg')
    user_age = request.json.get('age_chg')
    user_height = request.json.get('height_chg')
    user_weight = request.json.get('weight_chg')

    data = load_data()
    users = data.get('users', [])

    for user in users :
        if user['email'] == user_email:
            upd_user = user
            user['name'] = user_name
            user['email'] = user_new_email
            user['age'] = int(user_age)
            user['height'] = int(user_height)
            user['weight']['amount'] = user_weight

            data['users'] = users
            save_data(data)
            
    return jsonify({'message': 'Goals Changed Successfully','result': upd_user}) 
    





@app.route('/api/meals', methods=['GET','POST'])
def get_meals():
    email = request.json.get('email')

    data = load_data()
    users = data.get('users', [])

    for user in users:
        if user['email'] == email:
            return jsonify(user['meals'])


@app.route('/api/add_meal', methods=['POST'])
def add_meal():
    email = request.json.get('email')
    mealType = request.json.get('mealType').lower()
    mealItem = request.json.get('foodItem')
    quantity = request.json.get('quantity')
    print(mealType)
    print(mealItem)
    

    data = load_data()
    users = data.get('users', [])

    item = {'info': mealItem,'quantity':int(quantity)}

    for user in users:
        if user['email'] == email:
            user['meals'][mealType].append(item)
            break

    data['users'] = users
    save_data(data)
    return jsonify({"message": "Meal added successfully"})



@app.route('/api/delete_meal', methods=['POST'])
def delete_meal():
    email = request.json.get('email')
    mealType = request.json.get('mealType').lower()
    mealItem = request.json.get('mealItem')
    index = request.json.get('index')

    data = load_data()
    users = data.get('users', [])

    try:
        for user in users:
            if user['email'] == email:
                del user['meals'][mealType][int(index)]
                break
    except IndexError:
        return jsonify({"message": "Invalid index"})

    data['users'] = users
    save_data(data)
    return jsonify({"message": "Meal deleted successfully"})


#--------------------------------------Password Change--------------------------------

@app.route("/api/pass_chg",methods=['GET','POST'])
def pass_chg():
    user_email = request.json.get('user_email')
    old = request.json.get('old_password')
    new = request.json.get('new_password')
    confirm = request.json.get('confirm_password')

    data = load_data()
    users = data.get('users', [])
  
    for user in users :
        if user['email'] == user_email:
           
            if user['password'] == old:
             
                if new == confirm:
                   

                    user['password'] = new
                    data['users'] = users
                    save_data(data)
                                
                    return jsonify({'message': 'Password changed successfully'})

                else:
                    return jsonify({'Error': 'Password not same'}) ,404
            else:
                return jsonify({'Error': 'Incorrect Old Password'}) ,404
                

    
#--------------------------------------Goal Change--------------------------------

@app.route("/api/calories_goal_chg",methods=['GET','POST'])
def calories_goal_chg():
    user_email = request.json.get('user_email')
    cal_chg = request.json.get('calories_chg')
    step_chg = request.json.get('steps_chg')
    
    data = load_data()
    users = data.get('users', [])

    for user in users :

        if user['email'] == user_email:
            upd_user = user
            if user["goals"]["dailyStepsGoal"] != int(step_chg):
                upd_cal = calculate_calories_goal(user['weight'],step_chg)

                user["goals"]["dailyStepsGoal"] = int(step_chg)
                user["goals"]["dailyCalorieBurnGoal"] = int(upd_cal)

                data['users'] = users 
                save_data(data) 
                
                

            elif user["goals"]["dailyCalorieBurnGoal"] != int(cal_chg):   
                upd_steps = calculate_steps_to_burn_calories(user['weight'],cal_chg)

                user["goals"]["dailyStepsGoal"] = int(upd_steps)
                user["goals"]["dailyCalorieBurnGoal"] = int(cal_chg)

                data['users'] = users 
                save_data(data) 
                
    return jsonify({'message': 'Goals Changed Successfully','result': upd_user}) 
                   
            


            


                




if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
