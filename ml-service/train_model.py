import os
os.environ['MATCH_MANIFEST_VERSIONS'] = 'false'
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

# Sample Data
data = [
    {"issue": "Screen not working", "solution": "Replace the screen"},
    {"issue": "Battery not charging", "solution": "Replace the battery"},
    {"issue": "Phone overheating", "solution": "Check for app issues"},
    {"issue": "Camera not working", "solution": "Replace the camera module"},
    {"issue": "Speaker not working", "solution": "Replace the speaker"},
]

# Split data into issues and solutions
issues = [item['issue'] for item in data]
solutions = [item['solution'] for item in data]

# Create a pipeline with TfidfVectorizer and LogisticRegression
model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', LogisticRegression())
])

# Train the model
model.fit(issues, solutions)

# Save the model to disk
joblib.dump(model, 'model.pkl')
