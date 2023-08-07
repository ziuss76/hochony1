import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { HelmetProvider } from "react-helmet-async";

const app = (
  <BrowserRouter>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </BrowserRouter>
);

// npm run build 로 빌드 후
// npx react-snap으로 사전 렌더링 된 정적 파일 생성 => pre-rendering 으로 초기로딩속도 향상

const rootElement = document.getElementById("root");

// 왜 다시 주석처리 했냐면
// 서버사이드 렌더링된 HTML이 클라이언트에 의해 변경되면서
// 새로고침을 해도 서버에서 렌더링된 CSS가 유지되는 문제가 발생함
// 그래서 Detail 페이지에서 새로고침을 하면
// Main 의 Container 와 Carousel 의 클래스가 Detail 페이지와 충돌하면서 Main의 클래스들이 이겨버림

// if (rootElement.hasChildNodes()) {
//   ReactDOM.hydrate(app, rootElement);
// } else {
//   ReactDOM.render(app, rootElement);
// }
createRoot(rootElement).render(app);

reportWebVitals();
serviceWorkerRegistration.register();
