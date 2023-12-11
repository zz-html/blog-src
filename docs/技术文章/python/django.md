---
title: 'django'
date: 2100-05-01 12:44:15
tags:
- 'python'
- 'web'
categories:
- 'python'
---

# django

## 安装django环境
### 创建虚拟环境
```
python -m venv venv
venv\Scripts\activate
```
### 安装依赖
requirements.txt文件
```
Django==3.2.4
```
```
# 安装
pip install -r requirements.txt
# 指定镜像安装
pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/
# 运行
python manage.py runserver
```

## 创建Django项目、应用
### 创建项目
```
django-admin startproject myproject
cd myproject
```
### 创建应用
```
python manage.py startapp myapp
```

## 配置数据库和进行迁移
配置数据库：  
打开 myproject/settings.py 文件，找到 DATABASES 部分，配置数据库连接。 
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / "db.sqlite3",
    }
}
``` 
在项目目录中，执行以下命令进行数据库迁移。
```
python manage.py migrate
``` 

## 运行开发服务器
```
python manage.py runserver
# 指定端口
python manage.py runserver 0.0.0.0:8000
``` 

## 创建一个新的视图函数
在 myapp/views.py 文件中添加一个新的视图函数：
```
from django.http import HttpResponse
def hello_view(request):
    return HttpResponse("Hello, Django!")
``` 
在 myapp/urls.py 文件中添加新的路径和视图映射：
```
from django.urls import path
from .views import hello_view
urlpatterns = [
    path('hello/', hello_view, name='hello'),
]
``` 
在项目的主 urls.py 文件中引入 myapp/urls.py 并添加对应的路径配置：
```
from django.contrib import admin
from django.urls import include, path
urlpatterns = [
    path('admin/', admin.site.urls),
    path('myapp/', include('myapp.urls')),  # Include the urls from myapp
]
``` 
运行 Django 项目，访问 http://127.0.0.1:8000/myapp/hello/