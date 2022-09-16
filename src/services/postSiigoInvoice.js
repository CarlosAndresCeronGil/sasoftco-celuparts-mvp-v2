import { API_URL } from './settings';
import Swal from 'sweetalert2'

export default function postSiigoInvoice(data) {
    const apiURL = `${API_URL}/SiigoInvoices`;

    return fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify(data, null, 2).split('},{').join('}, {')
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Registro exitoso!',
            })
            return data;
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que algo falló!',
            })
            console.log(error);
            return error;
        }
        );
}