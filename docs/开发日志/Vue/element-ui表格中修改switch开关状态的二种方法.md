---
title: element-ui表格中修改switch开关状态的二种方法
isOriginal: true
tag:
  - elementUI
  - vue2
category:
  - 开发日志
  - Vue
---

Swich 默认是 boolean 类型，如果后台传值为 number 类型，这个时候我们想用 number 来取代 boolean 类型

这里有个问题需要注意：当你点击修改状态时，弹出提示框，点击取消关闭时，switch 的状态依旧改变了:

<CodePen
  link="https://codepen.io/zhangfanhang/pen/NWYLEJK"
  :theme="$isDarkMode? 'dark': 'light'"
/>

这是因为 v-model 双向绑定原理，点击开关时会实时改变状态，只需要把 v-model 改为:value=""即可

- 第一种：后台字段定义为 0 / 1（给后台传 0 / 1）

```js
<el-table>
  <el-table-column label="状态" width="120">
      <template slot-scope="scope">
        // 区别在这行代码
         <el-switch :value="scope.row.cazt" :active-value="1" :inactive-value="0" @change="handleChangeStatus($event,scope.row.id)"></el-switch>
      </template>
   </el-table-column>
</<el-table>

methods:{
  // 点击修改状态
    handleChangeStatus($event, id) {
  // $event 改变后的值
      if ($event == 1) { // 这里判断一下
        // 启用
        this.$confirm('确认启用吗？', '操作确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await this.$requestInternet.post(`/api/xxx?userid=${id}&status=${$event}`)
            this.$message.success('启用成功')
            this.onSearch()
          })
          .catch(() => {})
      } else {
        // 禁用
        this.$confirm('确认禁用吗？', '操作确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await this.$requestInternet.post(`/api/xxxx?userid=${id}&status=${$event}`)               IW
            this.$message.success('禁用成功')
            this.onSearch()
          })
          .catch(() => {})
      }
    }
}
```

Î

- 第二种：后台字段定义为 true / false（给后台传 true / false）

```js
<el-table>
  <el-table-column label="状态" width="120">
      <template slot-scope="scope">
        // 区别在这行代码
         <el-switch @change="(status)=>handleChangeStatus(status,scope.row.id)" :value="scope.row.status"></el-switch>
      </template>
   </el-table-column>
</<el-table>

methods:{
  // 点击修改状态
    handleChangeStatus($event, id) {
      if ($event) {
        // 启用
        this.$confirm('确认启用吗？', '操作确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await this.$requestInternet.post(`/api/xxx?userid=${id}&status=${$event}`)
            this.$message.success('启用成功')
            this.onSearch()
          })
          .catch(() => {})
      } else {
        // 禁用
        this.$confirm('确认禁用吗？', '操作确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await this.$requestInternet.post(`/api/xxxx?userid=${id}&status=${$event}`)
            this.$message.success('禁用成功')
            this.onSearch()
          })
          .catch(() => {})
      }
    }
}
```
