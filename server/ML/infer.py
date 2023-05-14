from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential
from azureml.core import Workspace
import json
import mlflow
import random
import torch
import torch.nn.functional as F
import matplotlib.pyplot as plt
import datetime
import torch.nn as nn
import torch.optim as optim
from mlflow.entities import Metric
from mlflow.tracking import MlflowClient
import time
import logging
from nn_def import FlattenConsecutive, BatchNorm1d

# -------------------------
words = open('data/names.txt').read().split()

chars = sorted(list(set(''.join(words))))
ch_to_i = {s: i+1 for i, s in enumerate(chars)}
ch_to_i['.'] = 0
i_to_ch = {i: s for s, i in ch_to_i.items()}
vocab_size = len(i_to_ch)

# -------------------------
block_size = 8
torch.manual_seed(42);
random.seed(42)

random.shuffle(words)
n1 = int(0.9*len(words))
n2 = int(0.98*len(words))

def build_dataset(words):
    
    X, Y = [], []

    for w in words:
 
        context = [0] * block_size
        for ch in w + '.':
            ix = ch_to_i[ch]
            X.append(context)
            Y.append(ix)
            
            context = context[1:] + [ix]

    X = torch.tensor(X)
    Y = torch.tensor(Y)

    return X, Y

X_tr, y_tr = build_dataset(words[:n1])
X_dev, y_dev = build_dataset(words[n1:n2])
X_te, y_te = build_dataset(words[n2:])

# -------------------------

model3 = torch.load('models/2023-05-13 215634.pt')
for layer in model3:
    layer.training = False
model3.eval()

@torch.no_grad() # this decorator disables gradient tracking inside pytorch
def split_loss_inf(split):
  x,y = {
    'train': (X_tr, y_tr),
    'val': (X_dev, y_dev),
    'test': (X_te, y_te),
  }[split]
  logits = model3(x)
  loss = F.cross_entropy(logits, y)
  return loss

loss_tr_inf = split_loss_inf('train')
loss_val_inf = split_loss_inf('val')
print(loss_tr_inf)
print(loss_val_inf)

# sample from the model
with torch.no_grad():
  for _ in range(20):
      
      out = []
      context = [0] * block_size # initialize with all ...
      while True:
        # forward pass the neural net
        logits = model3(torch.tensor([context]))
        probs = F.softmax(logits, dim=1)
        # sample from the distribution
        ix = torch.multinomial(probs, num_samples=1).item()
        # shift the context window and track the samples
        context = context[1:] + [ix]
        out.append(ix)
        # if we sample the special '.' token, break
        if ix == 0:
          break
      
      print(''.join(i_to_ch[i] for i in out)) # decode and print the generated word


# -------------------------

