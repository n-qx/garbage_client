<template>
  <div class="body">
    <div class="center">
      <el-form status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="题目数量">
              <el-input
                type="number"
                v-model="num"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="handleSubmit">提交</el-button>
              <el-button
                :disabled="loading"
                @click="fetchData">重置题目</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="题目序列号">
              <el-input
                type="text"
                v-model="examSn"
                disabled>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="总题数">
              <el-input
                type="text"
                v-model="dataInfo.total"
                disabled>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="答对题数">
              <el-input
                type="text"
                v-model="dataInfo.right"
                disabled>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="答错题数">
              <el-input
                type="text"
                v-model="dataInfo.wrong"
                disabled>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="未答题数">
              <el-input
                type="text"
                v-model="dataInfo.noAnswer"
                disabled>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="key"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="garbageName"
            label="垃圾名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="garbageFlag"
            label="垃圾种类"
            width="180">
          </el-table-column>
          <el-table-column
            prop="answerId"
            label="你的答案"
            width="180">
            <template slot-scope="scope">
              <el-select
                :disabled="uploaded"
                @change="onChange(scope)"
                v-model="scope.row.answerId"
                placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="sortId"
            label="正确答案"
            width="120">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.sortId"
                :type="styleMap[scope.row.sortId].style"
                disable-transitions>{{ styleMap[scope.row.sortId].name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="answerState"
            label=""
            width="85">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.answerState >= 0 && scope.row.answerState < 3"
                :type="styleMap2[scope.row.answerState].style"
                disable-transitions>{{ styleMap2[scope.row.answerState].name }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../utils/request'

export default {
  name: 'Exam',
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
      examSn: '',
      queryParam: {},
      tableData: [],
      dataInfo: {
      },
      uploaded: false,
      num: 10,
      loading: false
    }
  },
  created () {
    this.fetchData()
  },
  filters: {
  },
  methods: {
    fetchData () {
      if (this.num > 100) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '题目数量过大'})
        return
      }
      let numStr = this.num.toString()
      if (numStr === null || numStr.length === 0) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '题目数量有误'})
        return
      }
      this.loading = true
      const that = this
      request.postNoJSON({url: '/api/exam/getList', data: numStr}).then(res => {
        if (res.message === 'error') {
          that.$message({
            type: 'error',
            showClose: true,
            message: res.result || '获取失败'
          })
        } else {
          that.clearData()
          that.uploaded = false
          that.tableData = res.result
          that.examSn = that.tableData[0].examSn
        }
        that.loading = false
      }).catch(err => {
        that.loading = false
        console.log(err)
      })
    },
    onChange (scope) {
      // console.log(scope.row)
    },
    clearData () {
      this.dataInfo = {
        total: null,
        right: null,
        wrong: null,
        noAnswer: null
      }
    },
    updateData () {
      this.dataInfo = {
        total: this.tableData.length,
        right: 0,
        wrong: 0,
        noAnswer: 0
      }
      for (let i = 0; i < this.tableData.length; i++) {
        let data = this.tableData[i]
        if (!data.answerId) {
          this.dataInfo.noAnswer++
          data.answerState = 0
        } else if (data.answerId === data.sortId) {
          this.dataInfo.right++
          data.answerState = 1
        } else {
          this.dataInfo.wrong++
          data.answerState = 2
        }
      }
    },
    handleOK () {
      this.$nextTick().then(() => {
        this.fetchData()
      })
    },
    handleSubmit () {
      const that = this
      request.postNoJSON({url: '/api/exam/addList', data: this.tableData}).then(res => {
        if (res.message === 'error') {
          that.$message({
            type: 'error',
            showClose: true,
            message: res.result || '获取失败'
          })
        } else {
          that.tableData = res.result
          that.updateData()
          that.uploaded = true
        }
        that.loading = false
      }).catch(err => {
        that.loading = false
        console.log(err)
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
