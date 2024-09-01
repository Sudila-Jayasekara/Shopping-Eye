from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)


model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    issue = data.get('issue')
    
 
    solution = model.predict([issue])[0]
    
    return jsonify({'solution': solution})

if __name__ == '__main__':
    app.run(debug=True)
