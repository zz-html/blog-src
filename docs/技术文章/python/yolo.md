---
title: 'opencv'
date: 2100-05-01 12:44:15
tags:
- 'python'
- 'opencv'
categories:
- 'python'
---

# yolov8
GitHub网址：https://github.com/ultralytics/ultralytics

## 开始使用
```
python -m venv yolo_env
yolo_env\Scripts\activate
pip install ultralytics
# yolov8n.pt下载 https://github.com/ultralytics/assets/releases
yolo predict model='model/yolov8n.pt' source='assets/bus.jpg'
```

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


### makesense
官网：https://www.makesense.ai/  
中文：http://makesense.bimant.com/

### 训练
yolo task=detect mode=train model='model/yolov8s.pt' epochs=10 batch=1 data='00_train/my_yolov8.yaml'