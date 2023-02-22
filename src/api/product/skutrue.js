import request from '@/utils/request'
// GET /admin/product/list/{page}/{limit}
export const getskulispl=(page,limit)=>request({url:`/admin/product/list/${page}/${limit}`,method:'get'})
// 上架
export const onSale=(skuId)=>request({url:`/admin/product/onSale/${skuId}`,method:'get'})
// 下架
export const cancelSale=(skuId)=>request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})

export const seesku=(skuId)=>request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})

