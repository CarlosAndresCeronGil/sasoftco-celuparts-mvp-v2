import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/Loadable';
/****Layouts*****/

const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
/***** Pages ****/

const Dashboard1 = Loadable(lazy(() => import('../views/dashboards/Dashboard1')));
const Dashboard2 = Loadable(lazy(() => import('../views/dashboards/Dashboard2')));
const Dashboard3 = Loadable(lazy(() => import('../views/dashboards/Dashboard3')));
const Dashboard4 = Loadable(lazy(() => import('../views/dashboards/Dashboard4')));
const About = Loadable(lazy(() => import('../views/About')));

/***** Apps ****/
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Chat = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/CalendarApp')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Shop = Loadable(lazy(() => import('../views/apps/ecommerce/Shop')));
const ShopDetail = Loadable(lazy(() => import('../views/apps/ecommerce/ShopDetail')));
const Treeview = Loadable(lazy(() => import('../views/apps/treeview/TreeView')));
const TicketList = Loadable(lazy(() => import('../views/apps/ticket/TicketList')));
const TicketDetail = Loadable(lazy(() => import('../views/apps/ticket/TicketDetail')));

/***** Ui Elements ****/
const Alerts = Loadable(lazy(() => import('../views/ui/Alerts')));
const Badges = Loadable(lazy(() => import('../views/ui/Badges')));
const Buttons = Loadable(lazy(() => import('../views/ui/Buttons')));
const Cards = Loadable(lazy(() => import('../views/ui/Cards')));
const Grid = Loadable(lazy(() => import('../views/ui/Grid')));
const Tables = Loadable(lazy(() => import('../views/ui/Tables')));
const Forms = Loadable(lazy(() => import('../views/ui/Forms')));
const Breadcrumbs = Loadable(lazy(() => import('../views/ui/Breadcrumbs')));
const Dropdowns = Loadable(lazy(() => import('../views/ui/DropDown')));
const BtnGroup = Loadable(lazy(() => import('../views/ui/BtnGroup')));
const Collapse = Loadable(lazy(() => import('../views/ui/Collapse')));
const ListGroup = Loadable(lazy(() => import('../views/ui/ListGroup')));
const Modal = Loadable(lazy(() => import('../views/ui/Modal')));
const Navbar = Loadable(lazy(() => import('../views/ui/Navbar')));
const Nav = Loadable(lazy(() => import('../views/ui/Nav')));
const Pagination = Loadable(lazy(() => import('../views/ui/Pagination')));
const Popover = Loadable(lazy(() => import('../views/ui/Popover')));
const Progress = Loadable(lazy(() => import('../views/ui/Progress')));
const Spinner = Loadable(lazy(() => import('../views/ui/Spinner')));
const Tabs = Loadable(lazy(() => import('../views/ui/Tabs')));
const Toasts = Loadable(lazy(() => import('../views/ui/Toasts')));
const Tooltip = Loadable(lazy(() => import('../views/ui/Tooltip')));

/***** Form Layout Pages ****/
const FormBasic = Loadable(lazy(() => import('../views/form-layouts/FormBasic')));
const FormGrid = Loadable(lazy(() => import('../views/form-layouts/FormGrid')));
const FormGroup = Loadable(lazy(() => import('../views/form-layouts/FormGroup')));
const FormInput = Loadable(lazy(() => import('../views/form-layouts/FormInput')));
const FormEditor = Loadable(lazy(() => import('../views/form-editor/FormEditor')));

/***** Form Pickers Pages ****/
const Datepicker = Loadable(lazy(() => import('../views/form-pickers/DateTimePicker')));
const TagSelect = Loadable(lazy(() => import('../views/form-pickers/TagSelect')));

/***** Form Validation Pages ****/
const FormValidate = Loadable(lazy(() => import('../views/form-validation/FormValidation')));
const FormSteps = Loadable(lazy(() => import('../views/form-steps/Steps')));

/***** Table Pages ****/
const Basictable = Loadable(lazy(() => import('../views/tables/TableBasic')));
const CustomReactTable = Loadable(lazy(() => import('../views/tables/CustomReactTable')));
const ReactBootstrapTable = Loadable(lazy(() => import('../views/tables/ReactBootstrapTable')));

/***** Chart Pages ****/
const ApexCharts = Loadable(lazy(() => import('../views/charts/ApexCharts')));
const ChartJs = Loadable(lazy(() => import('../views/charts/ChartJs')));

/***** Sample Pages ****/
const StarterKit = Loadable(lazy(() => import('../views/sample-pages/StarterKit')));
const Profile = Loadable(lazy(() => import('../views/sample-pages/Profile')));
const Gallery = Loadable(lazy(() => import('../views/sample-pages/Gallery')));
const SearchResult = Loadable(lazy(() => import('../views/sample-pages/SearchResult')));
const HelperClass = Loadable(lazy(() => import('../views/sample-pages/HelperClass')));

/***** Icon Pages ****/
const Bootstrap = Loadable(lazy(() => import('../views/icons/Bootstrap')));
const Feather = Loadable(lazy(() => import('../views/icons/Feather')));

/***** Map Pages ****/
const CustomVectorMap = Loadable(lazy(() => import('../views/maps/CustomVectorMap')));

/***** Widget Pages ****/
const Widget = Loadable(lazy(() => import('../views/widget/Widget')));

/***** CASL Access Control ****/
const CASL = Loadable(lazy(() => import('../views/apps/accessControlCASL/AccessControl')));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
const RegisterFormik = Loadable(lazy(() => import('../views/auth/RegisterFormik')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));
const Maintanance = Loadable(lazy(() => import('../views/auth/Maintanance')));
const LockScreen = Loadable(lazy(() => import('../views/auth/LockScreen')));
const RecoverPassword = Loadable(lazy(() => import('../views/auth/RecoverPassword')));

/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', name: 'Home', element: <Navigate to="/dashboards/dashboard1" /> },
      { path: '/dashboards/dashboard1', name: 'Dashboard 1', exact: true, element: <Dashboard1 /> },
      { path: '/dashboards/dashboard2', name: 'Dashboard 2', exact: true, element: <Dashboard2 /> },
      { path: '/dashboards/dashboard3', name: 'Dashboard 3', exact: true, element: <Dashboard3 /> },
      { path: '/dashboards/dashboard4', name: 'Dashboard 4', exact: true, element: <Dashboard4 /> },
      { path: '/about', name: 'about', exact: true, element: <About /> },
      { path: '/apps/notes', name: 'notes', exact: true, element: <Notes /> },
      { path: '/apps/chat', name: 'chat', exact: true, element: <Chat /> },
      { path: '/apps/contacts', name: 'contacts', exact: true, element: <Contacts /> },
      { path: '/apps/calendar', name: 'calendar', exact: true, element: <Calendar /> },
      { path: '/apps/email', name: 'email', exact: true, element: <Email /> },
      { path: '/ecom/shop', name: 'email', exact: true, element: <Shop /> },
      { path: '/ecom/shopdetail', name: 'email', exact: true, element: <ShopDetail /> },
      { path: '/tickt/ticket-list', name: 'ticket list', exact: true, element: <TicketList /> },
      {
        path: '/tickt/ticket-detail',
        name: 'ticket detail',
        exact: true,
        element: <TicketDetail />,
      },
      { path: '/apps/treeview', name: 'email', exact: true, element: <Treeview /> },
      { path: '/ui/alerts', name: 'alerts', exact: true, element: <Alerts /> },
      { path: '/ui/badges', name: 'badges', exact: true, element: <Badges /> },
      { path: '/ui/buttons', name: 'buttons', exact: true, element: <Buttons /> },
      { path: '/ui/cards', name: 'cards', exact: true, element: <Cards /> },
      { path: '/ui/grid', name: 'grid', exact: true, element: <Grid /> },
      { path: '/ui/table', name: 'table', exact: true, element: <Tables /> },
      { path: '/ui/forms', name: 'forms', exact: true, element: <Forms /> },
      { path: '/ui/breadcrumbs', name: 'breadcrumbs', exact: true, element: <Breadcrumbs /> },
      { path: '/ui/dropdown', name: 'dropdown', exact: true, element: <Dropdowns /> },
      { path: '/ui/button-group', name: 'button group', exact: true, element: <BtnGroup /> },
      { path: '/ui/collapse', name: 'collapse', exact: true, element: <Collapse /> },
      { path: '/ui/list-group', name: 'list-group', exact: true, element: <ListGroup /> },
      { path: '/ui/modal', name: 'modal', exact: true, element: <Modal /> },
      { path: '/ui/navbar', name: 'navbar', exact: true, element: <Navbar /> },
      { path: '/ui/nav', name: 'nav', exact: true, element: <Nav /> },
      { path: '/ui/pagination', name: 'pagination', exact: true, element: <Pagination /> },
      { path: '/ui/popover', name: 'popover', exact: true, element: <Popover /> },
      { path: '/ui/progress', name: 'progress', exact: true, element: <Progress /> },
      { path: '/ui/spinner', name: 'spinner', exact: true, element: <Spinner /> },
      { path: '/ui/tabs', name: 'tabs', exact: true, element: <Tabs /> },
      { path: '/ui/toasts', name: 'toasts', exact: true, element: <Toasts /> },
      { path: '/ui/tooltip', name: 'tooltip', exact: true, element: <Tooltip /> },
      { path: '/form-layout/form-basic', name: 'form-basic', exact: true, element: <FormBasic /> },
      { path: '/form-layout/form-grid', name: 'form-grid', exact: true, element: <FormGrid /> },
      { path: '/form-layout/form-group', name: 'form-group', exact: true, element: <FormGroup /> },
      { path: '/form-layout/form-input', name: 'form-input', exact: true, element: <FormInput /> },
      {
        path: '/form-pickers/datepicker',
        name: 'datepicker',
        exact: true,
        element: <Datepicker />,
      },
      { path: '/form-pickers/tag-select', name: 'tag-select', exact: true, element: <TagSelect /> },
      { path: '/form-validation', name: 'form-validation', exact: true, element: <FormValidate /> },
      { path: '/form-steps', name: 'form-steps', exact: true, element: <FormSteps /> },
      { path: '/form-editor', name: 'form-editor', exact: true, element: <FormEditor /> },
      { path: '/tables/basic-table', name: 'basic-table', exact: true, element: <Basictable /> },
      {
        path: '/tables/react-table',
        name: 'react-table',
        exact: true,
        element: <CustomReactTable />,
      },
      {
        path: '/tables/data-table',
        name: 'data-table',
        exact: true,
        element: <ReactBootstrapTable />,
      },
      { path: '/charts/apex', name: 'apex', exact: true, element: <ApexCharts /> },
      { path: '/charts/chartjs', name: 'chartjs', exact: true, element: <ChartJs /> },
      { path: '/sample-pages/profile', name: 'profile', exact: true, element: <Profile /> },
      {
        path: '/sample-pages/helper-class',
        name: 'helper-class',
        exact: true,
        element: <HelperClass />,
      },
      {
        path: '/sample-pages/starterkit',
        name: 'starterkit',
        exact: true,
        element: <StarterKit />,
      },
      { path: '/sample-pages/gallery', name: 'gallery', exact: true, element: <Gallery /> },
      {
        path: '/sample-pages/search-result',
        name: 'search-result',
        exact: true,
        element: <SearchResult />,
      },
      { path: '/icons/bootstrap', name: 'bootstrap', exact: true, element: <Bootstrap /> },
      { path: '/icons/feather', name: 'feather', exact: true, element: <Feather /> },
      { path: '/map/vector', name: 'vector', exact: true, element: <CustomVectorMap /> },
      { path: '/widget', name: 'widget', exact: true, element: <Widget /> },
      { path: '/casl', name: 'casl', exact: true, element: <CASL /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: 'registerformik', element: <RegisterFormik /> },
      { path: 'loginformik', element: <LoginFormik /> },
      { path: 'maintanance', element: <Maintanance /> },
      { path: 'lockscreen', element: <LockScreen /> },
      { path: 'recoverpwd', element: <RecoverPassword /> },
    ],
  },
];

export default ThemeRoutes;
