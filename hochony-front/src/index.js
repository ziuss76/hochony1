import React from "react";
import ReactDOM from "react-dom";
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
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(app, rootElement);
} else {
  ReactDOM.render(app, rootElement);
}

reportWebVitals();
serviceWorkerRegistration.register();
