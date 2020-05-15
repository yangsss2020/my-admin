import ajax from './ajax'

const BASE_URL = '/manage'

/*
登录模块
 */
//登录
export const Ilogin = (data) => ajax(BASE_URL + '/login', data, 'post')
export const logout = () => ajax(BASE_URL + '/logout')
export const getCurrentAdmin = () => ajax(BASE_URL + '/sms/admin/current')
//获取短信验证码
export const IgetSms = (data) => ajax(BASE_URL + '/loginSms', { phone: data, })
export const IgetCaptcha = (data) => ajax(BASE_URL + '/loginCaptcha')

/*
事业部
 */
export const getBSList = (data) => ajax(BASE_URL + '/business/business', { 'class': 'select', page: data, })
export const editBS = (data) => ajax(BASE_URL + '/business/business', { 'class': 'add', ...data, }, 'post')
export const findBsById = (data) => ajax(BASE_URL + '/business/business?class=echoed', data, 'post')

/*
商品管理
 */
// 商品
export const getAllGoods = (data) => ajax(BASE_URL + '/pms/spu', { ...data })

export const getSkus = (spuId) => ajax(BASE_URL + '/pms/sku/skus', { spuId })
//根据id查询商品信息
export const findByIdGoods = (data) => ajax(BASE_URL + '/goods/goods', { 'class': 'find', id: data, })
//新增商品
export const addGoods = (data) => ajax(BASE_URL + '/pms/spu', { ...data }, 'post')
//修改商品
export const editGoods = (data) => ajax(BASE_URL + '/goods/goods', { 'class': 'edit', ...data, }, 'post')
//新增sku
export const addSKu = (data) => ajax(BASE_URL + '/pms/sku/sale-param', { ...data }, 'post')
//商品分类
export const getAllGoodsClassify = (data) => ajax(BASE_URL + '/pms/category', {
  page: data,
})
//添加销售属性
export const addSaleParam = (data) => ajax(BASE_URL + '/pms/sale-param', {
  ...data
}, 'post')
//商品基本属性
export const getBaseParam = (cid3) => ajax(BASE_URL + '/pms/base-param', { cid3 })
export const getSaleParam = (spuId) => ajax(BASE_URL + '/pms/spu/sale-param', { spuId })

//文章
//获取文章列表
export const getAllArticle = (data) => ajax(BASE_URL + '/article/article', { 'class': 'select', page: data, })

//文章分类
//获取文章分类列表
export const getAllArticleClassify = (data) => ajax(BASE_URL + '/article/articleClassify', {
  'class': 'select',
  page: data,
})

//赠送商城
//获取审核列表
export const getAllPresentedApply = (data) => ajax(BASE_URL + '/members/applyTime', {
  'class': 'select',
  page: data,
})

//订单
//获取订单列表
export const getAllOrder = (data) => ajax(BASE_URL + '/order/order', { 'class': 'select', page: data, })

//游客订单
//获取游客订单列表
export const getAllVisitorOrder = (data) => ajax(BASE_URL + '/order/tourisOrder', {
  'class': 'select',
  page: data,
})

//公共图片
//获取公共图片列表
export const getAllPublicImg = (data) => ajax(BASE_URL + '/journal/Publicimg', {
  'class': 'select',
  page: data,
})
//根据id查找图片信息
export const findByIdPublicImg = (data) => ajax(BASE_URL + '/journal/Publicimg', {
  'class': 'find',
  id: data,
})
//添加/编辑图片
export const addPublicImg = (data) => ajax(BASE_URL + '/journal/Publicimg', { 'class': 'add', ...data, }, 'post')
//根据id删除图片
export const delByIdPublicImg = (data) => ajax(BASE_URL + '/journal/Publicimg', {
  'class': 'delete',
  id: data,
})


//日志管理
//日志列表
// export const getAllLog = (data) => ajax(BASE_URL + '/journal/logget', { 'class': 'select', page: data, })

//图片管理
//删除图片

export const delImg = (key) => ajax(BASE_URL + '/upload/img/', { key }, 'delete')
export const addImg = (data) => ajax(BASE_URL + '/img/imgUpload', { 'img_type': 'add', file: data, })
