<template>
  <el-dialog class="big-dialog AddSpecification" title="规格设置" :visible.sync="showFlag">
    <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-formData">
      <el-form-item label="规格项目" prop="specifications">
        <el-checkbox-group v-model="formData.specifications" size="mini" @change="optionChange">
          <el-checkbox v-for="(val,index) in options" :key="index" :checked="true" :label="val.id" border>{{val.name}}</el-checkbox>
          <el-button size="mini" class="btn-yellow" style="margin-left: 25px;" @click="AddSize(options[0].cid3)">添加
          </el-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item  v-for="(vals,inde) in checkOptions" :key="inde" :label="vals.name">
        <el-checkbox-group v-model="vals.check">
          <el-checkbox v-for="(val,index) in vals.size" :label="val" :key="index" @change="subOptionChange" :checked="false">{{val}}</el-checkbox>
          <el-button size="mini" class="btn-green" style="margin-left: 25px;" @click="AddSubSize(vals)">添加
          </el-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-for=" (value,index) in saleParam"   :label="saleParamArr[index]" >
        <el-form ref="formData" :inline="true" class="demo-formData"
                 label-position="left"  >
          <el-form-item label="标题" >
            <el-input v-model="skuListData[index].title" style="width: 200px" ></el-input>
          </el-form-item>
          <el-form-item label="价格" >
            <el-input v-model="skuListData[index].price" style="width: 80px" ></el-input>
          </el-form-item>
          <el-form-item label="原价" >
            <el-input v-model="skuListData[index].originalPrice" style="width: 80px" ></el-input>
          </el-form-item>
          <el-form-item label="会员价" >
            <el-input v-model="skuListData[index].memberPrice" style="width: 80px" ></el-input>
          </el-form-item>
          <el-form-item label="库存" >
            <el-input v-model="skuListData[index].skuStock.stock" style="width: 200px" ></el-input>
          </el-form-item>
          <el-form-item label="图片地址" >
            <!--<img-update :file-list="skuListData[index].images" :limit="5" v-on:getFile="getFile[index]"/>-->
            <el-input v-model="skuListData[index].images" style="width: 150px" ></el-input>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">立即设置</el-button>
        <!--        <el-button @click="resetForm('formData')">重置</el-button>-->
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import ImgUpdate from '../imgUpdate/ImgUpdate'
import { addSaleParam, addSKu } from 'api/index'
export default {
  name: 'AddSpecification',
  components: { ImgUpdate },
  data () {
    return {
      showFlag: false,
      fileList: [],
      formData: {
        specifications: [],
      },
      skuListData: [
        { title: '', price: '', originalPrice: '', memberPrice: '', skuStock: { stock: '' }, images: '', ownParam: '' }
      ],
      rules: {
        name: [
          { required: true, message: '请输入问题关键字', trigger: 'blur' },
        ],
      },
      checkAll: false,
      sendOption: [
        { size: [], name: '', id: [] }
      ],
      options: [
        {
          size: ['金色', '白色'],
          name: '颜色',
          id: '2'
        },
        {
          size: ['12', '13'],
          name: '尺寸',
          id: '2'
        },
      ],
      checkOptions: [],
      saleParam: [],
      saleParamArr: [],
      sendData: {},
      cid3: '',
      spuId: '',
      addParam: ''
    }
  },
  mounted () {
  },
  methods: {
    //顶级属性
    optionChange (value) {
      // this.checkOptions = this.options.filter((v) => value.includes(v.id))
      // // { size: [], name: '', id: [] }
      // let arr = []
      // this.checkOptions.forEach(item => {
      //   let obj = { size: [], name: '', id: '' }
      //   obj.id = item.id
      //   let itemSize = []
      //   item.size.forEach(val => {
      //     itemSize.push(val.sizeid)
      //   })
      //   obj.size = itemSize
      //   arr.push(obj)
      // })
      // this.sendOption = arr
    },
    getFile (value) {
      this.formData.spuDetail.bannerImages = JSON.stringify(value)
    },
    subOptionChange () {
      console.log('测试')
      let a = []
      this.checkOptions.forEach(item => {
        if (item.check.length !== 0) {
          a.push(item)
        }
      })
      var jsonArr = JSON.stringify(a)
      let arrs = JSON.parse(jsonArr)
      // console.log(paramArr)
      function generateGroup (arr) {
        //初始化结果为第一个数组
        var result = arr[0].check
        //从下标1开始遍历二维数组
        for (var i = 1; i < arr.length; i++) {
          //使用临时遍历替代结果数组长度(这样做是为了避免下面的循环陷入死循环)
          var size = result.length
          //根据结果数组的长度进行循环次数,这个数组有多少个成员就要和下一个数组进行组合多少次
          for (var j = 0; j < size; j++) {
            //遍历要进行组合的数组
            for (var k = 0; k < arr[i].check.length; k++) {
              //把组合的字符串放入到结果数组最后一个成员中
              //这里使用下标0是因为当这个下标0组合完毕之后就没有用了，在下面我们要移除掉这个成员
              result.push(result[0] + ',' + arr[i].check[k])
            }
            //当第一个成员组合完毕，删除这第一个成员
            result.shift()
          }
        }
        return result
      }
      const paramArr = generateGroup(arrs)
      this.saleParamArr = paramArr
      let lastArr = []
      // console.log(a)
      for (let i = 0; i < paramArr.length; i++) {
        var itemArr = paramArr[i].split(',')
        var obj = {}
        let count = 0
        for (let j = 0; j < itemArr.length; j++) {
          obj[a[j].id] = itemArr[j]
        }
        lastArr.push(obj)
        count = 0
      }
      let xx = []
      console.log(lastArr)
      lastArr.forEach(item => {
        let o = { title: '', price: '', originalPrice: '', memberPrice: '', skuStock: { stock: '' }, images: '', ownParam: '' }
        o.ownParam = JSON.stringify(item)
        xx.push(o)
      })
      this.skuListData = JSON.parse(JSON.stringify(xx))
      this.saleParam = lastArr
    },
    async submitForm (formName) {
      let saleParam = {}
      this.checkOptions.forEach(item => {
        saleParam[item.id] = item.size
      })
      this.sendData.saleParam = JSON.stringify(saleParam)
      this.sendData.skuList = this.skuListData
      this.sendData.spuId = this.spuId
      console.log(this.sendData)
      const result = await addSKu(this.sendData)
      if (result.code === 20000) {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.showFlag = false
      }
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    //添加顶级规格
    AddSize (cid3) {
      this.$prompt('请输入规格名称', '添加规格', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(async ({ value }) => {
        const result = await addSaleParam({ cid3, name: value })
        if (result.code === 20000) {
          //发送添加父规格规格请求
          this.$message({
            type: 'success',
            message: '添加成功' + name
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    //添加子规格
    AddSubSize (values) {
      this.$prompt('请输入规格名称', values.name, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        //发送添加子规格请求
        values.size.push(value)
        this.$message({
          type: 'success',
          message: '添加成功' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  /deep/.el-dialog {
    width: 90% !important;
  }
</style>
