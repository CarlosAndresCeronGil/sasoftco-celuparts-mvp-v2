/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import getSiigoCreditNotes from '../../services/getSiigoCreditNotes'
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';

export default function SiigoCreditNotesTable() {
    const [siigoCreditNotes, setSiigoCreditNotes] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoCreditNotes()
            .then(response => {
                // console.log(response)
                setSiigoCreditNotes(response.results)
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
                {/* <Link to={`/home/siigo-credit-notes-form`} className="mb-1">
                    <button className='btn btn-primary' type='button'>
                        Nueva nota de crédito
                    </button>
                </Link> */}
                <BreadCrumbsCeluparts />
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de notas de crédito registradas en el sistema SIIGO</CardTitle>
                        
                        <hr />

                        {
                            siigoCreditNotes.length == 0 ? (
                                <Alert color='danger'>
                                    <p>No hay resultados para esta búsqueda.</p>
                                </Alert>
                            ) : (
                                <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                                    <thead>
                                        <tr>
                                            <th>Identification</th>
                                            <th>Número consecutivo</th>
                                            <th>Nombre nota de crédito</th>
                                            <th>Fecha realización</th>
                                            <th>Nombre factura asociada</th>
                                            <th>Identificación cliente asociado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siigoCreditNotes.map((tdata, index) => (
                                            <tr key={index} className="border-top">
                                                <td>{tdata.document.id}</td>
                                                <td>{tdata.number}</td>
                                                <td>{tdata.name}</td>
                                                <td>{tdata.date}</td>
                                                <td>{tdata.invoice.name}</td>
                                                <td>{tdata.customer.identification}</td>
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
