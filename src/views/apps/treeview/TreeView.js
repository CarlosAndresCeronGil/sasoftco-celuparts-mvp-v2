import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import TreeMenu from 'react-simple-tree-menu';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import './treeview.scss';

const Treeview = () => {
  const treeData = [
    {
      key: 'mammal',
      label: 'Mammal',
      nodes: [
        {
          key: 'canidae',
          label: 'Canidae',
          nodes: [
            {
              key: 'dog',
              label: 'Dog',
              nodes: [],
              url: 'https://www.google.com/search?q=dog',
            },
            {
              key: 'fox',
              label: 'Fox',
              nodes: [],
              url: 'https://www.google.com/search?q=fox',
            },
            {
              key: 'wolf',
              label: 'Wolf',
              nodes: [],
              url: 'https://www.google.com/search?q=wolf',
            },
          ],
          url: 'https://www.google.com/search?q=canidae',
        },
      ],
      url: 'https://www.google.com/search?q=mammal',
    },
    {
      key: 'reptile',
      label: 'Reptile',
      nodes: [
        {
          key: 'squamata',
          label: 'Squamata',
          nodes: [
            {
              key: 'lizard',
              label: 'Lizard',
              url: 'https://www.google.com/search?q=lizard',
            },
            {
              key: 'snake',
              label: 'Snake',
              url: 'https://www.google.com/search?q=snake',
            },
            {
              key: 'gekko',
              label: 'Gekko',
              url: 'https://www.google.com/search?q=gekko',
            },
          ],
          url: 'https://www.google.com/search?q=squamata',
        },
      ],
      url: 'https://www.google.com/search?q=reptile',
    },
  ];

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col>
          <Card>
            <CardBody>
              <TreeMenu data={treeData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Treeview;
