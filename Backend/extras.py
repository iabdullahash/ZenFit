def calculate_calorie_intake(gender,age, height, weight):
    # Constants for the Harris-Benedict equation
    MALE_CONSTANT = 66.47
    FEMALE_CONSTANT = 655.1
    WEIGHT_MULTIPLIER = 13.75
    HEIGHT_MULTIPLIER = 5.003
    AGE_MULTIPLIER = 6.755

    if weight["unit"] == 'lbs':
        weight_kg = float(weight['amount']) * 0.45359237
    else:
        weight_kg = float(weight["amount"])
    
    # Calculate the BMR (Basal Metabolic Rate)
    bmr = 0
    if gender == 'Male':
        bmr = MALE_CONSTANT + (WEIGHT_MULTIPLIER * float(weight_kg)) + (HEIGHT_MULTIPLIER * height) - (AGE_MULTIPLIER * age)
    elif gender == 'Female':
        bmr = FEMALE_CONSTANT + (WEIGHT_MULTIPLIER * float(weight_kg)) + (HEIGHT_MULTIPLIER * height) - (AGE_MULTIPLIER * age)

    # Calculate the daily calorie intake based on activity level
    activity_level = 1.2  #(little to no exercise)
    calorie_intake = bmr * activity_level

    return int(calorie_intake)

# print(calculate_calorie_intake("Male",19,168,{"amount":58,"unit":'lbs'}))

def calculate_calories_goal(weight,steps):
    MET = 3.5

    if weight["unit"] == 'lbs':
        weight_kg = weight['amount'] * 0.45359237
    else:
        weight_kg = weight["amount"]

    duration_hours = (int(steps) / 1600)
    calories_burned = MET * float(weight_kg) * duration_hours
    return calories_burned
    





def calculate_steps_to_burn_calories(weight, calorie_burn_goal):

    MET = 3.5

    if weight["unit"] == 'lbs':
        weight_kg = weight['amount'] * 0.45359237
    else:
        weight_kg = weight["amount"]

    steps = (1600*float(calorie_burn_goal)/(MET*float(weight_kg)))
    return steps
    


