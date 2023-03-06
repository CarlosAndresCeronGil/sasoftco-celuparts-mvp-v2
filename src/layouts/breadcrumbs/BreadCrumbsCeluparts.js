import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BreadCrumbsCeluparts = ({ breadcrumbName = "" }) => {
  const location = useLocation();
  const firstUrl = location.pathname.split('/')[1];
  const secondUrl = location.pathname.split('/')[2];
  console.log(firstUrl, secondUrl);
  return (
    <>
      {/* <h4 className="text-capitalize">{secondUrl ? `${secondUrl}` : `${firstUrl}`}</h4> */}
      <Breadcrumb>
        <BreadcrumbItem to="/home/dashboards/dashboard1" tag={Link} className="text-decoration-none">
          Panel Principal
        </BreadcrumbItem>
        {/* {firstUrl ? <BreadcrumbItem active>{firstUrl}</BreadcrumbItem> : ''} */}
        {breadcrumbName ? <BreadcrumbItem active>{breadcrumbName}</BreadcrumbItem> : ''}
      </Breadcrumb>
    </>
  );
};

BreadCrumbsCeluparts.propTypes = {
  breadcrumbName: PropTypes.string.isRequired,
};

export default BreadCrumbsCeluparts;
