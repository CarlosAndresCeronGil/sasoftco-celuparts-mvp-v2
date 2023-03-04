/* eslint-disable */
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/Loadable';

export function Router() {
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
  const ChangePassword = Loadable(lazy(() => import('../views/auth/ChangePassword')));

  /***** Celuparts Pages ****/
  const SignIn = lazy(() => import('../views/celuparts/SignIn'));
  const SignUp = lazy(() => import('../views/celuparts/SignUp'));
  const UsersTable = lazy(() => import('../views/celuparts/UsersTable'));
  const RepairRequestsTable = lazy(() => import('../views/celuparts/RepairRequestsTable'));
  const RetomaRequestsTable = lazy(() => import('../views/celuparts/RetomaRequestsTable'));
  const EquipmentsTable = lazy(() => import('../views/celuparts/EquipmentsTable'));
  const PickupsTable = lazy(() => import('../views/celuparts/PickupsTable'));
  const RequestStatusTable = lazy(() => import('../views/celuparts/RequestStatusTable'));
  const TechniciansTable = lazy(() => import('../views/celuparts/TechniciansTable'));
  const RepairTable = lazy(() => import('../views/celuparts/RepairTable'));
  const RequestForm = lazy(() => import('../views/celuparts/RequestForm'));
  const UpdateRepairForm = lazy(() => import('../views/celuparts/UpdateRepairForm'));
  const UpdateStateRepair = lazy(() => import('../views/celuparts/UpdateStatesRepair'));
  const UpdateStateRetoma = lazy(() => import('../views/celuparts/UpdateStatesRetoma'));
  const UpdateRetomaForm = lazy(() => import('../views/celuparts/UpdateRetomaForm'));
  const RequestStatusForm = lazy(() => import('../views/celuparts/RequestStatusForm'));
  const UserRepairRequests = lazy(() => import('../views/celuparts/UserRepairRequests'));
  const UserRetomaRequests = lazy(() => import('../views/celuparts/UserRetomaRequests'));
  const RepairPaymentForm = lazy(() => import('../views/celuparts/RepairPaymentForm'));
  const RetomaPaymentForm = lazy(() => import('../views/celuparts/RetomaPaymentForm'));
  const SiigoProductsTable = lazy(() => import('../views/celuparts/SiigoProductsTable'));
  const SiigoProductForm = lazy(() => import('../views/celuparts/SiigoProductForm'));
  const SiigoCustomersTable = lazy(() => import('../views/celuparts/SiigoCustomersTable'));
  const SiigoCustomerForm = lazy(() => import('../views/celuparts/SiigoCustomerForm'));
  const SiigoInvoicesTables = lazy(() => import('../views/celuparts/SiigoInvoicesTables'));
  const SiigoInvoiceForm = lazy(() => import('../views/celuparts/SiigoInvoiceForm'));
  const SiigoCreditNotesTable = lazy(() => import('../views/celuparts/SiigoCreditNotesTable'));
  const SiigoCreditNotesForm = lazy(() => import('../views/celuparts/SiigoCreditNotesForm'));
  const SiigoVouchersTable = lazy(() => import('../views/celuparts/SiigoVouchersTable'));
  const SiigoVoucherForm = lazy(() => import('../views/celuparts/SiigoVoucherForm'));
  const SiigoJournalsTable = lazy(() => import('../views/celuparts/SiigoJournalsTable'));
  const SiigoJournalsForm = lazy(() => import('../views/celuparts/SiigoJournalsForm'));
  const SiigoAccountGroupsTable = lazy(() => import('../views/celuparts/SiigoAccountGroupsTable'));
  const SiigoTaxesTable = lazy(() => import('../views/celuparts/SiigoTaxesTable'));
  const SiigoPriceListsTable = lazy(() => import('../views/celuparts/SiigoPriceListsTable'));
  const SiigoWareHousesTable = lazy(() => import('../views/celuparts/SiigoWareHousesTable'));
  const SiigoUsersTable = lazy(() => import('../views/celuparts/SiigoUsersTable'));
  const SiigoCostCentersTable = lazy(() => import('../views/celuparts/SiigoCostCentersTable'));
  const SiigoFixedAssetsTable = lazy(() => import('../views/celuparts/SiigoFixedAssetsTable'));

  const CourierAlerts = lazy(() => import('../views/celuparts/CourierAlerts'));
  const CustomerAlerts = lazy(() => import('../views/celuparts/CustomerAlerts'));
  const TechnicianAlerts = lazy(() => import('../views/celuparts/TechnicianAlerts'));
  const AdminAlerts = lazy(() => import('../views/celuparts/AdminAlerts'));
  const Home = lazy(() => import('../views/celuparts/Home'));
  const RequestRepairForm = lazy(() => import('../views/celuparts/RequestRepairForm'));
  const RequestRetomaForm = lazy(() => import('../views/celuparts/RequestRetomaForm'));
  const EquipmentDetail = lazy(() => import('../views/celuparts/EquipmentDetail'));
  const RequestHistoryTable = lazy(() => import('../views/celuparts/RequestHistoryTable'));
  const RetomaPaymentsTable = lazy(() => import('../views/celuparts/RetomaPaymentsTable'));
  const RepairStepts = lazy(() => import('../views/celuparts/RepariRequestSteps/RequestSteps'));
  const AllRequestsTable = lazy(() => import('../views/celuparts/AllRequestsTable'));

  const DashboardCeluparts = lazy(() => import('../views/celuparts/DashboardCeluparts'));

  /*****Routes******/
  const ThemeRoutes = [
    {
      path: '/',
      element: <BlankLayout />,
      children: [
        { path: '', element: <LoginFormik /> },
        { path: '404', element: <Error /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'registerformik', element: <RegisterFormik /> },
        { path: 'maintanance', element: <Maintanance /> },
        { path: 'lockscreen', element: <LockScreen /> },
        { path: 'recoverpassword', element: <RecoverPassword /> },
        { path: 'changepassword/:token', element: <ChangePassword /> },
      ],
    },
  ];

  if (JSON.parse(localStorage.getItem('user')) !== null) {
    JSON.parse(localStorage.getItem('user')).role === 'user'
      ? ThemeRoutes.push({
          path: '/home',
          element: <FullLayout />,
          children: [
            { path: '/home', name: 'Home', element: <Navigate to="/dashboards/dashboard1" /> },
            { path: '/home/login', name: 'login', exact: true, element: <SignIn /> },
            {
              path: '/home/dashboards/dashboard1',
              name: 'Dashboard Celuparts',
              exact: true,
              element: <DashboardCeluparts />,
            },
            {
              path: '/home/user-alerts',
              name: 'Notificaciones',
              exact: true,
              element: <CustomerAlerts />,
            },
            { path: '/home/request-repair-form', exact: true, element: <RequestRepairForm /> },
            // { path: "/home/request-repair-form", exact: true, element: <RepairStepts /> },
            { path: '/home/request-retoma-form', exact: true, element: <RequestRetomaForm /> },
            { path: '/home/user-repair-requests', exact: true, element: <UserRepairRequests /> },
            { path: '/home/user-retoma-requests', exact: true, element: <UserRetomaRequests /> },
            {
              path: '/home/request-history-table/:id',
              exact: true,
              element: <RequestHistoryTable />,
            },
          ],
        })
      : JSON.parse(localStorage.getItem('user')).role === 'admin'
      ? ThemeRoutes.push({
          path: '/home',
          exact: true,
          element: <FullLayout />,
          children: [
            { path: '/home', exact: true, element: <Home /> },
            {
              path: '/home/dashboards/dashboard1',
              name: 'Dashboard Celuparts',
              exact: true,
              element: <DashboardCeluparts />,
            },
            { path: '/home/users-table', exact: true, element: <UsersTable /> },
            { path: '/home/repair-requests-table', exact: true, element: <RepairRequestsTable /> },
            { path: '/home/retoma-requests-table', exact: true, element: <RetomaRequestsTable /> },
            { path: '/home/equipments-table', exact: true, element: <EquipmentsTable /> },
            { path: '/home/request-status-table', exact: true, element: <RequestStatusTable /> },
            { path: '/home/technicians-table', exact: true, element: <TechniciansTable /> },
            { path: '/home/pickups-table', exact: true, element: <PickupsTable /> },
            { path: '/home/repair-table', exact: true, element: <RepairTable /> },
            { path: '/home/update-repair-form', exact: true, element: <UpdateRepairForm /> },
            { path: '/home/update-state-repair', exact: true, element: <UpdateStateRepair /> },
            { path: '/home/update-state-retoma', exact: true, element: <UpdateStateRetoma /> },
            { path: '/home/request-status-form', exact: true, element: <RequestStatusForm /> },
            { path: '/home/request-status-form/:id', exact: true, element: <RequestStatusForm /> },
            { path: '/home/update-repair-form/:id', exact: true, element: <UpdateRepairForm /> },
            { path: '/home/update-retoma-form/:id', exact: true, element: <UpdateRetomaForm /> },
            { path: '/home/repair-payment-form/:id', exact: true, element: <RepairPaymentForm /> },
            { path: '/home/retoma-payment-form/:id', exact: true, element: <RetomaPaymentForm /> },
            { path: '/home/siigo-products-table', exact: true, element: <SiigoProductsTable /> },
            { path: '/home/siigo-product-form', exact: true, element: <SiigoProductForm /> },
            { path: '/home/siigo-customers-table', exact: true, element: <SiigoCustomersTable /> },
            { path: '/home/siigo-customer-form', exact: true, element: <SiigoCustomerForm /> },
            { path: '/home/siigo-invoices-table', exact: true, element: <SiigoInvoicesTables /> },
            { path: '/home/siigo-invoices-form', exact: true, element: <SiigoInvoiceForm /> },
            {
              path: '/home/siigo-credit-notes-table',
              exact: true,
              element: <SiigoCreditNotesTable />,
            },
            {
              path: '/home/siigo-credit-notes-form',
              exact: true,
              element: <SiigoCreditNotesForm />,
            },
            { path: '/home/siigo-vouchers-table', exact: true, element: <SiigoVouchersTable /> },
            { path: '/home/siigo-voucher-form', exact: true, element: <SiigoVoucherForm /> },
            { path: '/home/siigo-journals-table', exact: true, element: <SiigoJournalsTable /> },
            { path: '/home/siigo-journal-form', exact: true, element: <SiigoJournalsForm /> },
            // { path: "/home/siigo-account-groups-table", exact: true, element: <SiigoAccountGroupsTable /> },
            { path: '/home/siigo-taxes-table', exact: true, element: <SiigoTaxesTable /> },
            {
              path: '/home/siigo-price-lists-table',
              exact: true,
              element: <SiigoPriceListsTable />,
            },
            {
              path: '/home/siigo-ware-houses-table',
              exact: true,
              element: <SiigoWareHousesTable />,
            },
            { path: '/home/siigo-users-table', exact: true, element: <SiigoUsersTable /> },
            {
              path: '/home/siigo-cost-centers-table',
              exact: true,
              element: <SiigoCostCentersTable />,
            },
            {
              path: '/home/siigo-fixed-assets-table',
              exact: true,
              element: <SiigoFixedAssetsTable />,
            },
            { path: '/home/admin-alerts', exact: true, element: <AdminAlerts /> },
            { path: '/home/equipment-detail/:id', exact: true, element: <EquipmentDetail /> },
            { path: '/home/retoma-payments-table', exact: true, element: <RetomaPaymentsTable /> },
          ],
        })
      : JSON.parse(localStorage.getItem('user')).role === 'aux_admin'
      ? ThemeRoutes.push({
          path: '/home',
          exact: true,
          element: <FullLayout />,
          children: [
            { path: '/home', exact: true, element: <Home /> },
            {
              path: '/home/dashboards/dashboard1',
              name: 'Dashboard Celuparts',
              exact: true,
              element: <DashboardCeluparts />,
            },
            { path: '/home/users-table', exact: true, element: <UsersTable /> },
            { path: '/home/repair-requests-table', exact: true, element: <RepairRequestsTable /> },
            { path: '/home/retoma-requests-table', exact: true, element: <RetomaRequestsTable /> },
            { path: '/home/equipments-table', exact: true, element: <EquipmentsTable /> },
            { path: '/home/request-status-table', exact: true, element: <RequestStatusTable /> },
            { path: '/home/technicians-table', exact: true, element: <TechniciansTable /> },
            { path: '/home/repair-table', exact: true, element: <RepairTable /> },
            { path: '/home/update-repair-form', exact: true, element: <UpdateRepairForm /> },
            { path: '/home/request-status-form', exact: true, element: <RequestStatusForm /> },
            { path: '/home/update-state-repair', exact: true, element: <UpdateStateRepair /> },
            { path: '/home/update-state-retoma', exact: true, element: <UpdateStateRetoma /> },
            { path: '/home/request-status-form/:id', exact: true, element: <RequestStatusForm /> },
            { path: '/home/update-repair-form/:id', exact: true, element: <UpdateRepairForm /> },
            { path: '/home/update-retoma-form/:id', exact: true, element: <UpdateRetomaForm /> },
            { path: '/home/repair-payment-form/:id', exact: true, element: <RepairPaymentForm /> },
            { path: '/home/retoma-payment-form/:id', exact: true, element: <RetomaPaymentForm /> },
            { path: '/home/admin-alerts', exact: true, element: <AdminAlerts /> },
            { path: '/home/equipment-detail/:id', exact: true, element: <EquipmentDetail /> },
            { path: '/home/retoma-payments-table', exact: true, element: <RetomaPaymentsTable /> },
          ],
        })
      : JSON.parse(localStorage.getItem('user')).role === 'tecnico'
      ? ThemeRoutes.push({
          path: '/home',
          exact: true,
          element: <FullLayout />,
          children: [
            { path: '/home', exact: true, element: <Home /> },
            {
              path: '/home/dashboards/dashboard1',
              name: 'Dashboard Celuparts',
              exact: true,
              element: <DashboardCeluparts />,
            },
            { path: '/home/repair-requests-table', exact: true, element: <RepairRequestsTable /> },
            { path: '/home/retoma-requests-table', exact: true, element: <RetomaRequestsTable /> },
            { path: '/home/repair-table', exact: true, element: <RepairTable /> },
            { path: '/home/update-repair-form', exact: true, element: <UpdateRepairForm /> },
            { path: '/home/update-state-repair', exact: true, element: <UpdateStateRepair /> },
            { path: '/home/update-state-retoma', exact: true, element: <UpdateStateRetoma /> },
            { path: '/home/update-retoma-form/:id', exact: true, element: <UpdateRetomaForm /> },
            { path: '/home/request-status-form/:id', exact: true, element: <RequestStatusForm /> },
            { path: '/home/update-repair-form/:id', exact: true, element: <UpdateRepairForm /> },
            { path: '/home/technician-alerts', exact: true, element: <TechnicianAlerts /> },
          ],
        })
      : JSON.parse(localStorage.getItem('user')).role === 'mensajero'
      ? ThemeRoutes.push({
          path: '/home',
          exact: true,
          element: <FullLayout />,
          children: [
            { path: '/home', exact: true, element: <Home /> },
            {
              path: '/home/dashboards/dashboard1',
              name: 'Dashboard Celuparts',
              exact: true,
              element: <DashboardCeluparts />,
            },
            { path: '/home/repair-requests-table', exact: true, element: <RepairRequestsTable /> },
            { path: '/home/retoma-requests-table', exact: true, element: <RetomaRequestsTable /> },
            { path: '/home/repair-table', exact: true, element: <RepairTable /> },
            { path: '/home/update-repair-form', exact: true, element: <UpdateRepairForm /> },
            { path: '/home/update-state-repair', exact: true, element: <UpdateStateRepair /> },
            { path: '/home/update-state-retoma', exact: true, element: <UpdateStateRepair /> },
            { path: '/home/request-status-form/:id', exact: true, element: <RequestStatusForm /> },
            { path: '/home/courier-alerts', exact: true, element: <CourierAlerts /> },
            { path: '/home/all-requests-table', exact: true, element: <AllRequestsTable /> },
          ],
        })
      : ThemeRoutes.push();
  }

  // const ThemeRoutes = [
  //   {
  //     path: '/home',
  //     element: <FullLayout />,
  //     children: [
  //       { path: '/home', name: 'Home', element: <Navigate to="/dashboards/dashboard1" /> },
  //       { path: '/home/login', name: 'login', exact: true, element: <SignIn /> },
  //       { path: '/home/equipment/detail', name: 'detail', exact: true, element: <EquipmentDetail /> },
  //       { path: '/home/dashboards/dashboard1', name: 'Dashboard 1', exact: true, element: <Dashboard1 /> },
  //       { path: '/home/dashboards/dashboard2', name: 'Dashboard 2', exact: true, element: <Dashboard2 /> },
  //       { path: '/home/dashboards/dashboard3', name: 'Dashboard 3', exact: true, element: <Dashboard3 /> },
  //       { path: '/home/dashboards/dashboard4', name: 'Dashboard 4', exact: true, element: <Dashboard4 /> },
  //       { path: '/home/about', name: 'about', exact: true, element: <About /> },
  //       { path: '/home/domicilio/notificaciones', name: 'notes', exact: true, element: <CourierAlerts /> },
  //       { path: '/home/apps/notes', name: 'notes', exact: true, element: <Notes /> },
  //       { path: '/home/apps/chat', name: 'chat', exact: true, element: <Chat /> },
  //       { path: '/home/apps/contacts', name: 'contacts', exact: true, element: <Contacts /> },
  //       { path: '/home/apps/calendar', name: 'calendar', exact: true, element: <Calendar /> },
  //       { path: '/home/apps/email', name: 'email', exact: true, element: <Email /> },
  //       { path: '/home/ecom/shop', name: 'email', exact: true, element: <Shop /> },
  //       { path: '/home/ecom/shopdetail', name: 'email', exact: true, element: <ShopDetail /> },
  //       { path: '/home/tickt/ticket-list', name: 'ticket list', exact: true, element: <TicketList /> },
  //       {
  //         path: '/home/tickt/ticket-detail',
  //         name: 'ticket detail',
  //         exact: true,
  //         element: <TicketDetail />,
  //       },
  //       { path: '/home/apps/treeview', name: 'email', exact: true, element: <Treeview /> },
  //       { path: '/home/ui/alerts', name: 'alerts', exact: true, element: <Alerts /> },
  //       { path: '/home/ui/badges', name: 'badges', exact: true, element: <Badges /> },
  //       { path: '/home/ui/buttons', name: 'buttons', exact: true, element: <Buttons /> },
  //       { path: '/home/ui/cards', name: 'cards', exact: true, element: <Cards /> },
  //       { path: '/home/ui/grid', name: 'grid', exact: true, element: <Grid /> },
  //       { path: '/home/ui/table', name: 'table', exact: true, element: <Tables /> },
  //       { path: '/home/ui/forms', name: 'forms', exact: true, element: <Forms /> },
  //       { path: '/home/ui/breadcrumbs', name: 'breadcrumbs', exact: true, element: <Breadcrumbs /> },
  //       { path: '/home/ui/dropdown', name: 'dropdown', exact: true, element: <Dropdowns /> },
  //       { path: '/home/ui/button-group', name: 'button group', exact: true, element: <BtnGroup /> },
  //       { path: '/home/ui/collapse', name: 'collapse', exact: true, element: <Collapse /> },
  //       { path: '/home/ui/list-group', name: 'list-group', exact: true, element: <ListGroup /> },
  //       { path: '/home/ui/modal', name: 'modal', exact: true, element: <Modal /> },
  //       { path: '/home/ui/navbar', name: 'navbar', exact: true, element: <Navbar /> },
  //       { path: '/home/ui/nav', name: 'nav', exact: true, element: <Nav /> },
  //       { path: '/home/ui/pagination', name: 'pagination', exact: true, element: <Pagination /> },
  //       { path: '/home/ui/popover', name: 'popover', exact: true, element: <Popover /> },
  //       { path: '/home/ui/progress', name: 'progress', exact: true, element: <Progress /> },
  //       { path: '/home/ui/spinner', name: 'spinner', exact: true, element: <Spinner /> },
  //       { path: '/home/ui/tabs', name: 'tabs', exact: true, element: <Tabs /> },
  //       { path: '/home/ui/toasts', name: 'toasts', exact: true, element: <Toasts /> },
  //       { path: '/home/ui/tooltip', name: 'tooltip', exact: true, element: <Tooltip /> },
  //       { path: '/home/form-layout/form-basic', name: 'form-basic', exact: true, element: <FormBasic /> },
  //       { path: '/home/form-layout/form-grid', name: 'form-grid', exact: true, element: <FormGrid /> },
  //       { path: '/home/form-layout/form-group', name: 'form-group', exact: true, element: <FormGroup /> },
  //       { path: '/home/form-layout/form-input', name: 'form-input', exact: true, element: <FormInput /> },
  //       {
  //         path: '/home/form-pickers/datepicker',
  //         name: 'datepicker',
  //         exact: true,
  //         element: <Datepicker />,
  //       },
  //       { path: '/home/form-pickers/tag-select', name: 'tag-select', exact: true, element: <TagSelect /> },
  //       { path: '/home/form-validation', name: 'form-validation', exact: true, element: <FormValidate /> },
  //       { path: '/home/form-steps', name: 'form-steps', exact: true, element: <FormSteps /> },
  //       { path: '/home/form-editor', name: 'form-editor', exact: true, element: <FormEditor /> },
  //       { path: '/home/tables/basic-table', name: 'basic-table', exact: true, element: <Basictable /> },
  //       {
  //         path: '/home/tables/react-table',
  //         name: 'react-table',
  //         exact: true,
  //         element: <CustomReactTable />,
  //       },
  //       {
  //         path: '/home/tables/data-table',
  //         name: 'data-table',
  //         exact: true,
  //         element: <ReactBootstrapTable />,
  //       },
  //       { path: '/home/charts/apex', name: 'apex', exact: true, element: <ApexCharts /> },
  //       { path: '/home/charts/chartjs', name: 'chartjs', exact: true, element: <ChartJs /> },
  //       { path: '/home/sample-pages/profile', name: 'profile', exact: true, element: <Profile /> },
  //       {
  //         path: '/home/sample-pages/helper-class',
  //         name: 'helper-class',
  //         exact: true,
  //         element: <HelperClass />,
  //       },
  //       {
  //         path: '/home/sample-pages/starterkit',
  //         name: 'starterkit',
  //         exact: true,
  //         element: <StarterKit />,
  //       },
  //       { path: '/home/sample-pages/gallery', name: 'gallery', exact: true, element: <Gallery /> },
  //       {
  //         path: '/home/sample-pages/search-result',
  //         name: 'search-result',
  //         exact: true,
  //         element: <SearchResult />,
  //       },
  //       { path: '/home/icons/bootstrap', name: 'bootstrap', exact: true, element: <Bootstrap /> },
  //       { path: '/home/icons/feather', name: 'feather', exact: true, element: <Feather /> },
  //       { path: '/home/map/vector', name: 'vector', exact: true, element: <CustomVectorMap /> },
  //       { path: '/home/widget', name: 'widget', exact: true, element: <Widget /> },
  //       { path: '/home/casl', name: 'casl', exact: true, element: <CASL /> },
  //       { path: '*', element: <Navigate to="/auth/404" /> },
  //     ],
  //   },
  //   {
  //     path: '/',
  //     element: <BlankLayout />,
  //     children: [
  //       { path: '', element: <LoginFormik /> },
  //       { path: '404', element: <Error /> },
  //       { path: '*', element: <Navigate to="/404" /> },
  //       { path: 'registerformik', element: <RegisterFormik /> },
  //       { path: 'maintanance', element: <Maintanance /> },
  //       { path: 'lockscreen', element: <LockScreen /> },
  //       { path: 'recoverpwd', element: <RecoverPassword /> },
  //     ],
  //   },
  // ];

  // export default ThemeRoutes;
  return { ThemeRoutes };
}
