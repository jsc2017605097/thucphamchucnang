
const cart = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            let trung
            state.forEach(product => {
                if (product._id === action.data._id) {
                    trung = true
                    return 1
                }
            })
            if (trung) {
                return state.map(product => {
                    if (product._id === action.data._id) {
                        product.soluong += 1
                        return product
                    }
                    return product
                })
            }
            return [...state, { ...action.data, soluong: 1 }]
        case 'DELETE_CART':
            return state.filter(product => product._id !== action.data)
        case 'PRE_CART':
            if (action.data.soluong === 1) {
                return state
            }
            return state.map(product => {
                if (product._id === action.data._id) {
                    product.soluong -= 1
                }
                return product
            })
        case 'INCREASE_CART':
            return state.map(product => {
                if (product._id === action.data._id) {
                    product.soluong += 1
                }
                return product
            })
        default:
            return state
    }
}

export default cart