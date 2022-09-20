/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getEquipments from '../../services/getEquipments';

export default function EquipmentsTable() {
    const [equipments, setEquipments] = useState([])

    useEffect(function() {
        getEquipments()
            .then((response) => {
                console.log(response)
                setEquipments(response)
            }
        )
    },[setEquipments])

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de equipos registrados en el sistema</CardTitle>

                    <hr/>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tipo de equipo</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Imei o serial</th>
                                <th>Factura</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipments.map((tdata, index) => (
                                <tr key={index} className="">
                                    <td>
                                        <span className="text-muted">{tdata.idEquipment}</span>
                                    </td>
                                    <td> 
                                        <div> 
                                            <i className='bi-phone-fill'></i>
                                            <span className="d-inline-block ms-3">{tdata.typeOfEquipment}</span>
                                        </div>  
                                    </td>
                                    <td>{tdata.equipmentBrand}</td>
                                    <td>{tdata.modelOrReference}</td>
                                    <td>{tdata.imeiOrSerial}</td>
                                    {/* <td>{tdata.equipmentInvoice}</td> */}
                                    <td>
                                        <a href="#">            
                                            <button type="button" title={`Ver factura de ${tdata.equipmentBrand} ${tdata.modelOrReference}`} className="btn btn-outline-info">Ver Factura</button>
                                        </a>
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
