import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);


  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    // if (iscurrentState !== "Apps") {
    //   setIsApps(false);
    // }
    // if (iscurrentState !== "Auth") {
    //   setIsAuth(false);
    // }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboards",
      icon: "mdi mdi-speedometer",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "analytics",
          label: "Analytics",
          link: "/dashboard-analytics",
          parentId: "dashboard",
        },
        {
          id: "crm",
          label: "CRM",
          link: "/dashboard-crm",
          parentId: "dashboard",
        },
        {
          id: "ecommerce",
          label: "Ecommerce",
          link: "/dashboard",
          parentId: "dashboard",
        },
        {
          id: "crypto",
          label: "Crypto",
          link: "/dashboard-crypto",
          parentId: "dashboard",
        },
        {
          id: "projects",
          label: "Projects",
          link: "/dashboard-projects",
          parentId: "dashboard",
        },
        {
          id: "nft",
          label: "NFT",
          link: "/dashboard-nft",
          parentId: "dashboard",
        },
        {
          id: "job",
          label: "Job",
          link: "/dashboard-job",
          parentId: "dashboard",
        },
      ],
    },
    {
      id: "authentication",
      label: "Authentication",
      icon: "bx bx-user-circle",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsAuth(!isAuth);
        setIscurrentState("Auth");
        updateIconSidebar(e);
      },
      stateVariables: isAuth,
      subItems: [
        {
          id: "signIn",
          label: "Sign In",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsSignIn(!isSignIn);
          },
          parentId: "authentication",
          stateVariables: isSignIn,
          childItems: [
            { id: 1, label: "Basic", link: "/auth-signin-basic" },
            { id: 2, label: "Cover", link: "/auth-signin-cover" },
          ],
        },
        {
          id: "signUp",
          label: "Sign Up",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsSignUp(!isSignUp);
          },
          parentId: "authentication",
          stateVariables: isSignUp,
          childItems: [
            { id: 1, label: "Basic", link: "/auth-signup-basic" },
            { id: 2, label: "Cover", link: "/auth-signup-cover" },
          ],
        },
        {
          id: "passwordReset",
          label: "Password Reset",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsPasswordReset(!isPasswordReset);
          },
          parentId: "authentication",
          stateVariables: isPasswordReset,
          childItems: [
            { id: 1, label: "Basic", link: "/auth-pass-reset-basic" },
            { id: 2, label: "Cover", link: "/auth-pass-reset-cover" },
          ],
        },
        {
          id: "passwordCreate",
          label: "Password Create",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsPasswordCreate(!isPasswordCreate);
          },
          parentId: "authentication",
          stateVariables: isPasswordCreate,
          childItems: [
            { id: 1, label: "Basic", link: "/auth-pass-change-basic" },
            { id: 2, label: "Cover", link: "/auth-pass-change-cover" },
          ],
        },
        {
          id: "lockScreen",
          label: "Lock Screen",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsLockScreen(!isLockScreen);
          },
          parentId: "authentication",
          stateVariables: isLockScreen,
          childItems: [
            { id: 1, label: "Basic", link: "/auth-lockscreen-basic" },
            { id: 2, label: "Cover", link: "/auth-lockscreen-cover" },
          ],
        },
        {
          id: "logout",
          label: "Logout",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsLogout(!isLogout);
          },
          parentId: "authentication",
          stateVariables: isLogout,
          childItems: [
            { id: 1, label: "Basic", link: "/auth-logout-basic" },
            { id: 2, label: "Cover", link: "/auth-logout-cover" },
          ],
        },
        {
          id: "successMessage",
          label: "Success Message",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsSuccessMessage(!isSuccessMessage);
          },
          parentId: "authentication",
          stateVariables: isSuccessMessage,
          childItems: [
            { id: 1, label: "Basic", link: "/auth-success-msg-basic" },
            { id: 2, label: "Cover", link: "/auth-success-msg-cover" },
          ],
        },
        {
          id: "twoStepVerification",
          label: "Two Step Verification",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsVerification(!isVerification);
          },
          parentId: "authentication",
          stateVariables: isVerification,
          childItems: [
            { id: 1, label: "Basic", link: "/auth-twostep-basic" },
            { id: 2, label: "Cover", link: "/auth-twostep-cover" },
          ],
        },
        {
          id: "errors",
          label: "Errors",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsError(!isError);
          },
          parentId: "authentication",
          stateVariables: isError,
          childItems: [
            { id: 1, label: "404 Basic", link: "/auth-404-basic" },
            { id: 2, label: "404 Cover", link: "/auth-404-cover" },
            { id: 3, label: "404 Alt", link: "/auth-404-alt" },
            { id: 4, label: "500", link: "/auth-500" },
            { id: 5, label: "Offline Page", link: "/auth-offline" },
          ],
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
