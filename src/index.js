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
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { PermissionProvider } from './contexts/PermissionContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AlertProvider } from './contexts/AlertContext';
import { FuelProvider } from './contexts/FuelContext';
import { MenuProvider } from './contexts/MenuContext';

const store = configureStore({ reducer: rootReducer, devTools: true });

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <TenantProvider>
        <RoleProvider>
        <OrganizationProvider>
          <AuthProvider>
            <UserProvider>
              <PermissionProvider>
              <ToastContainer closeButton={false} limit={1}  />
              <AlertProvider>
                <FuelProvider>
                  <MenuProvider>
        <App />
        </MenuProvider>
        </FuelProvider>
        </AlertProvider>
        </PermissionProvider>
        </UserProvider>
        </AuthProvider>
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