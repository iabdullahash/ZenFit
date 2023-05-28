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
    if gender == 'male':
        bmr = MALE_CONSTANT + (WEIGHT_MULTIPLIER * weight_kg) + (HEIGHT_MULTIPLIER * height) - (AGE_MULTIPLIER * age)
    elif gender == 'female':
        bmr = FEMALE_CONSTANT + (WEIGHT_MULTIPLIER * weight_kg) + (HEIGHT_MULTIPLIER * height) - (AGE_MULTIPLIER * age)

    # Calculate the daily calorie intake based on activity level
    activity_level = 1.2  #(little to no exercise)
    calorie_intake = bmr * activity_level

    return int(calorie_intake)

# print(calculate_calorie_intake("male",19,168,{"amount":58,"unit":'kg'}))