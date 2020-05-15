<template>
  <div class="goodsList common-css">
    <div class="wrapper">
      <!--    导航栏-->
      <!--导航栏-->
      <el-row class="nav" type="flex">
        <div class="test">
          <el-button size="mini" class="btn-purple btn" @click="$router.push('/home/goodsAdd')">添加商品</el-button>
        </div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <!-- 头部搜索区-->
      <el-container class="head row-bg table-short" type="flex">
        <el-container>
          <el-form :inline="true" :model="search" class="demo-form-inline" ref="search">
            <el-form-item label="创建时间:" prop="appTime">
              <el-date-picker
                v-model="search.createTime"
                size="mini"
                type="daterange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="更新时间:" prop="checkTime">
              <el-date-picker
                v-model="search.updateTime"
                type="daterange"
                size="mini"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="shareholderState">
              <el-cascader
                v-model="search.cid3"
                :options="goodsClassify"
                :props="optionProps"
                ></el-cascader>
            </el-form-item>
            <el-form-item prop="shareholderState">
              <el-select v-model="search.saleable" placeholder="状态" value="" size="mini" :span="6">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="keywords">
              <el-input placeholder="关键字搜索" size="mini" v-model="search.keywords"
                        @keyup.enter.native="handelSearch"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btn-blue" @click="handelSearch" size="mini">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="btn-green" @click="$refs.search.resetFields()" size="mini">重置</el-button>
            </el-form-item>
          </el-form>
        </el-container>
      </el-container>
      <el-table class="table-list"
                :data="goodsList.list"
                :height="maxHeight"
                border
                stripe
                :header-cell-style="{background:'#f9f9f9',color:'#333333',fontWeight:'700'}"
                style="width: 100%">
        <el-table-column
          label="ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="分类"
          prop="cid3">
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="title">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{scope.row.saleable?'上架':'下架'}}
          </template>
        </el-table-column>
        <el-table-column
          label="排序"
          prop="sort">
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="createTime">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="updateTime">
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
          prop="name">
          <template slot-scope="scope">
            <el-button class="btn-yellow" icon="el-icon-edit" size="mini"
                       @click="$router.push({path:'/home/goodsAdd',query:{id:scope.row.id}})"></el-button>
            <el-button class="btn-red" @click="handleDelete(scope.row)" icon="el-icon-delete" size="mini"></el-button>
            <el-button class="btn-red" @click="handleSpecification(scope.row)" size="mini">规格设置</el-button>
            <el-button class="btn-red" @click="handleSku(scope.row)" size="mini">sku列表</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="footer" type="flex">
        <div class="left">
          总条数:
          <span class="red1">{{goodsList.total}}</span>
        </div>
        <div class="right">
          <el-pagination
            :layout=page
            background
            :page-size="goodsList.size"
            @current-change="changeClick"
            :total="goodsList.total">
          </el-pagination>
        </div>
      </el-row>
    </div>
    <add-specification ref="addSpecification"/>
    <add-shop ref="addShop"/>
    <sku-list ref="skuList"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddSpecification from 'components/goods/AddSpecification'
import AddShop from 'components/goods/AddShop'
import SkuList from '../../components/goods/SkuList'
import { getSkus, getSaleParam } from 'api/index'
export default {
  name: 'goodsList',
  components: { SkuList, AddShop, AddSpecification },
  data () {
    return {
      maxHeight: 420,
      page: 'prev, pager, next',
      search: {
        keywords: '',
      },
      optionProps: {
        value: 'id',
        label: 'name',
      },
      options: [{
        value: true,
        label: '上架'
      }, {
        value: false,
        label: '下架'
      }],
    }
  },
  computed: {
    ...mapState(['goodsList', 'goodsClassify'])
  },
  methods: {
    async handleSku (row) {
      const result = await getSkus(row.id)
      this.$refs.skuList.skuData = result.data
      this.$refs.skuList.showFlag = true
    },
    async handleSpecification (row) {
      this.$refs.addSpecification.options = []
      this.$refs.addSpecification.spuId = row.id
      this.$refs.addSpecification.checkOptions = []
      this.$refs.addSpecification.saleParam = []
      this.$refs.addSpecification.skuListData = [
        { title: '', price: '', originalPrice: '', memberPrice: '', skuStock: { stock: '' }, images: '', ownParam: '' }
      ]
      const result = await getSaleParam(row.id)
      const skuList = await getSkus(row.id)
      // result.data.forEach(item => {
      //   item.check = []
      // })
      if (skuList.code === 20000 && result.code === 20000) {
        this.$refs.addSpecification.options = result.data
        this.$refs.addSpecification.checkOptions = result.data
        this.$refs.addSpecification.subOptionChange()
        this.$refs.addSpecification.skuListData = skuList.data
        this.$refs.addSpecification.showFlag = true
      } else if (result.code === 20000) {
        this.$refs.addSpecification.options = result.data
        this.$refs.addSpecification.checkOptions = result.data
        this.$refs.addSpecification.showFlag = true
      }
      this.$refs.addSpecification.cid3 = result.data[0].cid3
    },
    handleDelete () {
      this.$confirm('是否删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleShowSize () {
      console.log('测试显示')
      this.$refs.edit.showFlag = true
    },
    //搜索
    handelSearch () {
      if (this.search.cid3) {
        this.search.cid3 = this.search.cid3[2]
      }
      this.$store.dispatch('getAllGoods', this.search)
    },
    changeClick: function (e) {
      this.search.page = e
      this.$store.dispatch('getAllGoods', this.search)
    },

  },
  mounted () {
    this.$store.dispatch('getAllGoods', 1)
    this.$store.dispatch('getAllGoodsClassify')
    this._initHeight()
  },
  created () {

  }
}
</script>
<style lang="scss">
  .goodsList {
    .el-table th, .el-table td {
      padding: 6px 0;
    }

    .el-autocomplete-suggestion__wrap {
      padding: 0;
    }

    .fetchitem {
      font-size: 12px;
    }

  }

</style>
<style scoped lang="scss">
  @import "~styles/mixins.scss";
</style>
