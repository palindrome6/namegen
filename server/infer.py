import torch
import torch.nn.functional as F
import torch.nn as nn
import torch.optim as optim
from nn_def import FlattenConsecutive, BatchNorm1d
import random


block_size = 8
n_embd = 12
n_hidden = 64
torch.manual_seed(42);
random.seed(42)

block_size = 8
words = open('ML/data/names.txt').read().split()

chars = sorted(list(set(''.join(words))))
ch_to_i = {s: i+1 for i, s in enumerate(chars)}
ch_to_i['.'] = 0
i_to_ch = {i: s for s, i in ch_to_i.items()}
vocab_size = len(i_to_ch)

def infer(name):
    model3 = torch.load('ML/models/2023-05-13 215634.pt')
    for layer in model3:
        layer.training = False
    model3.eval()

    if len(name) >= block_size:
        rem_ = [ch_to_i[ch] for ch in name[:-block_size]]
        context_ = [ch_to_i[ch] for ch in name[-block_size:]]
    else:
        rem_ = []
        context_ = [0] * (block_size - len(name))
        context_.extend([ch_to_i[ch] for ch in name])

    names_gen = []

    with torch.no_grad():
        while len(names_gen) <= 10:
            
            out = [ch_to_i[ch] for ch in name]
            context = context_
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
            nameg = ''.join(i_to_ch[i] for i in out).strip('.')
            if nameg not in names_gen:
                names_gen.append(nameg)
    return names_gen