import mockRequest from '@/utils/mockRequest '

const state={
    list:{}
};
const mutations={
    GETDATA(state,list){
            state.list=list
    }
};
const actions={
    // 请求mock的数据
    async getdata({commit}){
       let re= await mockRequest.get('/home/list')
       if(re.code==20000){
                commit('GETDATA',re.data)
       }
    }
};
const getters={};
export default {
    state,
    mutations,
    actions,
    getters,
}  

