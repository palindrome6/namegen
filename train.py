import random
import torch
import torch.nn.functional as F
import matplotlib.pyplot as plt
import datetime
import torch.nn as nn
import torch.optim as optim

# -------------------------
words = open('names.txt').read().split()

chars = sorted(list(set(''.join(words))))
ch_to_i = {s: i+1 for i, s in enumerate(chars)}
ch_to_i['.'] = 0
i_to_ch = {i: s for s, i in ch_to_i.items()}
vocab_size = len(i_to_ch)

# -------------------------
block_size = 8
n_embd = 24
n_hidden = 128
torch.manual_seed(42);
random.seed(42)

max_steps = 100000
decay_step = 80000
lr = 0.1
batch_size = 32

# -------------------------
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

# parameter init
with torch.no_grad():
  model[-1].weight *= 0.1

# -------------------------
criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(model.parameters(), lr=lr)
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=decay_step, gamma=0.1)

# -------------------------
lossi = []
for i in range(max_steps):
  
  # minibatch construct
  ix = torch.randint(0, X_tr.shape[0], (batch_size,))
  Xb, Yb = X_tr[ix], y_tr[ix] # batch X,Y
  
  optimizer.zero_grad()

  logits = model(Xb)
  loss = F.cross_entropy(logits, Yb) # loss function
  loss.backward()
  optimizer.step()

  # lv = split_loss('val')
  # track stats
  if i % 5000 == 0: # print every once in a while
    print(f'{i:7d}/{max_steps:7d}: {loss.item():.4f}')
    # print(f'{i:7d}/{max_steps:7d}: {lv.item():.4f}')

  
  lossi.append(loss.log10().item())
  # loss_val.append(lv.log10().item())

# -------------------------
# put layers into eval mode (needed for batchnorm especially)
for layer in model:
    layer.training = False
    
# evaluate the loss
@torch.no_grad()
def split_loss(split):
  x,y = {
    'train': (X_tr, y_tr),
    'val': (X_dev, y_dev),
    'test': (X_te, y_te),
  }[split]
  logits = model(x)
  loss = F.cross_entropy(logits, y)
  return loss

loss_tr = round(split_loss('train').item(), 2)
loss_val = round(split_loss('val').item(), 2)

print(loss_tr)
print(loss_val)

# -------------------------
# Specify a path
now = datetime.datetime.now()
now_dt_str = now.strftime('%Y-%m-%d %H%M%S')
PATH = "{}.pt".format(now_dt_str)
line = '{},{},{},{},{},{},{},{},{},{}\n'.format(PATH,
                                     block_size, 
                                     n_embd, 
                                     n_hidden, 
                                     max_steps, 
                                     batch_size,
                                     lr,
                                     decay_step, 
                                     loss_tr, 
                                     loss_val)

torch.save(model, 'models/{}'.format(PATH))

with open('models/training_details.csv', 'a+') as outfile:
  outfile.write(line)
# -----------------------------------------------------------------------------------------------
