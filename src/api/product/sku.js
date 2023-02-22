import request from '@/utils/request'
// 获得当前id图片
export const getskuid=(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get',})
// 获得销售属性
export const getskusel=(spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get',})
// 获得3个ID
export const getskucate = (category1Id,category2Id,category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, methods: 'get' })
// 上传数据保存
// export const saveskuall=(skuinfo)=>request({url:`/admin/product/saveSkuInfo`,method:'post',data:skuinfo})
export const saveskuall=(skuInfo)=>request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo});
// 查看sku数据
export const seeS=(spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get',});
