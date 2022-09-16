import Swal from 'sweetalert2'
import { API_URL } from "./settings";

export default function putRepairPayment(data) {
    const apiURL = `${API_URL}/RepairPayment`;

    return fetch(apiURL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data2 => {
            Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Pago de reparación actualizado!',
            })
            return data2
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que algo falló!',
            })
            console.log(error)
            return error
        }
        );

}