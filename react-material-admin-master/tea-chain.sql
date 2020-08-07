/*
Navicat MariaDB Data Transfer

Source Server         : localhost
Source Server Version : 100412
Source Host           : localhost:3306
Source Database       : tea-chain

Target Server Type    : MariaDB
Target Server Version : 100412
File Encoding         : 65001

Date: 2020-08-07 15:42:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tea_factory
-- ----------------------------
DROP TABLE IF EXISTS `tea_factory`;
CREATE TABLE `tea_factory` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `factoryname` varchar(32) DEFAULT NULL COMMENT '工厂名称',
  `factorycode` varchar(32) DEFAULT NULL COMMENT '厂家代码',
  `factorytype` varchar(16) DEFAULT NULL COMMENT '厂家类型',
  `username` varchar(32) DEFAULT NULL COMMENT '用户名',
  `walletaddress` varchar(100) DEFAULT NULL COMMENT '钱包地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tea_factory
-- ----------------------------
INSERT INTO `tea_factory` VALUES ('1', 'aaa', 'aaa', '生产', 'admin', null);
INSERT INTO `tea_factory` VALUES ('2', 'bbb', 'bbb', '制造', 'admin', null);
INSERT INTO `tea_factory` VALUES ('3', 'undefined', 'undefined', 'undefined', null, null);
INSERT INTO `tea_factory` VALUES ('4', 'test001', 'undefined', 'test001', null, null);
INSERT INTO `tea_factory` VALUES ('5', 'gggg', 'gggg', '铁观音', null, null);
INSERT INTO `tea_factory` VALUES ('6', 'fadd', 'fadd', 'sss', null, null);

-- ----------------------------
-- Table structure for tea_info
-- ----------------------------
DROP TABLE IF EXISTS `tea_info`;
CREATE TABLE `tea_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tea_type` varchar(32) DEFAULT NULL COMMENT '茶类型',
  `serial_number` bigint(20) DEFAULT NULL COMMENT '序列号',
  `manufacture_date` date DEFAULT NULL COMMENT '生产日期',
  `origin_place` varchar(32) DEFAULT NULL COMMENT '产地',
  `factory_id` bigint(20) DEFAULT NULL COMMENT '厂家ID',
  `asset_address` varchar(100) DEFAULT NULL COMMENT '资产地址',
  `asset_hash` varchar(64) DEFAULT NULL COMMENT '资产哈希码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tea_info
-- ----------------------------
INSERT INTO `tea_info` VALUES ('82', '红茶', '10001', '2020-07-01', '广州', '1', null, null);
INSERT INTO `tea_info` VALUES ('83', '绿茶', '10002', '2020-07-27', '广东', '1', null, null);
INSERT INTO `tea_info` VALUES ('84', '茶1', '10003', '2020-08-06', '湖北', '1', null, null);
INSERT INTO `tea_info` VALUES ('85', '茶1', '10004', '2020-08-06', '湖北', '1', null, null);

-- ----------------------------
-- Table structure for tea_serial_number
-- ----------------------------
DROP TABLE IF EXISTS `tea_serial_number`;
CREATE TABLE `tea_serial_number` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `serial_number_start` bigint(20) DEFAULT NULL COMMENT '序列号开始',
  `serial_number_end` bigint(20) DEFAULT NULL COMMENT '序列号结束',
  `factory_name` varchar(32) DEFAULT NULL COMMENT '厂家名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tea_serial_number
-- ----------------------------
INSERT INTO `tea_serial_number` VALUES ('77', '10001', '10020', 'aaa');
INSERT INTO `tea_serial_number` VALUES ('78', '100051', '100070', 'undefined');
INSERT INTO `tea_serial_number` VALUES ('79', '100071', '100080', 'test001');
INSERT INTO `tea_serial_number` VALUES ('80', '100081', '100090', 'fadd');

-- ----------------------------
-- Table structure for tea_user
-- ----------------------------
DROP TABLE IF EXISTS `tea_user`;
CREATE TABLE `tea_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `login_name` varchar(32) DEFAULT NULL COMMENT '登录名',
  `login_pwd` varchar(32) DEFAULT NULL COMMENT '登录密码',
  `login_role` varchar(16) DEFAULT NULL COMMENT '登录角色',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tea_user
-- ----------------------------
INSERT INTO `tea_user` VALUES ('147', 'admin', 'admin', '1');
INSERT INTO `tea_user` VALUES ('148', '001', '001', '1');
INSERT INTO `tea_user` VALUES ('149', 'aaa', 'aaa', '2');
INSERT INTO `tea_user` VALUES ('155', 'dd', 'dd', '1');
