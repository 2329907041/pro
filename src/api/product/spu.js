import request from '@/utils/request'
// 获得列表属性
export const getspu = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, methods: 'get', params: { category3Id } })
// 获取spu信息
export const getspunew = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, methods: 'get' })
// 获取品牌信息
export const getspuneww = () => request({ url: `/admin/product/baseTrademark/getTrademarkList`, methods: 'get' })
// 获得图片
export const getspupri = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, methods: 'get' })
// 删除spu
export const delspu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, methods: 'delete' })

// 获得销售属性
export const getspushu = () => request({ url: `/admin/product/baseSaleAttrList`, methods: 'get' })
// 保存spu
// POST /admin/product/updateSpuInfo
export const requpdataspi = (spuinfo) => {
    // 携带的参数id----修改id---没有--添加
    if (spuinfo.id) {
        return request({ url: `/admin/product/updateSpuInfo`, methods: 'POST', data: spuinfo })
    } else {
        return request({ url: `/admin/product/saveSpuInfo`, methods: 'POST', data: spuinfo })
    }
}


