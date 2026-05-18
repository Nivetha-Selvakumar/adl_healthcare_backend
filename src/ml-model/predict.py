from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load trained model
model = joblib.load("model/model.pkl")

# Load feature names
features = joblib.load("model/features.pkl")

@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.json

        symptoms = data.get("symptoms", [])

        # Create empty symptom vector
        symptom_data = {}

        for feature in features:
            symptom_data[feature] = 0

        # Mark symptoms as present
        matched_symptoms = []
        for symptom in symptoms:

            symptom = symptom.lower().strip()

            if symptom in symptom_data:
                symptom_data[symptom] = 1
                matched_symptoms.append(symptom)

        # Convert to DataFrame
        input_data = pd.DataFrame([symptom_data])

        # Predict disease
        prediction = model.predict(input_data)[0]

        # Prediction confidence
        probabilities = model.predict_proba(input_data)[0]

        confidence = round(max(probabilities) * 100, 2)

        # Emergency detection
        emergency = False

        emergency_keywords = [
            "chest pain",
            "difficulty breathing",
            "unconsciousness",
            "seizures"
        ]

        for symptom in symptoms:
            if symptom.lower() in emergency_keywords:
                emergency = True

        return jsonify({
            "predicted_disease": prediction,
            "confidence": f"{confidence}%",
            "emergency": emergency,
            "input_symptoms": symptoms
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        })


if __name__ == "__main__":
    app.run(port=8000, debug=True)