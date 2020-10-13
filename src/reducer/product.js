import { act } from "react-dom/test-utils"

const product = (state = [], action) => {
    switch (action.type) {
        case 'INIT_PRODUCT':
            return action.data
        case 'ADD_PRODUCT':
            return [...state, action.data]
        case 'DELETE_PRODUCT':
            return state.filter(p => p._id !== action.data)
        default:
            return state
    }
}

export default product