import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
import { Collapse } from "reactstrap";
import navdata from "../LayoutMenuData";
import { withTranslation } from "react-i18next";

// Permission utilities
import {
  hasPermissionForEntity,
  usersPermissions,
  tenantsPermissions,
  organizationsPermissions,
  rolesPermissions,
  permissionsPermissions,
  entityPermissions,
} from "../../utils/useHasPermission";

const HorizontalLayout = (props) => {
  const [activeDropdown, setActiveDropdown] = useState({});
  const navData = navdata().props.children;

  // Fetch user permissions
  let userPermissions =
    JSON.parse(localStorage.getItem("UserPermissions")) || [];
  userPermissions =
    userPermissions.permissions?.$values.map((p) => p.permissionName) || [];

  // Function to toggle dropdowns
  const toggleDropdown = (id) => {
    setActiveDropdown((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle current dropdown state
    }));
  };

  // Recursive function to render menu items
  const renderMenuItems = (items) => {
    return items.map((item, key) => (
      <React.Fragment key={key}>
        {/* Menu Header */}
        {item.isHeader ? (
          <li className="menu-title">
            <span>{props.t(item.label)}</span>
          </li>
        ) : (
          <li className="nav-item">
            {/* Main Link */}
            <Link
              onClick={(e) => {
                if (item.subItems) {
                  e.preventDefault();
                  toggleDropdown(item.id);
                }
              }}
              className={`nav-link menu-link ${
                activeDropdown[item.id] ? "active" : ""
              }`}
              to={item.link || "/#"}
              aria-expanded={activeDropdown[item.id] ? "true" : "false"}
            >
              <i className={item.icon}></i>
              <span>{props.t(item.label)}</span>
              {item.subItems && (
                <span className="menu-dropdown-toggle">
                  {/* Dropdown Icon */}
                  <i
                    className={`ri-arrow-${
                      activeDropdown[item.id] ? "up" : "down"
                    }-s-line`}
                  ></i>
                </span>
              )}
            </Link>

            {/* Dropdown Sub-items */}
            {item.subItems && (
              <Collapse
                isOpen={activeDropdown[item.id]} // Toggle dropdown visibility
                className="menu-dropdown"
              >
                <ul className="nav nav-sm flex-column">
                  {renderMenuItems(item.subItems)} {/* Recursive call */}
                </ul>
              </Collapse>
            )}

            {/* Administration Menu with Permissions */}
            {item.label === "Administration" && (
              <Collapse isOpen={activeDropdown[item.id]} className="menu-dropdown">
                <ul className="nav nav-sm flex-column">
                  {[
                    hasPermissionForEntity(userPermissions, tenantsPermissions) && {
                      id: "tenants",
                      label: "Tenants",
                      link: "/tenants",
                      icon: "ri-key-2-line",
                    },
                    hasPermissionForEntity(userPermissions, entityPermissions) && {
                      id: "organizations",
                      label: "Organizations",
                      link: "/organizations",
                      icon: "ri-team-line",
                    },
                    hasPermissionForEntity(userPermissions, rolesPermissions) && {
                      id: "roles",
                      label: "Roles",
                      link: "/roles",
                      icon: "ri-parent-line",
                    },
                    hasPermissionForEntity(userPermissions, usersPermissions) && {
                      id: "users",
                      label: "Users",
                      link: "/users",
                      icon: "bx bx-user",
                    },
                    hasPermissionForEntity(userPermissions, permissionsPermissions) && {
                      id: "permissions",
                      label: "Permissions",
                      link: "/permissions",
                      icon: "ri-admin-fill",
                    },
                  ]
                    .filter(Boolean)
                    .map((subItem, subKey) => (
                      <li className="nav-item" key={subKey}>
                        <Link to={subItem.link} className="nav-link">
                          {subItem.icon && <i className={subItem.icon}></i>}{" "}
                          {props.t(subItem.label)}
                        </Link>
                      </li>
                    ))}
                </ul>
              </Collapse>
            )}
          </li>
        )}
      </React.Fragment>
    ));
  };

  return (
    <React.Fragment>
      <ul id="navbar-nav" className="navbar-nav">
        {renderMenuItems(navData || [])}
      </ul>
    </React.Fragment>
  );
};

HorizontalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.func.isRequired,
};

export default withRouter(withTranslation()(HorizontalLayout));
