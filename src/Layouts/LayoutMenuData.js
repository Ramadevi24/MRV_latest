import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  const [isDashboard, setIsDashboard] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isSample, setIsSample] = useState(false);
  const [isDataManagement, setIsDataManagement] = useState(false);
  const [isEnergy, setIsEnergy] = useState(false);
  const [isEmissionEnergy, setIsEmissionEnergy] = useState(false);
  const [isViewEnergy, setIsViewEnergy] = useState(false);
  const [isFacilityConfiguration, setIsFacilityConfiguration] = useState(false);
  const [isEmissionData, setIsEmissionData] = useState(false);
  const [isViewEmission, setIsViewEmission] = useState(false);
  const [isFuelCombustion, setIsFuelCombustion] = useState(false);
  const [isViewFuelCombustion, setIsViewFuelCombustion] = useState(false);
  const [isEmissionFuelCombustion, setIsEmissionFuelCombustion] = useState(false);
  const [isManufacturing, setIsManufacturing] = useState(false);
  const [isViewManufacturing, setIsViewManufacturing] = useState(false);
  const [isEmissionManufacturing, setIsEmissionManufacturing] = useState(false);
  const [isTransportation, setIsTransportation] = useState(false);
  const [isViewTransportation, setIsViewTransportation] = useState(false);
  const [isEmissionTransportation, setIsEmissionTransportation] = useState(false);
  const [isMasterScreens, setIsMasterScreens] = useState(false);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");
  let userPermissions =
    JSON.parse(localStorage.getItem("UserPermissions")) || [];
  userPermissions =
    userPermissions.permissions &&
    userPermissions.permissions?.$values.map(
      (permission) => permission.permissionName
    );

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
    if (iscurrentState !== "FacilityConfiguration") {
      setIsFacilityConfiguration(false);
    }
    if (iscurrentState !== "FuelCombustion") {
      setIsFuelCombustion(false);
    }
    if (iscurrentState !== "Energy") {
      setIsEnergy(false);
    }
    if (iscurrentState !== "Manufacturing") {
      setIsManufacturing(false);
    }
    if (iscurrentState !== "Transportation") {
      setIsTransportation(false);
    }
    if (iscurrentState !== "EmissionData") {
      setIsEmissionData(false);
    }
    if (iscurrentState !== "EmissionFuelCombustion") {
      setIsEmissionFuelCombustion(false);
    }
    if (iscurrentState !== "EmissionEnergy") {
      setIsEmissionEnergy(false);
    }
    if(iscurrentState !== "EmissionManufacturing"){
      setIsEmissionManufacturing(false);
    }
    if(iscurrentState !== "EmissionTransportation"){
      setIsEmissionTransportation(false);
    }
    if(iscurrentState !== "ViewEmission"){
      setIsViewEmission(false);
    }
    if(iscurrentState !== "ViewFuelCombustion"){
      setIsViewFuelCombustion(false);
    }
    if(iscurrentState !== "ViewEnergy"){
      setIsViewEnergy(false);
    }
    if(iscurrentState !== "ViewManufacturing"){
      setIsViewManufacturing(false);
    }
    if(iscurrentState !== "ViewTransportation"){
      setIsViewTransportation(false);
    }
    if (iscurrentState !== "MasterScreens") {
      setIsMasterScreens(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isAuth,
    isSample,
    isDataManagement,
    isEmissionData,
    isFuelCombustion,
    isEnergy,
    isManufacturing,
    isTransportation,
    isFacilityConfiguration,
    isEmissionFuelCombustion,
    isEmissionEnergy,
    isEmissionManufacturing,
    isEmissionTransportation,
    isViewEmission,
    isViewFuelCombustion,
    isViewEnergy,
    isViewManufacturing,
    isViewTransportation,
    isMasterScreens,
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
    // {
    //   label: "Pages",
    //   isHeader: true,
    // },
    
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
          id: "c02equivalents",
          label: "C02 Equivalents",
          link: "/c02equivalents",
          icon: "bx bx-building-house",
          parentId: "datamanagement",
        },
      ],
    },
    {
      id: "facilityconfiguration",
      label: "Facility Configuration",
      icon: "ri-ai-generate",
      link: "/#",
      stateVariables: isFacilityConfiguration,
      click: function (e) {
        e.preventDefault();
        setIsEmissionData(!isFacilityConfiguration);
        setIscurrentState("FacilityConfiguration");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "fuelcombustion",
          label: "1.A Fuel Combustion Activity",
          link: "/#",
          parentId: "facilityconfiguration",
          stateVariables: isFuelCombustion,
          click: function (e) {
            e.preventDefault();
            setIsFuelCombustion(!isFuelCombustion);
            setIscurrentState("FuelCombustion");
            updateIconSidebar(e);
          },
          subItems: [
            {
              id: "energy",
              label: "1.A.1 Energy Industries",
              link: "/#",
              parentId: "fuelcombustion",
              stateVariables: isEnergy,
              click: function (e) {
                e.preventDefault();
                setIsEnergy(!isEnergy);
                setIscurrentState("Energy");
                updateIconSidebar(e);
              },
              subItems: [
                {
                  id: "powergeneration",
                  label: "1.A.1.a Power Generation",
                  link: "/facility/:power",
                  parentId: "energy",
                },
                {
                  id: "petroleumrefining",
                  label: "1.A.1.b Petroleum Refining",
                  link: "/facility/:power",
                  parentId: "energy",
                },
              ],
            },
            {
              id: "manufacturing&construction",
              label: "1.A.2 Manufacturing & Construction",
              link: "/#",
              parentId: "fuelcombustion",
              stateVariables: isManufacturing,
              click: function (e) {
                e.preventDefault();
                setIsManufacturing(!isManufacturing);
                setIscurrentState("Manufacturing");
                updateIconSidebar(e);
              },
              subItems: [
                {
                  id: "construction",
                  label: "1.A.2.a Manufacturing",
                  link: "/add-facility/:construction",
                  parentId: "manufacturing&construction",
                },
              ],
            },
            {
              id: "transportation",
              label: "1.A.3 Transportation",
              link: "/#",
              parentId: "fuelcombustion",
              stateVariables: isTransportation,
              click: function (e) {
                e.preventDefault();
                setIsTransportation(!isTransportation);
                setIscurrentState("Transportation");
                updateIconSidebar(e);
              },
              subItems: [
                {
                  id: "aviation",
                  label: "1.A.3.a Domestic aviation",
                  link: "/add-transportation/:aviation",
                  parentId: "transportation",
                },
                {
                  id: "roadtransportation",
                  label: "1.A.3.b Road transportation",
                  link: "/add-transportation/:road",
                  parentId: "transportation",
                },
                {
                  id: "navigation",
                  label: "1.A.3.c Domestic navigation",
                  link: "/add-transportation/:navigation",
                  parentId: "transportation",
                },
              ],
            },
            {
              id: "otherupdates",
              label: "1.A.4 Other Updates",
              link: "/#",
              parentId: "fuelcombustion",
            },
          ],
        },
        {
          id: "fugitivesemission",
          label: "1.B Fugitives Emission",
          link: "/#",
          parentId: "facilityconfiguration",
          subItems: [],
        },
      ],
    },
    {
      id: "emissiondata",
      label: "Emission Data",
      icon: "ri-ai-generate",
      link: "/#",
      stateVariables: isEmissionData,
      click: function (e) {
        e.preventDefault();
        setIsEmissionData(!isEmissionData);
        setIscurrentState("EmissionData");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "Emissionfuelcombustion",
          label: "1.A Fuel Combustion Activity",
          link: "/#",
          parentId: "emissiondata",
          stateVariables: isEmissionFuelCombustion,
          click: function (e) {
            e.preventDefault();
            setIsEmissionFuelCombustion(!isEmissionFuelCombustion);
            setIscurrentState("EmissionFuelCombustion");
            updateIconSidebar(e);
          },
          subItems: [
            {
              id: "Emissionenergy",
              label: "1.A.1 Energy Industries",
              link: "/#",
              parentId: "Emissionfuelcombustion",
              stateVariables: isEmissionEnergy,
              click: function (e) {
                e.preventDefault();
                setIsEmissionEnergy(!isEmissionEnergy);
                setIscurrentState("EmissionEnergy");
                updateIconSidebar(e);
              },
              subItems: [
                {
                  id: "powergeneration",
                  label: "1.A.1.a Power Generation",
                  link: "/emission-data/:power",
                  parentId: "Emissionenergy",
                },
                {
                  id: "petroleumrefining",
                  label: "1.A.1.b Petroleum Refining",
                  link: "/emission-data/:petroleum",
                  parentId: "Emissionenergy",
                },
              ],
            },
            {
              id: "Emissionmanufacturing&construction",
              label: "1.A.2 Manufacturing & Construction",
              link: "/#",
              parentId: "Emissionfuelcombustion",
              stateVariables: isEmissionManufacturing,
              click: function (e) {
                e.preventDefault();
                setIsEmissionManufacturing(!isEmissionManufacturing);
                setIscurrentState("EmissionManufacturing");
                updateIconSidebar(e);
              },
              subItems: [
                {
                  id: "construction",
                  label: "1.A.2.a Manufacturing",
                  link: "/emission-data/:construction",
                  parentId: "Emissionmanufacturing&construction",
                },
              ],
            },
            {
              id: "Emissiontransportation",
              label: "1.A.3 Transportation",
              link: "/#",
              parentId: "Emissionfuelcombustion",
              stateVariables: isEmissionTransportation,
              click: function (e) {
                e.preventDefault();
                setIsEmissionTransportation(!isEmissionTransportation);
                setIscurrentState("Transportation");
                updateIconSidebar(e);
              },
              subItems: [
                {
                  id: "avaition",
                  label: "1.A.3.a Domestic aviation",
                  link: "emission-data/transportation/:aviation",
                  parentId: "Emissiontransportation",
                },
                {
                  id: "roadtransportation",
                  label: "1.A.3.b Road transportation",
                  link: "emission-data/transportation/:road",
                  parentId: "Emissiontransportation",
                },
                {
                  id: "navigation",
                  label: "1.A.3.c Domestic navigation",
                  link: "emission-data/transportation/:navigation",
                  parentId: "Emissiontransportation",
                },
              ],
            },
            {
              id: "otherupdates",
              label: "1.A.4 Other Updates",
              link: "/#",
              parentId: "Emissionfuelcombustion",
            },
          ],
        },
        {
          id: "fugitivesemission",
          label: "1.B Fugitives Emission",
          link: "/#",
          parentId: "emissiondata",
          subItems: [],
        },
      ],
    },
    {
      id: "viewemission",
      label: "View Emission",
      icon: "ri-ai-generate",
      link: "/#",
      stateVariables: isViewEmission,
      click: function (e) {
        e.preventDefault();
        setIsViewEmission(!isViewEmission);
        setIscurrentState("ViewEmission");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "ViewFuelCombustion",
          label: "1.A Fuel Combustion Activity",
          link: "/#",
          parentId: "viewemission",
          stateVariables: isViewFuelCombustion,
          click: function (e) {
            e.preventDefault();
            setIsViewFuelCombustion(!isViewFuelCombustion);
            setIscurrentState("ViewFuelCombustion");
            updateIconSidebar(e);
          },
          subItems: [
            {
              id: "viewenergy",
              label: "1.A.1 Energy Industries",
              link: "/#",
              parentId: "ViewFuelCombustion",
              stateVariables: isViewEnergy,
              click: function (e) {
                e.preventDefault();
                setIsViewEnergy(!isViewEnergy);
                setIscurrentState("ViewEnergy");
                updateIconSidebar(e);
              },
              subItems: [
                {
                  id: "powergeneration",
                  label: "1.A.1.a Power Generation",
                  link: "/view-emission/:power",
                  parentId: "viewenergy",
                },
                {
                  id: "petroleumrefining",
                  label: "1.A.1.b Petroleum Refining",
                  link: "/view-emission/:petroleum",
                  parentId: "viewenergy",
                },
              ],
            },
            {
              id: "viewmanufacturing&construction",
              label: "1.A.2 Manufacturing & Construction",
              link: "/#",
              parentId: "ViewFuelCombustion",
              stateVariables: isViewManufacturing,
              click: function (e) {
                e.preventDefault();
                setIsViewManufacturing(!isViewManufacturing);
                setIscurrentState("viewManufacturing");
                updateIconSidebar(e);
              },
              subItems: [
                {
                  id: "construction",
                  label: "1.A.2.a Manufacturing",
                  link: "/view-emission/:construction",
                  parentId: "viewmanufacturing&construction",
                },
              ],
            },
            {
              id: "viewtransportation",
              label: "1.A.3 Transportation",
              link: "/#",
              parentId: "ViewFuelCombustion",
              stateVariables: isViewTransportation,
              click: function (e) {
                e.preventDefault();
                setIsViewTransportation(!isViewTransportation);
                setIscurrentState("Transportation");
                updateIconSidebar(e);
              },
              subItems: [
                {
                  id: "avaition",
                  label: "1.A.3.a Domestic aviation",
                  link: "/transportation/:aviation",
                  parentId: "viewtransportation",
                },
                {
                  id: "roadtransportation",
                  label: "1.A.3.b Road transportation",
                  link: "/transportation/:road",
                  parentId: "viewtransportation",
                },
                {
                  id: "navigation",
                  label: "1.A.3.c Domestic navigation",
                  link: "/transportation/:navigation",
                  parentId: "viewtransportation",
                },
              ],
            },
            {
              id: "otherupdates",
              label: "1.A.4 Other Updates",
              link: "/#",
              parentId: "ViewFuelCombustion",
            },
          ],
        },
        {
          id: "fugitivesemission",
          label: "1.B Fugitives Emission",
          link: "/#",
          parentId: "viewemission",
          subItems: [],
        },
      ],
    },
    {
      id: "adminmasterScreens",
      label: "Master Screens",
      link: "/#",
      icon: "ri-user-add-line",
      stateVariables: isMasterScreens,
      click: function (e) {
        e.preventDefault();
        setIsMasterScreens(!isMasterScreens);
        setIscurrentState("MasterScreens");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "Emirate",
          label: "Emirate",
          link: "/emirate",
          parentId: "adminmasterScreens",
        },
        {
          id: "Gases",
          label: "Gases",
          link: "/gases",
          parentId: "adminmasterScreens",
        },
        {
          id: "fuelmanager",
          label: "Fuel Manager",
          link: "/fuelmanager",
          parentId: "adminmasterScreens",
        },
      ],
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
        // {
        //   id: "organizations",
        //   label: "Organizations",
        //   link: "/organizations",
        //   parentId: "administration",
        //   icon: "bx bx-building-house",
        // },
        {
          id: "Entity",
          label: "Entity",
          link: "/entity",
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
        },
      ],

    }
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
