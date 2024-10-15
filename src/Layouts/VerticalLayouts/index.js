
import React, { useEffect, useCallback } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
import { Collapse } from 'reactstrap';
import navdata from "../LayoutMenuData";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { createSelector } from 'reselect';
import {
    hasPermissionForEntity,
    usersPermissions,
    tenantsPermissions,
    organizationsPermissions,
    rolesPermissions,
    permissionsPermissions,
  } from "../../utils/useHasPermission";
import { helper } from 'echarts';

const VerticalLayout = (props) => {
    const navData = navdata().props.children;
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
            layoutType: layout.layoutType
        })
    );
    // Inside your component
    const {
        leftsidbarSizeType, sidebarVisibilitytype, layoutType
    } = useSelector(selectLayoutProperties);

    // vertical and semibox resize events
    const resizeSidebarMenu = useCallback(() => {
        var windowSize = document.documentElement.clientWidth;
        if (windowSize >= 1025) {
            if (document.documentElement.getAttribute("data-layout") === "vertical") {
                document.documentElement.setAttribute("data-sidebar-size", leftsidbarSizeType);
            }
            if (document.documentElement.getAttribute("data-layout") === "semibox") {
                document.documentElement.setAttribute("data-sidebar-size", leftsidbarSizeType);
            }
            var hamburgerIcon = document.querySelector(".hamburger-icon");
            if ((sidebarVisibilitytype === "show" || layoutType === "vertical" || layoutType === "twocolumn") && document.querySelector(".hamburger-icon")) {
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
            if (document.documentElement.getAttribute("data-layout") !== "horizontal") {
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
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Mapping of sublinks to main links
  const linkMappings = [
   
    { subPath: "/Mrv/create-tenant", mainPath: "/Mrv/tenants" },
    { subPath: "/Mrv/edit-tenant", mainPath: "/Mrv/tenants" },
    { subPath: "/Mrv/create-organization", mainPath: "/Mrv/organizations" },
    { subPath: "/Mrv/edit-organization", mainPath: "/Mrv/organizations" },
    { subPath: "/Mrv/view-organization", mainPath: "/Mrv/organizations" },
    { subPath: "/Mrv/create-role", mainPath: "/Mrv/roles" },
    { subPath: "/Mrv/edit-role", mainPath: "/Mrv/roles" },
    { subPath: "/Mrv/view-role", mainPath: "/Mrv/roles" },
    { subPath: "/Mrv/create-user", mainPath: "/Mrv/users" },
    { subPath: "/Mrv/edit-user", mainPath: "/Mrv/users" },
    { subPath: "/Mrv/view-user", mainPath: "/Mrv/users" },
    { subPath: "/Mrv/fuelmanager", mainPath: "/Mrv/fuelmanager" },
  ];

  const initMenu = () => {
    let pathName = process.env.PUBLIC_URL + props.router.location.pathname;
    
    // Check if current path is a sublink and map it to its corresponding main link
    const matchedLink = linkMappings.find((link) => pathName.includes(link.subPath));

    if (matchedLink) {
      pathName = matchedLink.mainPath; // Use the corresponding main link
    }

    const ul = document.getElementById("navbar-nav");
    const items = ul.getElementsByTagName("a");
    let itemsArray = [...items]; // Convert NodeList to Array

    // Find matching menu item
    let matchingMenuItem = itemsArray.find((x) => {
      return x.getAttribute("href") === pathName; // Ensure correct comparison
    });

    // Activate dropdown if matching item found
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  };

  if (props.layoutType === "vertical") {
    initMenu();
  }
}, [props.router.location.pathname, props.layoutType]);


  
  

    function activateParentDropdown(item) {
        // Only remove activation on click, not on route change
        const navLinks = document.querySelectorAll('.nav-link');
        removeActivation(navLinks);  // Call only when an item is clicked

        // Add active class to the clicked item
        item.classList.add("active");

        // Check for parent collapse div
        let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

        if (parentCollapseDiv) {
            // Expand the dropdown and add active class to parent item
            parentCollapseDiv.classList.add("show");
            parentCollapseDiv.parentElement.children[0].classList.add("active");
            parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");

            // Iterate through grandparent dropdowns and expand them too
            let grandParentCollapse = parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown");
            while (grandParentCollapse) {
                grandParentCollapse.classList.add("show");
                if (grandParentCollapse.previousElementSibling) {
                    grandParentCollapse.previousElementSibling.classList.add("active");
                    grandParentCollapse.previousElementSibling.setAttribute("aria-expanded", "true");
                }
                grandParentCollapse = grandParentCollapse.parentElement.closest(".collapse.menu-dropdown");
            }
        }
    }

    // Remove active class from all previously active nav items
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
                      <ul className="nav nav-sm flex-column test sidebar-subitems">
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
                              icon: "ri-key-2-line",  // Add the icon class here
                            },
                            hasPermissionForEntity(
                              userPermissions,
                              organizationsPermissions
                            ) && {
                              id: "organizations",
                              icon: "ri-team-line", // Add the icon class here
                              label: "Organizations",
                              link: "/organizations",
                            },
                            hasPermissionForEntity(userPermissions, rolesPermissions) && {
                              id: "roles",
                              icon: " ri-parent-line", // Add the icon class here
                              label: "Roles",
                              link: "/roles",
                            },
                            hasPermissionForEntity(userPermissions, usersPermissions) && {
                              id: "users",
                              icon: "bx bx-user", // Add the icon class here
                              label: "Users",
                              link: "/users",
                            },
                            hasPermissionForEntity(
                              userPermissions,
                              permissionsPermissions
                            ) && {
                              id: "permissions", 
                              icon: " ri-admin-fill", // Add the icon class here
                              label: "Permissions",
                              link: "/permissions",
                            },
                          ]
                            .filter(Boolean) // Filter out any `false` values
                            .map((subItem, subKey) => (
                              <li className="nav-item" key={subKey} >
                                <Link
                                  to={subItem.link ? subItem.link : "/#"}
                                  className="nav-link"
                                >
                                      {subItem.icon && <i className={subItem.icon}></i>}{" "}
                                  {props.t(subItem.label)}
                                </Link>
                              </li>
                            )))}
                      </ul>
                    </Collapse>
                  </li>
                ) : item.subItems ? (
                  <li className="nav-item">
                    <Link
                      onClick={item.click}
                      className="nav-link menu-link"
                      to={item.link ? item.link : "/#"}
                      data-bs-toggle="collapse"
                      // aria-expanded={item.stateVariables ? "true" : "false"}
                    >
                      <i className={item.icon}></i>{" "}
                      <span data-key="t-apps">{props.t(item.label)}</span>
                    </Link>
                    <Collapse
                      className="menu-dropdown"
                      isOpen={item.stateVariables}
                      id="sidebarApps"
                      // id={`sidebar-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      <ul className="nav nav-sm flex-column sidebar-subitems">
                        {item.subItems.map((subItem, subKey) => (
                          <li className="nav-item" key={subKey}>
                            <Link
                              to={subItem.link ? subItem.link : "/#"}
                              className="nav-link"
                            >
                              {subItem.icon && <i className={subItem.icon}></i>}{" "}
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
