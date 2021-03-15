-- MariaDB dump 10.18  Distrib 10.4.16-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: dbpos
-- ------------------------------------------------------
-- Server version	10.4.16-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary table structure for view `showallproducts`
--

DROP TABLE IF EXISTS `showallproducts`;
/*!50001 DROP VIEW IF EXISTS `showallproducts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `showallproducts` (
  `PRODUCT_ID` tinyint NOT NULL,
  `PRODUCTCODE` tinyint NOT NULL,
  `PRODUCTPRICE` tinyint NOT NULL,
  `PRODUCTNAME` tinyint NOT NULL,
  `PRODUCTDESC` tinyint NOT NULL,
  `PRODUCTSTATUS` tinyint NOT NULL,
  `SIZE` tinyint NOT NULL,
  `CATEGORYTYPE` tinyint NOT NULL,
  `DATEUPDATED` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `tblcategory`
--

DROP TABLE IF EXISTS `tblcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblcategory` (
  `CATEGORY_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CATEGORYTYPE` varchar(15) NOT NULL,
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblcategory`
--

LOCK TABLES `tblcategory` WRITE;
/*!40000 ALTER TABLE `tblcategory` DISABLE KEYS */;
INSERT INTO `tblcategory` VALUES (1,'Pasta'),(2,'Add-Ons'),(3,'Burger'),(4,'Desert');
/*!40000 ALTER TABLE `tblcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblmeal`
--

DROP TABLE IF EXISTS `tblmeal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblmeal` (
  `MEAL_ID` int(11) NOT NULL AUTO_INCREMENT,
  `MEALCODE` varchar(50) NOT NULL,
  `MEALNAME` varchar(50) NOT NULL,
  `MEALPRICE` double NOT NULL,
  `MEALSTATUS` varchar(10) NOT NULL,
  `MEALBUNDLE` tinyint(1) NOT NULL,
  `MEALUPOPT` tinyint(1) NOT NULL,
  `DATEUPDATED` datetime NOT NULL,
  PRIMARY KEY (`MEAL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblmeal`
--

LOCK TABLES `tblmeal` WRITE;
/*!40000 ALTER TABLE `tblmeal` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblmeal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblproduct`
--

DROP TABLE IF EXISTS `tblproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblproduct` (
  `PRODUCT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PRODUCTCODE` varchar(50) NOT NULL,
  `PRODUCTNAME` varchar(50) NOT NULL,
  `PRODUCTDESC` varchar(500) NOT NULL,
  `PRODSIZE_ID` int(11) DEFAULT NULL,
  `PRODCAT_ID` int(11) NOT NULL,
  `PRODUCTPRICE` double NOT NULL,
  `PRODUCTSTATUS` varchar(10) DEFAULT NULL,
  `DATEUPDATED` datetime DEFAULT NULL,
  PRIMARY KEY (`PRODUCT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblproduct`
--

LOCK TABLES `tblproduct` WRITE;
/*!40000 ALTER TABLE `tblproduct` DISABLE KEYS */;
INSERT INTO `tblproduct` VALUES (1,'SPAGSMALL','Sphagetti','this is a simple sphagetti',1,1,150,'Active','2021-03-12 23:15:33');
/*!40000 ALTER TABLE `tblproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblproductmeal`
--

DROP TABLE IF EXISTS `tblproductmeal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblproductmeal` (
  `PRODUCTMEAL_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PMMEAL_ID` int(11) NOT NULL,
  `PMPRODUCT_ID` int(11) NOT NULL,
  PRIMARY KEY (`PRODUCTMEAL_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblproductmeal`
--

LOCK TABLES `tblproductmeal` WRITE;
/*!40000 ALTER TABLE `tblproductmeal` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblproductmeal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblsize`
--

DROP TABLE IF EXISTS `tblsize`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tblsize` (
  `SIZE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `SIZE` varchar(20) NOT NULL,
  `SIZEDESC` varchar(15) NOT NULL,
  PRIMARY KEY (`SIZE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsize`
--

LOCK TABLES `tblsize` WRITE;
/*!40000 ALTER TABLE `tblsize` DISABLE KEYS */;
INSERT INTO `tblsize` VALUES (1,'S','SMALL'),(2,'M','MEDIUM'),(3,'L','LARGE'),(4,'XL','EXTRA-LARGE');
/*!40000 ALTER TABLE `tblsize` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbltransactiontype`
--

DROP TABLE IF EXISTS `tbltransactiontype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbltransactiontype` (
  `TRANSACTION_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TRANSACTION_TYPE` varchar(10) NOT NULL,
  PRIMARY KEY (`TRANSACTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbltransactiontype`
--

LOCK TABLES `tbltransactiontype` WRITE;
/*!40000 ALTER TABLE `tbltransactiontype` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbltransactiontype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `showallproducts`
--

/*!50001 DROP TABLE IF EXISTS `showallproducts`*/;
/*!50001 DROP VIEW IF EXISTS `showallproducts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `showallproducts` AS select `tblproduct`.`PRODUCT_ID` AS `PRODUCT_ID`,`tblproduct`.`PRODUCTCODE` AS `PRODUCTCODE`,`tblproduct`.`PRODUCTPRICE` AS `PRODUCTPRICE`,`tblproduct`.`PRODUCTNAME` AS `PRODUCTNAME`,`tblproduct`.`PRODUCTDESC` AS `PRODUCTDESC`,`tblproduct`.`PRODUCTSTATUS` AS `PRODUCTSTATUS`,`tblsize`.`SIZE` AS `SIZE`,`tblcategory`.`CATEGORYTYPE` AS `CATEGORYTYPE`,`tblproduct`.`DATEUPDATED` AS `DATEUPDATED` from ((`tblproduct` join `tblsize` on(`tblproduct`.`PRODSIZE_ID` = `tblsize`.`SIZE_ID`)) join `tblcategory` on(`tblproduct`.`PRODCAT_ID` = `tblcategory`.`CATEGORY_ID`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-14 22:51:47
