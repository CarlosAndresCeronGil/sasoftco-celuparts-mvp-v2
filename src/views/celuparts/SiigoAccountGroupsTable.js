/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Alert, Card, CardBody, CardTitle, Table } from "reactstrap";
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getSiigoAccountGroups from '../../services/getSiigoAccountGroups'

export default function SiigoAccountGroupsTable() {
    const [siigoAccountGroups, setSiigoAccountGroups] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(true)
        getSiigoAccountGroups()
            .then(response => {
                // console.log(response)
                setSiigoAccountGroups(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])


    return (
        loading ? <div> Cargando... </div> : (
            <div>
                <BreadCrumbsCeluparts breadcrumbName="Lista de grupos de inventario registrados en SIIGO" />
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de grupos de inventario registrados en el sistema SIIGO</CardTitle>

                        <hr />

                        {
                            siigoAccountGroups.length === 0 ? (
                                <Alert color='danger'>
                                    <p>No hay resultados para esta búsqueda.</p>
                                </Alert>
                            ) : (
                                <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                                    <thead>
                                        <tr>
                                            <th>Identification</th>
                                            <th>Nombre</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siigoAccountGroups.map((tdata, index) => (
                                            <tr key={index} className="border-top">
                                                <td>{tdata.id}</td>
                                                <td>{tdata.name}</td>
                                                <td>{tdata.active ? <div>activo</div> : <div>Inactivo</div>}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )
                        }
                    </CardBody>
                </Card>
            </div>
        )
    )
}
