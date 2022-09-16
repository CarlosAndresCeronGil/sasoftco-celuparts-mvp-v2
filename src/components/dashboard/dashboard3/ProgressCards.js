import React from 'react';
import { Row } from 'reactstrap';

import ProgressCardsData from './ProgressCardsData';

const ProgressCards = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Reviews                                                 */
    /*--------------------------------------------------------------------------------*/
    <Row>
      <ProgressCardsData
        title= "Daily Sales"
        pColor="success"
        subtext="Total Product"
        pPercent="80"
      />
      <ProgressCardsData
        title= "Weekly Sales"
        pColor="primary"
        subtext="Pending Product"
        pPercent="30"
      />
      <ProgressCardsData
        title= "Monthly Sales"
        pColor="info"
        subtext="Completed Product"
        pPercent="60"
      />
      <ProgressCardsData
        title= "Yearly Sales"
        pColor="danger"
        subtext="Overall Product"
        pPercent="80"
      />
    </Row>
  );
};

export default ProgressCards;
