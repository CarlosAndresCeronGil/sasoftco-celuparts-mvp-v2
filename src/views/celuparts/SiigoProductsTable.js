/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Alert, Card, CardBody, CardTitle, Table } from "reactstrap";
import getSiigoProducts from '../../services/getSiigoProducts';
// import { Link } from "react-router-dom";

export default function SiigoProductsTable() {
    const [loading, setLoading] = useState(false);
    const [siigoProducts, setSiigoProductsTable] = useState([])

    useEffect(function () {
        setLoading(true)
        getSiigoProducts()
            .then(response => {
                console.log(response)
                setSiigoProductsTable(response.results)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [setLoading])

    return (
        loading ? <div> Cargando... </div> : (
            <div>
                {/* <Link to={`/home/siigo-product-form`} className="mb-1">
                    <button className='btn btn-primary' type='button'>
                        Nuevo producto
                    </button>
                </Link> */}
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de productos registrados en el sistema SIIGO</CardTitle>

                        <hr />

                        {
                            siigoProducts.length == 0 ? (
                                <Alert color='danger'>
                                    <p>No hay resultados para esta búsqueda.</p>
                                </Alert>
                            ) : (

                                <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {siigoProducts.map((tdata, index) => (
                                    <tr key={index} className="border-top">
                                        <td>{tdata.code}</td>
                                        <td>{tdata.name}</td>
                                        <td>{tdata.prices !== undefined ? tdata.prices[0].price_list[0].value : <div>Sin asignar</div>}</td>
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
