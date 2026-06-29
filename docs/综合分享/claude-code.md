---
title: 'claude-code'
date: 2026-06-28 00:00:00
tags:
- 'AI'
categories:
- 'claude-code'
---

## 安装

```bash
# npm安装 版本>=18.0
npm install -g @anthropic-ai/claude-code
# 验证安装
claude --version
# 运行
claude
```

## 接入deepseek  

创建文件C:\Users\你的用户名\.claude\settings.json

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "sk-xxxx",
    "ANTHROPIC_MODEL": "deepseek-v4-pro"
  }
}
```

## 初始化项目

在工程目录输入 /init

/init 生成的草稿通常包含以下几个核心部分，这正好是 Claude 每次会话最需要了解的项目背景：

- 项目概述：项目是做什么的。
- 技术栈：使用的框架、语言和数据库等。
- 目录结构：关键文件夹的用途。
- 常用命令：如何启动、测试、构建项目。
- 开发规范：一些基础的代码约定。

可以把以下这些团队特有的、AI 无法从代码中推断出的信息补充进去：

- 代码规范：例如“使用 ES modules，不使用 CommonJS”或“必须使用 UserService 封装，禁止直接操作数据库”。
- 工作流程：例如功能开发、提交代码的具体步骤。
- 架构决策：例如“所有 API 统一返回 { data, error } 格式”。
- 注意事项 (Gotchas)：例如“/generated 目录下的文件是自动生成的，切勿手动修改”

## 创建skills

创建 Skill 文件夹：Skill 可以放在两个位置，项目级别（推荐）或用户级别。

- 项目级别：在你项目的根目录下创建 .claude/skills/<你的skill名>/ 文件夹。这个 Skill 会随项目共享。
- 用户级别：在你的用户目录下创建 ~/.claude/skills/<你的skill名>/ 文件夹。这个 Skill 在所有项目中都可以使用。
- 文件夹命名：必须使用 kebab-case（小写字母和连字符），例如 my-standup-skill

编写 SKILL.md 文件：在 Skill 文件夹内创建 SKILL.md 文件，这是核心。它的格式要求很严格。

- YAML 头信息：以 --- 开头，包含 name 和 description。description 必须清晰描述 Skill 的功能和触发条件，这直接关系到 Claude 能否正确识别并调用它。
- Markdown 指令：在 --- 之后，用 Markdown 格式写下详细的操作步骤、输入输出要求等。

SKILL.md 示例：

```markdown
---
name: my-standup-skill
description: Generate a daily standup report based on recent git commits. Use when user asks for a standup or daily status.
---
# Purpose
生成一个简洁的每日站会报告。

# Steps
1. 检查最近24-48小时的 git 提交记录。
2. 总结出 3-5 个要点，涵盖进度、今日目标和阻碍。
3. 在 `./out/standup.md` 文件中输出 Markdown 格式的报告。
```
