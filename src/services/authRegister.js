import Swal from 'sweetalert2'
import { API_URL } from './settings'

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
        .then(data2 => {
            Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Registro exitoso!',
            })
            return data2;
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