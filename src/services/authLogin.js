import { API_URL } from "./settings";
import Swal from 'sweetalert2'

export default function authLogin(data) {
    const apiURL = `${API_URL}/Auth/login`;

    return fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // withCredentials: true
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.text()
        })
        .catch(error => {
            console.log(error);
            return error;
        });
}