import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";
const store =require("./store")

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
        <ChatProvider>
        <App />
      </ChatProvider>
              </AuthProvider>
        </BrowserRouter>
  </ChakraProvider>,
      </Router>
    </Provider>
  </React.StrictMode>,
  
    
    
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
