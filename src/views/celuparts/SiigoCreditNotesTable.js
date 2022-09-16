import React, { useEffect, useState } from 'react'
import getSiigoCreditNotes from '../../services/getSiigoCreditNotes'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import { Link } from "react-router-dom";

export default function SiigoCreditNotesTable() {
    const [siigoCreditNotes, setSiigoCreditNotes] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoCreditNotes()
            .then(response => {
                console.log(response)
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
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de notas de crédito registradas en el sistema SIIGO</CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
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
                    </CardBody>
                </Card>
            </div>
        )
    )
}
