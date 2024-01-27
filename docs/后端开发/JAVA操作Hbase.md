---
title: JAVA操作Hbase
category:
  - 技术记录
order: 8
date: 2023-12-19
tag: mine
sticky: 9994
---

记一次工作中，对接别家企业的hbase数据库，提取数据，存到我们的系统里。记录一个简单的java demo，就当做是一个总结。

### 1.Hbase简单操作

#### 创建hbase

用docker创建一个hbase容器，方便快速上手

```shell
[root@host ~]# docker run -d --name hbasetest -p 2181:2181 -p 16010:16010 -p 16020:16020 -p 16030:16030 harisekhon/hbase
```

创建好之后，可以访问部署hbase的16010端口，就可以看到默认的管理页面，可以更好的管理和监控Hbase集群

#### 进入hbase

进入到容器内部之后，输入以下命令

```shell
hbase shell
```

成功之后就显示以下指示

```
hbase(main):001:0> 
```

#### 操作hbase

创建一个"test"命名空间(库)，在该命名空间下创建一个“history”的历史表，列簇“sensor_value”

```shell
建库：create_namespace 'test'
建表：create 'test:history','sensor_value'   
```



### 2.java操作Hbase

```java
public class HbaseTest {
    public static void main(String[] args) {
        Configuration config = null;
        Connection conn = null;
        Table table = null;
        //创建配置
        config = HBaseConfiguration.create();
        config.set("hbase.zookeeper.quorum", "ip地址");
        config.set("hbase.zookeeper.property.clientPort", "端口");

        try {
            //创建连接
            conn = ConnectionFactory.createConnection(config);
            //获取表
            table = conn.getTable(TableName.valueOf("表名"));

            //查询指定表的全部数据
            //queryAllTableData(table);

            /*ResultScanner scanner = getScanner(table);
            processResult(scanner);*/
            String startKey = "S0003011653025903254";
            String endKey = "S0003011684598400000";
            ResultScanner scanner = getScanner(table, startKey, endKey);
            
            for (Result result : scanner) {
                System.out.println(result);
                output(result);
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            try {
                if (table != null) {
                    table.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    /**
     * 输出
     * @param result
     * @throws IOException
     */
    private static void output(Result result) throws IOException {
        CellScanner cellScanner = result.cellScanner();
        System.out.println(cellScanner);
        while (cellScanner.advance()) {
            System.out.println("while");
            Cell cell = cellScanner.current();
            //本kv所属的行键的字节数组
            byte[] rowArray = cell.getRowArray();
            //列族名的字节数组
            byte[] familyArray = cell.getFamilyArray();
            //列名的字节数据
            byte[] qualifierArray = cell.getQualifierArray();
            // value的字节数组
            byte[] valueArray = cell.getValueArray();
            long timestamp = cell.getTimestamp();

            System.out.printf("|%10s|%10s|%10s|%10s|%10s|\n",
                    new String(rowArray, cell.getRowOffset(), cell.getRowLength()),
                    new String(familyArray, cell.getFamilyOffset(), cell.getFamilyLength()),
                    new String(qualifierArray, cell.getQualifierOffset(), cell.getQualifierLength()),
                    new String(valueArray, cell.getValueOffset(), cell.getValueLength()),
                    String.valueOf(timestamp));
        }
    }

    /**
     * 查询指定表的全部数据
     */
    private static void queryAllTableData(Table table) {

        try {
            ResultScanner scanner = table.getScanner(new Scan());

            System.out.printf("|%10s|%10s|%10s|%10s|\n", "row key", "family", "qualifier", "value");
            for (Result result : scanner) {
                output(result);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static ResultScanner getScanner(Table table) {
        try {
            Scan scan = new Scan();
            return table.getScanner(scan);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    public static ResultScanner getScanner(Table table, String startRowKey, String endRowKey) {
        try {
            Scan scan = new Scan();
            scan.withStartRow(Bytes.toBytes(startRowKey));
            scan.withStopRow(Bytes.toBytes(endRowKey));
            return table.getScanner(scan);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
```

