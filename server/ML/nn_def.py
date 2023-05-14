import torch
import torch.nn.functional as F
import matplotlib.pyplot as plt
import datetime
import torch.nn as nn
import torch.optim as optim
import random


block_size = 8
n_embd = 12
n_hidden = 64
torch.manual_seed(42);
random.seed(42)

words = open('data/names.txt').read().split()

chars = sorted(list(set(''.join(words))))
ch_to_i = {s: i+1 for i, s in enumerate(chars)}
ch_to_i['.'] = 0
i_to_ch = {i: s for s, i in ch_to_i.items()}
vocab_size = len(i_to_ch)


class FlattenConsecutive(nn.Module):

  def __init__(self, n):
    super().__init__()
    self.n = n
    
  def __call__(self, x):
    B, T, C = x.shape
    x = x.view(B, T//self.n, C*self.n)
    if x.shape[1] == 1:
      x = x.squeeze(1)
    self.out = x
    return self.out
  

class BatchNorm1d(nn.Module):
  
  def __init__(self, dim, eps=1e-5, momentum=0.1):
    super().__init__()
    self.eps = eps
    self.momentum = momentum
    self.training = True
    # parameters (trained with backprop)
    self.gamma = torch.ones(dim)
    self.beta = torch.zeros(dim)
    # buffers (trained with a running 'momentum update')
    self.running_mean = torch.zeros(dim)
    self.running_var = torch.ones(dim)
  
  def __call__(self, x):
    # calculate the forward pass
    if self.training:
      if x.ndim == 2:
        dim = 0
      elif x.ndim == 3:
        dim = (0,1)
      xmean = x.mean(dim, keepdim=True) # batch mean
      xvar = x.var(dim, keepdim=True) # batch variance
    else:
      xmean = self.running_mean
      xvar = self.running_var
    xhat = (x - xmean) / torch.sqrt(xvar + self.eps) # normalize to unit variance
    self.out = self.gamma * xhat + self.beta
    # update the buffers
    if self.training:
      with torch.no_grad():
        self.running_mean = (1 - self.momentum) * self.running_mean + self.momentum * xmean
        self.running_var = (1 - self.momentum) * self.running_var + self.momentum * xvar
    return self.out
  
  def parameters(self):
    return [self.gamma, self.beta]
  

# -------------------------
model = nn.Sequential(
    nn.Embedding(vocab_size, n_embd),
    FlattenConsecutive(2), 
    nn.Linear(n_embd * 2, n_hidden, bias=False), 
    BatchNorm1d(n_hidden), 
    nn.Tanh(),
    FlattenConsecutive(2), 
    nn.Linear(n_hidden * 2, n_hidden, bias=False), 
    BatchNorm1d(n_hidden), 
    nn.Tanh(),
    FlattenConsecutive(2), 
    nn.Linear(n_hidden * 2, n_hidden, bias=False), 
    BatchNorm1d(n_hidden), 
    nn.Tanh(),
    nn.Linear(n_hidden, vocab_size)
)