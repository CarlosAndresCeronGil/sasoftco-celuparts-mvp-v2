/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table, Alert } from "reactstrap";
import getSiigoInvoices from '../../services/getSiigoInvoices'
// import { Link } from "react-router-dom";

export default function SiigoInvoicesTables() {
    const [siigoInvoices, setSiigoInvoices] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoInvoices()
            .then(response => {
                console.log(response)
                setSiigoInvoices(response.results)
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
                {/* <Link to={`/home/siigo-invoices-form`} className="mb-1">
                    <button className='btn btn-primary' type='button'>
                        Nueva factura
                    </button>
                </Link> */}
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de facturas registradas en el sistema SIIGO</CardTitle>

                        <hr />

                        {
                            siigoInvoices.length == 0 ? (
                                <Alert color='danger'>
                                    <p>No hay resultados para esta búsqueda.</p>
                                </Alert>
                            ) : (

                                <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                                    <thead>
                                        <tr>
                                            <th>Identification</th>
                                            <th>Nombre factura</th>
                                            <th>Fecha de factura</th>
                                            <th>Id cliente</th>
                                            <th>Id vendedor</th>
                                            <th>Valor total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siigoInvoices.map((tdata, index) => (
                                            <tr key={index} className="border-top">
                                                <td>{tdata.document.id}</td>
                                                <td>{tdata.name}</td>
                                                <td>{tdata.date}</td>
                                                <td>{tdata.customer.identification}</td>
                                                <td>{tdata.seller}</td>
                                                <td>{tdata.total}</td>
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
