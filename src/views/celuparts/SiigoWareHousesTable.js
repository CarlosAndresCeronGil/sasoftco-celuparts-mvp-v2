/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table, Alert } from "reactstrap";
import getSiigoWareHouses from '../../services/getSiigoWareHouses'

export default function SiigoWareHousesTable() {
    const [siigoWareHouses, setSiigoWareHouses] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoWareHouses()
            .then(response => {
                console.log(response)
                setSiigoWareHouses(response)
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
                        <CardTitle tag="h5">Lista de bodegas registradas en el sistema SIIGO</CardTitle>

                        <hr />

                        {
                            siigoWareHouses.length == 0 ? (
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
                                            <th>Tiene movimientos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siigoWareHouses.map((tdata, index) => (
                                            <tr key={index} className="border-top">
                                                <td>{tdata.id}</td>
                                                <td>{tdata.name}</td>
                                                <td>{tdata.active ? <div>activo</div> : <div>Inactivo</div>}</td>
                                                <td>{tdata.has_movements ? <div>Sí</div> : <div>No</div>}</td>
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
