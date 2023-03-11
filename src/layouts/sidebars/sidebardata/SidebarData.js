/* eslint-disable */
import React, { useEffect, useState } from "react";
import getRequestNotificationToAdmin from "../../../services/getRequestNotificationToAdmin";
import getRequestNotificationToCourier from "../../../services/getRequestNotificationToCourier";
import getRequestNotificationToTechnician from "../../../services/getRequestNotificationToTechnician";
import MaterialIcon from "@material/react-material-icon";
import getRequestNotificationByIdUserDto from "../../../services/getRequestNotificationByIdUserDto";

const SidebarDatas = () => {
  const [alerts, setAlerts] = useState([]);
  let countwasRevieweds = 0;

  const SidebarData = [];

  if (JSON.parse(localStorage.getItem("user")).role === "user") {
    useEffect(function () {
      getRequestNotificationByIdUserDto({
        idUserDto: JSON.parse(localStorage.getItem("user")).idUser
      })
        .then(response => {
          setAlerts(response);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    countwasRevieweds = alerts.filter(
      alert => alert.wasReviewed == false
    ).length;

    SidebarData.push(
      { caption: "Actividad" },
      {
        title: "Notificaciones",
        href: "./user-alerts",
        id: 1,
        icon: <MaterialIcon icon="notifications" />,
        suffix: countwasRevieweds == 0 ? null : countwasRevieweds,
        suffixColor: countwasRevieweds == 0 ? "bg-success" : "bg-danger"
      },
      {
        title: "Mis reparaciones",
        href: "./user-repair-requests",
        id: 2,
        icon: <MaterialIcon icon="visibility" />
      },
      {
        title: "Mis retomas",
        href: "./user-retoma-requests",
        id: 3,
        icon: <MaterialIcon icon="visibility" />
      }
    );
  } else if (JSON.parse(localStorage.getItem("user")).role === "admin") {
    useEffect(function () {
      getRequestNotificationToAdmin()
        .then(response => {
          setAlerts(
            response.filter(alert => alert.notificationType === "to_admin")
          );
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    countwasRevieweds = alerts.filter(
      alert => alert.wasReviewed == false
    ).length;

    SidebarData.push(
      {
        title: "Notificaciones",
        id: 0.5,
        href: "./admin-alerts",
        icon: <MaterialIcon icon="notifications" />,
        suffix: countwasRevieweds == 0 ? null : countwasRevieweds,
        suffixColor: countwasRevieweds == 0 ? "bg-success" : "bg-danger"
      },
      {
        title: "Acciones",
        id: 1,
        icon: <MaterialIcon icon="speed" />,
        collapisble: true,
        children: [
          {
            title: "Reparaciones",
            href: "./repair-requests-table"
          },
          {
            title: "Retomas",
            href: "./retoma-requests-table"
          }
        ]
      },
      {
        title: "Reportes",
        id: 2,
        icon: <MaterialIcon icon="summarize" />,
        collapisble: true,
        children: [
          {
            title: "Clientes",
            href: "./users-table"
          },
          {
            title: "Equipos",
            href: "./equipments-table"
          },
          {
            title: "Técnicos",
            href: "./technicians-table"
          },
          {
            title: "Domicilios",
            href: "./pickups-table"
          },
          {
            title: "Tecnicos a reparaciones",
            href: "./repair-table"
          },
          {
            title: "Pagos de retomas",
            href: "./retoma-payments-table"
          }
        ]
      },
      {
        title: "SIIGO",
        id: 3,
        icon: <MaterialIcon icon="account_balance_wallet" />,
        collapisble: true,
        children: [
          {
            title: "Productos",
            href: "./siigo-products-table"
          },
          {
            title: "Clientes",
            href: "./siigo-customers-table"
          },
          {
            title: "Facturas de venta",
            href: "./siigo-invoices-table"
          },
          {
            title: "Notas de credito",
            href: "./siigo-credit-notes-table"
          },
          {
            title: "Recibos de caja",
            href: "./siigo-vouchers-table"
          },
          {
            title: "Comprobantes contables",
            href: "./siigo-journals-table"
          },
          {
            title: "Impuestos",
            href: "./siigo-taxes-table"
          },
          {
            title: "Precios",
            href: "./siigo-price-lists-table"
          },
          {
            title: "Bodegas",
            href: "./siigo-ware-houses-table"
          },
          {
            title: "Usuarios",
            href: "./siigo-users-table"
          },
          {
            title: "Centros de costo",
            href: "./siigo-cost-centers-table"
          },
          {
            title: "Activos fijos",
            href: "./siigo-fixed-assets-table"
          },
          {
            title: "example"
          }
        ]
      }
    );
  } else if (JSON.parse(localStorage.getItem("user")).role === "aux_admin") {
    useEffect(function () {
      getRequestNotificationToAdmin()
        .then(response => {
          setAlerts(
            response.filter(alert => alert.notificationType === "to_aux_admin")
          );
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    countwasRevieweds = alerts.filter(
      alert => alert.wasReviewed == false
    ).length;

    SidebarData.push(
      {
        title: "Notificaciones",
        id: 0.5,
        href: "./admin-alerts",
        icon: <MaterialIcon icon="notifications" />,
        suffix: countwasRevieweds == 0 ? null : countwasRevieweds,
        suffixColor: countwasRevieweds == 0 ? "bg-success" : "bg-danger"
      },
      {
        title: "Acciones",
        id: 1,
        icon: <MaterialIcon icon="speed" />,
        collapisble: true,
        children: [
          {
            title: "Reparaciones",
            href: "./repair-requests-table"
          },
          {
            title: "Retomas",
            href: "./retoma-requests-table"
          }
        ]
      },
      {
        title: "Reportes",
        id: 2,
        icon: <MaterialIcon icon="summarize" />,
        collapisble: true,
        children: [
          {
            title: "Equipos",
            href: "./equipments-table"
          },
          {
            title: "Pagos de retomas",
            href: "./retoma-payments-table"
          }
        ]
      }
    );
  } else if (JSON.parse(localStorage.getItem("user")).role === "tecnico") {
    useEffect(function () {
      getRequestNotificationToTechnician()
        .then(response => {
          setAlerts(response);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    countwasRevieweds = alerts.filter(
      alert => alert.wasReviewed == false
    ).length;

    SidebarData.push(
      {
        title: "Notificaciones",
        id: 0.5,
        href: "./technician-alerts",
        icon: <MaterialIcon icon="notifications" />,
        suffix: countwasRevieweds == 0 ? null : countwasRevieweds,
        suffixColor: countwasRevieweds == 0 ? "bg-success" : "bg-danger"
      },
      {
        title: "Acciones",
        id: 1,
        icon: <MaterialIcon icon="speed" />,
        collapisble: true,
        children: [
          {
            title: "Reparaciones",
            href: "./repair-requests-table"
          },
          {
            title: "Retomas",
            href: "./retoma-requests-table"
          }
        ]
      },
      {
        title: "Reportes",
        id: 2,
        icon: <MaterialIcon icon="summarize" />,
        collapisble: true,
        children: [
          {
            title: "Técnicos a reparaciones",
            href: "./repair-table"
          }
        ]
      }
    );
  } else if (JSON.parse(localStorage.getItem("user")).role === "mensajero") {
    useEffect(function () {
      getRequestNotificationToCourier()
        .then(response => {
          setAlerts(response);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    countwasRevieweds = alerts.filter(
      alert => alert.wasReviewed == false
    ).length;

    SidebarData.push(
      {
        title: "Notificaciones",
        id: 0.5,
        href: "./courier-alerts",
        icon: <MaterialIcon icon="notifications" />,
        suffix: countwasRevieweds == 0 ? null : countwasRevieweds,
        suffixColor: countwasRevieweds == 0 ? "bg-success" : "bg-danger"
      },
      {
        title: "Acciones",
        id: 1,
        icon: <MaterialIcon icon="speed" />,
        collapisble: true,
        children: [
          // {
          //   title: "Reparaciones",
          //   href: "./repair-requests-table",
          // },
          // {
          //   title: "Retomas",
          //   href: "./retoma-requests-table",
          // },
          {
            title: "Solicitudes",
            href: "./all-requests-table"
          }
        ]
      }
    );
  }

  // const SidebarData = [
  //   { caption: 'Home' },
  //   {
  //     title: 'Dashboards',
  //     href: '/dashboards',
  //     id: 1,
  //     icon: <MaterialIcon icon="speed" />,
  //     collapisble: true,
  //     children: [
  //       {
  //         title: 'Dashboard 1',
  //         href: '/dashboards/dashboard1',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //         id: 1.1,
  //         collapisble: false,
  //       },
  //       {
  //         title: 'Dashboard 2',
  //         href: '/dashboards/dashboard2',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //         id: 1.2,
  //         collapisble: false,
  //       },
  //       {
  //         title: 'Dashboard 3',
  //         href: '/dashboards/dashboard3',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //         id: 1.3,
  //         collapisble: false,
  //       },
  //       {
  //         title: 'Dashboard 4',
  //         href: '/dashboards/dashboard4',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //         id: 1.4,
  //         collapisble: false,
  //       },
  //     ],
  //   },
  //   { caption: 'Apps' },
  //   {
  //     title: 'Notificaciones servicio domicilio',
  //     href: '/domicilio/notificaciones',
  //     icon: <MaterialIcon icon="notifications" />,
  //     id: 10,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'Notes',
  //     href: '/apps/notes',
  //     icon: <MaterialIcon icon="description" />,
  //     id: 2.1,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'Chat',
  //     href: '/apps/chat',
  //     icon: <MaterialIcon icon="chat" />,
  //     id: 2.2,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'Contacts',
  //     href: '/apps/contacts',
  //     icon: <MaterialIcon icon="person_outline" />,
  //     id: 2.3,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'Calendar',
  //     href: '/apps/calendar',
  //     icon: <MaterialIcon icon="calendar_today" />,
  //     id: 2.4,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'Email',
  //     href: '/apps/email',
  //     icon: <MaterialIcon icon="mail_outline" />,
  //     suffix: 'New',
  //     suffixColor: 'bg-success',
  //     id: 2.5,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'CASL',
  //     href: '/casl',
  //     icon: <MaterialIcon icon="manage_accounts" />,
  //     id: 2.6,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'Ecommerce',
  //     href: '/ecom',
  //     icon: <MaterialIcon icon="shopping_cart" />,
  //     id: 2.7,
  //     collapisble: true,
  //     children: [
  //       {
  //         title: 'Shop',
  //         href: '/ecom/shop',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Shop Detail',
  //         href: '/ecom/shopdetail',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Ticket',
  //     href: '/tickt',
  //     icon: <MaterialIcon icon="confirmation_number" />,
  //     id: 2.8,
  //     collapisble: true,
  //     children: [
  //       {
  //         title: 'Ticket List',
  //         href: '/tickt/ticket-list',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Ticket Detail',
  //         href: '/tickt/ticket-detail',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //     ],
  //   },
  //   {
  //     title: 'TreeView',
  //     href: '/apps/treeview',
  //     icon: <MaterialIcon icon="account_tree" />,
  //     id: 2.9,
  //     collapisble: false,
  //   },
  //   { caption: 'UI' },
  //   {
  //     title: 'UI Elements',
  //     href: '/ui',
  //     id: 2,
  //     suffix: '22',
  //     suffixColor: 'bg-info',
  //     icon: <MaterialIcon icon="grid_view" />,
  //     collapisble: true,
  //     children: [
  //       {
  //         title: 'Alert',
  //         href: '/ui/alerts',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Badges',
  //         href: '/ui/badges',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Buttons',
  //         href: '/ui/buttons',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Button Group',
  //         href: '/ui/button-group',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Breadcrumbs',
  //         href: '/ui/breadcrumbs',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Cards',
  //         href: '/ui/cards',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Collapse',
  //         href: '/ui/collapse',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Dropdown',
  //         href: '/ui/dropdown',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Grid',
  //         href: '/ui/grid',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'List Group',
  //         href: '/ui/list-group',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Modal',
  //         href: '/ui/modal',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Navbar',
  //         href: '/ui/navbar',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Navs',
  //         href: '/ui/nav',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Pagination',
  //         href: '/ui/pagination',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Popover',
  //         href: '/ui/popover',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Progress',
  //         href: '/ui/progress',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Spinner',
  //         href: '/ui/spinner',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Tabs',
  //         href: '/ui/tabs',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Toasts',
  //         href: '/ui/toasts',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Tooltip',
  //         href: '/ui/tooltip',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //     ],
  //   },
  //   { caption: 'Forms' },
  //   {
  //     title: 'Form Layouts',
  //     href: '/form-layout',
  //     icon: <MaterialIcon icon="feed" />,
  //     id: 3.1,
  //     collapisble: true,
  //     children: [
  //       {
  //         title: 'Basic Forms',
  //         href: '/form-layout/form-basic',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Form Grid',
  //         href: '/form-layout/form-grid',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Form Group',
  //         href: '/form-layout/form-group',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Form Input',
  //         href: '/form-layout/form-input',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Form Pickers',
  //     href: '/form-pickers',
  //     icon: <MaterialIcon icon="colorize" />,
  //     id: 3.2,
  //     collapisble: true,
  //     children: [
  //       {
  //         title: 'Datepicker',
  //         href: '/form-pickers/datepicker',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Tags & Select',
  //         href: '/form-pickers/tag-select',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Form Validation',
  //     href: '/form-validation',
  //     icon: <MaterialIcon icon="assignment_turned_in" />,
  //     id: 3.3,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'Form Steps',
  //     href: '/form-steps',
  //     icon: <MaterialIcon icon="toc" />,
  //     id: 3.4,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'Form Editor',
  //     href: '/form-editor',
  //     icon: <MaterialIcon icon="app_registration" />,
  //     id: 3.5,
  //     collapisble: false,
  //   },
  //   { caption: 'Tables' },
  //   {
  //     title: 'Basic Table',
  //     href: '/tables/basic-table',
  //     icon: <MaterialIcon icon="table_chart" />,
  //     id: 4.1,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'React Table',
  //     href: '/tables/react-table',
  //     icon: <MaterialIcon icon="table_rows" />,
  //     id: 4.2,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'Bootstrap Datatable',
  //     href: '/tables/data-table',
  //     icon: <MaterialIcon icon="backup_table" />,
  //     id: 4.3,
  //     collapisble: false,
  //   },
  //   { caption: 'Charts' },
  //   {
  //     title: 'Apexchart',
  //     href: '/charts/apex',
  //     icon: <MaterialIcon icon="scatter_plot" />,
  //     id: 5.1,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'ChartJs',
  //     href: '/charts/chartjs',
  //     icon: <MaterialIcon icon="area_chart" />,
  //     id: 5.2,
  //     collapisble: false,
  //   },
  //   { caption: 'Extra' },
  //   {
  //     title: 'Listas',
  //     href: '/sample-pages',
  //     icon: <MaterialIcon icon="copy_all" />,
  //     id: 6.1,
  //     collapisble: true,
  //     children: [
  //       {
  //         title: 'Lista de Usuarios',
  //         href: '/sample-pages/starterkit',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Lista de Reparaciones',
  //         href: '/sample-pages/profile',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Lista de Retomas',
  //         href: '/sample-pages/search-result',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Lista de Equipos',
  //         href: '/sample-pages/gallery',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Lista de Técnicos',
  //         href: '/sample-pages/helper-class',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Widget',
  //     href: '/widget',
  //     icon: <MaterialIcon icon="widgets" />,
  //     id: 6.4,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'Icons',
  //     href: '/icons',
  //     icon: <MaterialIcon icon="face" />,
  //     id: 6.2,
  //     collapisble: true,
  //     children: [
  //       {
  //         title: 'Bootstrap',
  //         href: '/icons/bootstrap',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Feather',
  //         href: '/icons/feather',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Vector Map',
  //     href: '/map/vector',
  //     icon: <MaterialIcon icon="place" />,
  //     id: 6.3,
  //     collapisble: false,
  //   },
  //   {
  //     title: 'Authentication',
  //     href: '/auth',
  //     icon: <MaterialIcon icon="lock" />,
  //     id: 6.5,
  //     collapisble: true,
  //     children: [
  //       {
  //         title: 'Login',
  //         href: '/auth/loginformik',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Register',
  //         href: '/registerformik',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Maintanance',
  //         href: '/auth/maintanance',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Lockscreen',
  //         href: '/auth/lockscreen',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Recover Password',
  //         href: '/auth/recoverpwd',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Error',
  //         href: '/auth/404',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //     ],
  //   },
  //   {
  //     title: 'DD Menu',
  //     href: '/',
  //     id: 7,
  //     collapisble: true,
  //     icon: <MaterialIcon icon="subject" />,
  //     children: [
  //       {
  //         title: 'Simple dd 1',
  //         href: '/',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Simple dd 2',
  //         href: '/',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //       },
  //       {
  //         title: 'Simple dd 3',
  //         href: '/',
  //         icon: <MaterialIcon icon="radio_button_checked" />,
  //         children: [
  //           {
  //             title: 'Simple dd 1.1',
  //             href: '/alerts',
  //             icon: <MaterialIcon icon="radio_button_checked" />,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  return { SidebarData };
};

export default SidebarDatas;
