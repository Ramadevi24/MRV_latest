import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  const [isDashboard, setIsDashboard] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isSample, setIsSample] = useState(false);
  const [isDataManagement, setIsDataManagement] = useState(false);
  const [isMasterData, setIsMasterData] = useState(false);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");
  let userPermissions = JSON.parse(localStorage.getItem("UserPermissions")) || []
  userPermissions = userPermissions.permissions && userPermissions.permissions?.$values.map((permission) => permission.permissionName)

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
     if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Sample") {
      setIsSample(false);
    }
    if (iscurrentState !== "DataManagement") {
      setIsDataManagement(false);
    }
    if (iscurrentState !== "MasterData") {
      setIsMasterData(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isAuth,
    isSample,
    isDataManagement,
    isMasterData,
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
      link: "/dashboard",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "sample",
      label: "Sample Page",
      icon: "mdi mdi-file-document",
      link: "/sample",
      stateVariables: isSample,
      click: function (e) {
        e.preventDefault();
        setIsSample(!isSample);
        setIscurrentState("Sample");
        updateIconSidebar(e);
      },
    },
    {
      label: "Pages",
      isHeader: true,
    },
    {
      id: "administration",
      label: "Administration",
      icon: "ri-user-add-line",
      link: "/#",
      stateVariables: isAuth,
      click: function (e) {
        e.preventDefault();
        setIsAuth(!isAuth);
        setIscurrentState("Auth");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "tenants",
          label: "Tenants",
          link: "/tenants",
          icon: "bx bx-building-house",
          parentId: "administration",
        },
        {
          id: "organizations",
          label: "Organizations",
          link: "/organizations",
          parentId: "administration",
          icon: "bx bx-building-house",
        },
        {
          id: "roles",
          label: "Roles",
          link: "/roles",
          parentId: "administration",
        },
        {
          id: "users",
          label: "Users",
          link: "/users",
          parentId: "administration",
        },
        {
          id: "Permissions",
          label: "Permissions",
          link: "/permissions",
          parentId: "administration",
        }
      ],
    },
    {
      id: "datamanagement",
      label: "Data Management",
      icon: "ri-database-fill",
      link: "/#",
      stateVariables: isDataManagement,
      click: function (e) {
        e.preventDefault();
        setIsDataManagement(!isDataManagement);
        setIscurrentState("DataManagement");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "fuelmanager",
          label: "Fuel Manager",
          link: "/fuelmanager",
          icon: "bx bx-building-house",
          parentId: "datamanagement",
        },
        {
          id: "c02equivalents",
          label: "C02 Equivalents",
          link: "/c02equivalents",
          icon: "bx bx-building-house",
          parentId: "datamanagement",
        }]
      },
      {
        id: "energy",
        label: "Energy",
        icon: "ri-ai-generate",
        link: "/#",
        stateVariables: isMasterData,
        click: function (e) {
          e.preventDefault();
          setIsMasterData(!isMasterData);
          setIscurrentState("MasterData");
          updateIconSidebar(e);
        },
        subItems: [
          {
            id: "powersector",
            label: "1.A Power Sector",
            link: "/facility/:power",
            // icon: "bx bx-building-house",
            parentId: "energy",
          },
          {
            id: "petroleumrefining",
            label: "1.A.1 Petroleum Refining",
            link: "/facility/:petroleum",
            // icon: "bx bx-building-house",
            parentId: "energy",
          }]
        }
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
