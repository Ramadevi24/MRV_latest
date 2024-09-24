import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
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
     if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isAuth,
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
        }
      ],
    },
    {
      label: "Pages",
      isHeader: true,
    },
    {
      id: "administration",
      label: "Administration",
      icon: "bx bx-user-circle",
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
          parentId: "administration",
        },
        {
          id: "organizations",
          label: "Organizations",
          link: "/organizations",
          parentId: "administration",
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
    }
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
