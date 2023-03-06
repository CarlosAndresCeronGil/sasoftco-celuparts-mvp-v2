/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import BreadCrumbsCeluparts from '../../layouts/breadcrumbs/BreadCrumbsCeluparts';
import getEquipmentInvoice from '../../services/getEquipmentInvoice';
import getEquipments from '../../services/getEquipments';
import getRetomaInvoice from '../../services/getRetomaInvoice';
import getRetomaPayments from '../../services/getRetomaPayments';

export default function RetomaPaymentsTable() {
    const [retomaPayments, setRetomaPayments] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(true)
        getRetomaPayments()
            .then((response) => {
                // console.log(response)
                setRetomaPayments(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [setRetomaPayments])

    const handleViewEquipmentInvoice = (e, { idRetomaPayment }) => {
        e.preventDefault()
        // console.log(idRetomaPayment)
        getRetomaInvoice({ id: idRetomaPayment })
            .then(response => {
                // console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        loading ? <div>Cargando...</div> :
            <div>
                <BreadCrumbsCeluparts breadcrumbName="Lista de pagos y retomas registrados en el sistema" />
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de pagos a retomas registrados en el sistema</CardTitle>
                        <hr />
                        <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                            <thead>
                                <tr>
                                    <th>Método de pago</th>
                                    <th>Fecha de pago</th>
                                    <th>Número del voucher</th>
                                </tr>
                            </thead>
                            <tbody>
                                {retomaPayments.map((tdata, index) => (
                                    <tr key={index} className="">
                                        <td>{tdata.paymentMethod}</td>
                                        <td>{tdata.paymentDate}</td>
                                        <td>{tdata.voucherNumber}</td>
                                        <td>
                                            {
                                                tdata.billPaymentPath != "" ? (
                                                    <a href="#">
                                                        <button
                                                            type="button"
                                                            title={`Ver factura de ${tdata.equipmentBrand} ${tdata.modelOrReference}`}
                                                            className="btn btn-outline-info"
                                                            onClick={(e) => handleViewEquipmentInvoice(e, { idRetomaPayment: tdata.idRetomaPayment })}
                                                        >
                                                            Ver Factura
                                                        </button>
                                                    </a>
                                                )
                                                :
                                                <button type='button' className="btn btn-outline-info" disabled>Sin factura</button>
                                        }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
    )
}
