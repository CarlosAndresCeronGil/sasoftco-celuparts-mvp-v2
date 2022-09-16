import MaterialIcon from '@material/react-material-icon';

const SidebarData = [
  { caption: 'Home' },
  {
    title: 'Dashboards',
    href: '/dashboards',
    id: 1,
    suffix: '4',
    suffixColor: 'bg-info',
    icon: <MaterialIcon icon="speed" />,
    collapisble: true,
    children: [
      {
        title: 'Dashboard 1',
        href: '/dashboards/dashboard1',
        icon: <MaterialIcon icon="radio_button_checked" />,
        id: 1.1,
        collapisble: false,
      },
      {
        title: 'Dashboard 2',
        href: '/dashboards/dashboard2',
        icon: <MaterialIcon icon="radio_button_checked" />,
        id: 1.2,
        collapisble: false,
      },
      {
        title: 'Dashboard 3',
        href: '/dashboards/dashboard3',
        icon: <MaterialIcon icon="radio_button_checked" />,
        id: 1.3,
        collapisble: false,
      },
      {
        title: 'Dashboard 4',
        href: '/dashboards/dashboard4',
        icon: <MaterialIcon icon="radio_button_checked" />,
        id: 1.4,
        collapisble: false,
      },
    ],
  },
  { caption: 'Apps' },
  {
    title: 'Apps',
    href: '/apps',
    id: 2,
    icon: <MaterialIcon icon="grid_view" />,
    ddType: 'two-column',
    collapisble: true,
    children: [
      {
        title: 'Notes',
        href: '/apps/notes',
        icon: <MaterialIcon icon="description" />,
      },
      {
        title: 'Chat',
        href: '/apps/chat',
        icon: <MaterialIcon icon="chat" />,
      },
      {
        title: 'Contacts',
        href: '/apps/contacts',
        icon: <MaterialIcon icon="person_outline" />,
      },
      {
        title: 'Calendar',
        href: '/apps/calendar',
        icon: <MaterialIcon icon="calendar_today" />,
      },
      {
        title: 'Email',
        href: '/apps/email',
        icon: <MaterialIcon icon="mail_outline" />,
      },
      {
        title: 'CASL',
        href: '/casl',
        icon: <MaterialIcon icon="manage_accounts" />,
      },
      {
        title: 'Shop',
        href: '/ecom/shop',
        icon: <MaterialIcon icon="shopping_cart" />,
      },
      {
        title: 'Shop Detail',
        href: '/ecom/shopdetail',
        icon: <MaterialIcon icon="shopping_cart" />,
      },
      {
        title: 'Ticket List',
        href: '/tickt/ticket-list',
        icon: <MaterialIcon icon="confirmation_number" />,
      },
      {
        title: 'Ticket Detail',
        href: '/tickt/ticket-detail',
        icon: <MaterialIcon icon="confirmation_number" />,
      },
      {
        title: 'TreeView',
        href: '/apps/treeview',
        icon: <MaterialIcon icon="account_tree" />,
      },
    ],
  },
  { caption: 'UI' },
  {
    title: 'UI Elements',
    href: '/ui',
    id: 3,
    suffix: '22',
    suffixColor: 'bg-danger',
    ddType: 'mega-dropdown',
    icon: <MaterialIcon className='md-outlined' icon="auto_awesome_mosaic" />,
    collapisble: true,
    children: [
      {
        title: 'Alert',
        href: '/ui/alerts',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Badges',
        href: '/ui/badges',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Buttons',
        href: '/ui/buttons',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Button Group',
        href: '/ui/button-group',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Breadcrumbs',
        href: '/ui/breadcrumbs',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Cards',
        href: '/ui/cards',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Collapse',
        href: '/ui/collapse',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Dropdown',
        href: '/ui/dropdown',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Grid',
        href: '/ui/grid',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'List Group',
        href: '/ui/list-group',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Modal',
        href: '/ui/modal',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Navbar',
        href: '/ui/navbar',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Navs',
        href: '/ui/nav',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Pagination',
        href: '/ui/pagination',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Popover',
        href: '/ui/popover',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Progress',
        href: '/ui/progress',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Spinner',
        href: '/ui/spinner',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Tabs',
        href: '/ui/tabs',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Toasts',
        href: '/ui/toasts',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Tooltip',
        href: '/ui/tooltip',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
    ],
  },
  { caption: 'Forms' },
  {
    title: 'Forms',
    href: '/forms',
    icon: <MaterialIcon icon="feed" />,
    id: 4,
    collapisble: true,
    children: [
      {
        title: 'Basic Forms',
        href: '/form-layout/form-basic',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Form Grid',
        href: '/form-layout/form-grid',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Form Group',
        href: '/form-layout/form-group',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Form Input',
        href: '/form-layout/form-input',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Datepicker',
        href: '/form-pickers/datepicker',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Tags & Select',
        href: '/form-pickers/tag-select',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Form Validation',
        href: '/form-validation',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Form Steps',
        href: '/form-steps',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
      {
        title: 'Form Editor',
        href: '/form-editor',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
    ],
  },

  { caption: 'Tables' },
  {
    title: 'Tables',
    href: '/tables',
    icon: <MaterialIcon icon="table_chart" />,
    id: 5,
    collapisble: true,
    children: [
      {
        title: 'Basic Table',
        href: '/tables/basic-table',
        icon: <MaterialIcon icon="table_chart" />,
      },
      {
        title: 'React Table',
        href: '/tables/react-table',
        icon: <MaterialIcon icon="table_rows" />,
      },
      {
        title: 'Bootstrap Datatable',
        href: '/tables/data-table',
        icon: <MaterialIcon icon="backup_table" />,
      },
    ],
  },
  { caption: 'Extra' },
  {
    title: 'Extra',
    href: '/extra',
    icon: <MaterialIcon icon="copy_all" />,
    id: 6,
    ddType: 'two-column',
    collapisble: true,
    children: [
      {
        title: 'Apexchart',
        href: '/charts/apex',
        icon: <MaterialIcon icon="scatter_plot" />,
      },
      {
        title: 'ChartJs',
        href: '/charts/chartjs',
        icon: <MaterialIcon icon="area_chart" />,
      },
      {
        title: 'Starterkit',
        href: '/sample-pages/starterkit',
        icon: <MaterialIcon icon="copy_all" />,
      },
      {
        title: 'Profile',
        href: '/sample-pages/profile',
        icon: <MaterialIcon icon="account_circle" />,
      },
      {
        title: 'Search Result',
        href: '/sample-pages/search-result',
        icon: <MaterialIcon icon="manage_search" />,
      },
      {
        title: 'Gallery',
        href: '/sample-pages/gallery',
        icon: <MaterialIcon icon="crop_original" />,
      },
      {
        title: 'Helper Class',
        href: '/sample-pages/helper-class',
        icon: <MaterialIcon icon="support" />,
      },
      {
        title: 'Widget',
        href: '/widget',
        icon: <MaterialIcon icon="widgets" />,
      },
      {
        title: 'Bootstrap Icons',
        href: '/icons/bootstrap',
        icon: <MaterialIcon icon="face" />,
      },
      {
        title: 'Feather Icons',
        href: '/icons/feather',
        icon: <MaterialIcon icon="face" />,
      },
      {
        title: 'Vector Map',
        href: '/map/vector',
        icon: <MaterialIcon icon="place" />,
      },
      {
        title: 'Login',
        href: '/auth/loginformik',
        icon: <MaterialIcon icon="login" />,
      },
      {
        title: 'Register',
        href: '/auth/registerformik',
        icon: <MaterialIcon icon="how_to_reg" />,
      },
      {
        title: 'Maintanance',
        href: '/auth/maintanance',
        icon: <MaterialIcon icon="engineering" />,
      },
      {
        title: 'Lockscreen',
        href: '/auth/lockscreen',
        icon: <MaterialIcon icon="lock" />,
      },
      {
        title: 'Recover Password',
        href: '/auth/recoverpwd',
        icon: <MaterialIcon icon="sync" />,
      },
      {
        title: 'Error',
        href: '/auth/404',
        icon: <MaterialIcon icon="radio_button_checked" />,
      },
    ],
  },
  // {
  //   title: 'DD Menu',
  //   href: '/',
  //   id: 7,
  //   collapisble: true,
  //   icon: <MaterialIcon icon="speed" />,
  //   children: [
  //     {
  //       title: 'Simple dd 1',
  //       href: '/',
  //       icon: <MaterialIcon icon="speed" />,
  //     },
  //     {
  //       title: 'Simple dd 2',
  //       href: '/',
  //       icon: <MaterialIcon icon="speed" />,
  //     },
  //     {
  //       title: 'Simple dd 3',
  //       href: '/',
  //       icon: <MaterialIcon icon="speed" />,
  //       children: [
  //         {
  //           title: 'Simple dd 1.1',
  //           href: '/alerts',
  //           icon: <MaterialIcon icon="speed" />,
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default SidebarData;
