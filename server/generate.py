from flask import Flask
from infer import infer
from nn_def import *

app = Flask(__name__)

@app.route('/<name>')
def hello_name(name):
   names_gen = infer(name)
   text = ','.join(names_gen)
   return text

if __name__ == '__main__':
    app.run(debug=True)