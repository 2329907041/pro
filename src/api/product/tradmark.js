//获取品牌管理接口
// GET /admin/product/baseTrademark/{page}/{limit}
import req from '@/utils/request'
// GET /admin/product/baseTrademark/{page}/{limit}
// export const gettm = (page, limit) => req({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get', })
export const gettm = (page, limit) => req({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' });
// 添加品牌
export const getpp=(tradmark)=>req({url:`/admin/product/baseTrademark/save`,method:'post' ,data:tradmark} )
// 修改品牌
export const getcp=( tradmark)=>req({url:`/admin/product/baseTrademark/update`,method:'put' ,data:tradmark})
// 删除品牌
export const getdp=(id)=>req({url:`/admin/product/baseTrademark/remove/${id}`,method:'DELETE'})





