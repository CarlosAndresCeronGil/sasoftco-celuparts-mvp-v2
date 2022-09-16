import React, { useEffect, useState } from 'react'
import getSiigoTaxes from '../../services/getSiigoTaxes'
import { Card, CardBody, CardTitle, Table } from "reactstrap";

export default function SiigoTaxesTable() {
    const [siigoTaxes, setSiigoTaxes] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoTaxes()
            .then(response => {
                console.log(response)
                setSiigoTaxes(response)
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
                        <CardTitle tag="h5">Lista de impuestos registrados en el sistema SIIGO</CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
                            <thead>
                                <tr>
                                    <th>Identification</th>
                                    <th>Nombre</th>
                                    <th>Tipo</th>
                                    <th>Porcentaje</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {siigoTaxes.map((tdata, index) => (
                                    <tr key={index} className="border-top">
                                        <td>{tdata.id}</td>
                                        <td>{tdata.name}</td>
                                        <td>{tdata.type}</td>
                                        <td>{tdata.percentage}</td>
                                        <td>{tdata.active ? <div>activo</div> : <div>Inactivo</div>}</td>
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
