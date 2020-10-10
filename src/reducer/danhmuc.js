const init = [
    {
        _id:1,
        name:"Đông trùng hạ thảo"
    },
    {
        _id:2,
        name:"Tảo biển nhật"
    }
]

const danhmucReducer = (state=[...init],action) => {
    switch(action.type){
        default:
            return state
    }
}

export default danhmucReducer