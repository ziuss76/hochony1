import { configureStore, createSlice } from '@reduxjs/toolkit';

let cart = createSlice({ // state 생성 + useState 같은 거임, state + reducer 를 slice 라고 부름
  name : 'cart',          // 함수 형태의 reducer 라 깔끔하고 원래 복사본 만드는 걸 자동으로 해줘서 원본 바꾸는 형태로 사용 가능
  initialState : [],
  reducers : {
  // 각각의 리듀서(아래 3개기능)에 변수로 초기값 만들어 넣기 그리고 state 수정하는 법도 작성
  addItem(state, action) {
    let found = state.findIndex((a)=>{return a.id == action.payload.id})
    console.log(found, action.payload.id);
    // 같은 상품을 또 추가하면 왜 수량추가가 아닌 새 1개가 또 push 될까? 장바구니버튼 dispatch로 보냈던 action.payload는 객체고 .id를 붙여야 했다
    if (found >= 0){ 
      state[found].quan++;
    } else {
      state.push(action.payload);
    }
    localStorage.removeItem('cartState');
    localStorage.setItem('cartState', JSON.stringify(state))
  },
  addCount(state, action) {
    let found = state.findIndex((a)=>{return a.id == action.payload});
    console.log(found, action.payload.id); // 왜 action.payload.id 는 여기서 undefined 이지? +1 버튼에 dispatch 에서 a.id로 보냈으니까
    if (found >= 0){
      state[found].quan++;
    }
    localStorage.removeItem('cartState');
    localStorage.setItem('cartState', JSON.stringify(state))
  },
  subCount(state, action) {
    let found = state.findIndex((a)=>{return a.id == action.payload})
    if (state[found].quan > 1) {
      state[found].quan--;
    } else if (state[found].quan <= 1) {
      state.splice(found, 1)
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