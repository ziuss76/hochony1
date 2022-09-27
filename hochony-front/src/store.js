import { configureStore, createSlice } from '@reduxjs/toolkit';

let cart = createSlice({ // state 생성 + useState 같은 거임, state + reducer 를 slice 라고 부름
  name : 'cart',          // 함수 형태의 reducer 라 깔끔하고 원래 복사본 만드는 걸 자동으로 해줘서 원본 바꾸는 형태로 사용 가능
  initialState : [],
  reducers : {
  // 변수로 초기값 만들고 reducer 안에 넣기 그리고 state 수정하는 법도 작성
  addItem(state, action) {
    let found = state.findIndex((a)=>{return a.id === action.payload})
    if (state[found]){
      state[found].quan++;
    } else {
      state.push(action.payload);
    }
    localStorage.removeItem('cartState');
    localStorage.setItem('cartState', JSON.stringify(state))
  },
  addCount(state, action) {
    let found = state.findIndex((a)=>{return a.id === action.payload});
    if (state[found]){
      state[found].quan++;
    }
    localStorage.removeItem('cartState');
    localStorage.setItem('cartState', JSON.stringify(state))
  },
  subCount(state, action) {
    let found = state.findIndex((a)=>{return a.id === action.payload})
    if (state[found].quan > 1) {
      state[found].quan--;
    } else if (state[found].quan <= 1) {
      state.pop(state[found]);
    }
    localStorage.removeItem('cartState');
    localStorage.setItem('cartState', JSON.stringify(state))
  }
  }
});


export let {addItem, addCount, subCount} = cart.actions

export default configureStore({ // reducer 사용 등록 props 등록 같은 거임
  reducer: {
    cart : cart.reducer
   }
}) 