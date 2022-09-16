import React from 'react';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import SimpleBar from 'simplebar-react';

import img1 from '../../../assets/images/browser/chrome-logo.svg';
import img2 from '../../../assets/images/browser/safari-logo.svg';
import img3 from '../../../assets/images/browser/firefox-logo.svg';
import img4 from '../../../assets/images/browser/uc-logo.svg';
import img5 from '../../../assets/images/browser/edge-logo.svg';

const browseData = [
  {
    title: 'Google Chrome',
    img: img1,
    earn: '90',
    bg: 'success',
    id: 1,
  },
  {
    title: 'Apple Safari',
    img: img2,
    earn: '60',
    bg: 'info',
    id: 2,
  },
  {
    title: 'Mozila Firefox',
    img: img3,
    earn: '35',
    bg: 'warning',
    id: 3,
  },
  {
    title: 'UC Browser',
    img: img4,
    earn: '40',
    bg: 'danger',
    id: 4,
  },
  {
    title: 'Edge Browser',
    img: img5,
    earn: '60',
    bg: 'danger',
    id: 5,
  },
  {
    title: 'Google Chrome',
    img: img1,
    earn: '90',
    bg: 'success',
    id: 6,
  },
  {
    title: 'Apple Safari',
    img: img2,
    earn: '60',
    bg: 'info',
    id: 7,
  },
];

const BrowseStats = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4">Browser Stats</CardTitle>
      </CardBody>
      <SimpleBar style={{ height: '425px' }}>
        <ListGroup flush>
          {browseData.map((bdata) => (
            <ListGroupItem
              key={bdata.id}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center py-3 border-0"
            >
              <img src={bdata.img} alt={bdata.img} className="rounded-circle" width="40" />
              <h5 className="ms-3 mb-0">{bdata.title}</h5>
              <div className="ms-auto">
                <span className={`badge fw-bold bg-light-${bdata.bg} text-${bdata.bg}`}>{bdata.earn}%</span>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </SimpleBar>
    </Card>
  );
};

export default BrowseStats;
