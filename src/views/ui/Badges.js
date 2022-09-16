import { Badge, Button, Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

const Badges = () => {
  return (
    <div>
      <BreadCrumbs />
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <Col xs="12" md="12" sm="12">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Badges">
            <h1>
              Heading <Badge color="secondary">New</Badge>
            </h1>
            <h2>
              Heading <Badge color="secondary">New</Badge>
            </h2>
            <h3>
              Heading <Badge color="secondary">New</Badge>
            </h3>
            <h4>
              Heading <Badge color="secondary">New</Badge>
            </h4>
            <h5>
              Heading <Badge color="secondary">New</Badge>
            </h5>
            <h6>
              Heading <Badge color="secondary">New</Badge>
            </h6>
          </ComponentCard>
        </Col>
        <Col xs="12" md="12" sm="12">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-2*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Badges with Button">
            <Button color="primary" outline>
              Notifications <Badge color="secondary">1</Badge>
            </Button>
            <Button color="secondary" className="ms-3" outline>
              Notifications <Badge color="secondary">2</Badge>
            </Button>
            <Button color="info" className="ms-3" outline>
              Notifications <Badge color="secondary">3</Badge>
            </Button>
            <Button color="warning" className="ms-3" outline>
              Notifications <Badge color="secondary">4</Badge>
            </Button>
            <Button color="danger" className="ms-3" outline>
              Notifications <Badge color="secondary">5</Badge>
            </Button>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Badges with Contextual variations">
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary" className="ms-3">
              Secondary
            </Badge>
            <Badge color="success" className="ms-3">
              Success
            </Badge>
            <Badge color="danger" className="ms-3">
              Danger
            </Badge>
            <Badge color="warning" className="ms-3">
              Warning
            </Badge>
            <Badge color="info" className="ms-3">
              Info
            </Badge>
            <Badge color="light" className="ms-3">
              Light
            </Badge>
            <Badge color="dark" className="ms-3">
              Dark
            </Badge>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-4*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Badges with Pills">
            <Badge color="primary" pill>
              Primary
            </Badge>
            <Badge color="secondary" className="ms-3" pill>
              Secondary
            </Badge>
            <Badge color="success" className="ms-3" pill>
              Success
            </Badge>
            <Badge color="danger" className="ms-3" pill>
              Danger
            </Badge>
            <Badge color="warning" className="ms-3" pill>
              Warning
            </Badge>
            <Badge color="info" className="ms-3" pill>
              Info
            </Badge>
            <Badge color="light" className="ms-3" pill>
              Light
            </Badge>
            <Badge color="dark" className="ms-3" pill>
              Dark
            </Badge>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-5*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Badges with Links">
            <Badge href="" color="primary">
              Primary
            </Badge>
            <Badge href="" color="secondary" className="ms-3">
              Secondary
            </Badge>
            <Badge href="" color="success" className="ms-3">
              Success
            </Badge>
            <Badge href="" color="danger" className="ms-3">
              Danger
            </Badge>
            <Badge href="" color="warning" className="ms-3">
              Warning
            </Badge>
            <Badge href="" color="info" className="ms-3">
              Info
            </Badge>
            <Badge href="" color="light" className="ms-3">
              Light
            </Badge>
            <Badge href="" color="dark" className="ms-3">
              Dark
            </Badge>
          </ComponentCard>
        </Col>
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default Badges;
