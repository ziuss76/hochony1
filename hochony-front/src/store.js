import { configureStore, createSlice } from '@reduxjs/toolkit'


let cart = createSlice({ // state 생성하기 useState 같은 거임
  name : 'cart',
  initialState : [],
  reducers : {
  // 변수로 초기값 만들고 reducer 안에 넣기 그리고 state 수정하는 법도 작성
  addItem(state, action) {
    let found = state.findIndex((a)=>{return a.id === action.payload})
    if (found >= 0){
      state[found].quan++;

    } else {
      state.push(action.payload);
    }
  },
  addCount (state, action) {
    let found = state.findIndex((a)=>{return a.id === action.payload})
    state[found].quan++;
  },
  subCount(state, action) {
    let found = state.findIndex((a)=>{return a.id === action.payload})
    if (state[found].quan > 1) {
      state[found].quan--;
    } else if (state[found].quan <= 1) {
      delete(state[found]);
    }
    
  }
  }
})
export let {addItem, addCount, subCount} = cart.actions

export default configureStore({ // reducer 사용 등록 props 등록 같은 거임
  reducer: {
    cart : cart.reducer
   }
}) 