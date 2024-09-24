import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
import { TenantProvider } from './contexts/TenantContext';
import { OrganizationProvider } from './contexts/OrganizationContext';
import { RoleProvider } from './contexts/RoleContext';

const store = configureStore({ reducer: rootReducer, devTools: true });

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <TenantProvider>
        <RoleProvider>
        <OrganizationProvider>
        <App />
        </OrganizationProvider>
        </RoleProvider>
        </TenantProvider>
      </BrowserRouter>
    </React.Fragment>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();