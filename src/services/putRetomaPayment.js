import { API_URL } from "./settings";
import Swal from 'sweetalert2'

export default function putRetomaPayment(data) {
    const apiURL = `${API_URL}/RetomaPayment`;

    return fetch(apiURL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Pago de reparación actualizado!',
            })
            return data
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