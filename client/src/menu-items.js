export default {
  items: [
    {
      id: "navigation",
      title: "Dashboard",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard/default",
          icon: "feather icon-home",
        },
      ],
    },

    //Registration
    {
      id: "Registration",
      title: "Registrations",
      type: "group",
      children: [
        {
          id: "position-page",
          title: "Positions",
          type: "item",
          url: "/positions",
          classes: "nav-item",
          icon: "fa fa-map",
        },
        {
          id: "driver-page",
          title: "Drivers",
          type: "item",
          url: "/drivers",
          classes: "nav-item",
          icon: "fa fa-user",
        },
        {
          id: "owner-page",
          title: "Owners",
          type: "item",
          url: "/owners",
          classes: "nav-item",
          icon: "fa fa-user",
        },
        {
          id: "TypeCar-page",
          title: "Type",
          type: "item",
          url: "/type-cars",
          classes: "nav-item",
          icon: "fa fa-plus",
        },
        {
          id: "car-page",
          title: "Cars",
          type: "item",
          url: "/Cars",
          classes: "nav-item",
          icon: "fa fa-car",
        },
      ],
    },

    {
      id: "Contrct-nav",
      title: "Contract",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "contract-page",
          title: "Contracts",
          type: "item",
          url: "/contracts",
          classes: "nav-item",
          icon: "fa fa-plus",
        },
      ],
    },

    {
      id: "VeiwReport",
      title: "Veiw Report",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "report",
          title: "Reports",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "car-page",
              title: "Cars",
              type: "item",
              url: "/car-report",
            },
            
          ],
        },
      ],
    },

    {
      id: "Settings-nav",
      title: "Settings",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "Users-page",
          title: "Users",
          type: "item",
          url: "/#",
          classes: "nav-item",
          icon: "fa fa-plus",
        },
      ],
    },

  ],
};
