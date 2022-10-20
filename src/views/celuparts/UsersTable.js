/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getUsers from '../../services/getUsers';
import getUsersSimpleInfo from '../../services/getUsersSimpleInfo';

export default function UsersTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(function () {
        setLoading(true)
        // getUsers()
        //     .then((response) => {
        //         setUsers(response);
        //     })
        getUsersSimpleInfo()
            .then(response => {
                setLoading(false)
                setUsers(response)
            })
            .catch(error => {
                setLoading(false)
                console.log(error)
            })
    }, [setUsers])

    // console.log(JSON.parse(localStorage.getItem('user')).role);

    return (
        loading ? <div>Cargando...</div> :
        <div>
            <BreadCrumbsCeluparts />
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de usuarios registrados en el sistema</CardTitle>
                    {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Overview of the projects
                    </CardSubtitle> */}

                    <hr/>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Numero identificacion</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Telefono Alternativo</th>
                                <th>Estado de la cuenta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {tableData.map((tdata, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <div className="d-flex align-items-center p-1">
                                            <div className="ms-0">
                                                <span className="text-muted">{tdata.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{tdata.idNumber}</td>
                                    <td>{tdata.name}</td>
                                    <td>{tdata.email}</td>
                                    <td>{tdata.phone}</td>
                                    <td>{tdata.AlternativePhone}</td>
                                    <td>
                                        {tdata.AccountStatus === "Cerrada" ? (
                                            <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                                        ) : tdata.AccountStatus === "Inhabilitada" ? (
                                            <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                                        ) : (
                                            <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                                        )}
                                    </td>
                                </tr>
                            ))} */}
                            {users.map((tdata, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <div className="d-flex align-items-center p-1">
                                            <div className="ms-0">
                                                <span className="text-muted">{tdata.idUser}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{tdata.idNumber}</td>
                                    <td>{tdata.names} {tdata.surnames}</td>
                                    <td>{tdata.email}</td>
                                    <td>{tdata.phone}</td>
                                    <td>{tdata.alternativePhone}</td>
                                    <td>
                                        {tdata.accountStatus === "Cerrada" ? (
                                            <div className='d-flex align-items-center'>
                                                <span className="p-2 bg-danger rounded-circle d-inline-block ms-3">{tdata.AccountStatus}</span>
                                                <span className="d-inline-block ms-3">{tdata.accountStatus}</span>
                                            </div>
                                        ) : tdata.accountStatus === "Inhabilitada" ? (
                                            <div className='d-flex align-items-center'>
                                                <span className="p-2 bg-warning rounded-circle d-inline-block ms-3">{tdata.AccountStatus}</span>
                                                <span className="d-inline-block ms-3">{tdata.accountStatus}</span>
                                            </div>
                                        ) : (
                                            <div className='d-flex align-items-center'>
                                                <span className="p-2 bg-success rounded-circle d-inline-block ms-3">{tdata.AccountStatus}</span>
                                                <span className="d-inline-block ms-3">{tdata.accountStatus}</span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
