---
title: MySQL索引
category:
  - 技术记录
order: 6
date: 2023-05-25
tag: mine
sticky: 9996
---

### 1.索引简介

> 定义

索引相当于一本书的目录，MySQL中的索引是一种帮助高效获取数据的数据结构。

MySQL使用B+树实现索引，B+树的特点是叶子结点包含了所有的关键字信息和data数据，非叶子结点只包含子节点的最大或者最小关键字

> 索引的优缺点

索引的优点：

- 索引大大减少了服务器需要扫描的数据量，加快检索速度
- 索引可以帮助服务器避免排序和临时表
- 索引可以将随机I/O变位顺序I/O
- 使用索引可以减少访问的行数，从而减少锁的竞争，提高并发

索引的缺点：

- 创建和维护索引要耗费时间
- 索引需要占用额外的物理空间
- 写操作(`insert`/`update`/`delete`)需要更新索引，导致数据库的写操作性能降低

> 适合创建索引的情况

- 频繁作为查询条件的字段
- 经常与其他表进行连接的表，在连接字段上应该建立索引
- 查询中，经常用来统计、分组、排序的字段
- 数据量很大的情况下

> 不适合创建索引的情况

- 数据量很少的情况下
- 频繁进行写操作(`insert`/`update`/`delete`)
- 数据重复且分布平均的表字段(男/女)

### 2.索引的数据结构

> B+树简介

B+Tree中的B是值balance，意为平衡。需要注意的是，B+树索引并不能找到一个给定键值的具体行，它找到的只是被查找数据行所在的页，接着数据库会把页读入到内存，再在内存中进行查找，最后得到要查找的数据。

B+树是一种多路搜索树。B+树索引适用于全键值查找、键值范围查找和键前缀查找，其中键前缀查找只适用于最左前缀查找

B+Tree有几个重要特征：

- 根节点至少一个元素
- 非根节点元素范围：m/2 <= k <= m-1

- B+树有两种类型的节点：内部节点(也称索引节点)和叶子节点。内部节点就是非叶子节点，内部节点不存储数据，只存储索引，数据都存储在叶子节点。
- 内部节点中的key都按照从小到大的顺序排列，对于内部节点中的一个key，左树中的所有key都小于它，右子树中的key都大于等于它。叶子节点中的记录也按照key的大小排列。
- 每个叶子节点都存有相邻叶子节点的指针，叶子节点本身依关键字的大小自小而大顺序链接
- 父节点存有右孩子的第一个元素的索引

![a0e0415e-bd99-4534-b6da-9130eb98d2d7](https://feilou.oss-cn-nanjing.aliyuncs.com/images/a0e0415e-bd99-4534-b6da-9130eb98d2d7.webp)

> 插入操作

插入操作只需要记住一个技巧：当节点元素数量大于m-1的时候，按中间元素分裂成左右两部分，中间元素分裂到父节点当做索引存储，但是，本身中间元素还是分裂右边这一部分的。

下面以一颗5阶B+树的插入过程为例，5阶B+树的节点最少2个元素，最多4个元素

- 插入5,10,15,20

  ![acf5a320-7d7a-4985-a1ad-0846065e0c7d](https://feilou.oss-cn-nanjing.aliyuncs.com/images/acf5a320-7d7a-4985-a1ad-0846065e0c7d.webp)

- 插入25，此时元素数量大于4个了，分裂

![05bf32af-8bc4-4134-a7e9-3f8be044287b](https://feilou.oss-cn-nanjing.aliyuncs.com/images/05bf32af-8bc4-4134-a7e9-3f8be044287b.webp)

- 接着插入26,30，继续分裂

![330cc277-e2b4-4f91-b3aa-025f417eb449](https://feilou.oss-cn-nanjing.aliyuncs.com/images/330cc277-e2b4-4f91-b3aa-025f417eb449.webp)

![f5120f6b-e1f8-4ecb-ad2c-bd00f6476dfe](https://feilou.oss-cn-nanjing.aliyuncs.com/images/f5120f6b-e1f8-4ecb-ad2c-bd00f6476dfe.webp)

> 删除操作

因为叶子节点有指针的存在，向兄弟节点借元素时，不需要通过父节点了，而是可以直接通过兄弟节点移动即可(前提是兄弟节点的元素大于m/2)，然后更新父节点的索引；

如果兄弟节点的元素不大于m/2(兄弟节点也没有多余的元素)，则将当前节点和兄弟节点合并，并且删除父节点中的key

### 3.索引的分类

根据叶子节点的内容，索引类型分为主键索引(聚簇索引)和非主键索引(非聚簇索引)











> 分类

索引的分类

- 主键索引(PRIMARY KEY)：一种特殊的唯一索引，不允许有空值
- 唯一索引(UNIQUE)：不可以出现相同的值，可以有NULL值，如果是组合索引，则列值的组合必须唯一
- 普通索引(INDEX)：允许出现相同的索引内容，做基本的索引，没有任何限制
- 全文索引(FULLTEXT INDEX)：主要用来查找文本中的关键字，而不是直接与索引中的值相比较
- 联合索引：实质上是将多个字段建到一个索引里

> 创建索引

```sql
-- 创建表时定义索引
CREATE TABLE `aux_combiner_performance` (
  `device_id` varchar(50) NOT NULL COMMENT '设备id',
  `performance_id` varchar(4) DEFAULT NULL COMMENT '组串性能 1正常 0故障低效',
  `normal_count` varchar(4) NOT NULL DEFAULT '0' COMMENT '组串正常个数',
  `inefficient_count` varchar(4) NOT NULL DEFAULT '0' COMMENT '组串低效个数',
  `fault_count` varchar(4) NOT NULL DEFAULT '0' COMMENT '组串故障个数',
  UNIQUE KEY `DEVICENODEID` (`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='汇流箱组串性能'
-- 添加索引
create unique index 索引名 on 表名(字段);
create index 索引名 on 表名(字段);

alter table 表名 add 索引类型 索引名(字段)
-- 删除索引
drop index 索引名 on 表名
-- 查看索引
show index from 表名
```

> 索引失效的情况

数据库索引遵循最左匹配原则

- 在索引列字段上做计算函数等操作，会失效
- 数据类型的隐式转换
- 使用 !=、>、<失效
- like以通配符开头'%abc'
- or连接两边都要有索引
- is null ,is not null 也无法使用索引