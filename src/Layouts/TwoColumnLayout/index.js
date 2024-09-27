import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../../Components/Common/withRouter';
import PropTypes from "prop-types";
import { Collapse, Container } from 'reactstrap';
import logoSm from "../../assets/images/logo-sm.png";

// i18n
import { withTranslation } from "react-i18next";

// Import Data
import navdata from "../LayoutMenuData";

// SimpleBar
import SimpleBar from "simplebar-react";
import VerticalLayout from '../VerticalLayouts';

// Permission utilities
import {
  hasPermissionForEntity,
  usersPermissions,
  tenantsPermissions,
  organizationsPermissions,
  rolesPermissions,
  permissionsPermissions,
} from "../../utils/useHasPermission";

const TwoColumnLayout = (props) => {
    const navData = navdata().props.children;

    // Get user permissions from local storage
    let userPermissions =
        JSON.parse(localStorage.getItem("UserPermissions")) || [];
    userPermissions =
        userPermissions.permissions &&
        userPermissions.permissions?.$values.map(
            (permission) => permission.permissionName
        );

    const activateParentDropdown = useCallback((item) => {
        item.classList.add("active");
        let parentCollapseDiv = item.closest(".collapse.menu-dropdown");
        if (parentCollapseDiv) {
            // to set aria expand true remaining
            parentCollapseDiv.classList.add("show");
            parentCollapseDiv.parentElement.children[0].classList.add("active");
            parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
            if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
                parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
                const parentParentCollapse = parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling;
                if (parentParentCollapse) {
                    parentParentCollapse.classList.add("active");
                    if (parentParentCollapse.closest(".collapse.menu-dropdown")) {
                        parentParentCollapse.closest(".collapse.menu-dropdown").classList.add("show");
                    }
                }
            }
            activateIconSidebarActive(parentCollapseDiv.getAttribute("id"));
            return false;
        }
        return false;
    }, []);

    const initMenu = useCallback(() => {
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
        } else {
            if (process.env.PUBLIC_URL) {
                var id = pathName.replace(process.env.PUBLIC_URL, '');
                id = id.replace("/", "");
            } else {
                id = pathName.replace("/", "");
            }
            if (id) document.body.classList.add('twocolumn-panel');
            activateIconSidebarActive(id);
        }
    }, [props.router.location.pathname, activateParentDropdown]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        initMenu();
    }, [props.router.location.pathname, initMenu]);

    function activateIconSidebarActive(id) {
        var menu = document.querySelector("#two-column-menu .simplebar-content-wrapper a[subitems='" + id + "'].nav-icon");
        if (menu !== null) {
            menu.classList.add("active");
        }
    }

    const removeActivation = (items) => {
        let activeItems = items.filter((x) => x.classList.contains("active"));
        activeItems.forEach((item) => {
            if (item.classList.contains("menu-link")) {
                if (!item.classList.contains("active")) {
                    item.setAttribute("aria-expanded", false);
                }
                item.nextElementSibling.classList.remove("show");
            }
            if (item.classList.contains("nav-link")) {
                if (item.nextElementSibling) {
                    item.nextElementSibling.classList.remove("show");
                }
                item.setAttribute("aria-expanded", false);
            }
            item.classList.remove("active");
        });

        const ul = document.getElementById("two-column-menu");
        const iconItems = ul.getElementsByTagName("a");
        let itemsArray = [...iconItems];
        let activeIconItems = itemsArray.filter((x) => x.classList.contains("active"));
        activeIconItems.forEach((item) => {
            item.classList.remove("active");
            var id = item.getAttribute("subitems");
            if (document.getElementById(id))
                document.getElementById(id).classList.remove("show");
        });
    };

    // Resize sidebar
    const [isMenu, setIsMenu] = useState("twocolumn");
    const windowResizeHover = () => {
        initMenu();
        var windowSize = document.documentElement.clientWidth;
        if (windowSize < 767) {
            document.documentElement.setAttribute("data-layout", "vertical");
            setIsMenu('vertical');
        }
        else {
            document.documentElement.setAttribute("data-layout", "twocolumn");
            setIsMenu('twocolumn');
        }
    };

    useEffect(function setupListener() {
        if (props.layoutType === 'twocolumn') {
            window.addEventListener('resize', windowResizeHover);

            // remove classname when component will unmount
            return function cleanupListener() {
                window.removeEventListener('resize', windowResizeHover);
            };
        }
    });

    return (
        <React.Fragment>
            {isMenu === "twocolumn" ?
                <div id="scrollbar">
                    <Container fluid>
                        <div id="two-column-menu">
                            <SimpleBar className="twocolumn-iconview">
                                <Link to="#" className="logo">
                                    <img src={logoSm} alt="" height="22" />
                                </Link>
                                {(navData || []).map((item, key) => (
                                    <React.Fragment key={key}>
                                        {item.icon && (
                                            item.subItems ? (
                                                <li>
                                                    <Link
                                                        onClick={item.click}
                                                        to="#"
                                                        subitems={item.id}
                                                        className="nav-icon"
                                                        data-bs-toggle="collapse">
                                                        <i className={item.icon}></i>
                                                    </Link>
                                                </li>

                                            ) : (
                                                <Link
                                                    onClick={item.click}
                                                    to={item.link ? item.link : "/#"}
                                                    subitems={item.id}
                                                    className="nav-icon"
                                                    data-bs-toggle="collapse">
                                                    <i className={item.icon}></i>
                                                </Link>
                                            )
                                        )}
                                    </React.Fragment>
                                ))}

                            </SimpleBar>
                        </div>
                        <SimpleBar id="navbar-nav" className="navbar-nav">
                            {(navData || []).map((item, key) => (
                                <React.Fragment key={key}>
                                    {item.subItems && item.label === "Administration" ? (
                                        <li className="nav-item">
                                            <Collapse
                                                className="menu-dropdown"
                                                isOpen={item.stateVariables}
                                                id={item.id}>
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
                                                        hasPermissionForEntity(
                                                            userPermissions,
                                                            rolesPermissions
                                                        ) && {
                                                            id: "roles",
                                                            label: "Roles",
                                                            link: "/roles",
                                                        },
                                                        hasPermissionForEntity(
                                                            userPermissions,
                                                            usersPermissions
                                                        ) && {
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
                                                        .filter(Boolean) // Remove false values
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
                                        item.subItems && (
                                            <li className="nav-item">
                                                <Collapse
                                                    className="menu-dropdown"
                                                    isOpen={item.stateVariables}
                                                    id={item.id}>
                                                    <ul className="nav nav-sm flex-column test">
                                                        {item.subItems.map((subItem, subKey) => (
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
                                        )
                                    )}
                                </React.Fragment>
                            ))}
                        </SimpleBar>
                    </Container>
                </div>
                :
                <SimpleBar id="scrollbar" className="h-100">
                    <Container fluid>
                        <div id="two-column-menu"></div>
                        <ul className="navbar-nav" id="navbar-nav">
                            <VerticalLayout />
                        </ul>
                    </Container>
                </SimpleBar>
            }
        </React.Fragment>
    );
};

TwoColumnLayout.propTypes = {
    location: PropTypes.object,
    t: PropTypes.any,
};


export default withRouter(withTranslation()(TwoColumnLayout));
