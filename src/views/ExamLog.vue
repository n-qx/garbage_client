<!--答题记录-->
<template>
  <div class="body">
    <div class="center">
      <el-form status-icon ref="form" label-width="110px" class="demo-ruleForm">
        <el-row>
          <el-col :span="7">
            <el-form-item label="垃圾名称">
              <el-input
                type="text"
                v-model="queryParam.garbageName"
                @keyup.enter.native="fetchData"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="问卷编号">
              <el-input
                type="text"
                v-model="queryParam.examSn"
                @keyup.enter.native="fetchData"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-left: -60px">
            <el-form-item>
              <el-button type="primary" @click="fetchData">查询</el-button>
              <el-button @click="queryParam={}">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row>
            <el-col :span="8">
              <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button @click="queryParam={}">重置</el-button>
              </el-form-item>
            </el-col>
        </el-row>-->
      </el-form>
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            prop="examSn"
            label="问卷编号"
            width="160">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名称"
            width="115">
          </el-table-column>
          <el-table-column
            prop="garbageName"
            label="垃圾名称"
            width="125">
          </el-table-column>
          <el-table-column
            prop="answerId"
            label="用户答案"
            width="125">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.answerId !== null"
                :type="styleMap[scope.row.answerId].style"
                disable-transitions>{{ styleMap[scope.row.answerId].name }}</el-tag>
              <el-tag
                v-else
                type="warning">未答题</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="sortId"
            label="正确答案"
            width="125">
            <template slot-scope="scope">
              <el-tag
                :type="styleMap[scope.row.sortId].style"
                disable-transitions>{{ styleMap[scope.row.sortId].name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="answerState"
            label="是否答对"
            width="90">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.answerState !== null"
                :type="styleMap2[scope.row.answerState].style"
                disable-transitions>{{ styleMap2[scope.row.answerState].name }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 20px;">
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
import request from '../utils/request'

export default {
  name: 'ExamLog',
  components: {},
  data () {
    return {
      styleMap: [
        {
          style: ''
        },
        {
          style: 'primary',
          name: '可回收垃圾'
        },
        {
          style: 'danger',
          name: '有害垃圾'
        },
        {
          style: 'success',
          name: '厨余垃圾'
        },
        {
          style: 'info',
          name: '其他垃圾'
        }
      ],
      styleMap2: [
        {
          style: 'info',
          name: '未答题'
        },
        {
          style: 'success',
          name: '答对了'
        },
        {
          style: 'danger',
          name: '答错了'
        }
      ],
      options: [
        {
          value: 1,
          label: '可回收垃圾'
        },
        {
          value: 2,
          label: '有害垃圾'
        },
        {
          value: 3,
          label: '厨余垃圾'
        },
        {
          value: 4,
          label: '其他垃圾'
        }
      ],
      queryParam: {},
      tableData: [],
      multipleSelection: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      loading: false,
      roleId: 2
    }
  },
  created () {
    this.roleId = localStorage.getItem('roleId')
    this.fetchData()
  },
  filters: {
  },
  methods: {
    fetchData () {
      let req = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        queryParam: JSON.stringify(this.queryParam)
      }
      this.loading = true
      const that = this
      request.postNoJSON({url: '/api/exam/list', data: req}).then(res => {
        if (res.message === 'success') {
          that.tableData = res.result.data
          that.total = res.result.totalCount
          for (let data of that.tableData) {
            if (data.answerId === null) { // 0未答 1正确 2错误
              data.answerState = 0
            } else {
              if (data.answerId === data.sortId) {
                data.answerState = 1
              } else {
                data.answerState = 2
              }
            }
          }
        } else {
          this.$message.error('查询失败')
        }
        that.loading = false
      }).catch(err => {
        that.loading = false
        console.log(err)
      })
    },
    goto (val) {
      this.$router.push({name: val})
    },
    goBack () {
      this.$router.back()
    },

    current_change (currentPage) {
      this.currentPage = currentPage
      this.fetchData()
    },
    handleSelectionChange () {
    },
    handleOK () {
      this.$nextTick().then(() => {
        this.fetchData()
      })
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
