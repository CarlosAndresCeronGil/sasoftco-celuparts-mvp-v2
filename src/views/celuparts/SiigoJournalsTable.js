/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table, Alert } from "reactstrap";
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getSiigoJournals from '../../services/getSiigoJournals'
// import { Link } from "react-router-dom";

export default function SiigoJournalsTable() {
    const [siigoJournals, setSiigoJournals] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function() {
        setLoading(true)
        getSiigoJournals()
            .then(response => {
                // console.log(response)
                setSiigoJournals(response.results)
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
                {/* <Link to={`/home/siigo-journal-form`} className="mb-1">
                    <button className='btn btn-primary' type='button'>
                        Nuevo comprobante contable
                    </button>
                </Link> */}
                <BreadCrumbsCeluparts breadcrumbName="Lista de comprobantes registrados en SIIGO"/>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de comprobantes contables registrados en el sistema SIIGO</CardTitle>
                        
                        <hr />

                        {
                            siigoJournals.length == 0 ? (
                                <Alert color='danger'>
                                    <p>No hay resultados para esta búsqueda.</p>
                                </Alert>
                            ) : (
                                <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                                    <thead>
                                        <tr>
                                            <th>Identification</th>
                                            <th>Nombre</th>
                                            <th>Fecha</th>
                                            {/* <th>Items</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {siigoJournals.map((tdata, index) => (
                                            <tr key={index} className="border-top">
                                                <td>{tdata.document.id}</td>
                                                <td>{tdata.name}</td>
                                                <td>{tdata.date}</td>
                                                {/* <td>
                                                    {
                                                        tdata.items.map((tdata2, index) => (
                                                            <div key={index}>
                                                                Tipo de movimiento
                                                                <td>{tdata2.account.movement}</td>
                                                            </div>
                                                        ))
                                                    }
                                                </td> */}
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
