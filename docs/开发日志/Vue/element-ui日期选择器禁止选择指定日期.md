---
title: element-ui日期选择器禁止选择指定日期
isOriginal: true
category:
  - 开发日志
  - Vue
---

```vue
<template>
  <div style="margin:20px">
    <el-row>
      禁止选择过去日期（不能选择今天）
      <el-date-picker
        v-model="date1"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions1"
      >
      </el-date-picker>
    </el-row>

    <el-row>
      禁止选择过去日期（可以选择今天）
      <el-date-picker
        v-model="date2"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions2"
      >
      </el-date-picker>
    </el-row>

    <el-row>
      禁止选择未来日期（不能选择今天）
      <el-date-picker
        v-model="date3"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions3"
      >
      </el-date-picker>
    </el-row>

    <el-row>
      禁止选择未来日期（可以选择今天）
      <el-date-picker
        v-model="date4"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions4"
      >
      </el-date-picker>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date1: '',
      date2: '',
      date3: '',
      date4: '',
      pickerOptions1: {
        disabledDate(time) {
          // 禁止选择过去日期（不能选择今天）
          return time.getTime() < Date.now()
        },
      },
      pickerOptions2: {
        disabledDate(time) {
          // 禁止选择过去日期（可以选择今天）
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        },
      },
      pickerOptions3: {
        disabledDate(time) {
          // 禁止选择未来日期（不能选择今天）
          return time.getTime() > Date.now() - 24 * 60 * 60 * 1000
        },
      },
      pickerOptions4: {
        disabledDate(time) {
          // 禁止选择未来日期（可以选择今天）
          return time.getTime() > Date.now()
        },
      },
    }
  },
}
</script>
```
