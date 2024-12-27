export const usersPermissions = [
    "CreateUser",
    "DeleteUser",
    "UpdateUser",
    "ViewUser",
  ];
  
  export const tenantsPermissions = [
    "CreateTenant",
    "UpdateTenant",
    "DeleteTenant",
    "ViewTenant",
  ];
  
  // export const organizationsPermissions = [
  //   "CreateEntity",
  //   "UpdateEntity",
  //   "DeleteEntity",
  //   "ViewEntity",
  // ];
  
  export const rolesPermissions = [
    "CreateRole",
    "UpdateRole",
    "DeleteRole",
    "ViewRole",
  ];
  
  export const permissionsPermissions = [
    "CreatePermission",
    "updatePermission",
    "DeletePermission",
    "ViewPermission",
  ];

  export const entityPermissions =[
    "CreateEntity",
    "UpdateEntity",
    "DeleteEntity",
    "ViewEntity"
  ]

  export const emiratesPermissions = [
    "CreateEmirates",
    "ViewEmirates",
    "UpdateEmirates",
    "DeleteEmirates",
  ];

  export const  GasPermissions = [
    "CreateGas",
    "ViewGas",
    "UpdateGas",
    "DeleteGas",
  ];

  export const facilityConfigurationPermissions = [
    "CreateFacilityConfiguration",
    "ViewFacilityConfiguration",
    "UpdateFacilityConfiguration",
    "DeleteFacilityConfiguration",
  ];


export const hasPermissionForEntity = (userPermissions, entityPermissions) => {
    return userPermissions?.some((permission) =>
      entityPermissions?.includes(permission)
    );
  };
  
  