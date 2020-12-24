<template>
  <div class="body">
    <div class="center">
      <el-form status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="垃圾类别">
          <el-input type="text" v-model="queryParam.garbageType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="垃圾种类">
          <el-input type="text" v-model="queryParam.garbageFlag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="垃圾名称">
          <el-input type="text" v-model="queryParam.garbageName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="处理方法">
          <el-input type="text" v-model="queryParam.garbageInfo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GarbageManage',
  data () {
    return {
      queryParam: {}
    }
  },
  methods: {
    goto (val) {
      this.$router.push({name: val})
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

.body {
  width: 100%;
  height: 100%;
}

.center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
