import React from "react";
import { Navigate } from "react-router-dom";
//Dashboard
//AuthenticationInner pages
import CoverSignIn from '../pages/AuthenticationInner/Login/CoverSignIn';
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from '../pages/AuthenticationInner/PasswordReset/BasicPasswReset';
import CoverPasswReset from '../pages/AuthenticationInner/PasswordReset/CoverPasswReset';
import BasicLockScreen from '../pages/AuthenticationInner/LockScreen/BasicLockScr';
import CoverLockScreen from '../pages/AuthenticationInner/LockScreen/CoverLockScr';
import BasicLogout from '../pages/AuthenticationInner/Logout/BasicLogout';
import CoverLogout from '../pages/AuthenticationInner/Logout/CoverLogout';
import BasicSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg';
import CoverSuccessMsg from '../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg';
import BasicTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify';
import CoverTwosVerify from '../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify';
import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
import Cover404 from '../pages/AuthenticationInner/Errors/Cover404';
import Alt404 from '../pages/AuthenticationInner/Errors/Alt404';
import Error500 from '../pages/AuthenticationInner/Errors/Error500';
import TenantsGrid from "../pages/Tenants/TenantsGrid";
import TenantForm from "../pages/Tenants/TenantForm";
import EditTenant from "../pages/Tenants/EditTenant";
import ViewTenant from "../pages/Tenants/ViewTenant";
//login
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";
// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import OrganizationGrid from "../pages/Organizations/OrganizationGrid";
import OrganizationForm from "../pages/Organizations/OrganizationForm";
import EditOrganization from "../pages/Organizations/EditOrganization";
import ViewOrganization from "../pages/Organizations/ViewOrganization";
import RoleGrid from "../pages/Roles/RoleGrid";
import RoleForm from "../pages/Roles/RoleForm";
import EditRole from "../pages/Roles/EditRole";
import ViewRole from "../pages/Roles/ViewRole";
import UserGrid from "../pages/Users/UserGrid";
import UserForm from "../pages/Users/UserForm";
import EditUser from "../pages/Users/EditUser";
import ViewUser from "../pages/Users/ViewUser";
import PermissionGrid from "../pages/Permissions/PermissionGrid";
import Dashboard from "../pages/Dashboard";
import SamplePage from "../pages/SamplePage";
import FuelManager from "../pages/Datamanagement/FuelManager";
import AddFuel from "../pages/Datamanagement/AddFuel";
import C02equivalents from "../pages/Datamanagement/C02equivalents";
import CreateGas from "../pages/Datamanagement/CreateGas";
import Gastype from "../pages/Datamanagement/Gastype";
import FacilityGrid from "../pages/EntityInformations/FacilityGrid";
import AddFacility from "../pages/EntityInformations/AddFacility";


const authProtectedRoutes = [
  { path: "/profile", component: <UserProfile /> },
  {
    path: "/dashboard",
    exact: true,
    component: <Dashboard />,
  },
  {path:'/tenants', component: <TenantsGrid /> },
  {path:'/create-tenant', component: <TenantForm />},
  {path:'/edit-tenant/:id', component: <EditTenant />},
  {path:'/view-tenant/:id', component: <ViewTenant />},
  {path:'/organizations', component: <OrganizationGrid />},
  {path:'/create-organization', component: <OrganizationForm />},
  {path:'/edit-organization/:id', component: <EditOrganization />},
  {path:'/view-organization/:id', component: <ViewOrganization />},
  {path:'/roles', component: <RoleGrid />},
  {path:'/create-role', component: <RoleForm />},
  {path:'/edit-role/:id', component: <EditRole />},
  {path:'/view-role/:id', component: <ViewRole />},
  {path:'/users', component: <UserGrid />},
  {path:'/create-user', component: <UserForm />},
  {path:'/edit-user/:id', component: <EditUser />},
  {path:'/view-user/:id', component: <ViewUser />},
  {path:'/permissions', component: <PermissionGrid />},
  {path:'/sample', component: <SamplePage />},
  {path:'/fuelmanager', component: <FuelManager/>},
  {path:'/create-fuel', component: <AddFuel />},
  {path:'/c02equivalents', component: <C02equivalents />},
  {path:'/create-gas', component: <CreateGas />},
  {path:'/add-gasType', component: <Gastype />},
  {path:'/facility/:power', component: <FacilityGrid/>},
  {path:'/add-facility/:power', component: <AddFacility/>},
  {path:'/facility/:petroleum', component: <FacilityGrid/>},
  {path:'/add-facility/:petroleum', component: <AddFacility/>},
  {path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component:  <CoverSignIn />},
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component:  <CoverSignUp /> },

  //AuthenticationInner pages
  { path: "/login", component: <CoverSignIn /> },
  { path: "/signup", component: <CoverSignUp /> },
  { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-logout-cover", component: <CoverLogout /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },
  { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  { path: "/auth-offline", component: <Offlinepage /> }
];

export { authProtectedRoutes, publicRoutes };