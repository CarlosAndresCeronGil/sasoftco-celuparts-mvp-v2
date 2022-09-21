/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table, Alert } from "reactstrap";
// import { Link } from "react-router-dom";
import getSiigoVouchers from '../../services/getSiigoVouchers'

export default function SiigoVouchersTable() {
    const [siigoVouchers, setSiigoVouchers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoVouchers()
            .then(response => {
                console.log(response)
                setSiigoVouchers(response.results)
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
                {/* <Link to={`/home/siigo-voucher-form`} className="mb-1">
                    <button className='btn btn-primary' type='button'>
                        Nuevo recibo de caja
                    </button>
                </Link> */}
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de recibos de caja en el sistema SIIGO</CardTitle>

                        <hr />

                        {
                            siigoVouchers.length === 0 ? (
                                <Alert color='danger'>
                                    <p>No hay resultados para esta búsqueda.</p>
                                </Alert>
                            ) : (
                                <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                                    <thead>
                                        <tr>
                                            <th>Identification</th>
                                            <th>Nombre</th>
                                            <th>Fecha de recibo</th>
                                            <th>Tipo de recibo de caja</th>
                                            <th>Identificación cliente asociado</th>
                                            <th>Tipo de pago</th>
                                            <th>Valor asociado al tipo de pago</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siigoVouchers.map((tdata, index) => (
                                            <tr key={index} className="border-top">
                                                <td>{tdata.document.id}</td>
                                                <td>{tdata.name}</td>
                                                <td>{tdata.date}</td>
                                                <td>{tdata.type}</td>
                                                <td>{tdata.customer.identification}</td>
                                                <td>{tdata.payment !== undefined ? tdata.payment.name : <div>Sin asignar</div>}</td>
                                                <td>{tdata.payment !== undefined ? tdata.payment.value : <div>Sin asignar</div>}</td>
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
