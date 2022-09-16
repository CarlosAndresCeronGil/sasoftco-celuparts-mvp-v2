import React from 'react';

// Datetime picker plugin file
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { Row, Col, FormGroup } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

//var moment = require('moment');
require('moment/locale/fr');
require('moment/locale/de');
require('moment/locale/en-gb');

//var date = new Date();

const yesterday = Datetime.moment().subtract(1, 'day');
const valid = (current) => {
  return current.isAfter(yesterday);
};

const DatePicker = () => {
  return (
    <div>
      <BreadCrumbs />
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      <Row>
        <Col md="6">
          <ComponentCard title="Datetime Picker">
            <FormGroup>
              <Datetime locale="en-gb" inputProps={{ placeholder: 'Datetime Picker Here' }} />
            </FormGroup>
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="Date Picker">
            <FormGroup>
              <Datetime
                locale="en-gb"
                timeFormat={false}
                inputProps={{ placeholder: 'Date Picker Here' }}
              />
            </FormGroup>
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="Time Picker">
            <FormGroup>
              <Datetime
                locale="en-gb"
                dateFormat={false}
                inputProps={{ placeholder: 'Time Picker Here' }}
              />
            </FormGroup>
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="Franch Datetime">
            <FormGroup>
              <Datetime
                locale="fr-ca"
                inputProps={{ placeholder: 'Franch Datetime Picker Here' }}
              />
            </FormGroup>
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="German Datetime">
            <FormGroup>
              <Datetime locale="de" inputProps={{ placeholder: 'German Datetime Picker Here' }} />
            </FormGroup>
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="Validation With Dates">
            <FormGroup>
              <Datetime
                locale="en-gb"
                isValidDate={valid}
                inputProps={{
                  placeholder: 'Before Today Disabled Dates Here',
                }}
              />
            </FormGroup>
          </ComponentCard>
        </Col>
        <Col md="6">
          <ComponentCard title="Month-Year Picker">
            <FormGroup>
              <Datetime
                locale="en-gb"
                dateFormat="YYYY-MM"
                timeFormat={false}
                inputProps={{ placeholder: 'Month-Year Picker Here' }}
              />
            </FormGroup>
          </ComponentCard>
        </Col>
      </Row>
      {/*--------------------------------------------------------------------------------*/}
      {/*End Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
    </div>
  );
};

export default DatePicker;
