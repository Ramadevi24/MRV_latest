import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import {useAuth} from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { createSelector } from 'reselect';
import { t } from 'i18next';

const ProfileDropdown = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const userPermissions = JSON.parse(localStorage.getItem("UserPermissions")) || [];

    const profiledropdownData = createSelector(
        (state) => state.Profile,
        (user) => user.user
      );
    // Inside your component
    const user = useSelector(profiledropdownData);
    
    const [userName, setUserName] = useState("Admin");

    const handleLogout = () => {
        logout();
        navigate('/login');
      };

    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn shadow-none">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userPermissions && userPermissions.firstName} {userPermissions && userPermissions.lastName}</span>
                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{userPermissions && userPermissions.roleName}</span>
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">

                    <h6 className="dropdown-header">{t("Welcome")} {userPermissions && userPermissions.firstName} {userPermissions && userPermissions.lastName}!</h6>
                    <DropdownItem><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle">{t("Profile")}</span></DropdownItem>
                    <DropdownItem><i
                        className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">{t("Messages")}</span></DropdownItem>
                    <div className="dropdown-divider"></div>
                    <DropdownItem><span
                        className="badge bg-success-subtle text-success mt-1 float-end">New</span><i
                            className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span
                                className="align-middle">{t("Settings")}</span></DropdownItem>
                    <DropdownItem><i
                        className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span className="align-middle">{t("Lock screen")}</span></DropdownItem>
                    <DropdownItem onClick={handleLogout}><i
                        className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle" data-key="t-logout">{t("Logout")}</span></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;