-- MySQL dump 10.13  Distrib 8.0.19, for osx10.15 (x86_64)
--
-- Host: test.koudaibook.com    Database: testdb
-- ------------------------------------------------------
-- Server version	8.0.15



--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (1,'表及字段等类型','fieldType'),(2,'各应用类型如网站，服务器，前端','sideType'),(3,'编程语言','language'),(4,'技术框架比如spingboot,nextjs','framework'),(5,'操作系统或平台','platform');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping data for table `Dictionary`
--

LOCK TABLES `Dictionary` WRITE;
/*!40000 ALTER TABLE `Dictionary` DISABLE KEYS */;
INSERT INTO `Dictionary` VALUES (1,1,'int','int'),(2,1,'String字符串','String'),(3,1,'Long','Long'),(4,1,'Text文本','Text'),(5,1,'Boolean','Boolean'),(6,2,'网站站点','web'),(7,2,'服务器，接口服务','server'),(8,2,'移动前端','frontend'),(9,3,'Java','java'),(10,3,'js','js'),(11,3,'ReactJS','reactjs'),(12,4,'SpringBoot','springboot'),(13,4,'Next.JS站点框架','nextjs');
/*!40000 ALTER TABLE `Dictionary` ENABLE KEYS */;
UNLOCK TABLES;
