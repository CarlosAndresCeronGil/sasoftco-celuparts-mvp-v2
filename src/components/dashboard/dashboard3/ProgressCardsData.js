import React from 'react';
import PropTypes from 'prop-types';

import { Col, Card, CardBody, CardTitle, Progress } from 'reactstrap';

const ProgressCardsData = ({ subtext, pColor, pPercent }) => {
  return (
    <>
      <Col lg={3} md={6}>
        <Card>
          <CardBody>
            <CardTitle tag="h3" className="mb-0">
              {pPercent}%
            </CardTitle>
            <span className="text-muted fw-light fs-6">{subtext}</span>
            <Progress className="mt-2" color={pColor} value={pPercent} />
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

ProgressCardsData.propTypes = {
  subtext: PropTypes.string,
  pPercent: PropTypes.string,
  pColor: PropTypes.oneOf(['primary', 'info', 'success', 'danger', 'default']),
};

export default ProgressCardsData;
