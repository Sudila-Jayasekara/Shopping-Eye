# sample_data.py

# Sample Data
data = [
    {"issue": "Screen not working", "solution": "Replace the screen"},
    {"issue": "Battery not charging", "solution": "Replace the battery"},
    {"issue": "Phone overheating", "solution": "Check for app issues"},
    {"issue": "Camera not working", "solution": "Replace the camera module"},
    {"issue": "Speaker not working", "solution": "Replace the speaker"},
]

# Function to split data into issues and solutions
def get_issues_and_solutions():
    issues = [item['issue'] for item in data]
    solutions = [item['solution'] for item in data]
    return issues, solutions
