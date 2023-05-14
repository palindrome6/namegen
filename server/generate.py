from flask import Flask
from flask import request;
from flask_cors import CORS, cross_origin
from infer import infer
from nn_def import *

app = Flask(__name__)

@app.route('/generatename', methods=['GET'])
@cross_origin() 
def hello_name():
   prompt = request.args.get('name')
   names_gen = infer(prompt)
   text = ','.join(names_gen)
   print(text)
   return text

if __name__ == '__main__':
    app.run(debug=True)