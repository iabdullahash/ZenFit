def calculate_calorie_intake(gender,age, height, weight):
    # Constants for the Harris-Benedict equation
    MALE_CONSTANT = 66.47
    FEMALE_CONSTANT = 655.1
    WEIGHT_MULTIPLIER = 13.75
    HEIGHT_MULTIPLIER = 5.003
    AGE_MULTIPLIER = 6.755

    if weight["unit"] == 'lbs':
        weight_kg = weight['amount'] * 0.45359237
    else:
        weight_kg = weight["amount"]
    
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

def calculate_calories_goal(weight,height,gender,steps):

    if weight["unit"] == 'lbs':
        weight_kg = weight['amount'] * 0.45359237
    else:
        weight_kg = weight["amount"]

    if gender == 'Male':
        height_cm = height
        stride_length = height_cm * 0.415
        distance_km = (int(steps) * stride_length) / 100000
        calories_burned = 0.035 * float(weight_kg) * distance_km 
        return calories_burned
        
    elif gender == 'Female':
        height_cm = height
        stride_length = height_cm * 0.413
        distance_km = (int(steps) * stride_length) / 100000
        calories_burned = 0.035 * float(weight_kg) * distance_km 
        return calories_burned


def calculate_steps_to_burn_calories(weight, height,gender, calorie_burn_goal):
    if weight["unit"] == 'lbs':
        weight_kg = weight['amount'] * 0.45359237
    else:
        weight_kg = weight["amount"]

   
    if gender == 'Male':
        height_cm = height
        stride_length = height_cm * 0.415 
        distance_km = float(calorie_burn_goal) / (0.035 * float(weight_kg))
        steps = (distance_km * 100000) / stride_length
        return steps
        
    elif gender == 'Female':
        height_cm = height
        stride_length = height_cm * 0.415 
        distance_km = float(calorie_burn_goal) / (0.035 * float(weight_kg))
        steps = (distance_km * 100000) / stride_length
        return steps


# print(calculate_steps_to_burn_calories({"amount":58,"unit":'lbs'},150,'Male',"500"))

# def calculate_steps_to_burn_calories(weight, height, calorie_burn_goal):
#     weight_kg = weight * 0.4536  # Convert weight from pounds to kilograms
#     height_cm = height * 2.54  # Convert height from inches to centimeters

#     stride_length = height_cm * 0.415  # Calculate stride length for men

#     distance_km = calorie_burn_goal / (0.035 * weight_kg)  # Calculate distance in kilometers

#     steps = (distance_km * 100000) / stride_length  # Calculate steps required

#     return int(steps)  # Convert steps to an integer

# # Example usage
# weight = 160  # Weight in pounds
# height = 70  # Height in inches
# calorie_burn_goal = 100  # Target calorie burn goal

# steps_needed = calculate_steps_to_burn_calories(weight, height, calorie_burn_goal)
# print(f"Steps needed to burn {calorie_burn_goal} calories: {steps_needed} steps")

# def calculate_calories_burned(weight, height, steps):
#     weight_kg = weight * 0.4536  # Convert weight from pounds to kilograms
#     height_cm = height * 2.54  # Convert height from inches to centimeters
    
#     stride_length = height_cm * 0.415  # Calculate stride length for men
    
#     distance_km = (steps * stride_length) / 100000  # Calculate distance covered in kilometers
    
#     calories_burned = 0.035 * weight_kg * distance_km  # Estimate calories burned
    
#     return calories_burned


# weight = 160  # Weight in pounds
# height = 70  # Height in inches
# steps = 10000  # Number of steps

# calories = calculate_calories_burned(weight, height, steps)
# print(f"Estimated calories burned: {calories} kcal")

