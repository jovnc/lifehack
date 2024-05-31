# app.py
from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)

# Load the model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json

    availableIngredients = ['Anchovy', 'Bacon', 'Beef', 'Carrot', 'Chicken', 'Egg', 'Green Onion', 'Green Peas', 'Ham', 'Olive', 'Onion', 'Rice', 'Soy Sauce']

    # fllter only those available ingredients
    data = filter(lambda x: x['Ingredient'] in availableIngredients, data)


    df = pd.DataFrame(data)
    df = df[['Month', 'Ingredient']]
    prediction = model.predict(df)

    # add ingredient name to prediction
    prediction_df = pd.DataFrame(prediction)
    prediction_df['Ingredient'] = df['Ingredient']

    # rename column
    prediction_df = prediction_df.rename(columns={0: 'Prediction'})
    return prediction_df.to_json(orient='records')

if __name__ == '__main__':
    app.run(debug=True, port=5000)