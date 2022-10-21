import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './userSlice'

let cart = createSlice({
    name : 'cart',
    initialState :  [
        {id : 0, name : 'product 1', price: 50000, count : 2},
        {id : 1, name : 'product 2', price: 10000, count : 1}
    ] ,
    reducers : {
        addCount(state, action){
            let idNum = state.findIndex((a)=>{
                return a.id === action.payload
            })
            if (state[idNum].count < 20) state[idNum].count++;
            else if (state[idNum].count >= 20) alert('1인 구매 하실 수 있는 최고 수량은 20개 입니다.')
        },
        addItem(state, action){
            state.push(action.payload)
        },
        minusCount(state, action){
            let idNum = state.findIndex((a)=>{
                return a.id === action.payload
            })
            if (state[idNum].count > 1) state[idNum].count--;
            else if (state[idNum].count <= 1) alert('1인 구매 하실 수 있는 최소 수량은 1개 입니다.')
        },
        deleteCount(state, action) {
            action.payload.remove();
        }
    }
})

export let { addCount, addItem, minusCount, deleteCount } = cart.actions

export default configureStore({
    reducer: {
        user : user.reducer,
        cart : cart.reducer
    }
})