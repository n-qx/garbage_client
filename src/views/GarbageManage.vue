<template>
  <div class="body">
    <div class="center">
      <el-form status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="垃圾类别">
              <el-input type="text" v-model="queryParam.garbageType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="垃圾种类">
              <el-input type="text" v-model="queryParam.garbageFlag"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="垃圾名称">
              <el-input type="text" v-model="queryParam.garbageName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="处理方法">
              <el-input type="text" v-model="queryParam.garbageInfo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="handleSubmit">查询</el-button>
              <el-button @click="queryParam={}">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="120">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="120">
          </el-table-column>
          <el-table-column
            prop="department"
            label="部门"
            width="150">
          </el-table-column>
          <el-table-column
            prop="floor"
            label="楼层"
            width="120">
          </el-table-column>
          <el-table-column
            prop="area"
            label="区域"
            width="120">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 30px;">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="current_change">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GarbageManage',
  data () {
    return {
      queryParam: {},
      tableData: [],
      multipleSelection: [],
      total: 0,
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    goto (val) {
      this.$router.push({name: val})
    },
    goBack () {
      this.$router.back()
    },
    handleSubmit () {
    },
    addUser () {
      this.$http({
        method: 'GET',
        url: 'http://127.0.0.1:8080/api/users'
      }).then(res => {
        console.log(res)
        if (!res.data.errno) {
          this.tableData = res.data.data.users
          this.total = res.data.totalnum
        }
      }).catch(err => {
        console.log(err)
      })
    },

    current_change (currentPage) {
      this.currentPage = currentPage
    },
    handleSelectionChange () {
    },
    handleEdit () {
    },
    handleDelete () {
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
