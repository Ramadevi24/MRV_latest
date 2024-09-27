import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
import { Collapse } from "reactstrap";

// Import Data
import navdata from "../LayoutMenuData";
// i18n
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// Permission utilities
import {
  hasPermissionForEntity,
  usersPermissions,
  tenantsPermissions,
  organizationsPermissions,
  rolesPermissions,
  permissionsPermissions,
} from "../../utils/useHasPermission";

const VerticalLayout = (props) => {
  const navData = navdata().props.children;

  // Extract user permissions from localStorage
  let userPermissions =
    JSON.parse(localStorage.getItem("UserPermissions")) || [];
  userPermissions =
    userPermissions.permissions &&
    userPermissions.permissions?.$values.map(
      (permission) => permission.permissionName
    );

  /*
     layout settings
    */
  const selectLayoutState = (state) => state.Layout;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      leftsidbarSizeType: layout.leftsidbarSizeType,
      sidebarVisibilitytype: layout.sidebarVisibilitytype,
      layoutType: layout.layoutType,
    })
  );
  const { leftsidbarSizeType, sidebarVisibilitytype, layoutType } = useSelector(
    selectLayoutProperties
  );

  const resizeSidebarMenu = useCallback(() => {
    var windowSize = document.documentElement.clientWidth;
    if (windowSize >= 1025) {
      if (document.documentElement.getAttribute("data-layout") === "vertical") {
        document.documentElement.setAttribute(
          "data-sidebar-size",
          leftsidbarSizeType
        );
      }
      if (document.documentElement.getAttribute("data-layout") === "semibox") {
        document.documentElement.setAttribute(
          "data-sidebar-size",
          leftsidbarSizeType
        );
      }
      var hamburgerIcon = document.querySelector(".hamburger-icon");
      if (
        (sidebarVisibilitytype === "show" ||
          layoutType === "vertical" ||
          layoutType === "twocolumn") &&
        document.querySelector(".hamburger-icon")
      ) {
        if (hamburgerIcon !== null) {
          hamburgerIcon.classList.remove("open");
        }
      } else {
        if (hamburgerIcon !== null) {
          hamburgerIcon.classList.remove("open");
        }
      }
    } else if (windowSize < 1025 && windowSize > 767) {
      document.body.classList.remove("twocolumn-panel");
      if (document.documentElement.getAttribute("data-layout") === "vertical") {
        document.documentElement.setAttribute("data-sidebar-size", "sm");
      }
      if (document.documentElement.getAttribute("data-layout") === "semibox") {
        document.documentElement.setAttribute("data-sidebar-size", "sm");
      }
      if (document.querySelector(".hamburger-icon")) {
        document.querySelector(".hamburger-icon").classList.add("open");
      }
    } else if (windowSize <= 767) {
      document.body.classList.remove("vertical-sidebar-enable");
      if (
        document.documentElement.getAttribute("data-layout") !== "horizontal"
      ) {
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
      if (document.querySelector(".hamburger-icon")) {
        document.querySelector(".hamburger-icon").classList.add("open");
      }
    }
  }, [leftsidbarSizeType, sidebarVisibilitytype, layoutType]);

  useEffect(() => {
    window.addEventListener("resize", resizeSidebarMenu, true);
  }, [resizeSidebarMenu]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Initialize menu without removing active class on route changes
    const initMenu = () => {
      const pathName = process.env.PUBLIC_URL + props.router.location.pathname;
      const ul = document.getElementById("navbar-nav");
      const items = ul.getElementsByTagName("a");
      let itemsArray = [...items]; // converts NodeList to Array

      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (props.layoutType === "vertical") {
      initMenu();
    }
  }, [props.router.location.pathname, props.layoutType]);

  function activateParentDropdown(item) {
    const navLinks = document.querySelectorAll(".nav-link");
    removeActivation(navLinks);

    item.classList.add("active");

    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute(
        "aria-expanded",
        "true"
      );

      let grandParentCollapse = parentCollapseDiv.parentElement.closest(
        ".collapse.menu-dropdown"
      );
      while (grandParentCollapse) {
        grandParentCollapse.classList.add("show");
        if (grandParentCollapse.previousElementSibling) {
          grandParentCollapse.previousElementSibling.classList.add("active");
          grandParentCollapse.previousElementSibling.setAttribute(
            "aria-expanded",
            "true"
          );
        }
        grandParentCollapse = grandParentCollapse.parentElement.closest(
          ".collapse.menu-dropdown"
        );
      }
    }
  }

  const removeActivation = (items) => {
    items.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("aria-expanded")) {
        item.setAttribute("aria-expanded", "false");
      }
      if (item.nextElementSibling) {
        item.nextElementSibling.classList.remove("show");
      }
    });
  };

  return (
    <React.Fragment>
      {/* Menu Items */}
      {(navData || []).map((item, key) => {
        return (
          <React.Fragment key={key}>
            {item["isHeader"] ? (
              <li className="menu-title">
                <span data-key="t-menu">{props.t(item.label)}</span>
              </li>
            ) : item.subItems && item.label === "Administration" ? (
              <li className="nav-item">
                <Link
                  onClick={item.click}
                  className="nav-link menu-link"
                  to={item.link ? item.link : "/#"}
                  data-bs-toggle="collapse"
                >
                  <i className={item.icon}></i>{" "}
                  <span data-key="t-apps">{props.t(item.label)}</span>
                </Link>
                <Collapse
                  className="menu-dropdown"
                  isOpen={item.stateVariables}
                  id="sidebarApps"
                >
                  <ul className="nav nav-sm flex-column test">
                    {/* Sub-items */}
                    {item.subItems &&
                      ([
                        hasPermissionForEntity(
                          userPermissions,
                          tenantsPermissions
                        ) && {
                          id: "tenants",
                          label: "Tenants",
                          link: "/tenants",
                        },
                        hasPermissionForEntity(
                          userPermissions,
                          organizationsPermissions
                        ) && {
                          id: "organizations",
                          label: "Organizations",
                          link: "/organizations",
                        },
                        hasPermissionForEntity(userPermissions, rolesPermissions) && {
                          id: "roles",
                          label: "Roles",
                          link: "/roles",
                        },
                        hasPermissionForEntity(userPermissions, usersPermissions) && {
                          id: "users",
                          label: "Users",
                          link: "/users",
                        },
                        hasPermissionForEntity(
                          userPermissions,
                          permissionsPermissions
                        ) && {
                          id: "permissions",
                          label: "Permissions",
                          link: "/permissions",
                        },
                      ]
                        .filter(Boolean) // Filter out any `false` values
                        .map((subItem, subKey) => (
                          <li className="nav-item" key={subKey}>
                            <Link
                              to={subItem.link ? subItem.link : "/#"}
                              className="nav-link"
                            >
                              {props.t(subItem.label)}
                            </Link>
                          </li>
                        )))}
                  </ul>
                </Collapse>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to={item.link ? item.link : "/#"}
                >
                  <i className={item.icon}></i>{" "}
                  <span>{props.t(item.label)}</span>
                </Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

VerticalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(VerticalLayout));
