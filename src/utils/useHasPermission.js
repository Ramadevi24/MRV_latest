export const usersPermissions = [
    "create_users",
    "edit_users",
    "delete_users",
    "view_users",
  ];
  
  export const tenantsPermissions = [
    "create_tenant",
    "edit_tenant",
    "delete_tenant",
    "view_tenant",
  ];
  
  export const organizationsPermissions = [
    "create_organization",
    "edit_organization",
    "delete_organization",
    "view_organization",
  ];
  
  export const rolesPermissions = [
    "create_role",
    "edit_role",
    "delete_role",
    "view_role",
  ];
  
  export const permissionsPermissions = [
    "create_permission",
    "edit_permission",
    "delete_permission",
    "view_permission",
  ];

export const hasPermissionForEntity = (userPermissions, entityPermissions) => {
    return userPermissions?.some((permission) =>
      entityPermissions?.includes(permission)
    );
  };
  
  