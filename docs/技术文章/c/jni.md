---
title: 'jni'
date: 2024-09-13 12:00:00
tags:
- 'jni'
categories:
- 'jni'
---

通过jni可以实现java代码和c代码的互调用。  

java源码：  
[https://github.com/ZHANG-ZHENG/java-project/tree/master/jni-hello-demo](https://github.com/ZHANG-ZHENG/java-project/tree/master/jni-hello-demo)  
c源码：  
[https://github.com/zz-c/CMAKE/tree/main/hellojni](https://github.com/zz-c/CMAKE/tree/main/hellojni)  
[https://github.com/zz-c/CMAKE/tree/main/hellojnilib](https://github.com/zz-c/CMAKE/tree/main/hellojnilib)  

## java

编写类和native方法

```java
public class HelloWorldJNI {
    public native void helloJNI(String name);
}
```

生成.h文件

```bash
javac -h . HelloWorldJNI.java
```

```c
#include <jni.h>

#ifndef _Included_top_zhost_jni_HelloWorldJNI
#define _Included_top_zhost_jni_HelloWorldJNI
#ifdef __cplusplus
extern "C" {
#endif

JNIEXPORT void JNICALL Java_top_zhost_jni_HelloWorldJNI_helloJNI
  (JNIEnv *, jobject, jstring);

#ifdef __cplusplus
}
#endif
#endif
```

## c

实现头文件方法

```c
#include "top_zhost_jni_HelloWorldJNI.h"

JNIEXPORT void JNICALL Java_top_zhost_jni_HelloWorldJNI_helloJNI
(JNIEnv *, jobject, jstring){
    printf("printf from C");
}
```

编译生成动态库，win dll，linux so。

```txt
﻿cmake_minimum_required (VERSION 3.8)
project(hellojni)

include_directories(${CMAKE_CURRENT_SOURCE_DIR}/include)
if(WIN32)
    message(STATUS "This is a Windows system.")
    include_directories("C:/Program Files/Java/jdk1.8.0_31/include")
    include_directories("C:/Program Files/Java/jdk1.8.0_31/include/win32")
else()
    message(STATUS "This is not a Windows system.")
    include_directories("/usr/lib/jvm/java-8-openjdk-amd64/include")
    include_directories("/usr/lib/jvm/java-8-openjdk-amd64/include/linux")
endif()
aux_source_directory(${CMAKE_CURRENT_SOURCE_DIR}/src SRC_LIST)

add_library(hellojni SHARED ${SRC_LIST})
```

## java运行测试

```java

public class HelloWorldJNI {

    public native void helloJNI(String name);

    public static void main(String[] args) {
        //System.loadLibrary("hellojni");
        System.load("G:\\project\\c\\CMAKE\\out\\build\\x64-Debug\\hellojni\\hellojni.dll");
        HelloWorldJNI demo = new HelloWorldJNI();
        demo.helloJNI("jni test");
    }
}
```

```bash
javac top/zhost/jni/HelloWorldJNI.java
java top.zhost.jni.HelloWorldJNI
```
