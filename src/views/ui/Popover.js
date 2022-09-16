/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody, Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

const PopoverItem = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <span>
      <Button
        className="me-1"
        color="outline-primary"
        id={`Popover-${props.id}`}
        onClick={toggle.bind(null)}
      >
        {props.item.text}
      </Button>
      <Popover
        placement={props.item.placement}
        isOpen={popoverOpen}
        target={`Popover-${props.id}`}
        toggle={toggle.bind(null)}
      >
        <PopoverHeader>Popover Title</PopoverHeader>
        <PopoverBody>
          Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem
          lacinia quam venenatis vestibulum.
        </PopoverBody>
      </Popover>
    </span>
  );
};

const PopoverComponent = () => {
  const popovers = [
    {
      placement: 'top',
      text: 'Top',
    },
    {
      placement: 'bottom',
      text: 'Bottom',
    },
    {
      placement: 'left',
      text: 'Left',
    },
    {
      placement: 'right',
      text: 'Right',
    },
  ];

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col xs="12" md="12">
          <ComponentCard title="Popovers">
            {popovers.map((popover, i) => (
              <PopoverItem key={popover.placement} item={popover} id={i} />
            ))}
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default PopoverComponent;
