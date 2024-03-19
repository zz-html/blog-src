---
title: 'yolo'
date: 2024-03-19 12:44:15
tags:
- 'python'
- 'yolo'
categories:
- 'python'
---
# yolov8

GitHub官方地址：https://github.com/ultralytics/ultralytics  
demo源码地址： https://github.com/zz-python/python-ai/tree/main/yolo  

## 开始使用

```
python -m venv yolo_env
yolo_env\Scripts\activate
pip install ultralytics
```

### 使用命令行进行验证

```
# yolov8n.pt下载 https://github.com/ultralytics/assets/releases
yolo predict model='model/yolov8n.pt' source='assets/bus.jpg'
```

如发生以下报错：Microsoft Visual C++ Redistributable is not installed, this may lead to the DLL load failure.安装vs2022可以解决  
百度网盘链接：https://pan.baidu.com/s/1-OPcK9uyQvGBtMEub7UN8g  
提取码：78wf  

### 使用代码进行验证

```
from ultralytics import YOLO
import cv2
from pathlib import Path

# 模型路径
model_path = Path('../model').resolve()
# 资源路径
asset_path = Path('../assets').resolve()

# 加载预训练模型 task参数也可以不填写，它会根据模型去识别相应任务类别
model = YOLO(model_path / "yolov8n.pt", task='detect')
# 检测图片
results = model(asset_path / "bus.jpg")
res = results[0].plot()
cv2.imshow("YOLOv8 Inference", res)
cv2.waitKey(0)
```
更多task demo可以查看源码

## 训练数据

### 开源数据集

coco数据集：https://cocodataset.org  
Pascal Voc数据集：https://pjreddie.com/projects/pascal-voc-dataset-mirror/  
Linkopings交通标志数据集：http://m6z.cn/68ldS0  
RMFD口罩遮挡人脸数据集：http://m6z.cn/61z9Fv  
生活垃圾数据集：http://m6z.cn/6n5Adu  
火焰和烟雾图像数据集：http://m6z.cn/6fzn0f  
MTFL人脸识别数据集：http://m6z.cn/6fHmaT  
猫咪数据集：http://m6z.cn/5TAgbw  
宠物图像数据集：http://m6z.cn/5TAgdC  
HMDB人类动作识别数据集：http://m6z.cn/6gGlzF  
KITTI道路数据集：http://m6z.cn/5xz4OW  
MPII人体模型数据集：http://m6z.cn/69aaIe  
天池铝型材表面缺陷数据集：http://m6z.cn/61EksR  
防护装备-头盔和背心检测：http://m6z.cn/61zarT  

### 数据标注

常用的标注工具有labelImg、LabelMe等  

#### Make Sense

官网：https://www.makesense.ai/  
中文：http://makesense.bimant.com/  
使用：  
开始使用->上传图片->目标检测->添加标签->开始项目->图片标注->操作、导出数据、yolo格式

#### labelImg

labelImg使用可以查看 https://github.com/zz-python/python-ai/tree/main/labelimg  

### 数据模型

my_coco128.yaml
```
path: F:\project\zz-python\python-ai\yolo\test_train\datasets/cat_split # dataset root dir
train: train/images # train images (relative to 'path') 128 images
val: valid/images # val images (relative to 'path') 128 images
test: test/images # test images (optional)
# Classes
names:
  0: cat
```

将标注数据目录转成模型目录 修改并运行源码file.py

### 使用命令行训练

```
yolo task=detect mode=train model='model/yolov8s.pt' data='00_train/my_coco128.yaml' epochs=3 batch=1
```

* task：选择任务类型，可选[‘detect’, ‘segment’, ‘classify’, ‘init’]。
* mode: 选择是训练、验证还是预测的任务类型，可选[‘train’, ‘val’, ‘predict’]。
* model: 选择yolov8不同的模型配置文件，可选yolov8s、yolov8m、yolov8l、yolov8x、yolov8n。
* data: 选择生成的数据集配置文件。
* epochs：指的就是训练过程中整个数据集将被迭代多少次（我这里是cpu训练所以调的比较小）。
* batch：一次看完多少张图片才进行权重更新（同上）。
* pretrained：预训练模型。

### 使用代码训练

官方文档连接:https://docs.ultralytics.com/usage/python/  
```
from ultralytics import YOLO
model = YOLO('F:\\project\\zz-python\\python-ai\\yolo\\model\\yolov8n.pt')
results = model.train(data='F:\\project\\zz-python\\python-ai\\yolo\\test_train\\my_coco128.yaml', epochs=3)
results = model.val()
```

模型导出onnx
```
from ultralytics import YOLO
model = YOLO('F:\\project\\zz-python\\python-ai\\yolo\\model\\yolov8n.pt')
success = model.export(format='onnx')
```
