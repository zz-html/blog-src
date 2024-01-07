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
        'NAME': BASE_DIR / "test.sqlite3",
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

## 创建一个新的模型
确认在 settings.py 文件中找到 INSTALLED_APPS 设置
```
INSTALLED_APPS = [
    # ... 其他应用 ...
    'myapp',
]
``` 
在 myapp/models.py 中创建一个模型，用于定义数据库表的结构。
```
from django.db import models
class Hello(models.Model):
    message = models.CharField(max_length=255)
    def __str__(self):
        return self.message
``` 
运行以下命令以创建或迁移数据库表：
```
python manage.py makemigrations
python manage.py migrate
```
## 视图+模型
myapp/models.py：
```
from django.db import models

class MyModel(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def to_dict(self):
            return {'name': self.name, 'description': self.description}
``` 
在 myapp/urls.py：
```
from django.urls import path
from .views import hello_view,create_model,model_list_json

urlpatterns = [
    path('hello/', hello_view, name='hello'),
    path('create_model/', create_model, name='create_model'),
    path('model_list_json/', model_list_json, name='model_list_json'),
]
``` 
views.py：
```
from django.shortcuts import render
from django.http import HttpResponse
from .forms import MyModelForm
from django.views.decorators.csrf import csrf_exempt
from .models import MyModel
from django.http import JsonResponse

def hello_view(request):
    return HttpResponse("Hello, Django!")

@csrf_exempt
def create_model(request):
    # 如果是 POST 请求，处理表单提交
    form = MyModelForm(request.POST)
    form.save()    
    return HttpResponse("saved!")

def model_list_json(request):
    models = MyModel.objects.all()
    data = [model.to_dict() for model in models]
    return JsonResponse(data, safe=False) 
```
## vscode下断点调试Django 项目
确保已经在 VSCode 中安装了 Python 扩展  
在项目根目录下创建一个名为 .vscode 的文件夹，创建一个 launch.json 文件。配置：
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Django",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/manage.py",
            "args": [
                "runserver",
                "8000",
                "--noreload",
                "--nothreading"
            ],
            "django": true
        }
    ]
}
```
启动调试：在 VSCode 中，打开调试视图。选择 "Django" 配置。点击启动按钮（绿色的三角形）

## 引入Swagger接口文档
安装Django REST framework和drf-yasg
```
pip install djangorestframework
pip install drf-yasg
```
settings.py文件
```
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'drf_yasg',
    # ...
]

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
}
```
urls.py文件配置drf-yasg
```
from django.conf import settings
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Your API",
        default_version='v1',
        description="Your API description",
        terms_of_service="https://www.yourapp.com/terms/",
        contact=openapi.Contact(email="contact@yourapp.com"),
        license=openapi.License(name="Your License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myapp/', include('myapp.urls')),  # Replace 'yourapp' with the actual name of your app
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^$', RedirectView.as_view(url='swagger/', permanent=True)),
]

```
给一个接口添加swagger说明
```
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class YourApiView(APIView):
    @swagger_auto_schema(
        operation_description="Your operation description",
        responses={
            200: "Success response description",
            400: "Bad request description",
        },
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'key1': openapi.Schema(type=openapi.TYPE_STRING, description='Description for key1'),
                'key2': openapi.Schema(type=openapi.TYPE_INTEGER, description='Description for key2'),
            }
        )
    )
    def post(self, request, *args, **kwargs):
        # Your view logic here
        return Response(data={'message': 'Success'}, status=status.HTTP_200_OK)
```

运行Django开发服务器 python manage.py runserver  
访问 http://127.0.0.1:8000/swagger/ 即可查看Swagger UI并测试你的API。