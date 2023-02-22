import req from '@/utils/request'
// 一级菜单
export const getaa=(id)=>req({url:`/admin/product/get/category1/${id}`,method:'get'})

export const getaal=()=>req({url:`/admin/product/getCategory1`,method:'get'})
// 二级菜单
export const getab=(id)=>({url:`/admin/product/get/category2/${id}`,method:'get'})

export const getabl=(category1Id)=>req({url:`/admin/product/getCategory2/${category1Id}`,method:'get'})
// 三级菜单 
export const getac=(id)=>({url:`/admin/product/get/category3/${id}`,method:'get'})

export const getacl=(category2Id)=>req({url:`/admin/product/getCategory3/${category2Id}`,method:'get'})

// 商品展示接口
export const getall=(category1Id,category2Id,category3Id)=>req({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 添加属性/跟新属性
export const addsxz=(data)=>req({url:`/admin/product/saveAttrInfo`,method:'post',data})

