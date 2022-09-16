import { API_URL } from './settings'
import Swal from 'sweetalert2'

export default function authRegister(data) {
    const apiURL = `${API_URL}/Auth/register`;

    return fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        // .then(response => response.json())
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Registro exitoso!',
            })
            return data;
        })
        .catch(error => {
            console.log("ERROR DENTRO DE AUTH", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que algo falló!',
            })
            return error;
        });
}