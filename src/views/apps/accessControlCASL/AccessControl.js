import React from 'react';
import { Row, Col, Button, ButtonGroup, ListGroup, ListGroupItem } from 'reactstrap';
import { defineAbility } from '@casl/ability';
import { Can } from '@casl/react';
import ComponentCard from '../../../components/ComponentCard';

const permissions = {
  CanEdit: {
    action: 'Can-edit',
    subject: 'address',
  },
  CanDelete: {
    action: 'Can-delete',
    subject: 'address',
  },
};

const users = {
  admin: {
    permissions: ['CanEdit', 'CanDelete'],
  },
  Manager: {
    permissions: ['CanEdit'],
  },
  SubscriberReadOnly: {
    permissions: [],
  },
};

const addresses = [
  {
    city: 'New York',
    street: '5684 Max Summit',
    type: 'address',
  },
  {
    city: 'Manhatten York',
    street: '5684 Max Summit',
    type: 'address',
  },
  {
    city: 'Canada street York',
    street: '5684 Max Summit',
    type: 'address',
  },
  {
    city: 'Delhi street',
    street: '5684 Max Summit',
    type: 'address',
  },
  {
    city: 'UP Chawk',
    street: '5684 Max Summit',
    type: 'address',
  },
];

const AccessControl = () => {
  const [userId, setUserId] = React.useState(Object.keys(users)[0]);
  const userPermissions = users[userId].permissions.map((id) => permissions[id]);

  const actions = [
    ...userPermissions.reduce((collection, { action }) => {
      collection.add(action);
      return collection;
    }, new Set()),
  ];

  const ability = defineAbility((can) => {
    userPermissions.forEach(({ action, subject }) => {
      can(action, subject);
    });
  });
  return (
    <Row>
      <Col lg="12">
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <ComponentCard title="Roll base Access">
          <ButtonGroup>
            {Object.entries(users).map(([id]) => (
              <Button
                key={id}
                outline={userId !== id}
                color="primary"
                onClick={() => setUserId(id)}
              >
                {id}
              </Button>
            ))}
          </ButtonGroup>
          <div className="p-3 bg-light mt-3">
            {users[userId].permissions.map((permission) => (
              <div key={permission}>{permission}</div>
            ))}
          </div>
          <ListGroup className="mt-4">
            {addresses.map(({ city, street, type }) => (
              <ListGroupItem key={city}>
                <div>
                  {city}, {street}
                  {actions.map((action) => (
                    <Can I={action} a={type} ability={ability}>
                      <Button className="mx-1" size="sm">
                        {action}
                      </Button>
                    </Can>
                  ))}
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default AccessControl;
