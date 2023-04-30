import os
import random

f = open('names_scraped.txt')
names = f.read().split('\n')
names = [n.lower() for n in names]
names = list(set(names))
random.shuffle(names)

with open('names.txt', 'w') as outfile:
    outfile.write('\n'.join(names))

