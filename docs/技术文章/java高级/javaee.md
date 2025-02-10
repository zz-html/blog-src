---
title: 'Java高级'
date: 2022-05-01 12:44:15
tags:
- 'Spring'
- 'SpringBoot'
categories:
- 'java'
---

::: tip 说明

JavaEE

:::

<!-- more -->

## springboot工程maven打包libs依赖外置
[示例源码：https://github.com/ZHANG-ZHENG/spring-boot-study/tree/master/spring-boot-lib-out](<https://github.com/ZHANG-ZHENG/spring-boot-study/tree/master/spring-boot-lib-out>)

修改pom.xml
```xml
<plugins>
   <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <!-- 禁用默认的FAT JAR打包 使用ZIP打包并排除jar包 -->
      <configuration>
         <layout>ZIP</layout>
         <includes>
            <include>
               <groupId>nothing</groupId>
               <artifactId>nothing</artifactId>
            </include>
         </includes>
      </configuration>
   </plugin>
   <!-- 复制依赖到libs目录 -->
   <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-dependency-plugin</artifactId>
      <executions>
         <execution>
            <id>copy-dependencies</id>
            <phase>package</phase>
            <goals>
               <goal>copy-dependencies</goal>
            </goals>
            <configuration>
               <outputDirectory>${project.build.directory}/libs</outputDirectory>
               <overWriteReleases>false</overWriteReleases>
               <overWriteSnapshots>false</overWriteSnapshots>
            </configuration>
         </execution>
      </executions>
   </plugin>
</plugins>
```

执行maven install，运行jar程序。
```xml
java -Dloader.path=./libs -jar lib-out-1.0.0.jar
```


