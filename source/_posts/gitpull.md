---
layout: GitPull
title: 未指定策略执行pull操作
date: 2021-05-20 10:04:15
tags: git pull,  Pulling without specifying how to reconcile divergent branches is discouraged
---

#### 问题

Pulling without specifying how to reconcile divergent branches is discouraged. You can squelch this message by running one of the following commands sometime before your next pull:

git config pull.rebase false # merge (the default strategy)
git config pull.rebase true # rebase
git config pull.ff only # fast-forward only

You can replace "git config" with "git config --global" to set a default
preference for all repositories. You can also pass --rebase, --no-rebase,
or --ff-only on the command line to override the configured default per
invocation.

#### 原因

1. Git 版本 2.27.0 版本及以上。
2. git pull 操作时未指定合并策略。

#### 解决方案

```
git config pull.ff false 默认合并策略
```
