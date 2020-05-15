<template>
  <div class="goodsAdd common-css">
    <div class="wrapper">
      <!--    导航栏-->
      <el-row class="nav" type="flex">
        <div class="test">
        </div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </div>
    <el-form :model="formData" :rules="rules" ref="formData" label-width="106px" class="form"
             label-position="left">
      <el-form-item label="商品名称" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="子标题" prop="subTitle">
        <el-input v-model="formData.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="category">
        <el-cascader
          v-model="formData.cid"
          :options="goodsClassify"
          :props="optionProps"
          @change="handleCategoryChange"
        ></el-cascader>
      </el-form-item>
      <!--<el-form-item label="原价" prop="originalprice">-->
      <!--<el-input v-model="formData.originalprice"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="现价" prop="rulingprice">-->
      <!--<el-input v-model="formData.rulingprice"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="会员价" prop="memberprice">-->
      <!--<el-input v-model="formData.memberprice"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="成本价" prop="costprice">-->
      <!--<el-input v-model="formData.costprice"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="起购数量" prop="purchase_num">-->
      <!--<el-input v-model="formData.purchase_num"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="重量(公斤)" prop="weight">-->
      <!--<el-input v-model="formData.weight"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="库存" prop="total">-->
      <!--<el-input v-model="formData.total"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formData.sort"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="saleable">
        <el-select v-model="formData.saleable" placeholder="请选择状态" value="">
          <el-option
            v-for="item in saleableOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="基本属性">
        <el-form :model="formData" ref="formData" :inline="true" class="demo-formData"
                 label-position="left">
          <el-form-item v-for=" (value,index) in baseParam" :key="index" :label="value.name">
            <el-input v-model="value.value"></el-input>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="商品图片" prop="spuDetail.bannerImages">
        <img-update :file-list="fileList" :limit="5" v-on:getFile="getFile2"/>
      </el-form-item>
      <el-form-item label="售后服务" prop="spuDetail.afterService">
        <el-input v-model="formData.spuDetail.afterService"></el-input>
      </el-form-item>
      <el-form-item label="商品详情" prop="spuDetail.description">
        <tinymce v-model="formData.spuDetail.description"/>
        <!--        <el-input type="textarea" v-model="formData.desc"></el-input>-->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')">确定</el-button>
        <el-button @click="resetForm('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Tinymce from 'components/tinymce/tinymce'
import { addGoods, editGoods, findByIdGoods, delImg, getBaseParam } from 'api/index'
import ImgUpdate from 'components/imgUpdate/ImgUpdate'

export default {
  name: 'goodsAdd',
  components: { ImgUpdate, Tinymce },
  data () {
    return {
      msg: '',
      disabled: false,
      optionProps: {
        value: 'id',
        label: 'name',
      },
      fileList: [],
      saleableOptions: [{
        value: true,
        label: '上架'
      }, {
        value: false,
        label: '下架'
      }],
      formData: {
        id: '', //商品id
        title: '', //商品名称
        subTitle: '',
        cid: [], //商品分类
        cid1: '',
        cid2: '',
        cid3: '',
        sort: '', //排序
        saleable: '', //状态
        spuDetail: {
          afterService: '',
          bannerImages: '',
          baseParam: '',
          description: '',
        },
      },
      baseParam: [],
      rules: {
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        subTitle: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        cid: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ],
        saleable: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    ...mapState(['goodsList', 'goodsClassify'])
  },
  methods: {
    async handleCategoryChange (data) {
      const result = await getBaseParam(data[2])
      if (result.success === true) {
        this.baseParam = result.data
      }
      this.formData.cid1 = data[0]
      this.formData.cid2 = data[1]
      this.formData.cid3 = data[2]
    },
    getFile2 (value) {
      this.formData.spuDetail.bannerImages = JSON.stringify(value)
    },
    submitForm (formName) {
      let param = {}
      this.baseParam.forEach(item => {
        param[item.id] = item.value
      })
      this.formData.spuDetail.baseParam = JSON.stringify(param)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //提交表单
          if (!this.$route.query.id) {
            //增加商品
            let result = await addGoods(this.formData)
            if (result.code === 20000) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              // this.$router.push({ path: '/home/goodsList' })
            } else {
              this.$message({
                message: result.message,
                type: 'error'
              })
              this.$router.push({ path: '/home/goodsList' })
            }
          } else {
            let result = await editGoods(this.formData)
            if (result.code === 20000) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: result.message,
                type: 'error'
              })
            }
            //修改商品
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
  },
  async mounted () {
    this.$store.dispatch('getAllGoodsClassify')
    if (!this.$route.query.id) {
    } else {
      const result = await findByIdGoods(this.$route.query.id)
      if (result.code === 200) {
        this.formData = result.data
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import "~styles/mixins.scss";

  .goodsAdd {
    .form {
      background: #fff;
      padding: 15px;
      margin-top: 15px;
    }

  }
</style>
