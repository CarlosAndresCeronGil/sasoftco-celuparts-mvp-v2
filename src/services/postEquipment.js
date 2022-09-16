import Swal from 'sweetalert2'
import { API_URL } from "./settings";

export default function postEquipment(data) {
    const apiURL = `${API_URL}/Equipment`;

    return fetch(apiURL, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            // 'Accept': '*/*',
        },
        // body: JSON.stringify(data)
        body: (data)
    })
        .then(response => response.json())
        .then(data2 => {
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