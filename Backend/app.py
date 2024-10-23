from flask import Flask, render_template
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from API.api import api  # import Blueprint จาก api.py

app = Flask(__name__, 
            template_folder='../Frontend/templates',
            static_folder='../Frontend/static',
            )

# register Blueprint จาก API
app.register_blueprint(api)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
