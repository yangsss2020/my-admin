<template>
  <el-dialog class="big-dialog" title="Sku列表" :visible.sync="showFlag">
    <el-table :data="skuData">
      <el-table-column property="id" label="id"></el-table-column>
      <el-table-column property="title" label="title"></el-table-column>
      <el-table-column property="originalPrice" label="原价"></el-table-column>
      <el-table-column property="memberPrice" label="会员价"></el-table-column>
      <el-table-column property="price" label="价格"></el-table-column>
      <el-table-column property="skuStock.stock" label="库存"></el-table-column>
      <el-table-column property="skuStock.sold" label="售出"></el-table-column>
      <el-table-column property="ownParam" label="规格"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'SkuList',
  data () {
    return {
      showFlag: false,
      skuData: [],
    }
  },
}
</script>

<style scoped lang="scss">
</style>
