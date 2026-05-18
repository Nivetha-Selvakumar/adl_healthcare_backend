import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
import os

print("Loading dataset...")

# Load dataset
print("Loading dataset...")
df = pd.read_csv("symptom_dataset.csv")

# Use a larger sample for better accuracy
df = df.sample(n=100000, random_state=42)

print(f"Dataset loaded: {df.shape}")

# Features
X = df.drop("diseases", axis=1)

# Target
y = df["diseases"]

print("Training model...")

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train model (Higher complexity for better accuracy)
model = RandomForestClassifier(
    n_estimators=50,
    max_depth=25,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

print("Model trained")

# Accuracy
accuracy = model.score(X_test, y_test)

print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Create model folder
os.makedirs("model", exist_ok=True)

# Save model
joblib.dump(model, "model/model.pkl")

# Save feature names
joblib.dump(X.columns.tolist(), "model/features.pkl")

print("AI Model Trained Successfully")