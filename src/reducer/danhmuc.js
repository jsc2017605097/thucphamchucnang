const danhmucReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_CATEGORY':
            return action.data
        case 'ADD_CATEGORY':
            return [...state, action.data]
        case 'DELETE_CATEGORY':
            return state.filter(c => c._id !== action.data)
        default:
            return state
    }
}

export default danhmucReducer