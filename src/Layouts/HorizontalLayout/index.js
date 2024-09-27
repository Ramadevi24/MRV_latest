import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
import { Col, Collapse, Row } from "reactstrap";
// Import Data
import navdata from "../LayoutMenuData";
//i18n
import { withTranslation } from "react-i18next";

// Permission utilities
import {
  hasPermissionForEntity,
  usersPermissions,
  tenantsPermissions,
  organizationsPermissions,
  rolesPermissions,
  permissionsPermissions,
} from "../../utils/useHasPermission";

const HorizontalLayout = (props) => {
  const [isMoreMenu, setIsMoreMenu] = useState(false);
  const navData = navdata().props.children;

  // Get user permissions from local storage
  let userPermissions =
    JSON.parse(localStorage.getItem("UserPermissions")) || [];
  userPermissions =
    userPermissions.permissions &&
    userPermissions.permissions?.$values.map(
      (permission) => permission.permissionName
    );

  let menuItems = [];
  let splitMenuItems = [];
  let menuSplitContainer = 6;
  navData.forEach(function (value, key) {
    if (value["isHeader"]) {
      menuSplitContainer++;
    }
    if (key >= menuSplitContainer) {
      let val = value;
      val.childItems = value.subItems;
      val.isChildItem = value.subItems ? true : false;
      delete val.subItems;
      splitMenuItems.push(val);
    } else {
      menuItems.push(value);
    }
  });
  menuItems.push({
    id: "more",
    label: "More",
    icon: "ri-briefcase-2-line",
    link: "/#",
    stateVariables: isMoreMenu,
    subItems: splitMenuItems,
    click: function (e) {
      e.preventDefault();
      setIsMoreMenu(!isMoreMenu);
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const pathName = process.env.PUBLIC_URL + props.router.location.pathname;
      const ul = document.getElementById("navbar-nav");
      const items = ul.getElementsByTagName("a");
      let itemsArray = [...items]; // converts NodeList to Array
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.router.location.pathname, props.layoutType]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute(
        "aria-expanded",
        "true"
      );
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement
          .closest(".collapse")
          .classList.add("show");
        var parentElementDiv =
          parentCollapseDiv.parentElement.closest(
            ".collapse"
          ).previousElementSibling;
        if (parentElementDiv)
          if (parentElementDiv.closest(".collapse"))
            parentElementDiv.closest(".collapse").classList.add("show");
        parentElementDiv.classList.add("active");
        var parentElementSibling =
          parentElementDiv.parentElement.parentElement.parentElement
            .previousElementSibling;
        if (parentElementSibling) {
          parentElementSibling.classList.add("active");
        }
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains("active"));

    actiItems.forEach((item) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  };

  return (
    <React.Fragment>
      {(menuItems || []).map((item, key) => {
        return (
          <React.Fragment key={key}>
            {/* Main Header */}
            {!item["isHeader"] ? (
              item.subItems && item.label === "Administration" ? (
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
                    className={
                      item.subItems.length > 13
                        ? "menu-dropdown mega-dropdown-menu"
                        : "menu-dropdown"
                    }
                    isOpen={item.stateVariables}
                    id="sidebarApps"
                  >
                    {/* Sub-items for Administration */}
                    <ul className="nav nav-sm flex-column test">
                      {[
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
                        .filter(Boolean) // Remove any invalid entries
                        .map((subItem, subKey) => (
                          <li className="nav-item" key={subKey}>
                            <Link
                              to={subItem.link ? subItem.link : "/#"}
                              className="nav-link"
                            >
                              {props.t(subItem.label)}
                            </Link>
                          </li>
                        ))}
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
              )
            ) : (
              <li className="menu-title">
                <span data-key="t-menu">{props.t(item.label)}</span>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

HorizontalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(HorizontalLayout));
