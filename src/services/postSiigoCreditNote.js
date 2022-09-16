import Swal from 'sweetalert2'
import { API_URL } from './settings';

export default function postSiigoProduct(data) {
    const apiURL = `${API_URL}/SiigoCreditNotes`;

    return fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify(data, null, 2).split('},{').join('}, {')
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data2 => {
            Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Registro exitoso!',
            })
            return data2;
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