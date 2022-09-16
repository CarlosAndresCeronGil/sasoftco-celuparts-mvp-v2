import React, { useEffect, useState } from 'react'
import getSiigoFixedAssets from '../../services/getSiigoFixedAssets'
import { Card, CardBody, CardTitle, Table } from "reactstrap";

export default function SiigoFixedAssetsTable() {
    const [siigoFixedAssets, setSiigoFixedAssets] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoFixedAssets()
            .then(response => {
                console.log(response)
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
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de activos fijos registrados en el sistema SIIGO</CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
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
                    </CardBody>
                </Card>
            </div>
        )
    )
}
