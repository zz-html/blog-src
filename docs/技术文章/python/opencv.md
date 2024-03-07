---
title: 'opencv'
date: 2100-05-01 12:44:15
tags:
- 'python'
- 'opencv'
categories:
- 'python'
---

# opencv
源码地址 https://github.com/zz-python/python3/tree/master/opencv
## pip安装
```
pip install opencv-python
pip install numpy
```
# pytorch
同类产品Caffe，Tensorflow，Pytorch
网址：https://pytorch.org/
```
python -m venv pytorch_env
pytorch_env\Scripts\activate
pip install torch torchvision torchaudio
```
```
import torch
print(torch.__version__)
x = torch.rand(5, 3)
print(x)
```

# yolov8
GitHub网址：https://github.com/ultralytics/ultralytics
```
python -m venv yolo_env
yolo_env\Scripts\activate
pip install ultralytics
# yolov8n.pt下载 https://github.com/ultralytics/assets/releases
yolo predict model=yolov8n.pt source='bus.jpg'
```

# openvino
```
python -m venv openvino_env
openvino_env\Scripts\activate
python -m pip install --upgrade pip
pip install openvino==2023.3.0
python -c "from openvino import Core; print(Core().available_devices)"
```
