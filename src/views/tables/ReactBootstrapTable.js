import React from 'react';
import { Row, Col } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as data from './DataBootstrapTable';
import './ReactBootstrapTable.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

//This is for the Delete row
function onAfterDeleteRow(rowKeys) {
  // eslint-disable-next-line no-alert
  alert(`The rowkey you drop: ${rowKeys}`);
}
//This is for the insert new row
/*
function onAfterInsertRow(row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
}*/
//This is for the Search item
function afterSearch(searchText, result) {
  console.log(`Your search text is ${searchText}`);
  console.log('Result is:');
  for (let i = 0; i < result.length; i++) {
    console.log(`Fruit: ${result[i].id}, ${result[i].name}, ${result[i].price}`);
  }
}
const options = {
  //afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
  afterDeleteRow: onAfterDeleteRow, // A hook for after droping rows.
  afterSearch, // define a after search hook
};
const selectRowProp = {
  mode: 'checkbox',
};
const cellEditProp = {
  mode: 'click',
  blurToSave: true,
};

const Datatables = () => {
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <ComponentCard title="Bootstrap DataTable">
            <BootstrapTable
              striped
              hover
              condensed
              search
              data={data.JsonData}
              deleteRow
              selectRow={selectRowProp}
              pagination
              insertRow
              options={options}
              cellEdit={cellEditProp}
              tableHeaderClass="mb-0"
            >
              <TableHeaderColumn width="100" dataField="name" isKey>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="gender">
                Gender
              </TableHeaderColumn>
              <TableHeaderColumn width="100" dataField="company">
                Company
              </TableHeaderColumn>
            </BootstrapTable>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default Datatables;
