import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Badge,
  Row,
  Col,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

const ListComponent = () => {
  return (
    <div>
      <BreadCrumbs />
      {/* --------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <Col xs="12" md="6">
          <ComponentCard title="ListGroup">
            <ListGroup>
              <ListGroupItem>Cras justo odio</ListGroupItem>
              <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              <ListGroupItem>Morbi leo risus</ListGroupItem>
              <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
              <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          <ComponentCard title="Tags">
            <ListGroup>
              <ListGroupItem className="justify-content-between">
                Cras justo odio <Badge pill>14</Badge>
              </ListGroupItem>
              <ListGroupItem className="justify-content-between">
                Dapibus ac facilisis in <Badge pill>2</Badge>
              </ListGroupItem>
              <ListGroupItem className="justify-content-between">
                Morbi leo risus <Badge pill>1</Badge>
              </ListGroupItem>
              <ListGroupItem className="justify-content-between">
                Morbi leo risus <Badge pill>12</Badge>
              </ListGroupItem>
              <ListGroupItem className="justify-content-between">
                Morbi leo risus <Badge pill>10</Badge>
              </ListGroupItem>
            </ListGroup>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          <ComponentCard title="Disabled items">
            <ListGroup>
              <ListGroupItem disabled tag="a" href="#">
                Cras justo odio
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Dapibus ac facilisis in
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Morbi leo risus
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Porta ac consectetur ac
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Vestibulum at eros
              </ListGroupItem>
            </ListGroup>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          <ComponentCard title="Anchors">
            <ListGroup>
              <ListGroupItem active tag="a" href="" action>
                Cras justo odio
              </ListGroupItem>
              <ListGroupItem tag="a" href="" action>
                Dapibus ac facilisis in
              </ListGroupItem>
              <ListGroupItem tag="a" href="" action>
                Morbi leo risus
              </ListGroupItem>
              <ListGroupItem tag="a" href="" action>
                Porta ac consectetur ac
              </ListGroupItem>
              <ListGroupItem disabled tag="a" href="" action>
                Vestibulum at eros
              </ListGroupItem>
            </ListGroup>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          <ComponentCard title="Buttons">
            <ListGroup>
              <ListGroupItem active tag="button" action>
                Cras justo odio
              </ListGroupItem>
              <ListGroupItem tag="button" action>
                Dapibus ac facilisis in
              </ListGroupItem>
              <ListGroupItem tag="button" action>
                Morbi leo risus
              </ListGroupItem>
              <ListGroupItem tag="button" action>
                Porta ac consectetur ac
              </ListGroupItem>
              <ListGroupItem disabled tag="button" action>
                Vestibulum at eros
              </ListGroupItem>
            </ListGroup>
          </ComponentCard>
        </Col>
        <Col xs="12" md="6">
          <ComponentCard title="Contextual classes">
            <ListGroup>
              <ListGroupItem color="success">Cras justo odio</ListGroupItem>
              <ListGroupItem color="info">Dapibus ac facilisis in</ListGroupItem>
              <ListGroupItem color="warning">Morbi leo risus</ListGroupItem>
              <ListGroupItem color="danger">Porta ac consectetur ac</ListGroupItem>
              <ListGroupItem color="secondary">Porta ac consectetur ac</ListGroupItem>
            </ListGroup>
          </ComponentCard>
        </Col>
        <Col xs="12" md="12">
          <ComponentCard title="Contextual classes">
            <ListGroup>
              <ListGroupItem active>
                <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                <ListGroupItemText>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus
                  varius blandit.
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                <ListGroupItemText>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus
                  varius blandit.
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
                <ListGroupItemText>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus
                  varius blandit.
                </ListGroupItemText>
              </ListGroupItem>
            </ListGroup>
          </ComponentCard>
        </Col>
        <Col xs="12" md="12">
          <ComponentCard title="Flush">
            <ListGroup flush>
              <ListGroupItem disabled tag="a" href="#">
                Cras justo odio
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Dapibus ac facilisis in
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Morbi leo risus
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Porta ac consectetur ac
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Vestibulum at eros
              </ListGroupItem>
            </ListGroup>
          </ComponentCard>
        </Col>
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}

      {/* --------------------------------------------------------------------------------*/}
      {/* End Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default ListComponent;
