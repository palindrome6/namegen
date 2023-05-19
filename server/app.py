from flask import Flask
from flask import request;
from flask_cors import CORS, cross_origin
import torch.nn as nn
from infer import FlattenConsecutive, BatchNorm1d, infer
# ------------------------
import __main__


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=['GET'])
@cross_origin() 
def hello():
   __main__.FlattenConsecutive = FlattenConsecutive
   __main__.BatchNorm1d = BatchNorm1d
   
   prompt = request.args.get('name')
   if prompt is None:
      prompt = ''
   names_gen = infer(prompt)
   text = ','.join(names_gen)
   # print(text)
   return text

if __name__ == '__main__':
   app.run(debug=True)