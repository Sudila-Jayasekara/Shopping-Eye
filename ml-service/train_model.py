# train_model.py

import os
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sample_data import get_issues_and_solutions

# Set environment variable (if needed for compatibility)
os.environ['MATCH_MANIFEST_VERSIONS'] = 'false'

# Get issues and solutions from sample_data
issues, solutions = get_issues_and_solutions()

# Create a pipeline with TfidfVectorizer and LogisticRegression
model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', LogisticRegression())
])

# Train the model
model.fit(issues, solutions)

# Save the trained model to disk
joblib.dump(model, 'model.pkl')

print("Model trained and saved successfully as model.pkl")
