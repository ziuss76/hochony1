import { configureStore, createSlice } from "@reduxjs/toolkit";

let cartState = sessionStorage.getItem("cartState");
let cartStateArray = JSON.parse(cartState) || [];

let cart = createSlice({
  // state 생성 + useState 같은 거임, slice = state + reducer(state 변경함수)
  name: "cart", // 함수 형태의 reducer 라 깔끔하고 원래 복사본 만드는 걸 자동으로 해줘서 원본 바꾸는 형태로 사용 가능
  initialState: cartStateArray,
  reducers: {
    // 각각의 리듀서(아래 3개기능)에 변수로 초기값 만들어 넣기 그리고 state 수정하는 법도 작성
    addItem(state, action) {
      let found = state.findIndex((cartItem) => {
        return cartItem.id == action.payload.id;
      });
      // console.log(found, action.payload.id);
      // 같은 상품을 또 추가하면 왜 수량추가가 아닌 새 1개가 또 push 될까? 장바구니버튼 dispatch로 보냈던 action.payload는 객체고 .id를 붙여야 했다
      if (found >= 0) {
        state[found].quan++;
      } else {
        state.push(action.payload);
      }
      sessionStorage.setItem("cartState", JSON.stringify(state));
    },
    addCount(state, action) {
      let found = state.findIndex((cartItem) => {
        return cartItem.id == action.payload;
      });
      // console.log(found, action.payload); // 왜 action.payload.id 는 여기서 undefined 이지? +1 버튼에 dispatch 에서 a.id로 보냈으니까
      if (found >= 0) {
        state[found].quan++;
      }
      sessionStorage.removeItem("cartState");
      sessionStorage.setItem("cartState", JSON.stringify(state));
    },
    subCount(state, action) {
      let found = state.findIndex((cartItem) => {
        return cartItem.id == action.payload;
      });
      if (state[found].quan > 1) {
        state[found].quan--;
      } else if (state[found].quan <= 1) {
        state.splice(found, 1);
      }
      sessionStorage.removeItem("cartState");
      sessionStorage.setItem("cartState", JSON.stringify(state));
    },
    clearItems(state, action) {
      sessionStorage.removeItem("cartState");
      return [];
    },
  },
});

let orderState = sessionStorage.getItem("orderState");
let orderStateArray = JSON.parse(orderState) || [];

let order = createSlice({
  name: "order",
  initialState: orderStateArray,
  reducers: {
    orderUp(state, action) {
      state.push(...action.payload);
      sessionStorage.setItem("orderState", JSON.stringify(state));
    },
    clearOrders(state, action) {
      sessionStorage.removeItem("orderState");
      return [];
    },
  },
});

export let { addItem, addCount, subCount, clearItems } = cart.actions;
export let { orderUp, clearOrders } = order.actions;

export default configureStore({
  // reducer 사용 등록 props 등록 같은 거임
  reducer: {
    cart: cart.reducer,
    order: order.reducer,
  },
});
