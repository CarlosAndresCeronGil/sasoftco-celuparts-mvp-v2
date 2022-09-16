import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';

const DashCard = ({ children, title, subtitle, actions }) => {
  return (
    <Card>
      <CardBody>
        <div className="d-md-flex">
          <div>
            <CardTitle tag="h4">{title}</CardTitle>
            <CardSubtitle className="text-muted">{subtitle}</CardSubtitle>
          </div>
          <div className="ms-auto mt-3 mt-md-0">{actions}</div>
        </div>
        <div className="mt-3">{children}</div>
      </CardBody>
    </Card>
  );
};

DashCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.node,
};

export default DashCard;
