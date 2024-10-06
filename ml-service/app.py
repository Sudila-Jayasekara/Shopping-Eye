import os
os.environ['MATCH_MANIFEST_VERSIONS'] = 'false'
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load the pre-trained model
model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    issue = data.get('issue')
    
    # Predict the solution based on the issue
    solution = model.predict([issue])[0]
    
    return jsonify({'solution': solution})

if __name__ == '__main__':
    app.run(debug=True)
