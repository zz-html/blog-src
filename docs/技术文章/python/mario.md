---
title: 'mario'
date: 2000-05-01 12:44:15
tags:
- 'python'
- 'mario'
categories:
- 'python'
---
# mario

官网网址：  
https://pypi.org/project/gym-super-mario-bros/  
https://pypi.org/project/nes-py/  
https://github.com/Kautenja/nes-py  

## 开始使用

```
python -m venv venv
venv\Scripts\activate
pip install nes-py
# pip install gym-super-mario-bros
pip install gym_super_mario_bros==6.0.7
pip install gym-super-mario-bros==7.3.2

# Python3.9于2020年10月发布
pip install nes-py==8.1.2
pip install gym-super-mario-bros==7.3.2
pip install -r requirements.txt
```

```
zipp==0.5
importlib-metadata==4.8.0
gym-notices==0.0.4
cloudpickle==1.2.0
tqdm==4.48.2
pyglet==1.5.5
nes-py==8.1.4
gym-super-mario-bros
```

gym_super_mario_bros -e SuperMarioBros-v3 -m human

```
from nes_py.wrappers import JoypadSpace
import gym_super_mario_bros
from gym_super_mario_bros.actions import SIMPLE_MOVEMENT
env = gym_super_mario_bros.make('SuperMarioBros-v0')
env = JoypadSpace(env, SIMPLE_MOVEMENT)

done = True
for step in range(5000):
    if done:
        state = env.reset()
    state, reward, done, info = env.step(env.action_space.sample())
    env.render()

env.close()
```