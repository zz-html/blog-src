---
title: 'robot'
date: 2025-01-23 00:00:00
tags:
- 'python'
categories:
- 'python'
---

Robot Framework 是一个通用的开源测试自动化框架，主要用于验收测试和验收测试驱动开发 (ATDD)。它基于关键字驱动的测试方法，使用易于理解的表格语法，适合于多种类型的测试，包括功能测试、API测试、UI测试等。  
[示例源码：https://github.com/zz-python/python3/tree/master/robot](<https://github.com/zz-python/python3/tree/master/robot>)

## 安装

```bash
# python虚拟环境
python -m venv venv
venv\Scripts\activate
# 安装 Robot Framework
pip install robotframework
# 安装 Robot requests
pip install robotframework-requests
# 安装 SeleniumLibrary（用于 UI 测试）
pip install robotframework-seleniumlibrary
```

## 测试代码

### 测试环境文件是否存在
test_file.robot

```robot
*** Settings ***
Library    OperatingSystem

*** Test Cases ***
Example Test
    [Documentation]    验证文件是否存在
    File Should Exist    myfile.txt
```

### 测试get后端接口
test_open_web.robot

```robot
*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    OperatingSystem

*** Variables ***
# API的基础URL
${BASE_URL}    https://172.27.55.53
# 认证信息
${AUTH_TOKEN}  Bearer tokenxxx

*** Test Cases ***
Test GET API
    [Documentation]    验证GET接口是否返回正确的状态码和数据

    # 0. 定义头部信息查询参数
    ${headers}    Create Dictionary    Authorization=${AUTH_TOKEN}
    ${query_params}    Create Dictionary    page=0    size=10    ipType=0    allowType=0    deviceKey=device-abc

    # 1. 创建会话和headers
    Create Session    my_test_session    ${BASE_URL}    headers=${headers}

    # 2. 发送GET请求到指定的路径和参数
    ${response}    GET On Session    my_test_session    /api/ne-base-cfg/black-white/black-whites    params=${query_params}

    # 3. 验证状态码
    Should Be Equal As Integers    ${response.status_code}    200

    # 4. 验证返回的数据
    ${response_body}    To Dictionary    ${response.json()}
    Log    返回的数据：${response_body}

*** Keywords ***
# 简单返回值
To Dictionary
    [Arguments]    ${response}
    RETURN    ${response}
```

## 运行测试
使用 robot 命令运行：
```bash
# robot test_suites/xxx.robot
robot test_suites/test_get_api.robot
# 指定输出路径
robot --outputdir results test_suites/test_get_api.robot
```
执行后将在输出路径目录下生成测试报告