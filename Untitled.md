---
title: Untitled
tags: 
categories: 
date: 2025-03-18T13:15:22+08:00
modify: 2025-03-18T13:15:22+08:00
dir: 
share: false
cdate: 2025-03-18
mdate: 2025-03-18
---
以下是针对这些技术栈的优质开源项目推荐，涵盖学习参考和实际生产案例：

---

### **1. Spring Boot 全栈项目**

#### **Pig**（微服务开发框架）

- 地址：[https://github.com/pigxcloud/pig](https://github.com/pigxcloud/pig)
- 技术栈：Spring Cloud Alibaba + MyBatis Plus + Redis + RabbitMQ + Caffeine + Resilience4j
- 特点：企业级微服务脚手架，支持多租户、动态路由、限流熔断等特性。

#### **RuoYi**（单体/微服务快速开发平台）

- 地址：[https://github.com/yangzongzhuan/RuoYi](https://github.com/yangzongzhuan/RuoYi)
- 技术栈：Spring Boot + MyBatis Plus + Redis + Swagger
- 特点：代码生成器、权限管理、监控告警一体化。

---

### **2. 消息队列与流处理**

#### **mall**（电商系统）

- 地址：[https://github.com/macrozheng/mall](https://github.com/macrozheng/mall)
- 技术栈：Spring Boot + RabbitMQ + Kafka + Redis + MyBatis Plus
- 场景：订单超时取消（RabbitMQ延迟队列）、日志收集（Kafka）、秒杀（Redis分布式锁）。

#### **flink-cdc-connectors**（实时数据同步）

- 地址：[https://github.com/ververica/flink-cdc-connectors](https://github.com/ververica/flink-cdc-connectors)
- 技术栈：Flink CDC + MySQL + Kafka
- 场景：MySQL到Elasticsearch的实时数据同步。

---

### **3. 高并发实时通信**

#### **netty-chatroom**（即时通讯）

- 地址：[https://github.com/itning/netty-chatroom](https://github.com/itning/netty-chatroom)
- 技术栈：Netty + WebSocket + Redis
- 场景：支持百万级长连接的聊天室，消息广播与点对点通信。

#### **spring-websocket-sample**

- 地址：[https://github.com/spring-projects/spring-framework/tree/main/spring-websocket](https://github.com/spring-projects/spring-framework/tree/main/spring-websocket)
- 技术栈：Spring WebSocket + STOMP
- 场景：官方提供的WebSocket集成示例，适合学习协议规范。

---

### **4. 缓存与容错**

#### **JetCache**（多级缓存框架）

- 地址：[https://github.com/alibaba/jetcache](https://github.com/alibaba/jetcache)
- 技术栈：Caffeine + Redis + Spring Boot
- 特点：本地与分布式缓存联动，支持TTL、缓存穿透保护。

#### **resilience4j-spring-boot2-demo**

- 地址：[https://github.com/resilience4j/resilience4j-spring-boot2-demo](https://github.com/resilience4j/resilience4j-spring-boot2-demo)
- 技术栈：Resilience4j + Spring Boot
- 场景：熔断、限流、重试的完整配置示例。

---

### **5. 数据同步与ETL**

#### **data-link**（数据管道）

- 地址：[https://github.com/alibaba/datax](https://github.com/alibaba/datax)（需自行整合Flink CDC）
- 技术栈：Flink CDC + Kafka + MySQL
- 场景：异构数据库实时同步，适合数据湖场景。

#### **canal**（阿里开源MySQL增量订阅）

- 地址：[https://github.com/alibaba/canal](https://github.com/alibaba/canal)
- 技术栈：Canal + Kafka + Redis
- 场景：替代Flink CDC的轻量级MySQL增量数据同步方案。

---

### **6. 完整企业级项目参考**

#### **jeecg-boot**（低代码平台）

- 地址：[https://github.com/jeecgboot/jeecg-boot](https://github.com/jeecgboot/jeecg-boot)
- 技术栈：Spring Boot + MyBatis Plus + Redis + Kafka + Swagger
- 特点：代码生成器、流程引擎、大屏可视化。

#### **lamp-cloud**（微服务解决方案）

- 地址：[https://github.com/zuihou/lamp-cloud](https://github.com/zuihou/lamp-cloud)
- 技术栈：Spring Cloud + MyBatis Plus + Redis + Caffeine + Resilience4j
- 场景：多租户、分布式事务、接口鉴权。

---

### **推荐学习路径**

1. **入门学习**：从 `mall` 或 `RuoYi` 的单体项目入手，理解基础整合。
2. **进阶实践**：通过 `Pig` 或 `lamp-cloud` 学习微服务架构。
3. **深度优化**：参考 `JetCache` 和 `resilience4j-spring-boot2-demo` 实现高性能与高可用。
4. **生产级方案**：结合 `flink-cdc-connectors` 和 `netty-chatroom` 实现实时业务。

**提示**：所有项目建议配合 Docker 部署（MySQL、Redis、Kafka 等中间件容器化），生产环境可结合 Kubernetes 管理。