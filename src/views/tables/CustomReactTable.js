import React, { useState } from 'react';
import ReactTable from 'react-table-v6';
import treeTableHOC from 'react-table-v6/lib/hoc/treeTable';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import 'react-table-v6/react-table.css';
import * as data from './ReacTableData';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

const TreeTable = treeTableHOC(ReactTable);

const CustomReactTable = () => {
  const [modal, setModal] = useState(false);
  const [obj, setObj] = useState({});
  const [jsonData, setJsonData] = useState(data.dataTable);
  const data3 = data.makeData();
  const { treedata } = data;

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = event.target.id.value;
    const name = event.target.name.value;
    const designation = event.target.designation.value;
    const location = event.target.location.value;
    const age = event.target.age.value;
    const newObj = JSON.parse(JSON.stringify(jsonData));
    newObj[id] = [name, designation, location, age];
    setJsonData(newObj);
    setModal(!modal);
  };

  const data2 = jsonData.map((prop, key) => {
    return {
      id: key,
      name: prop[0],
      designation: prop[1],
      location: prop[2],
      age: prop[3],
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              const sobj = data2.find((o) => o.id === key);
              setModal(!modal);
              setObj(sobj);
            }}
            color="inverse"
            size="sm"
            round="true"
            icon="true"
          >
            <i className="fa fa-edit" />
          </Button>
          {/* use this button to remove the data row */}
          {/* <Button
							onClick={() => {
								let newdata = data2;
								newdata.find((o, i) => {
									if (o.id === key) {
										newdata.splice(i, 1);
										console.log(newdata);
										return true;
									}
									return false;
								});
								this.setState({ jsonData: newdata });
							}}
							className="ml-1"
							color="danger"
							size="sm"
							round="true"
							icon="true"
						>
							<i className="fa fa-times" />
						</Button> */}
        </div>
      ),
    };
  });
  return (
    <div>
      <BreadCrumbs />
      <Modal isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}>Modal title</ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={obj.id} />
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" defaultValue={obj.name} />
            </FormGroup>
            <FormGroup>
              <Label for="designation">Designation</Label>
              <Input
                type="text"
                name="designation"
                id="designation"
                defaultValue={obj.designation}
              />
            </FormGroup>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input type="text" name="location" id="location" defaultValue={obj.location} />
            </FormGroup>
            <FormGroup>
              <Label for="age">Age</Label>
              <Input type="text" name="age" id="age" defaultValue={obj.age} />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>
              <Button color="secondary" className="ml-1" onClick={toggle.bind(null)}>
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      <ComponentCard title="Basic Table">
        <ReactTable
          data={data3}
          columns={[
            {
              Header: 'Name',
              columns: [
                {
                  Header: 'First Name',
                  accessor: 'firstName',
                },
                {
                  Header: 'Last Name',
                  id: 'lastName',
                  accessor: (d) => d.lastName,
                },
              ],
            },
            {
              Header: 'Info',
              columns: [
                {
                  Header: 'Age',
                  accessor: 'age',
                },
                {
                  Header: 'Status',
                  accessor: 'status',
                },
              ],
            },
            {
              Header: 'Stats',
              columns: [
                {
                  Header: 'Visits',
                  accessor: 'visits',
                },
              ],
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </ComponentCard>
      {/*--------------------------------------------------------------------------------*/}
      {/*End Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Action table*/}
      {/*--------------------------------------------------------------------------------*/}
      <ComponentCard title="Action Table">
        <ReactTable
          columns={[
            {
              Header: 'FirstName',
              accessor: 'name',
            },
            {
              Header: 'Designation',
              accessor: 'designation',
            },
            {
              Header: 'Location',
              accessor: 'location',
            },
            {
              Header: 'Age',
              accessor: 'age',
            },
            {
              Header: 'Actions',
              accessor: 'actions',
              sortable: false,
              filterable: false,
            },
          ]}
          defaultPageSize={10}
          showPaginationBottom
          className="-striped -highlight"
          data={data2}
          filterable
        />
      </ComponentCard>
      {/*--------------------------------------------------------------------------------*/}
      {/* End Action table*/}
      {/*--------------------------------------------------------------------------------*/}
      {/*--------------------------------------------------------------------------------*/}
      {/* Tree table*/}
      {/*--------------------------------------------------------------------------------*/}
      <ComponentCard title="Tree Table">
        <TreeTable
          filterable
          defaultFilterMethod={(filter, row) => {
            const id = filter.pivotId || filter.id;
            return row[id] !== undefined
              ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase())
              : true;
          }}
          data={treedata}
          pivotBy={['state', 'post', 'city']}
          columns={[
            // we only require the accessor so TreeTable
            // can handle the pivot automatically
            {
              accessor: 'state',
            },
            {
              accessor: 'post',
            },
            {
              accessor: 'city',
            },

            // any other columns we want to display
            {
              Header: 'First Name',
              accessor: 'first_name',
            },
            {
              Header: 'Last Name',
              accessor: 'last_name',
            },
            {
              Header: 'Company Name',
              accessor: 'company_name',
            },
            {
              Header: 'Address',
              accessor: 'address',
            },
            {
              Header: 'Phone 1',
              accessor: 'phone1',
            },
            {
              Header: 'Email',
              accessor: 'email',
            },
          ]}
          defaultPageSize={5}
          SubComponent={(row) => {
            // a SubComponent just for the final detail
            const columns = [
              {
                Header: 'Property',
                accessor: 'property',
                width: 200,
                Cell: (ci) => {
                  return `${ci.value}:`;
                },
                style: {
                  backgroundColor: '#DDD',
                  textAlign: 'right',
                  fontWeight: 'bold',
                },
              },
              { Header: 'Value', accessor: 'value' },
            ];
            const rowData = Object.keys(row.original).map((key) => {
              return {
                property: key,
                value: row.original[key].toString(),
              };
            });
            return (
              <div style={{ padding: '10px' }}>
                <ReactTable
                  data={rowData}
                  columns={columns}
                  pageSize={rowData.length}
                  showPagination={false}
                />
              </div>
            );
          }}
        />
      </ComponentCard>
      {/*--------------------------------------------------------------------------------*/}
      {/* End Tree table*/}
      {/*--------------------------------------------------------------------------------*/}
      {/*--------------------------------------------------------------------------------*/}
      {/* Fixed header-footer table*/}
      {/*--------------------------------------------------------------------------------*/}
      <ComponentCard title="Fixed Table">
        <ReactTable
          data={data3}
          columns={[
            {
              Header: 'Name',
              columns: [
                {
                  Header: 'First Name',
                  accessor: 'firstName',
                },
                {
                  Header: 'Last Name',
                  id: 'lastName',
                  accessor: (d) => d.lastName,
                },
              ],
            },
            {
              Header: 'Info',
              columns: [
                {
                  Header: 'Age',
                  accessor: 'age',
                },
              ],
            },
          ]}
          defaultPageSize={20}
          style={{
            height: '400px', // This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight"
        />
      </ComponentCard>
      {/*--------------------------------------------------------------------------------*/}
      {/* End fixed header-footer table*/}
      {/*--------------------------------------------------------------------------------*/}
    </div>
  );
};

export default CustomReactTable;
