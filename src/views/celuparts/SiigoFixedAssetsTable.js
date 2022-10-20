/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table, Alert } from "reactstrap";
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getSiigoFixedAssets from '../../services/getSiigoFixedAssets'

export default function SiigoFixedAssetsTable() {
    const [siigoFixedAssets, setSiigoFixedAssets] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoFixedAssets()
            .then(response => {
                // console.log(response)
                setSiigoFixedAssets(response)
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
                <BreadCrumbsCeluparts />
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de activos fijos registrados en el sistema SIIGO</CardTitle>
                        
                        <hr />

                        {
                            siigoFixedAssets.length == 0 ? (
                                <Alert color='danger'>
                                    <p>No hay resultados para esta búsqueda.</p>
                                </Alert>
                            ) : (

                                <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                                    <thead>
                                        <tr>
                                            <th>Identification</th>
                                            <th>Nombre</th>
                                            <th>Grupo</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siigoFixedAssets.map((tdata, index) => (
                                            <tr key={index} className="border-top">
                                                <td>{tdata.id}</td>
                                                <td>{tdata.name}</td>
                                                <td>{tdata.group}</td>
                                                <td>{tdata.active?<div>Activo</div>:<div>Inactivo</div>}</td>
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
